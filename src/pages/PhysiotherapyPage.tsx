import React from 'react';
import { 
  Footprints, 
  Activity, 
  ShieldCheck, 
  CheckCircle2, 
  Calendar, 
  Phone, 
  MessageCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { HEALTHCARE_SERVICES } from '../data/servicesData';
import { BUSINESS_INFO } from '../data/initialData';

export const PhysiotherapyPage: React.FC = () => {
  const { t } = useLanguage();
  const { navigateToBookingWithService } = useApp();

  const physioService = HEALTHCARE_SERVICES.find((s) => s.id === 'physiotherapy-at-home') || HEALTHCARE_SERVICES[8];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="bg-gradient-to-br from-teal-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold text-teal-300 bg-teal-900/60 px-3 py-1 rounded-full border border-teal-700 uppercase tracking-wider inline-flex items-center gap-1.5">
            <Footprints className="w-3.5 h-3.5 text-teal-400" />
            <span>{t('Home Physiotherapy Sessions', 'Home Physiotherapy')}</span>
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {t(
              'घर पर विशेषज्ञ फिजियोथेरेपी – दर्द से राहत व तेज रिकवरी',
              'Expert In-Home Physiotherapy in Dehradun – Pain Relief & Mobility'
            )}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {t(
              'अस्पताल जाए बिना घर के आरामदायक माहौल में डिग्री धारक फिजियोथेरेपिस्ट (BPT / MPT) द्वारा व्यक्तिगत फिजियोथेरेपी। घुटने का दर्द, सर्वाइकल, साइटिका, नी रिप्लेसमेंट और स्ट्रोक रिहैब।',
              'Personalized in-home physiotherapy sessions by registered BPT/MPT physiotherapists. Proven rehabilitation for joint pain, knee/hip replacement, sciatica, cervical, and paralysis recovery.'
            )}
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => navigateToBookingWithService(physioService)}
              className="bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs sm:text-sm py-3 px-6 rounded-xl transition-all cursor-pointer shadow-md flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>{t('फिजियोथेरेपिस्ट बुक करें (₹600/विजिट)', 'Book Session (₹600/Visit)')}</span>
            </button>

            <a
              href={`${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent('Hello Abhishek ji, I want to book a Home Physiotherapist in Dehradun.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm py-3 px-5 rounded-xl shadow-md flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t('WhatsApp पर पूछें', 'Ask on WhatsApp')}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Common Conditions Treated */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 text-center">
          {t('घर पर किन समस्याओं का फिजियोथेरेपी उपचार किया जाता है?', 'Conditions Treated at Home')}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              titleHi: 'आर्थोपेडिक व जोड़ों का दर्द',
              titleEn: 'Orthopedic & Joint Pain',
              descHi: 'घुटने का दर्द (Osteoarthritis), फ्रोजन शोल्डर, सर्वाइकल स्पॉन्डिलाइटिस, कमर दर्द (Slip Disc / Sciatica)।',
              descEn: 'Knee osteoarthritis, frozen shoulder, cervical spondylosis, slip disc, and chronic low back pain.',
            },
            {
              titleHi: 'सर्जरी के बाद रिहैबिलिटेशन (Post-Op)',
              titleEn: 'Post-Surgical Rehabilitation',
              descHi: 'टोटल नी रिप्लेसमेंट (TKR), हिप रिप्लेसमेंट (THR) एवं फ्रैक्चर फिक्सेशन के बाद गतिशीलता और ताकत वापस लाना।',
              descEn: 'Total Knee Replacement (TKR), Total Hip Replacement (THR), and post-fracture joint mobilization.',
            },
            {
              titleHi: 'न्यूरोलॉजिकल रिहैब (Stroke Rehab)',
              titleEn: 'Neuro Rehabilitation & Stroke',
              descHi: 'स्ट्रोक के बाद लकवा (Paralysis/Hemiplegia), पार्किंसन और बैलेंस डिसऑर्डर के लिए न्यूरो-मस्कुलर री-एजुकेशन।',
              descEn: 'Post-stroke hemiplegia recovery, Parkinson gait balance, and neuro-motor retraining.',
            },
            {
              titleHi: 'बुजुर्गों के लिए मोबिलिटी व फॉल प्रिवेंशन',
              titleEn: 'Geriatric Balance & Fall Prevention',
              descHi: 'उम्रदराज मरीजों के लड़खड़ाते कदमों को स्थिर करना, वॉकर से चलने की ट्रेनिंग और गिरने से बचाव।',
              descEn: 'Gait stability exercises, walker transition, and fall risk mitigation for senior citizens.',
            },
            {
              titleHi: 'स्पोर्ट्स इंजरी व मस्कुलर स्ट्रेन',
              titleEn: 'Sports Injuries & Muscle Sprains',
              descHi: 'लिगामेंट टियर (ACL/MCL), एंकल स्प्रेन, टेनिस एल्बो और मांसपेशियों में खिंचाव का सटीक इलाज।',
              descEn: 'Ligament sprain recovery, rotator cuff strain, and therapeutic strengthening protocols.',
            },
            {
              titleHi: 'एडवांस्ड पोर्टेबल फिजियो मोडैलिटीज',
              titleEn: 'Modern Portable Modalities',
              descHi: 'थेरेपिस्ट पोर्टेबल TENS, IFT, अल्ट्रासाउंड और मसल स्टिमुलेटर मशीन घर लेकर आते हैं।',
              descEn: 'Therapists carry portable TENS, IFT, ultrasound, and electrical stimulation machines.',
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">{t(item.titleHi, item.titleEn)}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{t(item.descHi, item.descEn)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Session Details */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            {t('प्रत्येक सेशन 45 से 60 मिनट का होता है', 'Each Session Lasts 45–60 Minutes')}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            {t(
              'प्रमाणित BPT/MPT थेरेपिस्ट आपके घर आकर विस्तृत असेसमेंट करते हैं और पर्सनलाइज्ड एक्सरसाइज प्लान बनाते हैं।',
              'Dedicated one-on-one attention with structured stretching, manual therapy, and therapeutic exercise.'
            )}
          </p>
        </div>

        <div className="shrink-0 text-right">
          <span className="text-2xl font-black text-slate-900">₹600</span>
          <span className="text-xs text-slate-500 block">{t('प्रति सेशन / विजिट', 'Per Session / Visit')}</span>
        </div>
      </div>

    </div>
  );
};
