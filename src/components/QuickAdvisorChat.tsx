import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  User, 
  Bot, 
  ArrowRight, 
  PhoneCall,
  Calendar,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { ToastMessage } from '../types';
import { useApp } from '../context/AppContext';
import { 
  sendEnquiryLeadEmail, 
  RECIPIENT_EMAIL, 
  generateWhatsAppChatUrl, 
  ADMISSIONS_HELPLINE_PHONE,
  formatCleanPhone 
} from '../services/emailService';

interface QuickAdvisorChatProps {
  isOpen: boolean;
  onClose?: () => void;
  onToggle?: () => void;
  onOpenBooking: () => void;
  onSuccessToast?: (toast: ToastMessage) => void;
}

export const QuickAdvisorChat: React.FC<QuickAdvisorChatProps> = ({
  isOpen,
  onClose,
  onToggle,
  onOpenBooking,
  onSuccessToast
}) => {
  const { addLead, addToast } = useApp();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Array<{ sender: 'advisor' | 'user'; text: string; action?: string }>>([
    {
      sender: 'advisor',
      text: 'Vanakkam! 👋 Welcome to the NEXTBLOCK Engineering Guidance Hub. Ask about TNEA cutoffs, Coimbatore vs Chennai colleges, 7.5% Govt school free seat quota, or First Graduate fees.'
    }
  ]);
  const [inputVal, setInputVal] = useState('');

  const quickPrompts = [
    'What college can I get for 190+ cutoff in Coimbatore?',
    'How do I claim 7.5% Govt School 100% free seat?',
    'Compare PSG vs CIT Coimbatore placements',
    'Book a free TNEA counselling call'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (userText: string) => {
    if (!userText.trim()) return;

    // Add user message
    const newMsgs = [...messages, { sender: 'user' as const, text: userText }];
    setMessages(newMsgs);
    setInputVal('');

    // Check if user provided a phone number in the message
    const phoneMatch = userText.match(/\b[6-9]\d{9}\b/);
    if (phoneMatch) {
      const detectedPhone = phoneMatch[0];
      
      // Dispatch background lead to nextblock.educations@gmail.com
      sendEnquiryLeadEmail({
        name: 'Chat Visitor',
        phone: detectedPhone,
        message: `Advisor Chat Query: "${userText}"`,
        source: 'Quick Advisor AI Chat'
      }).catch((e) => console.warn('Chat lead email:', e));

      addLead({
        name: 'Chat Lead',
        phone: detectedPhone,
        email: `chat-${detectedPhone}@example.com`,
        city: 'Tamil Nadu',
        district: 'Coimbatore',
        academicLevel: '12th Standard',
        pcmCutoff: 188.0,
        interestedBranch: 'Engineering',
        targetColleges: ['Autonomous', 'Govt Aided'],
        source: 'Website Booking',
        status: 'New',
        priority: 'High',
        nextFollowUp: new Date().toISOString().split('T')[0],
        notes: [`Chat enquiry: ${userText}`]
      });

      addToast({
        id: Date.now().toString(),
        title: 'Callback Registered! 📞',
        message: `Phone ${detectedPhone} received & forwarded to admissions at ${RECIPIENT_EMAIL}.`,
        type: 'success'
      });
    }

    // Simulated Smart Advisor response
    setTimeout(() => {
      let reply = "That's a great question! Our senior TNEA admission counselors can analyze your exact 12th PCM cutoff and build a customized 50+ choice order for Round 1 & 2.";
      let actionType: string | undefined = undefined;

      const lower = userText.toLowerCase();
      if (lower.includes('coimbatore') || lower.includes('psg') || lower.includes('cit') || lower.includes('kct')) {
        reply = "For Coimbatore Tier-1 (PSG Tech, CIT, KCT, SKCET, GCT), cutoffs for CSE/AI-DS close around 188.0 to 199.0/200. Circuit branches like ECE and Robotics close around 182.0 to 194.0. Would you like our senior strategist to review your choice order?";
        actionType = 'booking';
      } else if (lower.includes('7.5') || lower.includes('govt school') || lower.includes('government school')) {
        reply = "Under the Tamil Nadu 7.5% Government School Reservation, students who studied from 6th to 12th in state govt schools receive 100% free tuition, hostel, and mess fees at all top engineering colleges! We assist with complete bonafide certificate verification.";
        actionType = 'whatsapp';
      } else if (lower.includes('scholarship') || lower.includes('first graduate') || lower.includes('fee')) {
        reply = "First Graduate (FG) students receive an immediate annual waiver of ₹25,000 to ₹50,000! Additionally, top colleges like SSN, PSG, and SASTRA offer merit waivers for top cutoffs. Let's schedule your 1-on-1 discovery call.";
        actionType = 'booking';
      } else if (lower.includes('cse') || lower.includes('ai') || lower.includes('branch') || lower.includes('ece')) {
        reply = "Both Core CSE and AI & Data Science have stellar placements in Tamil Nadu (₹8.5 LPA to ₹40 LPA). ECE and VLSI Design are also booming with semiconductor investments in Sriperumbudur and Coimbatore!";
      } else if (lower.includes('book') || lower.includes('call') || lower.includes('counselling')) {
        reply = "Opening your free 1-on-1 TNEA Choice Strategy booking window right now!";
        setTimeout(() => {
          onOpenBooking();
        }, 600);
      } else if (phoneMatch) {
        reply = `Thank you! We've registered your mobile (${phoneMatch[0]}) and forwarded it to our admissions desk at ${RECIPIENT_EMAIL}. Our counselor will call you shortly.`;
      }

      setMessages((prev) => [...prev, { sender: 'advisor' as const, text: reply, action: actionType }]);
    }, 500);
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed bottom-6 right-6 z-30 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60 transition-all hover:scale-105 border-2 border-blue-400/40 cursor-pointer"
          aria-label="Open advisor chat"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-blue-600 animate-ping" />
          </div>
          <span className="text-xs font-black hidden sm:inline">Ask TNEA Advisor</span>
        </button>
      )}

      {/* Chat Drawer Widget */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-40 w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-2xl border-2 border-slate-300 overflow-hidden flex flex-col h-[540px] animate-in slide-in-from-bottom-6 duration-200">
          
          {/* Header */}
          <div className="bg-slate-950 text-white p-4 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
                <Bot className="w-5 h-5" />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-950" />
              </div>
              <div>
                <h4 className="text-sm font-black text-white">NEXTBLOCK TNEA Advisor</h4>
                <p className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                  <span>● Online</span>
                  <span className="text-slate-400">• Forwarding leads to admissions</span>
                </p>
              </div>
            </div>

            <button
              onClick={onClose || onToggle}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close advisor chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`flex gap-2.5 max-w-[88%] ${
                    m.sender === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
                      m.sender === 'advisor'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-950 text-white'
                    }`}
                  >
                    {m.sender === 'advisor' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>

                  <div
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed font-medium ${
                      m.sender === 'advisor'
                        ? 'bg-white border-2 border-slate-200 text-slate-900 shadow-xs'
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>

                {/* Inline Action CTA */}
                {m.action === 'booking' && (
                  <div className="mt-2 ml-9">
                    <button
                      onClick={onOpenBooking}
                      className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-black flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Free Choice Strategy Session →</span>
                    </button>
                  </div>
                )}

                {m.action === 'whatsapp' && (
                  <div className="mt-2 ml-9">
                    <a
                      href={`https://wa.me/919385465849?text=${encodeURIComponent('Vanakkam NEXTBLOCK Admissions! I would like guidance on 7.5% Govt School reservation and TNEA cutoffs.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-black inline-flex items-center gap-1.5 shadow-sm transition-all"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Chat with Advisor on WhatsApp →</span>
                    </a>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="text-[11px] px-3 py-1.5 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-700 border border-slate-300 text-slate-800 font-bold transition-colors shrink-0 cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputVal);
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask a question or enter mobile for callback..."
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-100 border border-slate-300 text-xs font-bold text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/25 transition-all shrink-0 cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
