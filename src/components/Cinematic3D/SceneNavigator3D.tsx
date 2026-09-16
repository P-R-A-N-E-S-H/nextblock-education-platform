import React, { useState, useEffect } from 'react';
import { Layers, Compass, ChevronRight, Eye } from 'lucide-react';
import { scrollToSection } from '../../utils/helpers';

export const SceneNavigator3D: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isExpanded, setIsExpanded] = useState(false);

  const milestones = [
    { id: 'home', label: '01 Hero Universe', target: 'home' },
    { id: 'search', label: '02 Floating Search', target: 'home' },
    { id: 'journey', label: '03 6-Stage Journey', target: 'journey' },
    { id: 'tn-colleges', label: '04 College Discovery', target: 'tn-colleges' },
    { id: 'careers', label: '05 Career Pathways', target: 'careers' },
    { id: 'why-us', label: '06 Why NEXTBLOCK', target: 'why-us' },
    { id: 'smart-finder', label: '07 Cutoff Simulator', target: 'smart-finder' },
    { id: 'counselling-cta', label: '08 3D Staircase CTA', target: 'counselling-cta' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'journey', 'tn-colleges', 'careers', 'why-us', 'smart-finder', 'counselling-cta'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 250) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end">
      
      {/* Expanded Menu Panel */}
      <div className="bg-slate-950/90 backdrop-blur-xl border-2 border-slate-800 rounded-3xl p-3 shadow-2xl space-y-1 text-right">
        <div className="px-2.5 py-1 border-b border-slate-800/80 mb-2 flex items-center justify-between gap-3 text-[10px] font-black uppercase text-cyan-400">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            3D SCENE HUD
          </span>
          <span className="font-mono text-slate-500">NEXTBLOCK</span>
        </div>

        {milestones.map((m) => {
          const isActive = activeSection === m.id;

          return (
            <button
              key={m.id}
              onClick={() => scrollToSection(m.target)}
              className={`w-full text-right px-3 py-1.5 rounded-xl text-[11px] font-black transition-all flex items-center justify-end gap-2 group ${
                isActive
                  ? 'bg-blue-600/30 text-cyan-300 border border-cyan-400/50 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <span className="tracking-wide">{m.label}</span>
              <span className={`w-2 h-2 rounded-full transition-all ${
                isActive ? 'bg-cyan-400 scale-125 shadow-xs shadow-cyan-400' : 'bg-slate-700 group-hover:bg-slate-500'
              }`} />
            </button>
          );
        })}
      </div>
    </div>
  );
};
