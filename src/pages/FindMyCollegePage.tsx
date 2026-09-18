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
  Check,
  Cpu,
  Stethoscope,
  Palette,
  HeartPulse,
  TrendingUp,
  FileCheck2,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TNCollege, AcademicStream } from '../types';
import { 
  allTNCollegesData, 
  getEngineeringColleges, 
  getMedicalColleges, 
  getArtsScienceColleges 
} from '../data/indexTNColleges';
import { getStreamFallbackImage } from '../utils/helpers';

interface FindMyCollegePageProps {
  onOpenBooking?: () => void;
}

export const FindMyCollegePage: React.FC<FindMyCollegePageProps> = ({ onOpenBooking }) => {
  const { 
    savedCollegeIds, 
    toggleSaveCollege, 
    comparisonCollegeIds, 
    toggleComparison, 
    viewCollegeDetail,
    trackEvent,
    addToast
  } = useApp();

  const [activeStreamTab, setActiveStreamTab] = useState<'engineering' | 'medical' | 'arts-science'>('engineering');
  const [copiedList, setCopiedList] = useState(false);

  // 1. Engineering TNEA Marks State
  const [maths, setMaths] = useState<number>(96);
  const [physics, setPhysics] = useState<number>(94);
  const [chemistry, setChemistry] = useState<number>(92);
  const [enggCategory, setEnggCategory] = useState<string>('BC');
  const [preferredEnggBranch, setPreferredEnggBranch] = useState<string>('Computer Science (CSE)');
  const [preferredDistrict, setPreferredDistrict] = useState<string>('All Districts');
  const [isFirstGraduate, setIsFirstGraduate] = useState<boolean>(true);
  const [isGovtSchool, setIsGovtSchool] = useState<boolean>(false);
  const [maxBudget, setMaxBudget] = useState<number>(200000);
  const [hostelRequired, setHostelRequired] = useState<boolean>(true);

  // 2. Medical NEET Marks State
  const [neetBio, setNeetBio] = useState<number>(330);
  const [neetChem, setNeetChem] = useState<number>(150);
  const [neetPhy, setNeetPhy] = useState<number>(140);
  const [medCategory, setMedCategory] = useState<string>('BC');
  const [medQuota, setMedQuota] = useState<string>('State Quota 85%');
  const [preferredMedCourse, setPreferredMedCourse] = useState<string>('MBBS');
  const [isGovtSchoolNeet, setIsGovtSchoolNeet] = useState<boolean>(false);

  // 3. Arts & Science Marks State
  const [artsTotal12th, setArtsTotal12th] = useState<number>(565); // Out of 600
  const [artsSubjectField, setArtsSubjectField] = useState<string>('Commerce & Finance (B.Com)');
  const [artsCategory, setArtsCategory] = useState<string>('OC');
  const [artsShift, setArtsShift] = useState<string>('Day (Shift 1 - Govt/Aided)');

  // Calculated Cutoffs
  const enggCutoff = useMemo(() => {
    const m = Math.min(100, Math.max(0, Number(maths) || 0));
    const p = Math.min(100, Math.max(0, Number(physics) || 0));
    const c = Math.min(100, Math.max(0, Number(chemistry) || 0));
    const cutoff = m + (p / 2) + (c / 2);
    return Number(cutoff.toFixed(2));
  }, [maths, physics, chemistry]);

  const neetScore = useMemo(() => {
    const b = Math.min(360, Math.max(0, Number(neetBio) || 0));
    const c = Math.min(180, Math.max(0, Number(neetChem) || 0));
    const p = Math.min(180, Math.max(0, Number(neetPhy) || 0));
    return b + c + p;
  }, [neetBio, neetChem, neetPhy]);

  const artsPercentage = useMemo(() => {
    const tot = Math.min(600, Math.max(0, Number(artsTotal12th) || 0));
    return Number(((tot / 600) * 100).toFixed(2));
  }, [artsTotal12th]);

  // Recommendation Engine for all 3 Streams
  const recommendations = useMemo(() => {
    if (activeStreamTab === 'engineering') {
      const allEngg = getEngineeringColleges();
      const cutoff = enggCutoff;

      const getCutoffFloor = (c: TNCollege) => {
        if (!c.tneaCutoffGeneral) return 175;
        const match = c.tneaCutoffGeneral.match(/(\d+\.?\d*)/);
        return match ? parseFloat(match[1]) : 175;
      };

      let pool = allEngg;
      if (preferredDistrict !== 'All Districts' && preferredDistrict !== 'All Tamil Nadu') {
        const distMatch = allEngg.filter(c => c.district.toLowerCase() === preferredDistrict.toLowerCase());
        if (distMatch.length >= 3) pool = distMatch;
      }

      const sorted = [...pool].sort((a, b) => getCutoffFloor(b) - getCutoffFloor(a));

      const dream = sorted.filter(c => {
        const floor = getCutoffFloor(c);
        return floor >= cutoff - 0.5 && floor <= cutoff + 5.0;
      }).slice(0, 2);

      const target = sorted.filter(c => {
        const floor = getCutoffFloor(c);
        return floor <= cutoff + 0.5 && floor >= cutoff - 4.5 && !dream.some(d => d.id === c.id);
      }).slice(0, 3);

      const safe = sorted.filter(c => {
        const floor = getCutoffFloor(c);
        return floor < cutoff - 4.0 && !dream.some(d => d.id === c.id) && !target.some(t => t.id === c.id);
      }).slice(0, 2);

      const alternative = allEngg.filter(c => 
        c.institutionType.includes('Deemed') || 
        c.category === 'Top Tier Autonomous' || 
        c.category === 'Coimbatore Landmark'
      ).filter(c => !dream.some(d => d.id === c.id) && !target.some(t => t.id === c.id) && !safe.some(s => s.id === c.id)).slice(0, 2);

      return {
        dream: dream.length ? dream : sorted.slice(0, 2),
        target: target.length ? target : sorted.slice(2, 4),
        safe: safe.length ? safe : sorted.slice(4, 6),
        alternative: alternative.length ? alternative : sorted.slice(6, 8)
      };
    } else if (activeStreamTab === 'medical') {
      const allMed = getMedicalColleges();
      const score = neetScore;

      const getNeetFloor = (c: TNCollege) => {
        if (!c.neetCutoffGeneral) return 500;
        const match = c.neetCutoffGeneral.match(/(\d+)/);
        return match ? parseInt(match[1]) : 500;
      };

      const sorted = [...allMed].sort((a, b) => getNeetFloor(b) - getNeetFloor(a));

      const dream = sorted.filter(c => {
        const floor = getNeetFloor(c);
        return floor >= score - 10 && floor <= score + 45;
      }).slice(0, 2);

      const target = sorted.filter(c => {
        const floor = getNeetFloor(c);
        return floor <= score + 10 && floor >= score - 50 && !dream.some(d => d.id === c.id);
      }).slice(0, 3);

      const safe = sorted.filter(c => {
        const floor = getNeetFloor(c);
        return floor < score - 45 && !dream.some(d => d.id === c.id) && !target.some(t => t.id === c.id);
      }).slice(0, 2);

      const alternative = allMed.filter(c => 
        c.institutionType.includes('Private') || 
        c.institutionType.includes('Deemed') ||
        c.allBranches.some(b => b.includes('BDS') || b.includes('Pharmacy') || b.includes('Allied'))
      ).filter(c => !dream.some(d => d.id === c.id) && !target.some(t => t.id === c.id) && !safe.some(s => s.id === c.id)).slice(0, 2);

      return {
        dream: dream.length ? dream : sorted.slice(0, 2),
        target: target.length ? target : sorted.slice(2, 4),
        safe: safe.length ? safe : sorted.slice(4, 6),
        alternative: alternative.length ? alternative : sorted.slice(6, 8)
      };
    } else {
      // Arts & Science
      const allArts = getArtsScienceColleges();
      const pct = artsPercentage;

      const getArtsFloor = (c: TNCollege) => {
        if (!c.meritCutoffPercentage) return 85;
        const match = c.meritCutoffPercentage.match(/(\d+\.?\d*)/);
        return match ? parseFloat(match[1]) : 85;
      };

      const sorted = [...allArts].sort((a, b) => getArtsFloor(b) - getArtsFloor(a));

      const dream = sorted.filter(c => {
        const floor = getArtsFloor(c);
        return floor >= pct - 1.0 && floor <= pct + 4.0;
      }).slice(0, 2);

      const target = sorted.filter(c => {
        const floor = getArtsFloor(c);
        return floor <= pct + 1.0 && floor >= pct - 6.0 && !dream.some(d => d.id === c.id);
      }).slice(0, 3);

      const safe = sorted.filter(c => {
        const floor = getArtsFloor(c);
        return floor < pct - 5.5 && !dream.some(d => d.id === c.id) && !target.some(t => t.id === c.id);
      }).slice(0, 2);

      const alternative = allArts.filter(c => 
        c.institutionType.includes('Self-Financing') || 
        c.category === 'Top Tier Arts & Science'
      ).filter(c => !dream.some(d => d.id === c.id) && !target.some(t => t.id === c.id) && !safe.some(s => s.id === c.id)).slice(0, 2);

      return {
        dream: dream.length ? dream : sorted.slice(0, 2),
        target: target.length ? target : sorted.slice(2, 4),
        safe: safe.length ? safe : sorted.slice(4, 6),
        alternative: alternative.length ? alternative : sorted.slice(6, 8)
      };
    }
  }, [activeStreamTab, enggCutoff, neetScore, artsPercentage, preferredDistrict]);

  const handleCopyChoiceList = () => {
    const list = [
      ...recommendations.dream.map((c, i) => `#${i + 1} [DREAM] ${c.name} (${c.tneaCode ? `Code: ${c.tneaCode}` : c.city})`),
      ...recommendations.target.map((c, i) => `#${recommendations.dream.length + i + 1} [TARGET] ${c.name} (${c.tneaCode ? `Code: ${c.tneaCode}` : c.city})`),
      ...recommendations.safe.map((c, i) => `#${recommendations.dream.length + recommendations.target.length + i + 1} [SAFE] ${c.name} (${c.tneaCode ? `Code: ${c.tneaCode}` : c.city})`)
    ].join('\n');

    navigator.clipboard.writeText(list);
    setCopiedList(true);
    addToast({
      id: Date.now().toString(),
      title: 'Choice List Copied! 📋',
      message: 'Personalized college choice list copied to clipboard.',
      type: 'success'
    });
    setTimeout(() => setCopiedList(false), 3000);
  };

  const handleSaveAllRecommendations = () => {
    const allRecs = [
      ...recommendations.dream,
      ...recommendations.target,
      ...recommendations.safe,
      ...recommendations.alternative
    ];

    let count = 0;
    allRecs.forEach(c => {
      if (!savedCollegeIds.includes(c.id)) {
        toggleSaveCollege(c.id);
        count++;
      }
    });

    addToast({
      id: Date.now().toString(),
      title: 'Shortlist Updated! 🔖',
      message: `Saved ${count} recommended colleges to your shortlist.`,
      type: 'success'
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-20 pb-24">
      
      {/* Top Banner Header */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-black uppercase tracking-wider mb-3">
            <Compass className="w-4 h-4" /> AI Cutoff & Choice Matchmaker for All Students
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            FIND YOUR NEXTBLOCK
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-3xl leading-relaxed">
            Personalized college and branch predictor across Tamil Nadu. Whether you are an <strong>Engineering (TNEA)</strong>, <strong>Medical (NEET)</strong>, or <strong>Arts, Science & Commerce</strong> student, calculate your exact cutoff and get instant Dream, Target, and Safe recommendations.
          </p>

          {/* Stream Selector Tabs */}
          <div className="flex flex-wrap items-center gap-3 mt-8">
            <button
              onClick={() => setActiveStreamTab('engineering')}
              className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2.5 border shadow-lg ${
                activeStreamTab === 'engineering'
                  ? 'bg-blue-600 text-white border-blue-400 shadow-blue-500/30'
                  : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border-slate-800'
              }`}
            >
              <Cpu className="w-4 h-4 text-cyan-300" />
              <span>Engineering (TNEA PCM 200)</span>
            </button>

            <button
              onClick={() => setActiveStreamTab('medical')}
              className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2.5 border shadow-lg ${
                activeStreamTab === 'medical'
                  ? 'bg-emerald-600 text-white border-emerald-400 shadow-emerald-500/30'
                  : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border-slate-800'
              }`}
            >
              <Stethoscope className="w-4 h-4 text-emerald-300" />
              <span>Medical & Healthcare (NEET 720)</span>
            </button>

            <button
              onClick={() => setActiveStreamTab('arts-science')}
              className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2.5 border shadow-lg ${
                activeStreamTab === 'arts-science'
                  ? 'bg-purple-600 text-white border-purple-400 shadow-purple-500/30'
                  : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border-slate-800'
              }`}
            >
              <Palette className="w-4 h-4 text-purple-300" />
              <span>Arts, Science & Commerce (12th Merit %)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Diagnostic Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        
        {/* Form Container */}
        <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border-2 border-slate-800 shadow-2xl space-y-8">
          
          {/* STREAM 1: ENGINEERING TNEA FORM */}
          {activeStreamTab === 'engineering' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Marks Row */}
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-6">
                  <h2 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-cyan-400" /> 1. Academic Marks & TNEA PCM Cutoff
                  </h2>
                  <div className="bg-blue-600/20 px-3.5 py-1.5 rounded-xl border border-blue-500/40 text-cyan-300 text-xs font-black">
                    Calculated Cutoff: <span className="text-white text-base ml-1 font-mono">{enggCutoff} / 200.00</span>
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
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono font-bold text-lg focus:outline-none focus:border-cyan-500"
                    />
                    <span className="text-[10px] text-slate-400">Divided by 2 (Weighted 50%)</span>
                  </div>
                </div>
              </div>

              {/* Quotas & Community Row */}
              <div>
                <h2 className="text-base font-black text-white uppercase tracking-wider border-b border-slate-800 pb-3 mb-6">
                  2. Community & Govt Fee Waivers
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-300 uppercase block">Community Category</label>
                    <select
                      value={enggCategory}
                      onChange={(e) => setEnggCategory(e.target.value)}
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

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white text-xs block">7.5% Govt School Quota?</span>
                      <span className="text-[11px] text-slate-400">100% Free Tuition + Hostel</span>
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

              {/* Preferences Row */}
              <div>
                <h2 className="text-base font-black text-white uppercase tracking-wider border-b border-slate-800 pb-3 mb-6">
                  3. Preferred Branch & Location
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-300 uppercase block">Target Branch</label>
                    <select
                      value={preferredEnggBranch}
                      onChange={(e) => setPreferredEnggBranch(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold text-xs focus:outline-none focus:border-cyan-500"
                    >
                      <option value="Computer Science (CSE)">Computer Science & Engineering (CSE)</option>
                      <option value="Artificial Intelligence & Data Science (AI & DS)">Artificial Intelligence & Data Science (AI & DS)</option>
                      <option value="Information Technology (IT)">Information Technology (IT)</option>
                      <option value="Cyber Security">Cyber Security</option>
                      <option value="Electronics & Communication (ECE)">Electronics & Communication (ECE)</option>
                      <option value="Robotics & Automation">Robotics & Automation / Mechatronics</option>
                      <option value="Electrical & Electronics (EEE)">Electrical & Electronics (EEE)</option>
                      <option value="Mechanical Engineering">Mechanical & EV Engineering</option>
                      <option value="Biotechnology / Biomedical">Biotechnology / Biomedical</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-300 uppercase block">Preferred District Zone</label>
                    <select
                      value={preferredDistrict}
                      onChange={(e) => setPreferredDistrict(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold text-xs focus:outline-none focus:border-cyan-500"
                    >
                      <option value="All Districts">All Tamil Nadu (Top State Ranks)</option>
                      <option value="Coimbatore">Coimbatore Region (Manchester Hub)</option>
                      <option value="Chennai">Chennai Metro (IT & Auto Belt)</option>
                      <option value="Madurai">Madurai & South TN</option>
                      <option value="Salem">Salem & Erode Belt</option>
                      <option value="Tiruchirappalli">Trichy & Delta Region</option>
                      <option value="Vellore">Vellore & North TN</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STREAM 2: MEDICAL NEET FORM */}
          {activeStreamTab === 'medical' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* NEET Marks Row */}
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-6">
                  <h2 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <HeartPulse className="w-5 h-5 text-emerald-400" /> 1. NEET UG Score Breakdown
                  </h2>
                  <div className="bg-emerald-600/20 px-3.5 py-1.5 rounded-xl border border-emerald-500/40 text-emerald-300 text-xs font-black">
                    Total NEET Score: <span className="text-white text-base ml-1 font-mono">{neetScore} / 720</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-300 uppercase block">Biology / Botany & Zoology (Max 360)</label>
                    <input
                      type="number"
                      min="0"
                      max="360"
                      value={neetBio}
                      onChange={(e) => setNeetBio(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono font-bold text-lg focus:outline-none focus:border-emerald-500"
                    />
                    <span className="text-[10px] text-slate-400">90 Questions (360 Marks)</span>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-300 uppercase block">Chemistry (Max 180)</label>
                    <input
                      type="number"
                      min="0"
                      max="180"
                      value={neetChem}
                      onChange={(e) => setNeetChem(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono font-bold text-lg focus:outline-none focus:border-emerald-500"
                    />
                    <span className="text-[10px] text-slate-400">45 Questions (180 Marks)</span>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-300 uppercase block">Physics (Max 180)</label>
                    <input
                      type="number"
                      min="0"
                      max="180"
                      value={neetPhy}
                      onChange={(e) => setNeetPhy(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono font-bold text-lg focus:outline-none focus:border-emerald-500"
                    />
                    <span className="text-[10px] text-slate-400">45 Questions (180 Marks)</span>
                  </div>
                </div>
              </div>

              {/* Medical Quotas & Programs */}
              <div>
                <h2 className="text-base font-black text-white uppercase tracking-wider border-b border-slate-800 pb-3 mb-6">
                  2. Medical Counselling Route & Reservation
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-300 uppercase block">Counselling Quota</label>
                    <select
                      value={medQuota}
                      onChange={(e) => setMedQuota(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold text-xs focus:outline-none focus:border-emerald-500"
                    >
                      <option value="State Quota 85%">TN State Quota (85% Govt / SF Seats)</option>
                      <option value="All India Quota 15%">All India Quota (15% AIQ - MCC)</option>
                      <option value="7.5% Govt School Quota">7.5% Govt School Horizontal Quota (100% Free MBBS)</option>
                      <option value="Management Quota">Management / Deemed University Quota</option>
                      <option value="NRI Quota">NRI / NRI Lapsed Quota</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-300 uppercase block">Desired Healthcare Degree</label>
                    <select
                      value={preferredMedCourse}
                      onChange={(e) => setPreferredMedCourse(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold text-xs focus:outline-none focus:border-emerald-500"
                    >
                      <option value="MBBS">MBBS (Medicine & Surgery)</option>
                      <option value="BDS">BDS (Dental Surgery)</option>
                      <option value="Pharm.D / B.Pharm">Pharm.D / B.Pharm (Pharmacy)</option>
                      <option value="B.Sc Nursing">B.Sc Nursing</option>
                      <option value="Allied Health Sciences">Allied Health Sciences (Radiology, Cardiac, Lab Tech)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-300 uppercase block">Community Category</label>
                    <select
                      value={medCategory}
                      onChange={(e) => setMedCategory(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold text-xs focus:outline-none focus:border-emerald-500"
                    >
                      <option value="OC">OC (Open Competition / General)</option>
                      <option value="BC">BC (Backward Class)</option>
                      <option value="BCM">BCM (BC Muslim)</option>
                      <option value="MBC">MBC / DNC</option>
                      <option value="SC">SC (Scheduled Caste)</option>
                      <option value="SCA">SCA (SC Arunthathiyar)</option>
                      <option value="ST">ST (Scheduled Tribe)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STREAM 3: ARTS & SCIENCE FORM */}
          {activeStreamTab === 'arts-science' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* 12th Board Marks Row */}
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-6">
                  <h2 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <Award className="w-5 h-5 text-purple-400" /> 1. Class 12th Board Aggregate Marks
                  </h2>
                  <div className="bg-purple-600/20 px-3.5 py-1.5 rounded-xl border border-purple-500/40 text-purple-300 text-xs font-black">
                    Merit Percentage: <span className="text-white text-base ml-1 font-mono">{artsPercentage}%</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-300 uppercase block">12th Board Total Marks (Max 600)</label>
                    <input
                      type="number"
                      min="0"
                      max="600"
                      value={artsTotal12th}
                      onChange={(e) => setArtsTotal12th(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono font-bold text-lg focus:outline-none focus:border-purple-500"
                    />
                    <span className="text-[10px] text-slate-400">Calculates overall board percentage for merit admission lists</span>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-300 uppercase block">Academic Focus Stream</label>
                    <select
                      value={artsSubjectField}
                      onChange={(e) => setArtsSubjectField(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold text-xs focus:outline-none focus:border-purple-500"
                    >
                      <option value="Commerce & Finance (B.Com)">Commerce & Professional Accounting (B.Com / B.Com PA / CS)</option>
                      <option value="Computer & AI (B.Sc CS / BCA)">Computer Science & IT (B.Sc CS, BCA, Data Analytics)</option>
                      <option value="Pure Sciences (B.Sc)">Pure Sciences (Physics, Chemistry, Maths, Biotechnology)</option>
                      <option value="Management (BBA)">Management & International Business (BBA)</option>
                      <option value="Humanities & Social Sciences (B.A)">Humanities (Economics, English Literature, Psychology)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Shift & Reservation */}
              <div>
                <h2 className="text-base font-black text-white uppercase tracking-wider border-b border-slate-800 pb-3 mb-6">
                  2. Shift Preference & Category
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-300 uppercase block">College Shift / Stream</label>
                    <select
                      value={artsShift}
                      onChange={(e) => setArtsShift(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold text-xs focus:outline-none focus:border-purple-500"
                    >
                      <option value="Day (Shift 1 - Govt/Aided)">Shift 1 / Day (Govt-Aided — Lowest Fees)</option>
                      <option value="Evening (Shift 2 - Self-Financed)">Shift 2 / Evening (Self-Financed Courses)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-300 uppercase block">Community Category</label>
                    <select
                      value={artsCategory}
                      onChange={(e) => setArtsCategory(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold text-xs focus:outline-none focus:border-purple-500"
                    >
                      <option value="OC">OC (Open Competition / General)</option>
                      <option value="BC">BC (Backward Class)</option>
                      <option value="BCM">BCM (BC Muslim)</option>
                      <option value="MBC">MBC / DNC</option>
                      <option value="SC">SC (Scheduled Caste)</option>
                      <option value="SCA">SCA (SC Arunthathiyar)</option>
                      <option value="ST">ST (Scheduled Tribe)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* RECOMMENDATION RESULTS SECTION */}
        <div id="recommendation-results" className="space-y-8 pt-4">
          
          {/* Results Summary Bar */}
          <div className="bg-gradient-to-r from-blue-900/40 via-slate-900 to-slate-900 p-6 sm:p-8 rounded-3xl border-2 border-blue-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
            <div>
              <span className="text-xs uppercase font-black tracking-wider text-cyan-400 flex items-center gap-1.5 mb-1">
                <Sparkles className="w-4 h-4 text-cyan-300" />
                {activeStreamTab === 'engineering'
                  ? `Engineered for TNEA Cutoff: ${enggCutoff} / 200`
                  : activeStreamTab === 'medical'
                  ? `Evaluated for NEET UG Score: ${neetScore} / 720`
                  : `Analyzed for 12th Board Merit: ${artsPercentage}%`}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Your Tailored Allotment Strategy
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                Structured into Dream, Target, Safe, and Alternative tiers to optimize your single-window counselling choice order.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleCopyChoiceList}
                className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-black text-xs transition-all flex items-center gap-2 border border-slate-700 shadow-md"
              >
                {copiedList ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-300" />}
                <span>{copiedList ? 'Choice List Copied!' : 'Copy Choice Filling Order'}</span>
              </button>

              <button
                onClick={handleSaveAllRecommendations}
                className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs transition-all flex items-center gap-2 shadow-lg shadow-blue-500/30"
              >
                <Bookmark className="w-4 h-4" />
                <span>Save All to Shortlist</span>
              </button>
            </div>
          </div>

          {/* TIER 1: DREAM */}
          <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border-2 border-indigo-500/40 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 font-black text-xs uppercase tracking-wider border border-indigo-500/40">
                  TIER 1: DREAM (ASPIRATIONAL)
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium">
                Put these top choices in Choice #1 to #10 for upward movement in subsequent rounds.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations.dream.map((col) => (
                <RecommendationCard
                  key={col.id}
                  college={col}
                  tier="DREAM"
                  stream={activeStreamTab}
                  reason="Apex state brand value, highest placement CTC (₹10L+ LPA), and maximum recruitment density."
                  onView={() => viewCollegeDetail(col.id)}
                  onSave={() => toggleSaveCollege(col.id)}
                  isSaved={savedCollegeIds.includes(col.id)}
                  isCompared={comparisonCollegeIds.includes(col.id)}
                  onCompare={() => toggleComparison(col.id)}
                />
              ))}
            </div>
          </div>

          {/* TIER 2: TARGET */}
          <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border-2 border-cyan-500/40 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 font-black text-xs uppercase tracking-wider border border-cyan-500/40">
                  TIER 2: TARGET (HIGHEST PROBABILITY)
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium">
                Strong historical probability of direct round allotment matching your exact score & community rank.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendations.target.map((col) => (
                <RecommendationCard
                  key={col.id}
                  college={col}
                  tier="TARGET"
                  stream={activeStreamTab}
                  reason="Optimal cutoff alignment with previous year closing ranks, top Tier-1 autonomous infrastructure."
                  onView={() => viewCollegeDetail(col.id)}
                  onSave={() => toggleSaveCollege(col.id)}
                  isSaved={savedCollegeIds.includes(col.id)}
                  isCompared={comparisonCollegeIds.includes(col.id)}
                  onCompare={() => toggleComparison(col.id)}
                />
              ))}
            </div>
          </div>

          {/* TIER 3: SAFE */}
          <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border-2 border-emerald-500/40 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 font-black text-xs uppercase tracking-wider border border-emerald-500/40">
                  TIER 3: SAFE (GUARANTEED ALLOTMENT)
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium">
                High-confidence safety backup institutions ensuring zero chance of leaving counselling rounds empty-handed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations.safe.map((col) => (
                <RecommendationCard
                  key={col.id}
                  college={col}
                  tier="SAFE"
                  stream={activeStreamTab}
                  reason="Guaranteed seat allotment safety net with strong consistent placement record."
                  onView={() => viewCollegeDetail(col.id)}
                  onSave={() => toggleSaveCollege(col.id)}
                  isSaved={savedCollegeIds.includes(col.id)}
                  isCompared={comparisonCollegeIds.includes(col.id)}
                  onCompare={() => toggleComparison(col.id)}
                />
              ))}
            </div>
          </div>

          {/* TIER 4: ALTERNATIVE */}
          <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border-2 border-slate-800 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1.5 rounded-xl bg-purple-500/20 text-purple-300 font-black text-xs uppercase tracking-wider border border-purple-500/40">
                  TIER 4: SPECIALIZED & DEEMED ALTERNATIVES
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium">
                Independent entrance, management quota, and deemed university pathways.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations.alternative.map((col) => (
                <RecommendationCard
                  key={col.id}
                  college={col}
                  tier="ALTERNATIVE"
                  stream={activeStreamTab}
                  reason="Global accreditations, multi-campus university ecosystem, and direct university admission test routes."
                  onView={() => viewCollegeDetail(col.id)}
                  onSave={() => toggleSaveCollege(col.id)}
                  isSaved={savedCollegeIds.includes(col.id)}
                  isCompared={comparisonCollegeIds.includes(col.id)}
                  onCompare={() => toggleComparison(col.id)}
                />
              ))}
            </div>
          </div>

          {/* Student Counselling Expert CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-2">
              <h3 className="text-2xl font-black">Need 1-on-1 Personalized Choice Filling Review?</h3>
              <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
                Get your complete choice sheet verified by senior TNEA & Medical admission strategists before final lock.
              </p>
            </div>
            <button
              onClick={onOpenBooking}
              className="px-6 py-3.5 rounded-2xl bg-white text-blue-950 font-black text-xs sm:text-sm hover:bg-slate-100 transition-all shrink-0 shadow-xl"
            >
              Book Free Counselling Session →
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

// Reusable Recommendation Card Component
interface RecommendationCardProps {
  college: TNCollege;
  tier: 'DREAM' | 'TARGET' | 'SAFE' | 'ALTERNATIVE';
  stream: 'engineering' | 'medical' | 'arts-science';
  reason: string;
  onView: () => void;
  onSave: () => void;
  isSaved: boolean;
  isCompared: boolean;
  onCompare: () => void;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  college,
  tier,
  stream,
  reason,
  onView,
  onSave,
  isSaved,
  isCompared,
  onCompare
}) => {
  return (
    <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-4 shadow-lg">
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className={`text-[9px] px-2 py-0.5 rounded font-black uppercase text-white ${
                college.stream === 'medical'
                  ? 'bg-emerald-600'
                  : college.stream === 'arts-science'
                  ? 'bg-purple-600'
                  : 'bg-blue-600'
              }`}>
                {college.stream === 'medical' ? 'Medical' : college.stream === 'arts-science' ? 'Arts & Sci' : 'Engineering'}
              </span>
              <span className="text-[10px] font-mono font-bold text-cyan-400">
                {college.tneaCode ? `Code: ${college.tneaCode}` : college.stream === 'medical' ? 'NEET UG' : 'Merit'}
              </span>
            </div>

            <h4 onClick={onView} className="text-base font-black text-white hover:text-cyan-400 transition-colors cursor-pointer line-clamp-1">
              {college.name}
            </h4>
            <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5 font-medium">
              <MapPin className="w-3 h-3 text-cyan-400" /> {college.city}, {college.district}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={onSave}
              className={`p-2 rounded-xl border text-xs transition-colors ${
                isSaved ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
              title="Save to Shortlist"
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onCompare}
              className={`p-2 rounded-xl border text-xs transition-colors ${
                isCompared ? 'bg-blue-600 text-white border-blue-400' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
              title="Compare"
            >
              <Scale className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Why this college & metrics */}
        <div className="space-y-2 text-xs pt-3 border-t border-slate-900">
          <div className="grid grid-cols-2 gap-2 bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
            <div>
              <span className="text-[9px] uppercase font-bold text-slate-400 block">
                {stream === 'medical' ? 'NEET Cutoff' : stream === 'arts-science' ? 'Merit Target' : 'TNEA Cutoff'}
              </span>
              <span className="font-black text-cyan-300 text-xs">
                {stream === 'medical'
                  ? (college.neetCutoffGeneral ? `${college.neetCutoffGeneral} M` : 'NEET UG')
                  : stream === 'arts-science'
                  ? (college.meritCutoffPercentage || '85%+ Merit')
                  : (college.tneaCutoffGeneral || 'Merit')}
              </span>
            </div>
            <div>
              <span className="text-[9px] uppercase font-bold text-slate-400 block">Highest CTC</span>
              <span className="font-black text-emerald-400 text-xs">{college.placements.highestPackage}</span>
            </div>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Why this College?</span>
            <p className="text-slate-300 text-[11px] leading-relaxed mt-0.5">{reason}</p>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-900 flex items-center justify-between gap-2">
        <span className="text-[11px] text-slate-400 truncate">
          Fees: {college.approxFeesPerYear.split('(')[0]}
        </span>
        <button
          onClick={onView}
          className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors flex items-center gap-1 shrink-0"
        >
          <span>View Profile</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
