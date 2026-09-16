import React from 'react';
import { X, Trash2, ExternalLink, ArrowRight, CheckCircle2, Building, GraduationCap, MapPin, Scale } from 'lucide-react';
import { TNCollege } from '../../data/indexTNColleges';

interface TNCollegeComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  colleges: TNCollege[];
  onRemove: (id: string) => void;
  onOpenBooking: () => void;
  onSelectCollege: (college: TNCollege) => void;
}

export const TNCollegeComparisonModal: React.FC<TNCollegeComparisonModalProps> = ({
  isOpen,
  onClose,
  colleges,
  onRemove,
  onOpenBooking,
  onSelectCollege
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-6xl w-full p-6 sm:p-8 shadow-2xl border-2 border-slate-300 relative max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-5 mb-6">
          <div>
            <span className="text-xs font-black text-blue-700 uppercase tracking-wider block">Tamil Nadu Engineering Matrix</span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-950">
              COMPARE YOUR OPTIONS ({colleges.length}/4)
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-500 hover:text-slate-950 hover:bg-slate-100 transition-colors"
            aria-label="Close comparison"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {colleges.length === 0 ? (
          <div className="text-center py-16">
            <GraduationCap className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h4 className="text-base font-black text-slate-950 mb-1">No Colleges Selected for Comparison</h4>
            <p className="text-xs text-slate-600 mb-6 max-w-sm mx-auto font-medium">
              Click "+ Compare" on any college card to evaluate up to 4 Tamil Nadu institutions side-by-side.
            </p>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-black"
            >
              Browse Engineering Colleges
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr>
                  <th className="p-4 bg-slate-100 text-xs font-black text-slate-700 uppercase tracking-wider rounded-tl-2xl w-48">
                    Comparison Field
                  </th>
                  {colleges.map((c) => (
                    <th key={c.id} className="p-4 bg-slate-50 border-l border-slate-200 text-slate-950 align-top relative">
                      <button
                        onClick={() => onRemove(c.id)}
                        className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title="Remove from comparison"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <img
                          src={c.image}
                          alt={c.name}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80';
                          }}
                        />
                        <div>
                          {c.tneaCode && (
                            <span className="text-[10px] font-black px-2 py-0.5 rounded bg-blue-100 text-blue-900 inline-block">
                              TNEA {c.tneaCode}
                            </span>
                          )}
                        </div>
                      </div>

                      <h4 className="text-sm font-black text-slate-950 pr-6 leading-tight">{c.name}</h4>
                      <span className="text-[11px] font-bold text-blue-700 mt-1 block">{c.city}, {c.district}</span>
                      <button
                        onClick={() => onSelectCollege(c)}
                        className="text-[10px] font-black text-slate-600 hover:text-blue-700 mt-1 underline"
                      >
                        View Full Profile
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200 text-xs">
                {/* Institution Type */}
                <tr>
                  <td className="p-3.5 font-black text-slate-800 bg-slate-50">Institution Type</td>
                  {colleges.map((c) => (
                    <td key={c.id} className="p-3.5 border-l border-slate-200 font-bold text-slate-900">
                      {c.institutionType}
                    </td>
                  ))}
                </tr>

                {/* TNEA Cutoff Level */}
                <tr>
                  <td className="p-3.5 font-black text-slate-800 bg-slate-50">TNEA General Cutoff</td>
                  {colleges.map((c) => (
                    <td key={c.id} className="p-3.5 border-l border-slate-200 font-black text-blue-700">
                      {c.tneaCutoffGeneral || 'Check Counselling'}
                    </td>
                  ))}
                </tr>

                {/* Admission Route */}
                <tr>
                  <td className="p-3.5 font-black text-slate-800 bg-slate-50">Admission Routes</td>
                  {colleges.map((c) => (
                    <td key={c.id} className="p-3.5 border-l border-slate-200 text-slate-700 space-y-1 font-semibold">
                      {c.admissionRoutes.map((r, i) => (
                        <p key={i} className="text-[11px]">• {r}</p>
                      ))}
                    </td>
                  ))}
                </tr>

                {/* Approx Fees */}
                <tr>
                  <td className="p-3.5 font-black text-slate-800 bg-slate-50">Approx Fees / Year</td>
                  {colleges.map((c) => (
                    <td key={c.id} className="p-3.5 border-l border-slate-200 font-black text-slate-950">
                      {c.approxFeesPerYear}
                    </td>
                  ))}
                </tr>

                {/* Placements */}
                <tr>
                  <td className="p-3.5 font-black text-slate-800 bg-slate-50">Placements (High / Avg)</td>
                  {colleges.map((c) => (
                    <td key={c.id} className="p-3.5 border-l border-slate-200">
                      <p className="font-black text-emerald-700 text-sm">{c.placements.highestPackage}</p>
                      <p className="text-slate-700 font-bold text-[11px]">Avg: {c.placements.averagePackage}</p>
                    </td>
                  ))}
                </tr>

                {/* NIRF & NAAC */}
                <tr>
                  <td className="p-3.5 font-black text-slate-800 bg-slate-50">Accreditations</td>
                  {colleges.map((c) => (
                    <td key={c.id} className="p-3.5 border-l border-slate-200">
                      <p className="font-black text-slate-900">{c.nirfRank || 'State Autonomous'}</p>
                      <p className="text-slate-600 font-bold text-[11px]">{c.naacGrade || 'NAAC Accredited'}</p>
                    </td>
                  ))}
                </tr>

                {/* Hostel */}
                <tr>
                  <td className="p-3.5 font-black text-slate-800 bg-slate-50">Hostel & Living</td>
                  {colleges.map((c) => (
                    <td key={c.id} className="p-3.5 border-l border-slate-200 text-slate-700 font-semibold text-[11px]">
                      {c.hostelAvailable ? `Available (${c.hostelFees || '₹65,000 / yr'})` : 'Day Scholar Only'}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>

            {/* Bottom Actions */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-600 font-semibold">
                Need guidance deciding between these colleges for TNEA Choice Locking?
              </span>

              <button
                onClick={() => {
                  onClose();
                  onOpenBooking();
                }}
                className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black shadow-md shadow-blue-500/25 flex items-center gap-2"
              >
                <span>Book 1-on-1 TNEA Choice Filling Review</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
