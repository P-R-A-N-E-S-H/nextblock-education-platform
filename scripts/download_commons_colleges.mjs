import fs from 'fs';
import path from 'path';
import https from 'https';

const outputDir = path.resolve('public/colleges');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'NextBlockTamilNaduGuide/2.0 (contact: nextblock.educations@gmail.com)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'NextBlockTamilNaduGuide/2.0 (contact: nextblock.educations@gmail.com)' } }, (res) => {
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
    }).on('error', reject);
  });
}

async function getCommonsUrl(fileTitle) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(fileTitle)}&prop=imageinfo&iiprop=url&iiurlwidth=1280&format=json`;
  const data = await fetchJson(url);
  const pages = data?.query?.pages;
  if (!pages) return null;
  const page = Object.values(pages)[0];
  const info = page?.imageinfo?.[0];
  return info?.thumburl || info?.url || null;
}

const files = [
  { id: 'srm-ktr', file: 'SRM University Campus Chennai Tamil Nadu India.jpg' },
  { id: 'sastra-thanjavur', file: 'SASTRA university.jpg' },
  { id: 'svce-entrance', file: 'SVCE entrance close up.jpg' },
  { id: 'svce-library', file: 'SVCE library panorama.jpg' },
  { id: 'bit-aero', file: 'Aeronautical Block.jpg' },
  { id: 'bit-learning', file: 'BIT-Learning center.jpg' },
  { id: 'tce-campus', file: 'TCE Madurai.JPG' },
  { id: 'psg-arch', file: 'PSG Tech Arch.jpg' },
  { id: 'amrita-ettimadai', file: 'Amrita Vishwa Vidyapeetham coimbatore campus.jpg' },
  { id: 'vit-tower', file: 'Technology Tower(VIT).jpg' },
  { id: 'gce-salem-campus', file: 'Gcesalem.jpg' },
  { id: 'licet-building', file: 'LICET.jpg' },
  { id: 'saveetha-block', file: 'Saveetha Engineering College, Main circular block .jpg' },
  { id: 'velammal-gate', file: 'Velammal Engineering College-entrance.jpg' },
  { id: 'rec-main', file: 'Rajalakshmi Institutions Main Head Office.jpg' },
  { id: 'cit-gate', file: 'CITentrance.jpg' },
  { id: 'kct-gate', file: 'KCT Banner.jpg' },
  { id: 'srec-main', file: 'Srec.jpg' },
  { id: 'mkce-main', file: 'Mkce.jpg' }
];

async function run() {
  console.log('Downloading high resolution real Wikimedia photos...');
  for (const item of files) {
    const dest = path.join(outputDir, `${item.id}.jpg`);
    try {
      const url = await getCommonsUrl(item.file);
      if (url) {
        console.log(`Downloading ${item.id} from ${url}...`);
        await downloadImage(url, dest);
        console.log(`✓ Successfully downloaded ${item.id}.jpg`);
      } else {
        console.log(`! No URL for File:${item.file}`);
      }
    } catch (e) {
      console.log(`✗ Error for ${item.id}:`, e.message);
    }
  }
}

run();
