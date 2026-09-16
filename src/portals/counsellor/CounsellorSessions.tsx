import React, { useState } from 'react';
import { 
  CalendarCheck, 
  Video, 
  Phone, 
  Clock, 
  ExternalLink, 
  CheckCircle2, 
  Plus, 
  Save, 
  User 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CounsellorSessions: React.FC = () => {
  const { sessions, updateSessionStatus } = useApp();
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [notesInput, setNotesInput] = useState('');

  const handleSaveNotes = (sessionId: string) => {
    updateSessionStatus(sessionId, 'Completed', notesInput);
    setSelectedSessionId(null);
    setNotesInput('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-slate-900 p-6 rounded-3xl border-2 border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-cyan-400 block mb-1">
            COUNSELLOR CALENDAR & APPOINTMENTS
          </span>
          <h2 className="text-2xl font-black text-white">Daily Consultation Schedule</h2>
          <p className="text-xs text-slate-400 mt-0.5">Manage 1-on-1 strategy sessions and log choice order decisions</p>
        </div>

        <span className="text-xs font-black px-3 py-1.5 rounded-full bg-blue-500/20 text-cyan-300 border border-blue-500/30">
          {sessions.filter(s => s.status === 'Scheduled').length} Upcoming Today
        </span>
      </div>

      {/* Sessions List */}
      <div className="space-y-4">
        {sessions.map((ses) => (
          <div
            key={ses.id}
            className="bg-slate-900 rounded-3xl p-6 border-2 border-slate-800 hover:border-slate-700 transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/30 text-cyan-400 flex items-center justify-center font-bold">
                  {ses.mode.includes('Video') ? <Video className="w-5 h-5" /> : <Phone className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="text-sm font-black text-white">{ses.studentName}</h4>
                  <p className="text-xs text-slate-400">📞 {ses.studentPhone} • {ses.sessionType}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-xs font-black px-3 py-1 rounded-full ${
                  ses.status === 'Scheduled'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {ses.status}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
              <div className="space-y-1">
                <p className="text-slate-300">
                  🕒 <strong>Date & Time:</strong> {ses.date} at {ses.timeSlot}
                </p>
                <p className="text-slate-300">
                  📍 <strong>Mode:</strong> {ses.mode}
                </p>
                {ses.counsellorNotes && (
                  <p className="text-cyan-300 font-medium bg-slate-950 p-2.5 rounded-xl border border-slate-800 mt-2">
                    📝 <strong>Logged Notes:</strong> {ses.counsellorNotes}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {ses.meetingLink && (
                  <a
                    href={ses.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-colors flex items-center gap-1.5"
                  >
                    <span>Launch Google Meet</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                {ses.status === 'Scheduled' && (
                  <button
                    onClick={() => {
                      setSelectedSessionId(ses.id);
                      setNotesInput(ses.counsellorNotes || '');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors"
                  >
                    Log Notes & Complete
                  </button>
                )}
              </div>
            </div>

            {/* Notes Input Drawer */}
            {selectedSessionId === ses.id && (
              <div className="mt-4 pt-4 border-t border-slate-800 bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <label className="font-bold text-xs text-white block">Log Strategy Decisions & Recommendations:</label>
                <textarea
                  rows={2}
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  placeholder="e.g. Advised PSG Tech Robotics as 1st choice, CIT CSE as 2nd choice. Student agreed to select upward movement in Round 1."
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-white focus:outline-none"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setSelectedSessionId(null)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSaveNotes(ses.id)}
                    className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center gap-1"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save & Mark Completed</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        ))}
      </div>

    </div>
  );
};
