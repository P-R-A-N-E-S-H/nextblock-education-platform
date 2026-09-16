import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { faqsData } from '../data/faqs';

interface FAQSectionProps {
  onOpenBooking: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const categories = ['All', 'TNEA Counselling', 'Cutoffs & Choice Filling', 'Scholarships', 'Autonomous & Deemed'];

  const filteredFaqs = faqsData.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faqs" className="py-24 bg-slate-50 relative overflow-hidden border-b border-slate-200">
      {/* Background Subtle Highlights */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>Got Questions? We Have Answers</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-950 tracking-tight leading-tight mb-5">
            FREQUENTLY ASKED <span className="text-gradient">QUESTIONS.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
            Everything you need to know about TNEA counselling, cutoff calculations, 7.5% government school quotas, and autonomous college admissions.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                  : 'bg-white text-slate-800 hover:bg-slate-100 border-2 border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Minimal Futuristic Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`rounded-2xl transition-all duration-200 border-2 ${
                  isOpen
                    ? 'bg-white border-blue-500 shadow-lg shadow-blue-500/10'
                    : 'bg-white/90 border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-mono font-extrabold px-2.5 py-0.5 rounded-md ${
                        isOpen ? 'bg-blue-50 text-blue-800' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {faq.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-black text-slate-950">
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                      isOpen ? 'bg-blue-600 text-white rotate-180' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 font-medium">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Callout Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-white border-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-200">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-black text-slate-950">Still have questions about your specific cutoff?</h4>
              <p className="text-xs text-slate-600 mt-0.5 font-medium">Our counselors can analyze your 12th marks in a free 1-on-1 discovery session.</p>
            </div>
          </div>

          <button
            onClick={onOpenBooking}
            className="shrink-0 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-md shadow-blue-500/25 transition-all flex items-center gap-2"
          >
            <span>Ask a Senior Counselor</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
