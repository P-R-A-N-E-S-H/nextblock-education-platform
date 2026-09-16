import React, { useState, useMemo } from 'react';
import { 
  Award, 
  Search, 
  Filter, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink, 
  Sparkles, 
  ArrowRight, 
  FileText, 
  Calendar, 
  DollarSign, 
  HelpCircle,
  Clock
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ScholarshipsPageProps {
  onOpenBooking?: () => void;
}

interface ScholarshipData {
  id: string;
  name: string;
  category: 'Government Welfare' | '7.5% Govt School' | 'First Graduate' | 'Institutional Merit' | 'Corporate & Trust' | 'International';
  amount: string;
  eligibility: string;
  deadline: string;
  requiredDocuments: string[];
  officialSourceUrl: string;
  overview: string;
  coverage: string[];
}

const SCHOLARSHIPS_DATA: ScholarshipData[] = [
  {
    id: 'tn-7-5-govt-school-quota',
    name: 'Tamil Nadu 7.5% Govt School Horizontal Quota & Full Fee Waiver',
    category: '7.5% Govt School',
    amount: '100% Free (Tuition + Hostel + Mess + Bus + Exam Fees)',
    eligibility: 'Must have completed continuous schooling from 6th to 12th standard in Tamil Nadu Government Schools.',
    deadline: 'Synchronized with TNEA Choice Filling (July/August 2026)',
    requiredDocuments: ['6th–12th Bonafide Certificate by Headmaster & DEO', '10th & 12th Marksheet', 'Community Certificate', 'Aadhaar Card'],
    officialSourceUrl: 'https://www.tneaonline.org',
    overview: 'The most comprehensive welfare scholarship in India. Covers the entire 4-year engineering education costs across government, aided, and private autonomous colleges.',
    coverage: ['100% Tuition Fees', 'Hostel Room & Mess Charges', 'University Examination Fees', 'College Bus Transport Charges']
  },
  {
    id: 'tn-first-graduate-concession',
    name: 'First Graduate (FG) State Tuition Fee Subsidy',
    category: 'First Graduate',
    amount: '₹25,000 – ₹50,000 / year Tuition Fee Waiver',
    eligibility: 'First member of the immediate family (including siblings) to pursue an undergraduate degree.',
    deadline: 'During TNEA Certificate Verification (TFC)',
    requiredDocuments: ['First Graduate Certificate issued by Tahsildar', 'Joint Declaration by Parent & Student', 'Family Member Education Proofs'],
    officialSourceUrl: 'https://www.tneaonline.org',
    overview: 'Provides immediate reduction on government-regulated tuition fee in all TNEA allotted seats regardless of caste or community.',
    coverage: ['Direct reduction on annual tuition invoice', 'Applicable for all 4 years of B.E/B.Tech']
  },
  {
    id: 'moovalur-ramamirtham-pudhumai-penn',
    name: 'Moovalur Ramamirtham Ammaiyar Higher Education Scheme (Pudhumai Penn)',
    category: 'Government Welfare',
    amount: '₹1,000 / month Direct Bank Transfer (DBT)',
    eligibility: 'Girl students who completed 6th to 12th standard in Tamil Nadu Government Schools pursuing higher degrees.',
    deadline: 'Active portal registration at college joining',
    requiredDocuments: ['Govt School Bonafide Certificate', 'Bank Passbook (Linked with Aadhaar)', 'College Allotment Order'],
    officialSourceUrl: 'https://penkalvi.tn.gov.in',
    overview: 'Monthly financial empowerment scholarship directly deposited into the student’s bank account to support daily academic expenses.',
    coverage: ['₹12,000 annual cash stipend for books and learning materials']
  },
  {
    id: 'tamil-pudhalvan-scheme',
    name: 'Tamil Pudhalvan Higher Education Scheme for Boys',
    category: 'Government Welfare',
    amount: '₹1,000 / month Direct Bank Transfer (DBT)',
    eligibility: 'Male students from 6th to 12th standard in Tamil Nadu Government Schools pursuing undergraduate courses.',
    deadline: 'September 2026',
    requiredDocuments: ['Govt School Bonafide Certificate', 'Aadhaar-seeded Bank Account', 'HSC Marksheet'],
    officialSourceUrl: 'https://tnsocialwelfare.tn.gov.in',
    overview: 'Flagship state initiative to boost male higher education enrollment from rural government schools across all districts.',
    coverage: ['₹12,000 annual stipend deposited directly every month']
  },
  {
    id: 'post-matric-sc-st-welfare',
    name: 'Government of Tamil Nadu Post-Matric SC/ST/SCA Welfare Scholarship',
    category: 'Government Welfare',
    amount: '100% Tuition Fee Reimbursement + Maintenance Allowance',
    eligibility: 'SC, ST, and SCA students with annual parental income below ₹2.5 Lakhs.',
    deadline: 'October 31, 2026',
    requiredDocuments: ['Income Certificate (Annual Validity)', 'Community Certificate', 'Bank Passbook', 'College Fee Structure'],
    officialSourceUrl: 'https://escholarship.tn.gov.in',
    overview: 'Ensures no marginalized student drops out of professional engineering courses due to economic constraints.',
    coverage: ['100% Tuition Fee reimbursement to college', 'Hostel maintenance allowance']
  },
  {
    id: 'post-matric-bc-mbc-welfare',
    name: 'BC / MBC / DNC Welfare Higher Education Scholarship',
    category: 'Government Welfare',
    amount: '₹4,000 – ₹10,000 / year + Special Fee Subsidies',
    eligibility: 'BC, BCM, and MBC/DNC students with family income below ₹2.0 Lakhs.',
    deadline: 'November 15, 2026',
    requiredDocuments: ['Income Certificate', 'Community Certificate', '10th & 12th Marksheets', 'College Bonafide'],
    officialSourceUrl: 'https://bcmbcmw.tn.gov.in',
    overview: 'State financial assistance for Backward Class and Most Backward Class students in engineering colleges.',
    coverage: ['Special fees, exam fees, and stationery allowance']
  },
  {
    id: 'shiv-nadar-foundation-scholarship',
    name: 'SSN Shiv Nadar Foundation Merit-cum-Means Scholarship',
    category: 'Institutional Merit',
    amount: '100% Full Tuition Waiver + Free Boarding & Lodging',
    eligibility: 'Top rankers in TNEA counselling and exceptional CBSE/State board scorers admitted to SSN College of Engineering.',
    deadline: 'August 15, 2026',
    requiredDocuments: ['TNEA Allotment Order', '12th Scorecard (>98% PCM)', 'Family Income Proof'],
    officialSourceUrl: 'https://www.ssn.edu.in/scholarships',
    overview: 'Over ₹4.5 Crores distributed annually by the Shiv Nadar Foundation to meritorious students entering SSN Chennai.',
    coverage: ['Full 4-Year Tuition Fees', 'Hostel Room and Mess Charges', 'Laptop & Research Grant']
  },
  {
    id: 'tata-trusts-professional-scholarship',
    name: 'Tata Trusts & Corporate Foundation Engineering Grants',
    category: 'Corporate & Trust',
    amount: '₹30,000 – ₹75,000 / year',
    eligibility: 'Meritorious engineering undergraduates from economically backward families across Tamil Nadu.',
    deadline: 'September 30, 2026',
    requiredDocuments: ['12th Marksheet (>85%)', 'Income Certificate (< ₹3.0 LPA)', 'College Verification Certificate', 'Statement of Purpose'],
    officialSourceUrl: 'https://www.tatatrusts.org',
    overview: 'Philanthropic grant supporting meritorious engineering talent pursuing core and emerging technology fields.',
    coverage: ['Annual college tuition and books reimbursement']
  }
];

export const ScholarshipsPage: React.FC<ScholarshipsPageProps> = ({ onOpenBooking }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');

  const categories = [
    'All Categories',
    '7.5% Govt School',
    'First Graduate',
    'Government Welfare',
    'Institutional Merit',
    'Corporate & Trust'
  ];

  const filteredScholarships = useMemo(() => {
    return SCHOLARSHIPS_DATA.filter((item) => {
      if (selectedCategory !== 'All Categories' && item.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return (
          item.name.toLowerCase().includes(q) ||
          item.eligibility.toLowerCase().includes(q) ||
          item.overview.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-20 pb-24">
      
      {/* Top Banner Header */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-black uppercase tracking-wider mb-3">
              <Award className="w-4 h-4" /> State Welfare & Merit Grants
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              SCHOLARSHIPS & FINANCIAL AID
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Explore Tamil Nadu government fee waivers, First Graduate concessions, 7.5% government school 100% free education, and institutional merit scholarships.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs transition-all shadow-xl shadow-blue-500/30 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-cyan-200" />
              <span>Get Scholarship Eligibility Audit</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        
        {/* Search & Category Filter Strip */}
        <div className="bg-slate-900 p-5 rounded-3xl border-2 border-slate-800 space-y-4 shadow-xl">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-cyan-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search scholarship name, 7.5% quota, First Graduate, or eligibility keywords..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-cyan-500 font-medium"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                    : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Scholarships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredScholarships.map((scholarship) => (
            <div
              key={scholarship.id}
              className="bg-slate-900 rounded-3xl p-6 sm:p-7 border-2 border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-6 shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="px-2.5 py-1 rounded-lg bg-blue-600/20 text-cyan-300 text-[10px] font-black uppercase tracking-wider border border-blue-500/30">
                      {scholarship.category}
                    </span>
                    <h3 className="text-lg font-black text-white mt-2 leading-snug">
                      {scholarship.name}
                    </h3>
                  </div>

                  <span className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 flex-shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </span>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Benefit / Concession Amount:</span>
                  <p className="text-base font-black text-emerald-400">{scholarship.amount}</p>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Eligibility Criteria:</span>
                  <p className="text-xs text-slate-300 leading-relaxed">{scholarship.eligibility}</p>
                </div>

                {/* Covered items */}
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">What is Covered:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px]">
                    {scholarship.coverage.map((c, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Required Documents */}
                <div className="pt-2 border-t border-slate-800/80">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Required Documents:</span>
                  <div className="flex flex-wrap gap-1">
                    {scholarship.requiredDocuments.map((doc, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3 text-xs">
                <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" /> {scholarship.deadline}
                </span>

                <a
                  href={scholarship.officialSourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-colors border border-slate-700"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
