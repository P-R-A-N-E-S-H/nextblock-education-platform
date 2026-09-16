import React from 'react';
import { Award, Building2, MapPin, DollarSign, TrendingUp, GraduationCap, ArrowRight, ShieldCheck, CheckCircle2, Sparkles, Building } from 'lucide-react';
import { indiaCollegesData, College } from '../../data/indiaColleges';

interface FeaturedInstitutionsProps {
  onSelectCollege: (college: College) => void;
  onToggleCompare: (college: College) => void;
  comparedIds: string[];
}

export const FeaturedInstitutions: React.FC<FeaturedInstitutionsProps> = ({
  onSelectCollege,
  onToggleCompare,
  comparedIds
}) => {
  const featuredColleges = indiaCollegesData.filter((c) => c.isFeatured);

  return (
    <div className="mb-20">
      {/* Subsection Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Top Tier National Benchmarks</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
            FEATURED ENGINEERING INSTITUTIONS
          </h3>
        </div>
        <span className="text-xs text-slate-500 font-medium">
          Official admissions data verified for 2026-2027 Academic Year
        </span>
      </div>

      {/* Featured Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {featuredColleges.map((college) => {
          const isCompared = comparedIds.includes(college.id);

          return (
            <div
              key={college.id}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-300 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-950">
                  <img
                    src={college.image}
                    alt={college.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-[11px] font-bold shadow-sm">
                      {college.institutionType}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleCompare(college);
                      }}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all backdrop-blur-md ${
                        isCompared
                          ? 'bg-emerald-500 text-white shadow-md'
                          : 'bg-black/50 text-white hover:bg-black/80'
                      }`}
                    >
                      {isCompared ? '✓ Comparing' : '+ Compare'}
                    </button>
                  </div>

                  {/* Bottom Banner Info */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-xs font-semibold text-cyan-300 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {college.city}, {college.state}
                    </span>
                    <h4 className="text-lg font-black text-white leading-tight mt-0.5">
                      {college.name}
                    </h4>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-4">
                  
                  {/* Campuses List */}
                  {college.campuses && (
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <span className="text-[10px] font-bold uppercase text-slate-500 block mb-1 flex items-center gap-1">
                        <Building className="w-3 h-3 text-blue-600" /> Campuses:
                      </span>
                      <p className="text-xs text-slate-800 font-semibold truncate">
                        {college.campuses.slice(0, 4).join(' • ')} {college.campuses.length > 4 ? `+${college.campuses.length - 4}` : ''}
                      </p>
                    </div>
                  )}

                  {/* Quick Metrics Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <span className="text-slate-500 text-[10px] uppercase font-bold block">Entrance Exam</span>
                      <span className="font-bold text-blue-600 block truncate">{college.entranceExams.join(', ')}</span>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <span className="text-slate-500 text-[10px] uppercase font-bold block">Highest Package</span>
                      <span className="font-bold text-emerald-600 block">{college.placements.highestPackage}</span>
                    </div>
                  </div>

                  {/* Popular Programs */}
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1.5">
                      Key Engineering Programs:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {college.popularBranches.slice(0, 3).map((branch, idx) => (
                        <span key={idx} className="text-[11px] font-medium px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700">
                          {branch}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Fees & Scholarships */}
                  <div className="pt-3 border-t border-slate-100 text-xs">
                    <p className="text-slate-600">
                      <strong className="text-slate-900">Approx Fees:</strong> {college.approxTuitionPerYear}
                    </p>
                    <p className="text-emerald-700 text-[11px] font-semibold truncate mt-0.5">
                      ★ {college.scholarships.split('(')[0]}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Bottom CTA */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => onSelectCollege(college)}
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 group-hover:bg-blue-600 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Explore College Details</span>
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
