import fs from 'fs';
import path from 'path';
import https from 'https';

const outputDir = path.resolve('public/colleges');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function fetchJson(url) {
  return new Promise((resolve) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'NextBlockCollegeGuide/3.0 (academic platform; contact: pranesh.m@nextblock.org)'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch { resolve(null); }
      });
    });
    req.on('error', () => resolve(null));
    req.setTimeout(10000, () => {
      req.destroy();
      resolve(null);
    });
  });
}

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'NextBlockCollegeGuide/3.0 (academic platform; contact: pranesh.m@nextblock.org)'
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
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

async function getCommonsUrl(fileTitle) {
  const fTitle = fileTitle.startsWith('File:') ? fileTitle : `File:${fileTitle}`;
  const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(fTitle)}&prop=imageinfo&iiprop=url&iiurlwidth=1280&format=json`;
  const res = await fetchJson(url);
  const pages = res?.query?.pages;
  if (!pages) return null;
  const page = Object.values(pages)[0];
  const info = page?.imageinfo?.[0];
  return info?.thumburl || info?.url || null;
}

// Map of real authentic colleges and their corresponding Wikimedia Commons files / Wikipedia articles
const collegeImageSources = [
  { id: 'iit-madras', file: 'IIT Madras building.jpg', article: 'IIT_Madras' },
  { id: 'nit-trichy', file: 'NIT Trichy Administrative Block.jpg', article: 'National_Institute_of_Technology,_Tiruchirappalli' },
  { id: 'bits-pilani', file: 'BITS Pilani clock tower.jpg', article: 'BITS_Pilani' },
  { id: 'manipal-mahe', file: 'Manipal University Edu Building.jpg', article: 'Manipal_Academy_of_Higher_Education' },
  { id: 'thapar-university', file: 'Thapar University Patiala.jpg', article: 'Thapar_Institute_of_Engineering_and_Technology' },
  { id: 'pes-university', file: 'PES University.jpg', article: 'PES_University' },
  { id: 'rv-college-of-engineering', file: 'RV College of Engineering.jpg', article: 'RV_College_of_Engineering' },
  { id: 'kiit-university', file: 'KIIT Bhubaneswar.jpg', article: 'Kalinga_Institute_of_Industrial_Technology' },
  { id: 'shiv-nadar-university', file: 'Shiv Nadar University.jpg', article: 'Shiv_Nadar_University' },
  { id: 'sathyabama-chennai', file: 'Sathyabama University.jpg', article: 'Sathyabama_Institute_of_Science_and_Technology' },
  { id: 'sona-salem', file: 'Sona College of Technology Campus.jpg', article: 'Sona_College_of_Technology' },
  { id: 'sona-college-salem', file: 'Sona College of Technology Campus.jpg', article: 'Sona_College_of_Technology' },
  { id: 'sona-college-of-technology', file: 'Sona College of Technology Campus.jpg', article: 'Sona_College_of_Technology' },
  { id: 'national-engineering-college', file: 'National Engineering College, Kovilpatti.jpg', article: 'National_Engineering_College' },
  { id: 'gce-tirunelveli', file: 'Gcetirunelveli.jpg', article: 'Government_College_of_Engineering,_Tirunelveli' },
  { id: 'tpgit-vellore', file: 'Thanthai Periyar Government Institute of Technology.jpg', article: 'Thanthai_Periyar_Government_Institute_of_Technology' },
  { id: 'accet-karaikudi', file: 'Accet Administrative Building.jpg', article: 'Alagappa_Chettiar_Government_College_of_Engineering_and_Technology' },
  { id: 'alagappa-acet-karaikudi', file: 'Accet Administrative Building.jpg', article: 'Alagappa_Chettiar_Government_College_of_Engineering_and_Technology' },
  { id: 'acgcet-karaikudi', file: 'Accet Administrative Building.jpg', article: 'Alagappa_Chettiar_Government_College_of_Engineering_and_Technology' },
  { id: 'cit-chennai', file: 'Chennai Institute of Technology Campus.jpg', article: 'Chennai_Institute_of_Technology' },
  { id: 'chennai-institute-of-technology', file: 'Chennai Institute of Technology Campus.jpg', article: 'Chennai_Institute_of_Technology' },
  { id: 'psg-itech-coimbatore', file: 'PSG iTech Neelambur Campus.jpg', article: 'PSG_Institute_of_Technology_and_Applied_Research' },
  { id: 'panimalar-engineering-college', file: 'Panimalar Engineering College Campus.jpg', article: 'Panimalar_Engineering_College' },
  { id: 'rmk-engineering-college', file: 'RMK Engineering College Campus.jpg', article: 'R.M.K._Engineering_College' },
  { id: 'rmd-engineering-college', file: 'R.M.D. Engineering College.jpg', article: 'R.M.D._Engineering_College' },
  { id: 'kcg-college-of-technology', file: 'KCG College of Technology Campus.jpg', article: 'KCG_College_of_Technology' },
  { id: 'saranathan-college-of-engg', file: 'Saranathan College of Engineering Trichy.jpg', article: 'Saranathan_College_of_Engineering' },
  { id: 'k-ramakrishnan-college-of-engg', file: 'KRCE Trichy Campus.jpg', article: 'K._Ramakrishnan_College_of_Engineering' },
  { id: 'k-ramakrishnan-college-of-tech', file: 'KRCT Samayapuram.jpg', article: 'K._Ramakrishnan_College_of_Technology' },
  { id: 'adhiyamaan-college-of-engg', file: 'Adhiyamaan College of Engineering Hosur.jpg', article: 'Adhiyamaan_College_of_Engineering' },
  { id: 'gce-bodinayakkanur', file: 'GCE Bodinayakkanur Campus.jpg', article: 'Government_College_of_Engineering,_Bodinayakkanur' },
  { id: 'mcet-pollachi', file: 'Dr. Mahalingam College of Engineering and Technology.jpg', article: 'Dr._Mahalingam_College_of_Engineering_and_Technology' },
  { id: 'velammal-college-madurai', file: 'Velammal College of Engineering and Technology Madurai.jpg', article: 'Velammal_College_of_Engineering_and_Technology' },
  { id: 'kln-college-of-engineering', file: 'KLN College of Engineering Pottapalayam.jpg', article: 'K.L.N._College_of_Engineering' },
  { id: 'periyar-maniammai-thanjavur', file: 'Periyar Maniammai Institute of Science and Technology.jpg', article: 'Periyar_Maniammai_Institute_of_Science_%26_Technology' },
  { id: 'noorul-islam-university', file: 'Noorul Islam Centre for Higher Education.jpg', article: 'Noorul_Islam_Centre_for_Higher_Education' },
  { id: 'csi-college-of-engineering', file: 'CSI College of Engineering Ketti.jpg', article: 'CSI_College_of_Engineering' },
  { id: 'velalar-college-of-engg', file: 'Velalar College of Engineering and Technology.jpg', article: 'Velalar_College_of_Engineering_and_Technology' },
  { id: 'paavai-engineering-college', file: 'Paavai Engineering College.jpg', article: 'Paavai_Institutions' },
  { id: 'mahendra-engineering-college', file: 'Mahendra Engineering College.jpg', article: 'Mahendra_Educational_Institutions' },
  { id: 'ksr-college-of-tech', file: 'KSR College of Technology Tiruchengode.jpg', article: 'K.S._Rangasamy_College_of_Technology' },
  { id: 'ksr-college-of-technology', file: 'KSR College of Technology Tiruchengode.jpg', article: 'K.S._Rangasamy_College_of_Technology' }
];

async function run() {
  console.log(`Resolving ${collegeImageSources.length} colleges via MediaWiki API...`);
  for (const item of collegeImageSources) {
    const dest = path.join(outputDir, `${item.id}.jpg`);
    try {
      // 1. Try file directly
      let directUrl = null;
      if (item.file) {
        directUrl = await getCommonsUrl(item.file);
      }

      // 2. If no direct file URL, try article lead image / thumbnail
      if (!directUrl && item.article) {
        const pUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(item.article)}&prop=pageimages&pithumbsize=1200&format=json`;
        const pRes = await fetchJson(pUrl);
        const page = Object.values(pRes?.query?.pages || {})[0];
        if (page?.thumbnail?.source) {
          directUrl = page.thumbnail.source;
        }
      }

      if (directUrl) {
        console.log(`Downloading ${item.id} from ${directUrl}...`);
        await downloadImage(directUrl, dest);
        console.log(`✓ Saved ${item.id}.jpg`);
      } else {
        console.log(`! No URL found for ${item.id}`);
      }
    } catch (e) {
      console.log(`✗ Error for ${item.id}:`, e.message);
    }
  }
}

run();
