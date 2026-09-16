import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Target, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  Users, 
  Compass, 
  ArrowRight,
  TrendingUp,
  HeartHandshake
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AboutPage: React.FC = () => {
  const { setCurrentRole } = useApp();

  return (
    <div className="py-24 bg-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Badge & Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-black uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>About NEXTBLOCK Education</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-950 tracking-tight leading-tight mb-5">
            EVERY DECISION IS A BLOCK. <br />
            <span className="text-gradient">TOGETHER, THEY BUILD YOUR FUTURE.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
            NEXTBLOCK was founded on a simple conviction: choosing a college and career should not be driven by confusion, misinformation, or fear. We provide transparent, data-driven, student-first engineering and education consultancy.
          </p>
        </div>

        {/* The 6-Block Philosophy */}
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 mb-20 border-2 border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-cyan-400 block mb-1">
              THE NEXTBLOCK FRAMEWORK
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              The 6-Stage Student Progression
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {[
              { step: '01', title: 'DISCOVER', desc: 'Aptitude, cutoff & strengths mapping' },
              { step: '02', title: 'DECIDE', desc: 'Branch vs College priority alignment' },
              { step: '03', title: 'SHORTLIST', desc: '50+ TNEA Choice order architecture' },
              { step: '04', title: 'APPLY', desc: 'Document verification & round locking' },
              { step: '05', title: 'ADMIT', desc: 'Upward movement & seat allotment' },
              { step: '06', title: 'ACHIEVE', desc: '4-year tech placement roadmap' }
            ].map((block) => (
              <div key={block.step} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-black text-cyan-400 block mb-1">{block.step}</span>
                  <h3 className="text-sm font-black text-white mb-2">{block.title}</h3>
                </div>
                <p className="text-[11px] text-slate-400 font-medium leading-snug">{block.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <div className="p-7 rounded-3xl bg-slate-50 border-2 border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-950 mb-2">100% Transparent Data</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              We never promote unverified institutions or push students toward colleges for commercial incentives. Every recommendation is backed by real cutoff and placement data.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-slate-50 border-2 border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-950 mb-2">7.5% Govt School & FG Aid</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Specialized desks dedicated to verifying government school bonafides, First Graduate certificates, and securing 100% free seats for deserving students.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-slate-50 border-2 border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center mb-4">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-950 mb-2">Regional Deep Dive</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Exhaustive intelligence on Tamil Nadu’s manufacturing and IT corridors: Coimbatore, Chennai, Madurai, Trichy, Salem, and all 38 districts.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-slate-50 border-2 border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-950 mb-2">Product Placement Mentorship</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Guidance doesn't stop at admission. We connect students with senior alumni at Zoho, Cisco, Amazon, and PayPal to build their coding portfolios early.
            </p>
          </div>
        </div>

        {/* Leadership & Advisory Team */}
        <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 border-2 border-slate-200 mb-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-blue-700 block mb-1">
              MEET THE ADVISORS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
              Senior Admissions & Counselling Strategists
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: 'Dr. R. Shanmugam',
                role: 'Director of TNEA Choice Strategy',
                bio: 'Former Anna University Affiliated College Principal with 22+ years of counseling experience.',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
              },
              {
                name: 'Mrs. Anitha Balaji',
                role: 'Senior Admission Advisor (Chennai)',
                bio: 'Specialist in Tier-1 Autonomous college cutoffs, SSN Merit Scholarships, and IT branch trends.',
                avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'
              },
              {
                name: 'Mr. Vigneshwaran K.',
                role: 'Govt School & Welfare Aid Lead',
                bio: 'Advocate for 7.5% Govt School reservation and First Graduate fee waivers across rural TN.',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
              },
              {
                name: 'Ms. Sneha Raghavan',
                role: 'Global Pathways & Study Abroad Lead',
                bio: 'Expert in overseas STEM master’s admissions, DAAD scholarships, and UK/US university roadmaps.',
                avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80'
              }
            ].map((advisor, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border-2 border-slate-200 text-center shadow-xs">
                <img
                  src={advisor.avatar}
                  alt={advisor.name}
                  className="w-20 h-20 rounded-2xl object-cover mx-auto mb-4 border-2 border-blue-200"
                />
                <h4 className="text-sm font-black text-slate-950">{advisor.name}</h4>
                <p className="text-xs font-bold text-blue-700 mb-2">{advisor.role}</p>
                <p className="text-[11px] text-slate-600 leading-relaxed font-normal">{advisor.bio}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
