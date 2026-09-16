import fs from 'fs';
import path from 'path';
import https from 'https';

const outputDir = path.resolve('public/colleges');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'NextBlockCollegeGuide/2.0 (educational platform; contact: pranesh.m@nextblock.org)'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(null);
        }
      });
    });
    req.on('error', () => resolve(null));
    req.setTimeout(8000, () => {
      req.destroy();
      resolve(null);
    });
  });
}

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'NextBlockCollegeGuide/2.0 (educational platform; contact: pranesh.m@nextblock.org)'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadImage(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      const fileStream = fs.createWriteStream(destPath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve(true);
      });
      fileStream.on('error', reject);
    });
    req.on('error', reject);
    req.setTimeout(12000, () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

// Search Wikipedia page image
async function searchWikipediaImage(collegeName, shortName) {
  const queries = [
    collegeName.replace(/\([^)]*\)/g, '').trim(),
    shortName,
    collegeName.split(',')[0].trim()
  ].filter(Boolean);

  for (const q of queries) {
    try {
      // 1. Search page
      const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(q)}&format=json&srlimit=3`;
      const sData = await fetchJson(searchUrl);
      const results = sData?.query?.search;
      if (!results || results.length === 0) continue;

      for (const res of results) {
        // fetch page image thumbnail
        const pageUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(res.title)}&prop=pageimages|images&pithumbsize=1000&format=json`;
        const pData = await fetchJson(pageUrl);
        const pages = pData?.query?.pages;
        if (!pages) continue;
        const page = Object.values(pages)[0];
        if (page?.thumbnail?.source) {
          return { url: page.thumbnail.source, title: res.title };
        }
      }
    } catch (e) {
      // ignore
    }
  }
  return null;
}

// Search Wikimedia Commons
async function searchCommonsImage(collegeName, shortName) {
  const queries = [
    collegeName.replace(/\([^)]*\)/g, '').trim(),
    shortName
  ].filter(Boolean);

  for (const q of queries) {
    try {
      const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(q)}&gsrlimit=5&prop=imageinfo&iiprop=url&iiurlwidth=1000&format=json`;
      const data = await fetchJson(searchUrl);
      const pages = data?.query?.pages;
      if (!pages) continue;
      for (const p of Object.values(pages)) {
        const title = (p.title || '').toLowerCase();
        // filter out logo, seal, icon, map, svg, signature
        if (title.endsWith('.svg') || title.includes('logo') || title.includes('seal') || title.includes('emblem') || title.includes('map') || title.includes('signature')) {
          continue;
        }
        const imgUrl = p.imageinfo?.[0]?.thumburl || p.imageinfo?.[0]?.url;
        if (imgUrl) {
          return { url: imgUrl, title: p.title };
        }
      }
    } catch (e) {
      // ignore
    }
  }
  return null;
}

export { fetchJson, downloadImage, searchWikipediaImage, searchCommonsImage };
