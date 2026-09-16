import React from 'react';
import { X, Trash2, ExternalLink, ArrowRight, CheckCircle2, Building, DollarSign, Award, GraduationCap, MapPin } from 'lucide-react';
import { College } from '../../data/indiaColleges';

interface CollegeComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  colleges: College[];
  onRemove: (id: string) => void;
  onOpenBooking: () => void;
  onSelectCollege: (college: College) => void;
}

export const CollegeComparisonModal: React.FC<CollegeComparisonModalProps> = ({
  isOpen,
  onClose,
  colleges,
  onRemove,
  onOpenBooking,
  onSelectCollege
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-6xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-5 mb-6">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">Side-by-Side Analysis</span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              COMPARE YOUR OPTIONS ({colleges.length}/4)
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            aria-label="Close comparison"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {colleges.length === 0 ? (
          <div className="text-center py-16">
            <GraduationCap className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-900 mb-1">No Colleges Selected for Comparison</h4>
            <p className="text-xs text-slate-500 mb-6 max-w-sm mx-auto">
              Click the "Compare" button on any college card to evaluate up to 4 institutions side-by-side.
            </p>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold"
            >
              Browse Engineering Colleges
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr>
                  <th className="p-4 bg-slate-100/80 text-xs font-bold text-slate-600 uppercase tracking-wider rounded-tl-2xl w-48">
                    Comparison Field
                  </th>
                  {colleges.map((c) => (
                    <th key={c.id} className="p-4 bg-slate-50 border-l border-slate-200 text-slate-900 align-top relative">
                      <button
                        onClick={() => onRemove(c.id)}
                        className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title="Remove from comparison"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <h4 className="text-sm font-black text-slate-900 pr-6 leading-tight">{c.name}</h4>
                      <span className="text-[11px] font-bold text-blue-600 mt-1 block">{c.city}, {c.state}</span>
                      <button
                        onClick={() => onSelectCollege(c)}
                        className="text-[10px] font-bold text-slate-500 hover:text-blue-600 mt-1 underline"
                      >
                        View Full Profile
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200 text-xs">
                {/* Type & Category */}
                <tr>
                  <td className="p-3.5 font-bold text-slate-700 bg-slate-50/50">Institution Type</td>
                  {colleges.map((c) => (
                    <td key={c.id} className="p-3.5 border-l border-slate-200 font-semibold text-slate-800">
                      {c.institutionType}
                    </td>
                  ))}
                </tr>

                {/* Entrance Exam */}
                <tr>
                  <td className="p-3.5 font-bold text-slate-700 bg-slate-50/50">Entrance Exams</td>
                  {colleges.map((c) => (
                    <td key={c.id} className="p-3.5 border-l border-slate-200">
                      <div className="flex flex-wrap gap-1">
                        {c.entranceExams.map((e, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold text-[10px]">
                            {e}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Admission Route */}
                <tr>
                  <td className="p-3.5 font-bold text-slate-700 bg-slate-50/50">Admission Route</td>
                  {colleges.map((c) => (
                    <td key={c.id} className="p-3.5 border-l border-slate-200 text-slate-600 space-y-1">
                      {c.admissionRoutes.map((r, i) => (
                        <p key={i} className="text-[11px]">• {r}</p>
                      ))}
                    </td>
                  ))}
                </tr>

                {/* Approx Tuition */}
                <tr>
                  <td className="p-3.5 font-bold text-slate-700 bg-slate-50/50">Approx Fees / Year</td>
                  {colleges.map((c) => (
                    <td key={c.id} className="p-3.5 border-l border-slate-200 font-bold text-slate-900">
                      {c.approxTuitionPerYear}
                    </td>
                  ))}
                </tr>

                {/* Placements */}
                <tr>
                  <td className="p-3.5 font-bold text-slate-700 bg-slate-50/50">Placements (High / Avg)</td>
                  {colleges.map((c) => (
                    <td key={c.id} className="p-3.5 border-l border-slate-200">
                      <p className="font-extrabold text-emerald-600 text-sm">{c.placements.highestPackage}</p>
                      <p className="text-slate-600 font-medium text-[11px]">Avg: {c.placements.averagePackage}</p>
                    </td>
                  ))}
                </tr>

                {/* NIRF & NAAC */}
                <tr>
                  <td className="p-3.5 font-bold text-slate-700 bg-slate-50/50">Accreditation / Ranking</td>
                  {colleges.map((c) => (
                    <td key={c.id} className="p-3.5 border-l border-slate-200">
                      <p className="font-bold text-slate-800">{c.nirfEngineeringRank || 'State Autonomous'}</p>
                      <p className="text-slate-500 text-[11px]">{c.naacGrade || 'NAAC Accredited'}</p>
                    </td>
                  ))}
                </tr>

                {/* Scholarships */}
                <tr>
                  <td className="p-3.5 font-bold text-slate-700 bg-slate-50/50">Scholarships</td>
                  {colleges.map((c) => (
                    <td key={c.id} className="p-3.5 border-l border-slate-200 text-slate-600 text-[11px] leading-snug">
                      {c.scholarships}
                    </td>
                  ))}
                </tr>

                {/* Campuses */}
                <tr>
                  <td className="p-3.5 font-bold text-slate-700 bg-slate-50/50">Campuses / Hostels</td>
                  {colleges.map((c) => (
                    <td key={c.id} className="p-3.5 border-l border-slate-200 text-slate-600 text-[11px]">
                      {c.campuses ? c.campuses.join(', ') : `${c.city} Main Campus`}
                      <span className="block text-slate-500 mt-0.5">Hostel: {c.hostelAvailable ? c.hostelFeePerYear : 'N/A'}</span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>

            {/* Bottom Actions */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-500">
                Need expert guidance to choose between these {colleges.length} institutions?
              </span>

              <button
                onClick={() => {
                  onClose();
                  onOpenBooking();
                }}
                className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/25 flex items-center gap-2"
              >
                <span>Book 1-on-1 Strategy Review for Comparison</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
