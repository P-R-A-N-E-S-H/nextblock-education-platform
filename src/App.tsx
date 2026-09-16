import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBadges } from './components/TrustBadges';
import { TheNextBlockSection } from './components/TheNextBlockSection';
import { TNMasterPlatform } from './components/TamilNadu/TNMasterPlatform';
import { CareerSection } from './components/CareerSection';
import { WhyNextBlock } from './components/WhyNextBlock';
import { Services } from './components/Services';
import { CareerAssessment } from './components/CareerAssessment';
import { StudentJourney3D } from './components/StudentJourney3D';
import { SuccessStories } from './components/SuccessStories';
import { ParentTrustSection } from './components/ParentTrustSection';
import { ScholarshipsSection } from './components/ScholarshipsSection';
import { ResourcesSection } from './components/ResourcesSection';
import { FAQSection } from './components/FAQSection';
import { CounsellingCTA3D } from './components/CounsellingCTA3D';
import { FinalCinematicCTA } from './components/FinalCinematicCTA';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { QuickAdvisorChat } from './components/QuickAdvisorChat';
import { ToastContainer } from './components/Toast';

// 3D Cinematic Elements
import { CinematicIntro } from './components/Cinematic3D/CinematicIntro';

// Dedicated Student Pages
import { AboutPage } from './pages/AboutPage';
import { TNEAGuidancePage } from './pages/TNEAGuidancePage';
import { StudyAbroadPage } from './pages/StudyAbroadPage';
import { CoursesBranchesPage } from './pages/CoursesBranchesPage';
import { ContactPage } from './pages/ContactPage';
import { CollegesDirectoryPage } from './pages/CollegesDirectoryPage';
import { CollegeDetailPage } from './pages/CollegeDetailPage';
import { CollegeComparisonPage } from './pages/CollegeComparisonPage';
import { FindMyCollegePage } from './pages/FindMyCollegePage';
import { CareersPage } from './pages/CareersPage';
import { ScholarshipsPage } from './pages/ScholarshipsPage';
import { SuccessStoriesPage } from './pages/SuccessStoriesPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { CityHubPage } from './pages/CityHubPage';
import { LegalPage } from './pages/LegalPage';
import { StudentShortlistPage } from './pages/StudentShortlistPage';
import { MockSeatAllotmentPage } from './pages/MockSeatAllotmentPage';

// Global Overlays
import { NotificationDrawer } from './components/NotificationDrawer';
import { FloatingComparisonBar } from './components/FloatingComparisonBar';

function MainPlatform() {
  const { 
    currentPublicView, 
    setCurrentPublicView,
    toasts, 
    removeToast 
  } = useApp();

  const [showCinematicIntro, setShowCinematicIntro] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isAdvisorChatOpen, setIsAdvisorChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white relative">
      
      {/* Optional Cinematic Intro Modal Sequence */}
      {showCinematicIntro && (
        <CinematicIntro onComplete={() => setShowCinematicIntro(false)} />
      )}

      {/* Global Toast Container */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Hidden button to trigger quiz modal */}
      <button
        id="trigger-quiz-modal"
        className="hidden"
        onClick={() => setIsQuizOpen(true)}
      />

      {/* Student Navigation Header */}
      <Navbar
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenShortlist={() => setCurrentPublicView('shortlist')}
      />

      {/* Dynamic View Router */}
      <main className="flex-1">
        {currentPublicView === 'about' && <AboutPage />}
        {currentPublicView === 'tnea-guidance' && <TNEAGuidancePage onOpenBooking={() => setIsBookingOpen(true)} />}
        {currentPublicView === 'study-abroad' && <StudyAbroadPage onOpenBooking={() => setIsBookingOpen(true)} />}
        {currentPublicView === 'courses-branches' && <CoursesBranchesPage />}
        {currentPublicView === 'contact' && <ContactPage />}
        
        {/* Dedicated Core Feature Pages */}
        {currentPublicView === 'colleges' && (
          <CollegesDirectoryPage onOpenBooking={() => setIsBookingOpen(true)} />
        )}
        {currentPublicView === 'college-detail' && (
          <CollegeDetailPage onOpenBooking={() => setIsBookingOpen(true)} />
        )}
        {currentPublicView === 'compare' && (
          <CollegeComparisonPage onOpenBooking={() => setIsBookingOpen(true)} />
        )}
        {currentPublicView === 'mock-allotment' && (
          <MockSeatAllotmentPage onOpenBooking={() => setIsBookingOpen(true)} />
        )}
        {currentPublicView === 'find-my-college' && (
          <FindMyCollegePage onOpenBooking={() => setIsBookingOpen(true)} />
        )}
        {currentPublicView === 'shortlist' && (
          <StudentShortlistPage onOpenBooking={() => setIsBookingOpen(true)} />
        )}
        {currentPublicView === 'careers' && (
          <CareersPage 
            onOpenBooking={() => setIsBookingOpen(true)} 
            onOpenAssessment={() => setIsQuizOpen(true)} 
          />
        )}
        {currentPublicView === 'scholarships' && (
          <ScholarshipsPage onOpenBooking={() => setIsBookingOpen(true)} />
        )}
        {currentPublicView === 'success-stories' && (
          <SuccessStoriesPage onOpenBooking={() => setIsBookingOpen(true)} />
        )}
        {currentPublicView === 'resources' && (
          <ResourcesPage onOpenBooking={() => setIsBookingOpen(true)} />
        )}
        {currentPublicView === 'city-hub' && (
          <CityHubPage onOpenBooking={() => setIsBookingOpen(true)} />
        )}

        {/* Legal & Compliance Pages */}
        {(currentPublicView === 'privacy' || currentPublicView === 'terms' || currentPublicView === 'disclaimer' || currentPublicView === 'cookie-policy') && (
          <LegalPage initialTab={currentPublicView as any} />
        )}

        {/* Default Student Home Experience */}
        {currentPublicView === 'home' && (
          <>
            {/* 1. HERO SECTION */}
            <Hero
              onOpenBooking={() => setIsBookingOpen(true)}
              onOpenAssessment={() => setIsQuizOpen(true)}
            />

            {/* 2. TRUST BADGES */}
            <TrustBadges />

            {/* 3. THE NEXTBLOCK CONCEPT */}
            <TheNextBlockSection 
              onOpenBooking={() => setIsBookingOpen(true)}
              onOpenAssessment={() => setIsQuizOpen(true)}
            />

            {/* 4. TAMIL NADU MASTER PLATFORM (123+ Colleges & Coimbatore Hub) */}
            <TNMasterPlatform onOpenBooking={() => setIsBookingOpen(true)} />

            {/* 5. CAREER & COURSE DISCOVERY */}
            <CareerSection />

            {/* 6. WHY NEXTBLOCK — 3D Depth Cards */}
            <WhyNextBlock
              onOpenBooking={() => setIsBookingOpen(true)}
              onOpenAssessment={() => setIsQuizOpen(true)}
            />

            {/* 7. 8 CORE SERVICES */}
            <Services onOpenBooking={() => setIsBookingOpen(true)} />

            {/* 8. CAREER ASSESSMENT MODAL */}
            <CareerAssessment
              isOpen={isQuizOpen}
              onClose={() => setIsQuizOpen(false)}
              onOpenBooking={() => {
                setIsQuizOpen(false);
                setIsBookingOpen(true);
              }}
            />

            {/* 9. STUDENT JOURNEY 3D */}
            <StudentJourney3D onOpenBooking={() => setIsBookingOpen(true)} />

            {/* 10. SUCCESS STORIES */}
            <SuccessStories onOpenBooking={() => setIsBookingOpen(true)} />

            {/* 11. PARENT TRUST SECTION */}
            <ParentTrustSection onOpenBooking={() => setIsBookingOpen(true)} />

            {/* 12. SCHOLARSHIPS & TNEA AID CALCULATOR */}
            <ScholarshipsSection onOpenBooking={() => setIsBookingOpen(true)} />

            {/* 13. RESOURCES & KNOWLEDGE BASE */}
            <ResourcesSection onOpenBooking={() => setIsBookingOpen(true)} />

            {/* 14. FAQ ACCORDION */}
            <FAQSection onOpenBooking={() => setIsBookingOpen(true)} />

            {/* 15. COUNSELLING CTA with 3D Staircase */}
            <div id="counselling-cta">
              <CounsellingCTA3D
                onOpenBooking={() => setIsBookingOpen(true)}
                onOpenAdvisorChat={() => setIsAdvisorChatOpen(true)}
              />
            </div>

            {/* 16. FINAL CINEMATIC CTA */}
            <FinalCinematicCTA onOpenBooking={() => setIsBookingOpen(true)} />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer onOpenBooking={() => setIsBookingOpen(true)} />

      {/* Interactive Free Counselling Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      {/* Instant Quick Advisor AI Chat Drawer */}
      <QuickAdvisorChat
        isOpen={isAdvisorChatOpen}
        onClose={() => setIsAdvisorChatOpen(false)}
        onOpenBooking={() => {
          setIsAdvisorChatOpen(false);
          setIsBookingOpen(true);
        }}
      />

      {/* In-App Admissions Notifications Drawer */}
      <NotificationDrawer />

      {/* Floating Bottom Comparison Dock (When colleges are selected) */}
      <FloatingComparisonBar />

    </div>
  );
}

export function App() {
  return (
    <AppProvider>
      <MainPlatform />
    </AppProvider>
  );
}

export default App;
