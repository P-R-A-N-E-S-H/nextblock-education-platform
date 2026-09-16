import https from 'https';

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
  });
}

async function test(name) {
  const clean = name.replace(/\([^)]*\)/g, '').replace(/,/g, ' ').replace(/\s+/g, ' ').trim();
  const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(clean)}&format=json&srlimit=5`;
  const res = await fetchJson(url);
  console.log('Query:', clean);
  if (res?.query?.search) {
    for (const item of res.query.search) {
      console.log(' - Title:', item.title, 'snippet:', item.snippet.substring(0, 60));
      // get image
      const pUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(item.title)}&prop=pageimages|images&pithumbsize=1000&format=json`;
      const pRes = await fetchJson(pUrl);
      const page = Object.values(pRes?.query?.pages || {})[0];
      if (page?.thumbnail?.source) {
        console.log('   IMAGE:', page.thumbnail.source);
        break;
      }
    }
  }
}

async function run() {
  await test('College of Engineering, Guindy (CEG Anna University)');
  await test('Madras Institute of Technology (MIT Campus, Anna University)');
  await test('Government College of Technology, Coimbatore (GCT)');
  await test('PSG College of Technology (PSG Tech)');
  await test('Bannari Amman Institute of Technology (BIT Sathyamangalam)');
}

run();
