import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRole, 
  Lead, 
  StudentApplication, 
  StudentDocument, 
  CounsellingSession, 
  Counsellor, 
  TNCollege, 
  ScholarshipItem, 
  ToastMessage,
  NotificationItem,
  UserAuth,
  BlogArticle,
  AnalyticsEvent
} from '../types';
import { allTNCollegesData } from '../data/indexTNColleges';
import { resourcesData } from '../data/resources';
import { sendEnquiryLeadEmail } from '../services/emailService';

interface AppContextType {
  // Navigation & Role State
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  currentPublicView: string;
  setCurrentPublicView: (view: string) => void;
  
  // Selected College for Profile view
  selectedCollegeSlug: string | null;
  setSelectedCollegeSlug: (slug: string | null) => void;
  viewCollegeDetail: (slug: string) => void;

  // Comparison State (up to 4 colleges)
  comparisonCollegeIds: string[];
  toggleComparison: (collegeId: string) => void;
  addToComparison: (collegeId: string) => void;
  removeFromComparison: (collegeId: string) => void;
  clearComparison: () => void;

  // Local City Hub State
  selectedCity: string;
  setSelectedCity: (city: string) => void;

  // Student Profile State
  studentProfile: {
    id: string;
    name: string;
    email: string;
    phone: string;
    district: string;
    pcmCutoff: number;
    maths: number;
    physics: number;
    chemistry: number;
    targetBranch: string;
    category: string;
    isFirstGraduate: boolean;
    isGovtSchool: boolean;
  };
  setStudentProfile: React.Dispatch<React.SetStateAction<any>>;

  // User Auth Simulation
  currentUser: UserAuth | null;
  loginUser: (email: string, role: 'student' | 'counsellor' | 'admin', name?: string) => void;
  logoutUser: () => void;
  registerUser: (name: string, email: string, role: 'student' | 'counsellor' | 'admin') => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'register' | 'forgot';
  setAuthModalMode: (mode: 'login' | 'register' | 'forgot') => void;

  // In-App Notifications
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  addNotification: (notif: Omit<NotificationItem, 'id' | 'time' | 'read'>) => void;
  isNotificationDrawerOpen: boolean;
  setIsNotificationDrawerOpen: (open: boolean) => void;

  // CRM Leads
  leads: Lead[];
  addLead: (lead: Omit<Lead, 'id' | 'createdDate' | 'lastContacted'>) => void;
  updateLeadStatus: (leadId: string, newStatus: Lead['status']) => void;
  assignCounsellorToLead: (leadId: string, counsellorId: string, counsellorName: string) => void;

  // Student Applications
  applications: StudentApplication[];
  addApplication: (app: Omit<StudentApplication, 'id' | 'updatedAt'>) => void;
  updateApplicationStatus: (appId: string, status: StudentApplication['status']) => void;

  // Documents Vault
  documents: StudentDocument[];
  uploadDocument: (doc: Omit<StudentDocument, 'id' | 'uploadDate' | 'status'>) => void;
  verifyDocument: (docId: string, status: StudentDocument['status'], notes?: string) => void;

  // Counselling Sessions
  sessions: CounsellingSession[];
  scheduleSession: (session: Omit<CounsellingSession, 'id' | 'status'>) => void;
  updateSessionStatus: (sessionId: string, status: CounsellingSession['status'], notes?: string) => void;

  // Saved Colleges Shortlist
  savedCollegeIds: string[];
  toggleSaveCollege: (collegeId: string) => void;

  // Master Colleges Directory (CMS Editable)
  colleges: TNCollege[];
  updateCollegeData: (college: TNCollege) => void;
  addCollegeData: (college: TNCollege) => void;

  // Counsellors
  counsellors: Counsellor[];

  // Blog / Resources Articles
  articles: BlogArticle[];
  addArticle: (article: BlogArticle) => void;
  updateArticle: (article: BlogArticle) => void;
  deleteArticle: (id: string) => void;

  // Analytics
  trackEvent: (eventName: string, payload?: Record<string, any>) => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (toast: ToastMessage) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Role & View State
  const [currentRole, setCurrentRole] = useState<UserRole>('public');
  const [currentPublicView, setCurrentPublicView] = useState<string>('home');
  const [selectedCollegeSlug, setSelectedCollegeSlug] = useState<string | null>(null);
  const [comparisonCollegeIds, setComparisonCollegeIds] = useState<string[]>(['psg-college-of-technology', 'ssn-college-chennai']);
  const [selectedCity, setSelectedCity] = useState<string>('Coimbatore');

  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [currentUser, setCurrentUser] = useState<UserAuth | null>({
    id: 'USR-8842',
    name: 'Kaviya Sundaram',
    email: 'kaviya.sundaram@gmail.com',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  });

  // Notification Drawer State
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'NOTIF-1',
      title: 'Counselling Session Scheduled 📅',
      message: 'Your TNEA strategy consultation with Dr. R. Shanmugam is confirmed for May 22 at 4:00 PM.',
      time: '10 mins ago',
      read: false,
      type: 'session',
      actionView: 'sessions'
    },
    {
      id: 'NOTIF-2',
      title: 'TNEA Rank List Updates Released 🚀',
      message: 'Verified cutoff analysis for Tier-1 engineering colleges in Tamil Nadu is now live.',
      time: '2 hours ago',
      read: false,
      type: 'alert',
      actionView: 'tnea-guidance'
    },
    {
      id: 'NOTIF-3',
      title: 'Document Verified: 12th Marksheet ✓',
      message: 'Your Higher Secondary Marksheet was verified by Senior Advisor Dr. Shanmugam.',
      time: '1 day ago',
      read: true,
      type: 'document',
      actionView: 'documents'
    }
  ]);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const addToast = (toast: ToastMessage) => {
    setToasts((prev) => [...prev, toast]);
    setTimeout(() => removeToast(toast.id), 4500);
  };
  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Student Profile
  const [studentProfile, setStudentProfile] = useState({
    id: 'STU-2026-8842',
    name: 'Kaviya Sundaram',
    email: 'kaviya.sundaram@gmail.com',
    phone: '+91 94420 89123',
    district: 'Coimbatore',
    pcmCutoff: 194.50,
    maths: 98,
    physics: 96,
    chemistry: 95,
    targetBranch: 'Computer Science (CSE)',
    category: 'BC (Backward Class)',
    isFirstGraduate: true,
    isGovtSchool: false
  });

  // Master Colleges State (Verified TN Institutions only)
  const [colleges, setColleges] = useState<TNCollege[]>(() => {
    return allTNCollegesData.map(c => ({
      ...c,
      verificationStatus: 'VERIFIED'
    }));
  });

  // Saved Colleges Shortlist
  const [savedCollegeIds, setSavedCollegeIds] = useState<string[]>([
    'psg-college-of-technology',
    'ssn-college-chennai',
    'coimbatore-institute-of-technology'
  ]);

  const toggleSaveCollege = (collegeId: string) => {
    setSavedCollegeIds((prev) => {
      const exists = prev.includes(collegeId);
      if (exists) {
        addToast({
          id: Date.now().toString(),
          title: 'Removed from Saved Colleges',
          message: 'College removed from your shortlist.',
          type: 'info'
        });
        trackEvent('college_unsave', { collegeId });
        return prev.filter((id) => id !== collegeId);
      } else {
        addToast({
          id: Date.now().toString(),
          title: 'College Saved to Shortlist ⭐',
          message: 'Added to your Student Portal choice list.',
          type: 'success'
        });
        trackEvent('college_save', { collegeId });
        return [...prev, collegeId];
      }
    });
  };

  // Comparison Management
  const toggleComparison = (collegeId: string) => {
    if (comparisonCollegeIds.includes(collegeId)) {
      removeFromComparison(collegeId);
    } else {
      addToComparison(collegeId);
    }
  };

  const addToComparison = (collegeId: string) => {
    if (comparisonCollegeIds.includes(collegeId)) {
      addToast({
        id: Date.now().toString(),
        title: 'Already in Comparison',
        message: 'This college is already in your comparison matrix.',
        type: 'info'
      });
      return;
    }
    if (comparisonCollegeIds.length >= 4) {
      addToast({
        id: Date.now().toString(),
        title: 'Comparison Limit Reached (4 Max)',
        message: 'Please remove a college before adding another.',
        type: 'warning'
      });
      return;
    }
    setComparisonCollegeIds(prev => [...prev, collegeId]);
    trackEvent('college_compare_added', { collegeId });
    addToast({
      id: Date.now().toString(),
      title: 'Added to Comparison ⚖️',
      message: `${comparisonCollegeIds.length + 1} of 4 colleges selected for side-by-side review.`,
      type: 'success'
    });
  };

  const removeFromComparison = (collegeId: string) => {
    setComparisonCollegeIds(prev => prev.filter(id => id !== collegeId));
    addToast({
      id: Date.now().toString(),
      title: 'Removed from Comparison',
      message: 'College removed from comparison matrix.',
      type: 'info'
    });
  };

  const clearComparison = () => {
    setComparisonCollegeIds([]);
  };

  const viewCollegeDetail = (slug: string) => {
    setSelectedCollegeSlug(slug);
    setCurrentPublicView('college-detail');
    trackEvent('college_view', { slug });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Notifications Management
  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    addToast({
      id: Date.now().toString(),
      title: 'All Notifications Read',
      message: 'Your notification center is all caught up.',
      type: 'info'
    });
  };

  const addNotification = (notif: Omit<NotificationItem, 'id' | 'time' | 'read'>) => {
    const newNotif: NotificationItem = {
      ...notif,
      id: `NOTIF-${Date.now()}`,
      time: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Auth Simulation
  const loginUser = (email: string, role: 'student' | 'counsellor' | 'admin', name?: string) => {
    const user: UserAuth = {
      id: `USR-${Math.floor(1000 + Math.random() * 9000)}`,
      name: name || (role === 'admin' ? 'Admin Director' : role === 'counsellor' ? 'Dr. R. Shanmugam' : 'Kaviya Sundaram'),
      email,
      role,
      token: `jwt_${Date.now()}`
    };
    setCurrentUser(user);
    setCurrentRole(role);
    setIsAuthModalOpen(false);
    addToast({
      id: Date.now().toString(),
      title: `Logged in as ${role.toUpperCase()} 🔐`,
      message: `Welcome back, ${user.name}!`,
      type: 'success'
    });
    trackEvent('user_login', { role, email });
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setCurrentRole('public');
    setCurrentPublicView('home');
    addToast({
      id: Date.now().toString(),
      title: 'Logged Out',
      message: 'You have been securely signed out.',
      type: 'info'
    });
  };

  const registerUser = (name: string, email: string, role: 'student' | 'counsellor' | 'admin') => {
    const user: UserAuth = {
      id: `USR-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      email,
      role,
      token: `jwt_${Date.now()}`
    };
    setCurrentUser(user);
    setCurrentRole(role);
    setIsAuthModalOpen(false);
    addToast({
      id: Date.now().toString(),
      title: 'Account Created Successfully 🎉',
      message: `Welcome to NEXTBLOCK, ${name}! Your journey begins now.`,
      type: 'success'
    });
    trackEvent('user_registered', { role, email });
  };

  // Counsellors Directory
  const [counsellors] = useState<Counsellor[]>([
    {
      id: 'CNS-01',
      name: 'Dr. R. Shanmugam',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: 'Director of TNEA Choice Strategy',
      specialization: 'Anna University, PSG Tech & Autonomous Allotments',
      activeLeadsCount: 14,
      totalConversions: 320,
      rating: 4.95,
      phone: '+91 94420 89001',
      email: 'shanmugam@nextblock.in'
    },
    {
      id: 'CNS-02',
      name: 'Mrs. Anitha Balaji',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      role: 'Senior Admission Advisor (Chennai Hub)',
      specialization: 'SSN, REC, CIT Chennai & Shiv Nadar Scholarships',
      activeLeadsCount: 12,
      totalConversions: 285,
      rating: 4.92,
      phone: '+91 94420 89002',
      email: 'anitha@nextblock.in'
    },
    {
      id: 'CNS-03',
      name: 'Mr. Vigneshwaran K.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      role: 'Government School & Welfare Aid Specialist',
      specialization: '7.5% Govt School Scheme, FG Concessions, TFC Verification',
      activeLeadsCount: 18,
      totalConversions: 410,
      rating: 4.98,
      phone: '+91 94420 89003',
      email: 'vigneshwaran@nextblock.in'
    },
    {
      id: 'CNS-04',
      name: 'Ms. Sneha Raghavan',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      role: 'Study Abroad & Global Degree Lead',
      specialization: 'UK, Germany, USA & Deemed University Entrances',
      activeLeadsCount: 9,
      totalConversions: 175,
      rating: 4.89,
      phone: '+91 94420 89004',
      email: 'sneha@nextblock.in'
    }
  ]);

  // CRM Leads
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: 'LD-9021',
      name: 'Kaviya Sundaram',
      phone: '+91 94420 89123',
      email: 'kaviya.sundaram@gmail.com',
      city: 'Pollachi',
      district: 'Coimbatore',
      academicLevel: '12th State Board (Passed)',
      pcmCutoff: 194.50,
      interestedBranch: 'Computer Science (CSE)',
      targetColleges: ['PSG Tech', 'SSN Chennai', 'CIT Coimbatore'],
      source: 'Cutoff Simulator',
      assignedCounsellorId: 'CNS-01',
      assignedCounsellorName: 'Dr. R. Shanmugam',
      status: 'Counselling Scheduled',
      priority: 'High',
      createdDate: '2026-05-18',
      lastContacted: '2026-05-19',
      nextFollowUp: '2026-05-22',
      notes: ['Prefers Coimbatore autonomous colleges.', 'Eligible for First Graduate fee waiver.']
    },
    {
      id: 'LD-9022',
      name: 'M. Senthil Nathan',
      phone: '+91 98421 77341',
      email: 'senthil.nathan@gmail.com',
      city: 'Paramakudi',
      district: 'Ramanathapuram',
      academicLevel: '12th Govt HSS (Tamil Medium)',
      pcmCutoff: 192.25,
      interestedBranch: 'AI & Data Science',
      targetColleges: ['CEG Anna Univ', 'PSG Tech', 'CIT'],
      source: 'Website Booking',
      assignedCounsellorId: 'CNS-03',
      assignedCounsellorName: 'Mr. Vigneshwaran K.',
      status: 'Shortlisted',
      priority: 'High',
      createdDate: '2026-05-17',
      lastContacted: '2026-05-19',
      nextFollowUp: '2026-05-21',
      notes: ['7.5% Govt School quota Rank #38.', 'Bonafide certificate verified. Choice order locked.']
    },
    {
      id: 'LD-9023',
      name: 'Ashwin Kumar R.',
      phone: '+91 97900 11422',
      email: 'ashwin.madurai@gmail.com',
      city: 'Madurai',
      district: 'Madurai',
      academicLevel: '12th CBSE',
      pcmCutoff: 195.00,
      interestedBranch: 'Robotics & Automation',
      targetColleges: ['PSG Tech', 'TCE Madurai', 'KCT'],
      source: 'Direct Enquiry',
      assignedCounsellorId: 'CNS-01',
      assignedCounsellorName: 'Dr. R. Shanmugam',
      status: 'Application Started',
      priority: 'High',
      createdDate: '2026-05-15',
      lastContacted: '2026-05-18',
      nextFollowUp: '2026-05-20',
      notes: ['TNEA Round 1 choice list submitted.', 'Watching upward movement for PSG Robotics.']
    },
    {
      id: 'LD-9024',
      name: 'Divya Bharathi M.',
      phone: '+91 94432 55901',
      email: 'divya.erode@gmail.com',
      city: 'Erode',
      district: 'Erode',
      academicLevel: '12th State Board',
      pcmCutoff: 194.50,
      interestedBranch: 'Electronics & Communication (ECE)',
      targetColleges: ['SSN Chennai', 'PSG Tech', 'GCT'],
      source: 'Website Booking',
      assignedCounsellorId: 'CNS-02',
      assignedCounsellorName: 'Mrs. Anitha Balaji',
      status: 'Converted',
      priority: 'Medium',
      createdDate: '2026-05-10',
      lastContacted: '2026-05-16',
      nextFollowUp: '2026-05-25',
      notes: ['Allotted SSN ECE with Shiv Nadar Scholar waiver.']
    },
    {
      id: 'LD-9025',
      name: 'Harish Varma K.',
      phone: '+91 98940 33219',
      email: 'harish.varma@gmail.com',
      city: 'Tirunelveli',
      district: 'Tirunelveli',
      academicLevel: '12th State Board',
      pcmCutoff: 187.25,
      interestedBranch: 'Information Technology (IT)',
      targetColleges: ['SKCET Coimbatore', 'Sri Eshwar', 'Bannari Amman'],
      source: 'Cutoff Simulator',
      assignedCounsellorId: 'CNS-01',
      assignedCounsellorName: 'Dr. R. Shanmugam',
      status: 'New',
      priority: 'Medium',
      createdDate: '2026-05-18',
      lastContacted: '2026-05-18',
      nextFollowUp: '2026-05-20',
      notes: ['Exploring Coimbatore Tier-1 autonomous options.']
    }
  ]);

  const addLead = (leadData: Omit<Lead, 'id' | 'createdDate' | 'lastContacted'>) => {
    const newLead: Lead = {
      ...leadData,
      id: `LD-${Math.floor(9000 + Math.random() * 999)}`,
      createdDate: new Date().toISOString().split('T')[0],
      lastContacted: new Date().toISOString().split('T')[0]
    };
    setLeads((prev) => [newLead, ...prev]);
    trackEvent('lead_created', { leadId: newLead.id, branch: newLead.interestedBranch, source: newLead.source });
    
    // Automatically forward lead details to nextblock.educations@gmail.com
    sendEnquiryLeadEmail({
      name: newLead.name,
      phone: newLead.phone,
      email: newLead.email,
      city: newLead.city,
      district: newLead.district,
      academicLevel: newLead.academicLevel,
      pcmCutoff: newLead.pcmCutoff,
      interestedBranch: newLead.interestedBranch,
      message: (newLead.notes && newLead.notes.length > 0) ? newLead.notes.join(' | ') : 'Website Lead Submission',
      source: newLead.source,
      leadId: newLead.id
    }).catch((err) => console.warn('Lead email background notice:', err));

    addToast({
      id: Date.now().toString(),
      title: 'Consultation Request Received! 🎯',
      message: `Lead #${newLead.id} created & routed to nextblock.educations@gmail.com. Advisor will reach out shortly.`,
      type: 'success'
    });
  };

  const updateLeadStatus = (leadId: string, newStatus: Lead['status']) => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === leadId
          ? { ...lead, status: newStatus, lastContacted: new Date().toISOString().split('T')[0] }
          : lead
      )
    );
    addToast({
      id: Date.now().toString(),
      title: 'Lead Status Updated',
      message: `Lead #${leadId} moved to ${newStatus}.`,
      type: 'info'
    });
  };

  const assignCounsellorToLead = (leadId: string, counsellorId: string, counsellorName: string) => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === leadId
          ? { ...lead, assignedCounsellorId: counsellorId, assignedCounsellorName: counsellorName }
          : lead
      )
    );
    addToast({
      id: Date.now().toString(),
      title: 'Advisor Assigned',
      message: `Assigned ${counsellorName} to lead #${leadId}.`,
      type: 'success'
    });
  };

  // Student Applications
  const [applications, setApplications] = useState<StudentApplication[]>([
    {
      id: 'APP-8801',
      studentId: 'STU-2026-8842',
      studentName: 'Kaviya Sundaram',
      collegeId: 'psg-college-of-technology',
      collegeName: 'PSG College of Technology, Coimbatore',
      tneaCode: '2006',
      branch: 'B.Tech Artificial Intelligence & Data Science',
      applicationNumber: 'TNEA-2026-TN-89421',
      admissionRoute: 'TNEA Single Window',
      status: 'Submitted',
      submissionDeadline: '2026-06-15',
      submittedDate: '2026-05-18',
      assignedCounsellor: 'Dr. R. Shanmugam',
      nextAction: 'TFC Certificate Verification',
      updatedAt: '2026-05-18'
    },
    {
      id: 'APP-8802',
      studentId: 'STU-2026-8842',
      studentName: 'Kaviya Sundaram',
      collegeId: 'ssn-college-chennai',
      collegeName: 'SSN College of Engineering, Chennai',
      tneaCode: '1315',
      branch: 'B.E Computer Science and Engineering',
      applicationNumber: 'SSN-ADM-2026-0419',
      admissionRoute: 'Management Quota',
      status: 'In Progress',
      submissionDeadline: '2026-05-30',
      assignedCounsellor: 'Mrs. Anitha Balaji',
      nextAction: 'Upload 12th Verified Marksheet',
      updatedAt: '2026-05-17'
    },
    {
      id: 'APP-8803',
      studentId: 'STU-2026-8842',
      studentName: 'Kaviya Sundaram',
      collegeId: 'coimbatore-institute-of-technology',
      collegeName: 'Coimbatore Institute of Technology (CIT)',
      tneaCode: '2007',
      branch: 'B.E Electronics and Communication (ECE)',
      applicationNumber: 'TNEA-2026-TN-89422',
      admissionRoute: 'TNEA Single Window',
      status: 'Documents Pending',
      submissionDeadline: '2026-06-15',
      assignedCounsellor: 'Dr. R. Shanmugam',
      nextAction: 'Submit Nativity Certificate',
      updatedAt: '2026-05-16'
    }
  ]);

  const addApplication = (appData: Omit<StudentApplication, 'id' | 'updatedAt'>) => {
    const newApp: StudentApplication = {
      ...appData,
      id: `APP-${Math.floor(8800 + Math.random() * 999)}`,
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setApplications((prev) => [newApp, ...prev]);
    trackEvent('application_submitted', { appId: newApp.id, collegeName: newApp.collegeName, branch: newApp.branch });
    addToast({
      id: Date.now().toString(),
      title: 'Application Created! 📝',
      message: `Started application for ${newApp.collegeName}. Tracking under your Student Portal.`,
      type: 'success'
    });
  };

  const updateApplicationStatus = (appId: string, status: StudentApplication['status']) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === appId
          ? { ...app, status, updatedAt: new Date().toISOString().split('T')[0] }
          : app
      )
    );
    addToast({
      id: Date.now().toString(),
      title: 'Application Status Updated',
      message: `Application #${appId} is now ${status}.`,
      type: 'info'
    });
  };

  // Documents Vault
  const [documents, setDocuments] = useState<StudentDocument[]>([
    {
      id: 'DOC-101',
      studentId: 'STU-2026-8842',
      documentType: '10th Marksheet',
      fileName: '10th_Marksheet_Kaviya_Sundaram.pdf',
      fileSize: '1.2 MB',
      uploadDate: '2026-05-12',
      status: 'Verified',
      verifiedBy: 'Dr. R. Shanmugam',
      verificationNotes: 'Marks verified: 488/500 (97.6%). Approved.'
    },
    {
      id: 'DOC-102',
      studentId: 'STU-2026-8842',
      documentType: '12th Marksheet',
      fileName: 'HSC_12th_Marksheet_2026.pdf',
      fileSize: '1.4 MB',
      uploadDate: '2026-05-15',
      status: 'Verified',
      verifiedBy: 'Dr. R. Shanmugam',
      verificationNotes: 'PCM Cutoff 194.50 verified with official HSE portal.'
    },
    {
      id: 'DOC-103',
      studentId: 'STU-2026-8842',
      documentType: 'Community Certificate',
      fileName: 'BC_Community_Certificate_Govt_TN.pdf',
      fileSize: '950 KB',
      uploadDate: '2026-05-15',
      status: 'Verified',
      verifiedBy: 'Dr. R. Shanmugam',
      verificationNotes: 'Tahsidhar verified e-certificate.'
    },
    {
      id: 'DOC-104',
      studentId: 'STU-2026-8842',
      documentType: 'First Graduate Certificate',
      fileName: 'First_Graduate_Concession_Certificate.pdf',
      fileSize: '1.1 MB',
      uploadDate: '2026-05-17',
      status: 'Under Review',
      verificationNotes: 'Checking family joint declaration with Village Administrative Officer.'
    },
    {
      id: 'DOC-105',
      studentId: 'STU-2026-8842',
      documentType: 'Transfer Certificate (TC)',
      fileName: 'TC_Kongu_Vellalar_HSS.pdf',
      fileSize: '750 KB',
      uploadDate: '2026-05-18',
      status: 'Uploaded'
    }
  ]);

  const uploadDocument = (doc: Omit<StudentDocument, 'id' | 'uploadDate' | 'status'>) => {
    const newDoc: StudentDocument = {
      ...doc,
      id: `DOC-${Math.floor(100 + Math.random() * 900)}`,
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'Under Review'
    };
    setDocuments((prev) => [newDoc, ...prev]);
    trackEvent('document_uploaded', { docType: newDoc.documentType, fileName: newDoc.fileName });
    addToast({
      id: Date.now().toString(),
      title: 'Document Uploaded Securely 🔒',
      message: `${newDoc.documentType} is now under verification review.`,
      type: 'success'
    });
  };

  const verifyDocument = (docId: string, status: StudentDocument['status'], notes?: string) => {
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === docId
          ? {
              ...d,
              status,
              verifiedBy: 'Dr. R. Shanmugam',
              verificationNotes: notes || (status === 'Verified' ? 'Document verified and approved for TNEA submission.' : 'Document needs re-upload.')
            }
          : d
      )
    );
    addToast({
      id: Date.now().toString(),
      title: status === 'Verified' ? 'Document Verified ✓' : 'Document Status Updated',
      message: `Document status set to ${status}.`,
      type: status === 'Verified' ? 'success' : 'warning'
    });
  };

  // Counselling Sessions
  const [sessions, setSessions] = useState<CounsellingSession[]>([
    {
      id: 'SES-501',
      studentId: 'STU-2026-8842',
      studentName: 'Kaviya Sundaram',
      studentPhone: '+91 94420 89123',
      counsellorId: 'CNS-01',
      counsellorName: 'Dr. R. Shanmugam',
      sessionType: 'TNEA Choice Filling Strategy',
      mode: 'Google Meet (Video)',
      date: '2026-05-22',
      timeSlot: '4:00 PM – 5:00 PM',
      meetingLink: 'https://meet.google.com/nxt-blck-tnea',
      status: 'Scheduled',
      counsellorNotes: 'Focus on PSG Tech CSE vs SSN AI-DS round 1 priority sequencing.',
      actionItems: ['Prepare 50+ college order', 'Review First Graduate subsidy']
    },
    {
      id: 'SES-502',
      studentId: 'STU-2026-8842',
      studentName: 'Kaviya Sundaram',
      studentPhone: '+91 94420 89123',
      counsellorId: 'CNS-01',
      counsellorName: 'Dr. R. Shanmugam',
      sessionType: 'College Cutoff Diagnostic',
      mode: 'Phone Call',
      date: '2026-05-16',
      timeSlot: '11:00 AM – 11:30 AM',
      status: 'Completed',
      counsellorNotes: 'Cutoff 194.50 verified. Top options: PSG, SSN, CIT, KCT.',
      actionItems: ['Upload 12th marksheet', 'Obtain FG certificate']
    }
  ]);

  const scheduleSession = (session: Omit<CounsellingSession, 'id' | 'status'>) => {
    const newSession: CounsellingSession = {
      ...session,
      id: `SES-${Math.floor(100 + Math.random() * 900)}`,
      status: 'Scheduled',
      meetingLink: session.mode.includes('Google Meet') || session.mode.includes('Video') 
        ? 'https://meet.google.com/nxt-blck-live' 
        : undefined
    };
    setSessions((prev) => [newSession, ...prev]);
    trackEvent('counselling_submitted', { sessionType: newSession.sessionType, date: newSession.date });
    addToast({
      id: Date.now().toString(),
      title: 'Counselling Session Confirmed! 📅',
      message: `Scheduled with ${newSession.counsellorName} for ${newSession.date} at ${newSession.timeSlot}.`,
      type: 'success'
    });
  };

  const updateSessionStatus = (sessionId: string, status: CounsellingSession['status'], notes?: string) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, status, counsellorNotes: notes || s.counsellorNotes } : s))
    );
  };

  // CMS Master Colleges
  const updateCollegeData = (updatedCollege: TNCollege) => {
    setColleges((prev) => prev.map((c) => (c.id === updatedCollege.id ? updatedCollege : c)));
    addToast({
      id: Date.now().toString(),
      title: 'College Profile Updated in CMS',
      message: `${updatedCollege.name} information verified and saved.`,
      type: 'success'
    });
  };

  const addCollegeData = (newCollege: TNCollege) => {
    setColleges((prev) => [newCollege, ...prev]);
    addToast({
      id: Date.now().toString(),
      title: 'New College Added to Platform',
      message: `${newCollege.name} added with TNEA Code ${newCollege.tneaCode || 'N/A'}.`,
      type: 'success'
    });
  };

  // Blog / Resources CMS
  const [articles, setArticles] = useState<BlogArticle[]>(() => {
    return resourcesData.map(r => ({
      id: r.id,
      title: r.title,
      slug: r.id,
      category: r.category as any,
      author: r.author,
      coverImage: r.image,
      summary: r.summary,
      content: r.content || r.summary,
      readTime: r.readTime,
      publishedDate: r.date,
      updatedDate: 'August 2026',
      isPublished: true,
      seoTitle: `${r.title} | NEXTBLOCK Guide`,
      seoDescription: r.summary,
      tags: ['TNEA 2026', 'Tamil Nadu Engineering', 'College Admissions', 'Cutoff Analysis']
    }));
  });

  const addArticle = (article: BlogArticle) => {
    setArticles(prev => [article, ...prev]);
    addToast({
      id: Date.now().toString(),
      title: 'Article Published',
      message: `"${article.title}" is now live on Resources.`,
      type: 'success'
    });
  };

  const updateArticle = (article: BlogArticle) => {
    setArticles(prev => prev.map(a => a.id === article.id ? article : a));
    addToast({
      id: Date.now().toString(),
      title: 'Article Updated',
      message: `Changes saved for "${article.title}".`,
      type: 'success'
    });
  };

  const deleteArticle = (id: string) => {
    setArticles(prev => prev.filter(a => a.id !== id));
    addToast({
      id: Date.now().toString(),
      title: 'Article Deleted',
      message: 'Article removed from CMS.',
      type: 'info'
    });
  };

  // Analytics Event Tracker
  const trackEvent = (eventName: string, payload?: Record<string, any>) => {
    const event: AnalyticsEvent = {
      eventName,
      payload,
      timestamp: new Date().toISOString()
    };
    // In production, send to analytics backend
    if (import.meta.env.DEV) {
      console.log(`[NEXTBLOCK Analytics] ${eventName}:`, payload);
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        currentPublicView,
        setCurrentPublicView,
        selectedCollegeSlug,
        setSelectedCollegeSlug,
        viewCollegeDetail,
        comparisonCollegeIds,
        toggleComparison,
        addToComparison,
        removeFromComparison,
        clearComparison,
        selectedCity,
        setSelectedCity,
        studentProfile,
        setStudentProfile,
        currentUser,
        loginUser,
        logoutUser,
        registerUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        notifications,
        unreadNotificationCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        addNotification,
        isNotificationDrawerOpen,
        setIsNotificationDrawerOpen,
        leads,
        addLead,
        updateLeadStatus,
        assignCounsellorToLead,
        applications,
        addApplication,
        updateApplicationStatus,
        documents,
        uploadDocument,
        verifyDocument,
        sessions,
        scheduleSession,
        updateSessionStatus,
        savedCollegeIds,
        toggleSaveCollege,
        colleges,
        updateCollegeData,
        addCollegeData,
        counsellors,
        articles,
        addArticle,
        updateArticle,
        deleteArticle,
        trackEvent,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
