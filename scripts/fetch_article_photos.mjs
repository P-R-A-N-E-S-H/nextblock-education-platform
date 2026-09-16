import fs from 'fs';
import path from 'path';
import https from 'https';

const outputDir = path.resolve('public/colleges');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'NextBlockCollegeGuide/2.0 (education platform; nextblock.educations@gmail.com)' } }, (res) => {
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
    https.get(url, { headers: { 'User-Agent': 'NextBlockCollegeGuide/2.0 (education platform; nextblock.educations@gmail.com)' } }, (res) => {
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

const colleges = [
  { id: 'ceg-guindy', title: 'College_of_Engineering,_Guindy' },
  { id: 'mit-chromepet', title: 'Madras_Institute_of_Technology' },
  { id: 'srm-ktr', title: 'SRM_Institute_of_Science_and_Technology' },
  { id: 'sastra-thanjavur', title: 'Shanmugha_Arts,_Science,_Technology_%26_Research_Academy' },
  { id: 'ssn-chennai', title: 'SSN_College_of_Engineering' },
  { id: 'tce-madurai', title: 'Thiagarajar_College_of_Engineering' },
  { id: 'gct-cbe', title: 'Government_College_of_Technology,_Coimbatore' },
  { id: 'svce-chennai', title: 'Sri_Venkateswara_College_of_Engineering' },
  { id: 'sairam-chennai', title: 'Sri_Sairam_Engineering_College' },
  { id: 'sona-salem', title: 'Sona_College_of_Technology' },
  { id: 'kongu-erode', title: 'Kongu_Engineering_College' },
  { id: 'bit-sathy', title: 'Bannari_Amman_Institute_of_Technology' },
  { id: 'skcet-cbe', title: 'Sri_Krishna_College_of_Engineering_and_Technology' },
  { id: 'karunya-cbe', title: 'Karunya_Institute_of_Technology_and_Sciences' },
  { id: 'rmk-chennai', title: 'R.M.K._Engineering_College' },
  { id: 'velammal-chennai', title: 'Velammal_Engineering_College' },
  { id: 'saveetha-chennai', title: 'Saveetha_Engineering_College' },
  { id: 'panimalar-chennai', title: 'Panimalar_Engineering_College' },
  { id: 'easwari-chennai', title: 'Easwari_Engineering_College' },
  { id: 'kcg-chennai', title: 'KCG_College_of_Technology' },
  { id: 'mcet-pollachi', title: 'Dr._Mahalingam_College_of_Engineering_and_Technology' },
  { id: 'srec-cbe', title: 'Sri_Ramakrishna_Engineering_College' },
  { id: 'cit-chennai', title: 'Chennai_Institute_of_Technology' },
  { id: 'saranathan-trichy', title: 'Saranathan_College_of_Engineering' },
  { id: 'krce-trichy', title: 'K._Ramakrishnan_College_of_Engineering' },
  { id: 'mkce-karur', title: 'M._Kumarasamy_College_of_Engineering' },
  { id: 'vsb-karur', title: 'VSB_Engineering_College' },
  { id: 'gce-bargur', title: 'Government_College_of_Engineering,_Bargur' },
  { id: 'adhiyamaan-hosur', title: 'Adhiyamaan_College_of_Engineering' },
  { id: 'tpgit-vellore', title: 'Thanthai_Periyar_Government_Institute_of_Technology' },
  { id: 'gce-tirunelveli', title: 'Government_College_of_Engineering,_Tirunelveli' },
  { id: 'accet-karaikudi', title: 'Alagappa_Chettiar_Government_College_of_Engineering_and_Technology' },
  { id: 'psna-dindigul', title: 'PSNA_College_of_Engineering_and_Technology' },
  { id: 'gce-salem', title: 'Government_College_of_Engineering,_Salem' },
  { id: 'gce-theni', title: 'Government_College_of_Engineering,_Bodinayakkanur' }
];

async function getArticleImages(title) {
  const url = `https://en.wikipedia.org/w/api.php?action=parse&page=${title}&prop=images&format=json`;
  const data = await fetchJson(url);
  return data?.parse?.images || [];
}

async function getImageInfo(imageTitle) {
  const formattedTitle = imageTitle.startsWith('File:') ? imageTitle : `File:${imageTitle}`;
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(formattedTitle)}&prop=imageinfo&iiprop=url&iiurlwidth=1200&format=json`;
  const data = await fetchJson(url);
  const pages = data?.query?.pages;
  if (!pages) return null;
  const page = Object.values(pages)[0];
  const info = page?.imageinfo?.[0];
  return info?.thumburl || info?.url || null;
}

async function run() {
  console.log('Fetching real photos from Wikipedia articles...');
  for (const c of colleges) {
    const dest = path.join(outputDir, `${c.id}.jpg`);
    try {
      const images = await getArticleImages(c.title);
      console.log(`Article ${c.title} has ${images.length} images:`, images.join(', '));
      // Filter for campus photos (avoid icons, SVGs, logos, stamps, emblems if possible)
      let candidate = images.find(img => {
        const lower = img.toLowerCase();
        return (lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.png')) &&
               !lower.includes('logo') && !lower.includes('icon') && !lower.includes('emblem') &&
               !lower.includes('seal') && !lower.includes('crest') && !lower.includes('symbol');
      });

      // If no photo found with exclusion, take any jpg/png
      if (!candidate) {
        candidate = images.find(img => img.toLowerCase().endsWith('.jpg') || img.toLowerCase().endsWith('.png') || img.toLowerCase().endsWith('.jpeg'));
      }

      if (candidate) {
        const directUrl = await getImageInfo(candidate);
        if (directUrl) {
          console.log(`Downloading real image for ${c.id} from ${directUrl}...`);
          await downloadImage(directUrl, dest);
          console.log(`✓ Saved ${c.id}.jpg`);
        } else {
          console.log(`! No direct URL found for ${candidate}`);
        }
      } else {
        console.log(`- No image candidate for ${c.title}`);
      }
    } catch (e) {
      console.log(`Error processing ${c.title}:`, e.message);
    }
  }
}

run();
