import React from 'react';
import { 
  X, 
  MapPin, 
  Award, 
  Building2, 
  DollarSign, 
  TrendingUp, 
  GraduationCap, 
  CheckCircle2, 
  ExternalLink, 
  Calendar, 
  Home, 
  Bookmark, 
  Plus, 
  Minus,
  ArrowRight,
  ShieldCheck,
  Building
} from 'lucide-react';
import { College } from '../../data/indiaColleges';

interface CollegeDetailModalProps {
  college: College | null;
  onClose: () => void;
  isCompared: boolean;
  onToggleCompare: (college: College) => void;
  onOpenBooking: () => void;
}

export const CollegeDetailModal: React.FC<CollegeDetailModalProps> = ({
  college,
  onClose,
  isCompared,
  onToggleCompare,
  onOpenBooking
}) => {
  if (!college) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 relative max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors"
          aria-label="Close profile"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image & Header */}
        <div className="relative h-64 sm:h-72 w-full">
          <img
            src={college.image}
            alt={college.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

          {/* Bottom Info Overlay */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs px-2.5 py-0.5 rounded-md bg-blue-600 font-bold text-white shadow-xs">
                {college.institutionType}
              </span>
              {college.nirfEngineeringRank && (
                <span className="text-xs px-2.5 py-0.5 rounded-md bg-white/20 backdrop-blur-md text-cyan-300 font-bold">
                  {college.nirfEngineeringRank}
                </span>
              )}
              {college.naacGrade && (
                <span className="text-xs px-2.5 py-0.5 rounded-md bg-emerald-500/90 text-white font-semibold">
                  {college.naacGrade}
                </span>
              )}
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {college.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-1.5 mt-1 font-medium">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
              {college.city}, {college.district}, {college.state} • Est. {college.establishedYear}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Campuses Pill if multi-campus */}
          {college.campuses && college.campuses.length > 0 && (
            <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-200/80">
              <p className="text-[11px] font-bold uppercase tracking-wider text-blue-800 mb-1.5 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-blue-600" /> Major Campuses:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {college.campuses.map((camp, idx) => (
                  <span key={idx} className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white text-blue-900 border border-blue-200">
                    {camp}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <p className="text-[10px] font-bold text-slate-500 uppercase">Approx Tuition</p>
              <p className="text-xs sm:text-sm font-black text-slate-900 mt-0.5 truncate">{college.approxTuitionPerYear}</p>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <p className="text-[10px] font-bold text-slate-500 uppercase">Highest Package</p>
              <p className="text-xs sm:text-sm font-black text-emerald-600 mt-0.5">{college.placements.highestPackage}</p>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <p className="text-[10px] font-bold text-slate-500 uppercase">Average Package</p>
              <p className="text-xs sm:text-sm font-black text-blue-600 mt-0.5">{college.placements.averagePackage}</p>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <p className="text-[10px] font-bold text-slate-500 uppercase">Entrance Exams</p>
              <p className="text-xs font-bold text-slate-800 mt-0.5 truncate">{college.entranceExams.join(', ')}</p>
            </div>
          </div>

          {/* Overview */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Institution Overview
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {college.overview}
            </p>
          </div>

          {/* Engineering Programs */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              Approved Engineering Branches & Disciplines
            </h4>
            <div className="flex flex-wrap gap-2">
              {college.allBranches.map((branch, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200"
                >
                  {branch}
                </span>
              ))}
            </div>
          </div>

          {/* Admission Routes & Criteria */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              Admission Routes & Entrance Exams
            </h4>
            <div className="space-y-1.5">
              {college.admissionRoutes.map((route, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>{route}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Placements & Top Recruiters */}
          <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                Placement Record & Top Recruiters
              </h4>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                Placement: {college.placements.placementPercentage}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {college.placements.topRecruiters.map((recruiter, idx) => (
                <span key={idx} className="text-xs font-bold px-2.5 py-1 rounded-lg bg-white text-slate-800 border border-emerald-200">
                  {recruiter}
                </span>
              ))}
            </div>
          </div>

          {/* Scholarships & Hostel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="font-bold text-slate-700 block mb-1 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-500" /> Scholarships & Waivers
              </span>
              <p className="text-slate-600 leading-relaxed font-medium">{college.scholarships}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="font-bold text-slate-700 block mb-1 flex items-center gap-1.5">
                <Home className="w-4 h-4 text-blue-600" /> Hostel & Campus Living
              </span>
              <p className="text-slate-600 font-medium">
                {college.hostelAvailable ? `Yes — Approx ${college.hostelFeePerYear}` : 'Day Scholar Only'}
              </p>
            </div>
          </div>

          {/* Last Updated + Official Link */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs text-slate-500 border-t border-slate-100">
            <span>Last Verified & Updated: <strong>{college.lastUpdated}</strong></span>
            <a
              href={college.officialWebsite}
              target="_blank"
              rel="noreferrer"
              className="font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 hover:underline"
            >
              <span>Visit Official Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => onToggleCompare(college)}
              className={`w-full sm:w-auto px-5 py-3.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                isCompared
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              {isCompared ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              <span>{isCompared ? 'Remove from Compare' : 'Add to Compare'}</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="w-full sm:flex-1 py-3.5 px-6 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 text-xs sm:text-sm transition-all"
            >
              <span>Get Admission Guidance for {college.shortName}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
