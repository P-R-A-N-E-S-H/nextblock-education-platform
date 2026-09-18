import React from 'react';
import { Award, Building2, MapPin, DollarSign, TrendingUp, GraduationCap, ArrowRight, ShieldCheck, Sparkles, Building, Bookmark, Stethoscope, Palette, Cpu } from 'lucide-react';
import { allTNCollegesData, TNCollege } from '../../data/indexTNColleges';
import { getStreamFallbackImage } from '../../utils/helpers';

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
            <span>State Benchmarks & Premier Institutions</span>
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950">
            FEATURED TAMIL NADU INSTITUTIONS
          </h3>
        </div>
        <span className="text-xs text-slate-600 font-bold bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200">
          Verified for 2026 Admissions (Engg / Med / Arts)
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
                      (e.target as HTMLImageElement).src = getStreamFallbackImage(college.stream);
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-black/20" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-md bg-blue-600 text-white text-[10px] font-black shadow-md">
                        {college.stream || 'Engineering'}
                      </span>
                      {college.tneaCode && (
                        <span className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-cyan-300 text-[10px] font-black border border-slate-700">
                          TNEA {college.tneaCode}
                        </span>
                      )}
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
                <div className="p-5 sm:p-6 space-y-4">
                  {/* Stats row */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-slate-500 text-[10px] uppercase font-black block">
                        {college.stream === 'Medical' ? 'NEET Cutoff' : college.stream === 'Arts & Science' ? 'Board Cutoff' : 'TNEA Cutoff'}
                      </span>
                      <span className="font-black text-blue-700 block truncate">
                        {college.stream === 'Medical' 
                          ? (college.neetCutoffGeneral || 'NEET Merit') 
                          : college.stream === 'Arts & Science' 
                          ? (college.meritCutoffPercentage || '85% – 98%') 
                          : (college.tneaCutoffGeneral || 'Merit Basis')}
                      </span>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-slate-500 text-[10px] uppercase font-black block">Top Package</span>
                      <span className="font-black text-emerald-700 block truncate">{college.placements.highestPackage}</span>
                    </div>
                  </div>

                  {/* Highlights overview */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {college.overview}
                  </p>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="p-5 sm:p-6 pt-0">
                <button
                  onClick={() => onSelectCollege(college)}
                  className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-blue-600 text-white font-black text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 group/btn"
                >
                  <span>Explore Full Profile</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
