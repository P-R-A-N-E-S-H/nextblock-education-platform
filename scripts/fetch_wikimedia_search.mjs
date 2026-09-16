import fs from 'fs';
import path from 'path';
import https from 'https';

const outputDir = path.resolve('public/colleges');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'NextBlockTamilNaduGuide/1.0 (contact: nextblock.educations@gmail.com)' } }, (res) => {
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
    https.get(url, { headers: { 'User-Agent': 'NextBlockTamilNaduGuide/1.0 (contact: nextblock.educations@gmail.com)' } }, (res) => {
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

const collegesToSearch = [
  { id: 'ceg-guindy', query: 'College of Engineering Guindy' },
  { id: 'mit-chromepet', query: 'Madras Institute of Technology' },
  { id: 'srm-ktr', query: 'SRM Institute of Science and Technology' },
  { id: 'sastra-thanjavur', query: 'SASTRA University Thanjavur' },
  { id: 'ssn-chennai', query: 'SSN College of Engineering' },
  { id: 'tce-madurai', query: 'Thiagarajar College of Engineering' },
  { id: 'gct-cbe', query: 'Government College of Technology Coimbatore' },
  { id: 'svce-chennai', query: 'Sri Venkateswara College of Engineering' },
  { id: 'sairam-chennai', query: 'Sri Sairam Engineering College' },
  { id: 'sona-salem', query: 'Sona College of Technology' },
  { id: 'kongu-erode', query: 'Kongu Engineering College' },
  { id: 'bit-sathy', query: 'Bannari Amman Institute of Technology' },
  { id: 'skcet-cbe', query: 'Sri Krishna College of Engineering and Technology' },
  { id: 'karunya-cbe', query: 'Karunya University Coimbatore' },
  { id: 'rmk-chennai', query: 'RMK Engineering College' },
  { id: 'velammal-chennai', query: 'Velammal Engineering College' },
  { id: 'saveetha-chennai', query: 'Saveetha Engineering College' },
  { id: 'panimalar-chennai', query: 'Panimalar Engineering College' },
  { id: 'easwari-chennai', query: 'Easwari Engineering College' },
  { id: 'kcg-chennai', query: 'KCG College of Technology' },
  { id: 'psg-itech', query: 'PSG Institute of Technology Neelambur' },
  { id: 'skct-cbe', query: 'Sri Krishna College of Technology Kovaipudur' },
  { id: 'mcet-pollachi', query: 'Dr Mahalingam College of Engineering and Technology' },
  { id: 'srec-cbe', query: 'Sri Ramakrishna Engineering College' },
  { id: 'kpriet-cbe', query: 'KPR Institute of Engineering and Technology' },
  { id: 'cit-chennai', query: 'Chennai Institute of Technology' },
  { id: 'saranathan-trichy', query: 'Saranathan College of Engineering' },
  { id: 'krce-trichy', query: 'K Ramakrishnan College of Engineering' },
  { id: 'mkce-karur', query: 'M Kumarasamy College of Engineering' },
  { id: 'vsb-karur', query: 'VSB Engineering College' },
  { id: 'gce-bargur', query: 'Government College of Engineering Bargur' },
  { id: 'adhiyamaan-hosur', query: 'Adhiyamaan College of Engineering' },
  { id: 'tpgit-vellore', query: 'Thanthai Periyar Government Institute of Technology' },
  { id: 'gce-tirunelveli', query: 'Government College of Engineering Tirunelveli' },
  { id: 'fxec-tirunelveli', query: 'Francis Xavier Engineering College' }
];

async function runSearch() {
  for (const item of collegesToSearch) {
    const dest = path.join(outputDir, `${item.id}.jpg`);
    try {
      const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(item.query)}&gsrlimit=5&prop=imageinfo&iiprop=url&iiurlwidth=1200&format=json`;
      const res = await fetchJson(searchUrl);
      const pages = res?.query?.pages;
      if (pages) {
        let foundUrl = null;
        for (const pid of Object.keys(pages)) {
          const page = pages[pid];
          const info = page?.imageinfo?.[0];
          const url = info?.thumburl || info?.url;
          if (url && (url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.png') || url.includes('.jpg?') || url.includes('.png?'))) {
            // Check if it's not a logo/svg/icon
            const title = (page.title || '').toLowerCase();
            if (!title.includes('logo') && !title.includes('icon') && !title.includes('seal') && !title.includes('flag')) {
              foundUrl = url;
              console.log(`Found photo for ${item.id}: ${page.title}`);
              break;
            }
          }
        }
        if (foundUrl) {
          console.log(`Downloading real image for ${item.id} from ${foundUrl}...`);
          await downloadImage(foundUrl, dest);
          console.log(`✓ Saved ${item.id}.jpg`);
        } else {
          console.log(`- No suitable photo found for ${item.id}`);
        }
      } else {
        console.log(`- No search results for ${item.id}`);
      }
    } catch (e) {
      console.log(`Error searching ${item.id}:`, e.message);
    }
  }
}

runSearch();
