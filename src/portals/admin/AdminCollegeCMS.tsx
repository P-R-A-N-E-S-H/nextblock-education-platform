import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Filter, 
  Edit3, 
  Plus, 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  Save, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TNCollege } from '../../types';

export const AdminCollegeCMS: React.FC = () => {
  const { colleges, updateCollegeData, addCollegeData } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [editingCollege, setEditingCollege] = useState<TNCollege | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredColleges = colleges.filter((col) => {
    const matchesSearch =
      col.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (col.tneaCode && col.tneaCode.includes(searchQuery)) ||
      col.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || col.verificationStatus === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCollege) return;
    updateCollegeData(editingCollege);
    setEditingCollege(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-slate-900 p-6 rounded-3xl border-2 border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-cyan-400 block mb-1">
            TAMIL NADU ENGINEERING DATABASE CMS
          </span>
          <h2 className="text-2xl font-black text-white">College Management & Verification</h2>
          <p className="text-xs text-slate-400 mt-0.5">Manage TNEA codes, cutoffs, tuition fees, and verification status</p>
        </div>

        <span className="text-xs font-black px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          {colleges.length} Institutions Live in Database
        </span>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-900 p-4 rounded-2xl border-2 border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by college name, TNEA code (e.g. 2006), or city..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-white focus:outline-none focus:border-blue-500"
        >
          <option value="All">All Verification States</option>
          <option value="VERIFIED">VERIFIED</option>
          <option value="NEEDS REVIEW">NEEDS REVIEW</option>
          <option value="OUTDATED">OUTDATED</option>
        </select>
      </div>

      {/* College Table */}
      <div className="bg-slate-900 rounded-3xl border-2 border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-extrabold uppercase border-b border-slate-800">
              <tr>
                <th className="p-4">TNEA Code</th>
                <th className="p-4">College Name</th>
                <th className="p-4">Location</th>
                <th className="p-4">Cutoff / Fees</th>
                <th className="p-4">Highest CTC</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredColleges.map((col) => (
                <tr key={col.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-mono font-bold text-cyan-300">
                    {col.tneaCode || 'Univ'}
                  </td>
                  <td className="p-4">
                    <span className="font-black text-white block">{col.name}</span>
                    <span className="text-[10px] text-slate-400 font-medium">{col.institutionType}</span>
                  </td>
                  <td className="p-4 text-slate-300 font-medium">
                    {col.city}, {col.district}
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-cyan-300 block">{col.tneaCutoffGeneral || '190.00+'}</span>
                    <span className="text-[10px] text-slate-400">{col.approxFeesPerYear}</span>
                  </td>
                  <td className="p-4 font-black text-emerald-400">
                    {col.placements.highestPackage}
                  </td>
                  <td className="p-4">
                    <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {col.verificationStatus || 'VERIFIED'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setEditingCollege(col)}
                      className="px-3 py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600 text-white font-bold text-xs border border-blue-500/50 transition-colors flex items-center gap-1 ml-auto"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit College Modal */}
      {editingCollege && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-white relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingCollege(null)}
              className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-white mb-4">Edit College Record in CMS</h3>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-300 block mb-1">Official Name</label>
                <input
                  type="text"
                  required
                  value={editingCollege.name}
                  onChange={(e) => setEditingCollege({ ...editingCollege, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border-2 border-slate-700 font-bold text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">TNEA Counseling Code</label>
                  <input
                    type="text"
                    value={editingCollege.tneaCode || ''}
                    onChange={(e) => setEditingCollege({ ...editingCollege, tneaCode: e.target.value })}
                    placeholder="e.g. 2006"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border-2 border-slate-700 font-bold text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Verification Status</label>
                  <select
                    value={editingCollege.verificationStatus || 'VERIFIED'}
                    onChange={(e) => setEditingCollege({ ...editingCollege, verificationStatus: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border-2 border-slate-700 font-bold text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="VERIFIED">VERIFIED (100% Validated)</option>
                    <option value="NEEDS REVIEW">NEEDS REVIEW</option>
                    <option value="OUTDATED">OUTDATED</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">General Cutoff Range</label>
                  <input
                    type="text"
                    value={editingCollege.tneaCutoffGeneral || ''}
                    onChange={(e) => setEditingCollege({ ...editingCollege, tneaCutoffGeneral: e.target.value })}
                    placeholder="e.g. 195.50 / 200"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border-2 border-slate-700 font-bold text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Highest Placement Package</label>
                  <input
                    type="text"
                    value={editingCollege.placements.highestPackage}
                    onChange={(e) =>
                      setEditingCollege({
                        ...editingCollege,
                        placements: { ...editingCollege.placements, highestPackage: e.target.value }
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border-2 border-slate-700 font-bold text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Annual Approximate Fees</label>
                <input
                  type="text"
                  value={editingCollege.approxFeesPerYear}
                  onChange={(e) => setEditingCollege({ ...editingCollege, approxFeesPerYear: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border-2 border-slate-700 font-bold text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingCollege(null)}
                  className="px-4 py-2.5 rounded-xl text-slate-400 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-black text-white shadow-lg"
                >
                  Save & Update CMS
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
