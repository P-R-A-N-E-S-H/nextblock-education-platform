import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Rocket, 
  CheckCircle2, 
  PhoneCall 
} from 'lucide-react';
import { scrollToSection, triggerConfetti } from '../utils/helpers';

interface FinalCinematicCTAProps {
  onOpenBooking: () => void;
}

export const FinalCinematicCTA: React.FC<FinalCinematicCTAProps> = ({ onOpenBooking }) => {
  return (
    <section className="py-28 bg-slate-950 text-white relative overflow-hidden border-b border-slate-800 text-center">
      {/* Dynamic converging glowing spheres */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-emerald-500/20 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 bg-dark-grid opacity-30 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Floating Mini Blocks Motif */}
        <div className="flex items-center justify-center gap-1.5 mb-2">
          <span className="w-2.5 h-5 bg-blue-600 rounded-xs animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2.5 h-8 bg-blue-400 rounded-xs animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2.5 h-11 bg-cyan-400 rounded-xs animate-bounce" style={{ animationDelay: '300ms' }} />
          <span className="w-2.5 h-8 bg-emerald-400 rounded-xs animate-bounce" style={{ animationDelay: '450ms' }} />
          <span className="w-2.5 h-5 bg-blue-500 rounded-xs animate-bounce" style={{ animationDelay: '600ms' }} />
        </div>

        {/* Small Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-black uppercase tracking-widest backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>YOUR NEXT STEP STARTS NOW</span>
        </div>

        {/* Grand Headline */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.02] uppercase">
          READY TO BUILD <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">
            YOUR FUTURE?
          </span>
        </h2>

        {/* Subheading */}
        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Your next decision could shape the next chapter. Explore colleges, compare your cutoff, and get personalized guidance with NEXTBLOCK.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => scrollToSection('smart-finder')}
            className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-black text-xs uppercase tracking-wider shadow-2xl shadow-blue-500/40 hover:shadow-cyan-500/60 transition-all duration-200 hover:-translate-y-0.5 border border-cyan-400/30 flex items-center justify-center gap-2"
          >
            <span>FIND MY COLLEGE →</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              triggerConfetti();
              onOpenBooking();
            }}
            className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider border-2 border-slate-700 backdrop-blur-md shadow-xl transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <span>BOOK FREE COUNSELLING →</span>
          </button>
        </div>

        {/* Brand Reinforcement Footer Bar */}
        <div className="pt-12 mt-12 border-t border-slate-800/80 max-w-3xl mx-auto space-y-2">
          <h3 className="text-lg font-black tracking-tight text-white uppercase">
            NEXT<span className="text-cyan-400">BLOCK</span>
          </h3>
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">
            Explore. Compare. Decide. Apply. Achieve.
          </p>
          <p className="text-[11px] text-slate-500">
            © 2026 NEXTBLOCK Education Consultancy. Tamil Nadu’s Premier Admissions Platform.
          </p>
        </div>

      </div>
    </section>
  );
};
