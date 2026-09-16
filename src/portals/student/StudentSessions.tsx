import React, { useState } from 'react';
import { 
  CalendarCheck, 
  Video, 
  Phone, 
  MapPin, 
  Clock, 
  ExternalLink, 
  Plus, 
  X, 
  CheckCircle2,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CounsellingSession } from '../../types';
import { 
  sendEnquiryLeadEmail, 
  generateOwnerBookingWhatsAppUrl, 
  RECIPIENT_EMAIL 
} from '../../services/emailService';

export const StudentSessions: React.FC = () => {
  const { sessions, scheduleSession, counsellors, studentProfile, addToast } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sessionType, setSessionType] = useState<CounsellingSession['sessionType']>('TNEA Choice Filling Strategy');
  const [mode, setMode] = useState<CounsellingSession['mode']>('Google Meet (Video)');
  const [date, setDate] = useState('2026-05-24');
  const [timeSlot, setTimeSlot] = useState('4:00 PM – 5:00 PM');
  const [selectedCounsellorId, setSelectedCounsellorId] = useState(counsellors[0]?.id || '');

  const handleSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    const counsellor = counsellors.find((c) => c.id === selectedCounsellorId) || counsellors[0];
    const sessionRef = `TNEA-SES-${Math.floor(100000 + Math.random() * 900000)}`;

    scheduleSession({
      studentId: studentProfile.id,
      studentName: studentProfile.name,
      studentPhone: studentProfile.phone,
      counsellorId: counsellor.id,
      counsellorName: counsellor.name,
      sessionType,
      mode,
      date,
      timeSlot,
      counsellorNotes: 'Student requested personalized 1-on-1 strategy meeting.'
    });

    const leadPayload = {
      name: studentProfile.name,
      phone: studentProfile.phone,
      email: studentProfile.email,
      district: studentProfile.district,
      pcmCutoff: studentProfile.pcmCutoff,
      interestedBranch: studentProfile.targetBranch,
      preferredDate: date,
      preferredTimeSlot: timeSlot,
      counsellingMode: mode,
      message: `Student portal session with ${counsellor.name}: ${sessionType}`,
      source: 'Student Portal Session Booking',
      leadId: sessionRef
    };

    // 1. Email notification
    sendEnquiryLeadEmail(leadPayload).catch((err) => console.warn('Session email dispatch:', err));

    // 2. Owner WhatsApp alert URL
    const waUrl = generateOwnerBookingWhatsAppUrl(leadPayload);
    try {
      window.open(waUrl, '_blank');
    } catch (err) {
      console.log('WhatsApp open deferred:', err);
    }

    addToast({
      id: Date.now().toString(),
      title: 'Session Scheduled! 🗓️',
      message: `Confirmed with ${counsellor.name} for ${date}. WhatsApp alert sent to Admissions Desk (+91 93854 65849).`,
      type: 'success'
    });

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border-2 border-slate-800">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-cyan-400 block mb-1">
            1-ON-1 ADVISORY MEETINGS
          </span>
          <h2 className="text-2xl font-black text-white">Counselling Sessions</h2>
          <p className="text-xs text-slate-400 mt-0.5">Live video consultations and in-person center appointments</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Book New Session</span>
        </button>
      </div>

      {/* Sessions Grid */}
      <div className="space-y-4">
        {sessions.map((ses) => (
          <div
            key={ses.id}
            className="bg-slate-900 rounded-3xl p-6 border-2 border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/30 text-cyan-400 flex items-center justify-center font-bold shrink-0 border border-blue-500/40">
                {ses.mode.includes('Video') ? <Video className="w-6 h-6" /> : <Phone className="w-6 h-6" />}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-black text-white">{ses.sessionType}</h3>
                  <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                    ses.status === 'Scheduled'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}>
                    {ses.status}
                  </span>
                </div>

                <p className="text-xs text-slate-300 font-medium">
                  Advisor: <strong className="text-white">{ses.counsellorName}</strong> • {ses.mode}
                </p>

                <div className="flex items-center gap-3 text-xs text-slate-400 mt-2">
                  <span className="flex items-center gap-1 font-bold text-cyan-300">
                    <Clock className="w-3.5 h-3.5" /> {ses.date} at {ses.timeSlot}
                  </span>
                </div>

                {ses.counsellorNotes && (
                  <p className="text-[11px] text-slate-400 mt-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    📝 <strong>Advisor Notes:</strong> {ses.counsellorNotes}
                  </p>
                )}
              </div>
            </div>

            {ses.meetingLink && ses.status === 'Scheduled' && (
              <a
                href={ses.meetingLink}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-all flex items-center gap-1.5 shadow-md"
              >
                <span>Join Google Meet</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl max-w-md w-full p-6 sm:p-8 text-white relative shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-white mb-4">Schedule Counselling Session</h3>

            <form onSubmit={handleSchedule} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-300 block mb-1">Select Advisor *</label>
                <select
                  value={selectedCounsellorId}
                  onChange={(e) => setSelectedCounsellorId(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border-2 border-slate-700 font-bold text-white focus:outline-none focus:border-blue-500"
                >
                  {counsellors.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.specialization})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Session Agenda *</label>
                <select
                  value={sessionType}
                  onChange={(e) => setSessionType(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border-2 border-slate-700 font-bold text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="TNEA Choice Filling Strategy">TNEA Choice Filling Strategy (50+ Choices)</option>
                  <option value="College Cutoff Diagnostic">College Cutoff & Rank Diagnostic</option>
                  <option value="7.5% Govt School Aid & FG Review">7.5% Govt School & First Graduate Aid Review</option>
                  <option value="Career & Branch Mapping">Career & Branch Mapping (CSE vs AI vs ECE)</option>
                  <option value="Study Abroad Roadmap">Study Abroad Master’s Roadmap</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Mode *</label>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border-2 border-slate-700 font-bold text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Google Meet (Video)">Google Meet Video Call</option>
                  <option value="Phone Call">Direct Phone Call</option>
                  <option value="In-Person (Coimbatore Office)">In-Person (Coimbatore Regional Hub)</option>
                  <option value="In-Person (Chennai Office)">In-Person (Chennai Guindy HQ)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border-2 border-slate-700 font-bold text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Time Slot *</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border-2 border-slate-700 font-bold text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="10:00 AM – 11:00 AM">10:00 AM – 11:00 AM</option>
                    <option value="2:00 PM – 3:00 PM">2:00 PM – 3:00 PM</option>
                    <option value="4:00 PM – 5:00 PM">4:00 PM – 5:00 PM</option>
                    <option value="6:00 PM – 7:00 PM">6:00 PM – 7:00 PM</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-black text-xs text-white shadow-lg shadow-blue-500/30"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
