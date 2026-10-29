import React from 'react';
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  Heart, 
  HelpCircle,
  FileText,
  AlertTriangle,
  Lock,
  Layers
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { NavigationPage, useApp } from '../context/AppContext';
import { BUSINESS_INFO } from '../data/initialData';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const { setCurrentPage } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Emergency Medical Advisory Card */}
        <div className="mb-12 bg-amber-950/40 border border-amber-600/30 rounded-2xl p-4 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm sm:text-base">
                {t('महत्वपूर्ण आपातकालीन चिकित्सा सूचना (Medical Notice)', 'Emergency Medical Advisory')}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                {t(
                  'Health UK07 घर पर गैर-आपातकालीन व निरंतर मरीज देखभाल (Nursing, Caregiver, Physiotherapy, Home ICU) प्रदान करता है। किसी भी गंभीर, जानलेवा या तीव्र आपात स्थिति में तुरंत उत्तराखंड आपातकालीन एम्बुलेंस सेवा 108 या नजदीकी अस्पताल से संपर्क करें।',
                  'Health UK07 provides home-based supportive and nursing care. In severe or life-threatening acute medical emergencies, please dial the Uttarakhand State Ambulance 108 immediately or rush to the nearest hospital emergency.'
                )}
              </p>
            </div>
          </div>
          <a
            href="tel:108"
            className="shrink-0 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition-all"
          >
            <Phone className="w-4 h-4" />
            <span>{t('आपातकालीन: 108 डायल करें', 'Emergency: Dial 108')}</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          {/* Column 1: Brand & Abhishek Chauhan Contact */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500 text-slate-950 flex items-center justify-center font-black text-lg">
                UK07
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight">Health UK07</span>
                <p className="text-xs text-teal-400 font-medium">
                  {t('होम केयर एवं पेशेंट केयर सर्विसेज', 'Home Care & Patient Care Services')}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t(
                'उत्तराखंड के देहरादून और आसपास के क्षेत्रों में मरीजों के लिए घर बैठे योग्य, प्रशिक्षित और पूर्णतः सत्यापित नर्सिंग और केयरगिवर स्टाफ की भरोसेमंद सेवा।',
                'Delivering qualified, verified and background-checked nursing officers, GDAs, and physiotherapists directly to patients homes across Dehradun and Uttarakhand.'
              )}
            </p>

            <div className="pt-2 space-y-2 text-xs sm:text-sm">
              <div className="flex items-center gap-2.5 text-slate-300">
                <span className="text-teal-400 font-semibold">{t('संपर्क व्यक्ति:', 'Contact Person:')}</span>
                <span className="text-white font-medium">{BUSINESS_INFO.contactPerson}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`tel:+91${BUSINESS_INFO.whatsappNumber}`} className="text-slate-300 hover:text-white transition-colors">
                  {BUSINESS_INFO.formattedPhone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a 
                  href={`${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent('Hello Abhishek ji, I need patient care service.')}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                >
                  WhatsApp: {BUSINESS_INFO.whatsappNumber}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span className="text-slate-400">{t(BUSINESS_INFO.addressHi, BUSINESS_INFO.addressEn)}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Key Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">
              {t('प्रमुख सेवाएँ', 'Core Services')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentPage('services')} className="text-slate-400 hover:text-white transition-colors text-left">
                  {t('1. Home Patient Care', '1. Home Patient Care')}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('services')} className="text-slate-400 hover:text-white transition-colors text-left">
                  {t('2. 24 Hours Patient Care', '2. 24 Hours Patient Care')}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('services')} className="text-slate-400 hover:text-white transition-colors text-left">
                  {t('3. Nursing Staff at Home', '3. Nursing Staff at Home')}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('icu-care')} className="text-slate-400 hover:text-white transition-colors text-left">
                  {t('4. ICU Patient Care at Home', '4. ICU Patient Care at Home')}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('services')} className="text-slate-400 hover:text-white transition-colors text-left">
                  {t('7. GDA Staff at Home', '7. GDA Staff at Home')}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('physiotherapy')} className="text-slate-400 hover:text-white transition-colors text-left">
                  {t('9. Physiotherapy at Home', '9. Physiotherapy at Home')}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('services')} className="text-teal-400 hover:text-teal-300 transition-colors text-left font-medium">
                  {t('सभी 17 सेवाएँ देखें →', 'View All 17 Services →')}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Service Areas in Dehradun */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">
              {t('सेवा क्षेत्र (देहरादून)', 'Service Areas (Dehradun)')}
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>Shanti Vihar, Dehradun</li>
              <li>Chakrata Road & Chakrata</li>
              <li>Rajpur Road & Dalanwala</li>
              <li>Clement Town & Subhash Nagar</li>
              <li>Prem Nagar & Selaqui</li>
              <li>Sahastradhara Road</li>
              <li>GMS Road & Ballupur</li>
              <li>Vikasnagar & Rishikesh (On request)</li>
            </ul>
          </div>

          {/* Column 4: Quick Links & Policies */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">
              {t('जरूरी लिंक्स', 'Important Links')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentPage('track')} className="text-slate-400 hover:text-white transition-colors">
                  {t('बुकिंग स्टेटस चेक करें', 'Track Booking Status')}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('pricing')} className="text-slate-400 hover:text-white transition-colors">
                  {t('रेट कार्ड व कीमतें', 'Pricing & Packages')}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('staff-register')} className="text-slate-400 hover:text-white transition-colors">
                  {t('स्टाफ रजिस्ट्रेशन (जॉब)', 'Staff Registration')}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('faq')} className="text-slate-400 hover:text-white transition-colors">
                  {t('अक्सर पूछे जाने वाले सवाल (FAQ)', 'Frequently Asked Questions')}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('privacy')} className="text-slate-400 hover:text-white transition-colors">
                  {t('गोपनीयता नीति (Privacy Policy)', 'Privacy Policy')}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('terms')} className="text-slate-400 hover:text-white transition-colors">
                  {t('नियम एवं शर्तें (Terms & Conditions)', 'Terms and Conditions')}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('cancellation')} className="text-slate-400 hover:text-white transition-colors">
                  {t('कैंसलेशन व रिफंड पॉलिसी', 'Cancellation & Refund')}
                </button>
              </li>
              <li className="pt-2">
                <button 
                  onClick={() => setCurrentPage('setup-guide')} 
                  className="text-amber-400 hover:text-amber-300 transition-colors font-medium flex items-center gap-1"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{t('डोमेन व होस्टिंग गाइड (Hindi)', 'Deployment Guide')}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Health UK07 – Home Care Services. {t('सर्वाधिकार सुरक्षित।', 'All rights reserved.')}
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-500" />
              <span>{t('सत्यापित व प्रशिक्षित हेल्थकेयर स्टाफ', 'Verified Healthcare Personnel')}</span>
            </span>
            <button
              onClick={() => setCurrentPage('admin')}
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              <span>{t('एडमिन पोर्टल', 'Admin Portal')}</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
