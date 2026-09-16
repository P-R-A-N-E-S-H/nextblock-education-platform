import React from 'react';
import { 
  Globe2, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  GraduationCap, 
  ArrowRight, 
  FileText, 
  Plane, 
  Award,
  DollarSign
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface StudyAbroadPageProps {
  onOpenBooking?: () => void;
}

export const StudyAbroadPage: React.FC<StudyAbroadPageProps> = ({ onOpenBooking }) => {
  const { setCurrentPublicView } = useApp();

  const countries = [
    {
      country: 'Germany 🇩🇪',
      highlight: 'Zero / Low Tuition at Public TU9 Universities',
      avgCost: '€0 – €3,000 / year',
      intakes: 'Winter (October) & Summer (April)',
      popularCourses: ['Automotive Engineering', 'Mechanical & Robotics', 'Informatics & AI', 'Renewable Energy'],
      visaSuccess: '98.5% Visa Approval Rate'
    },
    {
      country: 'United Kingdom 🇬🇧',
      highlight: '1-Year Master’s & 2-Year Post-Study Graduate Visa',
      avgCost: '£14,000 – £26,000 / year',
      intakes: 'September / October & January',
      popularCourses: ['Data Science & AI', 'Advanced CS', 'Aerospace Engineering', 'Management'],
      visaSuccess: '99.1% Visa Approval Rate'
    },
    {
      country: 'United States 🇺🇸',
      highlight: '3-Year STEM OPT Work Authorization',
      avgCost: '$22,000 – $45,000 / year',
      intakes: 'Fall (August) & Spring (January)',
      popularCourses: ['Computer Science', 'VLSI & Computer Engineering', 'Biomedical Informatics', 'Robotics'],
      visaSuccess: 'F-1 Visa Mock Interviews'
    },
    {
      country: 'Ireland 🇮🇪',
      highlight: 'Silicon Docks of Europe • 2-Year Post-Study Visa',
      avgCost: '€12,000 – €22,000 / year',
      intakes: 'September & January',
      popularCourses: ['Cloud Computing', 'Pharmaceutical Tech', 'FinTech & Software', 'Cybersecurity'],
      visaSuccess: 'Direct Industry Placement Support'
    },
    {
      country: 'Australia 🇦🇺',
      highlight: 'Group of Eight (Go8) Research Excellence',
      avgCost: 'AUD $28,000 – $46,000 / year',
      intakes: 'February & July',
      popularCourses: ['Mining & Civil Engineering', 'AI & Machine Learning', 'Telecommunications', 'Data Analytics'],
      visaSuccess: 'Subclass 500 Visa Guidance'
    },
    {
      country: 'United Arab Emirates 🇦🇪',
      highlight: 'Tax-Free Career Hub & Global Satellite Campuses (BITS/HW)',
      avgCost: 'AED 35,000 – 65,000 / year',
      intakes: 'September & January',
      popularCourses: ['Civil & Structural Engineering', 'Petroleum & Chemical', 'FinTech & AI'],
      visaSuccess: 'Fast-Track Student Residence Visa'
    }
  ];

  return (
    <div className="py-24 bg-white relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Badge & Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-black uppercase tracking-wider mb-4">
            <Globe2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Global Higher Education Advisory</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-950 tracking-tight leading-tight mb-5">
            EXPAND YOUR HORIZONS. <br />
            <span className="text-gradient">STUDY ABROAD WITH NEXTBLOCK.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
            Comprehensive, transparent guidance for students targeting top global STEM master’s and undergraduate programs across Germany, the UK, the USA, Ireland, and Australia.
          </p>
        </div>

        {/* Global Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {countries.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50 rounded-3xl p-7 border-2 border-slate-200 hover:border-blue-500 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-black text-slate-950">{item.country}</h3>
                  <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                    {item.visaSuccess}
                  </span>
                </div>

                <p className="text-xs font-bold text-blue-700 mb-4">{item.highlight}</p>

                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 mb-4 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-semibold">Tuition Estimate:</span>
                    <span className="font-bold text-slate-900">{item.avgCost}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-semibold">Key Intakes:</span>
                    <span className="font-bold text-slate-900">{item.intakes}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-[10px] font-black uppercase text-slate-500 block mb-1">
                    High Demand STEM Fields:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {item.popularCourses.map((c, i) => (
                      <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <button
                  onClick={() => setCurrentPublicView('contact')}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-blue-600 text-white text-xs font-black transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Consult Country Advisor</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 5-Stage Overseas Support Workflow */}
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 mb-16 border-2 border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-cyan-400 block mb-1">
              END-TO-END GLOBAL ADVISORY
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              How NEXTBLOCK Supports Your Global Journey
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { step: '01', title: 'Profile & Country Match', desc: 'Shortlisting universities tailored to your GPA, GRE, and budget.' },
              { step: '02', title: 'SOP & LOR Architecture', desc: 'Crafting compelling statements of purpose and academic resumes.' },
              { step: '03', title: 'Scholarships & Funding', desc: 'Applying for DAAD, Erasmus, and institutional tuition waivers.' },
              { step: '04', title: 'Visa File Preparation', desc: 'Financial proof audit, blocked accounts, and embassy mock interviews.' },
              { step: '05', title: 'Touchdown & Housing', desc: 'Pre-departure checklists, student housing, and alumni connections.' }
            ].map((st) => (
              <div key={st.step} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-black text-cyan-400 block mb-1">{st.step}</span>
                  <h4 className="text-sm font-black text-white mb-2">{st.title}</h4>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed font-normal">{st.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-400 max-w-xl mx-auto font-normal">
            <ShieldCheck className="w-4 h-4 text-cyan-400 inline mr-1" />
            <strong>Transparent Disclaimer:</strong> NEXTBLOCK does not guarantee visa approvals or university admissions. All outcomes are decided independently by university admission committees and government immigration authorities.
          </div>
        </div>

      </div>
    </div>
  );
};
