import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Clock, 
  Calendar, 
  User, 
  ArrowRight, 
  Sparkles, 
  X, 
  Share2, 
  Bookmark, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BlogArticle } from '../types';

interface ResourcesPageProps {
  onOpenBooking?: () => void;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({ onOpenBooking }) => {
  const { articles, addToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Articles');
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);

  const categories = [
    'All Articles',
    'TNEA Counselling',
    'College Guides',
    'Branch Selection',
    'Scholarships & Aid',
    'Cutoff & Placements',
    'Student Experiences'
  ];

  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      if (!art.isPublished) return false;
      if (selectedCategory !== 'All Articles' && art.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return (
          art.title.toLowerCase().includes(q) ||
          art.summary.toLowerCase().includes(q) ||
          art.content.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [articles, selectedCategory, searchQuery]);

  const handleShareArticle = (title: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast({
        id: Date.now().toString(),
        title: 'Article Link Copied 📋',
        message: `Shareable link for "${title}" copied.`,
        type: 'info'
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-20 pb-24">
      
      {/* Top Banner Header */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-black uppercase tracking-wider mb-3">
              <BookOpen className="w-4 h-4" /> NextBlock Knowledge Base
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              RESOURCES & GUIDES
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
              In-depth research reports, cutoff closing blueprints, branch selection guides, and state government scholarship handbooks authored by admissions strategists.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs transition-all shadow-xl shadow-blue-500/30 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-cyan-200" />
              <span>Ask a Question to Advisor</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        
        {/* Search & Category Filter Bar */}
        <div className="bg-slate-900 p-5 rounded-3xl border-2 border-slate-800 space-y-4 shadow-xl">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-cyan-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides by title, TNEA round tactics, PSG vs SSN, or branch syllabus..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-cyan-500 font-medium"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                    : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="bg-slate-900 rounded-3xl border-2 border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between overflow-hidden group shadow-xl hover:-translate-y-1"
            >
              <div>
                {/* Article Cover Image */}
                <div className="relative h-48 w-full bg-slate-800 overflow-hidden">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md text-[10px] font-black uppercase text-cyan-400 border border-slate-700">
                    {article.category}
                  </span>

                  <span className="absolute bottom-3 right-3 text-[10px] font-bold text-slate-300 bg-slate-900/80 px-2 py-0.5 rounded backdrop-blur-sm border border-slate-700 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-400" /> {article.readTime}
                  </span>
                </div>

                {/* Article Details */}
                <div className="p-6 space-y-3">
                  <h3 
                    onClick={() => setSelectedArticle(article)}
                    className="text-base font-black text-white hover:text-cyan-400 transition-colors cursor-pointer line-clamp-2 leading-snug"
                  >
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
              </div>

              {/* Author & Read Action Footer */}
              <div className="p-6 pt-0 border-t border-slate-800/80 flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="w-7 h-7 rounded-full object-cover border border-slate-700"
                  />
                  <div className="text-[10px]">
                    <span className="font-bold text-white block">{article.author.name}</span>
                    <span className="text-slate-500 font-medium">{article.publishedDate}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedArticle(article)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white text-xs font-black transition-colors flex items-center gap-1"
                >
                  <span>Read</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Article Detail Full-Reading Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-slate-900 max-w-3xl w-full rounded-3xl border-2 border-slate-800 shadow-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 my-auto custom-scrollbar animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="px-2.5 py-1 rounded-lg bg-blue-600/20 text-cyan-300 text-[10px] font-black uppercase tracking-wider border border-blue-500/30">
                  {selectedArticle.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-2 leading-tight">
                  {selectedArticle.title}
                </h2>
                <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                  <span>By {selectedArticle.author.name}</span>
                  <span>•</span>
                  <span>{selectedArticle.publishedDate}</span>
                  <span>•</span>
                  <span>{selectedArticle.readTime}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShareArticle(selectedArticle.title)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                  title="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Cover Image Banner */}
            <div className="h-60 w-full rounded-2xl overflow-hidden bg-slate-800">
              <img
                src={selectedArticle.coverImage}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Body */}
            <div className="text-sm text-slate-300 space-y-4 leading-relaxed whitespace-pre-line">
              <p className="font-semibold text-white text-base">
                {selectedArticle.summary}
              </p>
              <div className="pt-2 border-t border-slate-800/80">
                {selectedArticle.content}
              </div>
            </div>

            {/* Author Bio Card */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center gap-4">
              <img
                src={selectedArticle.author.avatar}
                alt={selectedArticle.author.name}
                className="w-12 h-12 rounded-xl object-cover border border-slate-700"
              />
              <div className="text-xs">
                <span className="font-black text-white block">{selectedArticle.author.name}</span>
                <span className="text-slate-400 block">{selectedArticle.author.role}</span>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">Have questions regarding this topic?</span>
              <button
                onClick={() => {
                  setSelectedArticle(null);
                  if (onOpenBooking) onOpenBooking();
                }}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs transition-colors shadow-md"
              >
                Book Free Consultation
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
