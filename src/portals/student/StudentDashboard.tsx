import React from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  CalendarCheck, 
  FileText, 
  UploadCloud, 
  Bookmark, 
  ExternalLink, 
  Clock, 
  AlertCircle,
  Video,
  Award,
  Layers
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface StudentDashboardProps {
  onNavigate: (tab: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ onNavigate }) => {
  const { studentProfile, applications, documents, savedCollegeIds, sessions } = useApp();

  const upcomingSession = sessions.find((s) => s.status === 'Scheduled');
  const verifiedDocsCount = documents.filter((d) => d.status === 'Verified').length;

  const journeyBlocks = [
    { name: 'DISCOVER', status: 'completed', label: 'Cutoff 194.50' },
    { name: 'DECIDE', status: 'completed', label: 'CSE / AI-DS' },
    { name: 'SHORTLIST', status: 'current', label: '3 Saved Colleges' },
    { name: 'APPLY', status: 'upcoming', label: 'TNEA Round 1' },
    { name: 'ADMIT', status: 'upcoming', label: 'Upward Move' },
    { name: 'ACHIEVE', status: 'upcoming', label: '₹15L+ Tech CTC' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-900/90 via-slate-900 to-slate-950 p-6 sm:p-8 rounded-3xl border-2 border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-black uppercase tracking-wider mb-2 border border-cyan-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>TNEA 2026 Aspirant Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Welcome back, {studentProfile.name.split(' ')[0]}! 🚀
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">
              Your 12th PCM Cutoff of <strong className="text-cyan-400 font-black">{studentProfile.pcmCutoff}</strong> qualifies you for Tier-1 Autonomous & Government colleges in Round 1.
            </p>
          </div>

          <button
            onClick={() => onNavigate('sessions')}
            className="shrink-0 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Book Strategy Call</span>
          </button>
        </div>
      </div>

      {/* 6-Block Visual Journey Progress */}
      <div className="bg-slate-900 rounded-3xl p-6 border-2 border-slate-800 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-black uppercase tracking-wider text-slate-400">
            YOUR NEXTBLOCK JOURNEY PROGRESSION
          </span>
          <span className="text-xs font-bold text-cyan-400">Step 3 of 6 (Shortlist Stage)</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
          {journeyBlocks.map((block, idx) => (
            <div
              key={block.name}
              className={`p-3 rounded-2xl border-2 text-center transition-all ${
                block.status === 'completed'
                  ? 'bg-blue-600/20 border-blue-500 text-white'
                  : block.status === 'current'
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 ring-2 ring-cyan-400/20'
                  : 'bg-slate-950/60 border-slate-800 text-slate-500'
              }`}
            >
              <div className="flex items-center justify-center gap-1 mb-1">
                {block.status === 'completed' ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <span className="text-[10px] font-mono font-bold">{idx + 1}</span>
                )}
                <span className="text-xs font-black">{block.name}</span>
              </div>
              <p className="text-[10px] font-semibold truncate">{block.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div 
          onClick={() => onNavigate('profile')}
          className="bg-slate-900 p-5 rounded-3xl border-2 border-slate-800 cursor-pointer hover:border-blue-500 transition-all"
        >
          <span className="text-[10px] font-extrabold uppercase text-slate-400 block">PCM Cutoff</span>
          <p className="text-2xl sm:text-3xl font-black text-cyan-400 my-1">{studentProfile.pcmCutoff}</p>
          <span className="text-[10px] text-slate-400">Out of 200 Marks</span>
        </div>

        <div 
          onClick={() => onNavigate('applications')}
          className="bg-slate-900 p-5 rounded-3xl border-2 border-slate-800 cursor-pointer hover:border-blue-500 transition-all"
        >
          <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Applications</span>
          <p className="text-2xl sm:text-3xl font-black text-white my-1">{applications.length}</p>
          <span className="text-[10px] text-emerald-400 font-bold">{applications.filter(a => a.status === 'Submitted').length} Submitted</span>
        </div>

        <div 
          onClick={() => onNavigate('documents')}
          className="bg-slate-900 p-5 rounded-3xl border-2 border-slate-800 cursor-pointer hover:border-blue-500 transition-all"
        >
          <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Verified Docs</span>
          <p className="text-2xl sm:text-3xl font-black text-emerald-400 my-1">{verifiedDocsCount} / {documents.length}</p>
          <span className="text-[10px] text-slate-400 font-bold">In Secure Vault</span>
        </div>

        <div 
          onClick={() => onNavigate('shortlist')}
          className="bg-slate-900 p-5 rounded-3xl border-2 border-slate-800 cursor-pointer hover:border-blue-500 transition-all"
        >
          <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Saved Colleges</span>
          <p className="text-2xl sm:text-3xl font-black text-blue-400 my-1">{savedCollegeIds.length}</p>
          <span className="text-[10px] text-slate-400 font-bold">Top Choices</span>
        </div>
      </div>

      {/* Upcoming Session Notification Card */}
      {upcomingSession && (
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 rounded-3xl border-2 border-cyan-500/40 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shrink-0">
              <Video className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                Upcoming Strategy Session
              </span>
              <h4 className="text-base font-black text-white mt-1">{upcomingSession.sessionType}</h4>
              <p className="text-xs text-slate-300 font-medium mt-0.5">
                📅 {upcomingSession.date} at {upcomingSession.timeSlot} • with <strong>{upcomingSession.counsellorName}</strong>
              </p>
            </div>
          </div>

          {upcomingSession.meetingLink && (
            <a
              href={upcomingSession.meetingLink}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-colors flex items-center gap-1.5 shadow-md"
            >
              <span>Join Google Meet</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      )}

      {/* Recent Applications Preview */}
      <div className="bg-slate-900 rounded-3xl p-6 border-2 border-slate-800">
        <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
          <h3 className="text-base font-black text-white">Active College Applications</h3>
          <button
            onClick={() => onNavigate('applications')}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <span>View All Applications</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {applications.map((app) => (
            <div
              key={app.id}
              className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  {app.tneaCode && (
                    <span className="text-[10px] font-black px-2 py-0.5 rounded bg-blue-600 text-white">
                      TNEA {app.tneaCode}
                    </span>
                  )}
                  <h4 className="text-sm font-black text-white">{app.collegeName}</h4>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{app.branch} • {app.admissionRoute}</p>
                <p className="text-[11px] text-cyan-300 font-bold mt-1">Next: {app.nextAction}</p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs font-black px-3 py-1 rounded-full bg-slate-800 text-cyan-300 border border-slate-700">
                  {app.status}
                </span>
                <p className="text-[10px] text-slate-500 font-semibold mt-1">Deadline: {app.submissionDeadline}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
