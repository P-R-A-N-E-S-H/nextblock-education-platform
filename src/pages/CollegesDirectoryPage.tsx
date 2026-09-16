import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  GraduationCap, 
  Award, 
  Briefcase, 
  Building2, 
  ShieldCheck, 
  Bookmark, 
  Scale, 
  ArrowRight, 
  SlidersHorizontal, 
  X, 
  CheckCircle2, 
  Grid3X3, 
  List, 
  ExternalLink,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TNCollege, TN_DISTRICTS } from '../data/tamilNaduColleges';

interface CollegesDirectoryPageProps {
  onOpenBooking?: () => void;
}

const POPULAR_BRANCHES = [
  'All Branches',
  'CSE',
  'AI & DS',
  'AI & ML',
  'Information Technology',
  'ECE',
  'EEE',
  'Mechanical',
  'Robotics & Automation',
  'Mechatronics',
  'Bio-Medical',
  'Biotechnology',
  'Civil'
];

const FEE_RANGES = [
  { label: 'All Fee Ranges', min: 0, max: Infinity },
  { label: 'Below ₹1 Lakh / yr', min: 0, max: 100000 },
  { label: '₹1L – ₹2L / yr', min: 100000, max: 200000 },
  { label: '₹2L – ₹3L / yr', min: 200000, max: 300000 },
  { label: '₹3L – ₹5L / yr', min: 300000, max: 500000 },
  { label: '₹5L+ / yr (Deemed)', min: 500000, max: Infinity }
];

const COLLEGE_TYPES = [
  'All Types',
  'Government / University Campus',
  'Government Aided Autonomous',
  'Self-Financing Autonomous',
  'Deemed-to-be University',
  'Affiliated Engineering College'
];

export const CollegesDirectoryPage: React.FC<CollegesDirectoryPageProps> = ({ onOpenBooking }) => {
  const { 
    colleges, 
    savedCollegeIds, 
    toggleSaveCollege, 
    comparisonCollegeIds, 
    toggleComparison, 
    viewCollegeDetail 
  } = useApp();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');
  const [selectedBranch, setSelectedBranch] = useState('All Branches');
  const [selectedFeeIndex, setSelectedFeeIndex] = useState(0);
  const [selectedType, setSelectedType] = useState('All Types');
  const [sortBy, setSortBy] = useState<'cutoff' | 'fees' | 'placements' | 'name'>('cutoff');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filtered & Sorted Colleges
  const filteredColleges = useMemo(() => {
    return colleges.filter((college) => {
      // 1. Search Query Match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = college.name.toLowerCase().includes(q) || college.shortName.toLowerCase().includes(q);
        const matchesCity = college.city.toLowerCase().includes(q) || college.district.toLowerCase().includes(q);
        const matchesCode = college.tneaCode?.toLowerCase().includes(q);
        const matchesBranch = college.popularBranches.some(b => b.toLowerCase().includes(q)) || 
                              college.allBranches.some(b => b.toLowerCase().includes(q));
        if (!matchesName && !matchesCity && !matchesCode && !matchesBranch) {
          return false;
        }
      }

      // 2. District Filter
      if (selectedDistrict !== 'All Districts') {
        if (college.district.toLowerCase() !== selectedDistrict.toLowerCase()) {
          return false;
        }
      }

      // 3. Branch Filter
      if (selectedBranch !== 'All Branches') {
        const hasBranch = college.popularBranches.some(b => b.toLowerCase().includes(selectedBranch.toLowerCase())) ||
                          college.allBranches.some(b => b.toLowerCase().includes(selectedBranch.toLowerCase()));
        if (!hasBranch) {
          return false;
        }
      }

      // 4. Fee Filter
      const feeRange = FEE_RANGES[selectedFeeIndex];
      if (feeRange.min > 0 || feeRange.max < Infinity) {
        if (college.tuitionValue < feeRange.min || college.tuitionValue > feeRange.max) {
          return false;
        }
      }

      // 5. College Type Filter
      if (selectedType !== 'All Types') {
        if (college.institutionType !== selectedType) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'cutoff') {
        const getCutoffVal = (c: TNCollege) => {
          if (!c.tneaCutoffGeneral) return 0;
          const match = c.tneaCutoffGeneral.match(/(\d+\.?\d*)/);
          return match ? parseFloat(match[1]) : 0;
        };
        return getCutoffVal(b) - getCutoffVal(a);
      } else if (sortBy === 'fees') {
        return a.tuitionValue - b.tuitionValue;
      } else if (sortBy === 'placements') {
        const getPkg = (c: TNCollege) => {
          const match = c.placements.highestPackage.match(/(\d+\.?\d*)/);
          return match ? parseFloat(match[1]) : 0;
        };
        return getPkg(b) - getPkg(a);
      } else {
        return a.name.localeCompare(b.name);
      }
    });
  }, [colleges, searchQuery, selectedDistrict, selectedBranch, selectedFeeIndex, selectedType, sortBy]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedDistrict('All Districts');
    setSelectedBranch('All Branches');
    setSelectedFeeIndex(0);
    setSelectedType('All Types');
  };

  const hasActiveFilters = searchQuery !== '' || selectedDistrict !== 'All Districts' || selectedBranch !== 'All Branches' || selectedFeeIndex !== 0 || selectedType !== 'All Types';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-20 pb-24">
      
      {/* Top Banner Header */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-black uppercase tracking-wider mb-3">
                <ShieldCheck className="w-4 h-4" /> Official Verified Directory
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                Tamil Nadu Engineering Colleges
              </h1>
              <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-3xl leading-relaxed">
                Explore government, autonomous, and recognized engineering institutions across Tamil Nadu. Filter by TNEA cutoff, annual fees, specialized branches, and verified placement records.
              </p>
            </div>

            {/* Quick Stats Pill */}
            <div className="flex items-center gap-3 bg-slate-900/90 border-2 border-slate-800 p-3.5 rounded-2xl shadow-xl">
              <div className="px-3 border-r border-slate-800 text-center">
                <span className="text-2xl font-black text-cyan-400">{filteredColleges.length}</span>
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Matching Colleges</span>
              </div>
              <div className="px-3 text-center">
                <span className="text-2xl font-black text-emerald-400">100%</span>
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Verified Data</span>
              </div>
            </div>
          </div>

          {/* Search Bar Container */}
          <div className="mt-8 relative">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-cyan-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search college name, short code, branch (CSE, AI/ML), city (Coimbatore, Chennai) or TNEA code (e.g. 0001, 2006)..."
                className="w-full pl-12 pr-10 py-4 rounded-2xl bg-slate-900 border-2 border-slate-800 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-sm sm:text-base font-medium transition-all shadow-xl"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-slate-400 hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Example Queries Suggestion */}
            <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-slate-400">
              <span className="font-semibold text-slate-400">Quick Searches:</span>
              {[
                'CEG Anna Univ',
                'PSG Tech',
                'SSN Chennai',
                'CIT Coimbatore',
                'TNEA Code 2006',
                'CSE Coimbatore',
                'AI & DS Chennai'
              ].map((term) => (
                <button
                  key={term}
                  onClick={() => setSearchQuery(term)}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 transition-colors text-[11px] font-medium"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Top Control Bar: Active Filters summary, Sorting & View Toggle */}
        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4 mb-6">
          
          {/* Left: Mobile Filter Button & Results Count */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold flex items-center gap-2 shadow-md"
            >
              <Filter className="w-4 h-4" />
              <span>Filters {hasActiveFilters && '• Active'}</span>
            </button>

            <span className="text-xs font-bold text-slate-300">
              Showing <strong className="text-white">{filteredColleges.length}</strong> institutions
            </span>

            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="hidden sm:inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-bold ml-2 underline underline-offset-4"
              >
                Clear all filters
              </button>
            )}
          </div>

          {/* Right: Sorting & View Mode */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
              <span className="text-slate-400 font-semibold hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-white font-bold focus:outline-none cursor-pointer text-xs"
              >
                <option value="cutoff" className="bg-slate-900 text-white">TNEA Cutoff (High → Low)</option>
                <option value="fees" className="bg-slate-900 text-white">Tuition Fees (Low → High)</option>
                <option value="placements" className="bg-slate-900 text-white">Highest Package (LPA)</option>
                <option value="name" className="bg-slate-900 text-white">College Name (A → Z)</option>
              </select>
            </div>

            {/* View Toggle */}
            <div className="hidden sm:flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                title="Grid View"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                title="Table List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Grid: Left Filter Sidebar (Desktop) + Right College Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Desktop Filter Sidebar (3 cols) */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="bg-slate-900 p-5 rounded-3xl border-2 border-slate-800 space-y-6 sticky top-24 shadow-xl">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-cyan-400" /> Filters
                </h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-[11px] text-cyan-400 hover:text-cyan-300 font-bold"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* 1. District Filter */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-300 uppercase tracking-wider block">
                  District / Location
                </label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                >
                  <option value="All Districts">All 38 TN Districts</option>
                  <option value="Coimbatore">Coimbatore (Hub)</option>
                  <option value="Chennai">Chennai Metro</option>
                  <option value="Madurai">Madurai</option>
                  <option value="Salem">Salem</option>
                  <option value="Erode">Erode</option>
                  <option value="Tiruchirappalli">Tiruchirappalli (Trichy)</option>
                  <option value="Vellore">Vellore</option>
                  <option value="Tiruppur">Tiruppur</option>
                  <option value="Namakkal">Namakkal</option>
                  <option value="Thanjavur">Thanjavur</option>
                  <option value="Dindigul">Dindigul</option>
                  <option value="Kancheepuram">Kancheepuram</option>
                  <option value="Chengalpattu">Chengalpattu</option>
                  <option value="Tirunelveli">Tirunelveli</option>
                  <option value="Kanniyakumari">Kanniyakumari</option>
                </select>
              </div>

              {/* 2. Branch Filter */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-300 uppercase tracking-wider block">
                  Engineering Branch
                </label>
                <div className="space-y-1 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                  {POPULAR_BRANCHES.map((branch) => (
                    <button
                      key={branch}
                      onClick={() => setSelectedBranch(branch)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-between ${
                        selectedBranch === branch
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <span>{branch}</span>
                      {selectedBranch === branch && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Tuition Fee Range */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-300 uppercase tracking-wider block">
                  Annual Tuition Fee
                </label>
                <div className="space-y-1.5">
                  {FEE_RANGES.map((fee, idx) => (
                    <button
                      key={fee.label}
                      onClick={() => setSelectedFeeIndex(idx)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-between ${
                        selectedFeeIndex === idx
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <span>{fee.label}</span>
                      {selectedFeeIndex === idx && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. College Type */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-300 uppercase tracking-wider block">
                  Institution Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                >
                  {COLLEGE_TYPES.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Assistance Card */}
              <div className="bg-gradient-to-br from-blue-950 to-slate-950 p-4 rounded-2xl border border-cyan-500/30 text-xs">
                <span className="font-black text-cyan-400 block mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Need Cutoff Advice?
                </span>
                <p className="text-slate-300 text-[11px] leading-relaxed mb-3">
                  Not sure which college fits your 12th PCM cutoff? Talk to our senior TNEA advisor.
                </p>
                <button
                  onClick={onOpenBooking}
                  className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs transition-colors shadow-md"
                >
                  Book Free Counselling
                </button>
              </div>

            </div>
          </aside>

          {/* Right Main Results Area (9 cols) */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* Empty State */}
            {filteredColleges.length === 0 && (
              <div className="bg-slate-900/90 rounded-3xl p-12 text-center border-2 border-slate-800 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                  <Building2 className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-black text-white">No Colleges Found</h3>
                <p className="text-slate-400 text-sm max-w-md mx-auto">
                  We couldn't find any institutions matching your selected combination of branch, location, or budget.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black transition-colors shadow-md"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Grid View Mode */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredColleges.map((college) => {
                  const isSaved = savedCollegeIds.includes(college.id);
                  const isCompared = comparisonCollegeIds.includes(college.id);

                  return (
                    <div
                      key={college.id}
                      className="bg-slate-900 rounded-3xl border-2 border-slate-800 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1"
                    >
                      {/* Card Image Banner */}
                      <div className="relative h-44 w-full bg-slate-800 overflow-hidden">
                        <img
                          src={college.image}
                          alt={college.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md text-[10px] font-black uppercase tracking-wider text-cyan-400 border border-slate-700">
                            {college.tneaCode ? `TNEA: ${college.tneaCode}` : 'University Entrance'}
                          </span>

                          <div className="flex items-center gap-1.5">
                            {/* Save to Shortlist Button */}
                            <button
                              onClick={() => toggleSaveCollege(college.id)}
                              className={`p-2 rounded-xl backdrop-blur-md border transition-all ${
                                isSaved
                                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/30'
                                  : 'bg-slate-900/80 text-slate-300 hover:text-white border-slate-700 hover:bg-slate-800'
                              }`}
                              title={isSaved ? 'Remove from Saved' : 'Save to Shortlist'}
                              aria-label="Save college"
                            >
                              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                            </button>

                            {/* Compare Toggle Button */}
                            <button
                              onClick={() => toggleComparison(college.id)}
                              className={`p-2 rounded-xl backdrop-blur-md border transition-all ${
                                isCompared
                                  ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-500/30'
                                  : 'bg-slate-900/80 text-slate-300 hover:text-white border-slate-700 hover:bg-slate-800'
                              }`}
                              title={isCompared ? 'Remove from comparison' : 'Add to comparison'}
                              aria-label="Compare college"
                            >
                              <Scale className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Bottom Tags */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-200 bg-slate-900/80 px-2.5 py-0.5 rounded-md backdrop-blur-sm border border-slate-700">
                            <MapPin className="w-3 h-3 text-cyan-400" /> {college.city}, {college.district}
                          </span>
                          {college.nirfRank && (
                            <span className="text-[10px] font-black text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
                              {college.nirfRank}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Card Content Body */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-[10px] font-extrabold uppercase text-slate-400">
                              {college.institutionType}
                            </span>
                            <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-400 font-bold">
                              <ShieldCheck className="w-3 h-3" /> Verified
                            </span>
                          </div>

                          <h3 
                            onClick={() => viewCollegeDetail(college.id)}
                            className="text-base font-black text-white hover:text-cyan-400 transition-colors cursor-pointer line-clamp-2"
                          >
                            {college.name}
                          </h3>

                          {/* Key Highlights Metrics */}
                          <div className="grid grid-cols-2 gap-2 mt-4 text-xs bg-slate-950 p-3 rounded-2xl border border-slate-800">
                            <div>
                              <span className="text-[10px] uppercase font-bold text-slate-400 block">General Cutoff</span>
                              <span className="font-black text-cyan-400">{college.tneaCutoffGeneral || 'Entrance / Merit'}</span>
                            </div>
                            <div>
                              <span className="text-[10px] uppercase font-bold text-slate-400 block">Highest Package</span>
                              <span className="font-black text-emerald-400">{college.placements.highestPackage}</span>
                            </div>
                            <div className="col-span-2 pt-1 border-t border-slate-900 flex items-center justify-between">
                              <span className="text-[10px] uppercase font-bold text-slate-400">Annual Tuition:</span>
                              <span className="font-bold text-white text-[11px]">{college.approxFeesPerYear.split('(')[0]}</span>
                            </div>
                          </div>

                          {/* Popular Branches Tags */}
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {college.popularBranches.slice(0, 3).map((branch, i) => (
                              <span
                                key={i}
                                className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-bold"
                              >
                                {branch}
                              </span>
                            ))}
                            {college.popularBranches.length > 3 && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-800 text-slate-400 font-bold">
                                +{college.popularBranches.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Card Footer CTAs */}
                        <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2">
                          <button
                            onClick={() => viewCollegeDetail(college.id)}
                            className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20"
                          >
                            <span>View College</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => toggleComparison(college.id)}
                            className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition-colors ${
                              isCompared
                                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border-slate-700'
                            }`}
                          >
                            {isCompared ? 'Comparing' : 'Compare'}
                          </button>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Table List View Mode */}
            {viewMode === 'table' && (
              <div className="bg-slate-900 rounded-3xl border-2 border-slate-800 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 text-slate-400 uppercase font-black tracking-wider border-b border-slate-800 text-[10px]">
                      <tr>
                        <th className="p-4">College & Location</th>
                        <th className="p-4">TNEA Code</th>
                        <th className="p-4">Cutoff Range</th>
                        <th className="p-4">Tuition Fee</th>
                        <th className="p-4">Highest Package</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-medium">
                      {filteredColleges.map((college) => {
                        const isSaved = savedCollegeIds.includes(college.id);
                        const isCompared = comparisonCollegeIds.includes(college.id);

                        return (
                          <tr key={college.id} className="hover:bg-slate-800/40 transition-colors">
                            <td className="p-4 max-w-xs">
                              <button
                                onClick={() => viewCollegeDetail(college.id)}
                                className="font-black text-white hover:text-cyan-400 transition-colors text-left block"
                              >
                                {college.name}
                              </button>
                              <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                                <MapPin className="w-3 h-3 text-cyan-400" /> {college.city}, {college.district}
                              </span>
                            </td>
                            <td className="p-4 font-mono font-bold text-cyan-400">
                              {college.tneaCode || 'N/A'}
                            </td>
                            <td className="p-4 font-bold text-white">
                              {college.tneaCutoffGeneral || 'Merit / Entrance'}
                            </td>
                            <td className="p-4 text-slate-300">
                              {college.approxFeesPerYear.split('(')[0]}
                            </td>
                            <td className="p-4 font-bold text-emerald-400">
                              {college.placements.highestPackage}
                            </td>
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => viewCollegeDetail(college.id)}
                                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
                                >
                                  View
                                </button>
                                <button
                                  onClick={() => toggleComparison(college.id)}
                                  className={`p-1.5 rounded-lg border text-xs ${
                                    isCompared ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-slate-800 text-slate-300 border-slate-700'
                                  }`}
                                  title="Compare"
                                >
                                  <Scale className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => toggleSaveCollege(college.id)}
                                  className={`p-1.5 rounded-lg border text-xs ${
                                    isSaved ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                                  }`}
                                  title="Save"
                                >
                                  <Bookmark className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </main>

        </div>

      </div>

      {/* Mobile Filters Slide-over Modal */}
      {mobileFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex justify-end">
          <div className="bg-slate-900 w-full max-w-sm h-full p-6 space-y-6 overflow-y-auto border-l border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-base font-black text-white uppercase flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-cyan-400" /> Filter Colleges
              </h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* District */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-300 uppercase block">District</label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-white"
              >
                <option value="All Districts">All 38 TN Districts</option>
                <option value="Coimbatore">Coimbatore</option>
                <option value="Chennai">Chennai</option>
                <option value="Madurai">Madurai</option>
                <option value="Salem">Salem</option>
                <option value="Erode">Erode</option>
                <option value="Tiruchirappalli">Tiruchirappalli</option>
                <option value="Vellore">Vellore</option>
              </select>
            </div>

            {/* Branch */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-300 uppercase block">Branch</label>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-white"
              >
                {POPULAR_BRANCHES.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Fee */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-300 uppercase block">Tuition Fee</label>
              <select
                value={selectedFeeIndex}
                onChange={(e) => setSelectedFeeIndex(parseInt(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-white"
              >
                {FEE_RANGES.map((f, i) => (
                  <option key={f.label} value={i}>{f.label}</option>
                ))}
              </select>
            </div>

            <div className="pt-4 border-t border-slate-800 flex gap-3">
              <button
                onClick={clearAllFilters}
                className="flex-1 py-3 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-black text-xs"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
