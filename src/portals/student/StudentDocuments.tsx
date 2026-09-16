import React, { useState } from 'react';
import { 
  UploadCloud, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  FileText, 
  ShieldCheck, 
  Plus, 
  X,
  FileCheck,
  Download
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StudentDocument } from '../../types';

export const StudentDocuments: React.FC = () => {
  const { documents, uploadDocument } = useApp();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [docType, setDocType] = useState<StudentDocument['documentType']>('12th Marksheet');
  const [fileName, setFileName] = useState('');

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName) return;

    uploadDocument({
      studentId: 'STU-2026-8842',
      documentType: docType,
      fileName: fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`,
      fileSize: `${(Math.random() * 1.5 + 0.5).toFixed(1)} MB`
    });

    setFileName('');
    setIsUploadModalOpen(false);
  };

  const getStatusBadge = (status: StudentDocument['status']) => {
    switch (status) {
      case 'Verified':
        return 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40';
      case 'Under Review':
        return 'bg-amber-500/20 text-amber-300 border border-amber-500/40';
      case 'Rejected':
        return 'bg-red-500/20 text-red-300 border border-red-500/40';
      default:
        return 'bg-slate-800 text-slate-300 border border-slate-700';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border-2 border-slate-800">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-cyan-400 block mb-1">
            SECURE ADMISSION VAULT
          </span>
          <h2 className="text-2xl font-black text-white">Student Document Verification</h2>
          <p className="text-xs text-slate-400 mt-0.5">Pre-verified certificates for TFC centres and college enrollment</p>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload New Certificate</span>
        </button>
      </div>

      {/* Security Banner */}
      <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex items-center gap-3 text-xs text-slate-300">
        <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
        <span>
          <strong>256-bit Encrypted Storage:</strong> Your documents are reviewed exclusively by certified NEXTBLOCK TNEA counselors before submission to TFC centers.
        </span>
      </div>

      {/* Document Cards List */}
      <div className="space-y-3.5">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="bg-slate-900 rounded-2xl p-5 border-2 border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400 shrink-0 font-bold">
                <FileText className="w-6 h-6" />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <h4 className="text-sm font-black text-white">{doc.documentType}</h4>
                  <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${getStatusBadge(doc.status)}`}>
                    {doc.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono">{doc.fileName} • {doc.fileSize}</p>
                {doc.verificationNotes && (
                  <p className="text-[11px] text-cyan-300 font-medium mt-1">
                    ✓ Advisor Note: {doc.verificationNotes}
                  </p>
                )}
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[10px] font-semibold text-slate-500 block">Uploaded on {doc.uploadDate}</span>
              {doc.verifiedBy && (
                <span className="text-[10px] font-bold text-emerald-400 block mt-0.5">
                  Verified by {doc.verifiedBy}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl max-w-md w-full p-6 sm:p-8 text-white relative shadow-2xl">
            <button
              onClick={() => setIsUploadModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-white mb-4">Upload Document to Vault</h3>

            <form onSubmit={handleUpload} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-300 block mb-1">Document Category *</label>
                <select
                  value={docType}
                  onChange={(e) => setDocType(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border-2 border-slate-700 font-bold text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="12th Marksheet">12th Standard Board Marksheet</option>
                  <option value="10th Marksheet">10th Standard SSLC Marksheet</option>
                  <option value="Community Certificate">Community Certificate (BC/MBC/SC/ST)</option>
                  <option value="First Graduate Certificate">First Graduate (FG) Certificate</option>
                  <option value="7.5% Bonafide Certificate">7.5% Govt School Bonafide Certificate</option>
                  <option value="Nativity Certificate">Nativity Certificate</option>
                  <option value="Transfer Certificate (TC)">Transfer Certificate (TC)</option>
                  <option value="Entrance Scorecard">Entrance Scorecard (JEE / Other)</option>
                  <option value="Passport / ID Proof">Aadhaar Card / ID Proof</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">File Name / Label *</label>
                <input
                  type="text"
                  required
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="e.g. Kaviya_12th_StateBoard_Marksheet"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border-2 border-slate-700 font-bold text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="p-4 rounded-xl border-2 border-dashed border-slate-700 bg-slate-950/60 text-center">
                <UploadCloud className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <p className="text-slate-300 font-bold">Drag and drop file or click to select</p>
                <p className="text-[10px] text-slate-500 mt-1">PDF, JPG, PNG up to 10 MB</p>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-black text-xs text-white shadow-lg shadow-blue-500/30"
              >
                Upload & Request Verification
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
