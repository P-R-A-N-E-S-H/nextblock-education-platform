import React from 'react';
import { 
  ShieldCheck, 
  Users, 
  Building2, 
  CalendarCheck, 
  GraduationCap, 
  CheckCircle2, 
  Award,
  Sparkles
} from 'lucide-react';

export const TrustBadges: React.FC = () => {
  return (
    <section className="bg-slate-950 py-16 border-b border-slate-800 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Headline */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[11px] font-black uppercase tracking-widest text-cyan-400 block mb-1">
            TRANSPARENT & INDEPENDENT
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            MAKING EDUCATION DECISIONS SIMPLER.
          </h2>
        </div>

        {/* 4 Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-slate-900/80 p-5 rounded-3xl border-2 border-slate-800 text-center">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-2.5">
              <Building2 className="w-5 h-5" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-white">450+</p>
            <p className="text-xs font-black text-slate-300 uppercase tracking-wider mt-0.5">Colleges Covered</p>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">Govt, Aided & Autonomous</p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-3xl border-2 border-slate-800 text-center">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-2.5">
              <Users className="w-5 h-5" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-white">12,500+</p>
            <p className="text-xs font-black text-slate-300 uppercase tracking-wider mt-0.5">Students Guided</p>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">Across 38 TN Districts</p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-3xl border-2 border-slate-800 text-center">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2.5">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-white">3,800+</p>
            <p className="text-xs font-black text-slate-300 uppercase tracking-wider mt-0.5">Counselling Sessions</p>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">1-on-1 Strategy Calls</p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-3xl border-2 border-slate-800 text-center">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-2.5">
              <GraduationCap className="w-5 h-5" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-white">25+</p>
            <p className="text-xs font-black text-slate-300 uppercase tracking-wider mt-0.5">Courses & Branches</p>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">CSE, AI/DS, Core & Emerging</p>
          </div>
        </div>

        {/* 3 Trust Commitments */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300 font-bold border-t border-slate-800/80 pt-6">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Verified College Information</span>
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Student-First Guidance</span>
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Transparent Recommendations</span>
          </span>
        </div>

      </div>
    </section>
  );
};
