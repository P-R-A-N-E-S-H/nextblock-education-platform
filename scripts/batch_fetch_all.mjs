import fs from 'fs';
import path from 'path';
import { downloadImage, searchWikipediaImage, searchCommonsImage } from './search_and_fetch_all_colleges.mjs';

const outputDir = path.resolve('public/colleges');

const dataFiles = [
  'tamilNaduColleges.ts',
  'tamilNaduCollegesExtended.ts',
  'tamilNaduCollegesStatewide.ts',
  'tamilNaduCollegesMega.ts',
  'indiaColleges.ts',
  'universities.ts'
];

async function run() {
  const existingFiles = new Set(fs.readdirSync(outputDir));
  console.log(`Currently have ${existingFiles.size} images in public/colleges`);

  const allColleges = [];
  for (const f of dataFiles) {
    const filePath = path.join('src/data', f);
    const content = fs.readFileSync(filePath, 'utf8');
    const blocks = content.split(/\{\s*id:\s*'/).slice(1);
    for (const b of blocks) {
      const id = b.split("'")[0];
      const nameMatch = b.match(/name:\s*['"]([^'"]+)['"]/);
      const shortNameMatch = b.match(/shortName:\s*['"]([^'"]+)['"]/);
      const cityMatch = b.match(/city:\s*['"]([^'"]+)['"]/);
      const districtMatch = b.match(/district:\s*['"]([^'"]+)['"]/);
      const imgMatch = b.match(/image:\s*['"]([^'"]+)['"]/);

      allColleges.push({
        file: f,
        id,
        name: nameMatch ? nameMatch[1] : id,
        shortName: shortNameMatch ? shortNameMatch[1] : '',
        city: cityMatch ? cityMatch[1] : '',
        district: districtMatch ? districtMatch[1] : '',
        currentImg: imgMatch ? imgMatch[1] : ''
      });
    }
  }

  console.log(`Total colleges to verify: ${allColleges.length}`);

  const results = [];

  for (let i = 0; i < allColleges.length; i++) {
    const c = allColleges[i];
    const targetFilename = `${c.id}.jpg`;
    const targetPath = path.join(outputDir, targetFilename);

    // Check if already downloaded and has reasonable size (> 5KB)
    if (fs.existsSync(targetPath) && fs.statSync(targetPath).size > 5000) {
      console.log(`[${i+1}/${allColleges.length}] [EXISTS] ${c.id}`);
      results.push({ id: c.id, file: c.file, status: 'EXISTS', path: `/colleges/${targetFilename}` });
      continue;
    }

    console.log(`[${i+1}/${allColleges.length}] Searching photo for: ${c.name} (${c.id})...`);
    
    // 1. Try Wikipedia
    let match = await searchWikipediaImage(c.name, c.shortName);
    
    // 2. Try Commons
    if (!match) {
      match = await searchCommonsImage(c.name, c.shortName);
    }

    // 3. Try with city / district
    if (!match && c.city) {
      match = await searchWikipediaImage(`${c.name} ${c.city}`, `${c.shortName} ${c.city}`);
    }

    if (match) {
      try {
        console.log(`   Downloading: ${match.title} -> ${targetFilename}...`);
        await downloadImage(match.url, targetPath);
        if (fs.existsSync(targetPath) && fs.statSync(targetPath).size > 3000) {
          console.log(`   ✓ Saved ${targetFilename}`);
          results.push({ id: c.id, file: c.file, status: 'DOWNLOADED', path: `/colleges/${targetFilename}` });
        } else {
          results.push({ id: c.id, file: c.file, status: 'FAILED_SIZE', path: null });
        }
      } catch (err) {
        console.log(`   ✗ Download error:`, err.message);
        results.push({ id: c.id, file: c.file, status: 'DOWNLOAD_ERR', path: null });
      }
    } else {
      console.log(`   ! Not found on Wikipedia/Commons: ${c.name}`);
      results.push({ id: c.id, file: c.file, status: 'NOT_FOUND', path: null });
    }

    // brief pause
    await new Promise(r => setTimeout(r, 200));
  }

  fs.writeFileSync('scripts/fetch_results.json', JSON.stringify(results, null, 2));
  console.log('\nFinished initial batch search. Results saved to scripts/fetch_results.json');
}

run();
