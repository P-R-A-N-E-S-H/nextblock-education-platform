import React, { useState } from 'react';
import { 
  User, 
  Save, 
  Sparkles, 
  Calculator, 
  ShieldCheck, 
  CheckCircle2, 
  Award,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TN_DISTRICTS } from '../../data/tamilNaduColleges';

export const StudentProfile: React.FC = () => {
  const { studentProfile, setStudentProfile, addToast } = useApp();

  const [formData, setFormData] = useState({ ...studentProfile });

  const handleMathsChange = (val: number) => {
    const maths = Math.min(100, Math.max(0, val));
    const cutoff = Number((maths + formData.physics / 2 + formData.chemistry / 2).toFixed(2));
    setFormData({ ...formData, maths, pcmCutoff: cutoff });
  };

  const handlePhysicsChange = (val: number) => {
    const physics = Math.min(100, Math.max(0, val));
    const cutoff = Number((formData.maths + physics / 2 + formData.chemistry / 2).toFixed(2));
    setFormData({ ...formData, physics, pcmCutoff: cutoff });
  };

  const handleChemistryChange = (val: number) => {
    const chemistry = Math.min(100, Math.max(0, val));
    const cutoff = Number((formData.maths + formData.physics / 2 + chemistry / 2).toFixed(2));
    setFormData({ ...formData, chemistry, pcmCutoff: cutoff });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setStudentProfile(formData);
    addToast({
      id: Date.now().toString(),
      title: 'Academic Profile Saved ✓',
      message: `Cutoff updated to ${formData.pcmCutoff} / 200.`,
      type: 'success'
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-slate-900 p-6 rounded-3xl border-2 border-slate-800">
        <span className="text-xs font-black uppercase tracking-wider text-cyan-400 block mb-1">
          STUDENT DOSSIER & MARKS
        </span>
        <h2 className="text-2xl font-black text-white">Academic Profile & TNEA Cutoff</h2>
        <p className="text-xs text-slate-400 mt-0.5">Keep your board marks updated for accurate college match recommendations</p>
      </div>

      <form onSubmit={handleSave} className="bg-slate-900 p-6 sm:p-8 rounded-3xl border-2 border-slate-800 space-y-6">
        
        {/* Personal Details */}
        <div>
          <h3 className="text-sm font-black uppercase tracking-wider text-slate-400 mb-4 border-b border-slate-800 pb-2">
            1. Personal Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-300 block mb-1">Full Legal Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border-2 border-slate-700 font-bold text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-300 block mb-1">Mobile Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border-2 border-slate-700 font-bold text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-300 block mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border-2 border-slate-700 font-bold text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-300 block mb-1">Native District (Tamil Nadu)</label>
              <select
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border-2 border-slate-700 font-bold text-white focus:outline-none focus:border-blue-500"
              >
                {TN_DISTRICTS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 12th Board Marks & Cutoff Calculator */}
        <div>
          <h3 className="text-sm font-black uppercase tracking-wider text-slate-400 mb-4 border-b border-slate-800 pb-2">
            2. 12th Standard PCM Marks & TNEA Cutoff Formula
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs mb-4">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <label className="font-extrabold uppercase text-slate-400 block mb-1">Mathematics (/100)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.maths}
                onChange={(e) => handleMathsChange(Number(e.target.value))}
                className="w-full bg-transparent text-xl font-black text-white focus:outline-none"
              />
              <span className="text-[10px] text-cyan-400 font-bold">100% Weightage</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <label className="font-extrabold uppercase text-slate-400 block mb-1">Physics (/100)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.physics}
                onChange={(e) => handlePhysicsChange(Number(e.target.value))}
                className="w-full bg-transparent text-xl font-black text-white focus:outline-none"
              />
              <span className="text-[10px] text-cyan-400 font-bold">Divided by 2 (Max 50)</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <label className="font-extrabold uppercase text-slate-400 block mb-1">Chemistry (/100)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.chemistry}
                onChange={(e) => handleChemistryChange(Number(e.target.value))}
                className="w-full bg-transparent text-xl font-black text-white focus:outline-none"
              />
              <span className="text-[10px] text-cyan-400 font-bold">Divided by 2 (Max 50)</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-900/80 to-slate-950 p-5 rounded-2xl border-2 border-cyan-500/40 flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-black text-cyan-300 block">Computed TNEA Cutoff</span>
              <p className="text-3xl font-black text-white mt-0.5">
                {formData.pcmCutoff} <span className="text-sm font-normal text-slate-400">/ 200</span>
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-slate-300 block">Round 1 Probability</span>
              <span className="text-xs font-black text-emerald-400">
                {formData.pcmCutoff >= 190 ? '🌟 Tier-1 Premier Eligible' : '🎯 Top Autonomous Eligible'}
              </span>
            </div>
          </div>
        </div>

        {/* Quotas & Concessions */}
        <div>
          <h3 className="text-sm font-black uppercase tracking-wider text-slate-400 mb-4 border-b border-slate-800 pb-2">
            3. Reservation Category & Government Fee Schemes
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-300 block mb-1">TNEA Community Quota</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border-2 border-slate-700 font-bold text-white focus:outline-none focus:border-blue-500"
              >
                <option value="OC (Open Competition)">OC (Open Competition)</option>
                <option value="BC (Backward Class)">BC (Backward Class)</option>
                <option value="BCM (Backward Class Muslim)">BCM (Backward Class Muslim)</option>
                <option value="MBC / DNC">MBC / DNC (Most Backward Class)</option>
                <option value="SC (Scheduled Caste)">SC (Scheduled Caste)</option>
                <option value="SCA (SC Arunthathiyar)">SCA (SC Arunthathiyar)</option>
                <option value="ST (Scheduled Tribe)">ST (Scheduled Tribe)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-300 block mb-1">Preferred Engineering Branch</label>
              <select
                value={formData.targetBranch}
                onChange={(e) => setFormData({ ...formData, targetBranch: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border-2 border-slate-700 font-bold text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Computer Science (CSE)">Computer Science & Engg (CSE)</option>
                <option value="AI & Data Science">AI & Data Science (AI & DS)</option>
                <option value="Information Technology">Information Technology (IT)</option>
                <option value="Electronics & Comm (ECE)">Electronics & Comm (ECE)</option>
                <option value="Robotics & Automation">Robotics & Automation</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-xs">
            <label className="flex items-center gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800 cursor-pointer hover:border-slate-700">
              <input
                type="checkbox"
                checked={formData.isFirstGraduate}
                onChange={(e) => setFormData({ ...formData, isFirstGraduate: e.target.checked })}
                className="w-4 h-4 rounded text-blue-600 focus:ring-0 bg-slate-900 border-slate-700"
              />
              <div>
                <span className="font-black text-white block">First Graduate (FG) Applicant</span>
                <span className="text-[11px] text-slate-400">Eligible for ₹25,000–₹50,000/yr tuition concession</span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800 cursor-pointer hover:border-slate-700">
              <input
                type="checkbox"
                checked={formData.isGovtSchool}
                onChange={(e) => setFormData({ ...formData, isGovtSchool: e.target.checked })}
                className="w-4 h-4 rounded text-blue-600 focus:ring-0 bg-slate-900 border-slate-700"
              />
              <div>
                <span className="font-black text-white block">7.5% Govt School Quota</span>
                <span className="text-[11px] text-emerald-400 font-bold">100% Free Tuition & Hostel Scheme</span>
              </div>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Profile & Update Cutoff</span>
        </button>

      </form>

    </div>
  );
};
