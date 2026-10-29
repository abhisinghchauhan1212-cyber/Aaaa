import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ShieldAlert, 
  CheckCircle2, 
  Phone, 
  MessageCircle,
  ShieldCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { HEALTHCARE_SERVICES } from '../data/servicesData';
import { ServiceCard } from '../components/ServiceCard';
import { ServiceCategory } from '../types';
import { BUSINESS_INFO } from '../data/initialData';

export const ServicesPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { setCurrentPage } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: string; labelHi: string; labelEn: string }[] = [
    { id: 'all', labelHi: 'सभी 17 सेवाएँ', labelEn: 'All 17 Services' },
    { id: 'nursing', labelHi: 'नर्सिंग व पेशेंट केयर', labelEn: 'Nursing & Patient Care' },
    { id: 'icu_critical', labelHi: 'ICU व क्रिटिकल केयर', labelEn: 'ICU & Critical Care' },
    { id: 'gda_attendant', labelHi: 'GDA व केयरगिवर स्टाफ', labelEn: 'GDA & Attendants' },
    { id: 'physiotherapy', labelHi: 'फिजियोथेरेपी', labelEn: 'Physiotherapy' },
    { id: 'elderly_bedridden', labelHi: 'बुजुर्ग व बेडरिडन केयर', labelEn: 'Elderly & Bedridden' },
    { id: 'clinical_procedure', labelHi: 'क्लीनिकल प्रक्रियाएँ (Dressing/Catheter)', labelEn: 'Clinical Procedures' },
  ];

  const filteredServices = HEALTHCARE_SERVICES.filter((service) => {
    if (selectedCategory !== 'all' && service.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      const match =
        service.nameHi.toLowerCase().includes(q) ||
        service.nameEn.toLowerCase().includes(q) ||
        service.descriptionHi.toLowerCase().includes(q) ||
        service.descriptionEn.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 uppercase tracking-wider">
          {t('होम केयर सेवाएँ (Our Services)', 'Home Care Services')}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 mb-3">
          {t('घर पर संपूर्ण मरीज देखभाल सेवाएँ (17 Services)', 'Comprehensive In-Home Patient Care (All 17 Services)')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {t(
            'उत्तराखंड के देहरादून और आसपास के क्षेत्रों के लिए 17 विशिष्ट होम केयर सेवाएँ। हर सेवा के साथ विवरण, अनुमानित शुल्क और अधिकृत स्टाफ की जानकारी।',
            '17 specialized home healthcare services in Dehradun and surrounding Uttarakhand areas. Includes clear descriptions, pricing, and certified staff credentials.'
          )}
        </p>
      </div>

      {/* Mandatory Medical Safety Notice */}
      <div className="bg-teal-50/80 border border-teal-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 max-w-4xl mx-auto shadow-2xs">
        <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-700 leading-relaxed">
          <span className="font-bold text-teal-950 block mb-0.5">
            {t('सत्यापित व अधिकृत स्टाफ सुरक्षा नियम:', 'Clinical Authorization & Safety Notice:')}
          </span>
          {t(
            'चिकित्सीय प्रक्रियाएँ (जैसे IV कैन्युलेशन, इंजेक्शन, ट्रेकियोस्टोमी सक्शन, कैथेटर डालना व वेंटिलेटर मॉनिटरिंग) केवल संबंधित रूप से योग्य एवं राज्य नर्सिंग काउंसिल से अधिकृत नर्सिंग स्टाफ (B.Sc / GNM) द्वारा ही और डॉक्टर के वैध पर्चे पर उपलब्ध कराई जाती हैं।',
            'Invasive medical procedures (IV cannulation, injections, tracheostomy suction, catheterization, and ventilator support) are performed strictly by registered nursing officers (B.Sc / GNM) under a valid doctor’s prescription.'
          )}
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="space-y-4">
        {/* Search */}
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-2 bg-white px-3.5 py-2.5 rounded-2xl border border-slate-300 focus-within:border-teal-600 shadow-2xs">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('सेवा का नाम खोजें (उदा. ICU, Catheter, Dressing, Physiotherapy)...', 'Search services by name...')}
              className="w-full text-xs outline-hidden text-slate-800"
            />
          </div>
        </div>

        {/* Categories Segmented Control */}
        <div className="flex items-center justify-center flex-wrap gap-1.5 pt-2">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {t(cat.labelHi, cat.labelEn)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center max-w-md mx-auto">
          <p className="text-sm font-semibold text-slate-700 mb-2">
            {t('कोई सेवा नहीं मिली', 'No matching services found')}
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="text-xs text-teal-700 font-bold hover:underline cursor-pointer"
          >
            {t('सभी 17 सेवाएँ फिर से देखें', 'Reset Filters')}
          </button>
        </div>
      )}

      {/* Custom Care Request Banner */}
      <div className="bg-slate-900 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="text-lg sm:text-xl font-bold">
            {t('क्या मरीज की देखभाल संबंधी कोई विशिष्ट आवश्यकता है?', 'Need a Custom Care Package or Combined Staff?')}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            {t(
              'हमारी केयर कोऑर्डिनेटर टीम से सीधे बात करें। हम मरीज की स्थिति के अनुसार कस्टमाइज्ड पैकेज तैयार करते हैं।',
              'Speak directly with Abhishek Chauhan. We tailor personalized home care solutions according to doctor recommendations.'
            )}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href={`tel:+91${BUSINESS_INFO.whatsappNumber}`}
            className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs py-3 px-5 rounded-xl shadow-xs"
          >
            {t('कॉल करें', 'Call Now')}
          </a>
          <a
            href={`${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent('Hello Abhishek ji, I need a custom home care solution for my patient in Dehradun.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs py-3 px-5 rounded-xl shadow-xs flex items-center gap-1.5"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

    </div>
  );
};
