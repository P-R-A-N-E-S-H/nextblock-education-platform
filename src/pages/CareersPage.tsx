import React, { useState } from 'react';
import { 
  Sparkles, 
  Code2, 
  Cpu, 
  Database, 
  ShieldCheck, 
  Bot, 
  Microchip, 
  Car, 
  Wrench, 
  Building, 
  Dna, 
  ArrowRight, 
  GraduationCap, 
  CheckCircle2, 
  Briefcase, 
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface CareersPageProps {
  onOpenBooking?: () => void;
  onOpenAssessment?: () => void;
}

interface CareerTrack {
  id: string;
  title: string;
  tagline: string;
  icon: any;
  suitableBranches: string[];
  requiredSkills: string[];
  educationPathway: string;
  topTNColleges: string[];
  higherStudies: string[];
  avgStartingSalary: string;
  topRoles: string[];
  overview: string;
}

const CAREER_TRACKS: CareerTrack[] = [
  {
    id: 'software-engineering',
    title: 'Software Engineering & Cloud Architecture',
    tagline: 'Build modern applications, distributed systems, and global digital infrastructure.',
    icon: Code2,
    suitableBranches: ['Computer Science (CSE)', 'Information Technology (IT)', 'Software Engineering'],
    requiredSkills: ['Data Structures & Algorithms', 'System Design', 'Cloud (AWS/GCP)', 'TypeScript', 'Java/Go'],
    educationPathway: 'B.E/B.Tech in CSE or IT → Competitive Coding & Hackathons → Product Internships → SDE Roles',
    topTNColleges: ['CEG Anna University', 'PSG Tech', 'MIT Chromepet', 'SSN College', 'CIT Coimbatore'],
    higherStudies: ['MS in Computer Science (USA/Germany)', 'M.Tech CSE (IIT/IISc)', 'MBA in Tech Management'],
    avgStartingSalary: '₹8.5 LPA – ₹24.0 LPA',
    topRoles: ['Software Development Engineer (SDE)', 'Cloud Architect', 'Full-Stack Developer', 'DevOps Engineer'],
    overview: 'Software engineering remains the largest employer for engineering graduates in Tamil Nadu, driven by SaaS companies in Chennai (Zoho, Freshworks) and tech giants (Amazon, Cisco, Microsoft, PayPal).'
  },
  {
    id: 'ai-machine-learning',
    title: 'Artificial Intelligence & Machine Learning',
    tagline: 'Design generative models, intelligent algorithms, and automated neural networks.',
    icon: Cpu,
    suitableBranches: ['Artificial Intelligence & Data Science (AI-DS)', 'AI & Machine Learning (AI-ML)', 'CSE (AI Specialization)'],
    requiredSkills: ['PyTorch / TensorFlow', 'Linear Algebra & Statistics', 'Deep Learning', 'NLP & LLMs', 'Computer Vision'],
    educationPathway: 'B.Tech AI-DS/AI-ML → Research Papers & Kaggle Competitions → AI Lab Projects → Applied Scientist',
    topTNColleges: ['PSG Tech', 'SSN College', 'CEG Anna Univ', 'KCT Coimbatore', 'SKCET'],
    higherStudies: ['MS in Artificial Intelligence', 'Ph.D. in Computer Vision / NLP', 'M.Tech AI'],
    avgStartingSalary: '₹10.0 LPA – ₹28.0 LPA',
    topRoles: ['AI Research Engineer', 'Machine Learning Scientist', 'NLP Engineer', 'Generative AI Specialist'],
    overview: 'With the exponential rise of LLMs and generative intelligence, specialized AI engineers command the highest starting compensation packages across campus recruitment drives.'
  },
  {
    id: 'data-science',
    title: 'Data Science & Big Data Engineering',
    tagline: 'Transform massive enterprise datasets into actionable predictive intelligence.',
    icon: Database,
    suitableBranches: ['AI & Data Science', 'Computer Science (CSE)', 'Information Technology'],
    requiredSkills: ['SQL & Data Warehousing', 'Apache Spark / Kafka', 'Python / R', 'Business Intelligence (Tableau)', 'Predictive Modeling'],
    educationPathway: 'B.Tech with focus on statistical modeling & big data pipelines → Data Analyst Internships → Lead Data Scientist',
    topTNColleges: ['PSG Tech', 'CIT Coimbatore', 'Anna University CEG', 'Amrita Vishwa Vidyapeetham', 'SSN Chennai'],
    higherStudies: ['MS in Data Analytics / Business Analytics', 'M.Sc Data Science', 'Executive Analytics MBA'],
    avgStartingSalary: '₹8.0 LPA – ₹20.0 LPA',
    topRoles: ['Data Scientist', 'Big Data Architect', 'Quantitative Analyst', 'Business Intelligence Lead'],
    overview: 'Fintech, e-commerce, and healthcare sectors rely on data science specialists to optimize logistics, detect fraud, and build recommendation engines.'
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity & Ethical Hacking',
    tagline: 'Defend enterprise infrastructure, critical networks, and sensitive customer data.',
    icon: ShieldCheck,
    suitableBranches: ['Cybersecurity & Privacy', 'CSE (Information Security)', 'IT'],
    requiredSkills: ['Network Penetration Testing', 'Cryptography', 'SIEM & SOC Operations', 'Cloud Security', 'Threat Hunting'],
    educationPathway: 'B.E CSE/IT with Security Certifications (CEH, OSCP, CompTIA Security+) → SOC Analyst → Chief Information Security Officer',
    topTNColleges: ['PSG Tech', 'MIT Anna University', 'VIT Vellore', 'KPR Institute', 'Sri Krishna College'],
    higherStudies: ['MS in Information Security', 'M.Tech Cyber Forensics', 'Certifications (CISSP, CISM)'],
    avgStartingSalary: '₹7.5 LPA – ₹18.0 LPA',
    topRoles: ['Security Analyst (SOC)', 'Penetration Tester', 'Cloud Security Architect', 'Incident Response Lead'],
    overview: 'As global regulations tighten and digital banking expands, cybersecurity engineers are in critical short supply, offering exceptional long-term job security.'
  },
  {
    id: 'robotics-automation',
    title: 'Robotics, IoT & Industrial Automation',
    tagline: 'Engineer autonomous drones, robotic arms, and smart Industry 4.0 factories.',
    icon: Bot,
    suitableBranches: ['Robotics & Automation', 'Mechatronics', 'Mechanical Engineering', 'EEE / EIE'],
    requiredSkills: ['ROS (Robot Operating System)', 'Microcontrollers (ARM, Arduino)', 'CAD Design', 'PLC & SCADA', 'Computer Vision'],
    educationPathway: 'B.E Robotics / Mechatronics → Hands-on Drone/Robot Competitions → Robotics Incubation → Automation Lead',
    topTNColleges: ['PSG College of Technology', 'Kumaraguru College of Technology', 'TCE Madurai', 'CIT Coimbatore', 'Kongu Engineering'],
    higherStudies: ['MS in Robotics & Mechatronics (Germany/Japan/USA)', 'M.Tech Automation', 'Industrial AI'],
    avgStartingSalary: '₹6.5 LPA – ₹16.0 LPA',
    topRoles: ['Robotics Systems Engineer', 'Industrial Automation Specialist', 'Drone Hardware Engineer', 'Embedded IoT Lead'],
    overview: 'Coimbatore, Chennai, and Hosur industrial manufacturing belts lead India in deploying automated manufacturing cells, creating huge regional demand.'
  },
  {
    id: 'electronics-vlsi',
    title: 'Semiconductor VLSI & Electronics Hardware',
    tagline: 'Design microchips, integrated circuits, and telecom processor boards.',
    icon: Microchip,
    suitableBranches: ['Electronics & Communication (ECE)', 'VLSI Design & Technology', 'Electrical & Electronics (EEE)'],
    requiredSkills: ['Verilog / VHDL', 'ASIC / FPGA Design', 'Cadence / Synopsys EDA Tools', 'Embedded C', 'PCB Layout Design'],
    educationPathway: 'B.E ECE with VLSI specialization → Semiconductor Lab Design projects → Core Chip Design Firms (Qualcomm, Intel, AMD, TI)',
    topTNColleges: ['Anna University CEG', 'MIT Chromepet', 'PSG Tech', 'CIT Coimbatore', 'SSN College'],
    higherStudies: ['M.Tech in VLSI Design', 'MS in Microelectronics (USA/Taiwan/Germany)', 'Ph.D. in Chip Design'],
    avgStartingSalary: '₹9.0 LPA – ₹26.0 LPA',
    topRoles: ['ASIC Design Engineer', 'FPGA Verification Specialist', 'Embedded Systems Lead', 'Silicon Validation Engineer'],
    overview: 'Backed by the India Semiconductor Mission and new chip fabrication facilities in Tamil Nadu, VLSI hardware engineers are experiencing a golden recruitment era.'
  },
  {
    id: 'ev-automotive',
    title: 'Electric Vehicles (EV) & Automotive Systems',
    tagline: 'Pioneer battery management systems, electric drivetrains, and smart vehicles.',
    icon: Car,
    suitableBranches: ['Mechanical Engineering', 'Automobile Engineering', 'EEE', 'Mechatronics'],
    requiredSkills: ['Battery Management Systems (BMS)', 'Motor Control & Inverters', 'MATLAB / Simulink', 'Thermal Management', 'CAN Protocol'],
    educationPathway: 'B.E Mechanical/EEE with EV Projects → SAE Baja/Formula Student → Core EV Startups & OEMs (Ather, Ola Electric, Tata Motors, Hyundai)',
    topTNColleges: ['PSG Tech', 'Kumaraguru (KCT)', 'Sri Krishna (SKCET)', 'Bannari Amman (BIT)', 'GCT Coimbatore'],
    higherStudies: ['MS in Automotive Systems', 'M.Tech E-Mobility', 'Battery Chem & Power Electronics'],
    avgStartingSalary: '₹6.5 LPA – ₹15.0 LPA',
    topRoles: ['BMS Design Engineer', 'Powertrain Calibration Specialist', 'EV Thermal Engineer', 'Vehicle Dynamics Lead'],
    overview: 'Tamil Nadu manufactures over 40% of India’s electric two-wheelers and passenger vehicles, making it the EV capital of South Asia.'
  },
  {
    id: 'biotechnology',
    title: 'Biotechnology & Biomedical Engineering',
    tagline: 'Engineer medical diagnostics, biomaterials, and computational genomics.',
    icon: Dna,
    suitableBranches: ['Biomedical Engineering', 'Biotechnology', 'Industrial Biotechnology'],
    requiredSkills: ['Bioinformatics (BLAST, Python)', 'Medical Device Calibration', 'Fermentation Technology', 'Genomics', 'Biomechanics'],
    educationPathway: 'B.Tech Biotech/Biomedical → Hospital & Pharma Lab Projects → Clinical Trials / Device Certification → Bio-Tech R&D',
    topTNColleges: ['Anna University CEG', 'PSG College of Technology', 'Rajalakshmi Engineering', 'Karunya Institute', 'Amrita'],
    higherStudies: ['MS in Biomedical Engineering', 'M.Tech Bioinformatics', 'Ph.D. in Molecular Biology'],
    avgStartingSalary: '₹5.5 LPA – ₹14.0 LPA',
    topRoles: ['Biomedical Equipment Specialist', 'Bioinformatics Scientist', 'Bioprocess Engineer', 'Clinical Research Associate'],
    overview: 'Medical technology startups and healthcare export parks in Chennai and Coimbatore drive consistent demand for biomedical device developers.'
  }
];

export const CareersPage: React.FC<CareersPageProps> = ({ onOpenBooking, onOpenAssessment }) => {
  const { setCurrentPublicView } = useApp();
  const [selectedTrackId, setSelectedTrackId] = useState<string>('software-engineering');

  const activeTrack = CAREER_TRACKS.find(t => t.id === selectedTrackId) || CAREER_TRACKS[0];
  const IconComponent = activeTrack.icon;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-20 pb-24">
      
      {/* Top Banner Header */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-black uppercase tracking-wider mb-3">
              <Sparkles className="w-4 h-4" /> Career Guidance & Degree Pathways
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              WHAT SHOULD I STUDY?
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Explore 8 high-growth engineering career disciplines. Map your career aspirations to the exact Tamil Nadu engineering branches, required skills, and top recruiting institutions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const trigger = document.getElementById('trigger-quiz-modal');
                if (trigger) trigger.click();
                else if (onOpenAssessment) onOpenAssessment();
              }}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-black text-xs transition-all shadow-xl shadow-blue-500/30 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Take AI Career Assessment</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content: Left Track Selector + Right Deep Dive */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: 8 Career Tracks List (4 cols) */}
          <div className="lg:col-span-4 space-y-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3 px-2">
              Select Career Domain
            </h3>
            <div className="space-y-2">
              {CAREER_TRACKS.map((track) => {
                const Icon = track.icon;
                const isSelected = selectedTrackId === track.id;

                return (
                  <button
                    key={track.id}
                    onClick={() => setSelectedTrackId(track.id)}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-blue-600 border-blue-400 text-white shadow-xl shadow-blue-500/30'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-800 text-cyan-400'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black leading-tight">{track.title.split('&')[0]}</h4>
                        <span className={`text-[10px] ${isSelected ? 'text-blue-100' : 'text-slate-500'} font-semibold`}>
                          Starting {track.avgStartingSalary.split('–')[0]}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-600'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Selected Career Detailed Breakdown (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-slate-800 space-y-6 shadow-2xl">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-cyan-400 flex items-center justify-center">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-white">{activeTrack.title}</h2>
                    <p className="text-xs text-slate-400 mt-0.5">{activeTrack.tagline}</p>
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Avg Starting CTC</span>
                  <span className="text-base font-black text-emerald-400">{activeTrack.avgStartingSalary}</span>
                </div>
              </div>

              {/* Overview */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-cyan-400 mb-2">Industry Landscape</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{activeTrack.overview}</p>
              </div>

              {/* Suitable Engineering Branches */}
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Recommended Undergraduate Branches (B.E / B.Tech)
                </h3>
                <div className="flex flex-wrap gap-2">
                  {activeTrack.suitableBranches.map((branch, i) => (
                    <span
                      key={i}
                      className="px-3.5 py-1.5 rounded-xl bg-blue-600/20 border border-blue-500/30 text-cyan-300 text-xs font-black"
                    >
                      {branch}
                    </span>
                  ))}
                </div>
              </div>

              {/* Required Core Skills */}
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Key Skills to Master During 4-Year Degree
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {activeTrack.requiredSkills.map((skill, i) => (
                    <div key={i} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center gap-2 text-slate-200 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education Pathway */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" /> 4-Year Milestone Roadmap
                </h3>
                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  {activeTrack.educationPathway}
                </p>
              </div>

              {/* Top Colleges in Tamil Nadu */}
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Top Tamil Nadu Engineering Colleges for this Track
                </h3>
                <div className="flex flex-wrap gap-2">
                  {activeTrack.topTNColleges.map((col, i) => (
                    <span
                      key={i}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs font-bold"
                    >
                      {col}
                    </span>
                  ))}
                </div>
              </div>

              {/* Higher Studies Options */}
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Higher Studies & Global Specialization Pathways
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  {activeTrack.higherStudies.map((hs, i) => (
                    <div key={i} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center font-bold text-slate-300">
                      {hs}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Row */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-slate-400">
                  Need personalized advice on branch selection vs college ranking?
                </span>

                <button
                  onClick={onOpenBooking}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs transition-colors shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                  <span>Book Career Counselling Call</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
