import React from 'react';
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
  Scale
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StudentShortlist: React.FC = () => {
  const { savedCollegeIds, toggleSaveCollege, colleges, addToast } = useApp();

  const savedColleges = colleges.filter((c) => savedCollegeIds.includes(c.id));

  const handleRequestReview = () => {
    addToast({
      id: Date.now().toString(),
      title: 'Shortlist Sent to Advisor 🚀',
      message: 'Dr. R. Shanmugam will review your choice sequence before Round 1 locking.',
      type: 'success'
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border-2 border-slate-800">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-cyan-400 block mb-1">
            ROUND 1 CHOICE ARCHITECTURE
          </span>
          <h2 className="text-2xl font-black text-white">Saved Engineering Colleges</h2>
          <p className="text-xs text-slate-400 mt-0.5">Organize and prioritize institutions for TNEA choice filling</p>
        </div>

        {savedColleges.length > 0 && (
          <button
            onClick={handleRequestReview}
            className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-cyan-300" />
            <span>Request Counsellor Choice Review</span>
          </button>
        )}
      </div>

      {/* Colleges List */}
      {savedColleges.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedColleges.map((col, index) => (
            <div
              key={col.id}
              className="bg-slate-900 rounded-3xl p-6 border-2 border-slate-800 hover:border-blue-500/80 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-xl bg-blue-600/30 text-cyan-300 font-mono font-black text-xs flex items-center justify-center border border-blue-500/40">
                      #{index + 1}
                    </span>
                    <div>
                      <h3 className="text-base font-black text-white">{col.name}</h3>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-blue-400" /> {col.city}, {col.district}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleSaveCollege(col.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    title="Remove from Saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 mb-4 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">TNEA Cutoff Range:</span>
                    <span className="font-black text-cyan-400">{col.tneaCutoffGeneral || '190.00+'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Highest Tech CTC:</span>
                    <span className="font-black text-emerald-400">{col.placements.highestPackage}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Annual Tuition:</span>
                    <span className="font-bold text-slate-200">{col.approxFeesPerYear}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-[10px] font-extrabold uppercase text-slate-500 block mb-1">Key Branches:</span>
                  <div className="flex flex-wrap gap-1">
                    {col.popularBranches.slice(0, 3).map((b, i) => (
                      <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <a
                  href={col.officialWebsite}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <span className="text-[10px] font-black text-cyan-300 px-2.5 py-1 rounded bg-slate-950 border border-slate-800">
                  {col.institutionType.split(' ')[0]}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-900 rounded-3xl border-2 border-slate-800">
          <Bookmark className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-black text-white">No Saved Colleges Yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 mb-6">
            Browse the Tamil Nadu College Discovery Hub on the public website and click the bookmark button to build your choice list.
          </p>
        </div>
      )}

    </div>
  );
};
