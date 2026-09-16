import React from 'react';
import { Award, Building2, MapPin, DollarSign, TrendingUp, GraduationCap, ArrowRight, ShieldCheck, Sparkles, Building, Bookmark } from 'lucide-react';
import { allTNCollegesData, TNCollege } from '../../data/indexTNColleges';

interface TNFeaturedCollegesProps {
  onSelectCollege: (college: TNCollege) => void;
  onToggleCompare: (college: TNCollege) => void;
  comparedIds: string[];
}

export const TNFeaturedColleges: React.FC<TNFeaturedCollegesProps> = ({
  onSelectCollege,
  onToggleCompare,
  comparedIds
}) => {
  const featuredColleges = allTNCollegesData.filter((c) => c.isFeatured);

  return (
    <div className="mb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-700 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>State Benchmarks & Autonomous Landmarks</span>
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950">
            FEATURED TAMIL NADU INSTITUTIONS
          </h3>
        </div>
        <span className="text-xs text-slate-600 font-bold bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200">
          Official TNEA Verified for 2026 Admissions
        </span>
      </div>

      {/* Grid of Featured Colleges */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {featuredColleges.map((college) => {
          const isCompared = comparedIds.includes(college.id);

          return (
            <div
              key={college.id}
              className="group bg-white rounded-3xl overflow-hidden border-2 border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-blue-500/15 hover:border-blue-500 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-950">
                  <img
                    src={college.image}
                    alt={college.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      // Fallback to elegant campus photography
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-black/20" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <div className="flex items-center gap-1.5">
                      {college.tneaCode && (
                        <span className="px-2.5 py-1 rounded-md bg-blue-600 text-white text-[10px] font-black shadow-md">
                          TNEA {college.tneaCode}
                        </span>
                      )}
                      <span className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-cyan-300 text-[10px] font-black border border-slate-700">
                        {college.institutionType.split(' ')[0]}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleCompare(college);
                      }}
                      className={`px-3 py-1 rounded-full text-xs font-black transition-all backdrop-blur-md ${
                        isCompared
                          ? 'bg-emerald-500 text-white shadow-md'
                          : 'bg-slate-950/80 text-white hover:bg-slate-900 border border-slate-700'
                      }`}
                    >
                      {isCompared ? '✓ Added' : '+ Compare'}
                    </button>
                  </div>

                  {/* Bottom Banner Info */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-xs font-bold text-cyan-300 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      {college.city}, {college.district}
                    </span>
                    <h4 className="text-base sm:text-lg font-black text-white leading-tight mt-0.5 line-clamp-1">
                      {college.name}
                    </h4>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 sm:p-6 space-y-3.5">
                  
                  {/* Quick Metrics Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <span className="text-slate-500 text-[10px] uppercase font-extrabold block">TNEA Cutoff</span>
                      <span className="font-black text-blue-700 block truncate">{college.tneaCutoffGeneral || 'Check Exam'}</span>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <span className="text-slate-500 text-[10px] uppercase font-extrabold block">Highest Package</span>
                      <span className="font-black text-emerald-700 block">{college.placements.highestPackage}</span>
                    </div>
                  </div>

                  {/* Popular Programs */}
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-slate-500 block mb-1">
                      Key Engineering Disciplines:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {college.popularBranches.slice(0, 3).map((branch, idx) => (
                        <span key={idx} className="text-[11px] font-bold px-2 py-0.5 rounded-lg bg-slate-100 text-slate-800 border border-slate-200">
                          {branch}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Fees Info */}
                  <div className="pt-2 border-t border-slate-200 text-xs flex items-center justify-between">
                    <span className="text-slate-600 font-semibold">Approx Fees:</span>
                    <span className="font-black text-slate-950">{college.approxFeesPerYear}</span>
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="p-5 sm:p-6 pt-0">
                <button
                  onClick={() => onSelectCollege(college)}
                  className="w-full py-3 px-4 rounded-xl bg-slate-950 group-hover:bg-blue-600 text-white text-xs font-black transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Explore College Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
