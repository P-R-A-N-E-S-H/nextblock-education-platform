import React, { useState } from 'react';
import { MapPin, Award, Building2, GraduationCap, ArrowRight, Sparkles, Filter, CheckCircle2 } from 'lucide-react';
import { indiaCollegesData, College } from '../../data/indiaColleges';

interface TamilNaduHubProps {
  onSelectCollege: (college: College) => void;
  onToggleCompare: (college: College) => void;
  comparedIds: string[];
  onOpenBooking: () => void;
}

export const TamilNaduHub: React.FC<TamilNaduHubProps> = ({
  onSelectCollege,
  onToggleCompare,
  comparedIds,
  onOpenBooking
}) => {
  const [selectedCity, setSelectedCity] = useState<string>('All');

  const tnCities = [
    { label: 'All Tamil Nadu', value: 'All' },
    { label: 'Chennai Region', value: 'Chennai Region' },
    { label: 'Coimbatore', value: 'Coimbatore Region' },
    { label: 'Vellore', value: 'Vellore' },
    { label: 'Tiruchirappalli', value: 'Tiruchirappalli' },
    { label: 'Madurai', value: 'Madurai' },
    { label: 'Salem', value: 'Salem' },
    { label: 'Erode', value: 'Erode' },
    { label: 'Thanjavur', value: 'Thanjavur' },
    { label: 'Tirunelveli', value: 'Tirunelveli' },
    { label: 'Namakkal', value: 'Namakkal' },
    { label: 'Karur', value: 'Karur' }
  ];

  const tnColleges = indiaCollegesData.filter((c) => {
    if (c.state !== 'Tamil Nadu') return false;
    if (selectedCity === 'All') return true;
    return c.region === selectedCity;
  });

  return (
    <div className="mb-20">
      {/* Subsection Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
          <MapPin className="w-3.5 h-3.5 text-blue-600" />
          <span>Regional Focus</span>
        </div>

        <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-3">
          TAMIL NADU ENGINEERING HUB
        </h3>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
          Explore leading engineering colleges across Tamil Nadu — from Anna University and PSG Tech to premier institutions across Chennai, Coimbatore, Trichy, and regional hubs.
        </p>
      </div>

      {/* City Filter Pills Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {tnCities.map((city) => {
          const isSelected = selectedCity === city.value;
          return (
            <button
              key={city.value}
              onClick={() => setSelectedCity(city.value)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-105'
                  : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200'
              }`}
            >
              {city.label}
            </button>
          );
        })}
      </div>

      {/* Colleges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tnColleges.map((college) => {
          const isCompared = comparedIds.includes(college.id);

          return (
            <div
              key={college.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header Tag + Compare Toggle */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {college.category}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleCompare(college);
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

                {/* College Title */}
                <h4 className="text-base font-black text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {college.name}
                </h4>

                <p className="text-xs text-slate-500 font-semibold flex items-center gap-1 mt-0.5 mb-4">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  {college.city}, {college.district}
                </p>

                {/* Quick 2-col Stats */}
                <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">TNEA / Exam</span>
                    <span className="font-bold text-slate-900 block truncate">{college.entranceExams.join(', ')}</span>
                  </div>

                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Avg CTC</span>
                    <span className="font-bold text-emerald-600 block">{college.placements.averagePackage}</span>
                  </div>
                </div>

                {/* Branches Pill */}
                <div className="mb-4">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                    Featured Programs:
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

              {/* Action Button */}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => onSelectCollege(college)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 group-hover:bg-blue-600 text-slate-800 group-hover:text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>View Details</span>
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
