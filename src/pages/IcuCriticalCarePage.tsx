import React from 'react';
import { 
  Activity, 
  ShieldAlert, 
  Wind, 
  HeartPulse, 
  CheckCircle2, 
  Phone, 
  MessageCircle, 
  Calendar,
  AlertTriangle,
  Stethoscope
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { HEALTHCARE_SERVICES } from '../data/servicesData';
import { BUSINESS_INFO } from '../data/initialData';

export const IcuCriticalCarePage: React.FC = () => {
  const { t } = useLanguage();
  const { navigateToBookingWithService, setCurrentPage } = useApp();

  const icuService = HEALTHCARE_SERVICES.find((s) => s.id === 'icu-patient-care-at-home') || HEALTHCARE_SERVICES[3];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-teal-800/40 shadow-xl">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold text-teal-300 bg-teal-900/60 px-3 py-1 rounded-full border border-teal-700 uppercase tracking-wider inline-flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-teal-400" />
            <span>{t('ICU & Critical Care at Home', 'Home Intensive Care Unit')}</span>
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {t(
              'अस्पताल स्तर का होम ICU सेटअप व 24 घंटे क्रिटिकल केयर नर्स',
              'Hospital-Grade Home ICU Setup & 24/7 Critical Care Nursing'
            )}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {t(
              'देहरादून और आसपास के क्षेत्रों में गंभीर मरीजों के लिए घर पर वेंटिलेटर, BiPAP मशीन, 5-पैरा कार्डियक मॉनिटर, सक्शन मशीन, ऑक्सीजन कंसंट्रेटर और अनुभवी ICU स्टाफ उपलब्ध।',
              'Complete ICU infrastructure delivered to your home: Invasive/Non-invasive ventilators, BiPAP, 5-parameter monitors, continuous suctioning, and ICU fellowship trained nursing officers.'
            )}
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => navigateToBookingWithService(icuService)}
              className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm py-3 px-6 rounded-xl transition-all cursor-pointer shadow-md flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>{t('होम ICU बुक करें', 'Book Home ICU Setup')}</span>
            </button>

            <a
              href={`${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent('Urgent: I need Home ICU and Critical Care staff in Dehradun.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm py-3 px-5 rounded-xl shadow-md flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t('आपातकालीन WhatsApp (7906131879)', 'Emergency WhatsApp')}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Critical Medical Equipment Managed */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
          {t('होम ICU में प्रबंधित उपकरण व क्लिनिकल प्रोटोकॉल', 'ICU Medical Equipment & Clinical Support')}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              titleHi: 'BiPAP / CPAP वेंटिलेशन',
              titleEn: 'BiPAP / CPAP Ventilation',
              descHi: 'सीओपीडी व रेस्पिरेटरी फेलियर मरीजों के लिए प्रेशर सपोर्ट व मास्क फिटिंग।',
              descEn: 'Pressure titration, mask seal adjustment, and airway resistance monitoring.',
            },
            {
              titleHi: '5-पैरामीटर कार्डियक मॉनिटर',
              titleEn: '5-Parameter Monitor',
              descHi: 'ईसीजी, बीपी, हार्ट रेट, SpO2 और तापमान की 24 घंटे लगातार ट्रैकिंग।',
              descEn: 'Continuous real-time logging of ECG, NIBP, heart rate, SpO2, and temp.',
            },
            {
              titleHi: 'ट्रेकियोस्टोमी व सक्शन',
              titleEn: 'Tracheostomy & Suction',
              descHi: 'गले की श्वास नली की स्टेराइल सक्शनिंग व एयरवे क्लीयरेंस।',
              descEn: 'Sterile deep airway suctioning, inner cannula cleaning, and stoma dressing.',
            },
            {
              titleHi: 'इन्फ्यूजन पंप व IV दवा',
              titleEn: 'Infusion Pumps & Syringe Drivers',
              descHi: 'आपातकालीन इनोट्रोप्स, एंटीबायोटिक्स व इलेक्ट्रोलाइट्स का सटीक फ्लो।',
              descEn: 'Micro-rate infusion titration of inotropes, IV fluids, and strict charting.',
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">{t(item.titleHi, item.titleEn)}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{t(item.descHi, item.descEn)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ICU Staff Eligibility */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8">
        <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-teal-600" />
          <span>{t('हमारे होम ICU नर्सिंग स्टाफ की योग्यता व अनुभव', 'ICU Staff Qualifications & Standards')}</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
          {t(
            'Health UK07 होम ICU में केवल वे नर्सिंग अधिकारी तैनात किए जाते हैं जिनके पास बड़े सुपर-स्पेशियलिटी अस्पतालों (जैसे Max, Himalayan Hospital, Doon Medical College) के मेडिकल आईसीयू (MICU) या सर्जिकल आईसीयू (SICU) में न्यूनतम 3 से 7 वर्षों का सक्रिय अनुभव हो।',
            'Only B.Sc nurses with a minimum of 3 to 7 years hands-on tertiary hospital ICU experience (MICU/SICU) are assigned for critical home ICU cases.'
          )}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{t('BLS व ACLS प्रमाणित नर्सिंग ऑफिसर', 'BLS & ACLS Certified')}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{t('उत्तराखंड नर्सिंग काउंसिल पंजीकृत', 'UKNC Registered Nurse')}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{t('डॉक्टर के साथ दैनिक टेली-रिपोर्टिंग', 'Daily Doctor Tele-Reporting')}</span>
          </div>
        </div>
      </div>

    </div>
  );
};
