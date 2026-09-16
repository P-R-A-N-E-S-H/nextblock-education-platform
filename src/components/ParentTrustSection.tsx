import React from 'react';
import { 
  HeartHandshake, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Users, 
  Building2, 
  DollarSign, 
  Sparkles,
  PhoneCall
} from 'lucide-react';

interface ParentTrustSectionProps {
  onOpenBooking: () => void;
}

export const ParentTrustSection: React.FC<ParentTrustSectionProps> = ({ onOpenBooking }) => {
  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & Reassurance (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-black uppercase tracking-wider">
              <HeartHandshake className="w-4 h-4 text-emerald-400" />
              <span>For Parents & Guardians</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight uppercase">
              A DECISION FOR THEM. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-blue-400">
                PEACE OF MIND FOR YOU.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Choosing a college is one of the biggest investments a family makes. NEXTBLOCK brings clarity to courses, colleges, admissions, costs, hostel security, and 4-year placement pathways so parents make confident decisions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-emerald-400 font-black text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Transparent Information</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Exact tuition fees, hidden charges audit, and real verified placement CTC distributions.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-emerald-400 font-black text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Personalised Guidance</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  A dedicated senior counselor who answers every parent question in Tamil or English.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-emerald-400 font-black text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Application Support</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Step-by-step TNEA certificate verification, bonafide signing, and choice list audit.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-emerald-400 font-black text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Clear Communication</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  No confusing jargon. Direct parent consultation calls and office appointments.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2"
              >
                <span>TALK TO A COUNSELLOR →</span>
              </button>
            </div>

          </div>

          {/* Right Column: Parent Consultation Reassurance Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-slate-950 rounded-3xl p-8 border-2 border-slate-800 shadow-2xl relative overflow-hidden space-y-5">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">Parent Consultation Guarantee</h3>
                  <p className="text-xs text-slate-400">100% Unbiased & Data-Backed</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <p className="flex items-start gap-2">
                  <span className="text-cyan-400 font-black">•</span>
                  <span><strong>Zero Commercial Bias:</strong> We never push private colleges for commission. Your child’s marks and merit dictate recommendations.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-cyan-400 font-black">•</span>
                  <span><strong>Hostel & Safety Audit:</strong> Insights on campus security, ragging-free measures, and mess hygiene.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-cyan-400 font-black">•</span>
                  <span><strong>Fee Concession Maximization:</strong> We ensure eligible students claim 100% 7.5% Government School and First Graduate waivers.</span>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Direct Parent Helpline</span>
                <a href="tel:+919385465849" className="text-lg font-black text-emerald-400 hover:text-emerald-300 mt-0.5 block transition-colors">
                  📞 +91 93854 65849
                </a>
                <span className="text-[11px] text-slate-400 font-medium">Available Mon – Sat (9 AM – 7:30 PM)</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
