import React, { useState } from 'react';
import { 
  BarChart3, 
  Building2, 
  Users, 
  BookOpen,
  Settings, 
  LogOut, 
  TrendingUp, 
  ShieldCheck, 
  Award,
  Sparkles,
  Layers
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AdminDashboard } from './AdminDashboard';
import { AdminCollegeCMS } from './AdminCollegeCMS';
import { AdminLeadManager } from './AdminLeadManager';
import { AdminContentCMS } from './AdminContentCMS';
import { AdminSettings } from './AdminSettings';

export const AdminPortalLayout: React.FC = () => {
  const { setCurrentRole, leads, colleges, articles } = useApp();
  const [activeTab, setActiveTab] = useState<'analytics' | 'colleges' | 'leads' | 'content' | 'settings'>('analytics');

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col pt-16">
      
      {/* Top Admin Header */}
      <div className="bg-slate-900 border-b-2 border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-16 z-30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center font-bold text-white shadow-md">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase text-cyan-400">ADMINISTRATOR MASTER CONSOLE</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-extrabold border border-indigo-500/30">
                Super Admin
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-black text-white">NEXTBLOCK Enterprise Master Console</h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-4 bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-800 text-xs">
            <div>
              <span className="text-slate-400">Total Colleges: </span>
              <span className="font-black text-cyan-400">{colleges.length}</span>
            </div>
            <div className="h-4 w-px bg-slate-800" />
            <div>
              <span className="text-slate-400">Total Leads: </span>
              <span className="font-black text-emerald-400">{leads.length}</span>
            </div>
          </div>

          <button
            onClick={() => setCurrentRole('public')}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 hover:text-white border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Back to Public Site</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Navigation Tabs Bar */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border-2 border-slate-800 w-fit">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === 'analytics'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Analytics & KPIs</span>
          </button>

          <button
            onClick={() => setActiveTab('colleges')}
            className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === 'colleges'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Colleges CMS & Verification</span>
            <span className="text-[10px] px-2 py-0.2 rounded-full bg-slate-800 text-cyan-300">
              {colleges.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === 'leads'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Global Lead Allocation</span>
            <span className="text-[10px] px-2 py-0.2 rounded-full bg-slate-800 text-cyan-300">
              {leads.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('content')}
            className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === 'content'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Blog & Resources CMS</span>
            <span className="text-[10px] px-2 py-0.2 rounded-full bg-slate-800 text-cyan-300">
              {articles.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === 'settings'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Platform Settings</span>
          </button>
        </div>

        {/* Content Views */}
        {activeTab === 'analytics' && <AdminDashboard />}
        {activeTab === 'colleges' && <AdminCollegeCMS />}
        {activeTab === 'leads' && <AdminLeadManager />}
        {activeTab === 'content' && <AdminContentCMS />}
        {activeTab === 'settings' && <AdminSettings />}

      </div>

    </div>
  );
};
