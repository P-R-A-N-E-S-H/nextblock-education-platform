export interface TNCollege {
  id: string;
  name: string;
  shortName: string;
  tneaCode?: string;
  institutionType: 'Government / University Campus' | 'Government Aided Autonomous' | 'Deemed-to-be University' | 'Self-Financing Autonomous' | 'Affiliated Engineering College';
  category: 'Top Tier Autonomous' | 'Deemed University' | 'Government Premier' | 'Coimbatore Landmark' | 'Chennai Landmark' | 'Regional Premier';
  city: string;
  district: string;
  zone: 'Chennai & Northern TN' | 'Coimbatore & Western TN' | 'Central Tamil Nadu' | 'Southern Tamil Nadu';
  establishedYear: number;
  nirfRank?: string;
  naacGrade?: string;
  nbaAccredited?: boolean;
  image: string;
  tneaCutoffGeneral?: string; // e.g. "195.5 – 199.5" or "185.0 – 192.0"
  admissionRoutes: string[]; // e.g. ["TNEA Single Window Counselling", "Management Quota", "AEEE", "VITEEE"]
  entranceExams: string[]; // ["TNEA", "AEEE", "VITEEE", "SRMJEEE", "JEE Main"]
  approxFeesPerYear: string;
  tuitionValue: number; // in INR
  placements: {
    highestPackage: string;
    averagePackage: string;
    medianPackage?: string;
    placementPercentage: string;
    topRecruiters: string[];
  };
  popularBranches: string[];
  allBranches: string[];
  campuses?: string[];
  hostelAvailable: boolean;
  hostelFees?: string;
  officialWebsite: string;
  overview: string;
  isFeatured?: boolean;
  isCoimbatoreHub?: boolean;
  verificationStatus?: 'VERIFIED' | 'UPDATED' | string;
  lastUpdated: string;
}

export const TN_DISTRICTS = [
  'Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore',
  'Dharmapuri', 'Dindigul', 'Erode', 'Kallakurichi', 'Kancheepuram',
  'Karur', 'Krishnagiri', 'Madurai', 'Mayiladuthurai', 'Nagapattinam',
  'Kanniyakumari', 'Namakkal', 'Perambalur', 'Pudukkottai', 'Ramanathapuram',
  'Ranipet', 'Salem', 'Sivaganga', 'Tenkasi', 'Thanjavur',
  'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tirupathur',
  'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Vellore',
  'Viluppuram', 'Virudhunagar', 'Nilgiris'
] as const;

export const tamilNaduCollegesData: TNCollege[] = [
  // =========================================================================
  // 1. FEATURED GOVERNMENT & UNIVERSITY CAMPUSES
  // =========================================================================
  {
    id: 'anna-university-ceg',
    name: 'College of Engineering, Guindy (CEG Anna University)',
    shortName: 'CEG Anna Univ',
    tneaCode: '0001',
    institutionType: 'Government / University Campus',
    category: 'Government Premier',
    city: 'Guindy, Chennai',
    district: 'Chennai',
    zone: 'Chennai & Northern TN',
    establishedYear: 1794,
    nirfRank: 'Rank #13 (Universities)',
    naacGrade: 'NAAC A++',
    nbaAccredited: true,
    image: '/colleges/ceg-guindy.jpg',
    tneaCutoffGeneral: '197.5 – 200.0 / 200',
    admissionRoutes: ['TNEA Single Window Counselling (Based on 12th PCM Cutoff)', 'Other State / NRI Quota'],
    entranceExams: ['TNEA'],
    approxFeesPerYear: '₹35,000 – ₹55,000 / yr (Government Regulated)',
    tuitionValue: 45000,
    placements: {
      highestPackage: '₹40.0 LPA',
      averagePackage: '₹8.5 LPA',
      medianPackage: '₹7.5 LPA',
      placementPercentage: '94%',
      topRecruiters: ['Cisco', 'Amazon', 'Morgan Stanley', 'Qualcomm', 'Zoho', 'TCS Ninja/Digital', 'L&T']
    },
    popularBranches: ['Computer Science (CSE)', 'Information Technology (IT)', 'ECE', 'Mechanical', 'Industrial Engg', 'Printing & Packaging Tech'],
    allBranches: [
      'CSE', 'Information Technology', 'ECE', 'EEE', 'Mechanical', 'Civil', 'Chemical', 'Industrial Engineering', 'Robotics & Automation', 'Bio-Medical'
    ],
    campuses: ['Main Guindy Campus (220 Acres)'],
    hostelAvailable: true,
    hostelFees: '₹32,000 / yr',
    officialWebsite: 'https://ceg.annauniv.edu',
    overview: 'Established in 1794, CEG is Asia’s oldest technical institution. The premier choice for top rankers in TNEA counselling with cutoff closing near 198.5–200/200.',
    isFeatured: true,
    lastUpdated: 'August 2026'
  },
  {
    id: 'mit-anna-univ',
    name: 'Madras Institute of Technology (MIT Campus, Anna University)',
    shortName: 'MIT Chromepet',
    tneaCode: '0004',
    institutionType: 'Government / University Campus',
    category: 'Government Premier',
    city: 'Chromepet, Chennai',
    district: 'Chennai',
    zone: 'Chennai & Northern TN',
    establishedYear: 1949,
    nirfRank: 'Rank #13 (Part of Anna University)',
    naacGrade: 'NAAC A++',
    nbaAccredited: true,
    image: '/colleges/mit-chromepet.jpg',
    tneaCutoffGeneral: '196.0 – 199.5 / 200',
    admissionRoutes: ['TNEA Single Window Counselling'],
    entranceExams: ['TNEA'],
    approxFeesPerYear: '₹35,000 – ₹55,000 / yr',
    tuitionValue: 45000,
    placements: {
      highestPackage: '₹38.5 LPA',
      averagePackage: '₹8.2 LPA',
      medianPackage: '₹7.0 LPA',
      placementPercentage: '91%',
      topRecruiters: ['Boeing', 'Airbus', 'ISRO', 'Amazon', 'Caterpillar', 'Zoho', 'BrahMos', 'TVS']
    },
    popularBranches: ['Aeronautical Engineering', 'Automobile Engineering', 'Computer Science (CSE)', 'Rubber & Plastic Tech', 'Robotics & Automation'],
    allBranches: [
      'CSE', 'Information Technology', 'ECE', 'EIE', 'Aeronautical', 'Automobile', 'Robotics & Automation', 'Mechatronics'
    ],
    campuses: ['Chromepet Campus (50 Acres)'],
    hostelAvailable: true,
    hostelFees: '₹30,000 / yr',
    officialWebsite: 'https://www.mitindia.edu',
    overview: 'Alma mater of Dr. A.P.J. Abdul Kalam. Renowned for pioneering Aeronautical, Automobile, Rubber & Plastics, and Instrumentation Engineering in India.',
    isFeatured: true,
    lastUpdated: 'August 2026'
  },
  {
    id: 'gct-coimbatore',
    name: 'Government College of Technology, Coimbatore (GCT)',
    shortName: 'GCT Coimbatore',
    tneaCode: '2005',
    institutionType: 'Government / University Campus',
    category: 'Government Premier',
    city: 'Thadagam Road, Coimbatore',
    district: 'Coimbatore',
    zone: 'Coimbatore & Western TN',
    establishedYear: 1945,
    nirfRank: 'Rank #101-150 Band',
    naacGrade: 'NAAC A+ (Autonomous Govt)',
    nbaAccredited: true,
    image: '/colleges/gct-cbe.jpg',
    tneaCutoffGeneral: '190.5 – 197.0 / 200',
    admissionRoutes: ['TNEA Single Window Counselling'],
    entranceExams: ['TNEA'],
    approxFeesPerYear: '₹20,000 – ₹35,000 / yr (Government Regulated)',
    tuitionValue: 28000,
    placements: {
      highestPackage: '₹26.0 LPA',
      averagePackage: '₹6.5 LPA',
      medianPackage: '₹5.5 LPA',
      placementPercentage: '90%',
      topRecruiters: ['Bosch', 'Zoho', 'Amazon', 'L&T', 'Qualcomm', 'TCS', 'Hyundai']
    },
    popularBranches: ['Computer Science', 'Information Technology', 'Electronics & Comm (ECE)', 'Mechanical', 'Civil', 'Production'],
    allBranches: [
      'CSE', 'Information Technology', 'ECE', 'EEE', 'EIE', 'Mechanical', 'Civil', 'Industrial Engineering'
    ],
    hostelAvailable: true,
    hostelFees: '₹24,000 / yr',
    officialWebsite: 'https://gct.ac.in',
    overview: 'A premier state government autonomous engineering institution with an 80-year legacy located on Thadagam Road, Coimbatore.',
    isFeatured: true,
    isCoimbatoreHub: true,
    lastUpdated: 'August 2026'
  },
  {
    id: 'alagappa-acet-karaikudi',
    name: 'Alagappa Chettiar Government College of Engineering and Technology (ACGCET Karaikudi)',
    shortName: 'Alagappa ACGCET',
    tneaCode: '5004',
    institutionType: 'Government / University Campus',
    category: 'Government Premier',
    city: 'Karaikudi',
    district: 'Sivaganga',
    zone: 'Southern Tamil Nadu',
    establishedYear: 1952,
    nirfRank: 'State Govt Autonomous',
    naacGrade: 'Govt Autonomous',
    nbaAccredited: true,
    image: '/colleges/alagappa-acet-karaikudi.jpg',
    tneaCutoffGeneral: '182.0 – 192.5 / 200',
    admissionRoutes: ['TNEA Single Window Counselling'],
    entranceExams: ['TNEA'],
    approxFeesPerYear: '₹18,000 – ₹30,000 / yr',
    tuitionValue: 24000,
    placements: {
      highestPackage: '₹22.0 LPA',
      averagePackage: '₹5.2 LPA',
      medianPackage: '₹4.5 LPA',
      placementPercentage: '88%',
      topRecruiters: ['TCS', 'Cognizant', 'L&T', 'BHEL', 'Zoho', 'Wipro']
    },
    popularBranches: ['Mechanical', 'Civil', 'Computer Science (CSE)', 'ECE', 'EEE'],
    allBranches: ['CSE', 'ECE', 'EEE', 'Mechanical', 'Civil'],
    hostelAvailable: true,
    hostelFees: '₹22,000 / yr',
    officialWebsite: 'https://accetedu.in',
    overview: 'Founded by philanthropist Dr. RM. Alagappa Chettiar in 1952, this landmark government autonomous institution is a beacon of engineering in Southern Tamil Nadu.',
    isFeatured: true,
    lastUpdated: 'August 2026'
  },

  // =========================================================================
  // 2. FEATURED DEEMED & PRIVATE UNIVERSITIES (TAMIL NADU)
  // =========================================================================
  {
    id: 'amrita-coimbatore',
    name: 'Amrita Vishwa Vidyapeetham',
    shortName: 'Amrita University',
    institutionType: 'Deemed-to-be University',
    category: 'Deemed University',
    city: 'Ettimadai, Coimbatore',
    district: 'Coimbatore',
    zone: 'Coimbatore & Western TN',
    campuses: ['Coimbatore (Main HQ, 400 Acres)', 'Chennai (Vengal)', 'Amaravati', 'Bengaluru', 'Amritapuri', 'Nagercoil'],
    establishedYear: 1994,
    nirfRank: 'Rank #7 (Overall / Universities in India)',
    naacGrade: 'NAAC A++ (CGPA 3.83/4.0)',
    nbaAccredited: true,
    image: '/colleges/amrita-cbe.jpg',
    tneaCutoffGeneral: 'Admission via AEEE / JEE Main (Not in TNEA)',
    admissionRoutes: ['AEEE (Amrita Entrance Exam)', 'JEE Main (30% reserved)', 'Direct SAT Score'],
    entranceExams: ['AEEE', 'JEE Main'],
    approxFeesPerYear: '₹3,50,000 – ₹6,00,000 / yr (Slab 1 to Slab 4 based on Rank)',
    tuitionValue: 450000,
    placements: {
      highestPackage: '₹56.95 LPA',
      averagePackage: '₹9.2 LPA',
      medianPackage: '₹8.0 LPA',
      placementPercentage: '95%+',
      topRecruiters: ['Microsoft', 'Google', 'Amazon', 'Cisco', 'Robert Bosch', 'Qualcomm', 'Infosys']
    },
    popularBranches: ['Computer Science (CSE)', 'AI & Data Science', 'Cyber Security', 'Aerospace Engineering', 'Automation & Robotics'],
    allBranches: [
      'CSE', 'AI & ML', 'AI & Data Science', 'Cyber Security', 'Aerospace', 'Mechanical', 'Civil', 'EEE', 'ECE', 'Chemical', 'Robotics & Automation'
    ],
    hostelAvailable: true,
    hostelFees: '₹95,000 – ₹1,30,000 / yr',
    officialWebsite: 'https://www.amrita.edu',
    overview: 'Multi-campus Institution of Eminence accredited with NAAC A++ (3.83). Sprawling 400-acre Coimbatore HQ campus at Ettimadai with world-class faculty and dual-degree programs.',
    isFeatured: true,
    isCoimbatoreHub: true,
    lastUpdated: 'August 2026'
  },
  {
    id: 'vit-vellore',
    name: 'Vellore Institute of Technology (VIT)',
    shortName: 'VIT Vellore / Chennai',
    institutionType: 'Deemed-to-be University',
    category: 'Deemed University',
    city: 'Katpadi, Vellore',
    district: 'Vellore',
    zone: 'Chennai & Northern TN',
    campuses: ['Vellore Campus (Main)', 'Chennai Campus (Vandalur-Kelambakkam Road)', 'Amaravati (AP)', 'Bhopal (MP)'],
    establishedYear: 1984,
    nirfRank: 'Rank #11 (Engineering)',
    naacGrade: 'NAAC A++ (CGPA 3.66)',
    nbaAccredited: true,
    image: '/colleges/vit-vellore.jpg',
    tneaCutoffGeneral: 'Admission purely via VITEEE (Online CBT)',
    admissionRoutes: ['VITEEE (VIT Engineering Entrance Exam)'],
    entranceExams: ['VITEEE'],
    approxFeesPerYear: '₹1,98,000 – ₹4,93,000 / yr (Category 1 to Category 5)',
    tuitionValue: 350000,
    placements: {
      highestPackage: '₹1.02 Crore (International) / ₹59.0 LPA (Domestic)',
      averagePackage: '₹9.9 LPA',
      medianPackage: '₹8.5 LPA',
      placementPercentage: '92%',
      topRecruiters: ['Microsoft', 'Amazon', 'AppDynamics', 'D.E. Shaw', 'Morgan Stanley', 'PayPal', 'TCS Digital']
    },
    popularBranches: ['Computer Science (CSE)', 'CSE with AI & ML', 'Information Technology', 'ECE', 'Biotechnology', 'Mechanical'],
    allBranches: [
      'CSE', 'AI & ML', 'AI & Data Science', 'Information Technology', 'Cyber Security', 'Data Science', 'ECE', 'EEE', 'Mechanical', 'Civil', 'Chemical', 'Biomedical', 'Biotechnology', 'Mechatronics'
    ],
    hostelAvailable: true,
    hostelFees: '₹1,10,000 – ₹2,20,000 / yr (AC / Non-AC Deluxe)',
    officialWebsite: 'https://www.vit.ac.in',
    overview: 'Institution of Eminence with campuses in Vellore and Chennai. Famous for its Fully Flexible Credit System (FFCS), student clubs, and record-breaking placement offers.',
    isFeatured: true,
    lastUpdated: 'August 2026'
  },
  {
    id: 'srm-ist-chennai',
    name: 'SRM Institute of Science and Technology',
    shortName: 'SRM IST Kattankulathur',
    institutionType: 'Deemed-to-be University',
    category: 'Deemed University',
    city: 'Kattankulathur, Chennai',
    district: 'Chengalpattu',
    zone: 'Chennai & Northern TN',
    campuses: ['Kattankulathur (Main 250 Acres)', 'Ramapuram (Chennai)', 'Vadapalani (Chennai)', 'Tiruchirappalli Campus', 'Delhi NCR'],
    establishedYear: 1985,
    nirfRank: 'Rank #28 (Engineering)',
    naacGrade: 'NAAC A++',
    nbaAccredited: true,
    image: '/colleges/srm-ktr.jpg',
    tneaCutoffGeneral: 'Admission via SRMJEEE (UG Entrance CBT)',
    admissionRoutes: ['SRMJEEE (Phase 1, 2 & 3 Online)'],
    entranceExams: ['SRMJEEE'],
    approxFeesPerYear: '₹2,60,000 – ₹4,75,000 / yr',
    tuitionValue: 375000,
    placements: {
      highestPackage: '₹57.0 LPA',
      averagePackage: '₹8.4 LPA',
      medianPackage: '₹7.5 LPA',
      placementPercentage: '92%',
      topRecruiters: ['Amazon', 'Google', 'Adobe', 'Motorq', 'Barclays', 'Optum', 'Wipro Turbo']
    },
    popularBranches: ['Computer Science (CSE)', 'Cloud Computing', 'AI & ML', 'Aerospace', 'Biotechnology', 'Automobile'],
    allBranches: [
      'CSE', 'AI & ML', 'AI & Data Science', 'Information Technology', 'Cyber Security', 'Data Science', 'ECE', 'EEE', 'Mechanical', 'Civil', 'Aerospace', 'Automobile', 'Biomedical', 'Biotechnology', 'Mechatronics', 'Robotics & Automation'
    ],
    hostelAvailable: true,
    hostelFees: '₹1,05,000 – ₹1,95,000 / yr',
    officialWebsite: 'https://www.srmist.edu.in',
    overview: 'One of India’s largest private institutions with over 50,000 students across Kattankulathur, Ramapuram, and Trichy campuses. Extensive Semester Abroad Programs with global universities.',
    isFeatured: true,
    lastUpdated: 'August 2026'
  },
  {
    id: 'sastra-deemed-thanjavur',
    name: 'Shanmugha Arts, Science, Technology & Research Academy (SASTRA)',
    shortName: 'SASTRA Deemed Univ',
    institutionType: 'Deemed-to-be University',
    category: 'Deemed University',
    city: 'Thirumalaisamudram, Thanjavur',
    district: 'Thanjavur',
    zone: 'Central Tamil Nadu',
    campuses: ['Thanjavur Main Campus', 'Kumbakonam (SRC Campus)', 'Chennai Center'],
    establishedYear: 1984,
    nirfRank: 'Rank #34 (Engineering) / #24 (Universities)',
    naacGrade: 'NAAC A++ (Category-1 Deemed University)',
    nbaAccredited: true,
    image: '/colleges/sastra-thanjavur.jpg',
    tneaCutoffGeneral: 'Stream 1 (70% JEE Main + 12th) | Stream 2 (30% 12th Board Normalized)',
    admissionRoutes: ['Stream 1: JEE Main + 12th (50:50 weightage)', 'Stream 2: 12th Board Aggregate purely on merit (No Donation / Capitation Fee)'],
    entranceExams: ['JEE Main'],
    approxFeesPerYear: '₹1,60,000 – ₹1,90,000 / yr (Transparent Uniform Fees)',
    tuitionValue: 175000,
    placements: {
      highestPackage: '₹34.5 LPA',
      averagePackage: '₹7.5 LPA',
      medianPackage: '₹6.5 LPA',
      placementPercentage: '92%',
      topRecruiters: ['Amazon', 'PayPal', 'TCS Digital', 'Morgan Stanley', 'Bosch', 'Zoho', 'Cognizant']
    },
    popularBranches: ['Computer Science (CSE)', 'AI & Data Science', 'Aerospace Engineering', 'Robotics & Automation', 'Bioinformatics'],
    allBranches: [
      'CSE', 'AI & ML', 'AI & Data Science', 'Information Technology', 'Cyber Security', 'ECE', 'EEE', 'EIE', 'Mechanical', 'Civil', 'Chemical', 'Aerospace', 'Biotechnology', 'Robotics & Automation', 'Mechatronics'
    ],
    hostelAvailable: true,
    hostelFees: '₹55,000 / yr',
    officialWebsite: 'https://www.sastra.edu',
    overview: 'SASTRA is celebrated for its uncompromising academic ethics, zero management quota fee, and Srinivasa Ramanujan Research Centre in Thanjavur.',
    isFeatured: true,
    lastUpdated: 'August 2026'
  },
  {
    id: 'karunya-university-cbe',
    name: 'Karunya Institute of Technology and Sciences',
    shortName: 'Karunya Deemed Univ',
    institutionType: 'Deemed-to-be University',
    category: 'Coimbatore Landmark',
    city: 'Siruvani, Coimbatore',
    district: 'Coimbatore',
    zone: 'Coimbatore & Western TN',
    establishedYear: 1986,
    nirfRank: 'Rank #101-150 Band',
    naacGrade: 'NAAC A++',
    nbaAccredited: true,
    image: '/colleges/karunya-university-cbe.jpg',
    tneaCutoffGeneral: 'Admission via KEE (Karunya Entrance Exam) / Merit',
    admissionRoutes: ['KEE (Karunya Entrance Examination)', 'Direct 12th Merit'],
    entranceExams: ['KEE'],
    approxFeesPerYear: '₹2,20,000 – ₹3,10,000 / yr',
    tuitionValue: 260000,
    placements: {
      highestPackage: '₹30.0 LPA',
      averagePackage: '₹6.0 LPA',
      medianPackage: '₹5.0 LPA',
      placementPercentage: '88%',
      topRecruiters: ['NutaniX', 'Amazon', 'Accenture', 'Zoho', 'Cognizant', 'BOSCH', 'Infosys']
    },
    popularBranches: ['Biotechnology', 'Aerospace Engg', 'Computer Science (CSE)', 'Robotics & AI', 'Water & Environmental Engg', 'Food Tech'],
    allBranches: [
      'CSE', 'AI & ML', 'AI & Data Science', 'Cyber Security', 'ECE', 'EEE', 'Mechanical', 'Civil', 'Aerospace', 'Biotechnology', 'Agricultural Engineering', 'Food Technology', 'Robotics & Automation'
    ],
    hostelAvailable: true,
    hostelFees: '₹85,000 / yr',
    officialWebsite: 'https://www.karunya.edu',
    overview: 'Located in the scenic foothills of Siruvani in Coimbatore. Pioneer in water research, aerospace testing wind tunnels, and agricultural engineering.',
    isFeatured: true,
    isCoimbatoreHub: true,
    lastUpdated: 'August 2026'
  },

  // =========================================================================
  // 3. FEATURED COIMBATORE AUTONOMOUS & GOVT-AIDED COLLEGES
  // =========================================================================
  {
    id: 'psg-college-of-technology',
    name: 'PSG College of Technology (PSG Tech)',
    shortName: 'PSG Tech Peelamedu',
    tneaCode: '2006',
    institutionType: 'Government Aided Autonomous',
    category: 'Coimbatore Landmark',
    city: 'Peelamedu, Coimbatore',
    district: 'Coimbatore',
    zone: 'Coimbatore & Western TN',
    establishedYear: 1951,
    nirfRank: 'Rank #63 (Engineering)',
    naacGrade: 'NAAC A (Govt Aided & Self Supporting)',
    nbaAccredited: true,
    image: '/colleges/psg-tech.jpg',
    tneaCutoffGeneral: '196.0 – 199.5 / 200 (Govt Aided) | 192.0 – 197.5 (SS)',
    admissionRoutes: ['TNEA Single Window Counselling (Aided & Self-Support)', 'Management Merit Quota for SS'],
    entranceExams: ['TNEA'],
    approxFeesPerYear: '₹45,000 / yr (Aided) | ₹1,50,000 / yr (Self Support)',
    tuitionValue: 95000,
    placements: {
      highestPackage: '₹40.0 LPA',
      averagePackage: '₹8.8 LPA',
      medianPackage: '₹7.5 LPA',
      placementPercentage: '95%',
      topRecruiters: ['Microsoft', 'Qualcomm', 'Amazon', 'DE Shaw', 'Cisco', 'Texas Instruments', 'Robert Bosch']
    },
    popularBranches: ['Mechanical (Sandwich Course)', 'Computer Science (CSE)', 'Production Engg (Sandwich)', 'Robotics & Automation', 'ECE', 'Automobile'],
    allBranches: [
      'CSE', 'Information Technology', 'AI & Data Science', 'ECE', 'EEE', 'EIE', 'Mechanical', 'Civil', 'Automobile', 'Biomedical', 'Biotechnology', 'Industrial Engineering', 'Robotics & Automation', 'Mechatronics', 'Textile Technology'
    ],
    hostelAvailable: true,
    hostelFees: '₹60,000 / yr',
    officialWebsite: 'https://www.psgtech.edu',
    overview: 'PSG Tech is Coimbatore’s crowning technical institution. Known across India for its industry-integrated 5-year Sandwich engineering courses and in-house heavy manufacturing plants.',
    isFeatured: true,
    isCoimbatoreHub: true,
    lastUpdated: 'August 2026'
  },
  {
    id: 'coimbatore-institute-of-technology',
    name: 'Coimbatore Institute of Technology (CIT Coimbatore)',
    shortName: 'CIT Coimbatore',
    tneaCode: '2007',
    institutionType: 'Government Aided Autonomous',
    category: 'Coimbatore Landmark',
    city: 'Civil Aerodrome Post, Coimbatore',
    district: 'Coimbatore',
    zone: 'Coimbatore & Western TN',
    establishedYear: 1956,
    nirfRank: 'Rank #101-150 Band',
    naacGrade: 'NAAC A+ (Govt Aided Autonomous)',
    nbaAccredited: true,
    image: '/colleges/cit-cbe.jpg',
    tneaCutoffGeneral: '192.5 – 198.0 / 200',
    admissionRoutes: ['TNEA Single Window Counselling'],
    entranceExams: ['TNEA'],
    approxFeesPerYear: '₹40,000 / yr (Aided) | ₹1,25,000 / yr (Self Support)',
    tuitionValue: 80000,
    placements: {
      highestPackage: '₹34.0 LPA',
      averagePackage: '₹7.5 LPA',
      medianPackage: '₹6.5 LPA',
      placementPercentage: '92%',
      topRecruiters: ['Qualcomm', 'Bosch', 'DE Shaw', 'Oracle', 'Zoho', 'L&T Construction', 'Amazon']
    },
    popularBranches: ['Computer Science (CSE)', 'Artificial Intelligence', 'Mechanical Engineering', 'Chemical Engg', 'ECE', 'Civil'],
    allBranches: [
      'CSE', 'Information Technology', 'AI & Data Science', 'ECE', 'EEE', 'Mechanical', 'Civil', 'Chemical'
    ],
    hostelAvailable: true,
    hostelFees: '₹50,000 / yr',
    officialWebsite: 'https://www.cit.edu.in',
    overview: '70-year-old landmark government-aided autonomous institution in Coimbatore. Renowned for its rigorous academic culture and high TNEA cutoff requirements.',
    isFeatured: true,
    isCoimbatoreHub: true,
    lastUpdated: 'August 2026'
  },
  {
    id: 'kumaraguru-college-of-technology',
    name: 'Kumaraguru College of Technology (KCT Coimbatore)',
    shortName: 'KCT Saravanampatti',
    tneaCode: '2712',
    institutionType: 'Self-Financing Autonomous',
    category: 'Coimbatore Landmark',
    city: 'Saravanampatti, Coimbatore',
    district: 'Coimbatore',
    zone: 'Coimbatore & Western TN',
    establishedYear: 1984,
    nirfRank: 'Rank #82 (Engineering)',
    naacGrade: 'NAAC A++ (Autonomous)',
    nbaAccredited: true,
    image: '/colleges/kct-cbe.jpg',
    tneaCutoffGeneral: '188.0 – 196.5 / 200',
    admissionRoutes: ['TNEA Counselling (65%)', 'Management Quota (35%)'],
    entranceExams: ['TNEA'],
    approxFeesPerYear: '₹1,30,000 – ₹1,90,000 / yr',
    tuitionValue: 150000,
    placements: {
      highestPackage: '₹35.0 LPA',
      averagePackage: '₹6.8 LPA',
      medianPackage: '₹5.5 LPA',
      placementPercentage: '91%',
      topRecruiters: ['Bosch', 'Amazon', 'Soliton', 'Cognizant', 'L&T Infotech', 'TCS Digital', 'Bain']
    },
    popularBranches: ['Computer Science (CSE)', 'AI & ML', 'Mechatronics', 'Aeronautical', 'Automobile', 'Biotechnology', 'Fashion Tech'],
    allBranches: [
      'CSE', 'AI & ML', 'AI & Data Science', 'Information Technology', 'Cyber Security', 'ECE', 'EEE', 'Mechanical', 'Civil', 'Aerospace', 'Automobile', 'Biotechnology', 'Mechatronics', 'Textile Technology'
    ],
    hostelAvailable: true,
    hostelFees: '₹85,000 / yr',
    officialWebsite: 'https://www.kct.ac.in',
    overview: '150-acre green campus in Saravanampatti. Home to FORGE Innovation Accelerator, Garage student motorsports workshops, and dynamic multidisciplinary clubs.',
    isFeatured: true,
    isCoimbatoreHub: true,
    lastUpdated: 'August 2026'
  },
  {
    id: 'kpr-institute-of-engg',
    name: 'KPR Institute of Engineering and Technology (KPRIET)',
    shortName: 'KPRIET Arasur',
    tneaCode: '2764',
    institutionType: 'Self-Financing Autonomous',
    category: 'Coimbatore Landmark',
    city: 'Arasur, Coimbatore',
    district: 'Coimbatore',
    zone: 'Coimbatore & Western TN',
    establishedYear: 2009,
    nirfRank: 'Rank #90 (Engineering)',
    naacGrade: 'NAAC A++ (Autonomous)',
    nbaAccredited: true,
    image: '/colleges/kpriet.jpg',
    tneaCutoffGeneral: '185.0 – 194.5 / 200',
    admissionRoutes: ['TNEA Single Window Counselling', 'Management Quota'],
    entranceExams: ['TNEA'],
    approxFeesPerYear: '₹1,25,000 – ₹1,80,000 / yr',
    tuitionValue: 145000,
    placements: {
      highestPackage: '₹54.0 LPA',
      averagePackage: '₹6.7 LPA',
      medianPackage: '₹5.5 LPA',
      placementPercentage: '93%',
      topRecruiters: ['Virtusa', 'Amazon', 'Accenture', 'TCS Digital', 'Bosch', 'Zoho', 'Cognizant']
    },
    popularBranches: ['Computer Science (CSE)', 'AI & Data Science', 'Chemical Engineering', 'Biomedical', 'Mechatronics', 'ECE'],
    allBranches: [
      'CSE', 'AI & ML', 'AI & Data Science', 'Information Technology', 'Cyber Security', 'ECE', 'EEE', 'Mechanical', 'Civil', 'Chemical', 'Biomedical', 'Mechatronics'
    ],
    hostelAvailable: true,
    hostelFees: '₹80,000 / yr',
    officialWebsite: 'https://www.kpriet.ac.in',
    overview: 'Backed by the KPR Group, KPRIET is an autonomous NAAC A++ institution known for modern smart campus labs, solar powered infrastructure, and top placement drives.',
    isFeatured: true,
    isCoimbatoreHub: true,
    lastUpdated: 'August 2026'
  },
  {
    id: 'skcet-coimbatore',
    name: 'Sri Krishna College of Engineering and Technology (SKCET)',
    shortName: 'SKCET Kuniamuthur',
    tneaCode: '2718',
    institutionType: 'Self-Financing Autonomous',
    category: 'Coimbatore Landmark',
    city: 'Kuniamuthur, Coimbatore',
    district: 'Coimbatore',
    zone: 'Coimbatore & Western TN',
    establishedYear: 1998,
    nirfRank: 'Rank #77 (Engineering)',
    naacGrade: 'NAAC A (Autonomous)',
    nbaAccredited: true,
    image: '/colleges/skcet.jpg',
    tneaCutoffGeneral: '186.0 – 195.0 / 200',
    admissionRoutes: ['TNEA Counselling', 'Management Quota'],
    entranceExams: ['TNEA'],
    approxFeesPerYear: '₹1,25,000 – ₹1,85,000 / yr',
    tuitionValue: 145000,
    placements: {
      highestPackage: '₹44.0 LPA',
      averagePackage: '₹6.5 LPA',
      medianPackage: '₹5.5 LPA',
      placementPercentage: '92%',
      topRecruiters: ['Amazon', 'Accenture', 'Virtusa', 'Wipro', 'Hexaware', 'Infosys', 'Capgemini']
    },
    popularBranches: ['Computer Science (CSE)', 'CSBS (Computer Science & Business Systems)', 'M.Tech CSE Integrated', 'ECE', 'Mechanical', 'Mechatronics'],
    allBranches: [
      'CSE', 'AI & ML', 'AI & Data Science', 'Information Technology', 'Cyber Security', 'ECE', 'EEE', 'Mechanical', 'Civil', 'Mechatronics'
    ],
    hostelAvailable: true,
    hostelFees: '₹80,000 / yr',
    officialWebsite: 'https://www.skcet.ac.in',
    overview: 'Ranked among the top autonomous institutions in Tamil Nadu, recognized for digital classrooms, hackathon champions, and tie-ups with TCS and Virtusa.',
    isFeatured: true,
    isCoimbatoreHub: true,
    lastUpdated: 'August 2026'
  },
  {
    id: 'sri-eshwar-coimbatore',
    name: 'Sri Eshwar College of Engineering (SECE)',
    shortName: 'Sri Eshwar Kinathukadavu',
    tneaCode: '2739',
    institutionType: 'Self-Financing Autonomous',
    category: 'Coimbatore Landmark',
    city: 'Kinathukadavu, Coimbatore',
    district: 'Coimbatore',
    zone: 'Coimbatore & Western TN',
    establishedYear: 2008,
    nirfRank: 'Rank #150-200 Band',
    naacGrade: 'NAAC A+ (Autonomous)',
    nbaAccredited: true,
    image: '/colleges/sece.jpg',
    tneaCutoffGeneral: '183.0 – 193.0 / 200',
    admissionRoutes: ['TNEA Counselling', 'Management Quota'],
    entranceExams: ['TNEA'],
    approxFeesPerYear: '₹1,20,000 – ₹1,75,000 / yr',
    tuitionValue: 140000,
    placements: {
      highestPackage: '₹40.0 LPA',
      averagePackage: '₹6.2 LPA',
      medianPackage: '₹5.2 LPA',
      placementPercentage: '94%',
      topRecruiters: ['Amazon', 'Virtusa', 'TCS', 'Cognizant', 'Soliton', 'Kaar Tech', 'Zoho']
    },
    popularBranches: ['Computer Science (CSE)', 'AI & Data Science', 'Computer Science & Business Systems (CSBS)', 'Cyber Security', 'ECE'],
    allBranches: [
      'CSE', 'AI & ML', 'AI & Data Science', 'Information Technology', 'Cyber Security', 'ECE', 'EEE', 'Mechanical'
    ],
    hostelAvailable: true,
    hostelFees: '₹75,000 / yr',
    officialWebsite: 'https://sece.ac.in',
    overview: 'Widely praised for specialized full-stack coding culture, product development incubators, and exceptional placement conversion rates.',
    isFeatured: true,
    isCoimbatoreHub: true,
    lastUpdated: 'August 2026'
  },
  {
    id: 'srec-coimbatore',
    name: 'Sri Ramakrishna Engineering College (SREC Vattamalaipalayam)',
    shortName: 'SREC Coimbatore',
    tneaCode: '2719',
    institutionType: 'Self-Financing Autonomous',
    category: 'Coimbatore Landmark',
    city: 'Vattamalaipalayam, Coimbatore',
    district: 'Coimbatore',
    zone: 'Coimbatore & Western TN',
    establishedYear: 1994,
    nirfRank: 'Rank #101-150 Band',
    naacGrade: 'NAAC A+ (Autonomous)',
    nbaAccredited: true,
    image: '/colleges/srec-cbe.jpg',
    tneaCutoffGeneral: '184.0 – 193.5 / 200',
    admissionRoutes: ['TNEA Single Window Counselling', 'Management Quota'],
    entranceExams: ['TNEA'],
    approxFeesPerYear: '₹1,20,000 – ₹1,80,000 / yr',
    tuitionValue: 145000,
    placements: {
      highestPackage: '₹32.0 LPA',
      averagePackage: '₹6.0 LPA',
      medianPackage: '₹5.0 LPA',
      placementPercentage: '91%',
      topRecruiters: ['Cognizant', 'Bosch', 'L&T Infotech', 'TCS', 'Amazon', 'Wipro', 'Hexaware']
    },
    popularBranches: ['Computer Science (CSE)', 'Biomedical Engineering', 'Aeronautical', 'Robotics & Automation', 'ECE', 'Mechanical'],
    allBranches: [
      'CSE', 'AI & ML', 'AI & Data Science', 'Information Technology', 'ECE', 'EEE', 'EIE', 'Mechanical', 'Civil', 'Aeronautical', 'Biomedical', 'Robotics & Automation'
    ],
    hostelAvailable: true,
    hostelFees: '₹75,000 / yr',
    officialWebsite: 'https://www.srec.ac.in',
    overview: 'Established by SNR Sons Charitable Trust in 1994. Renowned for its Biomedical Engineering facilities, robotics testing ground, and alumni network in core manufacturing.',
    isFeatured: true,
    isCoimbatoreHub: true,
    lastUpdated: 'August 2026'
  },
  {
    id: 'sns-college-of-technology',
    name: 'SNS College of Technology (SNS Tech)',
    shortName: 'SNS Tech Coimbatore',
    tneaCode: '2726',
    institutionType: 'Self-Financing Autonomous',
    category: 'Coimbatore Landmark',
    city: 'Saravanampatti, Coimbatore',
    district: 'Coimbatore',
    zone: 'Coimbatore & Western TN',
    establishedYear: 2002,
    nirfRank: 'Rank #150-200 Band',
    naacGrade: 'NAAC A++ (Autonomous)',
    nbaAccredited: true,
    image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1000&q=80',
    tneaCutoffGeneral: '180.0 – 190.5 / 200',
    admissionRoutes: ['TNEA Counselling', 'Management Quota'],
    entranceExams: ['TNEA'],
    approxFeesPerYear: '₹1,15,000 – ₹1,65,000 / yr',
    tuitionValue: 135000,
    placements: {
      highestPackage: '₹28.0 LPA',
      averagePackage: '₹5.5 LPA',
      medianPackage: '₹4.5 LPA',
      placementPercentage: '89%',
      topRecruiters: ['TCS', 'Wipro', 'Cognizant', 'HCL', 'Zoho', 'Soliton', 'Tech Mahindra']
    },
    popularBranches: ['Computer Science (CSE)', 'AI & Machine Learning', 'Aerospace Engineering', 'Agriculture Engg', 'ECE'],
    allBranches: [
      'CSE', 'AI & ML', 'AI & Data Science', 'Information Technology', 'Cyber Security', 'ECE', 'EEE', 'Mechanical', 'Civil', 'Aerospace', 'Agricultural Engineering', 'Mechatronics'
    ],
    hostelAvailable: true,
    hostelFees: '₹70,000 / yr',
    officialWebsite: 'https://snsct.org',
    overview: 'Pioneer of the Design Thinking Framework in technical education across Tamil Nadu with high industry certifications.',
    isFeatured: true,
    isCoimbatoreHub: true,
    lastUpdated: 'August 2026'
  },
  {
    id: 'hindusthan-college-of-engg',
    name: 'Hindusthan College of Engineering and Technology (HICET)',
    shortName: 'HICET Coimbatore',
    tneaCode: '2708',
    institutionType: 'Self-Financing Autonomous',
    category: 'Coimbatore Landmark',
    city: 'Malumichampatti, Coimbatore',
    district: 'Coimbatore',
    zone: 'Coimbatore & Western TN',
    establishedYear: 2000,
    nirfRank: 'Rank #150-200 Band',
    naacGrade: 'NAAC A+ (Autonomous)',
    nbaAccredited: true,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1000&q=80',
    tneaCutoffGeneral: '178.0 – 189.5 / 200',
    admissionRoutes: ['TNEA Counselling', 'Management Quota'],
    entranceExams: ['TNEA'],
    approxFeesPerYear: '₹1,15,000 – ₹1,65,000 / yr',
    tuitionValue: 135000,
    placements: {
      highestPackage: '₹25.0 LPA',
      averagePackage: '₹5.2 LPA',
      medianPackage: '₹4.5 LPA',
      placementPercentage: '88%',
      topRecruiters: ['Cognizant', 'TCS', 'Infosys', 'Capgemini', 'Zoho', 'Virtusa', 'Mindtree']
    },
    popularBranches: ['Computer Science', 'Aeronautical', 'Automobile', 'Food Tech', 'AI & DS', 'Mechanical'],
    allBranches: [
      'CSE', 'AI & ML', 'AI & Data Science', 'Information Technology', 'Cyber Security', 'ECE', 'EEE', 'Mechanical', 'Civil', 'Aeronautical', 'Automobile', 'Food Technology', 'Mechatronics'
    ],
    hostelAvailable: true,
    hostelFees: '₹68,000 / yr',
    officialWebsite: 'https://hicet.ac.in',
    overview: 'Located on Pollachi Main Road, HICET features 20+ specialized B.E./B.Tech programs and automotive design laboratories.',
    isFeatured: true,
    isCoimbatoreHub: true,
    lastUpdated: 'August 2026'
  },
  {
    id: 'karpagam-college-of-engg',
    name: 'Karpagam College of Engineering (KCE)',
    shortName: 'KCE Othakkalmandapam',
    tneaCode: '2710',
    institutionType: 'Self-Financing Autonomous',
    category: 'Coimbatore Landmark',
    city: 'Othakkalmandapam, Coimbatore',
    district: 'Coimbatore',
    zone: 'Coimbatore & Western TN',
    establishedYear: 2000,
    nirfRank: 'Rank #150-200 Band',
    naacGrade: 'NAAC A (Autonomous)',
    nbaAccredited: true,
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80',
    tneaCutoffGeneral: '179.0 – 189.0 / 200',
    admissionRoutes: ['TNEA Counselling', 'Management Quota'],
    entranceExams: ['TNEA'],
    approxFeesPerYear: '₹1,15,000 – ₹1,60,000 / yr',
    tuitionValue: 135000,
    placements: {
      highestPackage: '₹26.0 LPA',
      averagePackage: '₹5.2 LPA',
      medianPackage: '₹4.5 LPA',
      placementPercentage: '89%',
      topRecruiters: ['Zoho', 'TCS', 'Wipro', 'Cognizant', 'CTS', 'Hexaware', 'L&T']
    },
    popularBranches: ['Computer Science (CSE)', 'AI & Data Science', 'Cyber Security', 'ECE', 'Mechanical', 'VLSI Design'],
    allBranches: [
      'CSE', 'AI & ML', 'AI & Data Science', 'Information Technology', 'Cyber Security', 'ECE', 'EEE', 'EIE', 'Mechanical', 'Civil', 'VLSI'
    ],
    hostelAvailable: true,
    hostelFees: '₹68,000 / yr',
    officialWebsite: 'https://kce.ac.in',
    overview: 'Autonomous college with dedicated coding academies, full-stack incubator cells, and strong placement track record in IT software sectors.',
    isFeatured: true,
    isCoimbatoreHub: true,
    lastUpdated: 'August 2026'
  },
  {
    id: 'rathinam-technical-campus',
    name: 'Rathinam Technical Campus (Rathinam Techzone)',
    shortName: 'Rathinam Eachanari',
    tneaCode: '2727',
    institutionType: 'Self-Financing Autonomous',
    category: 'Coimbatore Landmark',
    city: 'Eachanari, Coimbatore',
    district: 'Coimbatore',
    zone: 'Coimbatore & Western TN',
    establishedYear: 2011,
    nirfRank: 'Autonomous Engineering',
    naacGrade: 'NAAC A+ (Autonomous)',
    nbaAccredited: true,
    image: 'https://images.unsplash.com/photo-1525921429624-479b6a26d84d?auto=format&fit=crop&w=1000&q=80',
    tneaCutoffGeneral: '175.0 – 186.0 / 200',
    admissionRoutes: ['TNEA Counselling', 'Management Quota'],
    entranceExams: ['TNEA'],
    approxFeesPerYear: '₹1,10,000 – ₹1,55,000 / yr',
    tuitionValue: 130000,
    placements: {
      highestPackage: '₹22.0 LPA',
      averagePackage: '₹5.0 LPA',
      medianPackage: '₹4.2 LPA',
      placementPercentage: '87%',
      topRecruiters: ['Cognizant', 'TCS', 'Infosys', 'Wipro', 'Mindtree', 'Bosch', 'Zoho']
    },
    popularBranches: ['Computer Science', 'AI & Machine Learning', 'Biotechnology', 'Biomedical', 'ECE', 'Mechanical'],
    allBranches: [
      'CSE', 'AI & ML', 'AI & Data Science', 'Information Technology', 'ECE', 'EEE', 'Mechanical', 'Biomedical', 'Biotechnology'
    ],
    hostelAvailable: true,
    hostelFees: '₹65,000 / yr',
    officialWebsite: 'https://rathinamtechnicalcampus.com',
    overview: 'Situated inside the 70-acre Rathinam Techzone IT Park in Eachanari with direct on-campus IT company interactions.',
    isFeatured: true,
    isCoimbatoreHub: true,
    lastUpdated: 'August 2026'
  },

  // =========================================================================
  // 4. FEATURED CHENNAI & REGIONAL LANDMARKS
  // =========================================================================
  {
    id: 'ssn-college-chennai',
    name: 'Sri Sivasubramaniya Nadar (SSN) College of Engineering',
    shortName: 'SSN College of Engg',
    tneaCode: '1315',
    institutionType: 'Self-Financing Autonomous',
    category: 'Chennai Landmark',
    city: 'Kalavakkam, OMR, Chennai',
    district: 'Chengalpattu',
    zone: 'Chennai & Northern TN',
    establishedYear: 1996,
    nirfRank: 'Rank #45 (Engineering in India)',
    naacGrade: 'NAAC A++ (Autonomous)',
    nbaAccredited: true,
    image: '/colleges/ssn.jpg',
    tneaCutoffGeneral: '194.0 – 198.5 / 200',
    admissionRoutes: ['TNEA Single Window Counselling (65%)', 'Management Merit Admission (35% based on 12th + Interview)'],
    entranceExams: ['TNEA'],
    approxFeesPerYear: '₹1,50,000 – ₹2,20,000 / yr',
    tuitionValue: 180000,
    placements: {
      highestPackage: '₹1.17 Crore (International) / ₹64.0 LPA (Domestic)',
      averagePackage: '₹10.5 LPA',
      medianPackage: '₹9.0 LPA',
      placementPercentage: '95%+',
      topRecruiters: ['Motorq', 'Amazon', 'PayPal', 'Citibank', 'Google', 'Caterpillar', 'Athenahealth']
    },
    popularBranches: ['Computer Science (CSE)', 'Information Technology (IT)', 'ECE', 'EEE', 'Mechanical', 'Biomedical', 'Chemical'],
    allBranches: [
      'CSE', 'Information Technology', 'ECE', 'EEE', 'Mechanical', 'Civil', 'Chemical', 'Biomedical'
    ],
    hostelAvailable: true,
    hostelFees: '₹1,10,000 / yr',
    officialWebsite: 'https://www.ssn.edu.in',
    overview: 'Founded by Shiv Nadar (Founder, HCL). Widely recognized as Tamil Nadu’s top autonomous self-financing engineering institution with unmatched student research funds.',
    isFeatured: true,
    lastUpdated: 'August 2026'
  },
  {
    id: 'thiagarajar-college-of-engg',
    name: 'Thiagarajar College of Engineering (TCE Madurai)',
    shortName: 'TCE Madurai',
    tneaCode: '5008',
    institutionType: 'Government Aided Autonomous',
    category: 'Regional Premier',
    city: 'Thiruparankundram, Madurai',
    district: 'Madurai',
    zone: 'Southern Tamil Nadu',
    establishedYear: 1957,
    nirfRank: 'Rank #85 (Engineering)',
    naacGrade: 'NAAC A+ (Govt Aided Autonomous)',
    nbaAccredited: true,
    image: '/colleges/tce-madurai.jpg',
    tneaCutoffGeneral: '191.0 – 197.5 / 200',
    admissionRoutes: ['TNEA Single Window Counselling (Aided & SS)'],
    entranceExams: ['TNEA'],
    approxFeesPerYear: '₹40,000 / yr (Aided) | ₹1,20,000 / yr (Self Support)',
    tuitionValue: 75000,
    placements: {
      highestPackage: '₹32.0 LPA',
      averagePackage: '₹7.2 LPA',
      medianPackage: '₹6.0 LPA',
      placementPercentage: '92%',
      topRecruiters: ['Honeywell', 'TCS Digital', 'Zoho', 'Amazon', 'Robert Bosch', 'Qualcomm', 'L&T']
    },
    popularBranches: ['Computer Science (CSE)', 'Electronics & Comm (ECE)', 'Mechanical', 'Mechatronics', 'Civil', 'Data Science'],
    allBranches: [
      'CSE', 'Information Technology', 'AI & Data Science', 'Data Science', 'ECE', 'EEE', 'Mechanical', 'Civil', 'Mechatronics'
    ],
    hostelAvailable: true,
    hostelFees: '₹45,000 / yr',
    officialWebsite: 'https://www.tce.edu',
    overview: 'The pinnacle of engineering in Southern Tamil Nadu. Historic 143-acre campus with dedicated Honeywell CoE research center.',
    isFeatured: true,
    lastUpdated: 'August 2026'
  },
  {
    id: 'kongu-engineering-college',
    name: 'Kongu Engineering College (KEC Perundurai)',
    shortName: 'KEC Erode',
    tneaCode: '2711',
    institutionType: 'Self-Financing Autonomous',
    category: 'Regional Premier',
    city: 'Perundurai, Erode',
    district: 'Erode',
    zone: 'Coimbatore & Western TN',
    establishedYear: 1984,
    nirfRank: 'Rank #100-150 Band',
    naacGrade: 'NAAC A++ (Autonomous)',
    nbaAccredited: true,
    image: '/colleges/kongu-erode.jpg',
    tneaCutoffGeneral: '184.0 – 193.0 / 200',
    admissionRoutes: ['TNEA Single Window Counselling', 'Management Quota'],
    entranceExams: ['TNEA'],
    approxFeesPerYear: '₹1,15,000 – ₹1,75,000 / yr',
    tuitionValue: 140000,
    placements: {
      highestPackage: '₹28.0 LPA',
      averagePackage: '₹5.5 LPA',
      medianPackage: '₹4.5 LPA',
      placementPercentage: '90%',
      topRecruiters: ['Cognizant', 'TCS', 'Wipro', 'Zoho', 'Hyundai Mobis', 'LTI Mindtree', 'Yamaha']
    },
    popularBranches: ['Computer Science', 'AI & Data Science', 'Food Tech', 'Chemical Engg', 'Mechatronics', 'Automobile'],
    allBranches: [
      'CSE', 'AI & ML', 'AI & Data Science', 'Information Technology', 'Cyber Security', 'ECE', 'EEE', 'Mechanical', 'Civil', 'Chemical', 'Automobile', 'Mechatronics', 'Food Technology'
    ],
    hostelAvailable: true,
    hostelFees: '₹75,000 / yr',
    officialWebsite: 'https://www.kongu.ac.in',
    overview: '170-acre landmark institution in Perundurai with high placement track records in core manufacturing and software across Western Tamil Nadu.',
    isFeatured: true,
    isCoimbatoreHub: true,
    lastUpdated: 'August 2026'
  },
  {
    id: 'bannari-amman-institute',
    name: 'Bannari Amman Institute of Technology (BIT Sathyamangalam)',
    shortName: 'BIT Sathy',
    tneaCode: '2702',
    institutionType: 'Self-Financing Autonomous',
    category: 'Regional Premier',
    city: 'Sathyamangalam, Erode',
    district: 'Erode',
    zone: 'Coimbatore & Western TN',
    establishedYear: 1996,
    nirfRank: 'Rank #100-150 Band',
    naacGrade: 'NAAC A+ (Autonomous)',
    nbaAccredited: true,
    image: '/colleges/bit-sathy.jpg',
    tneaCutoffGeneral: '183.0 – 192.5 / 200',
    admissionRoutes: ['TNEA Counselling', 'Management Quota'],
    entranceExams: ['TNEA'],
    approxFeesPerYear: '₹1,20,000 – ₹1,80,000 / yr',
    tuitionValue: 145000,
    placements: {
      highestPackage: '₹30.0 LPA',
      averagePackage: '₹5.8 LPA',
      medianPackage: '₹4.8 LPA',
      placementPercentage: '92%',
      topRecruiters: ['TCS', 'Amazon', 'Bosch', 'Zoho', 'Soliton', 'Kaar Technologies', 'TVS']
    },
    popularBranches: ['Computer Science', 'Information Technology', 'Biotechnology', 'Agricultural Engg', 'Automobile', 'Food Tech'],
    allBranches: [
      'CSE', 'AI & ML', 'AI & Data Science', 'Information Technology', 'ECE', 'EEE', 'Mechanical', 'Civil', 'Biotechnology', 'Agricultural Engineering', 'Food Technology', 'Mechatronics'
    ],
    hostelAvailable: true,
    hostelFees: '₹70,000 / yr',
    officialWebsite: 'https://www.bitsathy.ac.in',
    overview: '180-acre serene campus in Sathyamangalam with 24x7 Special Interest Groups (SIGs), intensive hackathon labs, and lush sports facilities.',
    isFeatured: true,
    isCoimbatoreHub: true,
    lastUpdated: 'August 2026'
  }
];
