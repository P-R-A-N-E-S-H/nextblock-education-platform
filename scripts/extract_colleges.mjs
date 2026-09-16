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

const list = [];
for (const f of files) {
  const content = fs.readFileSync(path.join('src/data', f), 'utf8');
  const blocks = content.split(/\{\s*id:\s*'/).slice(1);
  for (const b of blocks) {
    const id = b.split("'")[0];
    const nameMatch = b.match(/name:\s*['"]([^'"]+)['"]/);
    const shortNameMatch = b.match(/shortName:\s*['"]([^'"]+)['"]/);
    const cityMatch = b.match(/city:\s*['"]([^'"]+)['"]/);
    const districtMatch = b.match(/district:\s*['"]([^'"]+)['"]/);
    const imgMatch = b.match(/image:\s*['"]([^'"]+)['"]/);

    list.push({
      file: f,
      id,
      name: nameMatch ? nameMatch[1] : id,
      shortName: shortNameMatch ? shortNameMatch[1] : '',
      city: cityMatch ? cityMatch[1] : '',
      district: districtMatch ? districtMatch[1] : '',
      currentImage: imgMatch ? imgMatch[1] : ''
    });
  }
}

fs.writeFileSync('scripts/all_colleges_list.json', JSON.stringify(list, null, 2));
console.log('Saved all_colleges_list.json with', list.length, 'colleges.');
