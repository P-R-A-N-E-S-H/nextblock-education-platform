import React, { useState } from 'react';
import { 
  Bookmark, 
  Trash2, 
  ExternalLink, 
  MapPin, 
  Award, 
  TrendingUp, 
  Building2, 
  ArrowRight,
  Sparkles,
  Scale,
  Compass,
  CheckCircle2,
  GraduationCap,
  Printer,
  Copy,
  Check,
  Download
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface StudentShortlistPageProps {
  onOpenBooking?: () => void;
}

export const StudentShortlistPage: React.FC<StudentShortlistPageProps> = ({ onOpenBooking }) => {
  const { 
    savedCollegeIds, 
    toggleSaveCollege, 
    colleges, 
    setCurrentPublicView, 
    viewCollegeDetail,
    toggleComparison,
    comparisonCollegeIds,
    addToast 
  } = useApp();

  const [copied, setCopied] = useState(false);
  const savedColleges = colleges.filter((c) => savedCollegeIds.includes(c.id));

  const handleCopyChoiceList = () => {
    if (savedColleges.length === 0) return;

    const listText = savedColleges
      .map((c, i) => `${i + 1}. [TNEA Code: ${c.tneaCode || 'Deemed'}] ${c.name} - ${c.city}, ${c.district} | Cutoff: ${c.tneaCutoffGeneral || 'N/A'} | Top Branches: ${c.popularBranches.join(', ')}`)
      .join('\n');

    navigator.clipboard.writeText(`NEXTBLOCK TNEA 2026 CHOICE FILLING PRIORITY LIST:\n\n${listText}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);

    addToast({
      id: Date.now().toString(),
      title: 'Choice List Copied! 📋',
      message: `Copied ${savedColleges.length} colleges to your clipboard.`,
      type: 'success'
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Hero Header */}
        <div className="bg-gradient-to-r from-blue-950/60 via-slate-900 to-slate-900 p-6 sm:p-10 rounded-3xl border-2 border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-black mb-3">
                <Bookmark className="w-3.5 h-3.5" />
                <span>MY SAVED COLLEGES SHORTLIST</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Your TNEA Priority Choice List
              </h1>
              <p className="text-sm text-slate-300 max-w-2xl mt-2 leading-relaxed font-normal">
                Organize and review your priority engineering colleges. Export or copy this choice order to lock your TNEA 2026 Round 1 and Round 2 lists.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setCurrentPublicView('colleges')}
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors flex items-center gap-2 border border-slate-700 cursor-pointer"
              >
                <span>+ Add More Colleges</span>
              </button>

              {onOpenBooking && (
                <button
                  onClick={onOpenBooking}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-black shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-cyan-200" />
                  <span>Get Counsellor Choice Review</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Shortlist Content Grid */}
        {savedColleges.length > 0 ? (
          <div className="space-y-6">
            
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                <span className="px-2.5 py-1 rounded-lg bg-blue-600/30 text-cyan-300 border border-blue-500/40 font-mono">
                  {savedColleges.length} Colleges
                </span>
                <span>in your active choice priority order</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleCopyChoiceList}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors flex items-center gap-1.5 border border-slate-700 cursor-pointer"
                  title="Copy formatted choice order text"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
                  <span>{copied ? 'Copied Choice List!' : 'Copy Choice List'}</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors flex items-center gap-1.5 border border-slate-700 cursor-pointer"
                  title="Print choice order sheet"
                >
                  <Printer className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Print Sheet</span>
                </button>

                <button
                  onClick={() => setCurrentPublicView('compare')}
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black text-xs transition-colors flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Compare All in Matrix →</span>
                </button>
              </div>
            </div>

            {/* Colleges Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedColleges.map((col, index) => {
                const isCompared = comparisonCollegeIds.includes(col.id);

                return (
                  <div
                    key={col.id}
                    className="bg-slate-900 rounded-3xl p-6 border-2 border-slate-800 hover:border-blue-500/60 transition-all flex flex-col justify-between shadow-xl group hover:shadow-2xl"
                  >
                    <div>
                      {/* Card Top */}
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2.5">
                          <span className="w-7 h-7 rounded-xl bg-blue-600/30 text-cyan-300 font-mono font-black text-xs flex items-center justify-center border border-blue-500/40">
                            #{index + 1}
                          </span>
                          <div>
                            <span className="text-[10px] font-black uppercase text-cyan-400 block">
                              {col.tneaCode ? `TNEA Code: ${col.tneaCode}` : 'DEEMED UNIVERSITY'}
                            </span>
                            <h3 
                              onClick={() => viewCollegeDetail(col.id)}
                              className="text-base font-black text-white group-hover:text-cyan-300 transition-colors cursor-pointer line-clamp-1"
                            >
                              {col.name}
                            </h3>
                            <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3 text-blue-400" /> {col.city}, {col.district}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => toggleSaveCollege(col.id)}
                          className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                          title="Remove from Saved"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Key Stats Block */}
                      <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 mb-4 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">TNEA Cutoff Range:</span>
                          <span className="font-black text-cyan-400">{col.tneaCutoffGeneral || '185.00+'}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Highest Placement:</span>
                          <span className="font-black text-emerald-400">{col.placements.highestPackage}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Approx. Tuition / Year:</span>
                          <span className="font-bold text-slate-200">{col.approxFeesPerYear}</span>
                        </div>
                      </div>

                      {/* Popular Branches Tags */}
                      <div className="mb-4">
                        <span className="text-[10px] font-black uppercase text-slate-500 block mb-1.5">Top Branches:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {col.popularBranches.slice(0, 3).map((branch) => (
                            <span
                              key={branch}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-medium"
                            >
                              {branch}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
                      <button
                        onClick={() => viewCollegeDetail(col.id)}
                        className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors text-center cursor-pointer shadow-sm"
                      >
                        View Full Details →
                      </button>

                      <button
                        onClick={() => toggleComparison(col.id)}
                        className={`p-2.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                          isCompared
                            ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-black'
                            : 'bg-slate-800 text-slate-300 hover:text-white border-slate-700'
                        }`}
                        title={isCompared ? 'Remove from Compare' : 'Add to Compare'}
                      >
                        <Scale className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 px-4 bg-slate-900/60 rounded-3xl border-2 border-dashed border-slate-800 space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-blue-600/20 text-cyan-400 flex items-center justify-center mx-auto">
              <Bookmark className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-white">No Colleges Saved Yet</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              Explore 123+ verified engineering institutions in Coimbatore and Tamil Nadu. Click the bookmark icon on any college card to save it to your personalized shortlist.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setCurrentPublicView('colleges')}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs shadow-lg shadow-blue-500/30 transition-all cursor-pointer"
              >
                Browse 123+ Colleges →
              </button>
              <button
                onClick={() => setCurrentPublicView('find-my-college')}
                className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold text-xs transition-all border border-slate-700 cursor-pointer"
              >
                Calculate PCM Cutoff
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
