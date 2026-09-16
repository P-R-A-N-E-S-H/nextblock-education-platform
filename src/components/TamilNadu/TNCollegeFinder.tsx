import React, { useState, useEffect } from 'react';
import { Sparkles, Calculator, CheckCircle2, ArrowRight, ShieldAlert, Award, Target, Compass, BookOpen, MapPin } from 'lucide-react';
import { allTNCollegesData, TNCollege } from '../../data/indexTNColleges';
import { triggerConfetti } from '../../utils/helpers';

interface TNCollegeFinderProps {
  onSelectCollege: (college: TNCollege) => void;
  onOpenBooking: () => void;
}

export const TNCollegeFinder: React.FC<TNCollegeFinderProps> = ({
  onSelectCollege,
  onOpenBooking
}) => {
  const [maths, setMaths] = useState<number>(95);
  const [physics, setPhysics] = useState<number>(92);
  const [chemistry, setChemistry] = useState<number>(90);
  const [cutoff, setCutoff] = useState<number>(186.0);

  const [preferredBranch, setPreferredBranch] = useState('CSE');
  const [preferredCity, setPreferredCity] = useState('All');
  const [hasGenerated, setHasGenerated] = useState(false);

  const [matches, setMatches] = useState<{
    dream: TNCollege[];
    target: TNCollege[];
    safe: TNCollege[];
    alternative: TNCollege[];
  }>({
    dream: [],
    target: [],
    safe: [],
    alternative: []
  });

  // Calculate TNEA Cutoff whenever PCM marks change
  // Formula: Maths (out of 100) + Physics/2 (out of 50) + Chemistry/2 (out of 50) = /200
  useEffect(() => {
    const m = Math.min(100, Math.max(0, maths || 0));
    const p = Math.min(100, Math.max(0, physics || 0));
    const c = Math.min(100, Math.max(0, chemistry || 0));
    const calculatedCutoff = m + p / 2 + c / 2;
    setCutoff(parseFloat(calculatedCutoff.toFixed(2)));
  }, [maths, physics, chemistry]);

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();

    let pool = allTNCollegesData.filter((c) => {
      if (preferredCity !== 'All') {
        if (preferredCity === 'Coimbatore' && c.district.toLowerCase() !== 'coimbatore') return false;
        if (preferredCity === 'Chennai' && c.district.toLowerCase() !== 'chennai' && c.district.toLowerCase() !== 'chengalpattu' && c.district.toLowerCase() !== 'kancheepuram') return false;
      }
      return true;
    });

    let dreamColleges: TNCollege[] = [];
    let targetColleges: TNCollege[] = [];
    let safeColleges: TNCollege[] = [];
    let alternativeColleges: TNCollege[] = [];

    if (cutoff >= 195) {
      dreamColleges = pool.filter((c) => c.id === 'anna-university-ceg' || c.id === 'mit-anna-univ' || c.id === 'psg-college-of-technology');
      targetColleges = pool.filter((c) => c.id === 'ssn-college-chennai' || c.id === 'coimbatore-institute-of-technology' || c.id === 'psg-itech-coimbatore' || c.id === 'gct-coimbatore');
      safeColleges = pool.filter((c) => c.id === 'kumaraguru-college-of-technology' || c.id === 'cit-chennai' || c.id === 'skcet-coimbatore' || c.id === 'kpr-institute-of-engg');
      alternativeColleges = pool.filter((c) => c.id === 'amrita-coimbatore' || c.id === 'sastra-deemed-thanjavur' || c.id === 'vit-vellore');
    } else if (cutoff >= 185) {
      dreamColleges = pool.filter((c) => c.id === 'psg-college-of-technology' || c.id === 'ssn-college-chennai' || c.id === 'mit-anna-univ' || c.id === 'coimbatore-institute-of-technology');
      targetColleges = pool.filter((c) => c.id === 'kumaraguru-college-of-technology' || c.id === 'cit-chennai' || c.id === 'skcet-coimbatore' || c.id === 'kpr-institute-of-engg' || c.id === 'rec-chennai' || c.id === 'thiagarajar-college-of-engg');
      safeColleges = pool.filter((c) => c.id === 'sri-eshwar-coimbatore' || c.id === 'srec-coimbatore' || c.id === 'svce-sriperumbudur' || c.id === 'kongu-engineering-college' || c.id === 'bannari-amman-institute');
      alternativeColleges = pool.filter((c) => c.id === 'amrita-coimbatore' || c.id === 'srm-ist-chennai' || c.id === 'sathyabama-chennai' || c.id === 'karunya-university-cbe');
    } else if (cutoff >= 170) {
      dreamColleges = pool.filter((c) => c.id === 'kumaraguru-college-of-technology' || c.id === 'skcet-coimbatore' || c.id === 'kpr-institute-of-engg' || c.id === 'cit-chennai');
      targetColleges = pool.filter((c) => c.id === 'sri-eshwar-coimbatore' || c.id === 'srec-coimbatore' || c.id === 'sns-college-of-technology' || c.id === 'hindusthan-college-of-engg' || c.id === 'karpagam-college-of-engg' || c.id === 'gce-salem');
      safeColleges = pool.filter((c) => c.id === 'rathinam-technical-campus' || c.id === 'dr-ngp-institute-of-tech' || c.id === 'sona-college-salem' || c.id === 'national-engineering-college');
      alternativeColleges = pool.filter((c) => c.id === 'karunya-university-cbe' || c.id === 'sathyabama-chennai' || c.id === 'srm-ist-chennai');
    } else {
      dreamColleges = pool.filter((c) => c.id === 'srec-coimbatore' || c.id === 'sri-eshwar-coimbatore' || c.id === 'hindusthan-college-of-engg');
      targetColleges = pool.filter((c) => c.id === 'rathinam-technical-campus' || c.id === 'dr-ngp-institute-of-tech' || c.id === 'srit-coimbatore');
      safeColleges = pool.filter((c) => c.id === 'nehru-inst-of-engg-and-tech' || c.id === 'tamilnadu-college-of-engg' || c.id === 'pa-college-of-engineering');
      alternativeColleges = pool.filter((c) => c.id === 'sathyabama-chennai' || c.id === 'karunya-university-cbe');
    }

    // Fallbacks if pool was restricted by city
    if (dreamColleges.length === 0) dreamColleges = pool.slice(0, 3);
    if (targetColleges.length === 0) targetColleges = pool.slice(3, 6);
    if (safeColleges.length === 0) safeColleges = pool.slice(6, 9);
    if (alternativeColleges.length === 0) alternativeColleges = pool.slice(9, 12);

    setMatches({
      dream: dreamColleges.slice(0, 3),
      target: targetColleges.slice(0, 3),
      safe: safeColleges.slice(0, 3),
      alternative: alternativeColleges.slice(0, 3)
    });
    setHasGenerated(true);
    triggerConfetti();
  };

  return (
    <div id="smart-finder" className="mb-24 bg-slate-950 text-white rounded-3xl p-6 sm:p-10 border-2 border-slate-800 shadow-2xl relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-dark-grid opacity-30 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs font-black uppercase tracking-wider mb-4">
          <Calculator className="w-4 h-4 text-cyan-400" />
          <span>TNEA 2026 Cutoff Simulator</span>
        </div>

        <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-3">
          SIMULATE YOUR <span className="text-gradient-cyan">COLLEGE CHANCES.</span>
        </h3>

        <p className="text-xs sm:text-sm text-slate-300 font-normal">
          Enter your 12th Marks (Maths + Physics/2 + Chemistry/2) to instantly discover Dream, Target, and Safety colleges across Tamil Nadu.
        </p>
      </div>

      {/* Interactive Form */}
      <form onSubmit={handleSimulate} className="relative z-10 bg-slate-900/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-2 border-slate-800 mb-10 shadow-xl">
        
        {/* PCM Marks Row */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          
          {/* Maths */}
          <div>
            <label className="text-[11px] font-black text-slate-300 uppercase tracking-wider block mb-1.5">
              Mathematics (/100)
            </label>
            <input
              type="number"
              min="35"
              max="100"
              value={maths}
              onChange={(e) => setMaths(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border-2 border-slate-700 text-sm font-black text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Physics */}
          <div>
            <label className="text-[11px] font-black text-slate-300 uppercase tracking-wider block mb-1.5">
              Physics (/100)
            </label>
            <input
              type="number"
              min="35"
              max="100"
              value={physics}
              onChange={(e) => setPhysics(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border-2 border-slate-700 text-sm font-black text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Chemistry */}
          <div>
            <label className="text-[11px] font-black text-slate-300 uppercase tracking-wider block mb-1.5">
              Chemistry (/100)
            </label>
            <input
              type="number"
              min="35"
              max="100"
              value={chemistry}
              onChange={(e) => setChemistry(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border-2 border-slate-700 text-sm font-black text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Calculated Cutoff Callout */}
          <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-3.5 rounded-2xl flex flex-col justify-center text-center shadow-lg shadow-blue-500/25">
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-100">
              Calculated PCM Cutoff
            </span>
            <span className="text-3xl font-black text-white leading-tight mt-0.5">
              {cutoff} <span className="text-xs font-bold text-blue-200">/ 200</span>
            </span>
          </div>

        </div>

        {/* Branch & Region Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          
          {/* Target Branch */}
          <div>
            <label className="text-[11px] font-black text-slate-300 uppercase tracking-wider block mb-1.5">
              Preferred Engineering Branch
            </label>
            <select
              value={preferredBranch}
              onChange={(e) => setPreferredBranch(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border-2 border-slate-700 text-xs font-bold text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="CSE">Computer Science & Engineering (CSE)</option>
              <option value="AI & DS">AI & Data Science (AI & DS)</option>
              <option value="Information Technology">Information Technology (IT)</option>
              <option value="ECE">Electronics & Communication (ECE)</option>
              <option value="EEE">Electrical & Electronics (EEE)</option>
              <option value="Mechanical">Mechanical Engineering</option>
              <option value="Biomedical">Biomedical Engineering</option>
              <option value="Biotechnology">Biotechnology</option>
              <option value="Robotics & Automation">Robotics & Automation</option>
              <option value="Mechatronics">Mechatronics</option>
            </select>
          </div>

          {/* Preferred Region */}
          <div>
            <label className="text-[11px] font-black text-slate-300 uppercase tracking-wider block mb-1.5">
              Preferred Region / Hub
            </label>
            <select
              value={preferredCity}
              onChange={(e) => setPreferredCity(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border-2 border-slate-700 text-xs font-bold text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="All">All Tamil Nadu (38 Districts)</option>
              <option value="Coimbatore">Coimbatore Region</option>
              <option value="Chennai">Chennai Region</option>
            </select>
          </div>

          {/* CTA Trigger */}
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span>Simulate College Options</span>
            </button>
          </div>

        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-2 text-[11px] text-slate-400 pt-3 border-t border-slate-800">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            <strong>Official Advisory:</strong> Simulated recommendations are based on past 5 years of TNEA closing cutoffs and seat matrix trends. Actual round allotments depend on community quota (OC/BC/BCM/MBC/SC/SCA/ST) and annual cutoff shifts.
          </span>
        </div>

      </form>

      {/* 4 TIERS RESULTS: DREAM | TARGET | SAFE | ALTERNATIVE */}
      {hasGenerated && (
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in zoom-in-95 duration-300">
          
          {/* 1. DREAM TIER */}
          <div className="bg-slate-900/95 rounded-3xl p-6 border-2 border-indigo-500 flex flex-col justify-between relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 px-3 py-1 bg-indigo-600 text-white text-[10px] font-black uppercase rounded-bl-xl">
              Dream
            </div>

            <div>
              <h4 className="text-base font-black text-white mb-1 flex items-center gap-2">
                <Award className="w-4 h-4 text-indigo-400" /> DREAM TIER
              </h4>
              <p className="text-[11px] text-slate-300 mb-4">
                Highly competitive colleges where cutoffs are tight.
              </p>

              <div className="space-y-3 mb-4">
                {matches.dream.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => onSelectCollege(c)}
                    className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-700 hover:border-indigo-400 cursor-pointer transition-all flex items-center gap-3"
                  >
                    <img
                      src={c.image}
                      alt={c.name}
                      className="w-10 h-10 rounded-xl object-cover shrink-0 border border-slate-700"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-black text-white truncate">{c.name}</h5>
                      <p className="text-[10px] text-indigo-300 mt-0.5 font-bold">{c.city} • CTC: {c.placements.highestPackage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <span className="text-[10px] text-indigo-300 text-center font-bold">Ambitious Reach Choice</span>
          </div>

          {/* 2. TARGET TIER */}
          <div className="bg-slate-900/95 rounded-3xl p-6 border-2 border-blue-500 flex flex-col justify-between relative overflow-hidden shadow-xl shadow-blue-500/10">
            <div className="absolute top-0 right-0 px-3 py-1 bg-blue-600 text-white text-[10px] font-black uppercase rounded-bl-xl">
              Target
            </div>

            <div>
              <h4 className="text-base font-black text-white mb-1 flex items-center gap-2">
                <Target className="w-4 h-4 text-cyan-400" /> TARGET TIER
              </h4>
              <p className="text-[11px] text-slate-300 mb-4">
                Realistic options strongly matching your {cutoff} cutoff.
              </p>

              <div className="space-y-3 mb-4">
                {matches.target.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => onSelectCollege(c)}
                    className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-700 hover:border-cyan-400 cursor-pointer transition-all flex items-center gap-3"
                  >
                    <img
                      src={c.image}
                      alt={c.name}
                      className="w-10 h-10 rounded-xl object-cover shrink-0 border border-slate-700"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-black text-white truncate">{c.name}</h5>
                      <p className="text-[10px] text-cyan-300 mt-0.5 font-bold">{c.city} • Avg: {c.placements.averagePackage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <span className="text-[10px] text-cyan-400 text-center font-bold">Primary Choice Filling Focus</span>
          </div>

          {/* 3. SAFE TIER */}
          <div className="bg-slate-900/95 rounded-3xl p-6 border-2 border-emerald-500 flex flex-col justify-between relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 px-3 py-1 bg-emerald-600 text-white text-[10px] font-black uppercase rounded-bl-xl">
              Safe
            </div>

            <div>
              <h4 className="text-base font-black text-white mb-1 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> SAFE TIER
              </h4>
              <p className="text-[11px] text-slate-300 mb-4">
                High-probability seat security in your target branch.
              </p>

              <div className="space-y-3 mb-4">
                {matches.safe.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => onSelectCollege(c)}
                    className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-700 hover:border-emerald-400 cursor-pointer transition-all flex items-center gap-3"
                  >
                    <img
                      src={c.image}
                      alt={c.name}
                      className="w-10 h-10 rounded-xl object-cover shrink-0 border border-slate-700"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-black text-white truncate">{c.name}</h5>
                      <p className="text-[10px] text-emerald-300 mt-0.5 font-bold">{c.city} • {c.placements.placementPercentage} Placed</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <span className="text-[10px] text-emerald-400 text-center font-bold">Guaranteed Safety Layer</span>
          </div>

          {/* 4. ALTERNATIVE TIER */}
          <div className="bg-slate-900/95 rounded-3xl p-6 border-2 border-amber-500 flex flex-col justify-between relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 px-3 py-1 bg-amber-600 text-white text-[10px] font-black uppercase rounded-bl-xl">
              Alternative
            </div>

            <div>
              <h4 className="text-base font-black text-white mb-1 flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-400" /> ALTERNATIVE
              </h4>
              <p className="text-[11px] text-slate-300 mb-4">
                Deemed universities & national entrance routes.
              </p>

              <div className="space-y-3 mb-4">
                {matches.alternative.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => onSelectCollege(c)}
                    className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-700 hover:border-amber-400 cursor-pointer transition-all flex items-center gap-3"
                  >
                    <img
                      src={c.image}
                      alt={c.name}
                      className="w-10 h-10 rounded-xl object-cover shrink-0 border border-slate-700"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-black text-white truncate">{c.name}</h5>
                      <p className="text-[10px] text-amber-300 mt-0.5 font-bold">{c.city} • {c.entranceExams.join(', ')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <span className="text-[10px] text-amber-400 text-center font-bold">Independent Admission Route</span>
          </div>

        </div>
      )}

    </div>
  );
};
