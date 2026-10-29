import React from 'react';
import { 
  HeartPulse, 
  ShieldCheck, 
  Clock, 
  Phone, 
  MessageCircle, 
  Award, 
  Users, 
  Activity, 
  CheckCircle2, 
  ArrowRight, 
  Star,
  MapPin,
  Calendar,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { HEALTHCARE_SERVICES } from '../data/servicesData';
import { BUSINESS_INFO } from '../data/initialData';
import { ServiceCard } from '../components/ServiceCard';
import { StaffCard } from '../components/StaffCard';

export const HomePage: React.FC = () => {
  const { language, t } = useLanguage();
  const { setCurrentPage, staff, navigateToBookingWithService } = useApp();

  const featuredServices = HEALTHCARE_SERVICES.slice(0, 6);
  const topStaff = staff.slice(0, 3);

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/70 via-white to-slate-50 pt-8 sm:pt-14 pb-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Locality badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-teal-200 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse"></span>
                <span className="text-xs font-semibold text-teal-900">
                  {t('देहरादून व उत्तराखंड में नंबर 1 होम हेल्थकेयर', '#1 In-Home Healthcare Network in Dehradun')}
                </span>
                <span className="text-slate-300">·</span>
                <span className="text-xs font-medium text-slate-600">
                  {t('शांति विहार, चकराता', 'Shanti Vihar, Chakrata')}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight sm:leading-tight">
                {language === 'hi' ? (
                  <>
                    घर पर मरीजों की देखभाल, <span className="text-teal-700">सत्यापित नर्सिंग</span> एवं 24 घंटे ICU स्टाफ
                  </>
                ) : (
                  <>
                    Compassionate In-Home <span className="text-teal-700">Patient Care</span> & 24/7 ICU Nursing Staff
                  </>
                )}
              </h1>

              {/* Sub-headline */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                {t(
                  'Health UK07 द्वारा देहरादून के हर कोने में अस्पताल-स्तर की समर्पित मरीज देखभाल। B.Sc/GNM नर्स, आईसीयू क्रिटिकल केयरगिवर्स, जी.डी.ए. अटेंडेंट और फिजियोथेरेपिस्ट अब आपके घर पर उपलब्ध।',
                  'Hospital-standard medical care delivered with love at your doorstep across Dehradun and surrounding Uttarakhand hills. Verified B.Sc/GNM nurses, ICU attendants, GDAs, and physiotherapists.'
                )}
              </p>

              {/* 5 Prominent Action Buttons Requested by User */}
              <div className="pt-2 flex flex-wrap gap-2.5 sm:gap-3">
                {/* 1. Book Home Care */}
                <button
                  onClick={() => {
                    const s = HEALTHCARE_SERVICES.find((x) => x.id === 'home-patient-care');
                    if (s) navigateToBookingWithService(s);
                    else setCurrentPage('book');
                  }}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm py-3 px-5 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <HeartPulse className="w-4 h-4 text-teal-100" />
                  <span>{t('Book Home Care', 'Book Home Care')}</span>
                </button>

                {/* 2. Book Nursing Staff */}
                <button
                  onClick={() => {
                    const s = HEALTHCARE_SERVICES.find((x) => x.id === 'nursing-staff-at-home');
                    if (s) navigateToBookingWithService(s);
                    else setCurrentPage('book');
                  }}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm py-3 px-5 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-teal-400" />
                  <span>{t('Book Nursing Staff', 'Book Nursing Staff')}</span>
                </button>

                {/* 3. Book ICU Staff */}
                <button
                  onClick={() => {
                    const s = HEALTHCARE_SERVICES.find((x) => x.id === 'icu-patient-care-at-home');
                    if (s) navigateToBookingWithService(s);
                    else setCurrentPage('book');
                  }}
                  className="bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs sm:text-sm py-3 px-5 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <Activity className="w-4 h-4 text-sky-200" />
                  <span>{t('Book ICU Staff', 'Book ICU Staff')}</span>
                </button>

                {/* 4. Contact Us */}
                <button
                  onClick={() => setCurrentPage('contact')}
                  className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-semibold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-2xs transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Phone className="w-4 h-4 text-teal-600" />
                  <span>{t('Contact Us', 'Contact Us')}</span>
                </button>

                {/* 5. WhatsApp Button */}
                <a
                  href={`${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent('Hello Abhishek ji, I want to book patient care service in Dehradun.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm py-3 px-5 rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t('WhatsApp पर संपर्क करें', 'WhatsApp Us')}</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{t('100% पुलिस व मेडिकल सत्यापित', '100% Background Verified')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{t('2 से 4 घंटे में स्टाफ उपलब्धता', 'Staff at Doorstep in 2-4 Hours')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{t('बिना किसी हिडन चार्ज के', 'Zero Hidden Fees')}</span>
                </div>
              </div>

            </div>

            {/* Right Media Hero Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800"
                  alt="Compassionate elderly and patient home nursing care in Dehradun"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

                {/* Floating Highlight inside image */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-white/60 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-semibold text-teal-800 uppercase tracking-wider">
                        Health UK07 Care Coordinator
                      </p>
                      <h4 className="text-sm font-bold text-slate-900">
                        {BUSINESS_INFO.contactPerson}
                      </h4>
                      <p className="text-xs text-slate-600">
                        {t('शांति विहार, चकराता, देहरादून', 'Shanti Vihar, Chakrata Road, Dehradun')}
                      </p>
                    </div>

                    <a
                      href={`tel:+91${BUSINESS_INFO.whatsappNumber}`}
                      className="px-3 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{t('कॉल करें', 'Call Desk')}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. 24 HOURS CONTINUOUS CARE HIGHLIGHT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white border border-teal-800/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold tracking-wider uppercase">
              <Clock className="w-4 h-4" />
              <span>{t('24 Hours Patient Care की विशेष सुविधा', '24 Hours Dedicated Patient Care')}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">
              {t(
                'मरीज के पास दिन-रात रहने वाले रेजिडेंट नर्सिंग व केयरगिवर स्टाफ',
                'Round-The-Clock Resident Nursing & Trained Attendants at Home'
              )}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t(
                'बुजुर्ग मरीजों, बिस्तर पर लेटे (Bedridden) रोगियों, लकवा और आईसीयू से डिस्चार्ज हुए मरीजों के लिए 24 घंटे निरंतर निगरानी, समय पर दवा, पोषण और त्वरित सुरक्षा सहायता।',
                'Continuous day and night monitoring, posture turning, feeding, vitals tracking, and emergency readiness for bedridden or elderly family members.'
              )}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => {
                const s = HEALTHCARE_SERVICES.find((x) => x.id === '24-hours-patient-care');
                if (s) navigateToBookingWithService(s);
                else setCurrentPage('book');
              }}
              className="w-full sm:w-auto bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm py-3 px-6 rounded-xl transition-all cursor-pointer shadow-md text-center"
            >
              {t('24 घंटे स्टाफ बुक करें', 'Book 24 Hours Care')}
            </button>
            <a
              href={`tel:+91${BUSINESS_INFO.whatsappNumber}`}
              className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-medium text-xs sm:text-sm py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-teal-400" />
              <span>{BUSINESS_INFO.formattedPhone}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3. KEY HOME CARE SERVICES GRID (17 Services Highlight) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 uppercase tracking-wider">
              {t('हमारी सेवाएँ (Our Services)', 'Comprehensive Home Care')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              {t('विशेषज्ञ होम केयर व क्लिनिकल सेवाएँ', 'Specialized Home Care Services in Dehradun')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              {t(
                'प्रत्येक सेवा अधिकृत एवं प्रशिक्षित स्टाफ द्वारा प्रदान की जाती है। पारदर्शी कीमतें और तुरंत बुकिंग।',
                'Every service is rendered by certified healthcare personnel. Clear pricing and instant booking.'
              )}
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('services')}
            className="text-xs sm:text-sm font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1.5 cursor-pointer self-start md:self-auto"
          >
            <span>{t('सभी 17 सेवाएँ देखें', 'View All 17 Services')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => setCurrentPage('services')}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-xl transition-colors cursor-pointer shadow-xs"
          >
            <span>{t('सभी 17 सेवाएँ, विवरण और दरें देखें →', 'Explore All 17 Services & Full Price Catalog →')}</span>
          </button>
        </div>
      </section>

      {/* 4. HOW IT WORKS: 4 SIMPLE STEPS */}
      <section className="bg-slate-100 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 uppercase tracking-wider">
              {t('आसान प्रक्रिया', 'Booking Process')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              {t('मरीज घर बैठे स्टाफ कैसे बुक करेगा?', 'How Patients Book Staff in 4 Steps')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                titleHi: 'ऑनलाइन फॉर्म भरें',
                titleEn: 'Fill Online Form',
                descHi: 'मरीज का नाम, उम्र, पता (देहरादून) और जरूरी सेवा (नर्सिंग, ICU, GDA) चुनें।',
                descEn: 'Enter patient age, Dehradun address, and care requirement (Nursing, ICU, GDA).',
              },
              {
                step: '02',
                titleHi: 'Booking ID प्राप्त करें',
                titleEn: 'Receive Booking ID',
                descHi: 'सबमिट करते ही आपको यूनिक बुकिंग आईडी मिलेगी और WhatsApp पर शेयर कर सकेंगे।',
                descEn: 'Instant unique Booking ID generated with one-click WhatsApp confirmation.',
              },
              {
                step: '03',
                titleHi: 'स्टाफ उपलब्धता व सत्यापन',
                titleEn: 'Staff Verification',
                descHi: 'कोऑर्डिनेटर (Abhishek Chauhan) उपलब्धता की जाँच कर सर्वोत्तम योग्य स्टाफ नियुक्त करेंगे।',
                descEn: 'Our desk verifies registered staff matching your locality and shift needs.',
              },
              {
                step: '04',
                titleHi: 'घर पर सेवा शुरू',
                titleEn: 'Care at Your Home',
                descHi: 'सत्यापित स्टाफ तय समय पर आपके घर पहुँचेगा और सेवा शुरू करेगा।',
                descEn: 'Verified healthcare staff arrives at your home and begins compassionate care.',
              },
            ].map((s, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 relative shadow-2xs">
                <span className="text-3xl font-black text-teal-200 block mb-3 font-mono">
                  {s.step}
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {t(s.titleHi, s.titleEn)}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t(s.descHi, s.descEn)}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => setCurrentPage('book')}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm py-3 px-8 rounded-xl shadow-md cursor-pointer"
            >
              {t('अभी ऑनलाइन बुकिंग शुरू करें', 'Start Your Booking Now')}
            </button>
          </div>
        </div>
      </section>

      {/* 5. VERIFIED STAFF SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 uppercase tracking-wider">
              {t('सत्यापित स्टाफ', 'Verified Medical Staff')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              {t('देहरादून के अनुभवी नर्स व केयरगिवर्स', 'Experienced Caregivers in Dehradun')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {t('उत्तराखंड नर्सिंग काउंसिल से पंजीकृत व एडमिन द्वारा 100% सत्यापित स्टाफ।', 'Uttarakhand Nursing Council registered and admin-screened staff.')}
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('staff')}
            className="text-xs sm:text-sm font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1.5 cursor-pointer"
          >
            <span>{t('पूरा स्टाफ पूल देखें', 'Explore All Staff')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topStaff.map((member) => (
            <StaffCard key={member.id} staff={member} />
          ))}
        </div>
      </section>

      {/* 6. OUR EXPERIENCE & STATS */}
      <section className="bg-slate-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <span className="text-3xl sm:text-4xl font-black text-teal-400 font-mono">
                {BUSINESS_INFO.experienceYears}+
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">
                {t('वर्षों का सेवा अनुभव', 'Years of Experience')}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">{t('देहरादून व उत्तराखंड', 'Dehradun & UK')}</p>
            </div>

            <div className="p-4">
              <span className="text-3xl sm:text-4xl font-black text-teal-400 font-mono">
                {BUSINESS_INFO.patientsServed}
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">
                {t('मरीजों को मिली देखभाल', 'Patients Served')}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">{t('संतुष्ट परिवार', 'Satisfied Families')}</p>
            </div>

            <div className="p-4">
              <span className="text-3xl sm:text-4xl font-black text-teal-400 font-mono">
                {BUSINESS_INFO.activeStaffCount}
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">
                {t('सत्यापित हेल्थकेयर स्टाफ', 'Verified Healthcare Staff')}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">{t('नर्स, GDA व फिजियो', 'Nurses & Attendants')}</p>
            </div>

            <div className="p-4">
              <span className="text-3xl sm:text-4xl font-black text-teal-400 font-mono">
                100%
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">
                {t('पुलिस व मेडिकल सत्यापन', 'Police & Medical Cleared')}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">{t('सुरक्षा की गारंटी', 'Complete Safety')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SERVICE AREAS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 uppercase tracking-wider">
              {t('स्थानीय सेवा क्षेत्र', 'Service Coverage')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 mb-3">
              {t('देहरादून और आसपास के क्षेत्रों में हमारी सेवाएँ', 'Serving Every Corner of Dehradun')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mb-6">
              {t(
                'हम देहरादून के निम्नलिखित मुख्य क्षेत्रों में तुरंत 2 से 4 घंटे के भीतर सत्यापित हेल्थकेयर स्टाफ उपलब्ध कराते हैं:',
                'We ensure fast dispatch within 2 to 4 hours in the following key sectors and neighborhoods:'
              )}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {BUSINESS_INFO.serviceAreas.map((area, idx) => (
              <div key={idx} className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800">
                <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span className="truncate">{area}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-xs text-slate-600">
              <span className="font-bold text-slate-900">{t('व्यवसाय का नाम:', 'Business Name:')}</span> {BUSINESS_INFO.nameEn}
              <br />
              <span className="font-bold text-slate-900">{t('संपर्क व्यक्ति:', 'Contact Person:')}</span> {BUSINESS_INFO.contactPerson} ({BUSINESS_INFO.formattedPhone})
            </div>

            <button
              onClick={() => setCurrentPage('contact')}
              className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              {t('संपर्क विवरण व पता देखें →', 'View Contact & Map Details →')}
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
