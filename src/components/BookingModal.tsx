import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  GraduationCap, 
  MapPin, 
  Building2, 
  ShieldCheck, 
  CalendarCheck, 
  Rocket, 
  Calculator,
  Loader2
} from 'lucide-react';
import { BookingFormData, ToastMessage } from '../types';
import { triggerConfetti } from '../utils/helpers';
import { TN_DISTRICTS } from '../data/tamilNaduColleges';
import { useApp } from '../context/AppContext';
import { 
  sendEnquiryLeadEmail, 
  RECIPIENT_EMAIL, 
  generateOwnerBookingWhatsAppUrl,
  ADMISSIONS_HELPLINE_PHONE,
  OWNER_WHATSAPP_NUMBER,
  generateWhatsAppChatUrl 
} from '../services/emailService';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessToast?: (toast: ToastMessage) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  onSuccessToast
}) => {
  const { addLead, addToast } = useApp();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [ownerWhatsAppLink, setOwnerWhatsAppLink] = useState('');

  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    district: 'Coimbatore',
    currentEducation: '12th Standard (State Board / CBSE)',
    pcmCutoff: '190.50',
    interestedBranch: 'Computer Science (CSE)',
    preferredZone: 'Coimbatore & Western TN',
    targetCategory: 'Top Tier Autonomous & Govt Aided',
    preferredDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    preferredTimeSlot: '4:00 PM – 5:00 PM (Evening)',
    counsellingMode: 'Video Call (Google Meet/Zoom)',
    advisorPreference: 'Senior TNEA Choice Strategy Director',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validateStep = (step: number) => {
    const errs: Record<string, string> = {};

    if (step === 1) {
      if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
      if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required';
      if (!formData.phone.trim() || formData.phone.length < 8) errs.phone = 'Valid 10-digit mobile number is required';
    }

    if (step === 2) {
      if (!formData.pcmCutoff.trim()) errs.pcmCutoff = 'Please specify your 12th PCM cutoff (/200)';
    }

    if (step === 3) {
      if (!formData.preferredDate) errs.preferredDate = 'Please select a date';
      if (!formData.preferredTimeSlot) errs.preferredTimeSlot = 'Please choose a slot';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(3)) {
      setIsSubmitting(true);
      const generatedRef = `TNEA-${Math.floor(100000 + Math.random() * 900000)}`;
      setBookingRef(generatedRef);

      const leadPayload = {
        name: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        district: formData.district,
        city: formData.city || formData.district,
        academicLevel: formData.currentEducation,
        pcmCutoff: formData.pcmCutoff,
        interestedBranch: formData.interestedBranch,
        targetCategory: formData.targetCategory,
        preferredZone: formData.preferredZone,
        preferredDate: formData.preferredDate,
        preferredTimeSlot: formData.preferredTimeSlot,
        counsellingMode: formData.counsellingMode,
        message: `1-on-1 Strategy Session Booking Ref: ${generatedRef}. Mode: ${formData.counsellingMode}. Target: ${formData.targetCategory}.`,
        source: 'Website 1-on-1 Counselling Booking',
        leadId: generatedRef
      };

      const waAlertUrl = generateOwnerBookingWhatsAppUrl(leadPayload);
      setOwnerWhatsAppLink(waAlertUrl);

      // 1. Add to In-App CRM Pipeline
      addLead({
        name: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        city: formData.city || formData.district,
        district: formData.district,
        academicLevel: formData.currentEducation,
        pcmCutoff: parseFloat(formData.pcmCutoff) || 190.0,
        interestedBranch: formData.interestedBranch,
        targetColleges: [formData.targetCategory, formData.preferredZone],
        source: 'Website Booking',
        status: 'Counselling Scheduled',
        priority: 'High',
        nextFollowUp: formData.preferredDate,
        notes: [
          `1-on-1 Consultation Booked (${generatedRef}) for ${formData.preferredDate} at ${formData.preferredTimeSlot} via ${formData.counsellingMode}. Target: ${formData.targetCategory}.`
        ]
      });

      // 2. Dispatch Email to nextblock.educations@gmail.com
      await sendEnquiryLeadEmail(leadPayload);

      // 3. Automatically launch WhatsApp notification to owner (+91 93854 65849)
      try {
        window.open(waAlertUrl, '_blank');
      } catch (err) {
        console.log('WhatsApp window open deferred:', err);
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      triggerConfetti();

      const successToastData: ToastMessage = {
        id: Date.now().toString(),
        title: "TNEA COUNSELLING BOOKED! 🚀",
        message: `Your 1-on-1 discovery session (${generatedRef}) is confirmed. Alert sent to WhatsApp (+91 93854 65849) & ${RECIPIENT_EMAIL}.`,
        type: 'success'
      };

      if (onSuccessToast) {
        onSuccessToast(successToastData);
      } else {
        addToast(successToastData);
      }
    }
  };

  const handleResetModal = () => {
    setIsSubmitted(false);
    setCurrentStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-9 shadow-2xl border-2 border-slate-300 relative max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={handleResetModal}
          className="absolute top-6 right-6 p-2 rounded-full text-slate-500 hover:text-slate-950 hover:bg-slate-100 transition-colors"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Modal Top Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-200 text-xs font-black uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>100% Free 1-on-1 TNEA Strategy Consultation</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-950">
                Book Your Engineering Counselling
              </h3>
              <p className="text-xs text-slate-600 mt-1 font-medium">
                Step {currentStep} of 3 • Personalized cutoff matching, branch guidance & fee aid
              </p>
            </div>

            {/* Stepper Indicator */}
            <div className="flex items-center justify-between gap-2 border-y border-slate-200 py-3 mb-6">
              {[
                { step: 1, label: 'Student Details' },
                { step: 2, label: 'Cutoff & Target Colleges' },
                { step: 3, label: 'Slot & Mode' }
              ].map((s) => (
                <div key={s.step} className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                      currentStep === s.step
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                        : currentStep > s.step
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {currentStep > s.step ? <CheckCircle2 className="w-4 h-4" /> : s.step}
                  </div>
                  <span
                    className={`text-xs font-black hidden sm:inline ${
                      currentStep === s.step ? 'text-slate-950' : 'text-slate-500'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* FORM BODY */}
            <form onSubmit={handleSubmit}>
              
              {/* STEP 01: Student Details */}
              {currentStep === 1 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="bg-slate-50 p-3.5 rounded-2xl border-2 border-slate-200 mb-2">
                    <span className="text-[10px] font-black text-blue-700 uppercase tracking-wider block">STEP 01</span>
                    <h4 className="text-sm font-black text-slate-950">Tell us about yourself</h4>
                  </div>

                  <div>
                    <label className="text-xs font-black text-slate-900 block mb-1.5">
                      Student Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Kaviya Sundaram"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                          errors.fullName ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                        }`}
                      />
                    </div>
                    {errors.fullName && <p className="text-[11px] font-bold text-red-500 mt-1">{errors.fullName}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-black text-slate-900 block mb-1.5">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="kaviya@example.com"
                          className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                            errors.email ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                          }`}
                        />
                      </div>
                      {errors.email && <p className="text-[11px] font-bold text-red-500 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="text-xs font-black text-slate-900 block mb-1.5">
                        Mobile / WhatsApp (For Call Invite) *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="94420 12345"
                          className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                            errors.phone ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                          }`}
                        />
                      </div>
                      {errors.phone && <p className="text-[11px] font-bold text-red-500 mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-black text-slate-900 block mb-1.5">
                        District (Tamil Nadu) *
                      </label>
                      <select
                        value={formData.district}
                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        {TN_DISTRICTS.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-black text-slate-900 block mb-1.5">
                        Board of Education *
                      </label>
                      <select
                        value={formData.currentEducation}
                        onChange={(e) => setFormData({ ...formData, currentEducation: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        <option value="12th Tamil Nadu State Board">12th Tamil Nadu State Board</option>
                        <option value="12th CBSE Board">12th CBSE Board</option>
                        <option value="12th ISC / Other Board">12th ISC / Cambridge</option>
                        <option value="Lateral Entry (Diploma Completed)">Diploma to B.E. Lateral Entry</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 02: Cutoff & Target Colleges */}
              {currentStep === 2 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="bg-slate-50 p-3.5 rounded-2xl border-2 border-slate-200 mb-2">
                    <span className="text-[10px] font-black text-blue-700 uppercase tracking-wider block">STEP 02</span>
                    <h4 className="text-sm font-black text-slate-950">Your Cutoff & Target Ambition</h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-black text-slate-900 block mb-1.5">
                        12th PCM Cutoff (/200) *
                      </label>
                      <div className="relative">
                        <Calculator className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          value={formData.pcmCutoff}
                          onChange={(e) => setFormData({ ...formData, pcmCutoff: e.target.value })}
                          placeholder="e.g. 192.50 or 184.00"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-300 text-xs font-black text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-black text-slate-900 block mb-1.5">
                        Target Engineering Branch
                      </label>
                      <select
                        value={formData.interestedBranch}
                        onChange={(e) => setFormData({ ...formData, interestedBranch: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        <option value="Computer Science (CSE)">Computer Science & Engg (CSE)</option>
                        <option value="AI & Data Science (AI/DS)">AI & Data Science (AI & DS)</option>
                        <option value="Information Technology (IT)">Information Technology (IT)</option>
                        <option value="Cybersecurity">Cybersecurity & Cloud</option>
                        <option value="Electronics & Comm (ECE)">Electronics & Comm (ECE)</option>
                        <option value="Electrical & Electronics (EEE)">Electrical & Electronics (EEE)</option>
                        <option value="Robotics & Automation">Robotics & Automation / Mechatronics</option>
                        <option value="Mechanical / Automobile">Mechanical / Automobile</option>
                        <option value="Biomedical / Biotech">Biomedical / Biotechnology</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-black text-slate-900 block mb-1.5">
                        Preferred Region in Tamil Nadu
                      </label>
                      <select
                        value={formData.preferredZone}
                        onChange={(e) => setFormData({ ...formData, preferredZone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        <option value="Coimbatore & Western TN">Coimbatore & Western TN (PSG, CIT, KCT, SKCET, GCT)</option>
                        <option value="Chennai & Northern TN">Chennai & Northern TN (Anna Univ, SSN, REC, CIT Chennai)</option>
                        <option value="Central & Southern TN">Central & Southern TN (TCE Madurai, SASTRA, NIT Trichy)</option>
                        <option value="All Tamil Nadu Hubs">Any Top Tier College Across Tamil Nadu</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-black text-slate-900 block mb-1.5">
                        Target Institution Type
                      </label>
                      <select
                        value={formData.targetCategory}
                        onChange={(e) => setFormData({ ...formData, targetCategory: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        <option value="Government & Aided Autonomous">Government & Aided Autonomous (CEG, PSG, CIT, GCT)</option>
                        <option value="Top Tier Autonomous">Top Autonomous Self-Financing (SSN, KCT, SKCET, Bannari)</option>
                        <option value="Deemed Universities">Deemed Universities (Amrita, SRM, VIT, SASTRA)</option>
                        <option value="7.5% Govt School Quota">7.5% Govt School 100% Free Seat Scheme</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 03: Date & Slot */}
              {currentStep === 3 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="bg-slate-50 p-3.5 rounded-2xl border-2 border-slate-200 mb-2">
                    <span className="text-[10px] font-black text-blue-700 uppercase tracking-wider block">STEP 03</span>
                    <h4 className="text-sm font-black text-slate-950">Choose Date & Preferred Mode</h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-black text-slate-900 block mb-1.5">
                        Preferred Date *
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="date"
                          value={formData.preferredDate}
                          onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-black text-slate-900 block mb-1.5">
                        Time Slot *
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <select
                          value={formData.preferredTimeSlot}
                          onChange={(e) => setFormData({ ...formData, preferredTimeSlot: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                          <option value="10:00 AM – 11:00 AM (Morning)">10:00 AM – 11:00 AM (Morning)</option>
                          <option value="11:30 AM – 12:30 PM (Morning)">11:30 AM – 12:30 PM (Morning)</option>
                          <option value="2:00 PM – 3:00 PM (Afternoon)">2:00 PM – 3:00 PM (Afternoon)</option>
                          <option value="4:00 PM – 5:00 PM (Evening)">4:00 PM – 5:00 PM (Evening)</option>
                          <option value="6:00 PM – 7:00 PM (Evening)">6:00 PM – 7:00 PM (Evening)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-black text-slate-900 block mb-1.5">
                      Consultation Mode *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {[
                        { mode: 'Video Call (Google Meet/Zoom)', label: 'Virtual Google Meet' },
                        { mode: 'In-Person (Chennai / Coimbatore Office)', label: 'In-Person Office Visit' },
                        { mode: 'Phone Call', label: 'Direct Phone Consultation' }
                      ].map((item) => (
                        <button
                          key={item.mode}
                          type="button"
                          onClick={() => setFormData({ ...formData, counsellingMode: item.mode as any })}
                          className={`p-3 rounded-xl text-xs font-extrabold border-2 transition-all text-center ${
                            formData.counsellingMode === item.mode
                              ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-sm'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Nav Controls */}
              <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-5 py-3 rounded-xl border-2 border-slate-300 text-xs font-bold text-slate-800 hover:bg-slate-100 flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-black text-white shadow-md shadow-blue-500/25 flex items-center gap-2"
                  >
                    <span>Next: Select Options</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-black text-white shadow-lg shadow-emerald-500/30 flex items-center gap-2 disabled:opacity-75 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Confirming & Emailing...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Confirm Free Counselling</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        ) : (
          /* Booking Success Screen */
          <div className="text-center py-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 border-2 border-emerald-300 shadow-lg">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs font-black uppercase tracking-widest text-emerald-700 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200">
              Booking Confirmed • {bookingRef}
            </span>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-950 mt-3 mb-2">
              YOU'RE ALL SET! 🚀
            </h3>

            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed mb-4 font-medium">
              We’ve scheduled your 1-on-1 TNEA Choice & College Strategy consultation for{' '}
              <strong className="text-slate-950">{formData.preferredDate}</strong> at{' '}
              <strong className="text-slate-950">{formData.preferredTimeSlot}</strong> via{' '}
              <strong className="text-blue-600">{formData.counsellingMode}</strong>.
            </p>

            {/* Student Dossier Summary */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 max-w-md mx-auto mb-4 text-left text-xs text-slate-700 space-y-1.5 font-medium">
              <p>• Student: <strong className="text-slate-950 font-bold">{formData.fullName}</strong></p>
              <p>• Mobile: <strong className="text-slate-950 font-bold">{formData.phone}</strong></p>
              <p>• Student Email: <strong className="text-slate-950 font-bold">{formData.email}</strong></p>
              <p>• PCM Cutoff: <strong className="text-blue-700 font-black">{formData.pcmCutoff} / 200</strong></p>
              <p>• Target Branch: <strong className="text-slate-950 font-bold">{formData.interestedBranch}</strong></p>
              <p className="pt-2 border-t border-slate-200 text-[11px] text-emerald-700 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Lead dispatched to NEXTBLOCK admissions at {RECIPIENT_EMAIL}
              </p>
            </div>

            {/* Direct WhatsApp Alert Notice to Owner */}
            <div className="bg-emerald-50/80 border-2 border-emerald-300 rounded-2xl p-4 max-w-md mx-auto mb-6 text-left space-y-2.5 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-black text-emerald-950">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
                <span>WhatsApp Notification to Admissions (+91 93854 65849):</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                An instant booking alert message with your cutoff and chosen slot has been prepared for the admissions desk.
              </p>
              <a
                href={ownerWhatsAppLink || generateOwnerBookingWhatsAppUrl({
                  name: formData.fullName,
                  phone: formData.phone,
                  email: formData.email,
                  district: formData.district,
                  pcmCutoff: formData.pcmCutoff,
                  interestedBranch: formData.interestedBranch,
                  targetCategory: formData.targetCategory,
                  preferredDate: formData.preferredDate,
                  preferredTimeSlot: formData.preferredTimeSlot,
                  counsellingMode: formData.counsellingMode,
                  leadId: bookingRef
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-500/30"
              >
                <Phone className="w-4 h-4" />
                <span>Open WhatsApp Booking Alert (+91 93854 65849)</span>
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`tel:${ADMISSIONS_HELPLINE_PHONE.replace(/\s+/g, '')}`}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-500/25"
              >
                <Phone className="w-4 h-4" />
                <span>Call Helpline: {ADMISSIONS_HELPLINE_PHONE}</span>
              </a>
              <button
                onClick={handleResetModal}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white text-xs font-black transition-colors"
              >
                Return to Website
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
