import fs from 'fs';
import path from 'path';
import https from 'https';

const colleges = JSON.parse(fs.readFileSync('scripts/all_colleges_list.json', 'utf8'));

// Group by ID
const uniqueColleges = new Map();
colleges.forEach(c => {
  if (!uniqueColleges.has(c.id)) {
    uniqueColleges.set(c.id, c);
  }
});

console.log(`Unique colleges to process: ${uniqueColleges.size}`);

function fetchJson(url) {
  return new Promise((resolve) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'NextBlockTamilNaduGuide/3.0 (academic platform; contact: pranesh.m@nextblock.org)'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch {
          resolve(null);
        }
      });
    });
    req.on('error', () => resolve(null));
    req.setTimeout(6000, () => {
      req.destroy();
      resolve(null);
    });
  });
}

async function searchWikiArticle(name, shortName, city, district) {
  const cleanName = name.replace(/\([^)]*\)/g, '').trim();
  const queries = [
    cleanName,
    `${cleanName} ${city || district || 'Tamil Nadu'}`,
    shortName ? `${shortName} ${city || district || 'Tamil Nadu'}` : null,
    name
  ].filter(Boolean);

  for (const q of queries) {
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(q)}&limit=3&namespace=0&format=json`;
    const res = await fetchJson(searchUrl);
    if (res && res[1] && res[1].length > 0) {
      for (const title of res[1]) {
        // check page images
        const pUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages|images&pithumbsize=1000&format=json`;
        const pData = await fetchJson(pUrl);
        const pages = pData?.query?.pages;
        if (!pages) continue;
        const page = Object.values(pages)[0];
        if (page?.thumbnail?.source) {
          return {
            pageTitle: title,
            image: page.thumbnail.source,
            source: 'wikipedia_pageimage'
          };
        }
      }
    }
  }
  return null;
}

async function searchCommons(name, shortName) {
  const cleanName = name.replace(/\([^)]*\)/g, '').trim();
  const queries = [cleanName, shortName].filter(Boolean);

  for (const q of queries) {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(q)}&gsrlimit=6&prop=imageinfo&iiprop=url&iiurlwidth=1000&format=json`;
    const data = await fetchJson(url);
    const pages = data?.query?.pages;
    if (!pages) continue;

    for (const p of Object.values(pages)) {
      const title = (p.title || '').toLowerCase();
      if (title.endsWith('.svg') || title.includes('logo') || title.includes('seal') || title.includes('emblem') || title.includes('map') || title.includes('flag')) {
        continue;
      }
      const imgUrl = p.imageinfo?.[0]?.thumburl || p.imageinfo?.[0]?.url;
      if (imgUrl) {
        return {
          pageTitle: p.title,
          image: imgUrl,
          source: 'wikimedia_commons'
        };
      }
    }
  }
  return null;
}

async function run() {
  const foundMap = {};
  let foundCount = 0;
  let missingCount = 0;

  for (const [id, c] of uniqueColleges) {
    let result = await searchWikiArticle(c.name, c.shortName, c.city, c.district);
    if (!result) {
      result = await searchCommons(c.name, c.shortName);
    }

    if (result) {
      foundCount++;
      foundMap[id] = { ...c, ...result };
      console.log(`[✓ ${foundCount}] ${id}: ${result.pageTitle} (${result.source})`);
    } else {
      missingCount++;
      foundMap[id] = { ...c, image: null, source: 'NOT_FOUND' };
      console.log(`[✗ ${missingCount}] ${id}: ${c.name} (${c.city})`);
    }
    await new Promise(r => setTimeout(r, 100));
  }

  fs.writeFileSync('scripts/colleges_search_map.json', JSON.stringify(foundMap, null, 2));
  console.log(`\nCompleted. Found: ${foundCount}, Missing: ${missingCount}`);
}

run();
