import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Compass, 
  Search, 
  Scale, 
  Bookmark, 
  FileCheck, 
  Rocket,
  Layers
} from 'lucide-react';
import { scrollToSection } from '../utils/helpers';

interface TheNextBlockSectionProps {
  onOpenBooking: () => void;
  onOpenAssessment: () => void;
}

export const TheNextBlockSection: React.FC<TheNextBlockSectionProps> = ({
  onOpenBooking,
  onOpenAssessment
}) => {
  const steps = [
    {
      step: '01',
      title: 'DISCOVER',
      subtitle: 'Understand your interests and possibilities.',
      desc: 'Map your 12th PCM marks, strengths, and natural aptitude to high-growth engineering domains.',
      icon: Compass,
      tag: 'Aptitude Diagnostic'
    },
    {
      step: '02',
      title: 'EXPLORE',
      subtitle: 'Find courses and colleges.',
      desc: 'Search 50+ Tamil Nadu engineering colleges across Coimbatore, Chennai, and Madurai hubs with placement metrics.',
      icon: Search,
      tag: 'College Discovery'
    },
    {
      step: '03',
      title: 'COMPARE',
      subtitle: 'Evaluate your options.',
      desc: 'Compare cutoffs, fees, NBA Tier-1 accreditation, NIRF rankings, and highest salary packages side-by-side.',
      icon: Scale,
      tag: '4-Way Comparison'
    },
    {
      step: '04',
      title: 'SHORTLIST',
      subtitle: 'Build your personal college list.',
      desc: 'Structure an airtight choice list categorized into Dream, Target, and Safety colleges for TNEA Round 1.',
      icon: Bookmark,
      tag: 'Choice Ordering'
    },
    {
      step: '05',
      title: 'APPLY',
      subtitle: 'Get admission and application support.',
      desc: 'Verify 7.5% Government School bonafides, First Graduate waivers, and lock choices without mistakes.',
      icon: FileCheck,
      tag: 'TFC & Round Locking'
    },
    {
      step: '06',
      title: 'ACHIEVE',
      subtitle: 'Take the next step toward your career.',
      desc: 'Secure your dream seat and leverage senior alumni mentorship to land product engineering offers in 4th year.',
      icon: Rocket,
      tag: 'Placement Success'
    }
  ];

  return (
    <section id="journey" className="py-24 bg-white relative overflow-hidden border-b border-slate-200">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-black uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>The NEXTBLOCK Framework</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight mb-5">
            YOUR JOURNEY. <br className="hidden sm:inline" />
            <span className="text-gradient">ONE BLOCK AT A TIME.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
            Every major education decision connects to the next. NEXTBLOCK guides you through six structured milestones to take you from 12th board exams to your dream college seat.
          </p>
        </div>

        {/* 6 Connected 3D Blocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {steps.map((item, idx) => {
            const Icon = item.icon;

            return (
              <div
                key={item.step}
                className="bg-slate-50 hover:bg-white rounded-3xl p-7 border-2 border-slate-200 hover:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-xl border border-blue-200">
                      {item.step} — {item.title}
                    </span>
                    <span className="text-[10px] font-black text-slate-500 bg-slate-200/70 px-2.5 py-0.5 rounded-full">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-950 mb-1.5 group-hover:text-blue-600 transition-colors">
                    {item.subtitle}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-200 flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                    <Icon className="w-4 h-4" />
                  </div>

                  <span className="text-xs font-black text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Explore Step</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="bg-slate-950 text-white rounded-3xl p-8 border-2 border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h4 className="text-base font-black text-white">Not sure where your cutoff puts you?</h4>
            <p className="text-xs text-slate-400 mt-0.5">Use our TNEA cutoff simulator to get your Dream, Target, and Safe options in seconds.</p>
          </div>

          <button
            onClick={() => scrollToSection('smart-finder')}
            className="shrink-0 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2"
          >
            <span>Simulate College Choices →</span>
          </button>
        </div>

      </div>
    </section>
  );
};
