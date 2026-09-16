import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ChevronDown, 
  GraduationCap, 
  CheckCircle2, 
  Building2,
  TrendingUp,
  Award
} from 'lucide-react';
import { Hero3DBlocks } from './Hero3DBlocks';
import { FloatingHeroSearch } from './FloatingHeroSearch';
import { scrollToSection } from '../utils/helpers';
import { useApp } from '../context/AppContext';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenAssessment: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenAssessment }) => {
  const { setCurrentPublicView } = useApp();

  const handleSearchSubmit = (query: string) => {
    const el = document.getElementById('search-directory');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-slate-950 text-white pt-24 pb-12 overflow-hidden border-b border-slate-800">
      
      {/* Background Ambient Glows & Grid */}
      <div className="absolute inset-0 bg-dark-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-20 right-10 w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-Column Hero: Left Headline, Right 3D Interactive Blocks Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 pb-12">
          
          {/* Left Column: Eyebrow, Cinematic Headline, Subtitle, CTAs (6 cols) */}
          <div className="lg:col-span-6 text-center lg:text-left space-y-6">
            
            {/* Small Eyebrow Badge & New Seat Simulator Tool */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-cyan-400/30 text-cyan-300 text-xs font-black uppercase tracking-widest backdrop-blur-md shadow-lg shadow-cyan-500/10">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>NEXTBLOCK EDUCATION</span>
              </div>

              <button
                onClick={() => {
                  setCurrentPublicView('mock-allotment');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/40 text-emerald-300 text-[11px] font-black uppercase tracking-wider transition-all hover:scale-105 cursor-pointer"
              >
                <span>🎯 TNEA Seat Simulator 2026 →</span>
              </button>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.02] text-white uppercase">
              YOUR FUTURE <br />
              STARTS WITH <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">
                THE RIGHT BLOCK.
              </span>
            </h1>

            {/* Supporting Lines */}
            <div className="space-y-2">
              <p className="text-sm sm:text-base font-black text-cyan-300 tracking-wide uppercase">
                The right course. The right college. The right decision.
              </p>
              <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed max-w-xl">
                Explore colleges, discover careers, compare your options and get personalised admission guidance — all in one place.
              </p>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => scrollToSection('smart-finder')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-blue-500/30 hover:shadow-cyan-500/50 transition-all duration-200 hover:-translate-y-0.5 border border-cyan-400/30 flex items-center justify-center gap-2 group"
              >
                <span>FIND MY COLLEGE →</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider border-2 border-slate-700 backdrop-blur-md shadow-lg transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <span>BOOK FREE COUNSELLING</span>
              </button>
            </div>

            {/* Subtle Down Link */}
            <div className="pt-2">
              <button
                onClick={() => scrollToSection('tn-colleges')}
                className="text-xs font-bold text-slate-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1.5"
              >
                <span>Explore Colleges</span>
                <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
              </button>
            </div>

          </div>

          {/* Right Column: 3D Connected Assembly of Blocks (6 cols) */}
          <div className="lg:col-span-6">
            <Hero3DBlocks />
          </div>

        </div>

      </div>

      {/* Floating Education Search Card (Partially overlapping hero) */}
      <FloatingHeroSearch onSearch={handleSearchSubmit} />

    </div>
  );
};
