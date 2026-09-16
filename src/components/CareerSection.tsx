import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Code2, 
  Database, 
  ShieldCheck, 
  Cog, 
  Plane, 
  Radio, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  GraduationCap, 
  Briefcase 
} from 'lucide-react';
import { scrollToSection } from '../utils/helpers';

interface CareerItem {
  id: string;
  title: string;
  icon: any;
  tagline: string;
  recommendedBranches: string[];
  skills: string[];
  suitableColleges: string[];
  educationPathway: string;
  avgSalary: string;
}

export const CareerSection: React.FC = () => {
  const careers: CareerItem[] = [
    {
      id: 'ai',
      title: 'AI & Machine Learning Engineer',
      icon: BrainCircuit,
      tagline: 'Designing deep neural networks, generative AI, and intelligent autonomous systems.',
      recommendedBranches: ['B.Tech AI & Data Science', 'B.E. Computer Science (AI/ML)', 'B.Tech Information Technology'],
      skills: ['Python / PyTorch', 'Deep Learning & NLP', 'Large Language Models (LLMs)', 'Algorithms & Math'],
      suitableColleges: ['PSG Tech Coimbatore', 'CEG Anna University', 'SSN Chennai', 'CIT Coimbatore', 'KPRIET'],
      educationPathway: 'B.E. CSE / AI-DS → Kaggle & Git Portfolio → Research / Product Internship → ₹18–40 LPA Role',
      avgSalary: '₹12.0 LPA – ₹42.0 LPA'
    },
    {
      id: 'software',
      title: 'Full-Stack Software Engineer',
      icon: Code2,
      tagline: 'Architecting scalable cloud microservices, modern web apps, and enterprise platforms.',
      recommendedBranches: ['B.E. Computer Science & Engg', 'B.Tech Information Technology', 'B.E. ECE'],
      skills: ['Data Structures & Algorithms', 'React / Next.js & Node.js', 'PostgreSQL / MongoDB', 'Cloud & DevOps (AWS/GCP)'],
      suitableColleges: ['CEG Anna Univ', 'PSG Tech', 'SSN College of Engg', 'SKCET Coimbatore', 'CIT'],
      educationPathway: 'B.E. CSE / IT → 300+ LeetCode problems → Open-source contributions → ₹14–34 LPA Placement',
      avgSalary: '₹8.5 LPA – ₹36.0 LPA'
    },
    {
      id: 'datascience',
      title: 'Big Data & Analytics Scientist',
      icon: Database,
      tagline: 'Transforming petabytes of business data into predictive insights and statistical models.',
      recommendedBranches: ['B.Tech AI & Data Science', 'B.E. CSE (Big Data)', 'B.Tech IT'],
      skills: ['Statistical Modeling & R', 'SQL & Apache Spark', 'Data Visualization (Tableau)', 'Machine Learning'],
      suitableColleges: ['PSG College of Tech', 'CIT Coimbatore', 'SSN Chennai', 'Kumaraguru (KCT)'],
      educationPathway: 'B.Tech AI-DS → Financial & E-commerce Analytics projects → Data Analyst / Scientist offer',
      avgSalary: '₹9.0 LPA – ₹30.0 LPA'
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity & Cloud Architect',
      icon: ShieldCheck,
      tagline: 'Securing global enterprise networks, defending zero-trust clouds, and ethical penetration testing.',
      recommendedBranches: ['B.E. Cyber Security', 'B.E. Computer Science', 'B.Tech IT'],
      skills: ['Network Security & Cryptography', 'Ethical Hacking (CEH)', 'Cloud Security Architecture', 'SIEM & SOC'],
      suitableColleges: ['SSN Chennai', 'PSG Tech', 'CIT Chennai', 'Amrita Vishwa Vidyapeetham'],
      educationPathway: 'B.E. Cyber Security → CTF competitions & OSCP certification → Security Consultant / Cloud Architect',
      avgSalary: '₹8.0 LPA – ₹32.0 LPA'
    },
    {
      id: 'robotics',
      title: 'Robotics & Industrial Automation Lead',
      icon: Cog,
      tagline: 'Building industrial robots, PLC automated manufacturing lines, and mechatronic systems.',
      recommendedBranches: ['B.E. Robotics & Automation', 'B.E. Mechatronics', 'B.E. Mechanical'],
      skills: ['ROS (Robot Operating System)', 'PLC & SCADA Control', 'CAD & Kinematics Modeling', 'Embedded C / IoT'],
      suitableColleges: ['PSG Tech Coimbatore', 'CIT Coimbatore', 'TCE Madurai', 'Kongu Engineering (KEC)'],
      educationPathway: 'B.E. Robotics / Mechatronics → Industry 4.0 Labs → TVS / Bosch / Hyundai core placements',
      avgSalary: '₹6.5 LPA – ₹24.0 LPA'
    },
    {
      id: 'aerospace',
      title: 'Aerospace & Avionics Engineer',
      icon: Plane,
      tagline: 'Designing aircraft aerodynamics, UAV drones, flight controls, and satellite propulsion.',
      recommendedBranches: ['B.E. Aeronautical Engineering', 'B.E. Aerospace Engineering', 'B.E. ECE'],
      skills: ['Computational Fluid Dynamics (CFD)', 'Ansys & MATLAB', 'Avionics Embedded Hardware', 'Flight Dynamics'],
      suitableColleges: ['Madras Institute of Technology (MIT Anna Univ)', 'Amrita Coimbatore', 'Karunya Univ'],
      educationPathway: 'B.E. Aero MIT → ISRO / DRDO / Boeing internships → Defense & Space R&D Careers',
      avgSalary: '₹7.0 LPA – ₹26.0 LPA'
    },
    {
      id: 'electronics',
      title: 'Semiconductor & VLSI Chip Designer',
      icon: Radio,
      tagline: 'Creating next-generation microchips, FPGA processors, and 5G communication circuits.',
      recommendedBranches: ['B.E. Electronics & Communication (ECE)', 'B.E. Electrical & Electronics (EEE)'],
      skills: ['Verilog / VHDL & SystemVerilog', 'VLSI Physical Design', 'Cadence & Synopsys EDA Tools', 'Digital Signal Processing'],
      suitableColleges: ['CEG Anna University', 'MIT Chromepet', 'PSG Tech', 'CIT Coimbatore', 'SSN'],
      educationPathway: 'B.E. ECE → VLSI Specialization → Qualcomm / Texas Instruments / Intel core offers',
      avgSalary: '₹10.0 LPA – ₹38.0 LPA'
    },
    {
      id: 'entrepreneur',
      title: 'Tech Founder & Entrepreneur',
      icon: Sparkles,
      tagline: 'Launching innovative software startups, hardware products, and venture-backed companies.',
      recommendedBranches: ['Any Engineering Discipline', 'Computer Science & Business Systems (CSBS)'],
      skills: ['Product Discovery & Design', 'Venture Capital & Unit Economics', 'Leadership & Team Building', 'Go-To-Market'],
      suitableColleges: ['PSG STEP Incubator', 'KCT Forge Innovation', 'Anna University CED', 'SSN Incubation'],
      educationPathway: 'Engineering Foundation → Campus Incubator Grant → Seed Funding → Startup Launch',
      avgSalary: 'High Growth Equity / Founder'
    }
  ];

  const [selectedCareer, setSelectedCareer] = useState<CareerItem>(careers[0]);

  return (
    <section className="py-24 bg-slate-950 text-white relative overflow-hidden border-b border-slate-800">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-black uppercase tracking-wider mb-4">
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
            <span>Career Pathways & Future Roles</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-5">
            START WITH <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">
              YOUR DREAM.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Choose the career you want to build. NEXTBLOCK connects your dream role back to the right engineering branch, required skills, and top colleges in Tamil Nadu.
          </p>
        </div>

        {/* 8 Floating Career Blocks Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-12">
          {careers.map((career) => {
            const Icon = career.icon;
            const isSelected = selectedCareer.id === career.id;

            return (
              <button
                key={career.id}
                onClick={() => setSelectedCareer(career)}
                className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-br from-blue-900 to-slate-900 border-cyan-400 shadow-xl shadow-cyan-500/20 scale-[1.03]'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-cyan-400 text-slate-950 font-bold' : 'bg-slate-800 text-cyan-400'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />}
                </div>

                <h3 className="text-xs sm:text-sm font-black text-white leading-snug">
                  {career.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Career Deep Dive Blueprint Card */}
        <div className="bg-slate-900 rounded-3xl p-8 border-2 border-cyan-500/40 shadow-2xl shadow-cyan-500/10 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-cyan-400 block mb-1">
                CAREER ARCHITECTURE BLUEPRINT
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">{selectedCareer.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">{selectedCareer.tagline}</p>
            </div>

            <div className="bg-slate-950 px-4 py-3 rounded-2xl border border-slate-800 text-right shrink-0">
              <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Avg Salary Range</span>
              <span className="text-base sm:text-lg font-black text-emerald-400 block">{selectedCareer.avgSalary}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            {/* Recommended Branches */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
              <h4 className="font-black text-cyan-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4" /> Recommended Branches
              </h4>
              <ul className="space-y-1.5 text-slate-300">
                {selectedCareer.recommendedBranches.map((b, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Core Skills to Master */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
              <h4 className="font-black text-cyan-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Code2 className="w-4 h-4" /> Core Skills Required
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedCareer.skills.map((s, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 font-bold text-[11px]">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Top Recommended Colleges */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
              <h4 className="font-black text-cyan-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Top Tamil Nadu Colleges
              </h4>
              <ul className="space-y-1.5 text-slate-300">
                {selectedCareer.suitableColleges.map((c, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Education Pathway Line */}
          <div className="p-4 rounded-2xl bg-blue-950/60 border border-blue-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
            <div>
              <span className="text-[10px] font-extrabold uppercase text-cyan-300 block">4-Year Education Pathway:</span>
              <p className="text-white font-bold mt-0.5">{selectedCareer.educationPathway}</p>
            </div>

            <button
              onClick={() => scrollToSection('smart-finder')}
              className="shrink-0 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs transition-colors flex items-center gap-1.5"
            >
              <span>Explore Cutoffs for this Role</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
