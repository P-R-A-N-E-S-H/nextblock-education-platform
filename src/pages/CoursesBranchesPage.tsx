import React, { useState } from 'react';
import { 
  GraduationCap, 
  Cpu, 
  BrainCircuit, 
  ShieldCheck, 
  Radio, 
  Cog, 
  Dna, 
  Building, 
  ArrowRight, 
  Sparkles, 
  DollarSign, 
  TrendingUp, 
  CheckCircle2 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CoursesBranchesPage: React.FC = () => {
  const { setCurrentPublicView } = useApp();
  const [selectedBranchCategory, setSelectedBranchCategory] = useState<string>('All');

  const branchesList = [
    {
      id: 'cse',
      name: 'Computer Science & Engineering (CSE)',
      shortCode: 'CSE',
      category: 'Software & Computing',
      icon: Cpu,
      overview: 'The highest-demand engineering discipline covering algorithms, software architecture, data structures, cloud systems, and full-stack development.',
      coreSubjects: ['Data Structures & Algorithms', 'Operating Systems', 'Database Systems', 'Computer Networks', 'Cloud Architecture'],
      salaryRange: '₹6.5 LPA – ₹40.0 LPA',
      topRecruiters: ['Zoho', 'Cisco', 'Amazon AWS', 'Microsoft', 'Kaar Tech', 'TCS Digital'],
      recommendedColleges: ['CEG Anna University', 'PSG Tech', 'SSN Chennai', 'CIT Coimbatore', 'KCT', 'SKCET']
    },
    {
      id: 'aids',
      name: 'Artificial Intelligence & Data Science (AI & DS)',
      shortCode: 'AI & DS',
      category: 'AI & Emerging Tech',
      icon: BrainCircuit,
      overview: 'Cutting-edge branch combining machine learning, deep neural networks, predictive analytics, natural language processing, and big data pipelines.',
      coreSubjects: ['Machine Learning Algorithms', 'Deep Learning & Neural Networks', 'Python & Data Wrangling', 'Big Data Engineering', 'NLP'],
      salaryRange: '₹7.0 LPA – ₹38.0 LPA',
      topRecruiters: ['Qualcomm', 'PayPal', 'Tiger Analytics', 'Bosch', 'Freshworks'],
      recommendedColleges: ['PSG Tech', 'CEG Anna Univ', 'SSN Chennai', 'CIT', 'KPRIET', 'Sri Krishna (SKCET)']
    },
    {
      id: 'cyber',
      name: 'Cyber Security & Cloud Computing',
      shortCode: 'Cyber',
      category: 'Software & Computing',
      icon: ShieldCheck,
      overview: 'Defending digital networks, enterprise cloud systems, ethical hacking, threat intelligence, and zero-trust security infrastructure.',
      coreSubjects: ['Network Security & Cryptography', 'Ethical Hacking & Penetration Testing', 'Cloud Security (AWS/Azure)', 'Digital Forensics'],
      salaryRange: '₹6.0 LPA – ₹32.0 LPA',
      topRecruiters: ['Palo Alto Networks', 'Fortinet', 'Zoho', 'Cisco', 'Wipro Cyber'],
      recommendedColleges: ['SSN Chennai', 'CIT Chennai', 'PSG Tech', 'KCT', 'Amrita Coimbatore']
    },
    {
      id: 'ece',
      name: 'Electronics & Communication (ECE)',
      shortCode: 'ECE',
      category: 'Hardware & Core',
      icon: Radio,
      overview: 'Bridging semiconductor hardware, embedded IoT systems, 5G telecommunications, VLSI circuits, and digital signal processing.',
      coreSubjects: ['VLSI Design', 'Embedded Systems & IoT', 'Digital Signal Processing', 'Microprocessors & Microcontrollers'],
      salaryRange: '₹5.5 LPA – ₹28.5 LPA',
      topRecruiters: ['Qualcomm', 'Texas Instruments', 'Intel India', 'L&T Technology', 'Bosch'],
      recommendedColleges: ['CEG Anna University', 'MIT Chromepet', 'PSG Tech', 'CIT Coimbatore', 'TCE Madurai']
    },
    {
      id: 'robotics',
      name: 'Robotics & Automation / Mechatronics',
      shortCode: 'Robotics',
      category: 'Hardware & Core',
      icon: Cog,
      overview: 'Multidisciplinary engineering merging mechanical kinematics, electronics, robotic control algorithms, and Industry 4.0 industrial automation.',
      coreSubjects: ['Industrial Robotics', 'PLC & SCADA Automation', 'Sensors & Actuators', 'Machine Vision', 'Hydraulics & Pneumatics'],
      salaryRange: '₹5.0 LPA – ₹22.0 LPA',
      topRecruiters: ['Bosch Mobility', 'L&T', 'Fanuc Robotics', 'TVS Motors', 'Hyundai R&D'],
      recommendedColleges: ['PSG Tech', 'CIT Coimbatore', 'TCE Madurai', 'Kongu Engineering', 'Sri Eshwar (SECE)']
    },
    {
      id: 'biotech',
      name: 'Biotechnology & Biomedical Engineering',
      shortCode: 'Biotech',
      category: 'Bio & Applied Sciences',
      icon: Dna,
      overview: 'Applying computational genomics, diagnostic medical instrumentation, biomechanics, and bioprocess engineering for healthcare innovation.',
      coreSubjects: ['Genetic Engineering', 'Biomedical Signal Processing', 'Bioprocess Engineering', 'Medical Imaging Systems'],
      salaryRange: '₹4.5 LPA – ₹18.0 LPA',
      topRecruiters: ['Siemens Healthineers', 'GE Healthcare', 'Biocon', 'Dr. Reddy’s', 'Philips Healthcare'],
      recommendedColleges: ['Anna University (ACTech/CEG)', 'PSG Tech', 'SSN Chennai', 'Bannari Amman (BIT)', 'Karunya']
    }
  ];

  const categories = ['All', 'Software & Computing', 'AI & Emerging Tech', 'Hardware & Core', 'Bio & Applied Sciences'];

  const filteredBranches = branchesList.filter((b) => {
    if (selectedBranchCategory === 'All') return true;
    return b.category === selectedBranchCategory;
  });

  return (
    <div className="py-24 bg-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Badge & Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-black uppercase tracking-wider mb-4">
            <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
            <span>Engineering Disciplines & Careers</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-950 tracking-tight leading-tight mb-5">
            CHOOSE THE RIGHT <br />
            <span className="text-gradient">ENGINEERING BRANCH.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
            Explore curriculum blueprints, average placement packages in Tamil Nadu, core syllabus topics, and recommended colleges for every engineering discipline.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedBranchCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all ${
                selectedBranchCategory === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-105'
                  : 'bg-slate-100 text-slate-800 border border-slate-200 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Branch Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredBranches.map((branch) => {
            const Icon = branch.icon;

            return (
              <div
                key={branch.id}
                className="bg-white rounded-3xl p-7 border-2 border-slate-200 shadow-sm hover:shadow-2xl hover:border-blue-500 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-black px-3 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-200">
                      {branch.shortCode}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-950 mb-2 group-hover:text-blue-600 transition-colors">
                    {branch.name}
                  </h3>

                  <p className="text-xs text-slate-700 leading-relaxed mb-5 font-normal">
                    {branch.overview}
                  </p>

                  {/* Salary & Recruiters */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 mb-5 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-extrabold uppercase text-[10px]">Avg CTC Range:</span>
                      <span className="font-black text-emerald-700">{branch.salaryRange}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase text-slate-500 block mb-1">Key Recruiters:</span>
                      <p className="text-xs font-bold text-slate-800 truncate">{branch.topRecruiters.join(', ')}</p>
                    </div>
                  </div>

                  {/* Recommended Colleges */}
                  <div className="mb-5">
                    <span className="text-[10px] font-black uppercase text-slate-500 block mb-1.5">
                      Top Tamil Nadu Colleges for this Branch:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {branch.recommendedColleges.map((col, idx) => (
                        <span key={idx} className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                          {col}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setCurrentPublicView('finder')}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900 group-hover:bg-blue-600 text-white text-xs font-black transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Check Cutoffs for {branch.shortCode}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
