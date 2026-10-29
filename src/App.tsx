import React from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { BookingForm } from './components/BookingForm';
import { BookingTracker } from './components/BookingTracker';
import { StaffDirectoryPage } from './pages/StaffDirectoryPage';
import { IcuCriticalCarePage } from './pages/IcuCriticalCarePage';
import { PhysiotherapyPage } from './pages/PhysiotherapyPage';
import { PricingPage } from './pages/PricingPage';
import { StaffRegisterView } from './components/StaffRegisterModal';
import { ContactPage } from './pages/ContactPage';
import { AdminPanel } from './components/AdminPanel';
import { FaqPage, PrivacyPolicyPage, TermsPage, CancellationPage } from './pages/PolicyPages';
import { SetupGuidePage } from './pages/SetupGuidePage';
import { NotificationToast } from './components/NotificationToast';
import { NotificationCenterModal } from './components/NotificationCenterModal';

const AppContent: React.FC = () => {
  const { currentPage } = useApp();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'services':
        return <ServicesPage />;
      case 'book':
        return <BookingForm />;
      case 'track':
        return <BookingTracker />;
      case 'staff':
        return <StaffDirectoryPage />;
      case 'icu-care':
        return <IcuCriticalCarePage />;
      case 'physiotherapy':
        return <PhysiotherapyPage />;
      case 'pricing':
        return <PricingPage />;
      case 'staff-register':
        return <StaffRegisterView />;
      case 'contact':
        return <ContactPage />;
      case 'admin':
        return <AdminPanel />;
      case 'faq':
        return <FaqPage />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'terms':
        return <TermsPage />;
      case 'cancellation':
        return <CancellationPage />;
      case 'setup-guide':
        return <SetupGuidePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 pb-16 md:pb-0">
      <Navbar />
      <main className="flex-1">
        {renderCurrentPage()}
      </main>
      <Footer />
      <FloatingActions />
      <NotificationToast />
      <NotificationCenterModal />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </LanguageProvider>
  );
}
