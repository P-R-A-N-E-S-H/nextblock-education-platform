import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  Star, 
  Building2, 
  GraduationCap, 
  Briefcase, 
  MapPin, 
  Sparkles, 
  Quote, 
  ShieldCheck,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { testimonialsData } from '../data/testimonials';

interface SuccessStoriesPageProps {
  onOpenBooking?: () => void;
}

export const SuccessStoriesPage: React.FC<SuccessStoriesPageProps> = ({ onOpenBooking }) => {
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const filterTags = ['All', '7.5% Govt Quota', 'First Graduate', 'Top Product Placement', 'Tier-1 Autonomous'];

  const filteredStories = testimonialsData.filter(item => {
    if (selectedTag === 'All') return true;
    return item.categoryTag === selectedTag;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-20 pb-24">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-black uppercase tracking-wider mb-3">
              <ShieldCheck className="w-4 h-4" /> 100% Genuine Allotment Testimonials
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              BUILT WITH NEXTBLOCK
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Read authentic stories of Tamil Nadu students who transformed their 12th board marks into premier engineering seats, government fee waivers, and top-tier tech placements.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs transition-all shadow-xl shadow-blue-500/30 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-cyan-200" />
              <span>Book Your Strategy Call</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-900 p-2.5 rounded-2xl border border-slate-800 w-fit">
          {filterTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                selectedTag === tag
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              className="bg-slate-900 rounded-3xl p-7 border-2 border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-6 shadow-2xl relative overflow-hidden group"
            >
              <div className="space-y-4">
                
                {/* Student Info Bar */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={story.avatar}
                      alt={story.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-700 shadow-md"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-black text-white">{story.name}</h3>
                        <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          <CheckCircle2 className="w-3 h-3" /> Verified Allotment
                        </span>
                      </div>
                      <span className="text-xs text-slate-400 block font-medium mt-0.5">
                        {story.hometown}
                      </span>
                    </div>
                  </div>

                  {/* Highlight Badge */}
                  <span className="text-[10px] px-2.5 py-1 rounded-lg bg-blue-600/20 text-cyan-300 font-black border border-blue-500/30 text-right">
                    {story.highlightTag}
                  </span>
                </div>

                {/* College & Placement Details Box */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-bold">Allotted College:</span>
                    <strong className="text-white text-right max-w-[200px] truncate">{story.university}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-bold">Branch:</span>
                    <span className="text-cyan-300 font-bold">{story.course}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-900">
                    <span className="text-slate-400 font-bold">12th PCM Score:</span>
                    <span className="text-white font-mono font-bold">{story.cutoff}</span>
                  </div>
                  {story.placedPackage && (
                    <div className="flex items-center justify-between pt-1 border-t border-slate-900">
                      <span className="text-emerald-400 font-bold">Career Outcome:</span>
                      <strong className="text-emerald-400 font-black">{story.placedPackage}</strong>
                    </div>
                  )}
                </div>

                {/* Quote */}
                <div className="relative">
                  <Quote className="w-6 h-6 text-slate-700 absolute -top-2 -left-1 -z-0 opacity-40" />
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic relative z-10 pl-2">
                    "{story.quote}"
                  </p>
                </div>

              </div>

              {/* Rating Footer */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-[11px] font-bold text-slate-400 ml-1.5">5.0 Star Feedback</span>
                </div>

                <span className="text-[11px] text-slate-500 font-mono">
                  {story.allotmentRound}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
