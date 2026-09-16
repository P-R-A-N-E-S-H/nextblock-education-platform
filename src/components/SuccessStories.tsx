import React, { useState, useEffect } from 'react';
import { Star, Quote, Award, Users, Building2, TrendingUp, Sparkles, CheckCircle2, MapPin, School, Briefcase, ChevronRight, ShieldCheck } from 'lucide-react';
import { testimonialsData, statisticsData } from '../data/testimonials';

interface SuccessStoriesProps {
  onOpenBooking: () => void;
}

export const SuccessStories: React.FC<SuccessStoriesProps> = ({ onOpenBooking }) => {
  const [activeFilter, setActiveFilter] = useState<'All' | '7.5% Govt Quota' | 'First Graduate' | 'Top Product Placement' | 'Tier-1 Autonomous'>('All');
  const [counters, setCounters] = useState({
    students: 0,
    colleges: 0,
    success: 0,
    rating: 0,
    scholarships: 0
  });

  // Animated counter effect on mount
  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const stepTime = 20;
    const totalSteps = duration / stepTime;

    const timer = setInterval(() => {
      start++;
      const progress = start / totalSteps;
      if (progress >= 1) {
        setCounters({
          students: 12500,
          colleges: 450,
          success: 99.4,
          rating: 4.9,
          scholarships: 8.5
        });
        clearInterval(timer);
      } else {
        setCounters({
          students: Math.round(12500 * progress),
          colleges: Math.round(450 * progress),
          success: Number((99.4 * progress).toFixed(1)),
          rating: Number((4.9 * progress).toFixed(1)),
          scholarships: Number((8.5 * progress).toFixed(1))
        });
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const filteredTestimonials = testimonialsData.filter((item) => {
    if (activeFilter === 'All') return true;
    return item.categoryTag === activeFilter;
  });

  return (
    <section id="stories" className="py-24 bg-slate-50 relative overflow-hidden border-b border-slate-200">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-black uppercase tracking-wider mb-4">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Verified Student Journeys & Real Outcomes</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight mb-5">
            FROM 12th BOARD CUTOFFS <br className="hidden sm:inline" />
            <span className="text-gradient">TO DREAM CAMPUS SEATS.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
            Read real, verified stories of Tamil Nadu students who navigated TNEA choice filling, 7.5% Govt School reservation, and First Graduate concessions with NEXTBLOCK.
          </p>
        </div>

        {/* Dynamic Statistics Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-16">
          <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm text-center">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
              <Users className="w-5 h-5" />
            </div>
            <p className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              {counters.students}+
            </p>
            <p className="text-xs font-extrabold text-slate-700 uppercase tracking-wider mt-1">Aspirants Guided</p>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">Across 38 TN Districts</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm text-center">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
              <Building2 className="w-5 h-5" />
            </div>
            <p className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              {counters.colleges}+
            </p>
            <p className="text-xs font-extrabold text-slate-700 uppercase tracking-wider mt-1">Colleges Profiled</p>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">Govt, Aided & Autonomous</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm text-center">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-5 h-5" />
            </div>
            <p className="text-3xl sm:text-4xl font-black text-emerald-600 tracking-tight">
              {counters.success}%
            </p>
            <p className="text-xs font-extrabold text-slate-700 uppercase tracking-wider mt-1">Allotment Success</p>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">In Rounds 1 & 2</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm text-center">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3">
              <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
            </div>
            <p className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              {counters.rating}/5
            </p>
            <p className="text-xs font-extrabold text-slate-700 uppercase tracking-wider mt-1">Student Trust</p>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">From 2,400+ reviews</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm text-center col-span-2 lg:col-span-1">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mx-auto mb-3">
              <Award className="w-5 h-5" />
            </div>
            <p className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              ₹{counters.scholarships}Cr+
            </p>
            <p className="text-xs font-extrabold text-slate-700 uppercase tracking-wider mt-1">Fee Aid & Waivers</p>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">7.5% Quota & FG Concessions</p>
          </div>
        </div>

        {/* Realistic Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { label: 'All Verified Stories', value: 'All' },
            { label: '🌟 7.5% Govt School 100% Free Seats', value: '7.5% Govt Quota' },
            { label: '🚀 Top Product Placements (Cisco, Zoho, PayPal, Amazon)', value: 'Top Product Placement' },
            { label: '🎓 Tier-1 Autonomous (PSG, CIT, SSN, KCT, TCE)', value: 'Tier-1 Autonomous' },
            { label: '💡 First Graduate Concession Beneficiaries', value: 'First Graduate' }
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all ${
                activeFilter === tab.value
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-[1.02]'
                  : 'bg-white text-slate-800 border-2 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredTestimonials.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-3xl p-7 sm:p-8 border-2 border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Card Top: Student Profile, Hometown, Rating, and Verified Badge */}
                <div className="flex items-start justify-between gap-4 mb-5 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={story.avatar}
                      alt={story.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-blue-200 shadow-sm"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80';
                      }}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-black text-slate-950">{story.name}</h4>
                        <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <ShieldCheck className="w-3 h-3" /> Verified Allottee
                        </span>
                      </div>

                      {story.hometown && (
                        <p className="text-xs text-slate-600 font-semibold flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-blue-600" /> {story.hometown}
                        </p>
                      )}

                      {story.school && (
                        <p className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                          <School className="w-3 h-3 text-slate-400" /> {story.school}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="flex items-center gap-0.5 justify-end mb-1">
                      {[...Array(story.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-blue-50 text-blue-900 border border-blue-200 inline-block">
                      {story.highlightTag}
                    </span>
                  </div>
                </div>

                {/* Score & Allotment Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-slate-500 block">Board Performance</span>
                    <span className="font-black text-blue-700 block">{story.cutoff}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-slate-500 block">TNEA Allotment Result</span>
                    <span className="font-black text-emerald-700 block">{story.allotmentRound || 'TNEA Allotment Confirmed'}</span>
                  </div>
                </div>

                {/* Student Quote */}
                <div className="relative mb-6">
                  <Quote className="w-7 h-7 text-blue-200 absolute -top-2.5 -left-1.5 -z-0 opacity-60" />
                  <p className="relative z-10 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal italic pl-4 border-l-2 border-blue-400">
                    "{story.quote}"
                  </p>
                </div>
              </div>

              {/* Card Bottom: College, Branch, Placement Package */}
              <div className="pt-4 border-t-2 border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h5 className="text-xs font-black text-slate-950">{story.course}</h5>
                  <p className="text-[11px] font-extrabold text-blue-700">{story.university} ({story.location})</p>
                </div>

                {story.placedCompany && (
                  <div className="bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 text-right shrink-0">
                    <span className="text-[10px] font-extrabold uppercase text-emerald-800 block flex items-center gap-1 justify-end">
                      <Briefcase className="w-3 h-3" /> Placed At
                    </span>
                    <span className="text-xs font-black text-emerald-700 block">
                      {story.placedCompany} • {story.placedPackage}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 bg-slate-950 text-white rounded-3xl p-8 border-2 border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-400/30">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-black text-white">Ready to secure your top engineering seat?</h4>
              <p className="text-xs text-slate-300 mt-0.5 font-normal">Connect with a senior TNEA admissions counselor for a personalized choice list.</p>
            </div>
          </div>

          <button
            onClick={onOpenBooking}
            className="shrink-0 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2"
          >
            <span>Start Free Counselling →</span>
          </button>
        </div>

      </div>
    </section>
  );
};
