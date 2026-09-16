import fs from 'fs';
import path from 'path';

const files = [
  'tamilNaduColleges.ts',
  'tamilNaduCollegesExtended.ts',
  'tamilNaduCollegesStatewide.ts',
  'tamilNaduCollegesMega.ts',
  'indiaColleges.ts',
  'universities.ts'
];

const all = [];
const imageMap = new Map();

for (const f of files) {
  const content = fs.readFileSync(path.join('src/data', f), 'utf8');
  const blocks = content.split(/\{\s*id:\s*'/).slice(1);
  for (const b of blocks) {
    const id = b.split("'")[0];
    const nameMatch = b.match(/name:\s*['"]([^'"]+)['"]/);
    const imgMatch = b.match(/image:\s*['"]([^'"]+)['"]/);
    const shortNameMatch = b.match(/shortName:\s*['"]([^'"]+)['"]/);
    const cityMatch = b.match(/city:\s*['"]([^'"]+)['"]/);
    const districtMatch = b.match(/district:\s*['"]([^'"]+)['"]/);
    const name = nameMatch ? nameMatch[1] : id;
    const img = imgMatch ? imgMatch[1] : '';
    const shortName = shortNameMatch ? shortNameMatch[1] : '';
    const city = cityMatch ? cityMatch[1] : '';
    const district = districtMatch ? districtMatch[1] : '';
    
    all.push({ file: f, id, name, shortName, city, district, img });
    imageMap.set(img, (imageMap.get(img) || 0) + 1);
  }
}

console.log('Total colleges:', all.length);
console.log('Unique images:', imageMap.size);

const duplicates = [...imageMap.entries()].filter(([img, count]) => count > 1);
console.log('Duplicate image URLs count:', duplicates.length);

duplicates.forEach(([img, count]) => {
  console.log(`[${count}x] ${img}`);
  const matching = all.filter(c => c.img === img).map(c => `${c.id} (${c.name})`);
  console.log(`   Colleges: ${matching.join(', ')}`);
});
