import { QuizQuestion, QuizResult } from '../types';

export const careerQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'What kind of challenges energize you most?',
    subtitle: 'Choose what feels most natural to how your brain works.',
    options: [
      {
        label: 'Building software algorithms, AI models & full-stack applications',
        description: 'You enjoy coding, math logic, software architecture, and solving DSA problems.',
        icon: 'Code2',
        fieldMatch: 'tech'
      },
      {
        label: 'Designing physical machines, electric mobility, robotics & hardware',
        description: 'You want to build electric vehicles, drones, smart robots, and microchips.',
        icon: 'Cpu',
        fieldMatch: 'core_engineering'
      },
      {
        label: 'Leading tech startups, product management & corporate strategy',
        description: 'You love product strategy, business economics, team leadership, and tech consulting.',
        icon: 'Briefcase',
        fieldMatch: 'tech_management'
      },
      {
        label: 'Biomedical devices, genetic engineering & computational healthcare',
        description: 'You are fascinated by medical tech, bioinformatics, and healthcare innovation.',
        icon: 'Activity',
        fieldMatch: 'biotech'
      }
    ]
  },
  {
    id: 2,
    question: 'What type of college environment and campus culture excites you most?',
    subtitle: 'Where do you see yourself innovating and building your network?',
    options: [
      {
        label: 'High-energy coding hubs & 24/7 hackathon innovation labs',
        description: 'Collaborating with fellow developers on AI agents, cloud apps, and open-source.',
        icon: 'Sparkles',
        fieldMatch: 'tech'
      },
      {
        label: 'Advanced manufacturing centers, robotics workshops & EV testing tracks',
        description: 'Working in high-precision CNC labs, wind tunnels, and industrial fabrication units.',
        icon: 'Wrench',
        fieldMatch: 'core_engineering'
      },
      {
        label: 'Vibrant startup incubators, corporate relations & design thinking centers',
        description: 'Pitching startup ideas to venture funds, case study competitions, and tech summits.',
        icon: 'BarChart3',
        fieldMatch: 'tech_management'
      },
      {
        label: 'State-of-the-art bio-nanotechnology & medical instrumentation centers',
        description: 'Conducting molecular research, testing medical sensors, and biotech patents.',
        icon: 'HeartPulse',
        fieldMatch: 'biotech'
      }
    ]
  },
  {
    id: 3,
    question: 'Which technology revolution in India excites you the most?',
    subtitle: 'Which national and global trend do you want to shape?',
    options: [
      {
        label: 'Generative AI, Large Language Models & Cloud Software SaaS',
        description: 'Building world-scale applications from India for global enterprises.',
        icon: 'Bot',
        fieldMatch: 'tech'
      },
      {
        label: 'Semiconductor Manufacturing, VLSI Chips, Clean Energy & Space Tech',
        description: 'Powering India’s domestic chip fabrication, ISRO missions, and EV battery grids.',
        icon: 'Globe',
        fieldMatch: 'core_engineering'
      },
      {
        label: 'FinTech, Digital Public Infrastructure & Tech Entrepreneurship',
        description: 'Scaling payment ecosystems, digital commerce, and high-growth ventures.',
        icon: 'Coins',
        fieldMatch: 'tech_management'
      },
      {
        label: 'Precision Healthcare, Medical Robotics & Sustainable Bio-Agriculture',
        description: 'Engineering life-saving diagnostic devices and food security technologies.',
        icon: 'Dna',
        fieldMatch: 'biotech'
      }
    ]
  },
  {
    id: 4,
    question: 'What is your primary engineering dream outcome?',
    subtitle: 'What does your ultimate milestone after 4 years look like?',
    options: [
      {
        label: 'Crack a ₹25 LPA+ software engineer offer at Zoho, Cisco, Microsoft, or Amazon',
        description: 'Architecting high-scale distributed systems and digital platforms.',
        icon: 'Terminal',
        fieldMatch: 'tech'
      },
      {
        label: 'Lead Chief Hardware / Robotics Engineer at Bosch, Qualcomm, L&T, or Tesla',
        description: 'Designing autonomous vehicles, embedded systems, and next-gen hardware.',
        icon: 'Rocket',
        fieldMatch: 'core_engineering'
      },
      {
        label: 'Launch your own funded tech startup or become a Product Manager / Tech Consultant',
        description: 'Leading product roadmaps, raising venture capital, and building enterprise value.',
        icon: 'Target',
        fieldMatch: 'tech_management'
      },
      {
        label: 'Lead research breakthroughs in Biomedical Engineering & Clinical Devices',
        description: 'Publishing international research and innovating medical instrumentation.',
        icon: 'Microscope',
        fieldMatch: 'biotech'
      }
    ]
  }
];

export const careerQuizResults: Record<string, QuizResult> = {
  tech: {
    topField: 'Computer Science, Artificial Intelligence & Cybersecurity',
    matchScore: 98,
    description: 'You have sharp analytical problem-solving skills and a developer mindset. Your ideal path is in Core CSE, AI & Data Science, or Information Technology with strong focus on Data Structures, Algorithms, and Cloud Systems.',
    recommendedDegrees: [
      'B.E. Computer Science & Engineering (CSE)',
      'B.Tech Artificial Intelligence & Data Science (AI & DS)',
      'B.Tech Information Technology (IT)',
      'B.E. Cybersecurity / CSBS'
    ],
    recommendedColleges: [
      'CEG Anna University (Chennai)',
      'PSG College of Technology (Coimbatore)',
      'SSN College of Engineering (Chennai)',
      'Coimbatore Institute of Technology (CIT)',
      'Kumaraguru College of Technology (KCT)'
    ],
    careerRoles: ['AI/ML Engineer', 'Full-Stack Software Architect', 'Cloud Security Specialist', 'Product Software Developer'],
    avgStartingSalary: '₹8.5 LPA – ₹42.0 LPA'
  },
  core_engineering: {
    topField: 'Robotics, VLSI Design, Mechatronics & Sustainable Mobility',
    matchScore: 97,
    description: 'You possess exceptional spatial reasoning and an urge to build tangible hardware. With India’s rapid semiconductor and automotive surge, disciplines like ECE, VLSI Design, Mechatronics, and Robotics offer immense career growth.',
    recommendedDegrees: [
      'B.E. Electronics & Communication (ECE) / VLSI',
      'B.E. Robotics & Automation / Mechatronics',
      'B.E. Mechanical Engineering (Industry 4.0)',
      'B.E. Electrical & Electronics (EV Systems)'
    ],
    recommendedColleges: [
      'PSG Tech Peelamedu (Coimbatore)',
      'MIT Campus Anna University (Chromepet)',
      'Government College of Technology (GCT Coimbatore)',
      'Thiagarajar College of Engineering (TCE Madurai)',
      'CIT Coimbatore & Bannari Amman BIT'
    ],
    careerRoles: ['VLSI Chip Design Engineer', 'Robotics Systems Lead', 'Automotive EV Architect', 'Embedded IoT Engineer'],
    avgStartingSalary: '₹7.5 LPA – ₹32.0 LPA'
  },
  tech_management: {
    topField: 'Computer Science & Business Systems (CSBS) & Product Strategy',
    matchScore: 96,
    description: 'You combine engineering logic with strategic business vision. You excel in multidisciplinary problem-solving, product design, and tech consulting.',
    recommendedDegrees: [
      'B.Tech Computer Science & Business Systems (TCS Curated)',
      'B.E. Industrial Engineering & Management',
      'B.Tech Information Technology + Minor in FinTech',
      'B.E. Production Engineering (Sandwich Course)'
    ],
    recommendedColleges: [
      'PSG College of Technology (Coimbatore)',
      'CEG Anna University (Chennai)',
      'SKCET Coimbatore (Kuniamuthur)',
      'Sri Eshwar College of Engineering (Coimbatore)',
      'SASTRA Deemed University (Thanjavur)'
    ],
    careerRoles: ['Associate Product Manager (APM)', 'Technology Consultant', 'FinTech Solutions Architect', 'Data Strategy Consultant'],
    avgStartingSalary: '₹8.0 LPA – ₹28.0 LPA'
  },
  biotech: {
    topField: 'Biomedical Engineering & Computational Biotechnology',
    matchScore: 95,
    description: 'You bring together deep curiosity for biology and engineering precision. You are well-positioned for the golden era of medical diagnostics, bioinformatics, healthcare AI, and pharmaceutical engineering.',
    recommendedDegrees: [
      'B.E. Biomedical Engineering',
      'B.Tech Biotechnology / Bioinformatics',
      'B.Tech Food Technology & Process Engg',
      'B.E. Agricultural Engineering'
    ],
    recommendedColleges: [
      'AC Tech Anna University (Chennai)',
      'PSG College of Technology (Coimbatore)',
      'Sri Ramakrishna Engineering College (SREC)',
      'Rajalakshmi Engineering College (REC Chennai)',
      'Bannari Amman Institute of Technology (BIT Sathy)'
    ],
    careerRoles: ['Biomedical Device Engineer', 'Bioinformatics Analyst', 'Clinical Instrumentation Lead', 'Healthcare AI Researcher'],
    avgStartingSalary: '₹6.5 LPA – ₹22.0 LPA'
  }
};
