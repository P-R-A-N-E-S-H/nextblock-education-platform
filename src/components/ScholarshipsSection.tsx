import React, { useState } from 'react';
import { Award, CheckCircle2, ArrowRight, Sparkles, Calculator, Building, ShieldCheck, HelpCircle } from 'lucide-react';
import { triggerConfetti } from '../utils/helpers';

interface ScholarshipsSectionProps {
  onOpenBooking: () => void;
}

export const ScholarshipsSection: React.FC<ScholarshipsSectionProps> = ({ onOpenBooking }) => {
  const [cutoff, setCutoff] = useState('192.5');
  const [quotaType, setQuotaType] = useState('General');
  const [isFirstGraduate, setIsFirstGraduate] = useState('yes');
  const [estimatedAid, setEstimatedAid] = useState<string>('₹25,000 – ₹1,20,000 / yr Fee Concession');

  const calculateAid = () => {
    const cutoffNum = parseFloat(cutoff) || 180;
    
    if (quotaType === '7.5% Govt School') {
      setEstimatedAid('100% Free Tuition + Free Hostel & Mess (₹0 Out-of-Pocket)');
    } else if (quotaType === 'SC/ST/SCA Post-Matric') {
      setEstimatedAid('100% Tuition Fee Reimbursement + Monthly Maintenance Allowance');
    } else if (isFirstGraduate === 'yes') {
      if (cutoffNum >= 195) {
        setEstimatedAid('₹50,000 FG Waiver + Up to 100% Institutional Merit Concession');
      } else {
        setEstimatedAid('₹25,000 to ₹50,000 / yr Direct Tuition Fee Concession (FG Quota)');
      }
    } else {
      if (cutoffNum >= 195) {
        setEstimatedAid('Up to 100% Institutional Merit Waiver (PSG / SSN / SRM / CIT / SASTRA)');
      } else if (cutoffNum >= 185) {
        setEstimatedAid('₹25,000 – ₹75,000 / yr Merit Concession & AICTE Pragati Scheme');
      } else {
        setEstimatedAid('Standard Government Fixed Fee Structure & BC/MBC Welfare Aid');
      }
    }
    triggerConfetti();
  };

  const scholarshipCards = [
    {
      title: '7.5% TN Govt School Quota',
      amount: '100% Free Tuition + Hostel + Mess',
      description: 'Fully funded by the Government of Tamil Nadu for students from 6th to 12th in state govt schools across all 4 years of engineering.',
      examples: ['Anna Univ CEG / MIT', 'PSG Tech Peelamedu', 'CIT & SSN Chennai'],
      icon: Award,
      badge: '100% Free Education'
    },
    {
      title: 'First Graduate (FG) Fee Waiver',
      amount: '₹25,000 – ₹50,000 / yr Waiver',
      description: 'Direct annual tuition fee concession awarded to students who are the first in their immediate family to pursue a college degree.',
      examples: ['All Govt Colleges (₹25k/yr)', 'All Autonomous Colleges (₹50k/yr)', 'Deemed Affiliated Seats'],
      icon: Building,
      badge: 'Direct Concession'
    },
    {
      title: 'Post-Matric Welfare Scholarships',
      amount: 'Full Reimbursement + Living Stipend',
      description: 'Welfare department fee grants for SC, ST, SCA, SCC, BC, MBC, and DNC students fulfilling family income norms.',
      examples: ['Adi Dravidar Welfare Scheme', 'BC/MBC/DNC Scholarship', 'National Fellowship Portal'],
      icon: ShieldCheck,
      badge: 'Govt Reimbursed'
    },
    {
      title: 'Institutional Merit Waivers',
      amount: 'Up to 100% Tuition Waiver',
      description: 'Awarded directly by top institutions (SSN, PSG Tech, SRM, VIT, SASTRA, CIT) for top TNEA cutoff scorers and entrance toppers.',
      examples: ['SSN Rural & Merit Scholar', 'PSG Tech Excellence Award', 'SASTRA Ramanujan Merit Aid'],
      icon: Sparkles,
      badge: 'Merit Ranked'
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden border-b border-slate-200">
      {/* Background Subtle Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-black uppercase tracking-wider mb-4">
            <Award className="w-4 h-4 text-emerald-700" />
            <span>₹8.5 Cr+ Total Fee Aid Secured</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-950 tracking-tight leading-tight mb-5">
            YOUR ENGINEERING DREAM <br />
            <span className="text-gradient">SHOULD BE AFFORDABLE.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
            We actively match students with 7.5% Govt School 100% free seats, First Graduate fee concessions, and institutional merit waivers so you graduate debt-free.
          </p>
        </div>

        {/* 4 Floating Scholarship Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {scholarshipCards.map((card, idx) => {
            const Icon = card.icon;

            return (
              <div
                key={idx}
                className="bg-slate-50 rounded-3xl p-7 border-2 border-slate-200 hover:border-emerald-500 hover:bg-white transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-xl hover:shadow-emerald-500/15 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center border border-emerald-300 shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-950 mb-1">
                    {card.title}
                  </h3>
                  <p className="text-xs font-extrabold text-emerald-700 mb-3">
                    {card.amount}
                  </p>

                  <p className="text-xs text-slate-700 leading-relaxed mb-4 font-normal">
                    {card.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                    Eligible Colleges / Schemes:
                  </p>
                  <div className="space-y-1 text-xs font-bold text-slate-800">
                    {card.examples.map((ex, i) => (
                      <p key={i} className="truncate">• {ex}</p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Instant Scholarship Potential Estimator */}
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Column: Calculator Controls */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-400 mb-2">
                <Calculator className="w-4 h-4" />
                <span>Instant Fee Concession Diagnostic</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                Estimate Your Tamil Nadu Fee Concession
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-6 font-normal">
                Enter your PCM cutoff and eligibility criteria to see estimated annual fee reductions and government welfare aid.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">
                    PCM Cutoff (/200)
                  </label>
                  <input
                    type="number"
                    step="0.25"
                    min="100"
                    max="200"
                    value={cutoff}
                    onChange={(e) => setCutoff(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border-2 border-slate-700 text-xs font-extrabold text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">
                    Special Reservation
                  </label>
                  <select
                    value={quotaType}
                    onChange={(e) => setQuotaType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border-2 border-slate-700 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="General">Standard General / Open</option>
                    <option value="7.5% Govt School">7.5% TN Govt School Scheme</option>
                    <option value="SC/ST/SCA Post-Matric">SC/ST/SCA Post-Matric Welfare</option>
                    <option value="BC/MBC Welfare">BC / MBC / DNC Welfare Scheme</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">
                    First Graduate in Family?
                  </label>
                  <select
                    value={isFirstGraduate}
                    onChange={(e) => setIsFirstGraduate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border-2 border-slate-700 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="yes">Yes (Eligible for FG Waiver)</option>
                    <option value="no">No (Sibling/Parent is Graduate)</option>
                  </select>
                </div>
              </div>

              <button
                onClick={calculateAid}
                className="px-7 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/25 transition-all"
              >
                Calculate Potential Fee Waiver
              </button>
            </div>

            {/* Right Column: Estimated Result Callout */}
            <div className="lg:col-span-5 bg-slate-900 rounded-2xl p-6 border-2 border-slate-800 text-center shadow-xl">
              <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400 block mb-1">
                Estimated Fee Concession
              </span>
              <p className="text-xl sm:text-2xl font-black text-emerald-400 my-2">
                {estimatedAid}
              </p>
              <p className="text-[11px] text-slate-300 leading-relaxed mb-4 font-medium">
                Based on Tamil Nadu Higher Education Department regulations & institutional merit criteria for Cutoff {cutoff}.
              </p>
              <button
                onClick={onOpenBooking}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold shadow transition-colors flex items-center justify-center gap-2"
              >
                <span>Apply for Eligible Fee Concessions</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
