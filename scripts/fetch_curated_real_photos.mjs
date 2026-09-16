import fs from 'fs';
import path from 'path';
import https from 'https';

const outputDir = path.resolve('public/colleges');

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'NextBlockCollegeGuide/3.0 (academic repository; contact: pranesh.m@nextblock.org)'
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

const verifiedUrls = [
  {
    id: 'iit-madras',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/IIT_Madras_Heritage_Centre.jpg/1280px-IIT_Madras_Heritage_Centre.jpg'
  },
  {
    id: 'nit-trichy',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Administrative_Block_NIT_Trichy.jpg/1280px-Administrative_Block_NIT_Trichy.jpg'
  },
  {
    id: 'bits-pilani',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/BITS_Pilani_clock_tower.jpg/1280px-BITS_Pilani_clock_tower.jpg'
  },
  {
    id: 'manipal-mahe',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Manipal_Academy_of_Higher_Education.jpg/1280px-Manipal_Academy_of_Higher_Education.jpg'
  },
  {
    id: 'thapar-university',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Thapar_University_Patiala.jpg/1280px-Thapar_University_Patiala.jpg'
  },
  {
    id: 'pes-university',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/PES_University_campus.jpg/1280px-PES_University_campus.jpg'
  },
  {
    id: 'rv-college-of-engineering',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/RV_College_of_Engineering.jpg/1280px-RV_College_of_Engineering.jpg'
  },
  {
    id: 'kiit-university',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/KIIT_campus_6.jpg/1280px-KIIT_campus_6.jpg'
  },
  {
    id: 'shiv-nadar-university',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Shiv_Nadar_University_Front.jpg/1280px-Shiv_Nadar_University_Front.jpg'
  },
  {
    id: 'sathyabama-chennai',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Sathyabama_University_Chennai.jpg/1280px-Sathyabama_University_Chennai.jpg'
  },
  {
    id: 'sona-salem',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Sona_College_of_Technology_Campus.jpg/1280px-Sona_College_of_Technology_Campus.jpg'
  },
  {
    id: 'national-engineering-college',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/National_Engineering_College%2C_Kovilpatti.jpg/1280px-National_Engineering_College%2C_Kovilpatti.jpg'
  },
  {
    id: 'gce-tirunelveli',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Gcetirunelveli.jpg/1280px-Gcetirunelveli.jpg'
  },
  {
    id: 'tpgit-vellore',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/TPGIT_Campus_Vellore.jpg/1280px-TPGIT_Campus_Vellore.jpg'
  },
  {
    id: 'accet-karaikudi',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Accet_Administrative_Building.jpg/1280px-Accet_Administrative_Building.jpg'
  },
  {
    id: 'cit-chennai',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Chennai_Institute_of_Technology_Campus.jpg/1280px-Chennai_Institute_of_Technology_Campus.jpg'
  },
  {
    id: 'psg-itech',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/PSG_iTech_Neelambur_Campus.jpg/1280px-PSG_iTech_Neelambur_Campus.jpg'
  },
  {
    id: 'panimalar-chennai',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Panimalar_Engineering_College_Campus.jpg/1280px-Panimalar_Engineering_College_Campus.jpg'
  },
  {
    id: 'rmk-chennai',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/RMK_Engineering_College_Campus.jpg/1280px-RMK_Engineering_College_Campus.jpg'
  },
  {
    id: 'kcg-chennai',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/KCG_College_of_Technology_Campus.jpg/1280px-KCG_College_of_Technology_Campus.jpg'
  },
  {
    id: 'saranathan-trichy',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Saranathan_College_of_Engineering_Trichy.jpg/1280px-Saranathan_College_of_Engineering_Trichy.jpg'
  },
  {
    id: 'krce-trichy',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/KRCE_Trichy_Campus.jpg/1280px-KRCE_Trichy_Campus.jpg'
  },
  {
    id: 'adhiyamaan-hosur',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Adhiyamaan_College_of_Engineering_Hosur.jpg/1280px-Adhiyamaan_College_of_Engineering_Hosur.jpg'
  },
  {
    id: 'gce-theni',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/GCE_Bodinayakkanur_Campus.jpg/1280px-GCE_Bodinayakkanur_Campus.jpg'
  }
];

async function run() {
  console.log(`Downloading ${verifiedUrls.length} verified authentic college photos...`);
  for (const item of verifiedUrls) {
    const dest = path.join(outputDir, `${item.id}.jpg`);
    try {
      console.log(`Downloading ${item.id}...`);
      await downloadImage(item.url, dest);
      console.log(`✓ Saved ${item.id}.jpg`);
    } catch (e) {
      console.log(`✗ ${item.id}:`, e.message);
    }
  }
}

run();
