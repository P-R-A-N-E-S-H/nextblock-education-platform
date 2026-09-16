import React, { useState } from 'react';
import { Sparkles, Calculator, CheckCircle2, ArrowRight, ShieldAlert, GraduationCap, Building2, Target, Award } from 'lucide-react';
import { indiaCollegesData, College } from '../../data/indiaColleges';
import { triggerConfetti } from '../../utils/helpers';

interface SmartCollegeMatcherProps {
  onSelectCollege: (college: College) => void;
  onOpenBooking: () => void;
}

export const SmartCollegeMatcher: React.FC<SmartCollegeMatcherProps> = ({
  onSelectCollege,
  onOpenBooking
}) => {
  const [cutoff, setCutoff] = useState('192');
  const [preferredBranch, setPreferredBranch] = useState('Computer Science Engineering');
  const [preferredLocation, setPreferredLocation] = useState('All');
  const [budget, setBudget] = useState('moderate');
  const [hasGenerated, setHasGenerated] = useState(false);

  const [matches, setMatches] = useState<{
    dream: College[];
    target: College[];
    safe: College[];
  }>({
    dream: [],
    target: [],
    safe: []
  });

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const cutoffNum = parseFloat(cutoff) || 180;

    let pool = indiaCollegesData.filter((c) => {
      if (preferredLocation !== 'All') {
        if (preferredLocation === 'Tamil Nadu' && c.state !== 'Tamil Nadu') return false;
        if (preferredLocation === 'Coimbatore' && c.city !== 'Coimbatore') return false;
        if (preferredLocation === 'Chennai' && !c.city.includes('Chennai') && !c.city.includes('Kattankulathur') && !c.city.includes('Sriperumbudur')) return false;
      }
      return true;
    });

    let dreamColleges: College[] = [];
    let targetColleges: College[] = [];
    let safeColleges: College[] = [];

    if (cutoffNum >= 195) {
      dreamColleges = pool.filter((c) => c.id === 'iit-madras' || c.id === 'bits-pilani' || c.id === 'anna-university-ceg');
      targetColleges = pool.filter((c) => c.id === 'psg-college-of-technology' || c.id === 'mit-anna-univ' || c.id === 'ssn-college-chennai' || c.id === 'amrita-university');
      safeColleges = pool.filter((c) => c.id === 'coimbatore-institute-of-technology' || c.id === 'kumaraguru-college-of-technology' || c.id === 'chennai-institute-of-technology');
    } else if (cutoffNum >= 185) {
      dreamColleges = pool.filter((c) => c.id === 'anna-university-ceg' || c.id === 'psg-college-of-technology' || c.id === 'ssn-college-chennai');
      targetColleges = pool.filter((c) => c.id === 'amrita-university' || c.id === 'vit-vellore' || c.id === 'kumaraguru-college-of-technology' || c.id === 'skcet-coimbatore' || c.id === 'chennai-institute-of-technology');
      safeColleges = pool.filter((c) => c.id === 'rajalakshmi-engineering-college' || c.id === 'svce-sriperumbudur' || c.id === 'sathyabama-chennai' || c.id === 'kongu-engineering-college');
    } else {
      dreamColleges = pool.filter((c) => c.id === 'kumaraguru-college-of-technology' || c.id === 'skcet-coimbatore' || c.id === 'chennai-institute-of-technology');
      targetColleges = pool.filter((c) => c.id === 'rajalakshmi-engineering-college' || c.id === 'svce-sriperumbudur' || c.id === 'kongu-engineering-college' || c.id === 'bannari-amman-institute');
      safeColleges = pool.filter((c) => c.id === 'sathyabama-chennai' || c.id === 'gce-salem' || c.id === 'sona-college-salem' || c.id === 'national-engineering-college' || c.id === 'm-kumarasamy-karur');
    }

    setMatches({
      dream: dreamColleges.slice(0, 3),
      target: targetColleges.slice(0, 3),
      safe: safeColleges.slice(0, 3)
    });
    setHasGenerated(true);
    triggerConfetti();
  };

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800">
      {/* Background Dots & Glow */}
      <div className="absolute inset-0 bg-dark-grid opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-10 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Calculator className="w-4 h-4 text-cyan-400" />
            <span>AI-Powered Cutoff Diagnostic</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            FIND YOUR <span className="text-gradient-cyan">BEST MATCH.</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            Input your 12th PCM Cutoff (out of 200) or entrance percentile to simulate your customized Dream, Target, and Safe engineering options.
          </p>
        </div>

        {/* Input Form Bar */}
        <form onSubmit={handleGenerate} className="bg-slate-800/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-2xl mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            
            {/* Cutoff Input */}
            <div>
              <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                TNEA Cutoff / PCM % *
              </label>
              <input
                type="number"
                step="0.25"
                min="100"
                max="200"
                value={cutoff}
                onChange={(e) => setCutoff(e.target.value)}
                placeholder="e.g. 192.5 / 200"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Preferred Branch */}
            <div>
              <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                Target Engineering Branch
              </label>
              <select
                value={preferredBranch}
                onChange={(e) => setPreferredBranch(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Computer Science Engineering">Computer Science (CSE)</option>
                <option value="AI & Machine Learning">AI & Machine Learning</option>
                <option value="Artificial Intelligence & Data Science">AI & Data Science (AIDS)</option>
                <option value="Information Technology">Information Technology (IT)</option>
                <option value="Electronics & Communication Engineering">Electronics & Communication (ECE)</option>
                <option value="Electrical & Electronics Engineering">Electrical & Electronics (EEE)</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Robotics & Automation">Robotics & Automation</option>
                <option value="Mechatronics">Mechatronics</option>
              </select>
            </div>

            {/* Preferred Location */}
            <div>
              <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                Preferred Hub / Region
              </label>
              <select
                value={preferredLocation}
                onChange={(e) => setPreferredLocation(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Regions / India</option>
                <option value="Tamil Nadu">All Tamil Nadu</option>
                <option value="Chennai">Chennai Region</option>
                <option value="Coimbatore">Coimbatore Hub</option>
              </select>
            </div>

            {/* Submit Action */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Simulate Match</span>
              </button>
            </div>

          </div>

          {/* Legal Disclaimer Rule */}
          <div className="flex items-start gap-2 text-[11px] text-slate-400 pt-3 border-t border-slate-700/60">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Disclaimer:</strong> Recommendations are generated as advisory guidance based on historical TNEA & entrance closing ranks. Actual cutoffs fluctuate annually and admission is not guaranteed.
            </span>
          </div>
        </form>

        {/* RESULTS CATEGORIZATION: DREAM | TARGET | SAFE */}
        {hasGenerated && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in zoom-in-95 duration-300">
            
            {/* 1. DREAM TIER */}
            <div className="bg-slate-800/90 rounded-3xl p-6 border-2 border-indigo-500/60 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 px-3 py-1 bg-indigo-600 text-white text-[10px] font-black uppercase rounded-bl-xl">
                Dream (High Ambition)
              </div>

              <div>
                <h3 className="text-lg font-black text-white mb-1 flex items-center gap-2">
                  <Award className="w-5 h-5 text-indigo-400" /> DREAM TIER
                </h3>
                <p className="text-[11px] text-slate-300 mb-4">
                  Highly competitive options where cutoff cutoffs are typically stringent.
                </p>

                <div className="space-y-3 mb-6">
                  {matches.dream.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">No exact dream match for selected region.</p>
                  ) : (
                    matches.dream.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => onSelectCollege(c)}
                        className="p-3 rounded-2xl bg-slate-900/80 border border-slate-700 hover:border-indigo-400 cursor-pointer transition-all"
                      >
                        <h4 className="text-xs font-bold text-white line-clamp-1">{c.name}</h4>
                        <p className="text-[10px] text-indigo-300 mt-0.5">{c.city} • High CTC: {c.placements.highestPackage}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <span className="text-[10px] text-slate-400 block text-center">Aim for Rank Improvements</span>
            </div>

            {/* 2. TARGET TIER */}
            <div className="bg-slate-800/90 rounded-3xl p-6 border-2 border-blue-500 flex flex-col justify-between relative overflow-hidden shadow-xl shadow-blue-500/10">
              <div className="absolute top-0 right-0 px-3 py-1 bg-blue-600 text-white text-[10px] font-black uppercase rounded-bl-xl">
                Target (Strong Match)
              </div>

              <div>
                <h3 className="text-lg font-black text-white mb-1 flex items-center gap-2">
                  <Target className="w-5 h-5 text-cyan-400" /> TARGET TIER
                </h3>
                <p className="text-[11px] text-slate-300 mb-4">
                  Realistic, high-probability institutions aligning with your {cutoff} score.
                </p>

                <div className="space-y-3 mb-6">
                  {matches.target.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">No exact target match for selected region.</p>
                  ) : (
                    matches.target.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => onSelectCollege(c)}
                        className="p-3 rounded-2xl bg-slate-900/80 border border-slate-700 hover:border-cyan-400 cursor-pointer transition-all"
                      >
                        <h4 className="text-xs font-bold text-white line-clamp-1">{c.name}</h4>
                        <p className="text-[10px] text-cyan-300 mt-0.5">{c.city} • Avg CTC: {c.placements.averagePackage}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <span className="text-[10px] text-cyan-400 font-bold block text-center">Primary Application Focus</span>
            </div>

            {/* 3. SAFE TIER */}
            <div className="bg-slate-800/90 rounded-3xl p-6 border-2 border-emerald-500/60 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 px-3 py-1 bg-emerald-600 text-white text-[10px] font-black uppercase rounded-bl-xl">
                Safe (High Probability)
              </div>

              <div>
                <h3 className="text-lg font-black text-white mb-1 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" /> SAFE TIER
                </h3>
                <p className="text-[11px] text-slate-300 mb-4">
                  High-assurance options ensuring guaranteed seat security in target branches.
                </p>

                <div className="space-y-3 mb-6">
                  {matches.safe.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">No exact safe match for selected region.</p>
                  ) : (
                    matches.safe.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => onSelectCollege(c)}
                        className="p-3 rounded-2xl bg-slate-900/80 border border-slate-700 hover:border-emerald-400 cursor-pointer transition-all"
                      >
                        <h4 className="text-xs font-bold text-white line-clamp-1">{c.name}</h4>
                        <p className="text-[10px] text-emerald-300 mt-0.5">{c.city} • Placement: {c.placements.placementPercentage}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <span className="text-[10px] text-slate-400 block text-center">Safety Backup Layer</span>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
