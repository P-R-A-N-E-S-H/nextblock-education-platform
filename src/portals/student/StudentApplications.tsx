import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowRight, 
  X, 
  Building2, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StudentApplications: React.FC = () => {
  const { applications, addApplication, updateApplicationStatus, colleges } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCollegeId, setSelectedCollegeId] = useState(colleges[0]?.id || '');
  const [branch, setBranch] = useState('B.E. Computer Science & Engineering');
  const [route, setRoute] = useState<'TNEA Single Window' | 'Management Quota' | 'Institutional Entrance' | '7.5% Govt Quota'>('TNEA Single Window');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const college = colleges.find((c) => c.id === selectedCollegeId);
    if (!college) return;

    addApplication({
      studentId: 'STU-2026-8842',
      studentName: 'Kaviya Sundaram',
      collegeId: college.id,
      collegeName: college.name,
      tneaCode: college.tneaCode,
      branch,
      applicationNumber: `APP-${Math.floor(100000 + Math.random() * 900000)}`,
      admissionRoute: route,
      status: 'In Progress',
      submissionDeadline: '2026-06-20',
      assignedCounsellor: 'Dr. R. Shanmugam',
      nextAction: 'Upload 12th Board Marksheet for Verification'
    });

    setIsModalOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Submitted':
        return 'bg-blue-600 text-white';
      case 'Under Review':
        return 'bg-amber-500 text-slate-950 font-black';
      case 'Accepted':
      case 'Offer Received':
        return 'bg-emerald-500 text-slate-950 font-black';
      default:
        return 'bg-slate-800 text-cyan-300 border border-slate-700';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border-2 border-slate-800">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-cyan-400 block mb-1">
            APPLICATION LIFECYCLE MANAGEMENT
          </span>
          <h2 className="text-2xl font-black text-white">My College Applications</h2>
          <p className="text-xs text-slate-400 mt-0.5">Track admission stages, deadlines, and counsellor actions</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Track New Application</span>
        </button>
      </div>

      {/* Applications Cards Grid */}
      <div className="space-y-4">
        {applications.map((app) => (
          <div
            key={app.id}
            className="bg-slate-900 rounded-3xl p-6 border-2 border-slate-800 hover:border-blue-500/80 transition-all space-y-4 shadow-lg"
          >
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                {app.tneaCode && (
                  <span className="text-xs font-black px-2.5 py-1 rounded-md bg-blue-600 text-white shadow-xs">
                    TNEA Code: {app.tneaCode}
                  </span>
                )}
                <span className="text-xs font-mono font-bold text-slate-400">{app.applicationNumber}</span>
              </div>

              <span className={`text-xs font-black px-3.5 py-1 rounded-full ${getStatusBadge(app.status)}`}>
                {app.status}
              </span>
            </div>

            {/* Content Details */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-8">
                <h3 className="text-lg font-black text-white">{app.collegeName}</h3>
                <p className="text-xs font-bold text-cyan-300 mt-0.5">{app.branch}</p>
                <p className="text-xs text-slate-400 mt-1">
                  Route: <strong>{app.admissionRoute}</strong> • Assigned Advisor: <strong>{app.assignedCounsellor}</strong>
                </p>

                <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2 text-xs text-slate-300">
                  <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span><strong>Next Step:</strong> {app.nextAction}</span>
                </div>
              </div>

              <div className="md:col-span-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Deadline</span>
                <p className="text-sm font-black text-white">{app.submissionDeadline}</p>
                
                <div className="flex items-center justify-center gap-2 pt-1">
                  <button
                    onClick={() => updateApplicationStatus(app.id, 'Submitted')}
                    className="px-3 py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600 text-white text-[11px] font-bold border border-blue-500/50"
                  >
                    Mark Submitted
                  </button>
                  <button
                    onClick={() => updateApplicationStatus(app.id, 'Offer Received')}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white text-[11px] font-bold border border-emerald-500/50"
                  >
                    Offer Got!
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal to Track New Application */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-white relative shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-white mb-4">Track a New College Application</h3>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-300 block mb-1">Select Tamil Nadu College *</label>
                <select
                  value={selectedCollegeId}
                  onChange={(e) => setSelectedCollegeId(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border-2 border-slate-700 font-bold text-white focus:outline-none focus:border-blue-500"
                >
                  {colleges.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} {c.tneaCode ? `(TNEA ${c.tneaCode})` : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Target Engineering Branch *</label>
                <input
                  type="text"
                  required
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  placeholder="e.g. B.E. Computer Science & Engineering"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border-2 border-slate-700 font-bold text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Admission Pathway *</label>
                <select
                  value={route}
                  onChange={(e) => setRoute(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border-2 border-slate-700 font-bold text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="TNEA Single Window">TNEA Single Window Counselling</option>
                  <option value="7.5% Govt Quota">7.5% Govt School 100% Free Seat Scheme</option>
                  <option value="Management Quota">Management / Autonomous Quota</option>
                  <option value="Institutional Entrance">Institutional Merit Application</option>
                </select>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-black text-xs text-white shadow-lg shadow-blue-500/30"
                >
                  Confirm Application Tracking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
