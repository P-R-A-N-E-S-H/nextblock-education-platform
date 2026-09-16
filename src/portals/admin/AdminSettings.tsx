import React from 'react';
import { 
  Settings, 
  ShieldCheck, 
  MessageSquare, 
  Bell, 
  Lock, 
  Database, 
  Save, 
  CheckCircle2,
  Mail,
  Send,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { 
  RECIPIENT_EMAIL, 
  sendEnquiryLeadEmail, 
  generateOwnerBookingWhatsAppUrl, 
  ADMISSIONS_HELPLINE_PHONE, 
  OWNER_WHATSAPP_NUMBER 
} from '../../services/emailService';

export const AdminSettings: React.FC = () => {
  const { addToast } = useApp();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({
      id: Date.now().toString(),
      title: 'Platform Settings Saved ✓',
      message: 'Notification triggers, Lead Routing & RBAC policies updated.',
      type: 'success'
    });
  };

  const handleTestEmailDispatch = async () => {
    addToast({
      id: Date.now().toString(),
      title: 'Sending Test Lead Email...',
      message: `Dispatched test payload to ${RECIPIENT_EMAIL}`,
      type: 'info'
    });
    await sendEnquiryLeadEmail({
      name: 'Test Student Lead',
      phone: '+91 93854 65849',
      email: 'test.student@example.com',
      district: 'Coimbatore',
      pcmCutoff: '194.50',
      interestedBranch: 'Computer Science (CSE)',
      message: 'This is an automated test lead from the Admin Settings panel.',
      source: 'Admin Diagnostics Test'
    });
    addToast({
      id: Date.now().toString(),
      title: 'Test Email Dispatched ✓',
      message: `Successfully sent test lead email to ${RECIPIENT_EMAIL}`,
      type: 'success'
    });
  };

  const handleTestWhatsAppAlert = () => {
    const testUrl = generateOwnerBookingWhatsAppUrl({
      name: 'Dr. Shanmugam (Test Student)',
      phone: '9385465849',
      email: 'admissions@nextblock.org',
      district: 'Coimbatore',
      pcmCutoff: '196.50',
      interestedBranch: 'Computer Science & AI',
      targetCategory: 'Tier-1 Autonomous (PSG / CIT / SSN)',
      preferredDate: '2026-05-25',
      preferredTimeSlot: '4:00 PM – 5:00 PM (Evening)',
      counsellingMode: 'Google Meet Video Call',
      message: 'Test diagnostics booking message',
      leadId: 'TNEA-TEST-001'
    });
    window.open(testUrl, '_blank');
    addToast({
      id: Date.now().toString(),
      title: 'WhatsApp Alert Opened! 💬',
      message: `Pre-filled booking alert opened for WhatsApp (+91 ${OWNER_WHATSAPP_NUMBER}).`,
      type: 'success'
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-slate-900 p-6 rounded-3xl border-2 border-slate-800">
        <span className="text-xs font-black uppercase tracking-wider text-cyan-400 block mb-1">
          SYSTEM CONFIGURATION
        </span>
        <h2 className="text-2xl font-black text-white">Platform Settings & Notifications</h2>
        <p className="text-xs text-slate-400 mt-0.5">Manage automated notification triggers, lead routing to {RECIPIENT_EMAIL}, and role access</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Lead Email Forwarding & Central Mailbox */}
        <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border-2 border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-cyan-400" />
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider text-white">
                  Lead Routing & Admissions Inbox
                </h3>
                <p className="text-[11px] text-slate-400">All student enquiries & booking requests are mailed in real-time</p>
              </div>
            </div>
            <span className="text-[11px] font-black px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live & Active
            </span>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Primary Destination Mailbox:</span>
              <span className="text-sm font-black text-cyan-300 font-mono block mt-0.5">{RECIPIENT_EMAIL}</span>
              <p className="text-[11px] text-slate-400 mt-1">
                Receives full student dossier (Cutoff, Target Branch, District, Phone & Query).
              </p>
            </div>
            <button
              type="button"
              onClick={handleTestEmailDispatch}
              className="px-4 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-cyan-300 hover:text-white border border-blue-500/40 text-xs font-bold transition-all shrink-0 flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Test Lead</span>
            </button>
          </div>
        </div>
        
        {/* Automated WhatsApp Notifications */}
        <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border-2 border-slate-800 space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <MessageSquare className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-black uppercase tracking-wider text-white">
              WhatsApp Business & SMS Automated Alerts
            </h3>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 block">WhatsApp Alert Destination Phone:</span>
              <span className="text-sm font-black text-emerald-400 font-mono block mt-0.5">+91 {OWNER_WHATSAPP_NUMBER}</span>
              <p className="text-[11px] text-slate-400 mt-1">
                Every 1-on-1 booking & enquiry lead creates an instant WhatsApp message to this number.
              </p>
            </div>
            <button
              type="button"
              onClick={handleTestWhatsAppAlert}
              className="px-4 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/40 text-xs font-bold transition-all shrink-0 flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Test WhatsApp Alert</span>
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-950 border border-slate-800 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-blue-600 bg-slate-900 border-slate-700" />
              <div>
                <span className="font-bold text-white block">TNEA Choice Filling Window Alerts</span>
                <span className="text-[11px] text-slate-400">Send WhatsApp reminder 24h prior to Round 1 choice locking</span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-950 border border-slate-800 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-blue-600 bg-slate-900 border-slate-700" />
              <div>
                <span className="font-bold text-white block">1-on-1 Counselling Google Meet Calendar Invite</span>
                <span className="text-[11px] text-slate-400">Instantly SMS video link to student and parent mobile upon booking</span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-950 border border-slate-800 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-blue-600 bg-slate-900 border-slate-700" />
              <div>
                <span className="font-bold text-white block">Certificate Verification Status Notifications</span>
                <span className="text-[11px] text-slate-400">Alert student when advisor approves or flags document for re-upload</span>
              </div>
            </label>
          </div>
        </div>

        {/* Security & Access */}
        <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border-2 border-slate-800 space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <Lock className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-black uppercase tracking-wider text-white">
              Role-Based Access Control (RBAC)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <h4 className="font-black text-white mb-1">Student Role</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Access restricted strictly to own academic dossier, applications, and saved choices.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <h4 className="font-black text-white mb-1">Counsellor Role</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Access to assigned leads, certificate verification queue, and recommendation builder.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <h4 className="font-black text-white mb-1">Admin Role</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Full CRUD control over 50+ college records, lead allocation, and system analytics.
              </p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save System Settings</span>
        </button>

      </form>

    </div>
  );
};
