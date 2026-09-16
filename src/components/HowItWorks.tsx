import React, { useState } from 'react';
import { 
  Sparkles, 
  Compass, 
  Map, 
  Layers, 
  Send, 
  Trophy, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

interface HowItWorksProps {
  onOpenBooking: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenBooking }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const steps = [
    {
      number: '01',
      title: 'Discover',
      tagline: 'Understand your goals, interests and academic profile.',
      icon: Compass,
      description: 'We conduct an in-depth academic audit, psychometric aptitude mapping, and budget review to clarify your true career aspirations.',
      deliverables: ['GPA & Transcript Evaluation', 'Career Interest Analysis', 'Target Country Feasibility Check']
    },
    {
      number: '02',
      title: 'Plan',
      tagline: 'Create a personalised education roadmap.',
      icon: Map,
      description: 'Design a high-impact timeline with standardized test schedules (IELTS/GRE), profile-building extracurriculars, and milestone deadlines.',
      deliverables: ['Custom 12-Month Roadmap', 'Test Preparation Strategy', 'Leadership & Research Project Guide']
    },
    {
      number: '03',
      title: 'Shortlist',
      tagline: 'Select universities, courses and opportunities.',
      icon: Layers,
      description: 'Curate a data-backed portfolio of Dream, Target, and Safe institutions balancing rankings, scholarship probabilities, and post-study visas.',
      deliverables: ['Reach / Target / Safety Matrix', 'Scholarship Compatibility Audit', 'Course Curriculum Comparison']
    },
    {
      number: '04',
      title: 'Apply',
      tagline: 'Get support with applications and documentation.',
      icon: Send,
      description: 'Craft unforgettable Statements of Purpose (SOP), secure strategic LORs, and submit error-free applications across global admission portals.',
      deliverables: ['Multi-Round Essay Editing', 'Resume & Activity Sheet Polish', 'Portal Submissions Verification']
    },
    {
      number: '05',
      title: 'Achieve',
      tagline: 'Start your next chapter with confidence.',
      icon: Trophy,
      description: 'Celebrate offers, secure maximum scholarships, complete 100% compliant visa filing, and attend pre-departure orientations.',
      deliverables: ['Offer Evaluation & Acceptance', 'Visa Filing & Mock Interviews', 'Housing & Alumni Buddy Connect']
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-blue-50/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Structured Process</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
            Your Journey. <span className="text-gradient">Simplified.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            A transparent 5-step framework designed to eliminate guesswork, relieve stress, and secure admissions at world-class institutions.
          </p>
        </div>

        {/* Interactive Steps Progression Bar (Desktop) */}
        <div className="hidden lg:grid grid-cols-5 gap-4 mb-12 relative">
          {/* Connecting Line */}
          <div className="absolute top-7 left-12 right-12 h-1 bg-slate-200 -z-0" />
          <div
            className="absolute top-7 left-12 h-1 bg-blue-600 transition-all duration-500 -z-0"
            style={{ width: `${(activeStepIndex / (steps.length - 1)) * 78}%` }}
          />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = idx === activeStepIndex;
            const isCompleted = idx < activeStepIndex;

            return (
              <button
                key={step.number}
                onClick={() => setActiveStepIndex(idx)}
                className="relative z-10 flex flex-col items-center text-center group cursor-pointer"
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-base transition-all duration-300 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-110'
                      : isCompleted
                      ? 'bg-blue-100 text-blue-700 border border-blue-300'
                      : 'bg-white text-slate-600 border border-slate-300 group-hover:border-blue-400 group-hover:bg-blue-50/50'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <span className={`text-xs font-bold mt-3 transition-colors ${isActive ? 'text-blue-600' : 'text-slate-500'}`}>
                  Step {step.number}
                </span>
                <span className={`text-sm font-extrabold transition-colors ${isActive ? 'text-slate-900' : 'text-slate-700'}`}>
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Step Showcase Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden border border-slate-800">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-blue-600 text-white shadow-xs">
                  Step {steps[activeStepIndex].number} Focus
                </span>
                <span className="text-slate-400 text-sm font-medium">
                  {steps[activeStepIndex].tagline}
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                {steps[activeStepIndex].title} Phase
              </h3>

              <p className="text-slate-300 text-base leading-relaxed mb-6 font-normal">
                {steps[activeStepIndex].description}
              </p>

              {/* Deliverables List */}
              <div className="space-y-2.5 mb-8">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-400">
                  What we execute during this step:
                </p>
                {steps[activeStepIndex].deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenBooking}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/30 transition-all text-sm"
                >
                  <span>Start with Step {steps[activeStepIndex].number}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Step Switcher Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    disabled={activeStepIndex === 0}
                    onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                    className="px-3.5 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-semibold"
                  >
                    Previous
                  </button>
                  <button
                    disabled={activeStepIndex === steps.length - 1}
                    onClick={() => setActiveStepIndex((prev) => Math.min(steps.length - 1, prev + 1))}
                    className="px-3.5 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-semibold"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            </div>

            {/* Right Visual Graphic */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 border border-slate-700 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-700 pb-4 mb-4">
                  <span className="text-xs font-bold text-slate-300">Phase Completion Checklist</span>
                  <span className="text-xs font-bold text-cyan-400">100% Guaranteed</span>
                </div>
                
                <div className="space-y-4">
                  {steps.map((s, idx) => (
                    <div
                      key={s.number}
                      onClick={() => setActiveStepIndex(idx)}
                      className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                        idx === activeStepIndex
                          ? 'bg-blue-600/30 border border-blue-500 text-white'
                          : 'bg-slate-900/50 border border-transparent text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-extrabold text-blue-400">{s.number}</span>
                        <span className="text-sm font-semibold">{s.title}</span>
                      </div>
                      {idx <= activeStepIndex ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-600" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
