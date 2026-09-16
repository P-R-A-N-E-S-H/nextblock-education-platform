import React from 'react';
import { 
  Target, 
  Search, 
  Scale, 
  ClipboardCheck, 
  Coins, 
  Rocket, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { scrollToSection } from '../utils/helpers';

interface WhyNextBlockProps {
  onOpenBooking: () => void;
  onOpenAssessment: () => void;
}

export const WhyNextBlock: React.FC<WhyNextBlockProps> = ({
  onOpenBooking,
  onOpenAssessment
}) => {
  const cards = [
    {
      icon: Target,
      emoji: '🎯',
      title: 'PERSONAL',
      tagline: 'Guidance based on your goals.',
      desc: 'No cookie-cutter advice. Every student receives a custom roadmap structured around their PCM cutoff, target branch, and career aspirations.'
    },
    {
      icon: Search,
      emoji: '🔎',
      title: 'DISCOVERY',
      tagline: 'Explore colleges and courses.',
      desc: 'Live intelligence on 50+ Tamil Nadu engineering powerhouses across Coimbatore, Chennai, Madurai, and all 38 districts.'
    },
    {
      icon: Scale,
      emoji: '⚖️',
      title: 'COMPARISON',
      tagline: 'Make decisions with clarity.',
      desc: 'Evaluate 4 colleges side-by-side on historical cutoffs, NBA Tier-1 accreditation, NIRF metrics, and median placement CTC.'
    },
    {
      icon: ClipboardCheck,
      emoji: '📋',
      title: 'ADMISSION',
      tagline: 'Support from application to admission.',
      desc: 'Flawless TNEA Single Window strategy, certificate verification at TFC centres, choice sequence locking, and upward movement.'
    },
    {
      icon: Coins,
      emoji: '💰',
      title: 'SCHOLARSHIPS',
      tagline: 'Find opportunities that fit you.',
      desc: 'Dedicated assistance to secure 7.5% Government School 100% free tuition & hostel seats, and ₹25,000–₹50,000 First Graduate fee waivers.'
    },
    {
      icon: Rocket,
      emoji: '🚀',
      title: 'CAREER',
      tagline: 'Connect education to your future.',
      desc: 'From Day 1 in engineering to 4th-year tech placement offers at Zoho, Cisco, Amazon, and Qualcomm through our mentor network.'
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-white relative overflow-hidden border-b border-slate-200">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-black uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Why Students Choose NEXTBLOCK</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight mb-5">
            MORE THAN <br className="hidden sm:inline" />
            <span className="text-gradient">A COLLEGE LIST.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
            We don't just hand you college rankings. We combine proprietary cutoff algorithms, personalized 1-on-1 counseling, and verified placement data to architect your entire engineering future.
          </p>
        </div>

        {/* 6 Premium Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {cards.map((card, idx) => {
            const Icon = card.icon;

            return (
              <div
                key={idx}
                className="bg-slate-50 hover:bg-white rounded-3xl p-8 border-2 border-slate-200 hover:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-lg">{card.emoji}</span>
                  </div>

                  <h3 className="text-xl font-black text-slate-950 mb-1 group-hover:text-blue-600 transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-xs font-bold text-blue-700 mb-3">
                    {card.tagline}
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-200 flex items-center justify-between text-xs font-black text-slate-900 group-hover:text-blue-600">
                  <span>Explore Feature</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Strip */}
        <div className="text-center">
          <button
            onClick={onOpenBooking}
            className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-blue-500/25 transition-all inline-flex items-center gap-2"
          >
            <span>Talk to an Admissions Advisor →</span>
          </button>
        </div>

      </div>
    </section>
  );
};
