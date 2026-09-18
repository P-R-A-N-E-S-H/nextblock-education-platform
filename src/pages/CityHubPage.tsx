import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  Building2, 
  ShieldCheck, 
  Award, 
  Briefcase, 
  ArrowRight, 
  Bookmark, 
  Scale, 
  Sparkles,
  TrendingUp,
  CheckCircle2,
  Cpu,
  Stethoscope,
  Palette,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TNCollege, AcademicStream } from '../types';
import { getStreamFallbackImage } from '../utils/helpers';

interface CityHubPageProps {
  onOpenBooking?: () => void;
}

const CITY_HUBS = [
  { id: 'Coimbatore', name: 'Coimbatore', tagline: 'Manchester of South India • Premier Engineering, Medical & Arts Hub', count: '45+ Top Colleges' },
  { id: 'Chennai', name: 'Chennai Metro', tagline: 'Detroit of Asia • IT Corridor, Apex Medical & State Capital Universities', count: '60+ Top Colleges' },
  { id: 'Madurai', name: 'Madurai', tagline: 'Cultural Capital • Southern Engineering, Medical & Heritage Arts Epicenter', count: '20+ Top Colleges' },
  { id: 'Salem', name: 'Salem', tagline: 'Western Steel Belt • Top Govt Medical & Autonomous Technical Colleges', count: '15+ Top Colleges' },
  { id: 'Erode', name: 'Erode', tagline: 'Textile Valley • Autonomous Engineering & Science Landmarks', count: '12+ Top Colleges' },
  { id: 'Tiruchirappalli', name: 'Tiruchirappalli (Trichy)', tagline: 'Central Tamil Nadu Technical, Medical & Historic Arts Base', count: '18+ Top Colleges' },
  { id: 'Vellore', name: 'Vellore', tagline: 'Northern Tamil Nadu Global University, CMC & Tech Cluster', count: '10+ Top Colleges' },
  { id: 'Tiruppur', name: 'Tiruppur', tagline: 'Dollar City Textile Engineering, Design & Emerging Colleges', count: '8+ Top Colleges' },
  { id: 'Namakkal', name: 'Namakkal', tagline: 'Transport, Poultry & Autonomous Engineering Institutions', count: '10+ Top Colleges' },
  { id: 'Tirunelveli', name: 'Tirunelveli', tagline: 'South TN Medical, University & Engineering Hub', count: '12+ Top Colleges' },
  { id: 'Thanjavur', name: 'Thanjavur', tagline: 'Delta Region Heritage Medical, Deemed & Arts Campuses', count: '8+ Top Colleges' }
];

export const CityHubPage: React.FC<CityHubPageProps> = ({ onOpenBooking }) => {
  const { 
    colleges, 
    selectedCity, 
    setSelectedCity, 
    savedCollegeIds, 
    toggleSaveCollege, 
    comparisonCollegeIds, 
    toggleComparison, 
    viewCollegeDetail 
  } = useApp();

  const [activeCityId, setActiveCityId] = useState<string>(selectedCity || 'Coimbatore');
  const [selectedStream, setSelectedStream] = useState<AcademicStream | 'all'>('all');

  const activeHub = CITY_HUBS.find(h => h.id.toLowerCase() === activeCityId.toLowerCase()) || CITY_HUBS[0];

  const cityColleges = useMemo(() => {
    return colleges.filter(c => {
      const matchesCity = 
        c.district.toLowerCase().includes(activeCityId.toLowerCase()) ||
        c.city.toLowerCase().includes(activeCityId.toLowerCase()) ||
        (activeCityId === 'Coimbatore' && c.isCoimbatoreHub);
      
      const matchesStream = selectedStream === 'all' || c.stream === selectedStream;

      return matchesCity && matchesStream;
    });
  }, [colleges, activeCityId, selectedStream]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-20 pb-24">
      
      {/* Top Banner Header */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-black uppercase tracking-wider mb-3">
              <MapPin className="w-4 h-4" /> Regional Multi-Stream Hub
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Colleges in {activeHub.name}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
              {activeHub.tagline}. Engineering, Medical & Arts colleges with verified cutoffs and official fees.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs transition-all shadow-xl shadow-blue-500/30 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-cyan-200" />
              <span>Get {activeHub.name} Choice List</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        
        {/* City Hub Switcher Pills */}
        <div className="bg-slate-900 p-4 rounded-3xl border-2 border-slate-800 overflow-x-auto custom-scrollbar shadow-xl">
          <div className="flex items-center gap-2 min-w-max">
            {CITY_HUBS.map((hub) => {
              const isActive = activeCityId === hub.id;
              return (
                <button
                  key={hub.id}
                  onClick={() => {
                    setActiveCityId(hub.id);
                    setSelectedCity(hub.id);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                      : 'bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{hub.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Stream Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedStream('all')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 border ${
              selectedStream === 'all'
                ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All Disciplines</span>
          </button>
          <button
            onClick={() => setSelectedStream('engineering')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 border ${
              selectedStream === 'engineering'
                ? 'bg-cyan-600 text-white border-cyan-500 shadow-md'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border-slate-800'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Engineering & Tech</span>
          </button>
          <button
            onClick={() => setSelectedStream('medical')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 border ${
              selectedStream === 'medical'
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border-slate-800'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Medical & Healthcare</span>
          </button>
          <button
            onClick={() => setSelectedStream('arts-science')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 border ${
              selectedStream === 'arts-science'
                ? 'bg-purple-600 text-white border-purple-500 shadow-md'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border-slate-800'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Arts, Science & Commerce</span>
          </button>
        </div>

        {/* City Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-900 p-5 rounded-3xl border-2 border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Verified Colleges</span>
            <p className="text-2xl font-black text-cyan-400 mt-1">{cityColleges.length} Institutions</p>
            <span className="text-[10px] text-slate-400">Govt / Autonomous / Private</span>
          </div>

          <div className="bg-slate-900 p-5 rounded-3xl border-2 border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Highest Package</span>
            <p className="text-2xl font-black text-emerald-400 mt-1">₹52.0 LPA</p>
            <span className="text-[10px] text-slate-400">Top Recruiters & Hospital Drives</span>
          </div>

          <div className="bg-slate-900 p-5 rounded-3xl border-2 border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Average Placement CTC</span>
            <p className="text-2xl font-black text-white mt-1">₹6.5L – ₹12.5L</p>
            <span className="text-[10px] text-slate-400">Tech, Clinical & Commerce</span>
          </div>

          <div className="bg-slate-900 p-5 rounded-3xl border-2 border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Govt Fee Waivers</span>
            <p className="text-2xl font-black text-blue-400 mt-1">7.5% & FG & PMSSS</p>
            <span className="text-[10px] text-slate-400">100% Verified Eligible</span>
          </div>
        </div>

        {/* Colleges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cityColleges.map((college) => {
            const isSaved = savedCollegeIds.includes(college.id);
            const isCompared = comparisonCollegeIds.includes(college.id);

            return (
              <div
                key={college.id}
                className="bg-slate-900 rounded-3xl border-2 border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between overflow-hidden shadow-xl"
              >
                {/* Image */}
                <div className="relative h-44 w-full bg-slate-800 overflow-hidden">
                  <img
                    src={college.image}
                    alt={college.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = getStreamFallbackImage(college.stream);
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                      college.stream === 'medical'
                        ? 'bg-emerald-500/90 text-white'
                        : college.stream === 'arts-science'
                        ? 'bg-purple-500/90 text-white'
                        : 'bg-blue-600/90 text-white'
                    }`}>
                      {college.stream === 'medical' ? 'Medical' : college.stream === 'arts-science' ? 'Arts & Sci' : 'Engineering'}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-900/90 backdrop-blur-md text-[10px] font-black uppercase text-cyan-400 border border-slate-700">
                      {college.tneaCode ? `Code: ${college.tneaCode}` : college.stream === 'medical' ? 'NEET UG' : 'Merit'}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 flex items-center gap-1">
                    <button
                      onClick={() => toggleSaveCollege(college.id)}
                      className={`p-2 rounded-xl backdrop-blur-md border ${
                        isSaved ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-900/80 text-slate-300 border-slate-700'
                      }`}
                      title="Save"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={() => toggleComparison(college.id)}
                      className={`p-2 rounded-xl backdrop-blur-md border ${
                        isCompared ? 'bg-blue-600 text-white border-blue-400' : 'bg-slate-900/80 text-slate-300 border-slate-700'
                      }`}
                      title="Compare"
                    >
                      <Scale className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">
                      {college.institutionType}
                    </span>
                    <h3 
                      onClick={() => viewCollegeDetail(college.id)}
                      className="text-base font-black text-white hover:text-cyan-400 transition-colors cursor-pointer line-clamp-2"
                    >
                      {college.name}
                    </h3>

                    <div className="grid grid-cols-2 gap-2 mt-4 text-xs bg-slate-950 p-3 rounded-2xl border border-slate-800">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">
                          {college.stream === 'medical' ? 'NEET Cutoff' : college.stream === 'arts-science' ? 'Merit Score' : 'TNEA Cutoff'}
                        </span>
                        <span className="font-black text-cyan-400">
                          {college.stream === 'medical'
                            ? (college.neetCutoffGeneral ? `${college.neetCutoffGeneral} Marks` : 'NEET UG')
                            : college.stream === 'arts-science'
                            ? (college.meritCutoffPercentage || '85%+ Merit')
                            : (college.tneaCutoffGeneral || 'Merit')}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Highest CTC</span>
                        <span className="font-black text-emerald-400">{college.placements.highestPackage}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
                    <button
                      onClick={() => viewCollegeDetail(college.id)}
                      className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>View Profile</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};

