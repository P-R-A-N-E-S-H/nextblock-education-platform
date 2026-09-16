import React, { useState } from 'react';
import { 
  BookOpen, 
  ArrowRight, 
  Clock, 
  Calendar, 
  Sparkles, 
  X, 
  Download, 
  Share2, 
  UserCircle2, 
  FileText 
} from 'lucide-react';
import { resourcesData } from '../data/resources';
import { ResourceItem } from '../types';

interface ResourcesSectionProps {
  onOpenBooking: () => void;
}

export const ResourcesSection: React.FC<ResourcesSectionProps> = ({ onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);

  const categories = [
    'All',
    'TNEA Counselling',
    'Cutoff & Placements',
    'College Guides',
    'Scholarships & Aid',
    'Branch Selection',
    'Student Experiences'
  ];

  const filteredResources = resourcesData.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  return (
    <section id="resources" className="py-24 bg-white relative overflow-hidden border-b border-slate-200">
      {/* Background Dots */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>TNEA & Engineering Knowledge Base</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight mb-5">
            Learn Before <span className="text-gradient">You Lock Your Choices.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
            Free masterclasses, choice filling blueprints, cutoff shift analyses, and scholarship guides written by senior Tamil Nadu engineering admission strategists.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Resource Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="group bg-white rounded-3xl overflow-hidden border-2 border-slate-200 shadow-sm hover:shadow-xl hover:shadow-blue-500/15 hover:border-blue-500 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image & Category Pill */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                  <img
                    src={resource.image}
                    alt={resource.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
                  
                  {/* Category Pill */}
                  <span className="absolute top-4 left-4 text-[11px] font-black px-3 py-1 rounded-full bg-white text-blue-900 shadow-md">
                    {resource.category}
                  </span>

                  {/* Read Time */}
                  <span className="absolute bottom-3 left-4 text-xs font-bold text-slate-200 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    {resource.readTime}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-6">
                  <p className="text-[11px] font-bold text-slate-500 mb-1.5 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-blue-600" /> {resource.date}
                  </p>
                  
                  <h3 className="text-base font-black text-slate-950 mb-2.5 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                    {resource.title}
                  </h3>

                  <p className="text-xs text-slate-700 leading-relaxed font-normal line-clamp-3 mb-6">
                    {resource.summary}
                  </p>
                </div>
              </div>

              {/* Card Footer: Author & Read Trigger */}
              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={resource.author.avatar}
                    alt={resource.author.name}
                    className="w-7 h-7 rounded-full object-cover border border-slate-200"
                  />
                  <span className="text-[11px] font-bold text-slate-800 truncate max-w-[130px]">
                    {resource.author.name}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedResource(resource)}
                  className="inline-flex items-center gap-1.5 text-xs font-extrabold text-blue-700 hover:text-blue-900 transition-colors group/btn"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Article Detail Modal */}
      {selectedResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border-2 border-slate-300 relative max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedResource(null)}
              className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-colors"
              aria-label="Close article modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Image */}
            <div className="relative h-56 w-full">
              <img
                src={selectedResource.image}
                alt={selectedResource.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
              
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-xs font-black px-3 py-1 rounded-md bg-blue-600 text-white uppercase">
                  {selectedResource.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-2 leading-tight">
                  {selectedResource.title}
                </h3>
              </div>
            </div>

            {/* Article Content */}
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedResource.author.avatar}
                    alt={selectedResource.author.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-950">{selectedResource.author.name}</h4>
                    <p className="text-[11px] text-slate-600 font-semibold">{selectedResource.author.role}</p>
                  </div>
                </div>

                <div className="text-right text-xs text-slate-500">
                  <p className="font-bold text-slate-800">{selectedResource.date}</p>
                  <p>{selectedResource.readTime}</p>
                </div>
              </div>

              <div className="prose prose-slate max-w-none text-sm text-slate-700 leading-relaxed space-y-4 mb-8">
                <p className="font-bold text-slate-950 text-base">
                  {selectedResource.summary}
                </p>
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs font-medium text-slate-800 whitespace-pre-line leading-relaxed">
                  {selectedResource.content}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-200">
                <button
                  onClick={() => {
                    setSelectedResource(null);
                    onOpenBooking();
                  }}
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-xl font-extrabold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/30 flex items-center justify-center gap-2 text-sm transition-all"
                >
                  <span>Discuss Strategy with a Counselor</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
