import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ArrowRight, 
  Bookmark, 
  Sparkles, 
  GraduationCap, 
  Building2, 
  Globe2, 
  Bell, 
  Scale, 
  Compass, 
  PhoneCall, 
  Search,
  Home
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { scrollToSection } from '../utils/helpers';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenShortlist: () => void;
  shortlistCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking
}) => {
  const { 
    currentPublicView, 
    setCurrentPublicView,
    comparisonCollegeIds,
    savedCollegeIds,
    unreadNotificationCount,
    setIsNotificationDrawerOpen
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', view: 'home', sectionId: 'home' },
    { name: 'Seat Simulator 🎯', view: 'mock-allotment', isHighlight: true },
    { name: 'Explore Colleges (123+)', view: 'colleges', isHighlight: true },
    { name: 'Find My College', view: 'find-my-college' },
    { name: 'Courses & Branches', view: 'courses-branches' },
    { name: 'Career Guidance', view: 'careers' },
    { name: 'TNEA 2026 Guide', view: 'tnea-guidance' },
    { name: 'Scholarships', view: 'scholarships' },
    { name: 'Compare', view: 'compare', count: comparisonCollegeIds.length },
    { name: 'Study Abroad', view: 'study-abroad' },
    { name: 'Success Stories', view: 'success-stories' },
    { name: 'Resources', view: 'resources' },
    { name: 'About', view: 'about' },
    { name: 'Contact', view: 'contact' }
  ];

  const handleNavClick = (link: { name: string; view: string; sectionId?: string }) => {
    setCurrentPublicView(link.view);
    setMobileMenuOpen(false);

    if (link.view === 'home' && link.sectionId && link.sectionId !== 'home') {
      setTimeout(() => {
        scrollToSection(link.sectionId!);
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/95 backdrop-blur-md shadow-xl border-b border-slate-800 py-2.5'
          : 'bg-slate-950/80 backdrop-blur-sm py-3.5 border-b border-slate-800/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick({ name: 'Home', view: 'home', sectionId: 'home' });
            }}
            className="flex items-center gap-3 group cursor-pointer"
            aria-label="NEXTBLOCK Home"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl overflow-hidden bg-slate-900 border-2 border-cyan-500/40 shadow-lg shadow-cyan-500/20 group-hover:border-cyan-400 group-hover:shadow-cyan-400/40 transition-all duration-300 group-hover:scale-105">
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
                Student College & Career Guide
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (Visible on Laptops & Desktops) */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/90 p-1.5 rounded-full border-2 border-slate-800 shadow-inner">
            {[
              { name: 'Home', view: 'home', icon: Home },
              { name: 'Colleges (123+)', view: 'colleges', isHighlight: true },
              { name: 'Seat Simulator 🎯', view: 'mock-allotment', isHighlight: true },
              { name: 'Find My College', view: 'find-my-college' },
              { name: 'Branches', view: 'courses-branches' },
              { name: 'TNEA 2026 Guide', view: 'tnea-guidance' },
              { name: 'Scholarships', view: 'scholarships' },
              { name: 'Careers', view: 'careers' },
              { name: 'Contact', view: 'contact' }
            ].map((link) => {
              const isActive = currentPublicView === link.view;
              const IconComp = link.icon;
              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link)}
                  className={`px-3 py-1.5 text-xs font-black rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                      : link.isHighlight
                      ? 'text-cyan-300 hover:text-white hover:bg-slate-800'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {IconComp && <IconComp className="w-3.5 h-3.5" />}
                  <span>{link.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Direct Student Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Notifications Bell */}
            <button
              onClick={() => setIsNotificationDrawerOpen(true)}
              className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              title="Admissions Alerts & Deadlines"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-black flex items-center justify-center">
                  {unreadNotificationCount}
                </span>
              )}
            </button>

            {/* Saved Colleges Shortlist Button (No Login Required) */}
            <button
              onClick={() => setCurrentPublicView('shortlist')}
              className={`relative px-3 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
                currentPublicView === 'shortlist'
                  ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/30'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
              title="Saved Colleges"
            >
              <Bookmark className="w-4 h-4 text-amber-400 fill-amber-400/20" />
              <span className="hidden sm:inline">My Shortlist</span>
              {savedCollegeIds.length > 0 && (
                <span className="text-[11px] px-1.5 py-0.2 rounded-md bg-amber-500 text-slate-950 font-black">
                  {savedCollegeIds.length}
                </span>
              )}
            </button>

            {/* Comparison Matrix Direct Shortcut */}
            <button
              onClick={() => setCurrentPublicView('compare')}
              className={`relative px-3 py-2 rounded-xl border text-xs font-bold transition-all hidden md:flex items-center gap-1.5 ${
                currentPublicView === 'compare'
                  ? 'bg-cyan-600 text-white border-cyan-500'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
              title="Compare Colleges"
            >
              <Scale className="w-4 h-4 text-cyan-400" />
              <span>Compare</span>
              {comparisonCollegeIds.length > 0 && (
                <span className="text-[11px] px-1.5 py-0.2 rounded-md bg-cyan-400 text-slate-950 font-black">
                  {comparisonCollegeIds.length}
                </span>
              )}
            </button>

            {/* Primary Action: Book Free Guidance CTA */}
            <button
              onClick={onOpenBooking}
              className="relative group inline-flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs font-black text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-lg shadow-blue-500/30 hover:shadow-cyan-500/50 transition-all duration-200 hover:-translate-y-0.5 border border-cyan-400/30"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
              <span>Free Guidance</span>
            </button>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/98 backdrop-blur-xl border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 shadow-2xl max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-2 duration-200 custom-scrollbar">
          
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-800">
            <button
              onClick={() => {
                setCurrentPublicView('shortlist');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-black text-amber-400 flex items-center justify-center gap-1.5"
            >
              <Bookmark className="w-4 h-4" /> My Shortlist ({savedCollegeIds.length})
            </button>
            <button
              onClick={() => {
                setCurrentPublicView('compare');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-black text-cyan-400 flex items-center justify-center gap-1.5"
            >
              <Scale className="w-4 h-4" /> Compare ({comparisonCollegeIds.length})
            </button>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link)}
                className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-900 transition-colors flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 px-4 rounded-xl text-xs font-black text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-md shadow-blue-500/30 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span>Book 1-on-1 Free Guidance Session</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
