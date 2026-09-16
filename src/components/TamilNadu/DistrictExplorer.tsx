import React from 'react';
import { MapPin, Navigation, ArrowRight } from 'lucide-react';
import { TN_DISTRICTS, getDistrictCollegesCount } from '../../data/indexTNColleges';

interface DistrictExplorerProps {
  selectedDistrict: string;
  onSelectDistrict: (district: string) => void;
}

export const DistrictExplorer: React.FC<DistrictExplorerProps> = ({
  selectedDistrict,
  onSelectDistrict
}) => {
  return (
    <div className="mb-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-black uppercase tracking-wider mb-3">
          <Navigation className="w-3.5 h-3.5 text-blue-600" />
          <span>Statewide Coverage Across Tamil Nadu</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-black text-slate-950 mb-2">
          EXPLORE COLLEGES BY DISTRICT (38 DISTRICTS)
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 font-medium">
          Click any district to filter verified government, aided, autonomous, and deemed engineering institutions.
        </p>
      </div>

      {/* District Badges Cloud */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-6 bg-slate-50 border-2 border-slate-200 rounded-3xl">
        <button
          onClick={() => onSelectDistrict('All')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
            selectedDistrict === 'All'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
              : 'bg-white text-slate-800 hover:bg-slate-200 border-2 border-slate-200'
          }`}
        >
          All 38 Districts (All TN)
        </button>

        {TN_DISTRICTS.map((dist) => {
          const count = getDistrictCollegesCount(dist);
          const isSelected = selectedDistrict.toLowerCase() === dist.toLowerCase();

          return (
            <button
              key={dist}
              onClick={() => onSelectDistrict(dist)}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-105'
                  : 'bg-white hover:bg-blue-50 text-slate-800 border-2 border-slate-200 hover:border-blue-400'
              }`}
            >
              <span>{dist}</span>
              {count > 0 && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                  isSelected ? 'bg-white text-blue-700' : 'bg-slate-200 text-slate-700'
                }`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
