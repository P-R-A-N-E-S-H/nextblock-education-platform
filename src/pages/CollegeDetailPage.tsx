import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Building2, 
  GraduationCap, 
  Award, 
  Briefcase, 
  ShieldCheck, 
  Bookmark, 
  Scale, 
  ExternalLink, 
  CheckCircle2, 
  Phone, 
  Mail, 
  Globe, 
  Calendar, 
  Home as HomeIcon, 
  Layers, 
  Sparkles, 
  DollarSign, 
  Share2, 
  FileCheck2, 
  BookOpen, 
  ChevronRight,
  Stethoscope,
  Palette
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TNCollege } from '../types';
import { getStreamFallbackImage } from '../utils/helpers';

interface CollegeDetailPageProps {
  onOpenBooking?: () => void;
}

export const CollegeDetailPage: React.FC<CollegeDetailPageProps> = ({ onOpenBooking }) => {
  const { 
    selectedCollegeSlug,
    colleges, 
    setCurrentPublicView, 
    savedCollegeIds, 
    toggleSaveCollege, 
    comparisonCollegeIds, 
    toggleComparison,
    addToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'branches' | 'placements' | 'admissions' | 'campus' | 'fees' | 'contact'>('overview');

  const college = useMemo(() => {
    if (!selectedCollegeSlug) {
      return colleges[0] || null;
    }
    return colleges.find((c) => c.id === selectedCollegeSlug) || colleges[0] || null;
  }, [selectedCollegeSlug, colleges]);

  if (!college) {
    return (
      <div className="min-h-screen bg-slate-950 text-white pt-24 px-4 text-center">
        <h2 className="text-2xl font-black">College Not Found</h2>
        <button
          onClick={() => setCurrentPublicView('colleges')}
          className="mt-4 px-6 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
        >
          Return to Directory
        </button>
      </div>
    );
  }

  const isSaved = savedCollegeIds.includes(college.id);
  const isCompared = comparisonCollegeIds.includes(college.id);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${college.name} - NEXTBLOCK`,
        text: `Check out cutoff, fee structure, and placements for ${college.name} on NEXTBLOCK.`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast({
        id: Date.now().toString(),
        title: 'Link Copied! 📋',
        message: 'Shareable link copied to clipboard.',
        type: 'success'
      });
    }
  };

  const isMedical = (college.stream || '').toLowerCase().includes('medical');
  const isArts = (college.stream || '').toLowerCase().includes('arts') || (college.stream || '').toLowerCase().includes('science');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { 
      id: 'branches', 
      label: isMedical ? 'Medical Courses & Degrees' : isArts ? 'Offered Degree Programs' : 'Engineering Branches', 
      icon: isMedical ? Stethoscope : isArts ? Palette : Layers 
    },
    { 
      id: 'admissions', 
      label: isMedical ? 'NEET UG & Admissions' : isArts ? 'Merit & Admissions' : 'TNEA & Admissions', 
      icon: GraduationCap 
    },
    { id: 'fees', label: 'Fees & Scholarships', icon: DollarSign },
    { id: 'placements', label: isMedical ? 'Clinical & Hospital Practice' : 'Placements', icon: Briefcase },
    { id: 'campus', label: 'Hostel & Campus', icon: HomeIcon },
    { id: 'contact', label: 'Contact & Official Links', icon: Phone }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-20 pb-24 selection:bg-blue-600 selection:text-white">
      
      {/* Top Breadcrumb & Quick Action Bar */}
      <div className="bg-slate-900/60 border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <button
              onClick={() => setCurrentPublicView('colleges')}
              className="hover:text-cyan-400 font-medium transition-colors"
            >
              Colleges Directory
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="font-semibold text-slate-400">{college.stream || 'College'}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-white font-bold truncate max-w-xs sm:max-w-md">{college.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-colors flex items-center gap-1.5 border border-slate-700"
            >
              <Share2 className="w-3.5 h-3.5" /> Share
            </button>
            <button
              onClick={() => toggleSaveCollege(college.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                isSaved
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-black'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border-slate-700'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
              {isSaved ? 'Saved to Shortlist' : 'Save College'}
            </button>
          </div>
        </div>
      </div>

      {/* Hero College Header */}
      <div className="relative bg-slate-900 border-b-2 border-slate-800 overflow-hidden">
        {/* Background Cover Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={college.image}
            alt={college.name}
            onError={(e) => {
              e.currentTarget.src = getStreamFallbackImage(college.stream);
            }}
            className="w-full h-full object-cover opacity-25 filter blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            
            {/* Left Info */}
            <div className="space-y-4 max-w-4xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-blue-600/20 text-cyan-300 text-xs font-black uppercase tracking-wider border border-blue-500/30">
                  {college.stream || 'Engineering'} • {college.institutionType}
                </span>
                {college.tneaCode && (
                  <span className="px-3 py-1 rounded-full bg-slate-900 text-cyan-400 font-mono text-xs font-black border border-cyan-500/30">
                    TNEA Counselling Code: {college.tneaCode}
                  </span>
                )}
                <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-extrabold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Profile ({college.lastUpdated || 'August 2026'})
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                {college.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300 font-medium">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-cyan-400" /> {college.city}, {college.district} ({college.zone})
                </span>
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-blue-400" /> Established {college.establishedYear}
                </span>
                {college.nirfRank && (
                  <span className="flex items-center gap-1.5 text-amber-300 font-black">
                    <Award className="w-4 h-4 text-amber-400" /> {college.nirfRank}
                  </span>
                )}
                {college.naacGrade && (
                  <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-cyan-300 font-bold border border-blue-500/30">
                    {college.naacGrade}
                  </span>
                )}
              </div>
            </div>

            {/* Right Action Block */}
            <div className="bg-slate-900/90 backdrop-blur-xl p-5 rounded-3xl border-2 border-slate-800 space-y-3 w-full lg:w-72 shadow-2xl">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Govt Regulated Annual Fee:</span>
                <p className="text-xl font-black text-white">{college.approxFeesPerYear.split('(')[0]}</p>
                <span className="text-[10px] text-cyan-400 font-bold block">First Graduate Subsidy Eligible</span>
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-2">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30"
                >
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                  <span>Get Counselling & Choice Order</span>
                </button>

                <button
                  onClick={() => toggleComparison(college.id)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-2 ${
                    isCompared
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border-slate-700'
                  }`}
                >
                  <Scale className="w-4 h-4" />
                  <span>{isCompared ? 'In Comparison Matrix' : 'Compare with Other Colleges'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className="bg-slate-900 border-b border-slate-800 sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto custom-scrollbar">
          <div className="flex items-center gap-2 py-2.5 min-w-max">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Institution Description */}
            <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border-2 border-slate-800 space-y-4">
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-cyan-400" /> About {college.shortName}
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                {college.overview}
              </p>
            </div>

            {/* Key Statistical Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-900 p-5 rounded-3xl border-2 border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  {college.stream === 'Medical' ? 'NEET UG Cutoff' : college.stream === 'Arts & Science' ? '12th Board Cutoff' : 'TNEA Cutoff'}
                </span>
                <p className="text-xl sm:text-2xl font-black text-cyan-400 mt-1 truncate">
                  {college.stream === 'Medical' 
                    ? (college.neetCutoffGeneral || 'NEET Merit') 
                    : college.stream === 'Arts & Science' 
                    ? (college.meritCutoffPercentage || '85% – 98%') 
                    : (college.tneaCutoffGeneral || 'Entrance / Merit')}
                </p>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  {college.stream === 'Medical' ? 'NEET State / Deemed Quota' : college.stream === 'Arts & Science' ? 'Merit Basis' : 'TNEA Open Category (OC)'}
                </span>
              </div>

              <div className="bg-slate-900 p-5 rounded-3xl border-2 border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Highest Package</span>
                <p className="text-2xl font-black text-emerald-400 mt-1">{college.placements.highestPackage}</p>
                <span className="text-[10px] text-slate-400 mt-1 block">Top Recruiter / Residency</span>
              </div>

              <div className="bg-slate-900 p-5 rounded-3xl border-2 border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Average Package</span>
                <p className="text-2xl font-black text-white mt-1">{college.placements.averagePackage}</p>
                <span className="text-[10px] text-slate-400 mt-1 block">Institutional Average</span>
              </div>

              <div className="bg-slate-900 p-5 rounded-3xl border-2 border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Placement Rate</span>
                <p className="text-2xl font-black text-blue-400 mt-1">{college.placements.placementPercentage}</p>
                <span className="text-[10px] text-slate-400 mt-1 block">Eligible Registered Cohort</span>
              </div>
            </div>

            {/* Accreditation & Quality Badges */}
            <div className="bg-slate-900 p-6 rounded-3xl border-2 border-slate-800 space-y-4">
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-400">
                Accreditations & Regulatory Approvals
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <div>
                    <span className="text-white block font-black">
                      {isMedical 
                        ? 'NMC & Dr. M.G.R. Medical Univ' 
                        : isArts 
                        ? 'UGC & State University' 
                        : 'AICTE & Anna University'}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {isMedical 
                        ? 'Approved Medical College & Hospital' 
                        : isArts 
                        ? 'Recognized Arts & Science Campus' 
                        : 'Approved Technical Institution'}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <div>
                    <span className="text-white block font-black">{college.naacGrade || 'NAAC Accredited Grade A'}</span>
                    <span className="text-[11px] text-slate-400">National Assessment & Accreditation</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <div>
                    <span className="text-white block font-black">
                      {isMedical 
                        ? 'NABH / ISO Accredited Hospital' 
                        : college.nbaAccredited 
                        ? 'NBA Tier-1 Accredited' 
                        : 'Autonomous Certified'}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {isMedical 
                        ? 'Tertiary Healthcare Standards' 
                        : 'Washington Accord / Global Standards'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. BRANCHES & COURSES TAB */}
        {activeTab === 'branches' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border-2 border-slate-800 space-y-4">
              <div>
                <h2 className="text-xl font-black text-white">
                  {isMedical 
                    ? 'Medical, Healthcare & Clinical Degrees' 
                    : isArts 
                    ? 'Undergraduate & Postgraduate Degree Programs' 
                    : 'Undergraduate Engineering Branches (B.E / B.Tech)'}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Verified seat allotment programs across departments at {college.shortName}.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {college.allBranches.map((branch: string, idx: number) => {
                  let duration = '4 Years';
                  const bLower = branch.toLowerCase();
                  if (bLower.includes('mbbs')) duration = '5.5 Years (Inc. Internship)';
                  else if (bLower.includes('bds')) duration = '5 Years';
                  else if (bLower.includes('pharm.d')) duration = '6 Years';
                  else if (bLower.includes('b.pharm') || bLower.includes('b.tech') || bLower.includes('b.e')) duration = '4 Years';
                  else if (bLower.includes('b.com') || bLower.includes('b.sc') || bLower.includes('bca') || bLower.includes('bba') || bLower.includes('b.a')) duration = '3 Years';
                  else if (bLower.includes('md') || bLower.includes('ms') || bLower.includes('m.tech') || bLower.includes('m.sc')) duration = '2 - 3 Years (PG)';

                  return (
                    <div
                      key={idx}
                      className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-xl bg-blue-600/20 text-cyan-400 font-mono font-black flex items-center justify-center text-[10px]">
                          {idx + 1}
                        </span>
                        <span className="font-bold text-white">{branch}</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-bold border border-slate-700 shrink-0">
                        {duration}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 3. ADMISSIONS TAB */}
        {activeTab === 'admissions' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border-2 border-slate-800 space-y-6">
              <div>
                <h2 className="text-xl font-black text-white">
                  {isMedical 
                    ? 'NEET Counselling & Admission Process' 
                    : isArts 
                    ? '12th Board Merit Admission Pathways' 
                    : 'TNEA Single Window & Admission Pathways'}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  How seats are allotted at {college.shortName} through official single window counselling, merit & entrance.
                </p>
              </div>

              {/* Admission Routes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {college.admissionRoutes.map((route: string, idx: number) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs space-y-1">
                    <span className="text-[10px] uppercase font-bold text-cyan-400 block">Admission Pathway #{idx + 1}</span>
                    <h4 className="font-black text-white text-sm">{route}</h4>
                    <p className="text-slate-400 text-[11px]">
                      {isMedical 
                        ? 'Direct application via TN Medical Selection Committee (DME) or MCC AIQ.' 
                        : isArts 
                        ? 'Direct application via university admission portal & 12th board merit list.' 
                        : 'Direct application via official Directorate of Technical Education (DoTE) / TNEA portal.'}
                    </p>
                  </div>
                ))}
              </div>

              {/* Dynamic Estimated Cutoff Breakdown */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center justify-between">
                  <span>
                    {isMedical 
                      ? 'Estimated NEET UG Cutoff Marks by Community Category' 
                      : isArts 
                      ? 'Estimated 12th Board Cutoff Percentage by Category' 
                      : 'Estimated TNEA PCM Cutoff Score by Community Category'}
                  </span>
                  <span className="text-[10px] text-cyan-400 font-mono">
                    {isMedical ? 'Max 720 Marks' : isArts ? 'Max 100%' : 'Max 200.00'}
                  </span>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] uppercase text-slate-400 font-bold block">Open Category (OC)</span>
                    <span className="font-black text-white text-sm">
                      {isMedical 
                        ? (college.neetCutoffGeneral ? `${college.neetCutoffGeneral} Marks` : '620+ Marks') 
                        : isArts 
                        ? (college.meritCutoffPercentage || '95%+ Merit') 
                        : (college.tneaCutoffGeneral || '192.0+')}
                    </span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] uppercase text-slate-400 font-bold block">Backward Class (BC)</span>
                    <span className="font-black text-cyan-400 text-sm">
                      {isMedical 
                        ? (college.neetCutoffGeneral ? `${parseInt(college.neetCutoffGeneral) - 15} – ${college.neetCutoffGeneral}` : '590 – 620') 
                        : isArts 
                        ? '90% – 95%' 
                        : '188.0 – 195.0'}
                    </span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] uppercase text-slate-400 font-bold block">MBC / DNC</span>
                    <span className="font-black text-indigo-400 text-sm">
                      {isMedical ? '560 – 590 Marks' : isArts ? '85% – 90%' : '182.0 – 192.0'}
                    </span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] uppercase text-slate-400 font-bold block">SC / SCA / ST</span>
                    <span className="font-black text-emerald-400 text-sm">
                      {isMedical ? '480 – 540 Marks' : isArts ? '75% – 85%' : '165.0 – 185.0'}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 italic pt-1">
                  * Cutoffs fluctuate annually based on candidate performance, reservation rosters, and seat availability.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 4. FEES & SCHOLARSHIPS TAB */}
        {activeTab === 'fees' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border-2 border-slate-800 space-y-6">
              <div>
                <h2 className="text-xl font-black text-white">Fee Structure & State Government Scholarships</h2>
                <p className="text-xs text-slate-400 mt-1">Government regulated fee guidelines for Tamil Nadu engineering aspirants.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tuition Fee Breakdown */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 text-xs">
                  <h3 className="font-black text-white text-sm uppercase tracking-wider text-cyan-400">
                    Annual Tuition Fees
                  </h3>
                  <div className="space-y-2 text-slate-300">
                    <div className="flex justify-between py-1.5 border-b border-slate-800">
                      <span>TNEA Single Window (Merit Quota)</span>
                      <strong className="text-white">{college.approxFeesPerYear.split('(')[0]}</strong>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-800">
                      <span>Management Quota (if applicable)</span>
                      <strong className="text-white">₹1.25L – ₹1.85L / yr</strong>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-800">
                      <span>Hostel & Mess (Annual Approx)</span>
                      <strong className="text-white">{college.hostelFees || '₹65,000 – ₹90,000 / yr'}</strong>
                    </div>
                  </div>
                </div>

                {/* Scholarships & Fee Waivers */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 text-xs">
                  <h3 className="font-black text-white text-sm uppercase tracking-wider text-emerald-400">
                    Eligible Financial Aid & Concessions
                  </h3>
                  <div className="space-y-2.5">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block">7.5% Govt School Quota:</strong>
                        <span className="text-slate-400 text-[11px]">100% tuition, hostel, and book fees waived by TN Govt.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block">First Graduate (FG) Concession:</strong>
                        <span className="text-slate-400 text-[11px]">₹25,000 to ₹50,000 annual tuition reduction for first degree earners.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block">Post-Matric SC/ST/SCA Scheme:</strong>
                        <span className="text-slate-400 text-[11px]">Full tuition reimbursement based on family income criteria.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. PLACEMENTS TAB */}
        {activeTab === 'placements' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border-2 border-slate-800 space-y-6">
              <div>
                <h2 className="text-xl font-black text-white">Placement Statistics & Top Recruiters</h2>
                <p className="text-xs text-slate-400 mt-1">Verified career recruitment data for recent graduating cohorts.</p>
              </div>

              {/* Placements Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Highest Package</span>
                  <span className="text-3xl font-black text-emerald-400 block my-1">{college.placements.highestPackage}</span>
                  <span className="text-[10px] text-slate-500">Tier-1 Product Tech Offers</span>
                </div>
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Average Package</span>
                  <span className="text-3xl font-black text-cyan-400 block my-1">{college.placements.averagePackage}</span>
                  <span className="text-[10px] text-slate-500">Across All Engineering Streams</span>
                </div>
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Placement Rate</span>
                  <span className="text-3xl font-black text-white block my-1">{college.placements.placementPercentage}</span>
                  <span className="text-[10px] text-slate-500">Eligible Registered Candidates</span>
                </div>
              </div>

              {/* Top Recruiters */}
              <div className="space-y-3">
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-400">
                  Key Visiting Recruiters
                </h3>
                <div className="flex flex-wrap gap-2">
                  {college.placements.topRecruiters.map((recruiter: string, i: number) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-200"
                    >
                      {recruiter}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. HOSTEL & CAMPUS TAB */}
        {activeTab === 'campus' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border-2 border-slate-800 space-y-6">
              <div>
                <h2 className="text-xl font-black text-white">Campus Infrastructure & Residential Life</h2>
                <p className="text-xs text-slate-400 mt-1">Hostels, student mess facilities, sports complexes, and innovation laboratories.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                  <h3 className="font-black text-white text-sm text-cyan-400 flex items-center gap-2">
                    <HomeIcon className="w-4 h-4" /> Hostel Facilities
                  </h3>
                  <p className="text-slate-300">
                    Separate boys and girls residential blocks with 24/7 security, high-speed Wi-Fi, and South Indian hygienic vegetarian & non-vegetarian mess options.
                  </p>
                  <span className="text-slate-400 block font-bold mt-2">
                    Estimated Hostel Fee: {college.hostelFees || '₹60,000 – ₹90,000 / year'}
                  </span>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                  <h3 className="font-black text-white text-sm text-indigo-400 flex items-center gap-2">
                    <Building2 className="w-4 h-4" /> Laboratories & Incubation
                  </h3>
                  <p className="text-slate-300">
                    Industry-sponsored Centers of Excellence (CoE), Robotics & Embedded labs, IoT research clusters, and startup incubation support.
                  </p>
                  <span className="text-slate-400 block font-bold mt-2">
                    Campus Acreage: {college.campuses?.[0] || `${college.city} Main Campus`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 7. CONTACT TAB */}
        {activeTab === 'contact' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border-2 border-slate-800 space-y-6">
              <div>
                <h2 className="text-xl font-black text-white">Institutional Contact & Official Portal</h2>
                <p className="text-xs text-slate-400 mt-1">Direct contact information and official administrative web portal.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-slate-300">
                    <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span>{college.name}, {college.city}, {college.district}, Tamil Nadu.</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Building2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span>Affiliation: Anna University / Approved University</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-center space-y-3">
                  <span className="text-slate-400 text-xs font-bold">Official Administrative Website:</span>
                  <a
                    href={college.officialWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs transition-colors w-fit shadow-md"
                  >
                    <span>Visit Official Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
