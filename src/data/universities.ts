import { University } from '../types';

export const universitiesData: University[] = [
  {
    id: 'ceg-anna-univ',
    name: 'College of Engineering, Guindy (CEG Anna University)',
    location: 'Chennai, Tamil Nadu',
    state: 'Tamil Nadu',
    nirfRank: '#13 (NIRF Engineering)',
    naacGrade: 'NAAC A++',
    tneaCode: '0001',
    tuitionFee: '₹35,000 / year',
    tuitionValue: 35000,
    popularCourses: ['B.E. Computer Science', 'B.Tech AI & Data Science', 'B.E. Electronics & Communication'],
    intakes: ['TNEA Round 1 (July)'],
    image: '/colleges/ceg-guindy.jpg',
    category: 'Government Premier',
    scholarshipsAvailable: '7.5% Govt School 100% Free Seat & First Graduate Aid',
    deadline: 'June 2026',
    cutoffGeneral: '197.5 – 200.0 / 200',
    requirements: {
      cutoffPcm: '197.5+ / 200',
      entranceExam: 'TNEA Single Window Counselling'
    },
    highlights: ['Estd 1794 (Asia’s Oldest Tech School)', '₹40 LPA Highest CTC', '99% Placement Record']
  },
  {
    id: 'psg-tech-coimbatore',
    name: 'PSG College of Technology',
    location: 'Peelamedu, Coimbatore',
    state: 'Tamil Nadu',
    nirfRank: '#63 (NIRF)',
    naacGrade: 'NAAC A++',
    tneaCode: '2006',
    tuitionFee: '₹85,000 / year (Aided) / ₹1.45L (SF)',
    tuitionValue: 85000,
    popularCourses: ['B.Tech AI & Data Science', 'B.E. Computer Science', 'B.E. Robotics & Automation'],
    intakes: ['TNEA Round 1 (July)'],
    image: '/colleges/psg-tech.jpg',
    category: 'Coimbatore Landmark',
    scholarshipsAvailable: 'PSG Merit Excellence Waiver & FG Concessions',
    deadline: 'June 2026',
    cutoffGeneral: '194.0 – 199.0 / 200',
    requirements: {
      cutoffPcm: '194.0+ / 200',
      entranceExam: 'TNEA / Management Quota'
    },
    highlights: ['Industry 4.0 Labs', '₹38 LPA Highest CTC', '200+ Global Tech Recruiters']
  },
  {
    id: 'ssn-chennai',
    name: 'SSN College of Engineering',
    location: 'Kalavakkam, Chennai',
    state: 'Tamil Nadu',
    nirfRank: '#45 (NIRF)',
    naacGrade: 'NAAC A++',
    tneaCode: '1315',
    tuitionFee: '₹1,50,000 / year',
    tuitionValue: 150000,
    popularCourses: ['B.E. Computer Science', 'B.Tech IT', 'B.E. ECE'],
    intakes: ['TNEA Round 1 (July)', 'SSN Merit Entrance'],
    image: '/colleges/ssn.jpg',
    category: 'Chennai Landmark',
    scholarshipsAvailable: '₹4.5 Cr Annual Shiv Nadar Merit Scholarships',
    deadline: 'June 2026',
    cutoffGeneral: '193.0 – 198.5 / 200',
    requirements: {
      cutoffPcm: '193.0+ / 200',
      entranceExam: 'TNEA / SSN Merit Application'
    },
    highlights: ['250-acre Modern Research Campus', '₹64 LPA Highest CTC', 'Autonomous Curriculum']
  }
];
