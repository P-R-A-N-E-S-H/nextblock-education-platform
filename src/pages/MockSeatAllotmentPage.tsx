import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Calculator, 
  Layers, 
  ArrowUpDown, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Coins, 
  FileText, 
  Printer, 
  Phone, 
  ShieldCheck, 
  Award, 
  Zap, 
  ChevronDown, 
  ChevronUp, 
  Plus, 
  Trash2, 
  HelpCircle, 
  RefreshCw,
  Building2,
  GraduationCap,
  ArrowRight,
  UserCheck,
  Check,
  Copy
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { allTNCollegesData } from '../data/indexTNColleges';
import { 
  OWNER_WHATSAPP_NUMBER, 
  ADMISSIONS_HELPLINE_PHONE, 
  RECIPIENT_EMAIL,
  sendEnquiryLeadEmail 
} from '../services/emailService';
import { triggerConfetti } from '../utils/helpers';

export interface ChoiceItem {
  id: string;
  collegeId: string;
  collegeName: string;
  tneaCode: string;
  branch: string;
  branchCode: string;
  tier: string;
  approxCutoff: number; // OC cutoff benchmark
  feesPerYear: number;
  medianSalaryLPA: number;
  district: string;
}

const DEFAULT_CHOICES_POOL: Omit<ChoiceItem, 'id'>[] = [
  {
    collegeId: 'anna-university-ceg',
    collegeName: 'College of Engineering, Guindy (CEG Anna University)',
    tneaCode: '0001',
    branch: 'B.E. Computer Science and Engineering',
    branchCode: 'CSE',
    tier: 'Government Premier',
    approxCutoff: 198.50,
    feesPerYear: 35000,
    medianSalaryLPA: 12.5,
    district: 'Chennai'
  },
  {
    collegeId: 'anna-university-ceg',
    collegeName: 'College of Engineering, Guindy (CEG Anna University)',
    tneaCode: '0001',
    branch: 'B.Tech. Artificial Intelligence & Data Science',
    branchCode: 'AI-DS',
    tier: 'Government Premier',
    approxCutoff: 197.50,
    feesPerYear: 35000,
    medianSalaryLPA: 11.8,
    district: 'Chennai'
  },
  {
    collegeId: 'anna-university-mit',
    collegeName: 'Madras Institute of Technology (MIT Campus)',
    tneaCode: '0004',
    branch: 'B.E. Computer Science and Engineering',
    branchCode: 'CSE',
    tier: 'Government Premier',
    approxCutoff: 197.00,
    feesPerYear: 35000,
    medianSalaryLPA: 11.2,
    district: 'Chennai'
  },
  {
    collegeId: 'psg-college-technology',
    collegeName: 'PSG College of Technology, Coimbatore',
    tneaCode: '2006',
    branch: 'B.E. Computer Science and Engineering',
    branchCode: 'CSE',
    tier: 'Govt Aided Autonomous',
    approxCutoff: 197.50,
    feesPerYear: 65000,
    medianSalaryLPA: 12.0,
    district: 'Coimbatore'
  },
  {
    collegeId: 'psg-college-technology',
    collegeName: 'PSG College of Technology, Coimbatore',
    tneaCode: '2006',
    branch: 'B.E. Electronics and Communication Engineering',
    branchCode: 'ECE',
    tier: 'Govt Aided Autonomous',
    approxCutoff: 195.50,
    feesPerYear: 65000,
    medianSalaryLPA: 10.5,
    district: 'Coimbatore'
  },
  {
    collegeId: 'coimbatore-institute-technology',
    collegeName: 'Coimbatore Institute of Technology (CIT)',
    tneaCode: '2007',
    branch: 'B.E. Computer Science and Engineering',
    branchCode: 'CSE',
    tier: 'Govt Aided Autonomous',
    approxCutoff: 194.50,
    feesPerYear: 55000,
    medianSalaryLPA: 10.0,
    district: 'Coimbatore'
  },
  {
    collegeId: 'coimbatore-institute-technology',
    collegeName: 'Coimbatore Institute of Technology (CIT)',
    tneaCode: '2007',
    branch: 'B.Tech. Artificial Intelligence & Data Science',
    branchCode: 'AI-DS',
    tier: 'Govt Aided Autonomous',
    approxCutoff: 193.00,
    feesPerYear: 55000,
    medianSalaryLPA: 9.8,
    district: 'Coimbatore'
  },
  {
    collegeId: 'ssn-college-engineering',
    collegeName: 'SSN College of Engineering, Chennai',
    tneaCode: '1315',
    branch: 'B.E. Computer Science and Engineering',
    branchCode: 'CSE',
    tier: 'Top Tier Autonomous',
    approxCutoff: 195.00,
    feesPerYear: 145000,
    medianSalaryLPA: 10.8,
    district: 'Chennai'
  },
  {
    collegeId: 'ssn-college-engineering',
    collegeName: 'SSN College of Engineering, Chennai',
    tneaCode: '1315',
    branch: 'B.Tech. Information Technology',
    branchCode: 'IT',
    tier: 'Top Tier Autonomous',
    approxCutoff: 193.50,
    feesPerYear: 145000,
    medianSalaryLPA: 9.5,
    district: 'Chennai'
  },
  {
    collegeId: 'kumaraguru-college-technology',
    collegeName: 'Kumaraguru College of Technology (KCT), Coimbatore',
    tneaCode: '2712',
    branch: 'B.E. Computer Science and Engineering',
    branchCode: 'CSE',
    tier: 'Top Tier Autonomous',
    approxCutoff: 192.00,
    feesPerYear: 125000,
    medianSalaryLPA: 8.8,
    district: 'Coimbatore'
  },
  {
    collegeId: 'kumaraguru-college-technology',
    collegeName: 'Kumaraguru College of Technology (KCT), Coimbatore',
    tneaCode: '2712',
    branch: 'B.Tech. Artificial Intelligence & Data Science',
    branchCode: 'AI-DS',
    tier: 'Top Tier Autonomous',
    approxCutoff: 190.50,
    feesPerYear: 125000,
    medianSalaryLPA: 8.5,
    district: 'Coimbatore'
  },
  {
    collegeId: 'psg-itech-coimbatore',
    collegeName: 'PSG Institute of Technology and Applied Research (PSG iTech)',
    tneaCode: '2377',
    branch: 'B.E. Computer Science and Engineering',
    branchCode: 'CSE',
    tier: 'Top Tier Autonomous',
    approxCutoff: 193.00,
    feesPerYear: 135000,
    medianSalaryLPA: 9.6,
    district: 'Coimbatore'
  },
  {
    collegeId: 'sri-krishna-college-engineering',
    collegeName: 'Sri Krishna College of Engineering & Technology (SKCET)',
    tneaCode: '2718',
    branch: 'B.E. Computer Science and Engineering',
    branchCode: 'CSE',
    tier: 'Top Tier Autonomous',
    approxCutoff: 190.00,
    feesPerYear: 110000,
    medianSalaryLPA: 8.2,
    district: 'Coimbatore'
  },
  {
    collegeId: 'sri-krishna-college-engineering',
    collegeName: 'Sri Krishna College of Engineering & Technology (SKCET)',
    tneaCode: '2718',
    branch: 'B.Tech. Artificial Intelligence & Data Science',
    branchCode: 'AI-DS',
    tier: 'Top Tier Autonomous',
    approxCutoff: 188.50,
    feesPerYear: 110000,
    medianSalaryLPA: 8.0,
    district: 'Coimbatore'
  },
  {
    collegeId: 'government-college-technology-gct',
    collegeName: 'Government College of Technology (GCT), Coimbatore',
    tneaCode: '2005',
    branch: 'B.E. Computer Science and Engineering',
    branchCode: 'CSE',
    tier: 'Government Premier',
    approxCutoff: 192.50,
    feesPerYear: 32000,
    medianSalaryLPA: 8.5,
    district: 'Coimbatore'
  },
  {
    collegeId: 'thiagarajar-college-engineering',
    collegeName: 'Thiagarajar College of Engineering (TCE), Madurai',
    tneaCode: '5008',
    branch: 'B.E. Computer Science and Engineering',
    branchCode: 'CSE',
    tier: 'Govt Aided Autonomous',
    approxCutoff: 193.50,
    feesPerYear: 55000,
    medianSalaryLPA: 9.0,
    district: 'Madurai'
  },
  {
    collegeId: 'chennai-institute-technology',
    collegeName: 'Chennai Institute of Technology (CIT Chennai)',
    tneaCode: '1118',
    branch: 'B.E. Computer Science and Engineering',
    branchCode: 'CSE',
    tier: 'Top Tier Autonomous',
    approxCutoff: 191.50,
    feesPerYear: 130000,
    medianSalaryLPA: 8.6,
    district: 'Chennai'
  },
  {
    collegeId: 'sri-sivasubramaniya-nadar-college',
    collegeName: 'Sri Venkateswara College of Engineering (SVCE)',
    tneaCode: '1219',
    branch: 'B.E. Computer Science and Engineering',
    branchCode: 'CSE',
    tier: 'Top Tier Autonomous',
    approxCutoff: 188.00,
    feesPerYear: 120000,
    medianSalaryLPA: 7.8,
    district: 'Chennai'
  },
  {
    collegeId: 'kongu-engineering-college',
    collegeName: 'Kongu Engineering College, Perundurai, Erode',
    tneaCode: '2711',
    branch: 'B.E. Computer Science and Engineering',
    branchCode: 'CSE',
    tier: 'Top Tier Autonomous',
    approxCutoff: 187.00,
    feesPerYear: 115000,
    medianSalaryLPA: 7.5,
    district: 'Erode'
  },
  {
    collegeId: 'bannari-amman-institute-technology',
    collegeName: 'Bannari Amman Institute of Technology (BIT Sathyamangalam)',
    tneaCode: '2702',
    branch: 'B.E. Computer Science and Engineering',
    branchCode: 'CSE',
    tier: 'Top Tier Autonomous',
    approxCutoff: 186.50,
    feesPerYear: 120000,
    medianSalaryLPA: 7.2,
    district: 'Erode'
  }
];

interface MockSeatAllotmentPageProps {
  onOpenBooking?: () => void;
}

export const MockSeatAllotmentPage: React.FC<MockSeatAllotmentPageProps> = ({ onOpenBooking }) => {
  const { addToast } = useApp();

  // 1. Student Inputs & Profile
  const [maths, setMaths] = useState<number>(96);
  const [physics, setPhysics] = useState<number>(93);
  const [chemistry, setChemistry] = useState<number>(94);
  const [category, setCategory] = useState<string>('BC');
  const [is7Point5Govt, setIs7Point5Govt] = useState<boolean>(false);
  const [isFirstGraduate, setIsFirstGraduate] = useState<boolean>(false);
  const [studentName, setStudentName] = useState<string>('Tamil Nadu Aspirant');
  const [studentPhone, setStudentPhone] = useState<string>('');

  // 2. Computed Cutoff
  const cutoff = useMemo(() => {
    const m = Number(maths) || 0;
    const p = Number(physics) || 0;
    const c = Number(chemistry) || 0;
    const total = m + (p / 2) + (c / 2);
    return Math.min(200, Math.max(0, parseFloat(total.toFixed(2))));
  }, [maths, physics, chemistry]);

  // Category Cutoff Offset Matrix (TNEA community drop approximation)
  const categoryOffset = useMemo(() => {
    switch (category) {
      case 'OC': return 0.0;
      case 'BC': return 1.5;
      case 'BCM': return 3.0;
      case 'MBC/DNC': return 3.5;
      case 'SC': return 7.0;
      case 'SCA': return 9.5;
      case 'ST': return 12.0;
      default: return 0.0;
    }
  }, [category]);

  // Effective cutoff boost if 7.5% Govt School quota applies
  const effectiveCutoffScore = useMemo(() => {
    return is7Point5Govt ? cutoff + 14.0 : cutoff;
  }, [cutoff, is7Point5Govt]);

  // 3. User Choice List State
  const [choiceList, setChoiceList] = useState<ChoiceItem[]>(() => {
    return DEFAULT_CHOICES_POOL.slice(0, 10).map((item, idx) => ({
      ...item,
      id: `choice-${idx + 1}`
    }));
  });

  // Modal to Add Custom Choice
  const [showAddChoiceModal, setShowAddChoiceModal] = useState<boolean>(false);
  const [selectedPoolIndex, setSelectedPoolIndex] = useState<number>(0);

  // 4. Simulation Engine States
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [allotmentResult, setAllotmentResult] = useState<{
    round: number;
    allottedChoice: ChoiceItem | null;
    choiceNumber: number;
    status: 'ALLOTTED' | 'NOT_ALLOTTED';
    allotmentCategory: string;
    closingCutoff: number;
    margin: number;
    upwardAvailable: boolean;
  } | null>(null);

  const [upwardOptionSelected, setUpwardOptionSelected] = useState<string | null>(null);
  const [upwardResult, setUpwardResult] = useState<{
    upgradedChoice: ChoiceItem;
    oldChoiceNumber: number;
    newChoiceNumber: number;
  } | null>(null);

  // 5. Preset Handlers
  const handleLoadPreset = (presetType: 'cse' | 'circuit' | 'balanced') => {
    let filtered: Omit<ChoiceItem, 'id'>[] = [];
    if (presetType === 'cse') {
      filtered = DEFAULT_CHOICES_POOL.filter(c => c.branchCode === 'CSE' || c.branchCode === 'AI-DS' || c.branchCode === 'IT');
    } else if (presetType === 'circuit') {
      filtered = DEFAULT_CHOICES_POOL.filter(c => c.branchCode === 'ECE' || c.branchCode === 'CSE');
    } else {
      filtered = DEFAULT_CHOICES_POOL;
    }

    setChoiceList(filtered.map((c, i) => ({ ...c, id: `choice-${Date.now()}-${i}` })));
    setAllotmentResult(null);
    setUpwardResult(null);
    setUpwardOptionSelected(null);

    addToast({
      id: Date.now().toString(),
      title: 'Preset Choice List Loaded 📋',
      message: `Loaded ${filtered.length} curated choices tailored to TNEA trends.`,
      type: 'info'
    });
  };

  // Reordering helpers
  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...choiceList];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    setChoiceList(updated);
  };

  const handleMoveDown = (index: number) => {
    if (index === choiceList.length - 1) return;
    const updated = [...choiceList];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    setChoiceList(updated);
  };

  const handleDeleteChoice = (id: string) => {
    setChoiceList(choiceList.filter(c => c.id !== id));
  };

  const handleAddCustomChoice = () => {
    const itemToAdd = DEFAULT_CHOICES_POOL[selectedPoolIndex];
    if (itemToAdd) {
      setChoiceList([
        ...choiceList,
        { ...itemToAdd, id: `choice-custom-${Date.now()}` }
      ]);
      setShowAddChoiceModal(false);
      addToast({
        id: Date.now().toString(),
        title: 'Choice Added ✓',
        message: `Added ${itemToAdd.collegeName} (${itemToAdd.branchCode}) as Choice #${choiceList.length + 1}.`,
        type: 'success'
      });
    }
  };

  // 6. Execute TNEA Provisional Allotment Simulation
  const handleRunSimulation = () => {
    if (choiceList.length === 0) {
      addToast({
        id: Date.now().toString(),
        title: 'Choice List Empty',
        message: 'Please add at least 1 college choice before running the allotment simulation.',
        type: 'error'
      });
      return;
    }

    setIsSimulating(true);
    setAllotmentResult(null);
    setUpwardResult(null);
    setUpwardOptionSelected(null);

    setTimeout(() => {
      // Simulate Anna University Seat Matrix Matching
      let allottedItem: ChoiceItem | null = null;
      let allottedIndex = -1;
      let closingVal = 0;

      for (let i = 0; i < choiceList.length; i++) {
        const choice = choiceList[i];
        // Calculate community-adjusted closing cutoff
        const effectiveClosing = Math.max(140.0, choice.approxCutoff - categoryOffset);
        
        if (effectiveCutoffScore >= effectiveClosing) {
          allottedItem = choice;
          allottedIndex = i;
          closingVal = effectiveClosing;
          break;
        }
      }

      setIsSimulating(false);

      if (allottedItem) {
        const margin = parseFloat((effectiveCutoffScore - closingVal).toFixed(2));
        setAllotmentResult({
          round: 1,
          allottedChoice: allottedItem,
          choiceNumber: allottedIndex + 1,
          status: 'ALLOTTED',
          allotmentCategory: is7Point5Govt ? '7.5% Govt School Preferential Seat' : `${category} Community Quota`,
          closingCutoff: closingVal,
          margin: margin,
          upwardAvailable: allottedIndex > 0
        });
        triggerConfetti();

        addToast({
          id: Date.now().toString(),
          title: 'PROVISIONAL SEAT ALLOTTED! 🎉',
          message: `Allotted: Choice #${allottedIndex + 1} (${allottedItem.collegeName}) for Cutoff ${cutoff}.`,
          type: 'success'
        });
      } else {
        setAllotmentResult({
          round: 1,
          allottedChoice: null,
          choiceNumber: 0,
          status: 'NOT_ALLOTTED',
          allotmentCategory: category,
          closingCutoff: 0,
          margin: 0,
          upwardAvailable: false
        });

        addToast({
          id: Date.now().toString(),
          title: 'No Choice Allotted in Round 1',
          message: 'Your current cutoff is below the closing cutoff of all added choices. Add more safe Tier-2/Autonomous backup choices.',
          type: 'error'
        });
      }
    }, 1100);
  };

  // 7. Upward Movement Option Handler
  const handleSelectUpwardOption = (optionKey: string) => {
    setUpwardOptionSelected(optionKey);

    if (optionKey === 'opt-2' || optionKey === 'opt-3') {
      // Execute Round 2 Upward Simulation (Simulate seats in 1-2 higher choices dropping by 1.0 mark due to IIT/NIT surrenders)
      if (allotmentResult && allotmentResult.choiceNumber > 1) {
        const targetHigherIndex = Math.max(0, allotmentResult.choiceNumber - 2);
        const upgraded = choiceList[targetHigherIndex];

        setTimeout(() => {
          setUpwardResult({
            upgradedChoice: upgraded,
            oldChoiceNumber: allotmentResult.choiceNumber,
            newChoiceNumber: targetHigherIndex + 1
          });
          triggerConfetti();

          addToast({
            id: Date.now().toString(),
            title: 'UPWARD MOVEMENT SUCCESSFUL! 🚀',
            message: `Seat upgraded from Choice #${allotmentResult.choiceNumber} to Choice #${targetHigherIndex + 1} (${upgraded.collegeName}) in Round 2!`,
            type: 'success'
          });
        }, 800);
      }
    } else if (optionKey === 'opt-1') {
      addToast({
        id: Date.now().toString(),
        title: 'Seat Accepted & Confirmed ✓',
        message: 'Your provisional admission is locked! Proceed to document verification.',
        type: 'success'
      });
    }
  };

  // 8. ROI Analyzer Computation
  const activeAllotted = upwardResult ? upwardResult.upgradedChoice : allotmentResult?.allottedChoice;
  const roiData = useMemo(() => {
    if (!activeAllotted) return null;
    const baseTuition = activeAllotted.feesPerYear;
    const annualHostel = 75000;
    const fourYearBaseExpense = (baseTuition + annualHostel) * 4;

    let scholarshipDeduction = 0;
    if (is7Point5Govt) {
      // 100% Free Tuition + Hostel
      scholarshipDeduction = fourYearBaseExpense;
    } else if (isFirstGraduate) {
      // ₹25,000 / year deduction
      scholarshipDeduction = 25000 * 4;
    }

    const netExpense = Math.max(0, fourYearBaseExpense - scholarshipDeduction);
    const medianAnnualSalary = activeAllotted.medianSalaryLPA * 100000; // in INR
    const monthlyGrossSalary = medianAnnualSalary / 12;

    // Payback period in months
    const paybackMonths = netExpense === 0 ? 0 : parseFloat((netExpense / monthlyGrossSalary).toFixed(1));
    const fiveYearGrossEarnings = medianAnnualSalary * 5 * 1.15; // with 15% cumulative growth

    return {
      annualTuition: baseTuition,
      annualHostel: annualHostel,
      fourYearGross: fourYearBaseExpense,
      scholarshipSavings: scholarshipDeduction,
      netExpense: netExpense,
      medianLPA: activeAllotted.medianSalaryLPA,
      monthlySalaryINR: monthlyGrossSalary,
      paybackMonths: paybackMonths,
      fiveYearEarningsINR: fiveYearGrossEarnings
    };
  }, [activeAllotted, is7Point5Govt, isFirstGraduate]);

  // 9. WhatsApp Dispatch to Owner (+91 93854 65849)
  const handleSendToWhatsAppAdvisor = () => {
    const choiceSummary = choiceList.slice(0, 10).map((c, i) => `${i + 1}. [${c.tneaCode}] ${c.collegeName} (${c.branchCode})`).join('\n');
    const allottedText = activeAllotted ? `${activeAllotted.collegeName} (${activeAllotted.branchCode})` : 'Pending Simulation';

    const message = 
`🎯 *TNEA 2026 MOCK CHOICE ORDER REVIEW REQUEST*
----------------------------------------
👤 *Student:* ${studentName || 'Aspirant'}
📱 *Mobile:* ${studentPhone || 'Not specified'}
📊 *12th PCM Cutoff:* ${cutoff} / 200.00
🏷️ *Category:* ${category} ${is7Point5Govt ? '(7.5% Govt School 100% Free Quota)' : ''} ${isFirstGraduate ? '(First Graduate)' : ''}
🏛️ *Simulated Allotment:* ${allottedText}
----------------------------------------
📋 *TOP CHOICE LIST (1 to ${Math.min(10, choiceList.length)}):*
${choiceSummary}
----------------------------------------
🚀 _Please review my choice order priority and suggest Round 1 upward strategy._`;

    const waUrl = `https://wa.me/91${OWNER_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    
    // Background Lead Email Dispatch
    sendEnquiryLeadEmail({
      name: studentName || 'Mock Seat Aspirant',
      phone: studentPhone || '9385465849',
      pcmCutoff: cutoff,
      interestedBranch: activeAllotted?.branch || 'Engineering',
      targetCategory: category,
      message: `Mock Choice Locking Simulation with ${choiceList.length} choices. Simulated Allotment: ${allottedText}`,
      source: 'TNEA Mock Seat Allotment Simulator'
    }).catch(e => console.warn(e));

    window.open(waUrl, '_blank');

    addToast({
      id: Date.now().toString(),
      title: 'WhatsApp Choice Review Opened! 💬',
      message: `Your choice order was formatted and opened for Admissions Desk (+91 ${OWNER_WHATSAPP_NUMBER}).`,
      type: 'success'
    });
  };

  const handlePrintSheet = () => {
    window.print();
  };

  return (
    <div className="py-20 bg-slate-950 text-white min-h-screen relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-blue-600/20 via-cyan-500/15 to-emerald-500/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Badge & Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-black uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Official TNEA 2026 Virtual Seat Allotment Engine</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight mb-4">
            MOCK CHOICE LOCKING & <br />
            <span className="text-gradient">SEAT ALLOTMENT SIMULATOR.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
            Test Anna University's multi-round seat matrix, upward movements, community reservation quotas, 7.5% Government School free seat rules, and calculate 4-year salary ROI.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs font-bold">
            <span className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
              ⚡ Live 200-Mark PCM Engine
            </span>
            <span className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
              🏛️ 20+ Premier TN Institutions
            </span>
            <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              💬 Direct WhatsApp Review: +91 {OWNER_WHATSAPP_NUMBER}
            </span>
          </div>
        </div>

        {/* STEP 1: Student Profile & Cutoff Gauge */}
        <div className="bg-slate-900/90 border-2 border-slate-800 rounded-3xl p-6 sm:p-8 mb-8 backdrop-blur-md shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/30">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">Step 1: Enter 12th Marks & Reservation Category</h3>
                <p className="text-xs text-slate-400">Calculates official TNEA PCM cutoff and community quota benefits</p>
              </div>
            </div>
            
            {/* Cutoff Display Badge */}
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Your 12th Cutoff:</span>
              <span className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono">
                {cutoff.toFixed(2)} <span className="text-xs text-slate-400">/ 200</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Mathematics (Out of 100) *
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={maths}
                onChange={(e) => setMaths(Math.min(100, Math.max(0, parseFloat(e.target.value) || 0)))}
                className="w-full px-4 py-3 rounded-2xl bg-slate-950 border-2 border-slate-700 font-black text-white focus:outline-none focus:border-cyan-400 text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Physics (Out of 100) *
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={physics}
                onChange={(e) => setPhysics(Math.min(100, Math.max(0, parseFloat(e.target.value) || 0)))}
                className="w-full px-4 py-3 rounded-2xl bg-slate-950 border-2 border-slate-700 font-black text-white focus:outline-none focus:border-cyan-400 text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Chemistry (Out of 100) *
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={chemistry}
                onChange={(e) => setChemistry(Math.min(100, Math.max(0, parseFloat(e.target.value) || 0)))}
                className="w-full px-4 py-3 rounded-2xl bg-slate-950 border-2 border-slate-700 font-black text-white focus:outline-none focus:border-cyan-400 text-sm"
              />
            </div>
          </div>

          {/* Category & Special Quota Pills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-2">
                Community Reservation Category *
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {['OC', 'BC', 'BCM', 'MBC/DNC', 'SC', 'SCA', 'ST'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`py-2 rounded-xl text-xs font-black transition-all border ${
                      category === cat
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                • Category Benefit: <strong className="text-cyan-300">{category} gives ~{categoryOffset} marks cutoff relaxation</strong> compared to Open Competition (OC).
              </p>
            </div>

            {/* Special Schemes */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-2">
                Special Quota & Fee Waiver Schemes
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className={`p-3 rounded-2xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                  is7Point5Govt ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}>
                  <input
                    type="checkbox"
                    checked={is7Point5Govt}
                    onChange={(e) => setIs7Point5Govt(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-500 bg-slate-900 border-slate-700"
                  />
                  <div>
                    <span className="text-xs font-bold block">7.5% Govt School Quota</span>
                    <span className="text-[10px] text-slate-400">100% Free Tuition & Hostel</span>
                  </div>
                </label>

                <label className={`p-3 rounded-2xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                  isFirstGraduate ? 'bg-blue-500/15 border-blue-500 text-blue-300' : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}>
                  <input
                    type="checkbox"
                    checked={isFirstGraduate}
                    onChange={(e) => setIsFirstGraduate(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-500 bg-slate-900 border-slate-700"
                  />
                  <div>
                    <span className="text-xs font-bold block">First Graduate (FG)</span>
                    <span className="text-[10px] text-slate-400">₹25,000 to ₹50,000/yr Fee Aid</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 2: Interactive Choice Order List */}
        <div className="bg-slate-900/90 border-2 border-slate-800 rounded-3xl p-6 sm:p-8 mb-8 backdrop-blur-md shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-600 flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-500/30">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">Step 2: Build & Lock Your TNEA Choice Order</h3>
                <p className="text-xs text-slate-400">Anna University allocates seats in strict order from Choice #1 downwards</p>
              </div>
            </div>

            {/* Quick Preset Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400 mr-1">Quick Presets:</span>
              <button
                onClick={() => handleLoadPreset('cse')}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold border border-slate-700"
              >
                Top CSE / AI-DS
              </button>
              <button
                onClick={() => handleLoadPreset('circuit')}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700"
              >
                Circuit / ECE
              </button>
              <button
                onClick={() => handleLoadPreset('balanced')}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700"
              >
                All 20 Choices
              </button>
              <button
                onClick={() => setShowAddChoiceModal(true)}
                className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black flex items-center gap-1 shadow-md shadow-cyan-500/20"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Choice</span>
              </button>
            </div>
          </div>

          {/* Choice Order Table / List */}
          <div className="space-y-2.5 mb-6">
            {choiceList.map((item, idx) => {
              const effectiveClosing = Math.max(140.0, item.approxCutoff - categoryOffset);
              const isEligible = effectiveCutoffScore >= effectiveClosing;
              const diff = effectiveCutoffScore - effectiveClosing;

              return (
                <div
                  key={item.id}
                  className="bg-slate-950 p-4 rounded-2xl border-2 border-slate-800/80 hover:border-slate-700 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    {/* Priority Badge */}
                    <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center font-black text-cyan-400 text-xs shrink-0 font-mono">
                      #{idx + 1}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-black text-white">{item.collegeName}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          Code: {item.tneaCode}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400">
                          📍 {item.district}
                        </span>
                      </div>
                      <p className="text-xs text-cyan-300 font-bold mt-0.5">
                        {item.branch} ({item.branchCode}) • Median CTC: ₹{item.medianSalaryLPA} LPA
                      </p>
                    </div>
                  </div>

                  {/* Right Status & Controls */}
                  <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                    {/* Safety Status Pill */}
                    <div className="text-right mr-2">
                      <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border inline-block ${
                        diff >= 1.5
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                          : diff >= 0
                          ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                          : diff >= -1.5
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                      }`}>
                        {diff >= 1.5 ? '🟢 SAFE MATCH' : diff >= 0 ? '🔵 REALISTIC' : diff >= -1.5 ? '🟡 TARGET' : '🔴 DREAM / AMBITIOUS'}
                      </span>
                      <span className="text-[10px] text-slate-400 block font-mono mt-0.5">
                        Closing: {effectiveClosing.toFixed(1)}
                      </span>
                    </div>

                    {/* Up / Down Reorder */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleMoveUp(idx)}
                        disabled={idx === 0}
                        className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 disabled:opacity-30 text-slate-300"
                        title="Move Up"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleMoveDown(idx)}
                        disabled={idx === choiceList.length - 1}
                        className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 disabled:opacity-30 text-slate-300"
                        title="Move Down"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteChoice(item.id)}
                        className="p-1.5 rounded-lg bg-rose-950/40 border border-rose-800/60 hover:bg-rose-900/60 text-rose-300 ml-1"
                        title="Remove Choice"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* SIMULATION ACTION BUTTON */}
          <div className="text-center pt-2">
            <button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className="px-10 py-5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-2xl shadow-emerald-500/30 transition-all hover:scale-105 active:scale-95 disabled:opacity-75 cursor-pointer flex items-center gap-3 mx-auto"
            >
              {isSimulating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Evaluating Anna University Seat Matrix...</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 fill-slate-950" />
                  <span>RUN TNEA PROVISIONAL ALLOTMENT SIMULATION 🚀</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* STEP 3: PROVISIONAL ALLOTMENT RESULT */}
        {allotmentResult && (
          <div className="bg-slate-900/95 border-2 border-emerald-500/50 rounded-3xl p-6 sm:p-9 mb-8 backdrop-blur-md shadow-2xl animate-in zoom-in-95 duration-300">
            
            <div className="text-center mb-6">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-400 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 inline-block mb-3">
                Round 1 Provisional Allotment Outcome
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                {allotmentResult.status === 'ALLOTTED' ? '🎉 CONGRATULATIONS! SEAT PROVISIONALLY ALLOTTED' : '⚠️ NO ALLOTMENT IN ROUND 1'}
              </h2>
            </div>

            {allotmentResult.status === 'ALLOTTED' && allotmentResult.allottedChoice && (
              <div className="bg-slate-950 border-2 border-slate-800 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto mb-8 shadow-xl">
                
                <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-cyan-400 block mb-1">
                      ALLOTTED CHOICE #{allotmentResult.choiceNumber} OF {choiceList.length}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      {allotmentResult.allottedChoice.collegeName}
                    </h3>
                    <p className="text-sm font-bold text-emerald-400 mt-1">
                      🎓 {allotmentResult.allottedChoice.branch}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">TNEA College Code</span>
                    <span className="text-xl font-black text-white font-mono bg-blue-600/30 px-3 py-1 rounded-xl border border-blue-500/40 inline-block mt-0.5">
                      {allotmentResult.allottedChoice.tneaCode}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium text-slate-300">
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Allotment Quota:</span>
                    <strong className="text-white font-bold">{allotmentResult.allotmentCategory}</strong>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Student Cutoff:</span>
                    <strong className="text-cyan-400 font-bold">{cutoff.toFixed(2)} / 200</strong>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Safe Cutoff Cushion:</span>
                    <strong className="text-emerald-400 font-bold">+{allotmentResult.margin.toFixed(2)} Marks</strong>
                  </div>
                </div>
              </div>
            )}

            {/* UPWARD MOVEMENT OPTIONS (TNEA 4 CHOICES) */}
            {allotmentResult.status === 'ALLOTTED' && (
              <div className="max-w-3xl mx-auto space-y-4">
                <div className="flex items-center gap-2 text-sm font-black text-slate-200">
                  <HelpCircle className="w-4 h-4 text-cyan-400" />
                  <span>Choose Your Official TNEA Decision (Option 1 to 4):</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* Option 1 */}
                  <button
                    onClick={() => handleSelectUpwardOption('opt-1')}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      upwardOptionSelected === 'opt-1'
                        ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-lg'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-black text-emerald-400">OPTION 1: ACCEPT & JOIN</span>
                      {upwardOptionSelected === 'opt-1' && <Check className="w-4 h-4 text-emerald-400" />}
                    </div>
                    <p className="text-[11px] text-slate-400">
                      I am fully satisfied with this seat. I confirm and freeze this allotment for reporting.
                    </p>
                  </button>

                  {/* Option 2 */}
                  <button
                    onClick={() => handleSelectUpwardOption('opt-2')}
                    disabled={!allotmentResult.upwardAvailable}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      !allotmentResult.upwardAvailable ? 'opacity-40 cursor-not-allowed' :
                      upwardOptionSelected === 'opt-2'
                        ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-lg'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-black text-cyan-400">OPTION 2: ACCEPT & UPWARD</span>
                      {upwardOptionSelected === 'opt-2' && <Check className="w-4 h-4 text-cyan-400" />}
                    </div>
                    <p className="text-[11px] text-slate-400">
                      I accept this seat as a safety net, but wish to compete for Choices #1 to #{allotmentResult.choiceNumber - 1} in Round 2.
                    </p>
                  </button>

                  {/* Option 3 */}
                  <button
                    onClick={() => handleSelectUpwardOption('opt-3')}
                    disabled={!allotmentResult.upwardAvailable}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      !allotmentResult.upwardAvailable ? 'opacity-40 cursor-not-allowed' :
                      upwardOptionSelected === 'opt-3'
                        ? 'bg-amber-500/20 border-amber-400 text-white shadow-lg'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-black text-amber-400">OPTION 3: DECLINE & UPWARD</span>
                      {upwardOptionSelected === 'opt-3' && <Check className="w-4 h-4 text-amber-400" />}
                    </div>
                    <p className="text-[11px] text-slate-400">
                      I reject this allotted seat and only wish to compete for higher choices in next round.
                    </p>
                  </button>

                  {/* Option 4 */}
                  <button
                    onClick={() => handleSelectUpwardOption('opt-4')}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      upwardOptionSelected === 'opt-4'
                        ? 'bg-rose-500/20 border-rose-400 text-white shadow-lg'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-black text-rose-400">OPTION 4: DECLINE & QUIT</span>
                      {upwardOptionSelected === 'opt-4' && <Check className="w-4 h-4 text-rose-400" />}
                    </div>
                    <p className="text-[11px] text-slate-400">
                      I reject this seat and withdraw from all subsequent rounds of TNEA 2026 single window.
                    </p>
                  </button>
                </div>

                {/* UPWARD SIMULATION RESULT CARD */}
                {upwardResult && (
                  <div className="bg-gradient-to-br from-cyan-950 to-blue-950 border-2 border-cyan-400 p-6 rounded-2xl mt-4 animate-in fade-in duration-300">
                    <span className="text-[10px] font-black uppercase tracking-wider text-cyan-300 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 mb-2 inline-block">
                      Round 2 Upward Movement Shift Result
                    </span>
                    <h4 className="text-xl font-black text-white mb-2">
                      🚀 Upgraded to Higher Choice #{upwardResult.newChoiceNumber}!
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed mb-3">
                      Based on simulated Round 1 seat surrender vacancies, your allotment has upgraded from{' '}
                      <strong className="text-slate-200">Choice #{upwardResult.oldChoiceNumber}</strong> to{' '}
                      <strong className="text-cyan-300">{upwardResult.upgradedChoice.collegeName} ({upwardResult.upgradedChoice.branchCode})</strong>!
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* STEP 4: 4-YEAR COLLEGE ROI & SALARY CALCULATOR */}
        {roiData && activeAllotted && (
          <div className="bg-slate-900/90 border-2 border-slate-800 rounded-3xl p-6 sm:p-8 mb-8 backdrop-blur-md shadow-2xl">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 flex items-center justify-center font-bold text-slate-950 shadow-lg shadow-amber-500/30">
                <Coins className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">Step 3: 4-Year Career ROI & Payback Period Analyzer</h3>
                <p className="text-xs text-slate-400">Compare 4-year tuition & living costs against median starting salary at {activeAllotted.collegeName}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">4-Year Total Investment:</span>
                <span className="text-xl font-black text-white font-mono mt-1 block">
                  ₹{roiData.netExpense.toLocaleString('en-IN')}
                </span>
                <p className="text-[11px] text-slate-400 mt-1">
                  Tuition + Hostel minus scholarships
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Median Starting CTC:</span>
                <span className="text-xl font-black text-emerald-400 font-mono mt-1 block">
                  ₹{roiData.medianLPA} LPA
                </span>
                <p className="text-[11px] text-slate-400 mt-1">
                  ~₹{Math.round(roiData.monthlySalaryINR).toLocaleString('en-IN')}/month gross
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Payback Period:</span>
                <span className="text-xl font-black text-cyan-400 font-mono mt-1 block">
                  {roiData.paybackMonths === 0 ? '0 Months (Free)' : `${roiData.paybackMonths} Months`}
                </span>
                <p className="text-[11px] text-slate-400 mt-1">
                  Full fee recovery from salary
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">5-Year Cumulative CTC:</span>
                <span className="text-xl font-black text-amber-400 font-mono mt-1 block">
                  ₹{(roiData.fiveYearEarningsINR / 100000).toFixed(1)} Lakhs
                </span>
                <p className="text-[11px] text-slate-400 mt-1">
                  Estimated 5-year career value
                </p>
              </div>
            </div>

            {is7Point5Govt && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 text-xs text-emerald-300 font-medium">
                🎉 <strong>7.5% Government School Quota Active:</strong> Under Tamil Nadu state welfare, 100% of your ₹{roiData.fourYearGross.toLocaleString('en-IN')} 4-year tuition, hostel, and mess fees are covered by the government!
              </div>
            )}
          </div>
        )}

        {/* STEP 5: ACTION CARDS - PRINT, WHATSAPP ADVISOR REVIEW & 1-ON-1 BOOKING */}
        <div className="bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-slate-900 border-2 border-blue-500/40 rounded-3xl p-6 sm:p-9 shadow-2xl">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-black uppercase tracking-wider text-cyan-300 block">
                Official NEXTBLOCK Verification Desk
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Want a Senior Strategist to Verify Your Choice List?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Send your simulated choice order directly to our Admissions Director on WhatsApp (+91 {OWNER_WHATSAPP_NUMBER}) for rank optimization and safe Round 1 choice locking.
              </p>

              {/* Student Mobile Input */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Your Name"
                  className="px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-bold text-white focus:outline-none focus:border-cyan-400"
                />
                <input
                  type="tel"
                  value={studentPhone}
                  onChange={(e) => setStudentPhone(e.target.value)}
                  placeholder="Mobile / WhatsApp"
                  className="px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-bold text-white focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch lg:items-center gap-3 w-full lg:w-auto shrink-0">
              <button
                onClick={handleSendToWhatsAppAdvisor}
                className="px-6 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 transition-all hover:scale-105 cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Send to WhatsApp (+91 {OWNER_WHATSAPP_NUMBER})</span>
              </button>

              <button
                onClick={handlePrintSheet}
                className="px-6 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-slate-700 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Choice Sheet</span>
              </button>

              {onOpenBooking && (
                <button
                  onClick={onOpenBooking}
                  className="px-6 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 transition-all hover:scale-105 cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  <span>Book 1-on-1 Strategy</span>
                </button>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* MODAL: ADD CUSTOM CHOICE */}
      {showAddChoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-white relative shadow-2xl">
            <h3 className="text-xl font-black text-white mb-2">Add College & Branch Choice</h3>
            <p className="text-xs text-slate-400 mb-4">Select from curated top institutions in Tamil Nadu</p>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-300 block mb-1">Select College & Branch *</label>
                <select
                  value={selectedPoolIndex}
                  onChange={(e) => setSelectedPoolIndex(parseInt(e.target.value))}
                  className="w-full px-3 py-3 rounded-xl bg-slate-950 border-2 border-slate-700 font-bold text-white focus:outline-none focus:border-cyan-400"
                >
                  {DEFAULT_CHOICES_POOL.map((item, idx) => (
                    <option key={idx} value={idx}>
                      [{item.tneaCode}] {item.collegeName} — {item.branchCode} (Cutoff: ~{item.approxCutoff})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddChoiceModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddCustomChoice}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs shadow-md shadow-cyan-500/20"
                >
                  Insert Choice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
