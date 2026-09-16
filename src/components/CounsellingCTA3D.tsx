import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  PhoneCall, 
  CheckCircle2, 
  ShieldCheck, 
  MessageSquare,
  Layers,
  GraduationCap
} from 'lucide-react';
import { triggerConfetti } from '../utils/helpers';

interface CounsellingCTA3DProps {
  onOpenBooking: () => void;
  onOpenAdvisorChat: () => void;
}

export const CounsellingCTA3D: React.FC<CounsellingCTA3DProps> = ({
  onOpenBooking,
  onOpenAdvisorChat
}) => {
  const steps = [
    { label: 'CAREER', desc: 'Aptitude & Goal Mapping', height: 'h-12 sm:h-14', color: 'bg-blue-600', text: 'text-cyan-200' },
    { label: 'COURSE', desc: 'CSE, AI/DS, ECE or Core', height: 'h-16 sm:h-20', color: 'bg-blue-500', text: 'text-white' },
    { label: 'COLLEGE', desc: '50+ Verified TN Institutions', height: 'h-24 sm:h-28', color: 'bg-cyan-500', text: 'text-slate-950 font-black' },
    { label: 'ADMISSION', desc: 'TNEA Single Window Locking', height: 'h-32 sm:h-36', color: 'bg-emerald-500', text: 'text-slate-950 font-black' },
    { label: 'FUTURE', desc: 'High-Growth Tech Career', height: 'h-40 sm:h-44', color: 'bg-gradient-to-t from-cyan-400 to-emerald-300', text: 'text-slate-950 font-black' },
  ];

  return (
    <section className="py-24 bg-slate-950 text-white relative overflow-hidden border-b border-slate-800">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading, Subtitle, CTAs (6 cols) */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-black uppercase tracking-wider backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>1-on-1 Personal Strategy Sessions</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.05] uppercase">
              CONFUSED? <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">
                LET'S BUILD YOUR NEXT BLOCK.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-xl">
              Talk to a NEXTBLOCK counsellor and get personalised guidance for your education journey. We help you lock the highest probability choice list for your cutoff.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => {
                  triggerConfetti();
                  onOpenBooking();
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-blue-500/30 hover:shadow-cyan-500/50 transition-all duration-200 hover:-translate-y-0.5 border border-cyan-400/30 flex items-center justify-center gap-2"
              >
                <span>BOOK FREE COUNSELLING →</span>
              </button>

              <button
                onClick={onOpenAdvisorChat}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider border-2 border-slate-700 backdrop-blur-md shadow-lg transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <span>TALK TO AN ADVISOR</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 pt-4 text-xs text-slate-400 font-bold border-t border-slate-800">
              <span className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Free Initial Discovery
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Google Meet or Office Visit
              </span>
            </div>

          </div>

          {/* Right Column: 3D Staircase Metaphor (6 cols) */}
          <div className="lg:col-span-6 bg-slate-900/80 p-8 rounded-3xl border-2 border-slate-800 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            
            <div className="text-center mb-6">
              <span className="text-[11px] font-black uppercase tracking-widest text-cyan-400 block mb-0.5">
                THE 5-TIER ADMISSIONS ASCENT
              </span>
              <h3 className="text-lg font-black text-white">Your Path to Career Success</h3>
            </div>

            {/* 3D Ascending Block Steps */}
            <div className="flex items-end justify-center gap-2.5 sm:gap-3.5 pt-6 pb-2">
              {steps.map((st, i) => (
                <div key={st.label} className="flex flex-col items-center gap-2 group flex-1 max-w-[85px]">
                  <span className="text-[9px] font-bold text-slate-400 group-hover:text-cyan-300 transition-colors text-center hidden sm:block">
                    {st.desc.split(' ')[0]}
                  </span>

                  <div
                    className={`w-full ${st.height} ${st.color} rounded-2xl shadow-xl flex flex-col items-center justify-between p-2 group-hover:scale-105 transition-all duration-300 border border-white/20`}
                  >
                    <span className="text-[10px] font-mono font-black opacity-75">0{i + 1}</span>
                    <span className={`text-[10px] sm:text-xs font-black uppercase tracking-tight text-center ${st.text}`}>
                      {st.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-center">
              <span className="text-xs font-bold text-slate-300">
                Every step is guided by experienced admissions strategists.
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
