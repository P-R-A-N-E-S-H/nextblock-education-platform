import https from 'https';

function fetchJson(url) {
  return new Promise((resolve) => {
    const req = https.get(url, {
      headers: { 'User-Agent': 'NextBlockCollegeGuide/3.0 (academic; pranesh.m@nextblock.org)' }
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

const titles = [
  'Indian_Institute_of_Technology_Madras',
  'National_Institute_of_Technology,_Tiruchirappalli',
  'Birla_Institute_of_Technology_and_Science,_Pilani',
  'Manipal_Academy_of_Higher_Education',
  'Thapar_Institute_of_Engineering_and_Technology',
  'PES_University',
  'R.V._College_of_Engineering',
  'Kalinga_Institute_of_Industrial_Technology',
  'Sona_College_of_Technology',
  'National_Engineering_College',
  'K.S._Rangasamy_College_of_Technology',
  'M._Kumarasamy_College_of_Engineering',
  'Sri_Krishna_College_of_Engineering_and_Technology',
  'Loyola-ICAM_College_of_Engineering_and_Technology',
  'Saveetha_Engineering_College',
  'Velammal_Engineering_College',
  'Sri_Sairam_Engineering_College',
  'Rajalakshmi_Engineering_College',
  'Panimalar_Engineering_College',
  'Easwari_Engineering_College',
  'Chennai_Institute_of_Technology'
];

async function run() {
  for (const t of titles) {
    const pUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(t)}&prop=pageimages|images&pithumbsize=1200&format=json`;
    const res = await fetchJson(pUrl);
    const page = Object.values(res?.query?.pages || {})[0];
    console.log(t, '->', page?.thumbnail?.source ? 'FOUND: ' + page.thumbnail.source.substring(0, 70) : 'NO THUMB');
  }
}

run();
