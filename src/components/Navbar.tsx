import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Globe, 
  Menu, 
  X, 
  ShieldCheck, 
  Clock, 
  Lock, 
  Search,
  UserCheck,
  Bell
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { NavigationPage, useApp } from '../context/AppContext';
import { BUSINESS_INFO } from '../data/initialData';

export const Navbar: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const { 
    currentPage, 
    setCurrentPage, 
    isAdminLoggedIn, 
    unreadNotificationsCount, 
    setIsNotificationModalOpen 
  } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavigationPage; labelHi: string; labelEn: string }[] = [
    { id: 'home', labelHi: 'होम', labelEn: 'Home' },
    { id: 'services', labelHi: 'सेवाएँ (17 Services)', labelEn: 'Services (17)' },
    { id: 'book', labelHi: 'मरीज सेवा बुक करें', labelEn: 'Book Care' },
    { id: 'staff', labelHi: 'स्टाफ खोजें', labelEn: 'Find Staff' },
    { id: 'icu-care', labelHi: 'होम ICU केयर', labelEn: 'Home ICU' },
    { id: 'physiotherapy', labelHi: 'फिजियोथेरेपी', labelEn: 'Physiotherapy' },
    { id: 'track', labelHi: 'बुकिंग स्टेटस', labelEn: 'Track Booking' },
    { id: 'pricing', labelHi: 'रेट कार्ड', labelEn: 'Pricing' },
    { id: 'contact', labelHi: 'संपर्क करें', labelEn: 'Contact Us' },
  ];

  const handleNavClick = (page: NavigationPage) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all shadow-xs">
      {/* Top Notification Bar */}
      <div className="bg-slate-900 text-slate-100 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {t('24 घंटे मरीज सेवा उपलब्ध', '24/7 Patient Care Active')}
            </span>
            <span className="text-slate-600" aria-hidden="true">|</span>
            <span className="hidden sm:inline text-slate-300">
              {t('शांति विहार, चकराता व देहरादून उत्तराखंड', 'Shanti Vihar, Chakrata & Dehradun, UK')}
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <a
              href={`tel:+91${BUSINESS_INFO.whatsappNumber}`}
              className="flex items-center gap-1 text-slate-200 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-teal-400" />
              <span className="font-medium">{BUSINESS_INFO.formattedPhone}</span>
            </a>
            <span className="text-slate-600" aria-hidden="true">|</span>
            <a
              href={`${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent('Hello Abhishek ji, I need patient care assistance in Dehradun.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="font-medium">WhatsApp</span>
            </a>
            <span className="text-slate-600" aria-hidden="true">|</span>
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-teal-300 border border-slate-700 transition-colors cursor-pointer"
              title="Switch Language / भाषा बदलें"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'English' : 'हिंदी'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo & Name */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-700 via-teal-800 to-slate-900 text-white flex items-center justify-center font-bold text-lg shadow-sm border border-teal-600/30">
              <span className="tracking-tight text-white font-black">UK07</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-teal-700 transition-colors">
                  Health UK07
                </span>
                <span className="text-[11px] font-semibold text-teal-800 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
                  Dehradun
                </span>
              </div>
              <p className="text-xs text-slate-700 font-medium tracking-tight">
                {t('होम केयर एवं पेशेंट केयर सिस्टम', 'Home Care & Patient Care System')}
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 text-sm font-medium transition-colors cursor-pointer rounded-lg ${
                    isActive 
                      ? 'text-teal-800 bg-teal-50/80 font-semibold' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {t(item.labelHi, item.labelEn)}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={() => handleNavClick('staff-register')}
              className="text-xs font-medium text-slate-700 hover:text-teal-700 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-teal-300 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <UserCheck className="w-3.5 h-3.5 text-teal-600" />
              <span>{t('स्टाफ जॉइन करें', 'Staff Join')}</span>
            </button>

            <button
              onClick={() => handleNavClick('book')}
              className="bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>{t('बुकिंग करें', 'Book Care')}</span>
            </button>

            {/* Real-time Notification Bell */}
            <button
              onClick={() => setIsNotificationModalOpen(true)}
              className="relative p-2 rounded-lg text-slate-700 hover:text-teal-700 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
              title={t('रीयल-टाइम नोटिफिकेशन व एसएमएस', 'Real-time Notifications & SMS')}
              aria-label="Open Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-teal-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => handleNavClick('admin')}
              className={`p-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer flex items-center gap-1 ${
                currentPage === 'admin' || isAdminLoggedIn
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
              title={t('एडमिन पोर्टल', 'Admin Dashboard')}
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu & Bell Button */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <button
              onClick={() => setIsNotificationModalOpen(true)}
              className="relative p-2 rounded-lg text-slate-700 hover:bg-slate-100 border border-slate-200"
              aria-label="Open Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-teal-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => handleNavClick('book')}
              className="bg-teal-700 text-white text-xs font-semibold px-2.5 py-2 rounded-lg"
            >
              {t('बुक', 'Book')}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 mb-3">
            <a
              href={`tel:+91${BUSINESS_INFO.whatsappNumber}`}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 text-xs font-semibold"
            >
              <Phone className="w-4 h-4 text-teal-600" />
              <span>{t('कॉल करें', 'Call Now')}</span>
            </a>
            <a
              href={`${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent('Hello Abhishek ji, I need patient care assistance in Dehradun.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp</span>
            </a>
          </div>

          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-3 py-2.5 text-sm font-medium rounded-lg transition-colors flex items-center justify-between ${
                    isActive ? 'bg-teal-50 text-teal-900 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{t(item.labelHi, item.labelEn)}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
            <button
              onClick={() => handleNavClick('staff-register')}
              className="text-xs text-slate-600 font-medium py-2 px-3 rounded-lg border border-slate-200"
            >
              {t('हेल्थकेयर स्टाफ रजिस्ट्रेशन', 'Staff Registration')}
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className="text-xs text-slate-700 font-semibold py-2 px-3 rounded-lg bg-slate-100 flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{t('एडमिन लॉगिन', 'Admin Login')}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
