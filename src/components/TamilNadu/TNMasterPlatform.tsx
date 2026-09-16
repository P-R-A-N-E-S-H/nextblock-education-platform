import React, { useState, useMemo } from 'react';
import { 
  Search, 
  GraduationCap, 
  MapPin, 
  Scale, 
  X, 
  SlidersHorizontal,
  ArrowRight, 
  CheckCircle2,
  Sparkles,
  Building2,
  BookOpen,
  Compass
} from 'lucide-react';
import { allTNCollegesData, TNCollege } from '../../data/indexTNColleges';
import { TNFeaturedColleges } from './TNFeaturedColleges';
import { TNPlacementSalaryArena } from './TNPlacementSalaryArena';
import { DistrictExplorer } from './DistrictExplorer';
import { TNCollegeFinder } from './TNCollegeFinder';
import { TNCollegeDetailModal } from './TNCollegeDetailModal';
import { TNCollegeComparisonModal } from './TNCollegeComparisonModal';

interface TNMasterPlatformProps {
  onOpenBooking: () => void;
}

export const TNMasterPlatform: React.FC<TNMasterPlatformProps> = ({ onOpenBooking }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [selectedExam, setSelectedExam] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  // Modals & Comparison State
  const [selectedCollege, setSelectedCollege] = useState<TNCollege | null>(null);
  const [comparisonColleges, setComparisonColleges] = useState<TNCollege[]>([]);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  const branches = [
    'All',
    'CSE',
    'AI & ML',
    'AI & Data Science',
    'Information Technology',
    'Cyber Security',
    'Data Science',
    'ECE',
    'EEE',
    'EIE',
    'VLSI',
    'Mechanical',
    'Civil',
    'Chemical',
    'Automobile',
    'Aerospace',
    'Aeronautical',
    'Mechatronics',
    'Robotics & Automation',
    'Biomedical',
    'Biotechnology',
    'Agricultural Engineering',
    'Food Technology',
    'Textile Technology',
    'Industrial Engineering'
  ];

  const exams = [
    'All',
    'TNEA',
    'AEEE',
    'VITEEE',
    'SRMJEEE',
    'JEE Main',
    'KEE',
    'SAEEE'
  ];

  const types = [
    'All',
    'Government / University Campus',
    'Government Aided Autonomous',
    'Deemed-to-be University',
    'Self-Financing Autonomous',
    'Affiliated Engineering College'
  ];

  const handleToggleCompare = (college: TNCollege) => {
    const exists = comparisonColleges.some((c) => c.id === college.id);
    if (exists) {
      setComparisonColleges(comparisonColleges.filter((c) => c.id !== college.id));
    } else {
      if (comparisonColleges.length >= 4) {
        alert('You can compare up to 4 Tamil Nadu colleges at a time.');
        return;
      }
      setComparisonColleges([...comparisonColleges, college]);
    }
  };

  const handleRemoveCompare = (id: string) => {
    setComparisonColleges(comparisonColleges.filter((c) => c.id !== id));
  };

  // Filtered dataset
  const filteredColleges = useMemo(() => {
    return allTNCollegesData.filter((c) => {
      // Search query
      const matchesSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.tneaCode && c.tneaCode.includes(searchQuery)) ||
        c.popularBranches.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      // District filter
      if (selectedDistrict !== 'All' && c.district.toLowerCase() !== selectedDistrict.toLowerCase()) {
        return false;
      }

      // Branch filter
      if (selectedBranch !== 'All' && !c.allBranches.some((b) => b.toLowerCase().includes(selectedBranch.toLowerCase()))) {
        return false;
      }

      // Exam filter
      if (selectedExam !== 'All' && !c.entranceExams.includes(selectedExam)) {
        return false;
      }

      // Type filter
      if (selectedType !== 'All' && c.institutionType !== selectedType) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedDistrict, selectedBranch, selectedExam, selectedType]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedDistrict('All');
    setSelectedBranch('All');
    setSelectedExam('All');
    setSelectedType('All');
  };

  const hasActiveFilters = searchQuery !== '' || selectedDistrict !== 'All' || selectedBranch !== 'All' || selectedExam !== 'All' || selectedType !== 'All';

  return (
    <section id="tn-colleges" className="py-24 bg-white relative overflow-hidden border-b border-slate-200">
      
      {/* Background Dots */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-black uppercase tracking-wider mb-4">
            <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
            <span>Tamil Nadu Engineering & Tech Directory</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-950 tracking-tight leading-tight mb-5">
            YOUR TAMIL NADU <br />
            <span className="text-gradient">COLLEGE DISCOVERY HUB.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
            Explore 150+ verified Government, Aided, Autonomous, and Deemed Engineering Colleges across all 38 districts of Tamil Nadu with live TNEA cutoff analytics, authentic campus photos, and salary leaderboards.
          </p>
        </div>

        {/* 1. FEATURED BENCHMARK INSTITUTIONS */}
        <TNFeaturedColleges
          onSelectCollege={setSelectedCollege}
          onToggleCompare={handleToggleCompare}
          comparedIds={comparisonColleges.map((c) => c.id)}
        />

        {/* 2. TOP SALARY & PLACEMENT LEADERBOARD ARENA */}
        <TNPlacementSalaryArena
          onSelectCollege={setSelectedCollege}
          onToggleCompare={handleToggleCompare}
          comparedIds={comparisonColleges.map((c) => c.id)}
          onOpenBooking={onOpenBooking}
        />

        {/* 3. TNEA CUTOFF SMART SIMULATOR */}
        <TNCollegeFinder
          onSelectCollege={setSelectedCollege}
          onOpenBooking={onOpenBooking}
        />

        {/* 4. 38 DISTRICTS EXPLORER */}
        <DistrictExplorer
          selectedDistrict={selectedDistrict}
          onSelectDistrict={(dist) => {
            setSelectedDistrict(dist);
            // scroll down to search directory
            const el = document.getElementById('search-directory');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 5. MASTER SEARCH & FILTER DIRECTORY */}
        <div id="search-directory" className="pt-10 mb-16">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-950">
                MASTER COLLEGE DIRECTORY
              </h3>
              <p className="text-xs text-slate-600 font-semibold mt-0.5">
                Filter by Branch, District, TNEA Cutoff & Accreditation
              </p>
            </div>

            <div className="flex items-center gap-3">
              {comparisonColleges.length > 0 && (
                <button
                  onClick={() => setIsComparisonOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black shadow-md shadow-blue-500/25 flex items-center gap-2"
                >
                  <Scale className="w-4 h-4" />
                  <span>Compare Selected ({comparisonColleges.length})</span>
                </button>
              )}
            </div>
          </div>

          {/* Search and Filters Bar */}
          <div className="bg-slate-50 rounded-3xl p-6 border-2 border-slate-200 shadow-sm mb-8">
            
            {/* Search Input */}
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by college name, short code (PSG, SSN, CIT, KCT), TNEA code, district, or branch..."
                className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white border-2 border-slate-300 text-xs font-bold text-slate-950 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Dropdown Filters Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              
              {/* Branch Filter */}
              <div>
                <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1.5 block">
                  Engineering Branch
                </label>
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white border-2 border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  {branches.map((b) => (
                    <option key={b} value={b}>{b === 'All' ? 'All Engineering Branches' : b}</option>
                  ))}
                </select>
              </div>

              {/* Entrance Exam Filter */}
              <div>
                <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1.5 block">
                  Admission Exam
                </label>
                <select
                  value={selectedExam}
                  onChange={(e) => setSelectedExam(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white border-2 border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  {exams.map((ex) => (
                    <option key={ex} value={ex}>{ex === 'All' ? 'All Entrance Routes' : ex}</option>
                  ))}
                </select>
              </div>

              {/* Institution Type Filter */}
              <div>
                <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1.5 block">
                  Institution Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white border-2 border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  {types.map((t) => (
                    <option key={t} value={t}>{t === 'All' ? 'All Institution Types' : t}</option>
                  ))}
                </select>
              </div>

              {/* District Quick Select */}
              <div>
                <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1.5 block">
                  District
                </label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white border-2 border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="All">All 38 Districts</option>
                  <option value="Coimbatore">Coimbatore</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Chengalpattu">Chengalpattu</option>
                  <option value="Kancheepuram">Kancheepuram</option>
                  <option value="Madurai">Madurai</option>
                  <option value="Salem">Salem</option>
                  <option value="Erode">Erode</option>
                  <option value="Thanjavur">Thanjavur</option>
                  <option value="Vellore">Vellore</option>
                  <option value="Namakkal">Namakkal</option>
                  <option value="Karur">Karur</option>
                  <option value="Sivaganga">Sivaganga</option>
                  <option value="Thoothukudi">Thoothukudi</option>
                </select>
              </div>

            </div>

            {/* Active Filters Status */}
            {hasActiveFilters && (
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-200 text-xs">
                <span className="font-bold text-slate-700">
                  Found <strong className="text-blue-700 font-black">{filteredColleges.length}</strong> matching Tamil Nadu colleges
                </span>
                <button
                  onClick={resetFilters}
                  className="text-blue-700 hover:text-blue-900 font-extrabold flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" /> Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* Results Grid */}
          {filteredColleges.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 rounded-3xl border-2 border-slate-200">
              <GraduationCap className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h4 className="text-base font-black text-slate-900 mb-1">No Matching Colleges Found</h4>
              <p className="text-xs text-slate-600 mb-4 font-medium">Try clearing filters or searching for another district or college.</p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-black text-xs"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredColleges.map((college) => {
                const isCompared = comparisonColleges.some((c) => c.id === college.id);

                return (
                  <div
                    key={college.id}
                    className="bg-white rounded-3xl overflow-hidden border-2 border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-500 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Image Banner Header */}
                      <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                        <img
                          src={college.image}
                          alt={college.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                        {/* Top Badges & Compare Toggle */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                          <div className="flex items-center gap-1.5">
                            {college.tneaCode && (
                              <span className="text-[10px] font-black px-2 py-0.5 rounded bg-blue-600 text-white shadow-xs">
                                TNEA {college.tneaCode}
                              </span>
                            )}
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-950/80 text-cyan-300 border border-slate-700">
                              {college.institutionType.split(' ')[0]}
                            </span>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleCompare(college);
                            }}
                            className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold transition-all ${
                              isCompared
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'bg-slate-950/80 text-slate-200 hover:bg-blue-600 hover:text-white border border-slate-700'
                            }`}
                          >
                            {isCompared ? '✓ Added' : '+ Compare'}
                          </button>
                        </div>

                        {/* Bottom image overlay */}
                        <div className="absolute bottom-2.5 left-3 right-3 text-white">
                          <h4 className="text-sm sm:text-base font-black text-white line-clamp-1 group-hover:text-cyan-300 transition-colors">
                            {college.name}
                          </h4>
                          <p className="text-[11px] text-cyan-300 font-bold flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-cyan-400" />
                            {college.city}, {college.district}
                          </p>
                        </div>
                      </div>

                      {/* Body Info */}
                      <div className="p-5 space-y-3">
                        {/* Metrics 2-Col */}
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                            <span className="text-slate-500 text-[10px] uppercase font-black block">TNEA Cutoff</span>
                            <span className="font-black text-blue-700 block truncate">{college.tneaCutoffGeneral || 'Check Exam'}</span>
                          </div>

                          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                            <span className="text-slate-500 text-[10px] uppercase font-black block">Highest Package</span>
                            <span className="font-black text-emerald-700 block">{college.placements.highestPackage}</span>
                          </div>
                        </div>

                        {/* Popular branches */}
                        <div>
                          <span className="text-[10px] font-black uppercase text-slate-500 block mb-1">
                            Popular Programs:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {college.popularBranches.slice(0, 3).map((b, i) => (
                              <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                                {b}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Trigger */}
                    <div className="p-5 pt-0">
                      <button
                        onClick={() => setSelectedCollege(college)}
                        className="w-full py-2.5 px-3 rounded-xl bg-slate-900 group-hover:bg-blue-600 text-white text-xs font-black transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <span>View College Profile</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 6. FINAL POSITIONING BANNER */}
        <div className="mt-16 bg-slate-950 text-white rounded-3xl p-8 sm:p-12 text-center border-2 border-slate-800 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="text-xs uppercase font-black text-cyan-400 tracking-widest block mb-2">
              NEXTBLOCK — BUILD YOUR FUTURE. ONE BLOCK AT A TIME.
            </span>

            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-3">
              YOUR COLLEGE. <br />
              <span className="text-cyan-400">YOUR COURSE. </span>
              <span className="text-gradient-cyan">YOUR NEXT BLOCK.</span>
            </h3>
            
            <p className="text-sm sm:text-base text-slate-200 mb-8 font-normal">
              Explore. Compare. Shortlist. Apply. <br />
              Personalized TNEA choice filling & college counselling by senior admission strategists.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  window.scrollTo({ top: document.getElementById('search-directory')?.offsetTop || 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-black text-xs shadow-lg transition-all"
              >
                Start Exploring Colleges →
              </button>

              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs shadow-lg shadow-blue-500/30 transition-all"
              >
                Book Free TNEA Counselling →
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Sticky Floating Comparison Bar */}
      {comparisonColleges.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 backdrop-blur-md text-white rounded-2xl p-3 sm:px-6 sm:py-3.5 border-2 border-slate-700 shadow-2xl flex items-center gap-4 max-w-xl w-[92%] sm:w-auto justify-between animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center gap-3">
            <Scale className="w-5 h-5 text-cyan-400 shrink-0" />
            <div>
              <span className="text-xs font-black text-white block">
                {comparisonColleges.length} Colleges Selected for Compare
              </span>
              <span className="text-[10px] text-slate-300 hidden sm:inline truncate max-w-xs font-medium">
                {comparisonColleges.map((c) => c.shortName).join(' vs ')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsComparisonOpen(true)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black shadow-md shadow-blue-500/25"
            >
              Compare ({comparisonColleges.length})
            </button>
            <button
              onClick={() => setComparisonColleges([])}
              className="p-2 text-slate-400 hover:text-white"
              title="Clear comparison"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* College Profile Detail Modal */}
      <TNCollegeDetailModal
        college={selectedCollege}
        onClose={() => setSelectedCollege(null)}
        isCompared={selectedCollege ? comparisonColleges.some((c) => c.id === selectedCollege.id) : false}
        onToggleCompare={handleToggleCompare}
        onOpenBooking={onOpenBooking}
      />

      {/* Side-by-Side Comparison Matrix Modal */}
      <TNCollegeComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        colleges={comparisonColleges}
        onRemove={handleRemoveCompare}
        onOpenBooking={() => {
          setIsComparisonOpen(false);
          onOpenBooking();
        }}
        onSelectCollege={(c) => {
          setIsComparisonOpen(false);
          setSelectedCollege(c);
        }}
      />
    </section>
  );
};
