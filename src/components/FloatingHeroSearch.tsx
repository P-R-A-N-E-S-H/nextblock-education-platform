import React, { useState, useEffect } from 'react';
import { Search, Sparkles, ArrowRight, MapPin, Building2, Flame } from 'lucide-react';
import { scrollToSection } from '../utils/helpers';

interface FloatingHeroSearchProps {
  onSearch: (query: string) => void;
}

export const FloatingHeroSearch: React.FC<FloatingHeroSearchProps> = ({ onSearch }) => {
  const placeholders = [
    'Engineering colleges in Coimbatore (TNEA)',
    'Medical colleges in Chennai (NEET Score)',
    'Arts & Science colleges in Tamil Nadu (B.Com / B.Sc)',
    'Best MBBS colleges with top hospital rankings',
    'CSE & AI colleges in Coimbatore & Chennai',
    'Loyola, PSGCAS & MCC Arts colleges',
    'Govt Medical Colleges in Tamil Nadu',
    'Top Autonomous colleges with 100% placements'
  ];

  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [placeholders.length]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    } else {
      onSearch(placeholders[placeholderIndex]);
    }
  };

  const handleTagClick = (tag: string) => {
    setQuery(tag);
    onSearch(tag);
  };

  return (
    <div className="relative z-30 max-w-4xl mx-auto px-4 -mt-10 sm:-mt-12">
      <div className="bg-slate-900/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border-2 border-cyan-500/40 shadow-2xl shadow-cyan-500/20 text-white">
        
        {/* Title & Tag */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-cyan-400">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-white tracking-wide">
                DISCOVER YOUR DREAM COLLEGE
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">
                Live search 200+ verified Engineering, Medical (NEET), and Arts & Science colleges in Tamil Nadu
              </p>
            </div>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            <Flame className="w-3 h-3 text-cyan-400" /> Multi-Stream 2026
          </span>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center gap-3 mb-4">
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholders[placeholderIndex]}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-950/90 border-2 border-slate-700 text-sm font-bold text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-all shadow-inner"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-cyan-500/50 flex items-center justify-center gap-2 shrink-0 border border-cyan-300/30"
          >
            <span>SEARCH →</span>
          </button>
        </form>

        {/* Popular Tags */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-extrabold uppercase text-[10px] tracking-wider">
            Popular Streams:
          </span>
          {[
            'Engineering', 
            'Medical (NEET)', 
            'Arts & Science', 
            'MBBS', 
            'B.Com', 
            'CSE & AI', 
            'Coimbatore', 
            'Chennai', 
            'PSG Tech', 
            'MMC Chennai',
            'Loyola College'
          ].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleTagClick(tag)}
              className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-400 hover:bg-slate-800 text-xs font-bold transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
