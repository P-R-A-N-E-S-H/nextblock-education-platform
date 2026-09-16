import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Mail, 
  User, 
  GraduationCap, 
  ShieldCheck, 
  Headphones, 
  ArrowRight, 
  Sparkles,
  Eye,
  EyeOff
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authModalMode, 
    setAuthModalMode, 
    loginUser, 
    registerUser,
    addToast
  } = useApp();

  const [selectedRole, setSelectedRole] = useState<'student' | 'counsellor' | 'admin'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authModalMode === 'login') {
      if (!email || !password) {
        addToast({
          id: Date.now().toString(),
          title: 'Missing Fields',
          message: 'Please enter both your email and password.',
          type: 'warning'
        });
        return;
      }
      loginUser(email, selectedRole);
    } else if (authModalMode === 'register') {
      if (!name || !email || !password) {
        addToast({
          id: Date.now().toString(),
          title: 'Missing Fields',
          message: 'Please fill in all registration fields.',
          type: 'warning'
        });
        return;
      }
      registerUser(name, email, selectedRole);
    } else {
      // Forgot password
      addToast({
        id: Date.now().toString(),
        title: 'Password Reset Link Sent ✉️',
        message: `A secure verification code was dispatched to ${email || 'your email'}.`,
        type: 'success'
      });
      setAuthModalMode('login');
    }
  };

  const handleQuickDemoLogin = (role: 'student' | 'counsellor' | 'admin') => {
    if (role === 'student') {
      loginUser('kaviya.sundaram@gmail.com', 'student', 'Kaviya Sundaram');
    } else if (role === 'counsellor') {
      loginUser('shanmugam@nextblock.in', 'counsellor', 'Dr. R. Shanmugam');
    } else {
      loginUser('admin@nextblock.in', 'admin', 'Admin Director');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 max-w-md w-full rounded-3xl border-2 border-slate-800 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[10px] font-black uppercase text-cyan-400 tracking-wider">
                NEXTBLOCK AUTHENTICATION
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {authModalMode === 'login' && 'Sign In to Your Portal'}
              {authModalMode === 'register' && 'Create Your Student Account'}
              {authModalMode === 'forgot' && 'Reset Your Password'}
            </h2>
          </div>

          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Demo Student Access (Instant 1-Click Login) */}
        {authModalMode === 'login' && (
          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-[10px] font-black uppercase text-slate-400 block">
              Instant Demo Access:
            </span>
            <button
              type="button"
              onClick={() => loginUser('kaviya.sundaram@gmail.com', 'student', 'Kaviya Sundaram')}
              className="w-full p-2.5 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-cyan-300 hover:text-white border border-blue-500/30 transition-all font-black flex items-center justify-center gap-2 text-xs shadow-md"
            >
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              <span>1-Click Student Login (Kaviya — PCM 194.5)</span>
            </button>
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {authModalMode === 'register' && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 block">Student's Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Kaviya Sundaram"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-medium focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300 block">Email Address (Student / Parent)</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@gmail.com"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-medium focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {authModalMode !== 'forgot' && (
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-300">Password</label>
                {authModalMode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setAuthModalMode('forgot')}
                    className="text-[11px] text-cyan-400 hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-medium focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-500 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs transition-colors shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 mt-2"
          >
            <Sparkles className="w-4 h-4 text-cyan-300" />
            <span>
              {authModalMode === 'login' && 'Sign In to Student Portal'}
              {authModalMode === 'register' && 'Create Free Student Account'}
              {authModalMode === 'forgot' && 'Send Password Reset Code'}
            </span>
          </button>
        </form>

        {/* Toggle Mode Footer */}
        <div className="pt-2 border-t border-slate-800 text-center text-xs text-slate-400">
          {authModalMode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button
                onClick={() => setAuthModalMode('register')}
                className="text-cyan-400 font-bold hover:underline"
              >
                Create Account
              </button>
            </p>
          ) : (
            <p>
              Already registered?{' '}
              <button
                onClick={() => setAuthModalMode('login')}
                className="text-cyan-400 font-bold hover:underline"
              >
                Sign In
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
};
