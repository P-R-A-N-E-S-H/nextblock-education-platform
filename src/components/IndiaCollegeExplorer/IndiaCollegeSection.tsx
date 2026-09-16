import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  GraduationCap, 
  MapPin, 
  Award, 
  Building2, 
  DollarSign, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  X, 
  SlidersHorizontal,
  Scale
} from 'lucide-react';
import { indiaCollegesData, College } from '../../data/indiaColleges';
import { FeaturedInstitutions } from './FeaturedInstitutions';
import { TamilNaduHub } from './TamilNaduHub';
import { SmartCollegeMatcher } from './SmartCollegeMatcher';
import { CollegeDetailModal } from './CollegeDetailModal';
import { CollegeComparisonModal } from './CollegeComparisonModal';

interface IndiaCollegeSectionProps {
  onOpenBooking: () => void;
}

export const IndiaCollegeSection: React.FC<IndiaCollegeSectionProps> = ({ onOpenBooking }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [selectedExam, setSelectedExam] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedState, setSelectedState] = useState('All');

  // Modals & Comparison State
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [comparisonColleges, setComparisonColleges] = useState<College[]>([]);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  const branches = [
    'All',
    'Computer Science Engineering',
    'AI & Machine Learning',
    'Artificial Intelligence & Data Science',
    'Information Technology',
    'Cyber Security',
    'Computer Science & Business Systems',
    'Electronics & Communication Engineering',
    'Electrical & Electronics Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Aerospace Engineering',
    'Biotechnology',
    'Robotics & Automation',
    'Mechatronics'
  ];

  const exams = [
    'All',
    'TNEA',
    'JEE Main',
    'JEE Advanced',
    'AEEE',
    'VITEEE',
    'BITSAT',
    'SRMJEEE',
    'MET',
    'COMEDK',
    'KCET'
  ];

  const institutionTypes = [
    'All',
    'Institute of National Importance',
    'Deemed University',
    'State University / Autonomous',
    'Reputed Affiliated College'
  ];

  const handleToggleCompare = (college: College) => {
    const exists = comparisonColleges.some((c) => c.id === college.id);
    if (exists) {
      setComparisonColleges(comparisonColleges.filter((c) => c.id !== college.id));
    } else {
      if (comparisonColleges.length >= 4) {
        alert('You can compare up to 4 colleges at a time.');
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
    return indiaCollegesData.filter((c) => {
      // Keyword search
      const matchesSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.popularBranches.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      // Branch filter
      if (selectedBranch !== 'All' && !c.allBranches.includes(selectedBranch)) {
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

      // State filter
      if (selectedState !== 'All' && c.state !== selectedState) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedBranch, selectedExam, selectedType, selectedState]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedBranch('All');
    setSelectedExam('All');
    setSelectedType('All');
    setSelectedState('All');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedBranch !== 'All' ||
    selectedExam !== 'All' ||
    selectedType !== 'All' ||
    selectedState !== 'All';

  return (
    <section id="india-colleges" className="py-24 bg-white relative overflow-hidden">
      {/* Background Dots */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <span>India Engineering College Network</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-5">
            FIND YOUR <span className="text-gradient">RIGHT COLLEGE.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
            Explore leading engineering institutions across India — from national institutes and private universities to reputed colleges across Tamil Nadu.
          </p>
        </div>

        {/* 1. FEATURED INSTITUTIONS (Amrita, VIT, SRM, BITS, MAHE) */}
        <FeaturedInstitutions
          onSelectCollege={(c) => setSelectedCollege(c)}
          onToggleCompare={handleToggleCompare}
          comparedIds={comparisonColleges.map((c) => c.id)}
        />

        {/* 2. TAMIL NADU ENGINEERING HUB (City-Based Discovery) */}
        <TamilNaduHub
          onSelectCollege={(c) => setSelectedCollege(c)}
          onToggleCompare={handleToggleCompare}
          comparedIds={comparisonColleges.map((c) => c.id)}
          onOpenBooking={onOpenBooking}
        />

        {/* 3. SMART RECOMMENDATION ENGINE (12th Cutoff Diagnostic) */}
        <div className="mb-20">
          <SmartCollegeMatcher
            onSelectCollege={(c) => setSelectedCollege(c)}
            onOpenBooking={onOpenBooking}
          />
        </div>

        {/* 4. ALL INDIA SEARCHABLE DATABASE & ADVANCED FILTERS */}
        <div className="mb-14">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                ALL INDIA COLLEGE DIRECTORY
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Filter by specialized branch, entrance exam (TNEA, JEE Main, AEEE, BITSAT), or institute type
              </p>
            </div>

            {comparisonColleges.length > 0 && (
              <button
                onClick={() => setIsComparisonOpen(true)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md flex items-center gap-2"
              >
                <Scale className="w-4 h-4" />
                <span>Compare Selected ({comparisonColleges.length}/4)</span>
              </button>
            )}
          </div>

          {/* Search & Filter Control Panel */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 mb-8 shadow-xs">
            {/* Top Search Input */}
            <div className="relative mb-5">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search college by name, city, district or course (e.g. Amrita, Coimbatore, AI, SSN, VIT)..."
                className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs"
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
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">
                  Engineering Branch
                </label>
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  {branches.map((b) => (
                    <option key={b} value={b}>{b === 'All' ? 'All Engineering Branches' : b}</option>
                  ))}
                </select>
              </div>

              {/* Entrance Exam Filter */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">
                  Admission Exam
                </label>
                <select
                  value={selectedExam}
                  onChange={(e) => setSelectedExam(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  {exams.map((ex) => (
                    <option key={ex} value={ex}>{ex === 'All' ? 'All Entrance Exams' : ex}</option>
                  ))}
                </select>
              </div>

              {/* Institution Type Filter */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">
                  Institution Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  {institutionTypes.map((t) => (
                    <option key={t} value={t}>{t === 'All' ? 'All Institution Types' : t}</option>
                  ))}
                </select>
              </div>

              {/* State Filter */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">
                  State
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="All">All States</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Delhi NCR">Delhi NCR</option>
                </select>
              </div>

            </div>

            {/* Active Filters Status */}
            {hasActiveFilters && (
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-200 text-xs">
                <span className="font-semibold text-slate-600">
                  Showing <strong className="text-blue-600">{filteredColleges.length}</strong> matching institutions
                </span>
                <button
                  onClick={resetFilters}
                  className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" /> Reset Filters
                </button>
              </div>
            )}
          </div>

          {/* Colleges Search Results Grid */}
          {filteredColleges.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200">
              <GraduationCap className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h4 className="text-base font-bold text-slate-800 mb-1">No Matching Colleges Found</h4>
              <p className="text-xs text-slate-500 mb-4">Try clearing some filters or searching with a different term.</p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredColleges.map((college) => {
                const isCompared = comparisonColleges.some((c) => c.id === college.id);

                return (
                  <div
                    key={college.id}
                    className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Category Badge & Compare */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                          {college.institutionType}
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleCompare(college);
                          }}
                          className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold transition-all ${
                            isCompared
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700'
                          }`}
                        >
                          {isCompared ? '✓ Added' : '+ Compare'}
                        </button>
                      </div>

                      <h4 className="text-base font-black text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {college.name}
                      </h4>

                      <p className="text-xs text-slate-500 font-semibold flex items-center gap-1 mt-0.5 mb-4">
                        <MapPin className="w-3.5 h-3.5 text-blue-600" />
                        {college.city}, {college.state}
                      </p>

                      {/* 2-col Metrics */}
                      <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <span className="text-slate-400 text-[10px] uppercase font-bold block">Entrance Exam</span>
                          <span className="font-bold text-slate-900 block truncate">{college.entranceExams.join(', ')}</span>
                        </div>

                        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <span className="text-slate-400 text-[10px] uppercase font-bold block">Highest Package</span>
                          <span className="font-bold text-emerald-600 block">{college.placements.highestPackage}</span>
                        </div>
                      </div>

                      {/* Branches preview */}
                      <div className="mb-4">
                        <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                          Popular Disciplines:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {college.popularBranches.slice(0, 3).map((b, i) => (
                            <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                              {b}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100">
                      <button
                        onClick={() => setSelectedCollege(college)}
                        className="w-full py-2.5 px-3 rounded-xl bg-slate-100 group-hover:bg-blue-600 text-slate-800 group-hover:text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <span>View College Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 5. FINAL SECTION CLOSING BANNER */}
        <div className="mt-16 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center border border-slate-800 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl mx-auto">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-3">
              YOUR COLLEGE. <br />
              <span className="text-cyan-400">YOUR COURSE. </span>
              <span className="text-gradient-cyan">YOUR NEXT BLOCK.</span>
            </h3>
            
            <p className="text-sm sm:text-base text-slate-300 mb-8 font-normal">
              Explore. Compare. Decide. Build your future with certified counseling and data-backed admissions roadmaps.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  window.scrollTo({ top: document.getElementById('india-colleges')?.offsetTop || 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs shadow-lg transition-all"
              >
                Start Exploring →
              </button>

              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all"
              >
                Book Free Counselling →
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Floating Sticky Comparison Bar */}
      {comparisonColleges.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 backdrop-blur-md text-white rounded-2xl p-3 sm:px-6 sm:py-3.5 border border-slate-700 shadow-2xl flex items-center gap-4 max-w-xl w-[92%] sm:w-auto justify-between animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center gap-3">
            <Scale className="w-5 h-5 text-cyan-400 shrink-0" />
            <div>
              <span className="text-xs font-black text-white block">
                {comparisonColleges.length} Colleges Selected
              </span>
              <span className="text-[10px] text-slate-400 hidden sm:inline truncate max-w-xs">
                {comparisonColleges.map((c) => c.shortName).join(' vs ')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsComparisonOpen(true)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-500/20"
            >
              Compare Now
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

      {/* Profile Detail Modal */}
      <CollegeDetailModal
        college={selectedCollege}
        onClose={() => setSelectedCollege(null)}
        isCompared={selectedCollege ? comparisonColleges.some((c) => c.id === selectedCollege.id) : false}
        onToggleCompare={handleToggleCompare}
        onOpenBooking={onOpenBooking}
      />

      {/* Side-by-Side Comparison Modal */}
      <CollegeComparisonModal
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
