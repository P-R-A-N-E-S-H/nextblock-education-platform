import React, { useState } from 'react';
import { 
  Kanban, 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  Plus, 
  User, 
  Calendar,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Lead, LeadStatus } from '../../types';

export const CounsellorCRM: React.FC = () => {
  const { leads, updateLeadStatus } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');

  const stages: LeadStatus[] = [
    'New',
    'Contacted',
    'Counselling Scheduled',
    'Shortlisted',
    'Application Started',
    'Converted'
  ];

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      lead.district.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistrict = selectedDistrict === 'All' || lead.district === selectedDistrict;
    return matchesSearch && matchesDistrict;
  });

  const getPriorityColor = (priority: Lead['priority']) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'Medium':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      default:
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Search & Filter Bar */}
      <div className="bg-slate-900 p-4 rounded-3xl border-2 border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads by student name, phone number, or district..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-white focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Districts</option>
            <option value="Coimbatore">Coimbatore</option>
            <option value="Chennai">Chennai</option>
            <option value="Madurai">Madurai</option>
            <option value="Salem">Salem</option>
            <option value="Ramanathapuram">Ramanathapuram</option>
            <option value="Tirunelveli">Tirunelveli</option>
            <option value="Erode">Erode</option>
          </select>
        </div>
      </div>

      {/* Kanban Pipeline Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => {
          const stageLeads = filteredLeads.filter((l) => l.status === stage);

          return (
            <div
              key={stage}
              className="bg-slate-900/90 rounded-3xl p-4 border-2 border-slate-800 flex flex-col min-w-[260px] max-h-[750px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                <h3 className="text-xs font-black uppercase text-white truncate">{stage}</h3>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300">
                  {stageLeads.length}
                </span>
              </div>

              {/* Lead Cards List */}
              <div className="space-y-3 overflow-y-auto flex-1 pr-1">
                {stageLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="bg-slate-950 p-4 rounded-2xl border-2 border-slate-800 hover:border-blue-500/80 transition-all space-y-2.5 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-slate-400">{lead.id}</span>
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${getPriorityColor(lead.priority)}`}>
                        {lead.priority}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-black text-white">{lead.name}</h4>
                      <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-blue-400" /> {lead.city}, {lead.district}
                      </p>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-[11px] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">PCM Cutoff:</span>
                        <span className="font-black text-cyan-300">{lead.pcmCutoff} / 200</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Branch:</span>
                        <span className="font-bold text-white truncate max-w-[120px]">{lead.interestedBranch}</span>
                      </div>
                    </div>

                    {lead.notes && lead.notes.length > 0 && (
                      <p className="text-[10px] text-slate-400 italic bg-slate-900/50 p-2 rounded-lg border border-slate-800/80 line-clamp-2">
                        "{lead.notes[0]}"
                      </p>
                    )}

                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                      <a href={`tel:${lead.phone}`} className="text-cyan-400 hover:underline flex items-center gap-1">
                        <Phone className="w-3 h-3" /> Call
                      </a>

                      {/* Move Stage Selector */}
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                        className="bg-slate-900 text-[10px] font-bold text-slate-300 rounded px-1.5 py-0.5 border border-slate-700"
                      >
                        {stages.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}

                {stageLeads.length === 0 && (
                  <div className="text-center py-8 text-slate-600 text-xs">
                    No leads in {stage}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
