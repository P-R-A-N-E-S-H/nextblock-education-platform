import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  AlertCircle, 
  Cookie, 
  Lock, 
  CheckCircle2, 
  ArrowLeft 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface LegalPageProps {
  initialTab?: 'privacy' | 'terms' | 'disclaimer' | 'cookie-policy';
}

export const LegalPage: React.FC<LegalPageProps> = ({ initialTab = 'privacy' }) => {
  const { setCurrentPublicView } = useApp();
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'disclaimer' | 'cookie-policy'>(initialTab);

  const legalTabs = [
    { id: 'privacy', label: 'Privacy Policy', icon: ShieldCheck },
    { id: 'terms', label: 'Terms of Service', icon: FileText },
    { id: 'disclaimer', label: 'Admissions Disclaimer', icon: AlertCircle },
    { id: 'cookie-policy', label: 'Cookie Policy', icon: Cookie }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-20 pb-24">
      
      {/* Top Banner Header */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => setCurrentPublicView('home')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </button>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Trust, Legal & Compliance
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Official operational transparency and data privacy frameworks for NEXTBLOCK Education Consultancy.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        
        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-900 p-2 rounded-2xl border border-slate-800">
          {legalTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Box */}
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 border-2 border-slate-800 space-y-6 shadow-2xl text-sm leading-relaxed text-slate-300">
          
          {/* PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" /> Student Data Privacy Policy
              </h2>
              <p className="text-xs text-slate-400">Last updated: August 2026</p>

              <div className="space-y-4">
                <h3 className="text-sm font-black text-white uppercase text-cyan-400">1. Information We Collect</h3>
                <p>
                  NEXTBLOCK collects information provided directly by students and parents during consultation bookings, cutoff simulations, and document uploads. This includes:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li>Full Name, Contact Phone Number, Email Address, and City/District.</li>
                  <li>Academic Scores: 12th Board Marks (Maths, Physics, Chemistry), TNEA PCM Cutoff, Category, and School Type.</li>
                  <li>Academic Documents: Marksheets, First Graduate Certificates, Bonafide Certificates uploaded for verification.</li>
                </ul>

                <h3 className="text-sm font-black text-white uppercase text-cyan-400 pt-2">2. How We Protect Your Data</h3>
                <p>
                  Student contact information is strictly used by assigned NEXTBLOCK senior counsellors for academic advisory sessions. <strong>We do not sell, rent, or distribute student phone numbers or personal records to commercial third-party marketing brokers.</strong>
                </p>

                <h3 className="text-sm font-black text-white uppercase text-cyan-400 pt-2">3. Document Security</h3>
                <p>
                  All certificates and marksheets uploaded to the Student Document Vault are stored in private, encrypted cloud storage accessed exclusively by authorized advisors for TFC choice filling preparation.
                </p>
              </div>
            </div>
          )}

          {/* TERMS OF SERVICE */}
          {activeTab === 'terms' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" /> Terms of Service
              </h2>
              <p className="text-xs text-slate-400">Last updated: August 2026</p>

              <div className="space-y-4">
                <h3 className="text-sm font-black text-white uppercase text-cyan-400">1. Acceptance of Terms</h3>
                <p>
                  By accessing NEXTBLOCK's website, tools, cutoff simulators, and counselling booking systems, you agree to comply with these terms of service and all applicable Tamil Nadu and Indian educational regulations.
                </p>

                <h3 className="text-sm font-black text-white uppercase text-cyan-400 pt-2">2. Advisory Service Scope</h3>
                <p>
                  NEXTBLOCK provides personalized educational counseling, choice filling optimization, and fee transparency analysis. All final seat allotments in Tamil Nadu engineering institutions are processed through the official TNEA Single Window Portal governed by the Directorate of Technical Education (DoTE).
                </p>

                <h3 className="text-sm font-black text-white uppercase text-cyan-400 pt-2">3. User Conduct</h3>
                <p>
                  Users agree to provide accurate academic records and marks. Submitting fraudulent certificates or deceptive scores may lead to immediate cancellation of counseling services.
                </p>
              </div>
            </div>
          )}

          {/* ADMISSIONS DISCLAIMER */}
          {activeTab === 'disclaimer' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-400" /> Admissions Guidance Disclaimer
              </h2>
              <p className="text-xs text-slate-400">Important Advisory Notice</p>

              <div className="space-y-4">
                <div className="bg-amber-500/10 p-4 rounded-2xl border border-amber-500/30 text-amber-200 text-xs leading-relaxed font-medium">
                  <strong>Important Notice:</strong> NEXTBLOCK is an independent professional education consultancy and career guidance platform. We are not an official government body, nor do we sell or guarantee university seats.
                </div>

                <p>
                  1. All cutoff estimates and tier classifications (Dream, Target, Safe) are calculated using publicly verified historical counselling closing ranks published by the Directorate of Technical Education (DoTE), Tamil Nadu.
                </p>

                <p>
                  2. Annual cutoff benchmarks fluctuate dynamically based on statewide student score distributions, reservation quotas, and individual seat matrix modifications by Anna University.
                </p>

                <p>
                  3. Mention of colleges on NEXTBLOCK does not imply formal commercial endorsement or partnership unless explicitly specified.
                </p>
              </div>
            </div>
          )}

          {/* COOKIE POLICY */}
          {activeTab === 'cookie-policy' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <Cookie className="w-5 h-5 text-cyan-400" /> Cookie & Session Storage Policy
              </h2>
              <p className="text-xs text-slate-400">Last updated: August 2026</p>

              <div className="space-y-4">
                <p>
                  NEXTBLOCK utilizes essential cookies and local browser storage to provide personalized platform functionality:
                </p>

                <ul className="list-disc pl-5 space-y-2 text-xs">
                  <li><strong>Saved College Shortlist:</strong> Remembers the colleges you have bookmarked across sessions.</li>
                  <li><strong>Comparison Matrix:</strong> Maintains up to 4 selected colleges in memory for side-by-side review.</li>
                  <li><strong>Authentication Sessions:</strong> Secure tokens maintaining your logged-in portal state.</li>
                  <li><strong>Privacy-Conscious Telemetry:</strong> Aggregated, anonymous metrics tracking tool usage to improve discovery performance.</li>
                </ul>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
