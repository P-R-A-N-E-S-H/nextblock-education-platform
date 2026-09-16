import React, { useState, useId } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  MessageSquare,
  ShieldCheck,
  Loader2,
  ExternalLink,
  Award,
  Zap,
  HelpCircle,
  Copy,
  Check,
  Headphones,
  Calendar
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { triggerConfetti } from '../utils/helpers';
import { TN_DISTRICTS } from '../data/tamilNaduColleges';
import { 
  sendEnquiryLeadEmail, 
  RECIPIENT_EMAIL, 
  generateOwnerEnquiryWhatsAppUrl,
  generateWhatsAppChatUrl,
  ADMISSIONS_HELPLINE_PHONE,
  OWNER_WHATSAPP_NUMBER 
} from '../services/emailService';

const ENQUIRY_TYPES = [
  'TNEA 2026 Choice Filling Strategy',
  'Cutoff vs College Analysis',
  '7.5% Govt School 100% Free Seat Aid',
  'First Graduate (FG) Fee Waiver',
  'Management / Direct Seat Guidance',
  'College Comparison & Campus Review'
];

export const ContactPage: React.FC = () => {
  const { addLead, addToast } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    district: 'Coimbatore',
    academicLevel: '12th Standard (State Board / CBSE)',
    pcmCutoff: '192.00',
    interestedBranch: 'Computer Science (CSE)',
    enquiryType: 'TNEA 2026 Choice Filling Strategy',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedLeadId, setGeneratedLeadId] = useState('');
  const [copiedId, setCopiedId] = useState(false);
  const [ownerWhatsAppLink, setOwnerWhatsAppLink] = useState('');

  // Real-time Cutoff Intelligence Bracket
  const getCutoffInsight = (cutoffStr: string) => {
    const val = parseFloat(cutoffStr);
    if (isNaN(val)) return null;
    if (val >= 195) return { text: '🎯 Eligible for CEG, MIT Campus, PSG Tech (CSE / AI-DS)', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (val >= 188) return { text: '✨ Strong fit for CIT Coimbatore, SSN, KCT, SKCET, GCT', color: 'text-blue-700 bg-blue-50 border-blue-200' };
    if (val >= 170) return { text: '🚀 High probability for Top Autonomous Self-Financing Tier-1', color: 'text-indigo-700 bg-indigo-50 border-indigo-200' };
    return { text: '📘 Need curated 50+ Choice Order for Round 2 & 3 upward shifts', color: 'text-amber-700 bg-amber-50 border-amber-200' };
  };

  const cutoffInsight = getCutoffInsight(formData.pcmCutoff);

  // Determine Assigned Senior Counselor
  const getAssignedCounselor = (district: string) => {
    if (['Coimbatore', 'Tiruppur', 'Erode', 'Salem', 'Namakkal', 'Nilgiris'].includes(district)) {
      return {
        name: 'Dr. R. Shanmugam',
        title: 'Director of TNEA Choice Strategy (Coimbatore & Western Hub)',
        phone: '+91 93854 65849'
      };
    }
    if (['Chennai', 'Kanchipuram', 'Chengalpattu', 'Thiruvallur', 'Vellore'].includes(district)) {
      return {
        name: 'Mrs. Anitha Balaji',
        title: 'Senior Admission Strategist (Chennai & Northern Corridor)',
        phone: '+91 93854 65849'
      };
    }
    return {
      name: 'Mr. Vigneshwaran K.',
      title: 'Statewide Counselling Lead (Madurai / Trichy / Central TN)',
      phone: '+91 93854 65849'
    };
  };

  const assignedCounselor = getAssignedCounselor(formData.district);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    setIsSubmitting(true);
    const leadRef = `TNEA-ENQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedLeadId(leadRef);

    const emailToUse = formData.email || `${formData.name.toLowerCase().replace(/\s+/g, '')}@gmail.com`;

    const leadPayload = {
      name: formData.name,
      phone: formData.phone,
      email: emailToUse,
      city: formData.city || formData.district,
      district: formData.district,
      academicLevel: formData.academicLevel,
      pcmCutoff: formData.pcmCutoff,
      interestedBranch: formData.interestedBranch,
      enquiryType: formData.enquiryType,
      message: formData.message || 'Direct enquiry from contact form.',
      source: 'NEXTBLOCK Official Contact Page',
      leadId: leadRef
    };

    const waAlertUrl = generateOwnerEnquiryWhatsAppUrl(leadPayload);
    setOwnerWhatsAppLink(waAlertUrl);

    // 1. Add to in-app CRM pipeline
    addLead({
      name: formData.name,
      phone: formData.phone,
      email: emailToUse,
      city: formData.city || formData.district,
      district: formData.district,
      academicLevel: formData.academicLevel,
      pcmCutoff: parseFloat(formData.pcmCutoff) || 190.0,
      interestedBranch: formData.interestedBranch,
      targetColleges: ['Top Tier Autonomous', 'Govt Aided'],
      source: 'Direct Enquiry',
      status: 'New',
      priority: 'High',
      nextFollowUp: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      notes: [
        `[${formData.enquiryType}] ${formData.message || 'Direct enquiry submission from website contact form.'}`
      ]
    });

    // 2. Dispatch email to nextblock.educations@gmail.com
    await sendEnquiryLeadEmail(leadPayload);

    // 3. Auto-open WhatsApp notification to owner (+91 93854 65849)
    try {
      window.open(waAlertUrl, '_blank');
    } catch (err) {
      console.log('WhatsApp open deferred:', err);
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
    triggerConfetti();

    addToast({
      id: Date.now().toString(),
      title: 'Enquiry Received & WhatsApp Alert Prepared! 🚀',
      message: `Your consultation request (${leadRef}) has been sent to admissions WhatsApp (+91 93854 65849) & ${RECIPIENT_EMAIL}.`,
      type: 'success'
    });
  };

  const handleCopyLeadId = () => {
    if (generatedLeadId) {
      navigator.clipboard.writeText(generatedLeadId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
      addToast({
        id: Date.now().toString(),
        title: 'Lead ID Copied',
        message: `Copied ${generatedLeadId} to clipboard.`,
        type: 'info'
      });
    }
  };

  const offices = [
    {
      city: 'Chennai (Headquarters)',
      address: 'Block 4, Guindy Tech Park, Mount Road, Guindy, Chennai - 600032',
      phone: '+91 93854 65849',
      email: RECIPIENT_EMAIL,
      timing: 'Mon – Sat: 9:00 AM – 7:30 PM'
    },
    {
      city: 'Coimbatore Regional Hub',
      address: 'NEXTBLOCK Center, 4th Floor, Avinashi Road, Peelamedu, Coimbatore - 641004',
      phone: '+91 93854 65849',
      email: RECIPIENT_EMAIL,
      timing: 'Mon – Sat: 9:00 AM – 7:30 PM'
    },
    {
      city: 'Madurai Admissions Desk',
      address: '2nd Floor, 80 Feet Road, KK Nagar, Madurai - 625020',
      phone: '+91 93854 65849',
      email: RECIPIENT_EMAIL,
      timing: 'Mon – Sat: 9:30 AM – 6:30 PM'
    },
    {
      city: 'Tiruchirappalli Center',
      address: 'Vasanth Nagar, Main Road, Thillai Nagar, Tiruchirappalli - 620018',
      phone: '+91 93854 65849',
      email: RECIPIENT_EMAIL,
      timing: 'Mon – Sat: 9:30 AM – 6:30 PM'
    }
  ];

  return (
    <div className="py-20 bg-slate-50 relative overflow-hidden min-h-screen">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Badge & Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-black uppercase tracking-wider mb-4 shadow-xs">
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Official NEXTBLOCK Admissions & Enquiry Portal</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-950 tracking-tight leading-tight mb-4">
            LET'S PLAN YOUR <br />
            <span className="text-gradient">ENGINEERING ADMISSION.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal max-w-2xl mx-auto">
            Submit your cutoff and target branch below. Our senior strategists analyze your exact rank scenario and build your custom TNEA choice list.
          </p>

          {/* Official Verification Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-slate-700">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 shadow-xs">
              <Mail className="w-4 h-4 text-blue-600" />
              <span>Official Mailbox:</span>
              <a href={`mailto:${RECIPIENT_EMAIL}`} className="text-blue-700 hover:underline font-mono">
                {RECIPIENT_EMAIL}
              </a>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 shadow-xs">
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>Helpline:</span>
              <a href={`tel:${ADMISSIONS_HELPLINE_PHONE}`} className="text-emerald-700 font-bold">
                {ADMISSIONS_HELPLINE_PHONE}
              </a>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800">
              <Zap className="w-3.5 h-3.5 text-emerald-600" />
              <span>Average Callback: &lt; 45 Mins</span>
            </div>
          </div>
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 items-start">
          
          {/* Left Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-slate-200/90 shadow-xl shadow-slate-200/50">
              
              <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-2xl font-black text-slate-950 flex items-center gap-2">
                    Send Student Enquiry
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Leads are routed directly to <strong className="text-slate-900 font-mono">{RECIPIENT_EMAIL}</strong>
                  </p>
                </div>
                <span className="text-[11px] font-black text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  100% Free Initial Strategy
                </span>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Enquiry Category Pills */}
                  <div>
                    <label className="text-xs font-black text-slate-900 block mb-2">
                      I Need Guidance On *
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {ENQUIRY_TYPES.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, enquiryType: type })}
                          className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all border ${
                            formData.enquiryType === type
                              ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/20'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Student Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-black text-slate-900 block mb-1.5">
                        Student Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Senthil Nathan"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-200 text-xs font-bold text-slate-950 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-black text-slate-900 block mb-1.5">
                        Mobile / WhatsApp Number *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-black text-slate-500">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="94420 12345"
                          className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-200 text-xs font-bold text-slate-950 focus:outline-none focus:border-blue-600 focus:bg-white transition-all font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email & District */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-black text-slate-900 block mb-1.5">
                        Email Address (For Choice Order PDF)
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="senthil@gmail.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-200 text-xs font-bold text-slate-950 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-black text-slate-900 block mb-1.5">
                        District (Tamil Nadu) *
                      </label>
                      <select
                        value={formData.district}
                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                      >
                        {TN_DISTRICTS.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* 12th Cutoff & Preferred Branch */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-black text-slate-900 block mb-1.5">
                        12th PCM Cutoff (/200) *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.pcmCutoff}
                        onChange={(e) => setFormData({ ...formData, pcmCutoff: e.target.value })}
                        placeholder="e.g. 192.50"
                        className="w-full px-4 py-3 rounded-xl bg-blue-50/50 border-2 border-blue-300 text-xs font-black text-blue-800 focus:outline-none focus:border-blue-600 focus:bg-white transition-all font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-black text-slate-900 block mb-1.5">
                        Preferred Engineering Branch
                      </label>
                      <select
                        value={formData.interestedBranch}
                        onChange={(e) => setFormData({ ...formData, interestedBranch: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                      >
                        <option value="Computer Science (CSE)">Computer Science & Engg (CSE)</option>
                        <option value="AI & Data Science (AI/DS)">AI & Data Science (AI & DS)</option>
                        <option value="Information Technology (IT)">Information Technology (IT)</option>
                        <option value="Cybersecurity & Cloud">Cybersecurity & Cloud Systems</option>
                        <option value="Electronics & Comm (ECE)">Electronics & Comm (ECE)</option>
                        <option value="Electrical & Electronics (EEE)">Electrical & Electronics (EEE)</option>
                        <option value="Robotics & Automation">Robotics & Automation / Mechatronics</option>
                        <option value="Mechanical / Automobile">Mechanical / Automobile</option>
                        <option value="Biomedical / Biotechnology">Biomedical / Biotechnology</option>
                      </select>
                    </div>
                  </div>

                  {/* Dynamic Cutoff Insight Pill */}
                  {cutoffInsight && (
                    <div className={`p-3 rounded-xl border text-xs font-bold flex items-center gap-2 ${cutoffInsight.color}`}>
                      <Sparkles className="w-4 h-4 shrink-0" />
                      <span>{cutoffInsight.text}</span>
                    </div>
                  )}

                  {/* Message / Query */}
                  <div>
                    <label className="text-xs font-black text-slate-900 block mb-1.5">
                      Your Questions or Query (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Ask about PSG vs CIT comparison, 7.5% Govt school verification, First Graduate fee concession, or round 1 choice order..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-200 text-xs font-bold text-slate-950 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-75 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Mailing Dossier to {RECIPIENT_EMAIL}...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Free TNEA Counselling Request</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-slate-600 text-center font-medium">
                    🔒 Your details are 100% confidential. No spam or commercial sales calls.
                  </p>
                </form>
              ) : (
                /* Success Confirmation Screen */
                <div className="text-center py-8 animate-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 border-2 border-emerald-300 shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <span className="text-xs font-black uppercase tracking-widest text-emerald-700 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 inline-block mb-2">
                    Enquiry Forwarded to {RECIPIENT_EMAIL}
                  </span>

                  <h4 className="text-2xl sm:text-3xl font-black text-slate-950 mb-2">
                    ENQUIRY DISPATCHED! 🚀
                  </h4>

                  <p className="text-xs text-slate-600 max-w-md mx-auto mb-6 leading-relaxed font-medium">
                    Your complete student profile and enquiry details have been mailed to NEXTBLOCK Admissions at <strong className="text-blue-700 font-mono">{RECIPIENT_EMAIL}</strong>.
                  </p>

                  {/* Lead ID Box */}
                  <div className="bg-slate-900 text-white rounded-2xl p-4 max-w-md mx-auto mb-6 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Official Lead Reference:</span>
                      <span className="text-sm font-black text-cyan-400 font-mono">{generatedLeadId}</span>
                    </div>
                    <button
                      onClick={handleCopyLeadId}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1.5 transition-colors border border-slate-700"
                    >
                      {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  {/* Assigned Counselor Preview */}
                  <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 max-w-md mx-auto mb-4 text-left space-y-2">
                    <div className="flex items-center gap-2 text-xs font-black text-blue-950">
                      <Headphones className="w-4 h-4 text-blue-600" />
                      <span>Assigned Senior Strategist:</span>
                    </div>
                    <p className="text-sm font-black text-slate-950">{assignedCounselor.name}</p>
                    <p className="text-xs text-slate-600 font-medium">{assignedCounselor.title}</p>
                    <p className="text-xs text-emerald-700 font-bold pt-1 border-t border-blue-200">
                      ⚡ Calling you at <strong className="text-slate-900">{formData.phone}</strong> shortly.
                    </p>
                  </div>

                  {/* Direct WhatsApp Alert Notice to Owner */}
                  <div className="bg-emerald-50/80 border-2 border-emerald-300 rounded-2xl p-4 max-w-md mx-auto mb-6 text-left space-y-2.5 shadow-sm">
                    <div className="flex items-center gap-2 text-xs font-black text-emerald-950">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
                      <span>WhatsApp Notification to Admissions (+91 93854 65849):</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      Your enquiry details and cutoff bracket are formatted and ready to ping the admissions director on WhatsApp.
                    </p>
                    <a
                      href={ownerWhatsAppLink || generateOwnerEnquiryWhatsAppUrl({
                        name: formData.name,
                        phone: formData.phone,
                        email: formData.email,
                        district: formData.district,
                        pcmCutoff: formData.pcmCutoff,
                        interestedBranch: formData.interestedBranch,
                        enquiryType: formData.enquiryType,
                        message: formData.message,
                        leadId: generatedLeadId
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-500/30"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Send Enquiry to WhatsApp (+91 93854 65849)</span>
                    </a>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={`tel:${ADMISSIONS_HELPLINE_PHONE.replace(/\s+/g, '')}`}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-500/25"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call {ADMISSIONS_HELPLINE_PHONE}</span>
                    </a>

                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-950 hover:bg-slate-900 text-white text-xs font-black transition-colors"
                    >
                      Submit Another Query
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Right Column: Physical Centers & Helpline (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Helpline Banner */}
            <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-3xl p-6 border-2 border-blue-800 shadow-xl space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-black uppercase tracking-wider">
                <Zap className="w-4 h-4" />
                <span>Instant Phone Desk</span>
              </div>
              <h3 className="text-xl font-black text-white">
                Need Urgent Cutoff Advice?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect directly with our central counseling coordination desk in Guindy & Coimbatore.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <a
                  href={`tel:${ADMISSIONS_HELPLINE_PHONE}`}
                  className="px-4 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs text-center transition-colors shadow-md"
                >
                  Call {ADMISSIONS_HELPLINE_PHONE}
                </a>
                <a
                  href={`mailto:${RECIPIENT_EMAIL}`}
                  className="px-4 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white font-bold text-xs text-center border border-slate-700 transition-colors font-mono"
                >
                  Email Admissions
                </a>
              </div>
            </div>

            {/* Physical Walk-in Centers */}
            <div className="bg-slate-950 text-white rounded-3xl p-6 border-2 border-slate-800 shadow-xl space-y-4">
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-cyan-400" /> Physical Walk-in Centers
                </h3>
                <p className="text-xs text-slate-400 mt-1 font-normal">
                  In-person choice list verification and certificate authentication desks across Tamil Nadu:
                </p>
              </div>

              <div className="space-y-3.5">
                {offices.map((off, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1 text-xs hover:border-slate-700 transition-all">
                    <h4 className="font-black text-white flex items-center justify-between">
                      <span>{off.city}</span>
                      <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                        Open Today
                      </span>
                    </h4>
                    <p className="text-slate-300 font-normal leading-relaxed">{off.address}</p>
                    <p className="text-cyan-300 font-bold mt-1">📞 {off.phone}</p>
                    <p className="text-slate-400 text-[11px] flex items-center gap-1.5">
                      <Mail className="w-3 h-3 text-cyan-400" />
                      <a href={`mailto:${off.email}`} className="text-cyan-300 hover:underline font-mono">{off.email}</a>
                    </p>
                    <p className="text-[11px] text-slate-400">🕒 {off.timing}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
