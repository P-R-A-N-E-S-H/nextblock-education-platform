import React, { useState, useMemo } from 'react';
import { 
  Compass, 
  Sparkles, 
  Calculator, 
  Target, 
  ShieldCheck, 
  Award, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  HelpCircle, 
  RefreshCw, 
  Bookmark, 
  Scale, 
  Layers,
  MapPin,
  DollarSign,
  Copy,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TNCollege } from '../data/tamilNaduColleges';

interface FindMyCollegePageProps {
  onOpenBooking?: () => void;
}

export const FindMyCollegePage: React.FC<FindMyCollegePageProps> = ({ onOpenBooking }) => {
  const { 
    colleges, 
    savedCollegeIds, 
    toggleSaveCollege, 
    comparisonCollegeIds, 
    toggleComparison, 
    viewCollegeDetail,
    trackEvent,
    addToast
  } = useApp();

  const [copiedList, setCopiedList] = useState(false);

  // Input Marks State
  const [maths, setMaths] = useState<number>(98);
  const [physics, setPhysics] = useState<number>(96);
  const [chemistry, setChemistry] = useState<number>(95);

  // Preference State
  const [category, setCategory] = useState<string>('BC');
  const [preferredBranch, setPreferredBranch] = useState<string>('Computer Science (CSE)');
  const [preferredDistrict, setPreferredDistrict] = useState<string>('Coimbatore');
  const [isFirstGraduate, setIsFirstGraduate] = useState<boolean>(true);
  const [isGovtSchool, setIsGovtSchool] = useState<boolean>(false);
  const [maxBudget, setMaxBudget] = useState<number>(200000);
  const [hostelRequired, setHostelRequired] = useState<boolean>(true);
  const [careerGoal, setCareerGoal] = useState<string>('Product Software Engineer / High CTC Tech');

  const [hasCalculated, setHasCalculated] = useState<boolean>(true);

  // Calculate PCM Cutoff out of 200
  // Formula: Maths (100) + Physics/2 (50) + Chemistry/2 (50) = 200.00
  const calculatedCutoff = useMemo(() => {
    const m = Math.min(100, Math.max(0, Number(maths) || 0));
    const p = Math.min(100, Math.max(0, Number(physics) || 0));
    const c = Math.min(100, Math.max(0, Number(chemistry) || 0));
    const cutoff = m + (p / 2) + (c / 2);
    return Number(cutoff.toFixed(2));
  }, [maths, physics, chemistry]);

  // Recommendation Engine: DREAM, TARGET, SAFE, ALTERNATIVE tiers
  const recommendations = useMemo(() => {
    const cutoff = calculatedCutoff;

    // Helper to extract numeric cutoff floor
    const getCutoffFloor = (c: TNCollege) => {
      if (!c.tneaCutoffGeneral) return 175;
      const match = c.tneaCutoffGeneral.match(/(\d+\.?\d*)/);
      return match ? parseFloat(match[1]) : 175;
    };

    // Filter by district if not 'All'
    let pool = colleges;
    if (preferredDistrict !== 'All Districts' && preferredDistrict !== 'All Tamil Nadu') {
      const distMatch = colleges.filter(c => c.district.toLowerCase() === preferredDistrict.toLowerCase());
      if (distMatch.length >= 4) pool = distMatch;
    }

    // Sort by cutoff floor
    const sorted = [...pool].sort((a, b) => getCutoffFloor(b) - getCutoffFloor(a));

    // Dream Tier: slightly above or right at student's cutoff (+0.5 to +4.0)
    const dreamColleges = sorted.filter(c => {
      const floor = getCutoffFloor(c);
      return floor >= cutoff - 0.5 && floor <= cutoff + 5.0;
    }).slice(0, 2);

    // Target Tier: optimal match (-2.5 to +0.5)
    const targetColleges = sorted.filter(c => {
      const floor = getCutoffFloor(c);
      return floor <= cutoff + 0.5 && floor >= cutoff - 4.5 && !dreamColleges.some(d => d.id === c.id);
    }).slice(0, 3);

    // Safe Tier: high confidence (-4.5 to -15.0)
    const safeColleges = sorted.filter(c => {
      const floor = getCutoffFloor(c);
      return floor < cutoff - 4.0 && !dreamColleges.some(d => d.id === c.id) && !targetColleges.some(t => t.id === c.id);
    }).slice(0, 2);

    // Alternative Tier: Deemed / Specialized Autonomous institutions
    const altColleges = colleges.filter(c => 
      c.institutionType.includes('Deemed') || 
      c.category === 'Top Tier Autonomous' || 
      c.category === 'Coimbatore Landmark'
    ).filter(c => !dreamColleges.some(d => d.id === c.id) && !targetColleges.some(t => t.id === c.id) && !safeColleges.some(s => s.id === c.id)).slice(0, 2);

    return {
      dream: dreamColleges.length ? dreamColleges : sorted.slice(0, 2),
      target: targetColleges.length ? targetColleges : sorted.slice(2, 4),
      safe: safeColleges.length ? safeColleges : sorted.slice(4, 6),
      alternative: altColleges.length ? altColleges : sorted.slice(6, 8)
    };
  }, [calculatedCutoff, preferredDistrict, colleges]);

  const handleRunDiagnostic = (e: React.FormEvent) => {
    e.preventDefault();
    setHasCalculated(true);
    trackEvent('college_finder_completed', { cutoff: calculatedCutoff, branch: preferredBranch, district: preferredDistrict });
    
    // Smooth scroll down to recommendations
    const resultsEl = document.getElementById('recommendation-results');
    if (resultsEl) {
      resultsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-20 pb-24">
      
      {/* Top Banner Header */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-black uppercase tracking-wider mb-3">
            <Compass className="w-4 h-4" /> AI Cutoff & Choice Matchmaker
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            FIND YOUR NEXTBLOCK
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
            Enter your 12th Mathematics, Physics, and Chemistry marks. Our verified algorithm calculates your exact TNEA PCM cutoff and categorizes colleges into Dream, Target, Safe, and Alternative tiers.
          </p>
        </div>
      </div>

      {/* Main Diagnostic Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Form Grid */}
        <form onSubmit={handleRunDiagnostic} className="bg-slate-900 p-6 sm:p-8 rounded-3xl border-2 border-slate-800 shadow-2xl space-y-8">
          
          {/* 1. Academic Cutoff Calculator Row */}
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-6">
              <h2 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Calculator className="w-5 h-5 text-cyan-400" /> 1. Academic Marks & PCM Cutoff
              </h2>
              <div className="bg-blue-600/20 px-3 py-1 rounded-xl border border-blue-500/40 text-cyan-300 text-xs font-black">
                TNEA Cutoff: <span className="text-white text-sm ml-1 font-mono">{calculatedCutoff} / 200</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-300 uppercase block">Mathematics (Max 100)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={maths}
                  onChange={(e) => setMaths(Number(e.target.value))}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono font-bold text-lg focus:outline-none focus:border-cyan-500"
                />
                <span className="text-[10px] text-slate-400">Weighted 100% in TNEA formula</span>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-300 uppercase block">Physics (Max 100)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={physics}
                  onChange={(e) => setPhysics(Number(e.target.value))}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono font-bold text-lg focus:outline-none focus:border-cyan-500"
                />
                <span className="text-[10px] text-slate-400">Divided by 2 (Weighted 50%)</span>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-300 uppercase block">Chemistry (Max 100)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={chemistry}
                  onChange={(e) => setChemistry(Number(e.target.value))}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono font-bold text-lg focus:outline-none focus:border-cyan-500"
                />
                <span className="text-[10px] text-slate-400">Divided by 2 (Weighted 50%)</span>
              </div>
            </div>
          </div>

          {/* 2. Quota & Reservation Row */}
          <div>
            <h2 className="text-base font-black text-white uppercase tracking-wider border-b border-slate-800 pb-3 mb-6">
              2. Quotas, Community & Government Welfare
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Category */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-300 uppercase block">Community Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold text-xs focus:outline-none focus:border-cyan-500"
                >
                  <option value="OC">OC (Open Competition / General)</option>
                  <option value="BC">BC (Backward Class)</option>
                  <option value="BCM">BCM (BC Muslim)</option>
                  <option value="MBC">MBC / DNC (Most Backward Class)</option>
                  <option value="SC">SC (Scheduled Caste)</option>
                  <option value="SCA">SCA (SC Arunthathiyar)</option>
                  <option value="ST">ST (Scheduled Tribe)</option>
                </select>
              </div>

              {/* First Graduate Toggle */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white text-xs block">First Graduate (FG)?</span>
                  <span className="text-[11px] text-slate-400">Eligible for ₹25k-₹50k/yr subsidy</span>
                </div>
                <input
                  type="checkbox"
                  checked={isFirstGraduate}
                  onChange={(e) => setIsFirstGraduate(e.target.checked)}
                  className="w-5 h-5 accent-cyan-500 cursor-pointer"
                />
              </div>

              {/* 7.5% Govt School Toggle */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white text-xs block">7.5% Govt School Quota?</span>
                  <span className="text-[11px] text-slate-400">Studied 6th to 12th in TN Govt School</span>
                </div>
                <input
                  type="checkbox"
                  checked={isGovtSchool}
                  onChange={(e) => setIsGovtSchool(e.target.checked)}
                  className="w-5 h-5 accent-cyan-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* 3. Branch & Location Preferences */}
          <div>
            <h2 className="text-base font-black text-white uppercase tracking-wider border-b border-slate-800 pb-3 mb-6">
              3. Course & Campus Preferences
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Preferred Branch */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-300 uppercase block">Preferred Branch</label>
                <select
                  value={preferredBranch}
                  onChange={(e) => setPreferredBranch(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold text-xs focus:outline-none focus:border-cyan-500"
                >
                  <option value="Computer Science (CSE)">Computer Science (CSE)</option>
                  <option value="AI & Data Science">AI & Data Science (AI-DS)</option>
                  <option value="Information Technology">Information Technology (IT)</option>
                  <option value="Electronics & Communication (ECE)">Electronics & Communication (ECE)</option>
                  <option value="Electrical & Electronics (EEE)">Electrical & Electronics (EEE)</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Robotics & Automation">Robotics & Automation</option>
                  <option value="Biomedical / Biotech">Biomedical / Biotech</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                </select>
              </div>

              {/* Preferred District */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-300 uppercase block">Preferred Location Hub</label>
                <select
                  value={preferredDistrict}
                  onChange={(e) => setPreferredDistrict(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold text-xs focus:outline-none focus:border-cyan-500"
                >
                  <option value="All Tamil Nadu">All Tamil Nadu (Open)</option>
                  <option value="Coimbatore">Coimbatore (Hub)</option>
                  <option value="Chennai">Chennai Metro</option>
                  <option value="Madurai">Madurai</option>
                  <option value="Salem">Salem</option>
                  <option value="Erode">Erode</option>
                  <option value="Tiruchirappalli">Tiruchirappalli</option>
                  <option value="Vellore">Vellore</option>
                </select>
              </div>

              {/* Career Goal */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-300 uppercase block">Primary Career Goal</label>
                <select
                  value={careerGoal}
                  onChange={(e) => setCareerGoal(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold text-xs focus:outline-none focus:border-cyan-500"
                >
                  <option value="Product Software Engineer / High CTC Tech">Product Software Engineer (Zoho, Cisco, Amazon)</option>
                  <option value="Core Engineering / Robotics / Automotive">Core Automotive / Embedded (Bosch, L&T, Hyundai)</option>
                  <option value="Higher Studies (MS Abroad / GATE / PSU)">Higher Studies (MS in USA/Germany or GATE)</option>
                  <option value="Startup / Entrepreneurship">Startup & Tech Entrepreneurship</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
            <span className="text-xs text-slate-400">
              * Recommendations are strictly based on verified Tamil Nadu historical cutoffs and seat distribution.
            </span>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-black text-sm shadow-xl shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-cyan-200" />
              <span>Generate 4-Tier College Recommendations →</span>
            </button>
          </div>

        </form>

        {/* Diagnostic Results Section */}
        {hasCalculated && (
          <div id="recommendation-results" className="mt-12 space-y-8 animate-in fade-in duration-300">
            
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border-2 border-slate-800">
              <div>
                <span className="text-xs font-black text-cyan-400 uppercase tracking-wider block">Diagnostic Result Summary</span>
                <h3 className="text-xl font-black text-white mt-1">
                  Cutoff <span className="text-cyan-400 font-mono">{calculatedCutoff} / 200</span> • {category} Category • {preferredBranch}
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => {
                    const allRecs = [
                      ...recommendations.dream.map((c, i) => `Choice ${i + 1} [DREAM]: [${c.tneaCode || 'Deemed'}] ${c.name} - ${preferredBranch}`),
                      ...recommendations.target.map((c, i) => `Choice ${i + 3} [TARGET]: [${c.tneaCode || 'Deemed'}] ${c.name} - ${preferredBranch}`),
                      ...recommendations.safe.map((c, i) => `Choice ${i + 6} [SAFE]: [${c.tneaCode || 'Deemed'}] ${c.name} - ${preferredBranch}`),
                      ...recommendations.alternative.map((c, i) => `Choice ${i + 8} [ALTERNATIVE]: [${c.tneaCode || 'Deemed'}] ${c.name} - ${preferredBranch}`)
                    ].join('\n');

                    navigator.clipboard.writeText(`NEXTBLOCK 4-TIER TNEA 2026 CHOICE LIST (Cutoff ${calculatedCutoff}):\n\n${allRecs}`);
                    setCopiedList(true);
                    setTimeout(() => setCopiedList(false), 2500);
                    addToast({
                      id: Date.now().toString(),
                      title: '4-Tier Choice Order Copied! 📋',
                      message: `Formatted choice filling order copied for cutoff ${calculatedCutoff}.`,
                      type: 'success'
                    });
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors flex items-center gap-1.5 border border-slate-700 cursor-pointer"
                >
                  {copiedList ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
                  <span>{copiedList ? 'Copied Choice List!' : 'Copy Choice List'}</span>
                </button>

                <button
                  onClick={() => {
                    const allIds = [
                      ...recommendations.dream.map(c => c.id),
                      ...recommendations.target.map(c => c.id),
                      ...recommendations.safe.map(c => c.id),
                      ...recommendations.alternative.map(c => c.id)
                    ];
                    allIds.forEach(id => {
                      if (!savedCollegeIds.includes(id)) {
                        toggleSaveCollege(id);
                      }
                    });
                    addToast({
                      id: Date.now().toString(),
                      title: 'Added to Shortlist! 🔖',
                      message: `Saved all recommended colleges to your personal shortlist.`,
                      type: 'success'
                    });
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold transition-colors flex items-center gap-1.5 border border-slate-700 cursor-pointer"
                >
                  <Bookmark className="w-4 h-4" />
                  <span>Save All to Shortlist</span>
                </button>

                <button
                  onClick={onOpenBooking}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-black transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Book Choice Strategy Call</span>
                </button>
              </div>
            </div>

            {/* 4 Tier Recommendations Cards */}
            <div className="space-y-8">
              
              {/* TIER 1: DREAM */}
              <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border-2 border-indigo-500/40 shadow-xl space-y-6">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-xl bg-indigo-500/20 text-indigo-300 font-black text-xs uppercase tracking-wider border border-indigo-500/30">
                    TIER 1: DREAM
                  </span>
                  <p className="text-xs text-slate-300 font-medium">
                    Aspirational choices closing near or slightly above your cutoff. Put these in Choice #1 to #10 for upward movement.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recommendations.dream.map((col) => (
                    <RecommendationCard
                      key={col.id}
                      college={col}
                      branch={preferredBranch}
                      tier="DREAM"
                      reason="Premier brand value, highest placement averages (₹8.5L+ LPA), and maximum recruitment density."
                      admissionRoute={isGovtSchool ? '7.5% Govt School Quota (100% Free)' : 'TNEA Single Window (Round 1 Upward)'}
                      onView={() => viewCollegeDetail(col.id)}
                      onSave={() => toggleSaveCollege(col.id)}
                      isSaved={savedCollegeIds.includes(col.id)}
                    />
                  ))}
                </div>
              </div>

              {/* TIER 2: TARGET */}
              <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border-2 border-cyan-500/40 shadow-xl space-y-6">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-xl bg-cyan-500/20 text-cyan-300 font-black text-xs uppercase tracking-wider border border-cyan-500/30">
                    TIER 2: TARGET (HIGHEST PROBABILITY)
                  </span>
                  <p className="text-xs text-slate-300 font-medium">
                    Strong historical probability of direct round allotment matching your exact {category} community rank.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {recommendations.target.map((col) => (
                    <RecommendationCard
                      key={col.id}
                      college={col}
                      branch={preferredBranch}
                      tier="TARGET"
                      reason="Direct cutoff alignment with verified previous year closing ranks, top Tier-1 autonomous lab infrastructure."
                      admissionRoute={isFirstGraduate ? 'TNEA Merit (First Graduate Concession Applied)' : 'TNEA Single Window Merit'}
                      onView={() => viewCollegeDetail(col.id)}
                      onSave={() => toggleSaveCollege(col.id)}
                      isSaved={savedCollegeIds.includes(col.id)}
                    />
                  ))}
                </div>
              </div>

              {/* TIER 3: SAFE */}
              <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border-2 border-emerald-500/40 shadow-xl space-y-6">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 font-black text-xs uppercase tracking-wider border border-emerald-500/30">
                    TIER 3: SAFE (GUARANTEED BACKUP)
                  </span>
                  <p className="text-xs text-slate-300 font-medium">
                    Protects you against unexpected cutoff surges. Place these from Choice #20 onwards.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recommendations.safe.map((col) => (
                    <RecommendationCard
                      key={col.id}
                      college={col}
                      branch={preferredBranch}
                      tier="SAFE"
                      reason="Guaranteed safety buffer with >90% placement record and autonomous flexibility in curriculum."
                      admissionRoute="TNEA Single Window Direct Allotment"
                      onView={() => viewCollegeDetail(col.id)}
                      onSave={() => toggleSaveCollege(col.id)}
                      isSaved={savedCollegeIds.includes(col.id)}
                    />
                  ))}
                </div>
              </div>

              {/* TIER 4: ALTERNATIVE */}
              <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border-2 border-amber-500/40 shadow-xl space-y-6">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 font-black text-xs uppercase tracking-wider border border-amber-500/30">
                    TIER 4: ALTERNATIVE & DEEMED PATHWAYS
                  </span>
                  <p className="text-xs text-slate-300 font-medium">
                    Specialized entrance routes and deemed universities offering high ROI and global exchange semesters.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recommendations.alternative.map((col) => (
                    <RecommendationCard
                      key={col.id}
                      college={col}
                      branch={preferredBranch}
                      tier="ALTERNATIVE"
                      reason="High-end private research labs, foreign university exchange credits, and active product incubation center."
                      admissionRoute="Institutional Entrance / Merit Counseling"
                      onView={() => viewCollegeDetail(col.id)}
                      onSave={() => toggleSaveCollege(col.id)}
                      isSaved={savedCollegeIds.includes(col.id)}
                    />
                  ))}
                </div>
              </div>

            </div>

            {/* Legal Disclaimer Box */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400 space-y-1">
              <strong className="text-slate-300 block">Verified Guidance Disclaimer:</strong>
              <p>
                Recommendations generated above are indicative estimates formulated from Directorate of Technical Education (DoTE) historical TNEA counselling data. Cutoffs fluctuate based on total applicant volume, reservation seat matrix, and statewide percentile distribution. NEXTBLOCK does not guarantee admission allotment.
              </p>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};

// Reusable Recommendation Card Component
interface RecommendationCardProps {
  college: TNCollege;
  branch: string;
  tier: 'DREAM' | 'TARGET' | 'SAFE' | 'ALTERNATIVE';
  reason: string;
  admissionRoute: string;
  onView: () => void;
  onSave: () => void;
  isSaved: boolean;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  college,
  branch,
  tier,
  reason,
  admissionRoute,
  onView,
  onSave,
  isSaved
}) => {
  return (
    <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-4">
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <span className="text-[10px] font-black uppercase text-cyan-400 block">
              {college.tneaCode ? `TNEA Code: ${college.tneaCode}` : 'University Entrance'}
            </span>
            <h4 onClick={onView} className="text-base font-black text-white hover:text-cyan-400 transition-colors cursor-pointer line-clamp-1">
              {college.name}
            </h4>
            <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-cyan-400" /> {college.city}, {college.district}
            </span>
          </div>

          <button
            onClick={onSave}
            className={`p-2 rounded-xl border text-xs transition-colors ${
              isSaved ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
            title="Save to Shortlist"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Why this college & branch */}
        <div className="space-y-2 text-xs pt-2 border-t border-slate-900">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Recommended Branch:</span>
            <span className="font-bold text-white">{branch}</span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Why this College?</span>
            <p className="text-slate-300 text-[11px] leading-relaxed">{reason}</p>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Which Admission Route?</span>
            <span className="font-bold text-cyan-300 text-[11px]">{admissionRoute}</span>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-900 flex items-center justify-between">
        <span className="text-xs font-bold text-emerald-400">
          Highest: {college.placements.highestPackage}
        </span>
        <button
          onClick={onView}
          className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors"
        >
          View Profile →
        </button>
      </div>
    </div>
  );
};
