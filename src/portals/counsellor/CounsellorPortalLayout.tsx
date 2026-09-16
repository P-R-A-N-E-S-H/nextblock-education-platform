import React, { useState } from 'react';
import { 
  Users, 
  Kanban, 
  CalendarCheck, 
  CheckSquare, 
  LogOut, 
  Sparkles, 
  ShieldCheck, 
  FileCheck,
  TrendingUp,
  Search,
  Filter
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CounsellorCRM } from './CounsellorCRM';
import { CounsellorStudents } from './CounsellorStudents';
import { CounsellorSessions } from './CounsellorSessions';

export const CounsellorPortalLayout: React.FC = () => {
  const { setCurrentRole, leads, sessions, documents } = useApp();
  const [activeTab, setActiveTab] = useState<'crm' | 'students' | 'sessions' | 'docs'>('crm');

  const pendingDocsCount = documents.filter((d) => d.status === 'Under Review').length;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col pt-16">
      
      {/* Top Counsellor Header */}
      <div className="bg-slate-900 border-b-2 border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-16 z-30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-md shadow-blue-500/30">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase text-cyan-400">COUNSELLOR CRM PORTAL</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-extrabold border border-blue-500/30">
                Dr. R. Shanmugam
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-black text-white">Admissions & TNEA Choice Strategist</h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-4 bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-800 text-xs">
            <div>
              <span className="text-slate-400">Total Leads: </span>
              <span className="font-black text-cyan-400">{leads.length}</span>
            </div>
            <div className="h-4 w-px bg-slate-800" />
            <div>
              <span className="text-slate-400">Pending Docs: </span>
              <span className="font-black text-amber-400">{pendingDocsCount}</span>
            </div>
          </div>

          <button
            onClick={() => setCurrentRole('public')}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 hover:text-white border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exit to Public Site</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border-2 border-slate-800 w-fit">
          <button
            onClick={() => setActiveTab('crm')}
            className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === 'crm'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Kanban className="w-4 h-4" />
            <span>Leads CRM Pipeline</span>
            <span className="text-[10px] px-2 py-0.2 rounded-full bg-slate-800 text-cyan-300">
              {leads.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('students')}
            className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === 'students'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Assigned Students & Dossiers</span>
          </button>

          <button
            onClick={() => setActiveTab('sessions')}
            className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === 'sessions'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Session Schedule</span>
            <span className="text-[10px] px-2 py-0.2 rounded-full bg-slate-800 text-cyan-300">
              {sessions.length}
            </span>
          </button>
        </div>

        {/* Content Views */}
        {activeTab === 'crm' && <CounsellorCRM />}
        {activeTab === 'students' && <CounsellorStudents />}
        {activeTab === 'sessions' && <CounsellorSessions />}

      </div>

    </div>
  );
};
