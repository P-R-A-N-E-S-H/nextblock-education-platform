import { TNCollege, tamilNaduCollegesData, TN_DISTRICTS } from './tamilNaduColleges';
import { additionalTNColleges } from './tamilNaduCollegesExtended';
import { statewideTNColleges } from './tamilNaduCollegesStatewide';
import { megaTNColleges } from './tamilNaduCollegesMega';

export * from './tamilNaduColleges';

export const allTNCollegesData: TNCollege[] = [
  ...tamilNaduCollegesData,
  ...additionalTNColleges,
  ...statewideTNColleges,
  ...megaTNColleges
];

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

