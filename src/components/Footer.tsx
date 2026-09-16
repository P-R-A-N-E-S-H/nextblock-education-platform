import React, { useState } from 'react';
import { 
  ArrowRight, 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  CheckCircle2,
  Sparkles,
  GraduationCap
} from 'lucide-react';
import { scrollToSection } from '../utils/helpers';
import { ToastMessage } from '../types';
import { useApp } from '../context/AppContext';
import { sendNewsletterSubscriptionEmail, RECIPIENT_EMAIL } from '../services/emailService';

interface FooterProps {
  onOpenBooking: () => void;
  onSuccessToast?: (toast: ToastMessage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onSuccessToast }) => {
  const { setCurrentPublicView, setSelectedCity, addToast } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes('@')) {
      const email = newsletterEmail;
      setNewsletterEmail('');
      addToast({
        id: Date.now().toString(),
        title: 'Subscribed to NEXTBLOCK TNEA Updates 📬',
        message: `We'll send cutoff shifts, round schedules, and scholarship alerts to ${email}.`,
        type: 'success'
      });
      await sendNewsletterSubscriptionEmail(email);
    }
  };

  const handleLinkClick = (view: string, sectionId?: string) => {
    setCurrentPublicView(view);
    if (view === 'home' && sectionId) {
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCityClick = (cityName: string) => {
    setSelectedCity(cityName);
    setCurrentPublicView('city-hub');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-slate-950 text-slate-400 pt-20 pb-12 border-t-2 border-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-slate-800">
          
          {/* Col 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('home', 'home');
              }}
              className="flex items-center gap-3 group cursor-pointer mb-4"
            >
              <div className="relative flex items-center justify-center w-11 h-11 rounded-xl overflow-hidden bg-slate-900 border-2 border-cyan-500/40 shadow-lg shadow-cyan-500/20 group-hover:border-cyan-400 transition-all duration-300">
                <div className="flex items-end gap-1">
                  <span className="w-1.5 h-3.5 bg-blue-600 rounded-sm" />
                  <span className="w-1.5 h-5 bg-blue-400 rounded-sm" />
                  <span className="w-1.5 h-7 bg-cyan-400 rounded-sm" />
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white leading-none">
                  NEXT<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">BLOCK</span>
                </span>
                <span className="text-[10px] tracking-wider text-cyan-300 font-extrabold uppercase mt-0.5">
                  Education Consultancy
                </span>
              </div>
            </a>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm mb-4">
              NEXTBLOCK helps students and parents discover engineering colleges, evaluate TNEA cutoffs, optimize choice filling lists, secure state welfare scholarships, and explore study abroad pathways.
            </p>

            <span className="text-xs font-black text-white block mb-2 uppercase tracking-wider">
              Get TNEA 2026 Cutoff Shift Alerts
            </span>
            <form onSubmit={handleSubscribe} className="flex gap-2 w-full max-w-sm">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter email address..."
                className="px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400 flex-1 font-medium"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Col 2: EXPLORE (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">EXPLORE</h4>
            <ul className="space-y-2 text-xs font-bold">
              <li>
                <button onClick={() => handleLinkClick('colleges')} className="hover:text-cyan-300 transition-colors">
                  Colleges Directory
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('find-my-college')} className="hover:text-cyan-300 transition-colors">
                  Find My College
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('compare')} className="hover:text-cyan-300 transition-colors">
                  Compare Colleges
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('courses-branches')} className="hover:text-cyan-300 transition-colors">
                  Engineering Branches
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('scholarships')} className="hover:text-cyan-300 transition-colors">
                  Scholarships & Aid
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: GUIDANCE (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">GUIDANCE</h4>
            <ul className="space-y-2 text-xs font-bold">
              <li>
                <button onClick={() => handleLinkClick('tnea-guidance')} className="hover:text-cyan-300 transition-colors">
                  TNEA 2026 Guide
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('careers')} className="hover:text-cyan-300 transition-colors">
                  Career Pathways
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('study-abroad')} className="hover:text-cyan-300 transition-colors">
                  Study Abroad
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('success-stories')} className="hover:text-cyan-300 transition-colors">
                  Success Stories
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('resources')} className="hover:text-cyan-300 transition-colors">
                  Resources & Blog
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: REGIONAL HUBS (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">REGIONAL HUBS</h4>
            <ul className="space-y-2 text-xs font-bold">
              <li>
                <button onClick={() => handleCityClick('Coimbatore')} className="hover:text-cyan-300 transition-colors">
                  Coimbatore Colleges
                </button>
              </li>
              <li>
                <button onClick={() => handleCityClick('Chennai')} className="hover:text-cyan-300 transition-colors">
                  Chennai Colleges
                </button>
              </li>
              <li>
                <button onClick={() => handleCityClick('Madurai')} className="hover:text-cyan-300 transition-colors">
                  Madurai Colleges
                </button>
              </li>
              <li>
                <button onClick={() => handleCityClick('Salem')} className="hover:text-cyan-300 transition-colors">
                  Salem Colleges
                </button>
              </li>
              <li>
                <button onClick={() => handleCityClick('Erode')} className="hover:text-cyan-300 transition-colors">
                  Erode Colleges
                </button>
              </li>
              <li>
                <button onClick={() => handleCityClick('Tiruchirappalli')} className="hover:text-cyan-300 transition-colors">
                  Trichy Colleges
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: COMPANY (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">COMPANY</h4>
            <ul className="space-y-2 text-xs font-bold">
              <li>
                <button onClick={() => handleLinkClick('about')} className="hover:text-cyan-300 transition-colors">
                  About NEXTBLOCK
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('contact')} className="hover:text-cyan-300 transition-colors">
                  Contact Advisors
                </button>
              </li>
              <li>
                <button onClick={onOpenBooking} className="text-cyan-400 hover:underline">
                  Book Counselling →
                </button>
              </li>
            </ul>

            <div className="pt-2 text-xs text-slate-400">
              <span className="font-bold text-white block">Admissions Helpline:</span>
              <a href="tel:+919385465849" className="text-cyan-300 hover:text-white font-bold block mt-0.5 transition-colors">
                📞 +91 93854 65849
              </a>
              <a href={`mailto:${RECIPIENT_EMAIL}`} className="text-cyan-400 hover:text-white text-[11px] block transition-colors font-mono mt-0.5">
                {RECIPIENT_EMAIL}
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-500 font-medium">
            © 2026 NEXTBLOCK Education Consultancy. Build Your Future. One Block at a Time.
          </p>

          <div className="flex items-center gap-4 text-slate-400 font-bold">
            <button
              onClick={() => handleLinkClick('privacy')}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => handleLinkClick('terms')}
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </button>
            <button
              onClick={() => handleLinkClick('disclaimer')}
              className="hover:text-white transition-colors"
            >
              Disclaimer
            </button>
            <button
              onClick={() => handleLinkClick('cookie-policy')}
              className="hover:text-white transition-colors"
            >
              Cookie Policy
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
