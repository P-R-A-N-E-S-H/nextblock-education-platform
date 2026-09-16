import fs from 'fs';
import path from 'path';
import https from 'https';

const colleges = JSON.parse(fs.readFileSync('scripts/all_colleges_list.json', 'utf8'));

// Build unique list
const unique = [];
const seenIds = new Set();
for (const c of colleges) {
  if (!seenIds.has(c.id)) {
    seenIds.add(c.id);
    unique.push(c);
  }
}

console.log(`Processing ${unique.length} unique colleges...`);

function fetchJson(url) {
  return new Promise((resolve) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'NextBlockCollegeDiscovery/3.0 (education platform; contact: pranesh.m@nextblock.org)'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch { resolve(null); }
      });
    });
    req.on('error', () => resolve(null));
    req.setTimeout(8000, () => {
      req.destroy();
      resolve(null);
    });
  });
}

async function getImageDirectUrl(fileTitle) {
  const fTitle = fileTitle.startsWith('File:') ? fileTitle : `File:${fileTitle}`;
  const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(fTitle)}&prop=imageinfo&iiprop=url&iiurlwidth=1200&format=json`;
  const res = await fetchJson(url);
  const pages = res?.query?.pages;
  if (!pages) return null;
  const page = Object.values(pages)[0];
  const info = page?.imageinfo?.[0];
  return info?.thumburl || info?.url || null;
}

function cleanCollegeName(name) {
  return name
    .replace(/\([^)]*\)/g, '')
    .replace(/Campus/gi, '')
    .replace(/Autonomous/gi, '')
    .replace(/Deemed-to-be University/gi, '')
    .replace(/Engineering College/gi, 'College of Engineering')
    .replace(/,/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function findWikiImage(college) {
  const clean = cleanCollegeName(college.name);
  const searchTerms = [
    clean,
    college.name.replace(/\([^)]*\)/g, '').trim(),
    college.shortName,
    `${clean} ${college.district || college.city || ''}`.trim()
  ].filter(Boolean);

  for (const query of searchTerms) {
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&srlimit=4`;
    const sRes = await fetchJson(searchUrl);
    const searchResults = sRes?.query?.search || [];

    for (const item of searchResults) {
      const title = item.title;
      // Filter out unrelated articles like cities, general topics
      const lowerTitle = title.toLowerCase();
      if (lowerTitle === 'tamil nadu' || lowerTitle === 'chennai' || lowerTitle === 'coimbatore' || lowerTitle.includes('district') || lowerTitle.includes('list of')) {
        continue;
      }

      // Check article page images
      const parseUrl = `https://en.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(title)}&prop=images&format=json`;
      const parseRes = await fetchJson(parseUrl);
      const images = parseRes?.parse?.images || [];

      // Look for a good photo
      for (const img of images) {
        const lowerImg = img.toLowerCase();
        if (
          (lowerImg.endsWith('.jpg') || lowerImg.endsWith('.jpeg') || lowerImg.endsWith('.png')) &&
          !lowerImg.includes('logo') && !lowerImg.includes('seal') && !lowerImg.includes('emblem') &&
          !lowerImg.includes('icon') && !lowerImg.includes('map') && !lowerImg.includes('flag') &&
          !lowerImg.includes('signature') && !lowerImg.includes('shield')
        ) {
          const directUrl = await getImageDirectUrl(img);
          if (directUrl) {
            return {
              title: item.title,
              file: img,
              url: directUrl,
              source: 'wiki_article_image'
            };
          }
        }
      }

      // Check thumbnail
      const pUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&pithumbsize=1200&format=json`;
      const pRes = await fetchJson(pUrl);
      const page = Object.values(pRes?.query?.pages || {})[0];
      if (page?.thumbnail?.source) {
        return {
          title: item.title,
          file: 'thumbnail',
          url: page.thumbnail.source,
          source: 'wiki_thumbnail'
        };
      }
    }
  }

  // If not found in Wikipedia articles, search Commons directly
  for (const query of searchTerms) {
    const commonsUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=5&prop=imageinfo&iiprop=url&iiurlwidth=1200&format=json`;
    const cRes = await fetchJson(commonsUrl);
    const pages = Object.values(cRes?.query?.pages || {});
    for (const p of pages) {
      const pTitle = (p.title || '').toLowerCase();
      if (
        (pTitle.endsWith('.jpg') || pTitle.endsWith('.jpeg') || pTitle.endsWith('.png')) &&
        !pTitle.includes('logo') && !pTitle.includes('seal') && !pTitle.includes('emblem') &&
        !pTitle.includes('icon') && !pTitle.includes('map') && !pTitle.includes('flag')
      ) {
        const url = p.imageinfo?.[0]?.thumburl || p.imageinfo?.[0]?.url;
        if (url) {
          return {
            title: p.title,
            file: p.title,
            url,
            source: 'commons_search'
          };
        }
      }
    }
  }

  return null;
}

async function run() {
  const results = {};
  let found = 0;
  let missing = 0;

  for (let i = 0; i < unique.length; i++) {
    const c = unique[i];
    const res = await findWikiImage(c);
    if (res) {
      found++;
      results[c.id] = { ...c, found: true, ...res };
      console.log(`[${i+1}/${unique.length}] [FOUND] ${c.id}: ${res.title} (${res.file})`);
    } else {
      missing++;
      results[c.id] = { ...c, found: false };
      console.log(`[${i+1}/${unique.length}] [MISSING] ${c.id}: ${c.name}`);
    }
    await new Promise(r => setTimeout(r, 100));
  }

  fs.writeFileSync('scripts/wiki_resolved_colleges.json', JSON.stringify(results, null, 2));
  console.log(`\nFinished. Found: ${found}, Missing: ${missing}`);
}

run();
