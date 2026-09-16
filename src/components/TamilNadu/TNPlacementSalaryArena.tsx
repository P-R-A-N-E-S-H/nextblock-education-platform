import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  Award, 
  Briefcase, 
  DollarSign, 
  Building2, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Flame, 
  ShieldCheck, 
  Bookmark, 
  Scale, 
  Search,
  Filter,
  Layers,
  ChevronRight
} from 'lucide-react';
import { allTNCollegesData, TNCollege } from '../../data/indexTNColleges';
import { useApp } from '../../context/AppContext';

interface TNPlacementSalaryArenaProps {
  onSelectCollege: (college: TNCollege) => void;
  onToggleCompare: (college: TNCollege) => void;
  comparedIds: string[];
  onOpenBooking: () => void;
}

export const TNPlacementSalaryArena: React.FC<TNPlacementSalaryArenaProps> = ({
  onSelectCollege,
  onToggleCompare,
  comparedIds,
  onOpenBooking
}) => {
  const { savedCollegeIds, toggleSaveCollege } = useApp();

  const [activeTab, setActiveTab] = useState<'packages' | 'recruiters' | 'roi'>('packages');
  const [packageFilter, setPackageFilter] = useState<'All' | '40LPA' | 'GovtROI' | 'Autonomous'>('All');
  const [selectedCompany, setSelectedCompany] = useState<string>('All');
  const [searchRecruiter, setSearchRecruiter] = useState<string>('');

  // Top marquee recruiters in TN
  const marqueeRecruiters = [
    { name: 'All Companies', count: '150+' },
    { name: 'Amazon', count: '18 Colleges' },
    { name: 'Microsoft', count: '12 Colleges' },
    { name: 'Qualcomm', count: '10 Colleges' },
    { name: 'Zoho', count: '28 Colleges' },
    { name: 'Cisco', count: '14 Colleges' },
    { name: 'Bosch', count: '16 Colleges' },
    { name: 'Google', count: '8 Colleges' },
    { name: 'PayPal', count: '9 Colleges' },
    { name: 'DE Shaw', count: '6 Colleges' },
    { name: 'L&T', count: '22 Colleges' },
    { name: 'TCS Digital', count: '30+ Colleges' }
  ];

  // Colleges sorted by highest package numeric value
  const parseHighestCTC = (val: string): number => {
    if (val.includes('Crore') || val.includes('Cr')) {
      const match = val.match(/([0-9.]+)/);
      return match ? parseFloat(match[1]) * 100 : 100;
    }
    const match = val.match(/([0-9.]+)/);
    return match ? parseFloat(match[1]) : 0;
  };

  const topPlacementColleges = useMemo(() => {
    return [...allTNCollegesData].sort((a, b) => {
      return parseHighestCTC(b.placements.highestPackage) - parseHighestCTC(a.placements.highestPackage);
    });
  }, []);

  // Filtered colleges by package tab
  const filteredPackageColleges = useMemo(() => {
    if (packageFilter === '40LPA') {
      return topPlacementColleges.filter((c) => parseHighestCTC(c.placements.highestPackage) >= 40);
    }
    if (packageFilter === 'GovtROI') {
      return topPlacementColleges.filter(
        (c) => c.institutionType.includes('Government') || c.institutionType.includes('Aided')
      );
    }
    if (packageFilter === 'Autonomous') {
      return topPlacementColleges.filter((c) => c.institutionType.includes('Self-Financing Autonomous'));
    }
    return topPlacementColleges.slice(0, 9); // top 9 overall
  }, [topPlacementColleges, packageFilter]);

  // Filtered by company recruiter
  const filteredByRecruiter = useMemo(() => {
    return topPlacementColleges.filter((c) => {
      const matchesSearch = searchRecruiter === '' || 
        c.placements.topRecruiters.some(r => r.toLowerCase().includes(searchRecruiter.toLowerCase())) ||
        c.name.toLowerCase().includes(searchRecruiter.toLowerCase());

      if (!matchesSearch) return false;

      if (selectedCompany !== 'All' && selectedCompany !== 'All Companies') {
        const cleanName = selectedCompany.toLowerCase();
        return c.placements.topRecruiters.some(r => r.toLowerCase().includes(cleanName));
      }
      return true;
    });
  }, [topPlacementColleges, selectedCompany, searchRecruiter]);

  // Calculate approximate 4-year ROI ratio
  const calculateROI = (college: TNCollege) => {
    const annualFee = college.tuitionValue || 100000;
    const fourYearCost = annualFee * 4;
    const avgPkg = parseFloat(college.placements.averagePackage.replace(/[^0-9.]/g, '')) || 5;
    const annualReturn = avgPkg * 100000;
    const roiPercentage = Math.round((annualReturn / fourYearCost) * 100);
    return { fourYearCost, avgPkg, roiPercentage };
  };

  return (
    <div id="placement-arena" className="mb-24 bg-slate-950 text-white rounded-3xl p-6 sm:p-10 border-2 border-slate-800 relative overflow-hidden shadow-2xl">
      
      {/* Background Cybernetic Glow */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.08),transparent_70%)] pointer-events-none" />

      <div className="relative z-10">
        
        {/* Arena Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-cyan-300 text-xs font-black uppercase tracking-wider mb-4">
            <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>2026 Live Placements & Career Arena</span>
          </div>

          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-3">
            TOP SALARY & <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">PLACEMENT LEADERBOARD</span>
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
            Track real CTC packages, verified super dream recruiters (Google, Microsoft, Amazon, Zoho, Qualcomm), and 4-year tuition ROI benchmarks across all premier Tamil Nadu engineering colleges.
          </p>

          {/* Quick Stats Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800 text-center">
            <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Highest Package</span>
              <span className="text-base sm:text-lg font-black text-emerald-400">₹1.17 Crore</span>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Top Average CTC</span>
              <span className="text-base sm:text-lg font-black text-cyan-400">₹10.5 LPA</span>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Verified Recruiters</span>
              <span className="text-base sm:text-lg font-black text-blue-400">500+ Tech Giants</span>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Super Dream Tiers</span>
              <span className="text-base sm:text-lg font-black text-amber-400">₹15 – ₹60+ LPA</span>
            </div>
          </div>
        </div>

        {/* 3 Arena Mode Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <button
            onClick={() => setActiveTab('packages')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 ${
              activeTab === 'packages'
                ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30 scale-105 border border-blue-400/50'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-cyan-300" />
            <span>Highest Packages Arena</span>
          </button>

          <button
            onClick={() => setActiveTab('recruiters')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 ${
              activeTab === 'recruiters'
                ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30 scale-105 border border-blue-400/50'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
            }`}
          >
            <Briefcase className="w-4 h-4 text-emerald-300" />
            <span>Dream Recruiter Matcher</span>
          </button>

          <button
            onClick={() => setActiveTab('roi')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 ${
              activeTab === 'roi'
                ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30 scale-105 border border-blue-400/50'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-300" />
            <span>Tuition vs Salary ROI</span>
          </button>
        </div>

        {/* ==================================================================== */}
        {/* TAB 1: HIGHEST PACKAGES ARENA */}
        {/* ==================================================================== */}
        {activeTab === 'packages' && (
          <div>
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
              {[
                { label: '🌟 Top 10 High Packages', value: 'All' },
                { label: '💎 ₹40 LPA+ Elite Clubs', value: '40LPA' },
                { label: '🏛️ Govt Premier High-ROI', value: 'GovtROI' },
                { label: '⚡ Top Autonomous Leaders', value: 'Autonomous' }
              ].map((f) => (
                <button
                  key={f.value}
                  onClick={() => setPackageFilter(f.value as any)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    packageFilter === f.value
                      ? 'bg-cyan-500 text-slate-950 font-black shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Placement Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPackageColleges.map((college, idx) => {
                const isCompared = comparedIds.includes(college.id);
                const isSaved = savedCollegeIds.includes(college.id);

                return (
                  <div
                    key={college.id}
                    className="bg-slate-900/90 rounded-3xl overflow-hidden border-2 border-slate-800 hover:border-cyan-400/80 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-xl relative"
                  >
                    {/* Rank Badge */}
                    <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5">
                      <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center shadow-lg border border-blue-400/40">
                        #{idx + 1}
                      </span>
                      {college.tneaCode && (
                        <span className="text-[10px] font-black px-2 py-0.5 rounded bg-slate-950/80 text-cyan-300 border border-slate-700">
                          TNEA {college.tneaCode}
                        </span>
                      )}
                    </div>

                    {/* Top Action Buttons */}
                    <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSaveCollege(college.id);
                        }}
                        className={`p-2 rounded-xl backdrop-blur-md transition-all ${
                          isSaved
                            ? 'bg-amber-500 text-slate-950 shadow-md'
                            : 'bg-slate-950/70 text-slate-300 hover:bg-slate-900 border border-slate-700'
                        }`}
                        title={isSaved ? 'Remove from Shortlist' : 'Save to Shortlist'}
                      >
                        <Bookmark className="w-3.5 h-3.5" fill={isSaved ? 'currentColor' : 'none'} />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleCompare(college);
                        }}
                        className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all backdrop-blur-md ${
                          isCompared
                            ? 'bg-emerald-500 text-white shadow-md'
                            : 'bg-slate-950/70 text-slate-200 hover:bg-blue-600 hover:text-white border border-slate-700'
                        }`}
                      >
                        {isCompared ? '✓ Added' : '+ Compare'}
                      </button>
                    </div>

                    <div>
                      {/* Image Banner */}
                      <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                        <img
                          src={college.image}
                          alt={college.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                        <div className="absolute bottom-2.5 left-3 right-3 text-white">
                          <h4 className="text-sm sm:text-base font-black text-white line-clamp-1 group-hover:text-cyan-300 transition-colors">
                            {college.name}
                          </h4>
                          <p className="text-[11px] text-cyan-300 font-semibold flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-cyan-400" />
                            {college.city}, {college.district}
                          </p>
                        </div>
                      </div>

                      {/* Package Metrics Display */}
                      <div className="p-5 space-y-3.5">
                        
                        {/* Big Salary Callout Box */}
                        <div className="bg-gradient-to-r from-emerald-950/40 to-slate-950 p-3.5 rounded-2xl border border-emerald-500/30 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-emerald-400 uppercase font-black tracking-wider flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-amber-400" /> Highest Package
                            </span>
                            <span className="text-xl sm:text-2xl font-black text-white block mt-0.5">
                              {college.placements.highestPackage}
                            </span>
                          </div>

                          <div className="text-right">
                            <span className="text-[10px] text-cyan-400 uppercase font-bold block">Average CTC</span>
                            <span className="text-sm sm:text-base font-black text-cyan-300">
                              {college.placements.averagePackage}
                            </span>
                          </div>
                        </div>

                        {/* Top Recruiters Tags */}
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">
                            Marquee Recruiters on Campus:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {college.placements.topRecruiters.map((recruiter, rIdx) => (
                              <span
                                key={rIdx}
                                className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-200 text-[11px] font-bold border border-slate-700"
                              >
                                {recruiter}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Cutoff & Placement Percentage */}
                        <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800">
                          <div>
                            <span className="text-slate-400 text-[10px] uppercase font-bold block">TNEA Cutoff</span>
                            <span className="font-bold text-blue-400 truncate block">
                              {college.tneaCutoffGeneral || 'Check Exam'}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-400 text-[10px] uppercase font-bold block">Placement Rate</span>
                            <span className="font-bold text-emerald-400">
                              {college.placements.placementPercentage}
                            </span>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="p-5 pt-0">
                      <button
                        onClick={() => onSelectCollege(college)}
                        className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white text-xs font-black transition-all flex items-center justify-center gap-2 group-hover:shadow-md"
                      >
                        <span>View Verified Placement Data</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 2: DREAM RECRUITER MATCHER */}
        {/* ==================================================================== */}
        {activeTab === 'recruiters' && (
          <div>
            {/* Company Chips Bar */}
            <div className="mb-6">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block text-center mb-3">
                Select a Dream Employer to View Visiting Tamil Nadu Colleges:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {marqueeRecruiters.map((m) => (
                  <button
                    key={m.name}
                    onClick={() => setSelectedCompany(m.name)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      selectedCompany === m.name
                        ? 'bg-blue-600 text-white font-black shadow-lg shadow-blue-500/25 scale-105 border border-blue-400'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                    }`}
                  >
                    <span>{m.name}</span>
                    <span className="text-[10px] opacity-75 font-normal">({m.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recruiter search bar */}
            <div className="max-w-md mx-auto mb-8 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchRecruiter}
                onChange={(e) => setSearchRecruiter(e.target.value)}
                placeholder="Search any specific company (e.g. Cisco, Zoho, Morgan Stanley)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Matched Colleges List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredByRecruiter.slice(0, 9).map((college) => {
                return (
                  <div
                    key={college.id}
                    className="bg-slate-900/90 rounded-3xl p-5 border-2 border-slate-800 hover:border-emerald-500/80 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <span className="text-[10px] font-black uppercase text-cyan-400">
                            {college.institutionType.split(' ')[0]} • {college.city}
                          </span>
                          <h4 className="text-base font-black text-white group-hover:text-cyan-300 transition-colors mt-0.5">
                            {college.name}
                          </h4>
                        </div>
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-black border border-emerald-500/30 whitespace-nowrap">
                          {college.placements.highestPackage}
                        </span>
                      </div>

                      {/* Visited Recruiters list */}
                      <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800/80 mb-4">
                        <span className="text-[10px] text-slate-400 uppercase font-black block mb-1.5">
                          Active Recruiter Pool:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {college.placements.topRecruiters.map((r, i) => (
                            <span
                              key={i}
                              className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                                selectedCompany !== 'All' && selectedCompany !== 'All Companies' && r.toLowerCase().includes(selectedCompany.toLowerCase())
                                  ? 'bg-emerald-500 text-slate-950 font-black shadow-sm'
                                  : 'bg-slate-800 text-slate-300'
                              }`}
                            >
                              {r}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectCollege(college)}
                      className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white text-xs font-black transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Explore Recruiter Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 3: TUITION VS SALARY ROI */}
        {/* ==================================================================== */}
        {activeTab === 'roi' && (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto mb-4">
              <span className="text-xs text-amber-300 font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 inline-block">
                ⚡ 4-Year Tuition Cost vs Average Starting Salary
              </span>
              <p className="text-xs text-slate-400 mt-2">
                Evaluate how fast your educational investment converts into high starting salary returns.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topPlacementColleges.slice(0, 9).map((college) => {
                const { fourYearCost, avgPkg, roiPercentage } = calculateROI(college);

                return (
                  <div
                    key={college.id}
                    className="bg-slate-900/90 rounded-3xl p-6 border-2 border-slate-800 hover:border-amber-400/80 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <h4 className="text-base font-black text-white line-clamp-1">
                          {college.shortName || college.name}
                        </h4>
                        <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 text-xs font-black border border-amber-500/30">
                          {roiPercentage}% ROI
                        </span>
                      </div>

                      <div className="space-y-2.5 mb-4 text-xs">
                        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                          <span className="text-slate-400">Approx 4-Yr Tuition:</span>
                          <span className="font-bold text-slate-200">
                            ₹{(fourYearCost / 100000).toFixed(2)} Lakhs
                          </span>
                        </div>

                        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                          <span className="text-slate-400">Average Starting CTC:</span>
                          <span className="font-black text-cyan-300">
                            ₹{avgPkg} LPA
                          </span>
                        </div>

                        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                          <span className="text-slate-400">Highest Salary:</span>
                          <span className="font-black text-emerald-400">
                            {college.placements.highestPackage}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectCollege(college)}
                      className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 text-xs font-black transition-all"
                    >
                      View ROI Analytics
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom Consultation Banner */}
        <div className="mt-12 bg-gradient-to-r from-blue-900/60 via-slate-900 to-cyan-950/60 p-6 sm:p-8 rounded-3xl border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <span className="text-xs text-cyan-300 font-bold uppercase tracking-wider block mb-1">
              Confused between College vs Branch for 2026 Admissions?
            </span>
            <h4 className="text-xl sm:text-2xl font-black text-white">
              Get 1-on-1 Student Guidance on TNEA Choice Filling & Cutoff Strategy
            </h4>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              Connect directly with verified engineering alumni and career advisors to maximize your placement opportunities.
            </p>
          </div>

          <button
            onClick={onOpenBooking}
            className="px-6 py-3 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-cyan-400/20 whitespace-nowrap transition-all hover:scale-105"
          >
            Book Free Student Session →
          </button>
        </div>

      </div>

    </div>
  );
};
