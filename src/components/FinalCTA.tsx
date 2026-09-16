import React from 'react';
import { ArrowRight, Sparkles, PhoneCall, ShieldCheck, CheckCircle2, MessageSquare } from 'lucide-react';

interface FinalCTAProps {
  onOpenBooking: () => void;
  onOpenAdvisorChat: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  onOpenBooking,
  onOpenAdvisorChat
}) => {
  return (
    <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* 3D Geometric Blocks Background */}
      <div className="absolute inset-0 bg-dark-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      
      {/* Subtle Floating Blocks */}
      <div className="absolute top-12 left-12 w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/20 hidden md:flex items-center justify-center animate-float-slow transform -rotate-12">
        <div className="w-6 h-6 bg-blue-500 rounded-lg" />
      </div>
      <div className="absolute bottom-12 right-12 w-20 h-20 rounded-3xl bg-cyan-600/10 border border-cyan-500/20 hidden md:flex items-center justify-center animate-float-delayed transform rotate-12">
        <div className="w-8 h-8 bg-cyan-400 rounded-xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-6">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Your Dream Education Awaits</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
          Your Future Doesn't <br className="hidden sm:inline" />
          Have to <span className="text-gradient-cyan">Be a Guess.</span>
        </h2>

        {/* Subheading */}
        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
          Let's build your next block together. Join hundreds of students who transformed their admissions strategy into Ivy League and world-top acceptances.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 rounded-2xl text-base font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60 transition-all duration-200 hover:-translate-y-0.5"
          >
            <span>Book Free Counselling</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={onOpenAdvisorChat}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 shadow-lg hover:text-white transition-all"
          >
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            <span>Talk to an Advisor</span>
          </button>
        </div>

        {/* Bottom Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-8 text-xs font-semibold text-slate-400">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Free Initial Discovery
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-cyan-400" /> Confidential & Unbiased Advisory
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-blue-400" /> Matched with Senior Mentors
          </span>
        </div>

      </div>
    </section>
  );
};
