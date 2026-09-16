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

const collegesToQuery = [
  { id: 'ceg-guindy', page: 'College_of_Engineering,_Guindy' },
  { id: 'mit-chromepet', page: 'Madras_Institute_of_Technology' },
  { id: 'vit-vellore', page: 'Vellore_Institute_of_Technology' },
  { id: 'srm-ktr', page: 'SRM_Institute_of_Science_and_Technology' },
  { id: 'amrita-cbe', page: 'Amrita_Vishwa_Vidyapeetham' },
  { id: 'sastra-thanjavur', page: 'Shanmugha_Arts,_Science,_Technology_%26_Research_Academy' },
  { id: 'psg-tech', page: 'PSG_College_of_Technology' },
  { id: 'ssn', page: 'SSN_College_of_Engineering' },
  { id: 'tce-madurai', page: 'Thiagarajar_College_of_Engineering' },
  { id: 'cit-cbe', page: 'Coimbatore_Institute_of_Technology' },
  { id: 'gct-cbe', page: 'Government_College_of_Technology,_Coimbatore' },
  { id: 'kct-cbe', page: 'Kumaraguru_College_of_Technology' },
  { id: 'svce-chennai', page: 'Sri_Venkateswara_College_of_Engineering' },
  { id: 'rec-chennai', page: 'Rajalakshmi_Engineering_College' },
  { id: 'sairam-chennai', page: 'Sri_Sairam_Engineering_College' },
  { id: 'mepco-sivakasi', page: 'Mepco_Schlenk_Engineering_College' },
  { id: 'psna-dindigul', page: 'PSNA_College_of_Engineering_and_Technology' },
  { id: 'gce-salem', page: 'Government_College_of_Engineering,_Salem' },
  { id: 'sona-salem', page: 'Sona_College_of_Technology' },
  { id: 'kongu-erode', page: 'Kongu_Engineering_College' },
  { id: 'bit-sathy', page: 'Bannari_Amman_Institute_of_Technology' },
  { id: 'skcet-cbe', page: 'Sri_Krishna_College_of_Engineering_and_Technology' },
  { id: 'karunya-cbe', page: 'Karunya_Institute_of_Technology_and_Sciences' },
  { id: 'licet-chennai', page: 'Loyola-ICAM_College_of_Engineering_and_Technology' },
  { id: 'accet-karaikudi', page: 'Alagappa_Chettiar_Government_College_of_Engineering_and_Technology' }
];

async function run() {
  for (const item of collegesToQuery) {
    try {
      const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${item.page}&prop=pageimages|images&pithumbsize=1200&format=json`;
      const res = await fetchJson(apiUrl);
      const pages = res?.query?.pages;
      if (pages) {
        const pageId = Object.keys(pages)[0];
        const pageData = pages[pageId];
        const thumb = pageData?.thumbnail?.source;
        if (thumb) {
          const dest = path.join(outputDir, `${item.id}.jpg`);
          console.log(`Downloading real image for ${item.id} from ${thumb}...`);
          await downloadImage(thumb, dest);
          console.log(`✓ Saved ${item.id}.jpg`);
        } else {
          console.log(`! No thumbnail found for ${item.page}, trying files list...`);
        }
      }
    } catch (e) {
      console.log(`Error for ${item.id}:`, e.message);
    }
  }
}

run();
