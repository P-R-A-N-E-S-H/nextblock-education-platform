import React, { useState } from 'react';
import { 
  GraduationCap, 
  Globe2, 
  Compass, 
  Award, 
  FileCheck2, 
  ShieldCheck, 
  Building2,
  BrainCircuit,
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  X,
  CalendarCheck,
  Target,
  Rocket
} from 'lucide-react';
import { servicesData } from '../data/services';
import { ServiceItem } from '../types';

interface ServicesProps {
  onOpenBooking: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenBooking }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap': return GraduationCap;
      case 'Building2': return Building2;
      case 'Compass': return Compass;
      case 'Target': return Target;
      case 'Award': return Award;
      case 'Sparkles': return Sparkles;
      case 'ShieldCheck': return ShieldCheck;
      case 'Rocket': return Rocket;
      default: return Sparkles;
    }
  };

  return (
    <section id="services" className="py-24 bg-white relative overflow-hidden border-b border-slate-200">
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>End-to-End Engineering Advisory</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-950 tracking-tight leading-tight mb-5">
            EVERYTHING YOU NEED. <br />
            <span className="text-gradient">ONE PLATFORM.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
            From PCM cutoff diagnostics and TNEA choice filling to 7.5% Govt School waivers and product company tech roadmaps, we guide you through every milestone.
          </p>
        </div>

        {/* 8 Services 3D Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.map((service) => {
            const Icon = getIcon(service.iconName);

            return (
              <div
                key={service.id}
                className="group relative bg-slate-50 hover:bg-white rounded-3xl p-7 border-2 border-slate-200/90 shadow-sm hover:shadow-2xl hover:shadow-blue-500/15 hover:border-blue-500 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Icon + Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>

                    {service.badge && (
                      <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-200">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-lg font-black text-slate-950 mb-1.5 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-xs font-bold text-blue-700 mb-3">
                    {service.tagline}
                  </p>

                  {/* Short Description */}
                  <p className="text-xs text-slate-700 leading-relaxed mb-5 font-normal line-clamp-3">
                    {service.description}
                  </p>

                  {/* Features Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {service.features.slice(0, 3).map((feat, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-slate-200 text-slate-800"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA trigger */}
                <div className="pt-3 border-t border-slate-200">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="w-full inline-flex items-center justify-between text-xs font-extrabold text-blue-700 hover:text-blue-900 transition-colors group/btn py-1"
                  >
                    <span>View Service Breakdown</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl border-2 border-slate-300 relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-6 right-6 p-2 rounded-full text-slate-500 hover:text-slate-950 hover:bg-slate-100 transition-colors"
              aria-label="Close service modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Service Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
                {React.createElement(getIcon(selectedService.iconName), { className: 'w-7 h-7' })}
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-950">{selectedService.title}</h3>
                <p className="text-xs font-bold text-blue-700">{selectedService.tagline}</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-6">
              {selectedService.description}
            </p>

            {/* Deliverables List */}
            <div className="mb-8 bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
                Key Deliverables Included:
              </h4>
              <div className="space-y-3">
                {selectedService.deliverables.map((deliv, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-900 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{deliv}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Action CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => {
                  setSelectedService(null);
                  onOpenBooking();
                }}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-extrabold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/30 transition-all text-xs sm:text-sm"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book 1-on-1 Strategy for {selectedService.title}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
