import React from 'react';
import { 
  Users, 
  Building2, 
  TrendingUp, 
  Award, 
  DollarSign, 
  CheckCircle2, 
  Layers, 
  Compass, 
  ShieldCheck, 
  ArrowUpRight,
  PieChart
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminDashboard: React.FC = () => {
  const { leads, colleges, counsellors, applications } = useApp();

  const convertedLeads = leads.filter((l) => l.status === 'Converted').length;
  const conversionRate = leads.length > 0 ? ((convertedLeads / leads.length) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 p-6 rounded-3xl border-2 border-slate-800 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-cyan-400 flex items-center justify-center mb-3">
            <Users className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Total Active Leads</span>
          <p className="text-3xl font-black text-white my-1">{leads.length}</p>
          <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" /> +28% vs last month
          </span>
        </div>

        <div className="bg-slate-900 p-6 rounded-3xl border-2 border-slate-800 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3">
            <Building2 className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Tamil Nadu Colleges</span>
          <p className="text-3xl font-black text-white my-1">{colleges.length}</p>
          <span className="text-[11px] text-cyan-300 font-bold">50+ Verified Databases</span>
        </div>

        <div className="bg-slate-900 p-6 rounded-3xl border-2 border-slate-800 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Conversion Rate</span>
          <p className="text-3xl font-black text-emerald-400 my-1">{conversionRate}%</p>
          <span className="text-[11px] text-slate-400 font-semibold">TNEA Rounds 1 & 2 Allotment</span>
        </div>

        <div className="bg-slate-900 p-6 rounded-3xl border-2 border-slate-800 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
            <Award className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Fee Waivers Secured</span>
          <p className="text-3xl font-black text-white my-1">₹8.5 Cr+</p>
          <span className="text-[11px] text-amber-400 font-bold">7.5% Govt & FG Schemes</span>
        </div>
      </div>

      {/* 2-Column Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Lead Sources & District Spread (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border-2 border-slate-800 space-y-6">
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-400 mb-4 border-b border-slate-800 pb-2">
              Lead Ingestion Channels
            </h3>
            
            <div className="space-y-3">
              {[
                { source: 'TNEA Cutoff Simulator (Public Hero & Hub)', pct: 45, count: '5,625 Leads', color: 'bg-cyan-500' },
                { source: 'Direct Website Consultation Booking', pct: 28, count: '3,500 Leads', color: 'bg-blue-600' },
                { source: 'AI Branch Diagnostic Quiz', pct: 15, count: '1,875 Leads', color: 'bg-indigo-500' },
                { source: 'WhatsApp / Walk-in Regional Centers', pct: 12, count: '1,500 Leads', color: 'bg-emerald-500' }
              ].map((src, i) => (
                <div key={i} className="space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">{src.source}</span>
                    <span className="font-mono text-cyan-300 font-bold">{src.count} ({src.pct}%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                    <div className={`h-full ${src.color} rounded-full`} style={{ width: `${src.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-400 mb-4 border-b border-slate-800 pb-2">
              Statewide District Heatmap
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs">
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Coimbatore Hub</span>
                <span className="text-lg font-black text-cyan-400">38.4%</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Chennai Metro</span>
                <span className="text-lg font-black text-blue-400">32.1%</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Madurai / South</span>
                <span className="text-lg font-black text-indigo-400">16.5%</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Salem / Erode</span>
                <span className="text-lg font-black text-emerald-400">13.0%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Counsellor Leaderboard (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 p-6 rounded-3xl border-2 border-slate-800">
          <h3 className="text-sm font-black uppercase tracking-wider text-slate-400 mb-4 border-b border-slate-800 pb-2">
            Admissions Counselor Performance
          </h3>

          <div className="space-y-3.5">
            {counsellors.map((c, idx) => (
              <div
                key={c.id}
                className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-blue-600/30 text-cyan-300 font-mono font-bold flex items-center justify-center text-[10px]">
                    #{idx + 1}
                  </span>
                  <div>
                    <h4 className="font-black text-white">{c.name}</h4>
                    <p className="text-[10px] text-slate-400 truncate max-w-[150px]">{c.role}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-black text-emerald-400 block">{c.totalConversions} Placed</span>
                  <span className="text-[10px] text-slate-500 font-semibold">{c.activeLeadsCount} Active Leads</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
