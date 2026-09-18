export type CollegeStream = 'Engineering' | 'Medical' | 'Arts & Science' | 'Law' | 'Management' | 'Architecture' | 'All';
export type AcademicStream = 'engineering' | 'medical' | 'arts-science' | 'all';

export interface TNCollege {
  id: string;
  name: string;
  shortName: string;
  stream?: 'Engineering' | 'Medical' | 'Arts & Science' | 'Law' | 'Management' | 'Architecture' | string;
  streams?: string[];
  tneaCode?: string;
  neetCutoffGeneral?: string;
  meritCutoffPercentage?: string;
  institutionType: 
    | 'Government / University Campus' 
    | 'Government Aided Autonomous' 
    | 'Deemed-to-be University' 
    | 'Self-Financing Autonomous' 
    | 'Affiliated Engineering College'
    | 'Government Medical College'
    | 'Private Medical College'
    | 'Institute of National Importance'
    | 'Government Arts College'
    | 'Government Aided Arts College'
    | 'Self-Financing Arts College'
    | string;
  category: 
    | 'Top Tier Autonomous' 
    | 'Deemed University' 
    | 'Government Premier' 
    | 'Coimbatore Landmark' 
    | 'Chennai Landmark' 
    | 'Regional Premier'
    | 'Premier Medical Institute'
    | 'Top Tier Arts & Science'
    | string;
  city: string;
  district: string;
  zone: 'Chennai & Northern TN' | 'Coimbatore & Western TN' | 'Central Tamil Nadu' | 'Southern Tamil Nadu' | 'Puducherry & Environs' | string;
  establishedYear: number;
  nirfRank?: string;
  naacGrade?: string;
  nbaAccredited?: boolean;
  image: string;
  tneaCutoffGeneral?: string;
  admissionRoutes: string[];
  entranceExams: string[];
  approxFeesPerYear: string;
  tuitionValue: number;
  placements: {
    highestPackage: string;
    averagePackage: string;
    medianPackage?: string;
    placementPercentage: string;
    topRecruiters: string[];
  };
  popularBranches: string[];
  allBranches: string[];
  campuses?: string[];
  hostelAvailable: boolean;
  hostelFees?: string;
  officialWebsite: string;
  overview: string;
  isFeatured?: boolean;
  isCoimbatoreHub?: boolean;
  verificationStatus?: 'VERIFIED' | 'NEEDS REVIEW' | 'OUTDATED' | 'UPDATED' | string;
  lastUpdated: string;
}

export interface University {
  id: string;
  name: string;
  location: string;
  state: string;
  worldRank?: number;
  nirfRank?: string;
  naacGrade?: string;
  tneaCode?: string;
  tuitionFee: string;
  tuitionValue: number;
  popularCourses: string[];
  intakes: string[];
  image: string;
  logo?: string;
  category: 'Government Premier' | 'Top Tier Autonomous' | 'Deemed University' | 'Coimbatore Landmark' | 'Chennai Landmark' | 'Regional Premier';
  scholarshipsAvailable: string;
  deadline: string;
  cutoffGeneral?: string;
  requirements: {
    cutoffPcm: string;
    entranceExam: string;
  };
  highlights: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  deliverables: string[];
  badge?: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  hometown?: string;
  school?: string;
  course: string;
  university: string;
  location: string;
  cutoff: string;
  allotmentRound?: string;
  placedCompany?: string;
  placedPackage?: string;
  placementPackage?: string;
  categoryTag?: '7.5% Govt Quota' | 'First Graduate' | 'Tier-1 Autonomous' | 'Top Product Placement';
  verifiedAllotment?: boolean;
  rating: number;
  quote: string;
  highlightTag: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  category: 'TNEA Counselling' | 'Cutoff & Placements' | 'College Guides' | 'Scholarships & Aid' | 'Branch Selection' | 'Student Experiences' | 'Engineering Admissions' | 'Study Abroad';
  readTime: string;
  date: string;
  summary: string;
  image: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content?: string;
  downloadUrl?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'TNEA Counselling' | 'Cutoffs & Choice Filling' | 'Scholarships' | 'Autonomous & Deemed' | 'Study Abroad' | 'Documents';
}

export interface QuizQuestion {
  id: number;
  question: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    icon: string;
    fieldMatch: string;
  }[];
}

export interface QuizResult {
  topField: string;
  matchScore: number;
  description: string;
  recommendedDegrees: string[];
  recommendedColleges: string[];
  careerRoles: string[];
  avgStartingSalary: string;
}

export interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  district: string;
  currentEducation: string;
  pcmCutoff: string;
  interestedBranch: string;
  preferredZone: string;
  targetCategory: string;
  preferredDate: string;
  preferredTimeSlot: string;
  counsellingMode: 'Video Call (Google Meet/Zoom)' | 'In-Person (Chennai / Coimbatore Office)' | 'Phone Call';
  advisorPreference?: string;
  notes?: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

// =========================================================================
// PORTAL & CRM ENTITIES
// =========================================================================

export type UserRole = 'public' | 'student' | 'counsellor' | 'admin';

export type LeadStatus = 
  | 'New'
  | 'Contacted'
  | 'Counselling Scheduled'
  | 'Counselling Completed'
  | 'Shortlisted'
  | 'Application Started'
  | 'Application Submitted'
  | 'Converted'
  | 'Closed';

export type ApplicationStatus = 
  | 'Not Started'
  | 'In Progress'
  | 'Documents Pending'
  | 'Submitted'
  | 'Under Review'
  | 'Offer Received'
  | 'Accepted'
  | 'Rejected';

export type DocumentStatus = 'Uploaded' | 'Under Review' | 'Verified' | 'Rejected';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  district: string;
  academicLevel: string;
  pcmCutoff: number;
  interestedBranch: string;
  targetColleges: string[];
  source: 'Website Booking' | 'Cutoff Simulator' | 'Career Quiz' | 'Direct Enquiry' | 'WhatsApp';
  assignedCounsellorId?: string;
  assignedCounsellorName?: string;
  status: LeadStatus;
  priority: 'High' | 'Medium' | 'Low';
  createdDate: string;
  lastContacted: string;
  nextFollowUp: string;
  notes: string[];
}

export interface StudentApplication {
  id: string;
  studentId: string;
  studentName: string;
  collegeId: string;
  collegeName: string;
  tneaCode?: string;
  branch: string;
  applicationNumber: string;
  admissionRoute: 'TNEA Single Window' | 'Management Quota' | 'Institutional Entrance' | '7.5% Govt Quota' | 'International App';
  status: ApplicationStatus;
  submissionDeadline: string;
  submittedDate?: string;
  assignedCounsellor: string;
  nextAction: string;
  updatedAt: string;
}

export interface StudentDocument {
  id: string;
  studentId: string;
  documentType: '10th Marksheet' | '12th Marksheet' | 'Community Certificate' | 'First Graduate Certificate' | '7.5% Bonafide Certificate' | 'Nativity Certificate' | 'Transfer Certificate (TC)' | 'Entrance Scorecard' | 'Passport / ID Proof';
  fileName: string;
  fileSize: string;
  uploadDate: string;
  status: DocumentStatus;
  verifiedBy?: string;
  verificationNotes?: string;
  fileUrl?: string;
}

export interface CounsellingSession {
  id: string;
  studentId: string;
  studentName: string;
  studentPhone: string;
  counsellorId: string;
  counsellorName: string;
  sessionType: 'TNEA Choice Filling Strategy' | 'College Cutoff Diagnostic' | '7.5% Govt School Aid & FG Review' | 'Career & Branch Mapping' | 'Study Abroad Roadmap';
  mode: 'Google Meet (Video)' | 'Phone Call' | 'In-Person (Chennai Office)' | 'In-Person (Coimbatore Office)';
  date: string;
  timeSlot: string;
  meetingLink?: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'Rescheduled';
  counsellorNotes?: string;
  actionItems?: string[];
}

export interface Counsellor {
  id: string;
  name: string;
  avatar: string;
  role: string;
  specialization: string;
  activeLeadsCount: number;
  totalConversions: number;
  rating: number;
  phone: string;
  email: string;
}

export interface ScholarshipItem {
  id: string;
  name: string;
  category: 'Government Welfare' | '7.5% Govt School' | 'First Graduate' | 'Institutional Merit' | 'Private & Corporate' | 'International';
  amount: string;
  eligibility: string;
  targetColleges: string[];
  deadline: string;
  documentsRequired: string[];
  officialSourceUrl: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'session' | 'application' | 'document' | 'recommendation' | 'alert';
  actionView?: string;
}

export interface UserAuth {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'student' | 'counsellor' | 'admin';
  avatar?: string;
  token?: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  category: 'TNEA Counselling' | 'Engineering Admissions' | 'College Guides' | 'Career Guidance' | 'Scholarships & Aid' | 'Study Abroad' | 'Entrance Exams' | 'Student Life';
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  coverImage: string;
  summary: string;
  content: string;
  readTime: string;
  publishedDate: string;
  updatedDate: string;
  isPublished: boolean;
  seoTitle: string;
  seoDescription: string;
  tags: string[];
}

export interface AnalyticsEvent {
  eventName: string;
  payload?: Record<string, any>;
  timestamp: string;
}

