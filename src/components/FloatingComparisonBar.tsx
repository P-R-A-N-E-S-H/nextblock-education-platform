import React from 'react';
import { Scale, X, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FloatingComparisonBar: React.FC = () => {
  const { 
    comparisonCollegeIds, 
    colleges, 
    removeFromComparison, 
    clearComparison, 
    setCurrentPublicView,
    currentPublicView,
    currentRole
  } = useApp();

  if (comparisonCollegeIds.length === 0 || currentPublicView === 'compare') {
    return null;
  }

  const selectedColleges = comparisonCollegeIds
    .map(id => colleges.find(c => c.id === id))
    .filter(Boolean);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-xl w-[92%] bg-slate-900/95 backdrop-blur-xl border-2 border-cyan-500/40 p-3.5 rounded-2xl shadow-2xl shadow-cyan-500/10 flex items-center justify-between gap-3 animate-in slide-in-from-bottom-5 duration-200">
      
      {/* Left: Selected Colleges Badges */}
      <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar">
        <div className="p-2 rounded-xl bg-blue-600/20 text-cyan-400 flex items-center justify-center flex-shrink-0">
          <Scale className="w-4 h-4" />
        </div>

        <div className="flex items-center gap-1.5 flex-nowrap">
          {selectedColleges.map((col: any) => (
            <div
              key={col.id}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-bold text-white flex-shrink-0"
            >
              <span className="truncate max-w-[90px] sm:max-w-[120px]">{col.shortName}</span>
              <button
                onClick={() => removeFromComparison(col.id)}
                className="text-slate-400 hover:text-rose-400 p-0.5"
                title="Remove"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Compare Action Button */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={clearComparison}
          className="text-[11px] text-slate-400 hover:text-white font-bold hidden sm:inline"
        >
          Clear
        </button>

        <button
          onClick={() => {
            setCurrentPublicView('compare');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs transition-colors flex items-center gap-1.5 shadow-lg shadow-blue-500/30 whitespace-nowrap"
        >
          <span>Compare ({comparisonCollegeIds.length}/4)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
