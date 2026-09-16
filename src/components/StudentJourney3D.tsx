import React, { useState } from 'react';
import { 
  Compass, 
  UserCheck, 
  Layers, 
  Send, 
  CheckCircle2, 
  Trophy, 
  Sparkles, 
  ArrowRight, 
  ChevronRight,
  ShieldCheck,
  Building2
} from 'lucide-react';

interface StudentJourney3DProps {
  onOpenBooking: () => void;
}

export const StudentJourney3D: React.FC<StudentJourney3DProps> = ({ onOpenBooking }) => {
  const [activeStage, setActiveStage] = useState<number>(0);

  const stages = [
    {
      step: '01',
      title: 'DISCOVER',
      tagline: 'PCM Cutoff & Branch Aptitude Mapping',
      icon: Compass,
      description: 'Comprehensive 12th PCM aggregate cutoff calculation (/200), community rank positioning, and branch preference diagnostics.',
      deliverables: ['PCM Cutoff Calculation & Tier Classification', 'Branch Interest & Analytical Strengths Audit', 'Community Quota (BC/MBC/SC/SCA/ST) Optimization']
    },
    {
      step: '02',
      title: 'COUNSEL',
      tagline: '1-on-1 Strategic College Selection',
      icon: UserCheck,
      description: 'You are paired with a dedicated Senior Engineering Admission Counselor to evaluate Coimbatore, Chennai, and regional premier autonomous hubs.',
      deliverables: ['Govt vs Aided vs Autonomous Comparison', 'Coimbatore (PSG, CIT, KCT, SKCET) Hubs Analysis', 'Chennai (CEG, MIT, SSN, REC, CIT) Hubs Analysis']
    },
    {
      step: '03',
      title: 'SHORTLIST',
      tagline: '50+ TNEA Choice List Architecture',
      icon: Layers,
      description: 'Curating an airtight 50+ choice order categorized into Dream, Target, and Safety colleges to maximize round-1 allotment odds.',
      deliverables: ['Dream/Target/Safety Choice Order Creation', 'Branch Cutoff Surge Buffering', 'Zero-Allotment Prevention Checklist']
    },
    {
      step: '04',
      title: 'VERIFY',
      tagline: 'Certificate & Quota Validation',
      icon: ShieldCheck,
      description: 'Pre-upload verification of community certificates, First Graduate declarations, 7.5% Govt school bonafide forms, and nativity documents.',
      deliverables: ['First Graduate (FG) Fee Concession Verification', '7.5% Govt School Headmaster Bonafide Check', 'TFC Center Grievance Support']
    },
    {
      step: '05',
      title: 'ALLOT & LOCK',
      tagline: 'Round-by-Round Locking & Upward Movement',
      icon: Send,
      description: 'Live guidance during TNEA allotment rounds, seat locking deadlines, and strategic execution of the Accept & Upward Movement option.',
      deliverables: ['Live Round Choice Locking Advisory', 'Accept & Upward Movement Execution', 'Seat Confirmation Fee Guidance']
    },
    {
      step: '06',
      title: 'ACHIEVE',
      tagline: 'Campus Onboarding & 4-Year Tech Roadmap',
      icon: Trophy,
      description: 'Final college enrollment, hostel room selection, and mapping your 4-year path to crack ₹15 LPA+ product companies like Zoho, Cisco, and Amazon.',
      deliverables: ['Hostel & Fee Concession Finalization', 'Coding & DSA Skills Preparation Plan', 'Alumni Mentorship Network Connect']
    }
  ];

  return (
    <section className="py-24 bg-slate-950 text-white relative overflow-hidden border-b border-slate-800">
      {/* 3D Grid & Glow */}
      <div className="absolute inset-0 bg-dark-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-[700px] h-[500px] bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs font-extrabold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Structured 6-Milestone Progression</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight mb-5">
            YOUR 3D ENGINEERING <br />
            <span className="text-gradient-cyan">JOURNEY PATH.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Follow the illuminated roadmap through 6 critical milestones. Each block secures your top college allotment and eliminates counselling anxiety.
          </p>
        </div>

        {/* 6-Stage Glowing Path Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Interactive Stage Stepper */}
          <div className="lg:col-span-5 space-y-3">
            {stages.map((stage, idx) => {
              const Icon = stage.icon;
              const isActive = activeStage === idx;

              return (
                <div
                  key={stage.step}
                  onClick={() => setActiveStage(idx)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 border-2 flex items-center justify-between group ${
                    isActive
                      ? 'bg-blue-600/30 border-blue-500 text-white shadow-xl shadow-blue-500/25 scale-[1.02] ring-2 ring-blue-500/30'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-900 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-xs transition-colors ${
                        isActive
                          ? 'bg-gradient-to-tr from-blue-500 to-cyan-400 text-white shadow-md'
                          : 'bg-slate-800 text-cyan-400 group-hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono font-extrabold text-cyan-400">
                          {stage.step}
                        </span>
                        <h4 className="text-sm font-extrabold text-white tracking-wide">
                          {stage.title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-300 truncate max-w-[200px] font-medium">
                        {stage.tagline}
                      </p>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isActive ? 'text-cyan-400 translate-x-1' : 'text-slate-500'
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Stage 3D Showcase Card */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900/95 backdrop-blur-md rounded-3xl p-8 sm:p-10 border-2 border-slate-700 shadow-2xl relative overflow-hidden animate-in fade-in duration-300">
              
              {/* Background Accent Sphere */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />

              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-slate-700 pb-5 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
                    {React.createElement(stages[activeStage].icon, { className: 'w-7 h-7' })}
                  </div>
                  <div>
                    <span className="text-xs font-mono font-extrabold text-cyan-400 uppercase tracking-widest">
                      Milestone Phase {stages[activeStage].step}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white">
                      {stages[activeStage].title} — {stages[activeStage].tagline}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed mb-8 font-normal">
                {stages[activeStage].description}
              </p>

              {/* Deliverables Checklist */}
              <div className="bg-slate-800/90 p-5 rounded-2xl border border-slate-700 mb-8">
                <h5 className="text-xs font-extrabold uppercase tracking-wider text-cyan-400 mb-3">
                  Execution Checklist:
                </h5>
                <div className="space-y-2.5">
                  {stages[activeStage].deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-100 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={onOpenBooking}
                  className="w-full sm:flex-1 py-4 px-6 rounded-xl font-extrabold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/30 text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
                >
                  <span>Book Mentorship for Stage {stages[activeStage].step}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
