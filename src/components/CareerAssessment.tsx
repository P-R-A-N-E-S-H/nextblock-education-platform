import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  X, 
  BrainCircuit, 
  TrendingUp, 
  Building2, 
  GraduationCap, 
  DollarSign,
  RotateCcw,
  CalendarCheck
} from 'lucide-react';
import { careerQuizQuestions, careerQuizResults } from '../data/careerQuiz';
import { triggerConfetti } from '../utils/helpers';
import { QuizResult } from '../types';

interface CareerAssessmentProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const CareerAssessment: React.FC<CareerAssessmentProps> = ({
  isOpen,
  onClose,
  onOpenBooking
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);

  const handleSelectOption = (fieldMatch: string) => {
    const updatedAnswers = [...answers, fieldMatch];
    setAnswers(updatedAnswers);

    if (currentStep < careerQuizQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate dominant answer
      const counts: Record<string, number> = {};
      updatedAnswers.forEach((val) => {
        counts[val] = (counts[val] || 0) + 1;
      });

      let topFieldKey = 'tech';
      let maxCount = 0;
      Object.entries(counts).forEach(([key, count]) => {
        if (count > maxCount) {
          maxCount = count;
          topFieldKey = key;
        }
      });

      const matchedResult = careerQuizResults[topFieldKey] || careerQuizResults.tech;
      setResult(matchedResult);
      triggerConfetti();
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <>
      {/* Landing Section Block */}
      <section className="py-20 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 text-white relative overflow-hidden border-b border-slate-800">
        {/* Background Geometric Blocks & Glow */}
        <div className="absolute inset-0 bg-dark-grid opacity-30 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs font-extrabold uppercase tracking-wider mb-6">
                <BrainCircuit className="w-4 h-4 text-cyan-400" />
                <span>AI Engineering Branch Diagnostic</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6">
                Not Sure Which <br />
                <span className="text-gradient-cyan">Engineering Branch to Choose?</span>
              </h2>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl mb-8 font-normal">
                Take our quick 2-minute diagnostic to discover which engineering disciplines (CSE, AI/DS, ECE, Robotics, VLSI, Biotech) and premier Tamil Nadu colleges best match your analytical aptitudes.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    handleReset();
                    const modalBtn = document.getElementById('trigger-quiz-modal');
                    if (modalBtn) modalBtn.click();
                  }}
                  id="start-assessment-btn"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-base font-extrabold text-white bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/30 hover:shadow-blue-500/50 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Sparkles className="w-5 h-5 text-cyan-300" />
                  <span>Take Free Assessment →</span>
                </button>
              </div>

              {/* Mini Metrics */}
              <div className="mt-8 flex items-center gap-6 text-xs text-slate-300 font-semibold">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 4 Targeted Questions
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Top College Recommendations
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Free
                </span>
              </div>
            </div>

            {/* Right Interactive Mock Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-2 border-slate-700 shadow-2xl relative">
                {/* Floating Badge */}
                <div className="flex items-center justify-between border-b border-slate-700 pb-4 mb-5">
                  <span className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">
                    Interactive Diagnostic Preview
                  </span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    Step 1 of 4
                  </span>
                </div>

                <h4 className="text-base font-extrabold text-white mb-4">
                  "What kind of challenges energize you most?"
                </h4>

                <div className="space-y-2.5 mb-6">
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">A</span>
                    <span>Building software algorithms, AI models & apps</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-700 text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0">B</span>
                    <span>Designing physical machines, electric mobility & robotics</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    handleReset();
                    const modalBtn = document.getElementById('trigger-quiz-modal');
                    if (modalBtn) modalBtn.click();
                  }}
                  className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white text-xs font-extrabold border border-slate-600 transition-all flex items-center justify-center gap-2"
                >
                  <span>Launch Assessment Modal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* QUIZ MODAL WIZARD */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-white relative shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close quiz modal"
            >
              <X className="w-5 h-5" />
            </button>

            {!result ? (
              <div>
                {/* Quiz Header & Progress Bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-2">
                    <span className="flex items-center gap-1.5 text-cyan-400">
                      <BrainCircuit className="w-4 h-4" /> Career Aptitude Diagnostic
                    </span>
                    <span>
                      Question {currentStep + 1} of {careerQuizQuestions.length}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300"
                      style={{
                        width: `${((currentStep + 1) / careerQuizQuestions.length) * 100}%`
                      }}
                    />
                  </div>
                </div>

                {/* Question Info */}
                <div className="mb-8">
                  <h3 className="text-2xl font-black text-white mb-1.5">
                    {careerQuizQuestions[currentStep].question}
                  </h3>
                  <p className="text-xs text-slate-300 font-medium">
                    {careerQuizQuestions[currentStep].subtitle}
                  </p>
                </div>

                {/* Question Options */}
                <div className="space-y-3 mb-8">
                  {careerQuizQuestions[currentStep].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(opt.fieldMatch)}
                      className="w-full text-left p-4 rounded-2xl bg-slate-800/90 hover:bg-blue-600/30 border-2 border-slate-700 hover:border-blue-500 transition-all duration-200 group flex items-start gap-4"
                    >
                      <div className="w-8 h-8 rounded-xl bg-slate-700 text-cyan-300 flex items-center justify-center font-extrabold text-xs shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        {String.fromCharCode(65 + idx)}
                      </div>

                      <div className="flex-1">
                        <p className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {opt.label}
                        </p>
                        <p className="text-xs text-slate-300 mt-0.5 leading-relaxed font-normal">
                          {opt.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Back button */}
                {currentStep > 0 && (
                  <button
                    onClick={() => {
                      setCurrentStep(currentStep - 1);
                      setAnswers(answers.slice(0, -1));
                    }}
                    className="text-xs font-bold text-slate-400 hover:text-white"
                  >
                    ← Previous Question
                  </button>
                )}
              </div>
            ) : (
              /* Quiz Result Display */
              <div className="animate-in fade-in zoom-in-95 duration-300">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-cyan-500/25">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  
                  <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-300 px-3.5 py-1 rounded-full bg-cyan-950 border border-cyan-800">
                    {result.matchScore}% Compatibility Match
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-black text-white mt-3">
                    {result.topField}
                  </h3>
                </div>

                <p className="text-sm text-slate-200 leading-relaxed mb-6 bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
                  {result.description}
                </p>

                {/* Results Grid Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {/* Recommended Degrees */}
                  <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-cyan-300 mb-2.5 flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4" /> Top Degree Pathways
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-200 font-medium">
                      {result.recommendedDegrees.map((deg, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                          <span>{deg}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Recommended Colleges & Salary */}
                  <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 mb-2.5 flex items-center gap-1.5">
                      <Building2 className="w-4 h-4" /> Recommended Colleges & Salary
                    </h4>
                    <p className="text-lg font-black text-emerald-400 mb-2">{result.avgStartingSalary}</p>
                    <ul className="space-y-1 text-xs text-slate-300 font-medium">
                      {result.recommendedColleges.slice(0, 3).map((col, i) => (
                        <li key={i} className="truncate">• {col}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenBooking();
                    }}
                    className="w-full sm:flex-1 py-3.5 px-6 rounded-xl font-extrabold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 text-sm transition-all"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    <span>Book TNEA Counselling for this Path</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto px-4 py-3.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Quiz</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
};
