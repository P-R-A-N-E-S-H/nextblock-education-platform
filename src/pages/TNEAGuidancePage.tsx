import React, { useState } from 'react';
import { 
  GraduationCap, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  ArrowRight, 
  Sparkles, 
  Calculator, 
  ShieldCheck, 
  FileText, 
  Calendar,
  Building2,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface TNEAGuidancePageProps {
  onOpenBooking?: () => void;
}

export const TNEAGuidancePage: React.FC<TNEAGuidancePageProps> = ({ onOpenBooking }) => {
  const { setCurrentPublicView } = useApp();
  const [activeTab, setActiveTab] = useState<'steps' | 'quota75' | 'fg' | 'mistakes'>('steps');

  return (
    <div className="py-24 bg-white relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Badge & Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-black uppercase tracking-wider mb-4">
            <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
            <span>Official TNEA 2026 Counselling Blueprint</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-950 tracking-tight leading-tight mb-5">
            MASTER THE TNEA <br />
            <span className="text-gradient">SINGLE WINDOW ADMISSION.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
            Everything you need to navigate the Tamil Nadu Engineering Admissions portal: cutoff formulas, 7.5% government school quotas, choice filling architecture, and upward movement strategies.
          </p>
        </div>

        {/* Quick Cutoff Formula Banner */}
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-10 mb-16 border-2 border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="text-xs font-black uppercase tracking-widest text-cyan-400 block mb-1">
                OFFICIAL AGGREGATE FORMULA
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
                How is the TNEA Cutoff (/200) Calculated?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mb-6 font-normal">
                TNEA aggregate is computed purely out of your 12th standard Physics, Chemistry, and Mathematics marks.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-700">
                  <span className="text-xs font-bold text-slate-400 block">Mathematics</span>
                  <span className="text-xl font-black text-white mt-1 block">Marks out of 100</span>
                  <span className="text-[10px] text-cyan-400 font-extrabold">Full Weightage (100)</span>
                </div>
                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-700">
                  <span className="text-xs font-bold text-slate-400 block">Physics</span>
                  <span className="text-xl font-black text-white mt-1 block">Marks ÷ 2</span>
                  <span className="text-[10px] text-cyan-400 font-extrabold">Scaled to 50</span>
                </div>
                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-700">
                  <span className="text-xs font-bold text-slate-400 block">Chemistry</span>
                  <span className="text-xl font-black text-white mt-1 block">Marks ÷ 2</span>
                  <span className="text-[10px] text-cyan-400 font-extrabold">Scaled to 50</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-gradient-to-br from-blue-600 to-cyan-500 p-6 rounded-2xl text-center shadow-xl">
              <span className="text-xs uppercase font-black text-blue-100 block">Cutoff Summary</span>
              <p className="text-3xl font-black text-white my-2">M + (P/2) + (C/2)</p>
              <p className="text-xs text-blue-100 mb-4 font-semibold">Total = 200 Marks</p>
              <button
                onClick={() => setCurrentPublicView('finder')}
                className="w-full py-3 rounded-xl bg-slate-950 hover:bg-slate-900 text-white text-xs font-black transition-all flex items-center justify-center gap-1.5"
              >
                <Calculator className="w-4 h-4 text-cyan-300" />
                <span>Simulate Your Cutoff</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { id: 'steps', label: '📋 Step-by-Step TNEA Process' },
            { id: 'quota75', label: '🌟 7.5% Govt School Scheme' },
            { id: 'fg', label: '💡 First Graduate Fee Waiver' },
            { id: 'mistakes', label: '⚠️ Choice Filling Mistakes to Avoid' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-5 py-3 rounded-xl text-xs font-black transition-all ${
                activeTab === t.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-105'
                  : 'bg-slate-100 text-slate-800 border border-slate-200 hover:bg-slate-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* TAB 1: 6-Step TNEA Process */}
        {activeTab === 'steps' && (
          <div className="space-y-4 max-w-4xl mx-auto animate-in fade-in duration-200">
            {[
              {
                step: '01',
                title: 'Online Application & Registration',
                desc: 'Students register on the official TNEA portal (tneaonline.org), enter personal info, 12th marks, and choose user preferences.',
                badge: 'Phase 1'
              },
              {
                step: '02',
                title: 'Certificate Verification at TFC Centers',
                desc: 'Digital pre-verification and in-person verification at designated TNEA Facilitation Centers (TFC) for community, nativity, and special reservation categories.',
                badge: 'Phase 2'
              },
              {
                step: '03',
                title: 'Rank List Publication (General & Community)',
                desc: 'Directorate of Technical Education releases statewide General Ranks and Community Ranks (BC, BCM, MBC, SC, SCA, ST).',
                badge: 'Phase 3'
              },
              {
                step: '04',
                title: 'Round-by-Round Choice Filling (3-Day Window)',
                desc: 'Students add and order their choices across colleges and branches. Creating an airtight 50+ list of Dream, Target, and Safety colleges is critical.',
                badge: 'Phase 4'
              },
              {
                step: '05',
                title: 'Tentative Allotment & Upward Movement Locking',
                desc: 'Options given: (1) Accept & Join, (2) Accept & Upward Movement, (3) Decline & Upward Movement, (4) Decline & Next Round, (5) Quit.',
                badge: 'Phase 5'
              },
              {
                step: '06',
                title: 'Final Allotment & College Campus Reporting',
                desc: 'Download final allotment order, pay confirmation fee, and report to the allotted college with original certificates.',
                badge: 'Phase 6'
              }
            ].map((st) => (
              <div key={st.step} className="p-6 rounded-2xl bg-slate-50 border-2 border-slate-200 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-mono font-black text-sm shrink-0 shadow-md">
                  {st.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base font-black text-slate-950">{st.title}</h3>
                    <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-200">
                      {st.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-normal">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: 7.5% Govt School Quota */}
        {activeTab === 'quota75' && (
          <div className="bg-slate-50 rounded-3xl p-8 sm:p-10 border-2 border-slate-200 max-w-4xl mx-auto animate-in fade-in duration-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center border border-emerald-300">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-950">7.5% Tamil Nadu Government School Quota</h3>
                <p className="text-xs text-emerald-700 font-extrabold">100% Free Tuition, Hostel & Mess for 4 Years</p>
              </div>
            </div>

            <div className="space-y-4 text-xs text-slate-700 leading-relaxed font-normal mb-8">
              <p>
                Under the Tamil Nadu Government School Reservation Act, <strong>7.5% of seats across all Government, Aided, and Self-Financing Autonomous engineering colleges</strong> are reserved for students who studied continuously from 6th to 12th standard in state government schools.
              </p>
              <div className="p-4 rounded-2xl bg-white border-2 border-emerald-300">
                <h4 className="text-xs font-black uppercase text-emerald-900 mb-2">Key Highlights of 7.5% Quota:</h4>
                <ul className="space-y-1.5 text-slate-900 font-semibold">
                  <li>• <strong>Zero Tuition Fees:</strong> 100% reimbursed by the Government of Tamil Nadu.</li>
                  <li>• <strong>Zero Hostel & Mess Fees:</strong> Fully covered across all 4 years of engineering.</li>
                  <li>• <strong>Separate Counselling Round:</strong> Conducted before general academic counselling.</li>
                  <li>• <strong>Premier College Access:</strong> Equal reservation at CEG Anna Univ, MIT, PSG Tech, SSN, and CIT.</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between">
              <div>
                <h5 className="text-xs font-black text-blue-950">Need 7.5% Bonafide Verification Support?</h5>
                <p className="text-[11px] text-blue-700">Our team assists with Headmaster signature & TFC certificate upload.</p>
              </div>
              <button
                onClick={() => setCurrentPublicView('contact')}
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
              >
                Contact Specialist →
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: First Graduate */}
        {activeTab === 'fg' && (
          <div className="bg-slate-50 rounded-3xl p-8 sm:p-10 border-2 border-slate-200 max-w-4xl mx-auto animate-in fade-in duration-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center border border-blue-300">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-950">First Graduate (FG) Fee Concession Scheme</h3>
                <p className="text-xs text-blue-700 font-extrabold">Annual Tuition Waiver of ₹25,000 to ₹50,000</p>
              </div>
            </div>

            <div className="space-y-4 text-xs text-slate-700 leading-relaxed font-normal mb-8">
              <p>
                Awarded to candidates who are the first person in their immediate family (including parents and elder siblings) to pursue a college degree in Tamil Nadu.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white border-2 border-slate-200">
                  <h4 className="font-black text-slate-950 mb-1">Government Colleges</h4>
                  <p className="text-blue-700 font-extrabold text-lg">₹25,000 / year</p>
                  <p className="text-[11px] text-slate-600 mt-1">Direct tuition fee exemption at CEG, MIT, GCT, ACGCET.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border-2 border-slate-200">
                  <h4 className="font-black text-slate-950 mb-1">Self-Financing / Autonomous</h4>
                  <p className="text-blue-700 font-extrabold text-lg">Up to ₹50,000 / year</p>
                  <p className="text-[11px] text-slate-600 mt-1">Concession applied on approved government quota seats.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Common Choice Filling Mistakes */}
        {activeTab === 'mistakes' && (
          <div className="bg-slate-50 rounded-3xl p-8 sm:p-10 border-2 border-slate-200 max-w-4xl mx-auto animate-in fade-in duration-200 space-y-4">
            <h3 className="text-2xl font-black text-slate-950 mb-4">5 Costly TNEA Choice Filling Mistakes to Avoid</h3>
            
            {[
              {
                title: '1. Entering Fewer than 30 Choices',
                desc: 'Many students enter only 5 to 10 choices. If cutoffs surge, you risk receiving "No Seat Allotted" and being relegated to subsequent rounds where top seats are filled.'
              },
              {
                title: '2. Confusing Aided and Self-Supporting Branch Codes',
                desc: 'Colleges like PSG Tech and TCE Madurai have separate TNEA branch codes for Aided (low fees) vs Self-Supporting (regular fees). Entering the wrong code changes your fee structure.'
              },
              {
                title: '3. Putting Lower Tier Colleges Above Higher Tier Colleges',
                desc: 'The TNEA computer allotment engine processes choices top-to-bottom. Once an upper choice is available, lower choices are automatically discarded.'
              },
              {
                title: '4. Forgetting to Click Tentative Confirmation on Time',
                desc: 'You only get a strict 48-hour window to select "Accept & Join" or "Accept & Upward Movement". Missing the deadline cancels your allotted seat entirely.'
              },
              {
                title: '5. Neglecting Upward Movement Strategy',
                desc: 'If you get Choice #4, selecting "Accept & Upward Movement" holds your current seat while automatically checking if Choices #1, #2, or #3 open up during round confirmation.'
              }
            ].map((m, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white border-2 border-red-200 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-black text-slate-950">{m.title}</h4>
                  <p className="text-[11px] text-slate-700 leading-relaxed mt-0.5">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
