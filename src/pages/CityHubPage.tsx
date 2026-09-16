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
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TNCollege } from '../data/tamilNaduColleges';

interface CityHubPageProps {
  onOpenBooking?: () => void;
}

const CITY_HUBS = [
  { id: 'Coimbatore', name: 'Coimbatore', tagline: 'Manchester of South India • Premier Engineering & Industrial Hub', count: '18+ Top Colleges' },
  { id: 'Chennai', name: 'Chennai Metro', tagline: 'Detroit of Asia • IT Corridor & State Capital University Campuses', count: '14+ Top Colleges' },
  { id: 'Madurai', name: 'Madurai', tagline: 'Cultural Capital & Southern Engineering Epicenter', count: '6+ Top Colleges' },
  { id: 'Salem', name: 'Salem', tagline: 'Western Steel & Manufacturing Technical Belt', count: '5+ Top Colleges' },
  { id: 'Erode', name: 'Erode', tagline: 'Textile Valley & Autonomous Engineering Landmarks', count: '6+ Top Colleges' },
  { id: 'Tiruchirappalli', name: 'Tiruchirappalli (Trichy)', tagline: 'Central Tamil Nadu Technical & Industrial Base', count: '5+ Top Colleges' },
  { id: 'Vellore', name: 'Vellore', tagline: 'Northern Tamil Nadu Global University Cluster', count: '4+ Top Colleges' },
  { id: 'Tiruppur', name: 'Tiruppur', tagline: 'Dollar City Textile Engineering & Emerging Tech Hub', count: '4+ Top Colleges' },
  { id: 'Namakkal', name: 'Namakkal', tagline: 'Transport & Autonomous Engineering Institutions', count: '5+ Top Colleges' }
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

  const activeHub = CITY_HUBS.find(h => h.id.toLowerCase() === activeCityId.toLowerCase()) || CITY_HUBS[0];

  const cityColleges = useMemo(() => {
    return colleges.filter(c => 
      c.district.toLowerCase().includes(activeCityId.toLowerCase()) ||
      c.city.toLowerCase().includes(activeCityId.toLowerCase()) ||
      (activeCityId === 'Coimbatore' && c.isCoimbatoreHub)
    );
  }, [colleges, activeCityId]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-20 pb-24">
      
      {/* Top Banner Header */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-black uppercase tracking-wider mb-3">
              <MapPin className="w-4 h-4" /> Regional Engineering Institutions
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Engineering Colleges in {activeHub.name}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
              {activeHub.tagline}. Verified cutoffs, government-regulated fees, and top recruiters in this regional zone.
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

        {/* City Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-900 p-5 rounded-3xl border-2 border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Verified Colleges</span>
            <p className="text-2xl font-black text-cyan-400 mt-1">{cityColleges.length} Institutions</p>
            <span className="text-[10px] text-slate-400">Anna Univ / Autonomous</span>
          </div>

          <div className="bg-slate-900 p-5 rounded-3xl border-2 border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Highest Package</span>
            <p className="text-2xl font-black text-emerald-400 mt-1">₹40.0 LPA</p>
            <span className="text-[10px] text-slate-400">Top Product Drives</span>
          </div>

          <div className="bg-slate-900 p-5 rounded-3xl border-2 border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Average Placement CTC</span>
            <p className="text-2xl font-black text-white mt-1">₹6.5L – ₹8.5L</p>
            <span className="text-[10px] text-slate-400">Core & Software Mix</span>
          </div>

          <div className="bg-slate-900 p-5 rounded-3xl border-2 border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Govt Fee Waivers</span>
            <p className="text-2xl font-black text-blue-400 mt-1">7.5% & FG</p>
            <span className="text-[10px] text-slate-400">100% Eligible</span>
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
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md text-[10px] font-black uppercase text-cyan-400 border border-slate-700">
                    {college.tneaCode ? `TNEA: ${college.tneaCode}` : 'University'}
                  </span>

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
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Cutoff</span>
                        <span className="font-black text-cyan-400">{college.tneaCutoffGeneral || 'Merit'}</span>
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
