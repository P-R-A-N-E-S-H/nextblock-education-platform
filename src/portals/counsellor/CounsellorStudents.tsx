import React from 'react';
import { 
  Users, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  ShieldCheck, 
  MapPin, 
  GraduationCap, 
  Award,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CounsellorStudents: React.FC = () => {
  const { studentProfile, documents, verifyDocument, applications } = useApp();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-slate-900 p-6 rounded-3xl border-2 border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-cyan-400 block mb-1">
            STUDENT DOSSIER & CERTIFICATE AUDIT
          </span>
          <h2 className="text-2xl font-black text-white">Assigned Student Profiles</h2>
          <p className="text-xs text-slate-400 mt-0.5">Review academic credentials, bonafide proofs, and TNEA choice sequences</p>
        </div>

        <span className="text-xs font-black px-3.5 py-1.5 rounded-full bg-blue-500/20 text-cyan-300 border border-blue-500/30">
          Primary Dossier: {studentProfile.name}
        </span>
      </div>

      {/* Student Profile Card */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-slate-800 space-y-6">
        
        {/* Top Info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-lg">
              {studentProfile.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white">{studentProfile.name}</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                  {studentProfile.id}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                📞 {studentProfile.phone} • ✉️ {studentProfile.email} • 📍 {studentProfile.district}
              </p>
            </div>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 text-right">
            <span className="text-[10px] font-extrabold uppercase text-slate-400 block">TNEA PCM Cutoff</span>
            <span className="text-2xl font-black text-cyan-400 block">{studentProfile.pcmCutoff} / 200</span>
            <span className="text-[10px] text-emerald-400 font-bold">Round 1 Tier-1 Eligible</span>
          </div>
        </div>

        {/* Marks & Quotas Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Maths (100)</span>
            <span className="text-lg font-black text-white">{studentProfile.maths}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Physics (100)</span>
            <span className="text-lg font-black text-white">{studentProfile.physics}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Chemistry (100)</span>
            <span className="text-lg font-black text-white">{studentProfile.chemistry}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Community Quota</span>
            <span className="text-xs font-black text-cyan-300 truncate block mt-1">{studentProfile.category}</span>
          </div>
        </div>

        {/* Certificate Verification Queue */}
        <div>
          <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-3">
            Certificate Verification Action Queue ({documents.length} Documents)
          </h4>

          <div className="space-y-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-cyan-400 shrink-0" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="text-xs font-black text-white">{doc.documentType}</h5>
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                        doc.status === 'Verified'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : doc.status === 'Under Review'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {doc.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">{doc.fileName}</p>
                    {doc.verificationNotes && (
                      <p className="text-[10px] text-slate-300 mt-1">Note: {doc.verificationNotes}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => verifyDocument(doc.id, 'Verified', 'Verified by Dr. R. Shanmugam. Ready for TFC locking.')}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white text-xs font-bold border border-emerald-500/40 transition-colors flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verify & Approve</span>
                  </button>
                  <button
                    onClick={() => verifyDocument(doc.id, 'Rejected', 'Certificate seal unclear. Please re-upload high res scan.')}
                    className="px-3 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white text-xs font-bold border border-red-500/40 transition-colors flex items-center gap-1"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Request Re-upload</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
