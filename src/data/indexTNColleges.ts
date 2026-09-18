import { TNCollege, tamilNaduCollegesData, TN_DISTRICTS } from './tamilNaduColleges';
import { additionalTNColleges } from './tamilNaduCollegesExtended';
import { statewideTNColleges } from './tamilNaduCollegesStatewide';
import { megaTNColleges } from './tamilNaduCollegesMega';
import { tamilNaduMedicalCollegesData } from './tamilNaduMedicalColleges';
import { tamilNaduArtsScienceCollegesData } from './tamilNaduArtsScienceColleges';

export * from './tamilNaduColleges';
export * from './tamilNaduMedicalColleges';
export * from './tamilNaduArtsScienceColleges';

// Normalize engineering colleges to have stream: 'Engineering'
const normalizedEnggColleges: TNCollege[] = [
  ...tamilNaduCollegesData,
  ...additionalTNColleges,
  ...statewideTNColleges,
  ...megaTNColleges
].map((college) => ({
  ...college,
  stream: college.stream || 'Engineering',
  streams: college.streams || ['Engineering', 'Technology']
}));

export const allTNCollegesData: TNCollege[] = [
  ...normalizedEnggColleges,
  ...tamilNaduMedicalCollegesData,
  ...tamilNaduArtsScienceCollegesData
];

export const getEngineeringColleges = (): TNCollege[] => {
  return allTNCollegesData.filter(c => (c.stream || '').toLowerCase().includes('engineering'));
};

export const getMedicalColleges = (): TNCollege[] => {
  return allTNCollegesData.filter(c => (c.stream || '').toLowerCase().includes('medical'));
};

export const getArtsScienceColleges = (): TNCollege[] => {
  return allTNCollegesData.filter(c => (c.stream || '').toLowerCase().includes('arts') || (c.stream || '').toLowerCase().includes('science'));
};

export const getCollegesByStream = (stream: string): TNCollege[] => {
  if (!stream || stream === 'All' || stream === 'All Disciplines' || stream === 'All Streams') {
    return allTNCollegesData;
  }
  const s = stream.toLowerCase();
  return allTNCollegesData.filter(c => {
    const colStream = (c.stream || '').toLowerCase();
    const colStreams = (c.streams || []).map(item => item.toLowerCase());
    return colStream.includes(s) || colStreams.some(item => item.includes(s));
  });
};

export const getDistrictCollegesCount = (district: string): number => {
  return allTNCollegesData.filter(c => c.district.toLowerCase() === district.toLowerCase()).length;
};

export const getCoimbatoreColleges = (): TNCollege[] => {
  return allTNCollegesData.filter(c => c.district.toLowerCase() === 'coimbatore' || c.isCoimbatoreHub);
};

export const getChennaiColleges = (): TNCollege[] => {
  return allTNCollegesData.filter(c => 
    c.district.toLowerCase() === 'chennai' || 
    c.district.toLowerCase() === 'kancheepuram' || 
    c.district.toLowerCase() === 'chengalpattu' || 
    c.district.toLowerCase() === 'tiruvallur'
  );
};

export const getMaduraiColleges = (): TNCollege[] => {
  return allTNCollegesData.filter(c => 
    c.district.toLowerCase() === 'madurai' || 
    c.district.toLowerCase() === 'dindigul' || 
    c.district.toLowerCase() === 'virudhunagar' || 
    c.district.toLowerCase() === 'sivaganga'
  );
};

export const getTrichyColleges = (): TNCollege[] => {
  return allTNCollegesData.filter(c => 
    c.district.toLowerCase() === 'tiruchirappalli' || 
    c.district.toLowerCase() === 'thanjavur' || 
    c.district.toLowerCase() === 'pudukkottai' || 
    c.district.toLowerCase() === 'karur'
  );
};

export const getSalemColleges = (): TNCollege[] => {
  return allTNCollegesData.filter(c => 
    c.district.toLowerCase() === 'salem' || 
    c.district.toLowerCase() === 'namakkal' || 
    c.district.toLowerCase() === 'dharmapuri' || 
    c.district.toLowerCase() === 'erode'
  );
};
