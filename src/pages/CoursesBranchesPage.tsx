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
  CheckCircle2,
  Stethoscope,
  HeartPulse,
  Pill,
  Syringe,
  Activity,
  Palette,
  Briefcase,
  BookOpen,
  PieChart,
  LineChart,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CoursesBranchesPage: React.FC = () => {
  const { setCurrentPublicView } = useApp();
  const [selectedStream, setSelectedStream] = useState<'all' | 'engineering' | 'medical' | 'arts-science'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const allCourses = [
    // --- ENGINEERING & TECHNOLOGY ---
    {
      id: 'cse',
      name: 'Computer Science & Engineering (CSE)',
      shortCode: 'CSE',
      stream: 'engineering',
      category: 'Software & Computing',
      icon: Cpu,
      overview: 'The highest-demand engineering discipline covering algorithms, software architecture, data structures, cloud systems, and full-stack development.',
      coreSubjects: ['Data Structures & Algorithms', 'Operating Systems', 'Database Systems', 'Computer Networks', 'Cloud Architecture'],
      salaryRange: '₹6.5 LPA – ₹42.0 LPA',
      topRecruiters: ['Zoho', 'Cisco', 'Amazon AWS', 'Microsoft', 'Kaar Tech', 'TCS Digital'],
      recommendedColleges: ['CEG Anna University', 'PSG Tech', 'SSN Chennai', 'CIT Coimbatore', 'KCT', 'SKCET']
    },
    {
      id: 'aids',
      name: 'Artificial Intelligence & Data Science (AI & DS)',
      shortCode: 'AI & DS',
      stream: 'engineering',
      category: 'AI & Emerging Tech',
      icon: BrainCircuit,
      overview: 'Cutting-edge branch combining machine learning, deep neural networks, predictive analytics, natural language processing, and big data pipelines.',
      coreSubjects: ['Machine Learning Algorithms', 'Deep Learning & Neural Networks', 'Python & Data Wrangling', 'Big Data Engineering', 'NLP'],
      salaryRange: '₹7.0 LPA – ₹40.0 LPA',
      topRecruiters: ['Qualcomm', 'PayPal', 'Tiger Analytics', 'Bosch', 'Freshworks'],
      recommendedColleges: ['PSG Tech', 'CEG Anna Univ', 'SSN Chennai', 'CIT', 'KPRIET', 'Sri Krishna (SKCET)']
    },
    {
      id: 'cyber',
      name: 'Cyber Security & Cloud Computing',
      shortCode: 'Cyber',
      stream: 'engineering',
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
      stream: 'engineering',
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
      stream: 'engineering',
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
      stream: 'engineering',
      category: 'Bio & Applied Sciences',
      icon: Dna,
      overview: 'Applying computational genomics, diagnostic medical instrumentation, biomechanics, and bioprocess engineering for healthcare innovation.',
      coreSubjects: ['Genetic Engineering', 'Biomedical Signal Processing', 'Bioprocess Engineering', 'Medical Imaging Systems'],
      salaryRange: '₹4.5 LPA – ₹18.0 LPA',
      topRecruiters: ['Siemens Healthineers', 'GE Healthcare', 'Biocon', 'Dr. Reddy’s', 'Philips Healthcare'],
      recommendedColleges: ['Anna University (ACTech/CEG)', 'PSG Tech', 'SSN Chennai', 'Bannari Amman (BIT)', 'Karunya']
    },

    // --- MEDICAL & HEALTHCARE ---
    {
      id: 'mbbs',
      name: 'Bachelor of Medicine & Bachelor of Surgery (MBBS)',
      shortCode: 'MBBS',
      stream: 'medical',
      category: 'Clinical Medicine',
      icon: Stethoscope,
      overview: 'The apex 5.5-year undergraduate medical degree including 1-year rotatory internship, preparing licensed medical doctors and surgical specialists.',
      coreSubjects: ['Human Anatomy & Physiology', 'Pathology & Pharmacology', 'Community Medicine', 'General Medicine & Surgery', 'Pediatrics & Obstetrics'],
      salaryRange: '₹9.0 LPA – ₹35.0 LPA + Clinical Practice',
      topRecruiters: ['Apollo Hospitals', 'Fortis Healthcare', 'Kauvery Hospital', 'Govt Health Services', 'AIIMS', 'Ganga Hospital'],
      recommendedColleges: ['Madras Medical College (MMC)', 'CMC Vellore', 'Stanley Medical College', 'JIPMER', 'PSG IMS&R', 'Coimbatore Medical']
    },
    {
      id: 'bds',
      name: 'Bachelor of Dental Surgery (BDS)',
      shortCode: 'BDS',
      stream: 'medical',
      category: 'Dental & Oral Health',
      icon: HeartPulse,
      overview: 'Professional 5-year dental surgery program diagnosing oral diseases, maxillofacial surgery, prosthodontics, orthodontics, and cosmetic dentistry.',
      coreSubjects: ['Oral & Maxillofacial Surgery', 'Orthodontics', 'Conservative Dentistry', 'Periodontology', 'Oral Pathology'],
      salaryRange: '₹4.5 LPA – ₹18.0 LPA + Private Clinics',
      topRecruiters: ['Clove Dental', 'Apollo White Dental', 'Govt Dental Colleges', 'Private Multispeciality Clinics'],
      recommendedColleges: ['Tamil Nadu Govt Dental College Chennai', 'Saveetha Dental College (SIMATS)', 'SRM Dental College', 'Ragas Dental']
    },
    {
      id: 'pharmacy',
      name: 'Doctor of Pharmacy (Pharm.D) & B.Pharm',
      shortCode: 'Pharm.D / B.Pharm',
      stream: 'medical',
      category: 'Pharmaceutical Sciences',
      icon: Pill,
      overview: 'Clinical pharmacy, drug discovery, pharmacokinetics, regulatory affairs, and hospital clinical pharmacology practice.',
      coreSubjects: ['Clinical Pharmacokinetics', 'Hospital Pharmacy & Therapeutics', 'Medicinal Chemistry', 'Biopharmaceutics', 'Toxicology'],
      salaryRange: '₹4.5 LPA – ₹16.0 LPA',
      topRecruiters: ['Sun Pharma', 'Dr. Reddy’s', 'Pfizer India', 'Novartis', 'Cipla', 'Apollo Pharmacy'],
      recommendedColleges: ['Madras Medical College (Pharmacy)', 'PSG College of Pharmacy', 'KMCH College of Pharmacy', 'SRIHER Porur']
    },
    {
      id: 'allied-health',
      name: 'Allied Health Sciences (B.Sc Cardiac, Radiology & Perfusion)',
      shortCode: 'AHS',
      stream: 'medical',
      category: 'Diagnostic & Clinical Tech',
      icon: Activity,
      overview: 'High-growth paramedical sciences operating MRI/CT imaging, cardiopulmonary bypass machines, cardiac catheterization labs, and dialysis suites.',
      coreSubjects: ['Radiographic Imaging Tech', 'Cardiovascular Technology', 'Perfusion Technology', 'Medical Lab Tech (MLT)', 'Emergency Care'],
      salaryRange: '₹4.0 LPA – ₹14.0 LPA (Global Mobility to UK/Gulf)',
      topRecruiters: ['Apollo Hospitals', 'Manipal Hospitals', 'MGM Healthcare', 'NHS UK', 'Aster DM Healthcare'],
      recommendedColleges: ['MMC Allied Health Sciences', 'CMC Vellore AHS', 'SRIHER Porur', 'Saveetha Institute', 'PSG Institute of Medical Sciences']
    },

    // --- ARTS, SCIENCE & COMMERCE ---
    {
      id: 'bcom-pa',
      name: 'B.Com Professional Accounting & Corporate Secretaryship',
      shortCode: 'B.Com PA / CS',
      stream: 'arts-science',
      category: 'Commerce & Finance',
      icon: PieChart,
      overview: 'Integrated commerce degree aligned with CA Foundation/Inter and CS examinations, covering taxation, corporate law, forensic auditing, and financial reporting.',
      coreSubjects: ['Advanced Corporate Accounting', 'Direct & Indirect Taxation (GST)', 'Auditing & Assurance', 'Company Law', 'Financial Management'],
      salaryRange: '₹4.5 LPA – ₹15.0 LPA',
      topRecruiters: ['Deloitte', 'EY', 'PwC', 'KPMG', 'Goldman Sachs', 'Barclays', 'BNP Paribas'],
      recommendedColleges: ['Loyola College Chennai', 'PSG College of Arts & Science (PSGCAS)', 'MCC Tambaram', 'Stella Maris', 'SKASC Coimbatore']
    },
    {
      id: 'bsc-cs-data',
      name: 'B.Sc Computer Science & Data Analytics / BCA',
      shortCode: 'B.Sc CS / BCA',
      stream: 'arts-science',
      category: 'Computing & IT',
      icon: Cpu,
      overview: 'Focused 3-year computational program in software engineering, database management, cloud computing, and full-stack web applications.',
      coreSubjects: ['Object Oriented Programming (Java/Python)', 'Web Development (React/Node)', 'Database Systems & SQL', 'Data Analytics & Power BI'],
      salaryRange: '₹3.8 LPA – ₹14.0 LPA',
      topRecruiters: ['Zoho Corporation', 'TCS', 'Infosys', 'Wipro', 'Cognizant', 'LTI Mindtree'],
      recommendedColleges: ['Loyola College Chennai', 'Presidency College', 'PSGCAS Coimbatore', 'Bishop Heber College Trichy', 'St. Joseph’s Trichy']
    },
    {
      id: 'bba',
      name: 'Bachelor of Business Administration (BBA FinTech & Digital Marketing)',
      shortCode: 'BBA',
      stream: 'arts-science',
      category: 'Management & Business',
      icon: Briefcase,
      overview: 'Modern business degree covering strategic management, brand marketing, FinTech operations, startup incubation, and supply chain logistics.',
      coreSubjects: ['Digital Marketing & Analytics', 'Financial Accounting & Banking', 'Human Resource Management', 'Business Analytics', 'Entrepreneurship'],
      salaryRange: '₹4.0 LPA – ₹12.5 LPA',
      topRecruiters: ['Amazon Operations', 'HDFC Bank', 'McKinsey India', 'Swiggy', 'Decathlon', 'Federal Bank'],
      recommendedColleges: ['Loyola College Chennai', 'PSGCAS Coimbatore', 'Madras Christian College (MCC)', 'Ethiraj College', 'SKASC Coimbatore']
    },
    {
      id: 'bsc-psychology',
      name: 'B.Sc Psychology & Behavioral Sciences',
      shortCode: 'B.Sc Psychology',
      stream: 'arts-science',
      category: 'Humanities & Social Sciences',
      icon: Palette,
      overview: 'Rapidly growing discipline studying cognitive neuroscience, child development, clinical counseling, organizational behavior, and mental health.',
      coreSubjects: ['Cognitive Psychology', 'Developmental Psychology', 'Abnormal Psychology', 'Research Methodology', 'Organizational Behavior'],
      salaryRange: '₹4.0 LPA – ₹11.0 LPA',
      topRecruiters: ['Apollo Clinics', 'Mindler', 'Corporate HR Firms', 'Educational Foundations', 'NGOs & Rehabilitation Centers'],
      recommendedColleges: ['Women’s Christian College (WCC)', 'Presidency College Chennai', 'Stella Maris College', 'PSGCAS Coimbatore', 'The American College Madurai']
    }
  ];

  const filteredCourses = allCourses.filter((course) => {
    const matchesStream = selectedStream === 'all' || course.stream === selectedStream;
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesStream && matchesCategory;
  });

  return (
    <div className="py-24 bg-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Badge & Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-black uppercase tracking-wider mb-4">
            <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
            <span>Academic Disciplines & Career Roadmaps</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-950 tracking-tight leading-tight mb-5">
            EXPLORE THE RIGHT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-700 to-cyan-600">
              COURSE & CAREER
            </span>
          </h1>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            In-depth guides across <strong>Engineering (B.E/B.Tech)</strong>, <strong>Medical & Healthcare (MBBS/BDS/AHS)</strong>, and <strong>Arts, Science & Commerce (B.Com/B.Sc/BBA)</strong> with verified core subjects, salary benchmarks, top recruiters, and premier Tamil Nadu colleges.
          </p>
        </div>

        {/* Stream Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <button
            onClick={() => {
              setSelectedStream('all');
              setSelectedCategory('All');
            }}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 border shadow-sm ${
              selectedStream === 'all'
                ? 'bg-slate-950 text-white border-slate-950 shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>All Disciplines</span>
          </button>

          <button
            onClick={() => {
              setSelectedStream('engineering');
              setSelectedCategory('All');
            }}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 border shadow-sm ${
              selectedStream === 'engineering'
                ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Engineering & Tech</span>
          </button>

          <button
            onClick={() => {
              setSelectedStream('medical');
              setSelectedCategory('All');
            }}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 border shadow-sm ${
              selectedStream === 'medical'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            <span>Medical & Healthcare</span>
          </button>

          <button
            onClick={() => {
              setSelectedStream('arts-science');
              setSelectedCategory('All');
            }}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 border shadow-sm ${
              selectedStream === 'arts-science'
                ? 'bg-purple-600 text-white border-purple-600 shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Arts, Science & Commerce</span>
          </button>
        </div>

        {/* Courses Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => {
            const Icon = course.icon;

            return (
              <div
                key={course.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-slate-200 hover:border-blue-500/60 transition-all shadow-sm hover:shadow-xl flex flex-col justify-between group"
              >
                <div>
                  {/* Top Pill & Icon */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap justify-end">
                      <span className={`text-[10px] px-2.5 py-1 rounded-md font-black uppercase tracking-wider ${
                        course.stream === 'medical'
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : course.stream === 'arts-science'
                          ? 'bg-purple-100 text-purple-900 border border-purple-300'
                          : 'bg-blue-100 text-blue-900 border border-blue-300'
                      }`}>
                        {course.shortCode}
                      </span>
                    </div>
                  </div>

                  <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider block mb-1">
                    {course.category}
                  </span>

                  <h3 className="text-lg sm:text-xl font-black text-slate-950 leading-snug group-hover:text-blue-700 transition-colors">
                    {course.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                    {course.overview}
                  </p>

                  {/* Core Subjects */}
                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <span className="text-[11px] font-black uppercase text-slate-800 tracking-wider block mb-2 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-blue-600" /> Key Core Syllabus:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {course.coreSubjects.map((sub, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-lg bg-slate-50 text-slate-700 text-[11px] font-semibold border border-slate-200"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Salary & Recruiters */}
                  <div className="mt-4 p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-bold">Average CTC:</span>
                      <span className="font-black text-emerald-700">{course.salaryRange}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-bold block mb-1">Top Recruiters:</span>
                      <span className="font-semibold text-slate-800 block text-[11px]">
                        {course.topRecruiters.join(' • ')}
                      </span>
                    </div>
                  </div>

                  {/* Recommended Colleges in TN */}
                  <div className="mt-4">
                    <span className="text-[11px] font-black uppercase text-slate-800 tracking-wider block mb-1.5 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-blue-600" /> Premier TN Institutions:
                    </span>
                    <p className="text-[11px] text-slate-600 font-medium">
                      {course.recommendedColleges.join(', ')}
                    </p>
                  </div>
                </div>

                {/* Card Action */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setCurrentPublicView('colleges')}
                    className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-blue-600 text-white font-black text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Find Colleges Offering {course.shortCode}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Student Guidance Banner */}
        <div className="mt-16 bg-gradient-to-r from-blue-900 to-slate-900 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs uppercase font-black tracking-wider text-cyan-400">
              Personalized Career Counseling
            </span>
            <h3 className="text-2xl sm:text-3xl font-black">
              Unsure Which Branch Matches Your Skills?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Take our 5-minute AI Career Assessment test to discover your optimal engineering, medical, or commerce discipline based on your interests and aptitude.
            </p>
          </div>

          <button
            onClick={() => setCurrentPublicView('find-my-college')}
            className="px-6 py-3.5 rounded-2xl bg-cyan-400 text-slate-950 font-black text-xs sm:text-sm hover:bg-cyan-300 transition-all shrink-0 shadow-lg shadow-cyan-400/25 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Launch AI College Matchmaker</span>
          </button>
        </div>

      </div>
    </div>
  );
};
