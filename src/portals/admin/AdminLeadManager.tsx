import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  UserCheck, 
  ArrowRight, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminLeadManager: React.FC = () => {
  const { leads, counsellors, assignCounsellorToLead, updateLeadStatus } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLeads = leads.filter((l) =>
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.phone.includes(searchQuery)
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-slate-900 p-6 rounded-3xl border-2 border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-cyan-400 block mb-1">
            CRM LEAD ROUTING & COUNSELLOR ALLOCATION
          </span>
          <h2 className="text-2xl font-black text-white">Global Student Enquiries</h2>
          <p className="text-xs text-slate-400 mt-0.5">Assign incoming prospective students to district and regional counselors</p>
        </div>

        <span className="text-xs font-black px-3.5 py-1.5 rounded-full bg-blue-500/20 text-cyan-300 border border-blue-500/30">
          {leads.length} Total Leads Active
        </span>
      </div>

      {/* Search Bar */}
      <div className="bg-slate-900 p-4 rounded-2xl border-2 border-slate-800">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter leads by student name, district, or phone..."
          className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-white focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Leads Table */}
      <div className="bg-slate-900 rounded-3xl border-2 border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-extrabold uppercase border-b border-slate-800">
              <tr>
                <th className="p-4">Student</th>
                <th className="p-4">Location</th>
                <th className="p-4">Cutoff / Branch</th>
                <th className="p-4">Source</th>
                <th className="p-4">Status</th>
                <th className="p-4">Assigned Counsellor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="p-4">
                    <span className="font-black text-white block">{lead.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{lead.phone}</span>
                  </td>
                  <td className="p-4 text-slate-300 font-medium">
                    {lead.city}, {lead.district}
                  </td>
                  <td className="p-4">
                    <span className="font-black text-cyan-300 block">{lead.pcmCutoff} / 200</span>
                    <span className="text-[10px] text-slate-400">{lead.interestedBranch}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {lead.source}
                    </span>
                  </td>
                  <td className="p-4">
                    <select
                      value={lead.status}
                      onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                      className="bg-slate-950 text-[10px] font-bold text-white rounded px-2 py-1 border border-slate-700"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Counselling Scheduled">Counselling Scheduled</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Application Started">Application Started</option>
                      <option value="Converted">Converted</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <select
                      value={lead.assignedCounsellorId || ''}
                      onChange={(e) => {
                        const counselor = counsellors.find((c) => c.id === e.target.value);
                        if (counselor) {
                          assignCounsellorToLead(lead.id, counselor.id, counselor.name);
                        }
                      }}
                      className="bg-slate-950 text-[10px] font-bold text-cyan-300 rounded px-2.5 py-1 border border-slate-700"
                    >
                      <option value="">Select Counselor</option>
                      {counsellors.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
