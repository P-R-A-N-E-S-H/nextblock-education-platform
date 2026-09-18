import React, { useState } from 'react';
import { 
  Scale, 
  Plus, 
  Trash2, 
  MapPin, 
  Building2, 
  Award, 
  Briefcase, 
  DollarSign, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  X,
  Bookmark,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TNCollege } from '../types';
import { getStreamFallbackImage } from '../utils/helpers';

interface CollegeComparisonPageProps {
  onOpenBooking?: () => void;
}

export const CollegeComparisonPage: React.FC<CollegeComparisonPageProps> = ({ onOpenBooking }) => {
  const { 
    colleges, 
    comparisonCollegeIds, 
    removeFromComparison, 
    addToComparison, 
    clearComparison, 
    savedCollegeIds, 
    toggleSaveCollege,
    setCurrentPublicView,
    viewCollegeDetail,
    addToast
  } = useApp();

  const [addCollegeDropdownOpen, setAddCollegeDropdownOpen] = useState(false);

  // Selected colleges for comparison
  const selectedColleges: TNCollege[] = comparisonCollegeIds
    .map(id => colleges.find(c => c.id === id))
    .filter((c): c is TNCollege => c !== undefined);

  // Available colleges to add
  const availableColleges = colleges.filter(c => !comparisonCollegeIds.includes(c.id));

  const handleSaveComparison = () => {
    addToast({
      id: Date.now().toString(),
      title: 'Comparison Saved ⭐',
      message: 'This comparison set has been pinned to your session memory.',
      type: 'success'
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-20 pb-24">
      
      {/* Top Header Banner */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-black uppercase tracking-wider mb-3">
              <Scale className="w-4 h-4" /> Side-by-Side Matrix
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Compare Engineering Colleges
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Analyze up to 4 Tamil Nadu institutions side-by-side across TNEA cutoffs, actual fee structures, NIRF ranking, and product placement packages.
            </p>
          </div>

          {/* Top Actions */}
          <div className="flex items-center gap-3">
            {selectedColleges.length > 0 && (
              <button
                onClick={clearComparison}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors border border-slate-700"
              >
                Clear Matrix
              </button>
            )}

            {/* Add College Dropdown Button */}
            {selectedColleges.length < 4 && (
              <div className="relative">
                <button
                  onClick={() => setAddCollegeDropdownOpen(!addCollegeDropdownOpen)}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add College ({selectedColleges.length}/4)</span>
                  <ChevronDown className="w-3.5 h-3.5 ml-1" />
                </button>

                {addCollegeDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 max-h-80 overflow-y-auto bg-slate-900 border-2 border-slate-800 rounded-2xl shadow-2xl z-30 p-2 space-y-1 custom-scrollbar animate-in fade-in duration-150">
                    <span className="text-[10px] font-black uppercase text-slate-400 px-3 py-1.5 block border-b border-slate-800">
                      Select College to Compare:
                    </span>
                    {availableColleges.map((col) => (
                      <button
                        key={col.id}
                        onClick={() => {
                          addToComparison(col.id);
                          setAddCollegeDropdownOpen(false);
                        }}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800 text-xs text-white hover:text-cyan-300 transition-colors flex items-center justify-between"
                      >
                        <span className="font-bold truncate pr-2">{col.shortName}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{col.city}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Empty State */}
        {selectedColleges.length === 0 ? (
          <div className="bg-slate-900 rounded-3xl p-12 sm:p-16 text-center border-2 border-slate-800 space-y-4 max-w-2xl mx-auto my-12">
            <div className="w-16 h-16 rounded-2xl bg-blue-600/20 text-cyan-400 flex items-center justify-center mx-auto">
              <Scale className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-white">No Colleges Selected for Comparison</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
              Explore the Tamil Nadu college directory and click the <strong className="text-white font-black">"Compare"</strong> button on any college card to start evaluating them side-by-side.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setCurrentPublicView('colleges')}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs transition-colors shadow-lg shadow-blue-500/30 inline-flex items-center gap-2"
              >
                <span>Browse College Directory</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Responsive Comparison Matrix Table */}
            <div className="bg-slate-900 rounded-3xl border-2 border-slate-800 overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  
                  {/* Table Header: College Cards */}
                  <thead>
                    <tr className="bg-slate-950 border-b-2 border-slate-800">
                      <th className="p-5 w-48 text-slate-400 uppercase font-black tracking-wider text-[11px] align-top bg-slate-950/90">
                        Feature / Metric
                      </th>
                      {selectedColleges.map((college) => {
                        const isSaved = savedCollegeIds.includes(college.id);

                        return (
                          <th key={college.id} className="p-5 min-w-[240px] max-w-[280px] align-top border-l border-slate-800/80">
                            <div className="space-y-3">
                              <div className="relative h-28 rounded-xl overflow-hidden bg-slate-800">
                                <img
                                  src={college.image}
                                  alt={college.name}
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = getStreamFallbackImage(college.stream);
                                  }}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent" />
                                
                                <button
                                  onClick={() => removeFromComparison(college.id)}
                                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-900/80 text-slate-400 hover:text-rose-400 hover:bg-slate-900 border border-slate-700 transition-colors"
                                  title="Remove from comparison"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              <div>
                                <div className="flex items-center gap-1.5 mb-1">
                                  <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-blue-600/30 text-cyan-300 border border-blue-500/40">
                                    {college.stream || 'Engineering'}
                                  </span>
                                  {college.tneaCode && (
                                    <span className="text-[10px] font-mono text-cyan-400 font-bold">
                                      TNEA: {college.tneaCode}
                                    </span>
                                  )}
                                </div>
                                <h3 
                                  onClick={() => viewCollegeDetail(college.id)}
                                  className="text-sm font-black text-white hover:text-cyan-400 transition-colors cursor-pointer mt-0.5 line-clamp-2"
                                >
                                  {college.name}
                                </h3>
                              </div>

                              <div className="flex items-center gap-2 pt-1">
                                <button
                                  onClick={() => viewCollegeDetail(college.id)}
                                  className="flex-1 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] text-center"
                                >
                                  Profile
                                </button>
                                <button
                                  onClick={() => toggleSaveCollege(college.id)}
                                  className={`p-1.5 rounded-lg border text-xs ${
                                    isSaved ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                                  }`}
                                  title="Save to Shortlist"
                                >
                                  <Bookmark className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </th>
                        );
                      })}

                      {/* Placeholder Add Column if less than 4 */}
                      {selectedColleges.length < 4 && (
                        <th className="p-5 min-w-[200px] border-l border-slate-800 border-dashed align-middle text-center bg-slate-950/40">
                          <button
                            onClick={() => setAddCollegeDropdownOpen(true)}
                            className="p-4 rounded-2xl border-2 border-dashed border-slate-700 hover:border-cyan-400 text-slate-400 hover:text-white transition-all flex flex-col items-center gap-2 mx-auto"
                          >
                            <Plus className="w-6 h-6 text-cyan-400" />
                            <span className="text-xs font-bold">Add Another College</span>
                          </button>
                        </th>
                      )}
                    </tr>
                  </thead>

                  {/* Table Comparison Body */}
                  <tbody className="divide-y divide-slate-800/60 font-medium">
                    
                    {/* Location & District */}
                    <tr className="hover:bg-slate-800/30">
                      <td className="p-4 font-black text-slate-300 bg-slate-950/50 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-cyan-400" /> Location
                      </td>
                      {selectedColleges.map((c) => (
                        <td key={c.id} className="p-4 border-l border-slate-800 text-white font-bold">
                          {c.city}, {c.district}
                        </td>
                      ))}
                    </tr>

                    {/* Institution Type */}
                    <tr className="hover:bg-slate-800/30">
                      <td className="p-4 font-black text-slate-300 bg-slate-950/50 flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-blue-400" /> Institution Type
                      </td>
                      {selectedColleges.map((c) => (
                        <td key={c.id} className="p-4 border-l border-slate-800 text-slate-200">
                          {c.institutionType}
                        </td>
                      ))}
                    </tr>

                    {/* TNEA Counselling Code */}
                    <tr className="hover:bg-slate-800/30">
                      <td className="p-4 font-black text-slate-300 bg-slate-950/50">
                        TNEA Code
                      </td>
                      {selectedColleges.map((c) => (
                        <td key={c.id} className="p-4 border-l border-slate-800 font-mono font-black text-cyan-400 text-sm">
                          {c.tneaCode || 'N/A (Entrance)'}
                        </td>
                      ))}
                    </tr>

                    {/* Cutoff Range */}
                    <tr className="hover:bg-slate-800/30 bg-blue-950/20">
                      <td className="p-4 font-black text-cyan-300 bg-slate-950/50">
                        Cutoff / Merit Standard
                      </td>
                      {selectedColleges.map((c) => (
                        <td key={c.id} className="p-4 border-l border-slate-800 font-black text-cyan-400 text-sm">
                          {c.stream === 'Medical' 
                            ? (c.neetCutoffGeneral || 'NEET Merit') 
                            : c.stream === 'Arts & Science' 
                            ? (c.meritCutoffPercentage || '85% – 98%') 
                            : (c.tneaCutoffGeneral || 'Merit / Exam')}
                        </td>
                      ))}
                    </tr>

                    {/* Accreditation & NIRF */}
                    <tr className="hover:bg-slate-800/30">
                      <td className="p-4 font-black text-slate-300 bg-slate-950/50 flex items-center gap-2">
                        <Award className="w-4 h-4 text-amber-400" /> NIRF & NAAC
                      </td>
                      {selectedColleges.map((c) => (
                        <td key={c.id} className="p-4 border-l border-slate-800 text-slate-200 space-y-1">
                          <span className="font-bold text-amber-300 block">{c.nirfRank || 'Participating'}</span>
                          <span className="text-[11px] text-cyan-300">{c.naacGrade || 'NAAC Accredited'}</span>
                        </td>
                      ))}
                    </tr>

                    {/* Annual Tuition Fees */}
                    <tr className="hover:bg-slate-800/30 bg-slate-950/40">
                      <td className="p-4 font-black text-slate-300 bg-slate-950/50 flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-emerald-400" /> Tuition Fees / Year
                      </td>
                      {selectedColleges.map((c) => (
                        <td key={c.id} className="p-4 border-l border-slate-800 text-emerald-300 font-black text-sm">
                          {c.approxFeesPerYear.split('(')[0]}
                        </td>
                      ))}
                    </tr>

                    {/* Placements - Highest Package */}
                    <tr className="hover:bg-slate-800/30">
                      <td className="p-4 font-black text-slate-300 bg-slate-950/50 flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-emerald-400" /> Highest Package
                      </td>
                      {selectedColleges.map((c) => (
                        <td key={c.id} className="p-4 border-l border-slate-800 font-black text-emerald-400 text-sm">
                          {c.placements.highestPackage}
                        </td>
                      ))}
                    </tr>

                    {/* Placements - Average Package */}
                    <tr className="hover:bg-slate-800/30">
                      <td className="p-4 font-black text-slate-300 bg-slate-950/50">
                        Average Package
                      </td>
                      {selectedColleges.map((c) => (
                        <td key={c.id} className="p-4 border-l border-slate-800 font-bold text-white">
                          {c.placements.averagePackage}
                        </td>
                      ))}
                    </tr>

                    {/* Top Recruiters */}
                    <tr className="hover:bg-slate-800/30">
                      <td className="p-4 font-black text-slate-300 bg-slate-950/50">
                        Key Recruiters
                      </td>
                      {selectedColleges.map((c) => (
                        <td key={c.id} className="p-4 border-l border-slate-800 text-slate-300">
                          <div className="flex flex-wrap gap-1">
                            {c.placements.topRecruiters.slice(0, 4).map((r, i) => (
                              <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">
                                {r}
                              </span>
                            ))}
                          </div>
                        </td>
                      ))}
                    </tr>

                    {/* Hostel Fee */}
                    <tr className="hover:bg-slate-800/30">
                      <td className="p-4 font-black text-slate-300 bg-slate-950/50">
                        Hostel & Mess
                      </td>
                      {selectedColleges.map((c) => (
                        <td key={c.id} className="p-4 border-l border-slate-800 text-slate-300">
                          {c.hostelFees || '₹65,000 – ₹85,000 / yr'}
                        </td>
                      ))}
                    </tr>

                    {/* Official Website */}
                    <tr className="hover:bg-slate-800/30">
                      <td className="p-4 font-black text-slate-300 bg-slate-950/50">
                        Official Portal
                      </td>
                      {selectedColleges.map((c) => (
                        <td key={c.id} className="p-4 border-l border-slate-800">
                          <a
                            href={c.officialWebsite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-bold text-xs"
                          >
                            <span>Website</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>
                      ))}
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="bg-slate-900/90 p-5 rounded-3xl border-2 border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-black text-white">Need Expert Advice on Choice Order?</h4>
                <p className="text-xs text-slate-400">Our counsellors will evaluate your 12th cutoff against these specific colleges.</p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={handleSaveComparison}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs transition-colors border border-slate-700"
                >
                  Save Comparison Set
                </button>
                <button
                  onClick={onOpenBooking}
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs transition-colors shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                  <span>Get Personalised Counselling</span>
                </button>
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
