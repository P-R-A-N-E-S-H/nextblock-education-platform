import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  User, 
  FileText, 
  UploadCloud, 
  Bookmark, 
  CalendarCheck, 
  LogOut, 
  Bell, 
  Sparkles, 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Building2, 
  Plus, 
  FileCheck,
  Layers,
  Scale
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StudentDashboard } from './StudentDashboard';
import { StudentProfile } from './StudentProfile';
import { StudentApplications } from './StudentApplications';
import { StudentDocuments } from './StudentDocuments';
import { StudentShortlist } from './StudentShortlist';
import { StudentSessions } from './StudentSessions';

export const StudentPortalLayout: React.FC = () => {
  const { studentProfile, setCurrentRole, savedCollegeIds, applications, documents, sessions } = useApp();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'profile' | 'applications' | 'documents' | 'shortlist' | 'sessions'>('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'applications', label: 'My Applications', icon: FileText, count: applications.length },
    { id: 'documents', label: 'Document Vault', icon: UploadCloud, count: documents.length },
    { id: 'shortlist', label: 'Saved Colleges', icon: Bookmark, count: savedCollegeIds.length },
    { id: 'sessions', label: 'Counselling Sessions', icon: CalendarCheck, count: sessions.filter(s => s.status === 'Scheduled').length },
    { id: 'profile', label: 'Academic Profile', icon: User }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col pt-16">
      
      {/* Portal Top Bar */}
      <div className="bg-slate-900 border-b-2 border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-16 z-30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-md shadow-blue-500/30">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase text-cyan-400">STUDENT PORTAL</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold border border-emerald-500/30">
                Active Aspirant
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-black text-white">{studentProfile.name}</h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 font-bold">PCM Cutoff:</span>
            <span className="font-black text-cyan-400">{studentProfile.pcmCutoff} / 200</span>
          </div>

          <button
            onClick={() => setCurrentRole('public')}
            className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white transition-colors flex items-center gap-1.5 shadow-md shadow-blue-500/20"
          >
            <span>← Explore 123+ Colleges</span>
          </button>
        </div>
      </div>

      {/* Main Grid Layout: Left Sidebar + Right Content Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Desktop Navigation Sidebar (3 cols) */}
        <div className="hidden lg:block lg:col-span-3 space-y-2">
          <div className="bg-slate-900/90 rounded-3xl p-4 border-2 border-slate-800 space-y-1.5 shadow-xl">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-black transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && item.count > 0 && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                      isActive ? 'bg-white text-blue-900' : 'bg-slate-800 text-cyan-300'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Help Card */}
          <div className="bg-gradient-to-br from-blue-950 to-slate-900 p-5 rounded-3xl border border-cyan-500/30 text-xs">
            <h4 className="font-black text-white mb-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-400" /> Need Counselling Help?
            </h4>
            <p className="text-slate-300 leading-relaxed mb-3">
              Your assigned advisor is <strong>Dr. R. Shanmugam</strong>.
            </p>
            <button
              onClick={() => setActiveTab('sessions')}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors"
            >
              Book Follow-up Call
            </button>
          </div>
        </div>

        {/* Right Active View Content Area (9 cols) */}
        <div className="lg:col-span-9">
          {activeTab === 'dashboard' && <StudentDashboard onNavigate={(tab) => setActiveTab(tab as any)} />}
          {activeTab === 'profile' && <StudentProfile />}
          {activeTab === 'applications' && <StudentApplications />}
          {activeTab === 'documents' && <StudentDocuments />}
          {activeTab === 'shortlist' && <StudentShortlist />}
          {activeTab === 'sessions' && <StudentSessions />}
        </div>

      </div>

      {/* Mobile Bottom App Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t-2 border-slate-800 py-2 px-3 flex items-center justify-around">
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all ${
                isActive ? 'text-cyan-400 font-bold' : 'text-slate-400'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px] font-bold">{item.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

    </div>
  );
};
