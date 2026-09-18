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
  Sparkles,
  Stethoscope,
  Palette,
  Cpu,
  Layers,
  HeartPulse
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TNCollege, TN_DISTRICTS } from '../data/tamilNaduColleges';
import { getStreamFallbackImage } from '../utils/helpers';

interface CollegesDirectoryPageProps {
  onOpenBooking?: () => void;
}

export type StreamCategory = 'All' | 'Engineering' | 'Medical' | 'Arts & Science';

const STREAM_TABS = [
  { id: 'All', label: 'All Disciplines', icon: Layers, countLabel: '200+ Colleges' },
  { id: 'Engineering', label: 'Engineering & Tech', icon: Cpu, countLabel: 'B.E / B.Tech / M.Tech' },
  { id: 'Medical', label: 'Medical & Healthcare', icon: Stethoscope, countLabel: 'MBBS / BDS / Allied' },
  { id: 'Arts & Science', label: 'Arts, Science & Commerce', icon: Palette, countLabel: 'B.Com / B.Sc / BCA / BBA' }
];

const ENGG_BRANCHES = [
  'All Branches',
  'CSE',
  'AI & DS',
  'AI & ML',
  'Information Technology',
  'Cyber Security',
  'ECE',
  'EEE',
  'Mechanical',
  'Robotics & Automation',
  'Mechatronics',
  'Bio-Medical',
  'Biotechnology',
  'Civil',
  'Chemical',
  'Aerospace'
];

const MEDICAL_BRANCHES = [
  'All Specializations',
  'MBBS',
  'BDS (Dental)',
  'MD General Medicine',
  'MS General Surgery',
  'B.Pharm',
  'Pharm.D',
  'B.Sc Nursing',
  'BPT (Physiotherapy)',
  'Allied Health Sciences',
  'Radiology & Imaging',
  'Optometry / Dialysis'
];

const ARTS_BRANCHES = [
  'All Degrees',
  'B.Com (General / Corporate / PA)',
  'B.Sc Computer Science',
  'B.Sc Data Science / AI',
  'BCA',
  'BBA',
  'B.Sc Mathematics',
  'B.Sc Physics',
  'B.Sc Chemistry',
  'B.Sc Biotechnology',
  'B.Sc Psychology',
  'B.A Economics',
  'B.A English Literature',
  'B.Sc Visual Communication'
];

const ALL_BRANCHES = [
  'All Courses & Branches',
  'CSE / IT / AI & DS',
  'MBBS / Medical',
  'B.Com / Commerce & Finance',
  'B.Sc Computer Science / BCA',
  'BDS Dental',
  'ECE / Electronics',
  'Mechanical / Robotics',
  'B.Pharm / Pharmacy',
  'B.Sc Nursing / Allied Health',
  'BBA / Management',
  'Biotechnology / Bio-Medical',
  'Economics / Arts & Humanities'
];

const FEE_RANGES = [
  { label: 'All Fee Ranges', min: 0, max: Infinity },
  { label: 'Below ₹50,000 / yr (Govt Subsidized)', min: 0, max: 50000 },
  { label: '₹50,000 – ₹1.5 Lakh / yr', min: 50000, max: 150000 },
  { label: '₹1.5L – ₹3.0 Lakh / yr', min: 150000, max: 300000 },
  { label: '₹3L – ₹6L / yr (SF / Private)', min: 300000, max: 600000 },
  { label: '₹6L+ / yr (Deemed Medical/Engg)', min: 600000, max: Infinity }
];

const COLLEGE_TYPES = [
  'All Types',
  'Government / University Campus',
  'Government Medical College',
  'Government Arts College',
  'Government Aided Autonomous',
  'Self-Financing Autonomous',
  'Self-Financing Arts College',
  'Private Medical College',
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
  const [selectedStream, setSelectedStream] = useState<StreamCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [selectedFeeIndex, setSelectedFeeIndex] = useState(0);
  const [selectedType, setSelectedType] = useState('All Types');
  const [sortBy, setSortBy] = useState<'cutoff' | 'fees' | 'placements' | 'name'>('cutoff');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Active branches list based on stream
  const activeBranchList = useMemo(() => {
    if (selectedStream === 'Engineering') return ENGG_BRANCHES;
    if (selectedStream === 'Medical') return MEDICAL_BRANCHES;
    if (selectedStream === 'Arts & Science') return ARTS_BRANCHES;
    return ALL_BRANCHES;
  }, [selectedStream]);

  // Filtered & Sorted Colleges
  const filteredColleges = useMemo(() => {
    return colleges.filter((college) => {
      const colStream = (college.stream || '').toLowerCase();
      const colStreams = (college.streams || []).map(s => s.toLowerCase());

      // 1. Stream Selection Tab Filter
      if (selectedStream !== 'All') {
        const target = selectedStream.toLowerCase();
        const matchesStream = colStream.includes(target) || colStreams.some(s => s.includes(target));
        if (!matchesStream) {
          return false;
        }
      }

      // 2. Intelligent Search Query Matching
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();

        // Check if query is intent-based (e.g. "engineering", "medical", "arts", "science")
        const isEnggIntent = ['eng', 'engineering', 'btech', 'be', 'tnea', 'tech'].some(term => q.includes(term));
        const isMedIntent = ['med', 'medical', 'doctor', 'mbbs', 'bds', 'neet', 'pharm', 'pharmacy', 'nurs', 'nursing', 'dent', 'dental', 'hospital'].some(term => q.includes(term));
        const isArtsIntent = ['art', 'arts', 'sci', 'science', 'comm', 'commerce', 'bcom', 'bsc', 'ba', 'bba', 'bca', 'humanities', 'literature', 'economics'].some(term => q.includes(term));

        // If specific intent detected and query is short or pure category
        if (q === 'engineering' || q === 'engg' || q === 'btech' || q === 'be') {
          if (!colStream.includes('engineering') && !colStreams.some(s => s.includes('engineering'))) return false;
        } else if (q === 'medical' || q === 'mbbs' || q === 'doctor' || q === 'neet' || q === 'healthcare') {
          if (!colStream.includes('medical') && !colStreams.some(s => s.includes('medical'))) return false;
        } else if (q === 'arts' || q === 'science' || q === 'commerce' || q === 'bcom' || q === 'arts and science') {
          if (!colStream.includes('arts') && !colStream.includes('science') && !colStreams.some(s => s.includes('arts') || s.includes('science') || s.includes('commerce'))) return false;
        } else {
          // General match across fields
          const matchesName = college.name.toLowerCase().includes(q) || college.shortName.toLowerCase().includes(q);
          const matchesCity = college.city.toLowerCase().includes(q) || college.district.toLowerCase().includes(q);
          const matchesCode = college.tneaCode?.toLowerCase().includes(q);
          const matchesStreamField = colStream.includes(q) || colStreams.some(s => s.includes(q));
          const matchesCategory = college.category.toLowerCase().includes(q) || college.institutionType.toLowerCase().includes(q);
          const matchesBranch = college.popularBranches.some(b => b.toLowerCase().includes(q)) || 
                                college.allBranches.some(b => b.toLowerCase().includes(q));
          const matchesExams = college.entranceExams.some(e => e.toLowerCase().includes(q));

          if (!matchesName && !matchesCity && !matchesCode && !matchesBranch && !matchesStreamField && !matchesCategory && !matchesExams) {
            return false;
          }
        }
      }

      // 3. District Filter
      if (selectedDistrict !== 'All Districts') {
        if (college.district.toLowerCase() !== selectedDistrict.toLowerCase()) {
          return false;
        }
      }

      // 4. Branch / Course Filter
      if (selectedBranch !== 'All' && selectedBranch !== 'All Branches' && selectedBranch !== 'All Specializations' && selectedBranch !== 'All Degrees' && selectedBranch !== 'All Courses & Branches') {
        const cleanBranch = selectedBranch.split('(')[0].split('/')[0].trim().toLowerCase();
        const hasBranch = college.popularBranches.some(b => b.toLowerCase().includes(cleanBranch)) ||
                          college.allBranches.some(b => b.toLowerCase().includes(cleanBranch));
        if (!hasBranch) {
          return false;
        }
      }

      // 5. Fee Filter
      const feeRange = FEE_RANGES[selectedFeeIndex];
      if (feeRange.min > 0 || feeRange.max < Infinity) {
        if (college.tuitionValue < feeRange.min || college.tuitionValue > feeRange.max) {
          return false;
        }
      }

      // 6. College Type Filter
      if (selectedType !== 'All Types') {
        if (!college.institutionType.toLowerCase().includes(selectedType.toLowerCase())) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'cutoff') {
        // Dynamic cutoff parsing for NEET, TNEA, or Merit %
        const getCutoffVal = (c: TNCollege) => {
          if (c.stream === 'Medical' && c.neetCutoffGeneral) {
            const match = c.neetCutoffGeneral.match(/(\d+\.?\d*)/);
            return match ? parseFloat(match[1]) : 400;
          }
          if (c.stream === 'Arts & Science' && c.meritCutoffPercentage) {
            const match = c.meritCutoffPercentage.match(/(\d+\.?\d*)/);
            return match ? parseFloat(match[1]) * 2 : 180;
          }
          if (c.tneaCutoffGeneral) {
            const match = c.tneaCutoffGeneral.match(/(\d+\.?\d*)/);
            return match ? parseFloat(match[1]) : 0;
          }
          return 0;
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
  }, [colleges, selectedStream, searchQuery, selectedDistrict, selectedBranch, selectedFeeIndex, selectedType, sortBy]);

  const clearAllFilters = () => {
    setSelectedStream('All');
    setSearchQuery('');
    setSelectedDistrict('All Districts');
    setSelectedBranch('All');
    setSelectedFeeIndex(0);
    setSelectedType('All Types');
  };

  const hasActiveFilters = selectedStream !== 'All' || searchQuery !== '' || selectedDistrict !== 'All Districts' || (selectedBranch !== 'All' && selectedBranch !== 'All Branches' && selectedBranch !== 'All Specializations' && selectedBranch !== 'All Degrees') || selectedFeeIndex !== 0 || selectedType !== 'All Types';

  const getStreamBadgeColor = (stream?: string) => {
    const s = (stream || '').toLowerCase();
    if (s.includes('medical') || s.includes('health')) return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
    if (s.includes('arts') || s.includes('science') || s.includes('commerce')) return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
  };

  const getStreamIcon = (stream?: string) => {
    const s = (stream || '').toLowerCase();
    if (s.includes('medical') || s.includes('health')) return <Stethoscope className="w-3.5 h-3.5 text-rose-400" />;
    if (s.includes('arts') || s.includes('science') || s.includes('commerce')) return <Palette className="w-3.5 h-3.5 text-amber-400" />;
    return <Cpu className="w-3.5 h-3.5 text-cyan-400" />;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-20 pb-24">
      
      {/* Top Banner Header */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-black uppercase tracking-wider mb-3">
                <ShieldCheck className="w-4 h-4 text-cyan-400" /> Tamil Nadu & Environs Master Hub
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                Colleges Discovery Hub
              </h1>
              <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-3xl leading-relaxed">
                Explore 200+ verified **Engineering**, **Medical & Healthcare (NEET)**, and **Arts, Science & Commerce** institutions across all 38 districts of Tamil Nadu with real cutoffs, verified photos, and salary metrics.
              </p>
            </div>

            {/* Quick Stats Pill */}
            <div className="flex items-center gap-3 bg-slate-900/90 border-2 border-slate-800 p-3.5 rounded-2xl shadow-xl">
              <div className="px-3 border-r border-slate-800 text-center">
                <span className="text-2xl font-black text-cyan-400">{filteredColleges.length}</span>
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Matching Colleges</span>
              </div>
              <div className="px-3 text-center">
                <span className="text-2xl font-black text-emerald-400">3 Streams</span>
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Engg / Med / Arts</span>
              </div>
            </div>
          </div>

          {/* Stream Selector Tabs */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {STREAM_TABS.map((tab) => {
              const Icon = tab.icon;
              const isSelected = selectedStream === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setSelectedStream(tab.id as StreamCategory);
                    setSelectedBranch('All');
                  }}
                  className={`p-3.5 rounded-2xl border-2 text-left transition-all duration-200 flex items-center gap-3 ${
                    isSelected
                      ? 'bg-blue-600/20 border-cyan-400 text-white shadow-lg shadow-cyan-500/10'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div className={`p-2 rounded-xl ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-black block leading-tight text-white">
                      {tab.label}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400">
                      {tab.countLabel}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Search Bar Container */}
          <div className="mt-6 relative">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-cyan-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by college name, stream (Engineering, Medical, Arts), course (MBBS, B.Com, CSE), city (Coimbatore, Chennai) or code..."
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
              <span className="font-semibold text-slate-400 text-[11px]">Quick Filters:</span>
              {[
                { label: '⚙️ Engineering Colleges', query: 'Engineering' },
                { label: '🩺 Medical Colleges (NEET)', query: 'Medical' },
                { label: '🎨 Arts & Science Colleges', query: 'Arts' },
                { label: 'Loyola & PSGCAS (B.Com)', query: 'B.Com' },
                { label: 'MMC & CMC Vellore (MBBS)', query: 'MBBS' },
                { label: 'PSG Tech & CEG Anna Univ', query: 'PSG Tech' },
                { label: 'Coimbatore Hub', query: 'Coimbatore' },
                { label: 'Chennai Hub', query: 'Chennai' }
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => setSearchQuery(item.query)}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 transition-colors text-[11px] font-medium flex items-center gap-1"
                >
                  {item.label}
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
              Showing <strong className="text-white">{filteredColleges.length}</strong> {selectedStream !== 'All' ? `${selectedStream}` : ''} institutions
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
                <option value="cutoff" className="bg-slate-900 text-white">Cutoff / Merit (High → Low)</option>
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

              {/* 1. Stream Selector */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-300 uppercase tracking-wider block">
                  Discipline / Stream
                </label>
                <select
                  value={selectedStream}
                  onChange={(e) => {
                    setSelectedStream(e.target.value as StreamCategory);
                    setSelectedBranch('All');
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                >
                  <option value="All">All Disciplines (Engg, Med, Arts)</option>
                  <option value="Engineering">⚙️ Engineering & Tech</option>
                  <option value="Medical">🩺 Medical & Healthcare</option>
                  <option value="Arts & Science">🎨 Arts, Science & Commerce</option>
                </select>
              </div>

              {/* 2. District Filter */}
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
                  <option value="Thanjavur">Thanjavur</option>
                  <option value="Dindigul">Dindigul</option>
                  <option value="Kancheepuram">Kancheepuram</option>
                  <option value="Chengalpattu">Chengalpattu</option>
                  <option value="Tirunelveli">Tirunelveli</option>
                  <option value="Kanniyakumari">Kanniyakumari</option>
                  <option value="Puducherry & Environs">Puducherry & Environs</option>
                </select>
              </div>

              {/* 3. Branch / Course Filter */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-300 uppercase tracking-wider block">
                  {selectedStream === 'Medical' ? 'Specialization / Program' : selectedStream === 'Arts & Science' ? 'Degree / Major' : 'Branch / Specialization'}
                </label>
                <div className="space-y-1 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                  {activeBranchList.map((branch) => (
                    <button
                      key={branch}
                      onClick={() => setSelectedBranch(branch)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-between ${
                        selectedBranch === branch
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <span className="truncate">{branch}</span>
                      {selectedBranch === branch && <CheckCircle2 className="w-3.5 h-3.5 shrink-0 ml-1" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Tuition Fee Range */}
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
                      <span className="text-[11px]">{fee.label}</span>
                      {selectedFeeIndex === idx && <CheckCircle2 className="w-3.5 h-3.5 shrink-0 ml-1" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. College Type */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-300 uppercase tracking-wider block">
                  Institution Category
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
                  <Sparkles className="w-4 h-4" /> Need Expert Guidance?
                </span>
                <p className="text-slate-300 text-[11px] leading-relaxed mb-3">
                  Get personalized strategy on TNEA cutoff, NEET medical seat matrix, or top Arts & Commerce admissions.
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
                  We couldn't find any institutions matching your selected stream, branch, location, or budget filters.
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
                  const streamColorClass = getStreamBadgeColor(college.stream);

                  return (
                    <div
                      key={college.id}
                      className="bg-slate-900 rounded-3xl border-2 border-slate-800 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1"
                    >
                      {/* Card Image Banner */}
                      <div className="relative h-48 w-full bg-slate-800 overflow-hidden">
                        <img
                          src={college.image}
                          alt={college.name}
                          onError={(e) => {
                            e.currentTarget.src = getStreamFallbackImage(college.stream);
                          }}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border backdrop-blur-md flex items-center gap-1 ${streamColorClass}`}>
                              {getStreamIcon(college.stream)}
                              <span>{college.stream || 'Engineering'}</span>
                            </span>

                            {college.tneaCode && (
                              <span className="px-2 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md text-[10px] font-black uppercase tracking-wider text-cyan-300 border border-slate-700">
                                TNEA: {college.tneaCode}
                              </span>
                            )}
                          </div>

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
                            <span className="text-[10px] font-extrabold uppercase text-slate-400 truncate max-w-[200px]">
                              {college.institutionType}
                            </span>
                            <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-400 font-bold shrink-0">
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
                              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                                {college.stream === 'Medical' ? 'NEET UG Cutoff' : college.stream === 'Arts & Science' ? '12th Board Cutoff' : 'TNEA Cutoff'}
                              </span>
                              <span className="font-black text-cyan-400 text-xs truncate block">
                                {college.stream === 'Medical' 
                                  ? (college.neetCutoffGeneral || 'NEET Merit') 
                                  : college.stream === 'Arts & Science' 
                                  ? (college.meritCutoffPercentage || '85% – 98%') 
                                  : (college.tneaCutoffGeneral || 'Entrance / Merit')}
                              </span>
                            </div>
                            <div>
                              <span className="text-[10px] uppercase font-bold text-slate-400 block">Top Placement / Package</span>
                              <span className="font-black text-emerald-400 text-xs truncate block">{college.placements.highestPackage}</span>
                            </div>
                            <div className="col-span-2 pt-1 border-t border-slate-900 flex items-center justify-between">
                              <span className="text-[10px] uppercase font-bold text-slate-400">Annual Tuition:</span>
                              <span className="font-bold text-white text-[11px] truncate">{college.approxFeesPerYear.split('(')[0]}</span>
                            </div>
                          </div>

                          {/* Popular Branches Tags */}
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {college.popularBranches.slice(0, 3).map((branch, i) => (
                              <span
                                key={i}
                                className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-bold truncate max-w-[150px]"
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
                        <th className="p-4">Stream & College</th>
                        <th className="p-4">Code / Type</th>
                        <th className="p-4">Cutoff Score</th>
                        <th className="p-4">Tuition Fee</th>
                        <th className="p-4">Top Package</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-medium">
                      {filteredColleges.map((college) => {
                        const isSaved = savedCollegeIds.includes(college.id);
                        const isCompared = comparisonCollegeIds.includes(college.id);
                        const streamColorClass = getStreamBadgeColor(college.stream);

                        return (
                          <tr key={college.id} className="hover:bg-slate-800/40 transition-colors">
                            <td className="p-4 max-w-xs">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase border ${streamColorClass}`}>
                                  {college.stream || 'Engineering'}
                                </span>
                              </div>
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
                              {college.tneaCode ? `TNEA: ${college.tneaCode}` : college.institutionType}
                            </td>
                            <td className="p-4 font-bold text-white">
                              {college.stream === 'Medical' 
                                ? (college.neetCutoffGeneral || 'NEET Merit') 
                                : college.stream === 'Arts & Science' 
                                ? (college.meritCutoffPercentage || '85% – 98%') 
                                : (college.tneaCutoffGeneral || 'Merit / Entrance')}
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

            {/* Stream */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-300 uppercase block">Stream / Discipline</label>
              <select
                value={selectedStream}
                onChange={(e) => {
                  setSelectedStream(e.target.value as StreamCategory);
                  setSelectedBranch('All');
                }}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-white"
              >
                <option value="All">All Disciplines</option>
                <option value="Engineering">⚙️ Engineering & Tech</option>
                <option value="Medical">🩺 Medical & Healthcare</option>
                <option value="Arts & Science">🎨 Arts, Science & Commerce</option>
              </select>
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
                <option value="Thanjavur">Thanjavur</option>
                <option value="Tirunelveli">Tirunelveli</option>
                <option value="Kanniyakumari">Kanniyakumari</option>
              </select>
            </div>

            {/* Branch */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-300 uppercase block">Course / Branch</label>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-white"
              >
                {activeBranchList.map((b) => (
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
