import React from 'react';
import { X, Bookmark, Trash2, ArrowRight, Sparkles, MapPin, DollarSign, CalendarCheck, GraduationCap } from 'lucide-react';
import { TNCollege } from '../types';
import { getStreamFallbackImage } from '../utils/helpers';

interface ShortlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  shortlist: TNCollege[];
  onRemove: (id: string) => void;
  onOpenBooking: () => void;
  onViewCollege: (college: TNCollege) => void;
}

export const ShortlistDrawer: React.FC<ShortlistDrawerProps> = ({
  isOpen,
  onClose,
  shortlist,
  onRemove,
  onOpenBooking,
  onViewCollege
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300 border-l-2 border-slate-300">
        
        {/* Header */}
        <div className="p-6 border-b-2 border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-950">Your Saved Colleges</h3>
              <p className="text-xs text-slate-600 font-bold">{shortlist.length} colleges in choice shortlist</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-slate-950 hover:bg-slate-200 rounded-full transition-colors"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Shortlist Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {shortlist.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 border border-blue-200">
                <Bookmark className="w-8 h-8" />
              </div>
              <h4 className="text-base font-black text-slate-950 mb-1">No Colleges Shortlisted Yet</h4>
              <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto mb-6 font-medium">
                Browse our Tamil Nadu college directory across Engineering, Medical, and Arts to review your preferred options for counseling and admissions.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-slate-950 text-white text-xs font-black hover:bg-blue-600 transition-colors"
              >
                Browse Colleges Directory
              </button>
            </div>
          ) : (
            shortlist.map((college) => (
              <div
                key={college.id}
                className="bg-slate-50 rounded-2xl p-4 border-2 border-slate-200 shadow-sm flex flex-col gap-3 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={college.image}
                      alt={college.name}
                      className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = getStreamFallbackImage(college.stream);
                      }}
                    />
                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className={`text-[9px] px-1.5 py-0.2 rounded font-black uppercase text-white ${
                          college.stream === 'medical'
                            ? 'bg-emerald-600'
                            : college.stream === 'arts-science'
                            ? 'bg-purple-600'
                            : 'bg-blue-600'
                        }`}>
                          {college.stream === 'medical' ? 'Medical' : college.stream === 'arts-science' ? 'Arts & Sci' : 'Engineering'}
                        </span>
                      </div>
                      <h4 className="text-sm font-black text-slate-950 line-clamp-1">{college.name}</h4>
                      <p className="text-xs text-slate-600 font-bold flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-blue-600" />
                        {college.city}, {college.district}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemove(college.id)}
                    className="text-slate-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                    title="Remove from shortlist"
                    aria-label="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-slate-200">
                  <div className="bg-white px-2.5 py-1.5 rounded-lg border border-slate-200">
                    <span className="text-slate-500 font-extrabold block">
                      {college.stream === 'medical' ? 'NEET Cutoff' : college.stream === 'arts-science' ? 'Merit' : 'TNEA Cutoff'}
                    </span>
                    <span className="font-black text-blue-700 truncate block">
                      {college.stream === 'medical'
                        ? (college.neetCutoffGeneral ? `${college.neetCutoffGeneral} M` : 'NEET UG')
                        : college.stream === 'arts-science'
                        ? (college.meritCutoffPercentage || '85%+ Merit')
                        : (college.tneaCutoffGeneral || 'Check Counselling')}
                    </span>
                  </div>
                  <div className="bg-white px-2.5 py-1.5 rounded-lg border border-slate-200">
                    <span className="text-slate-500 font-extrabold block">Highest CTC</span>
                    <span className="font-black text-emerald-700 truncate block">{college.placements.highestPackage}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onViewCollege(college);
                  }}
                  className="w-full text-center text-xs font-black text-blue-700 hover:text-blue-900 py-1"
                >
                  View Cutoffs & Programs →
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {shortlist.length > 0 && (
          <div className="p-6 border-t-2 border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>Shortlisted Colleges</span>
              <span className="font-black text-slate-950">{shortlist.length} Institutes</span>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="w-full py-3.5 px-4 rounded-xl font-black text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 text-sm transition-all"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book TNEA Choice Filling Review</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
