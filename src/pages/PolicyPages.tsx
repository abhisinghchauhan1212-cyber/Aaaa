import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  ShieldCheck, 
  FileText, 
  RotateCcw,
  AlertCircle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { FAQ_DATA, BUSINESS_INFO } from '../data/initialData';

export const FaqPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="text-center max-w-xl mx-auto">
        <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 uppercase tracking-wider">
          {t('अक्सर पूछे जाने वाले सवाल', 'Frequently Asked Questions')}
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 mb-2">
          {t('Health UK07 होम केयर FAQ', 'Frequently Asked Questions')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {t('मरीज देखभाल, स्टाफ योग्यता, समय व भुगतान से संबंधित मुख्य प्रश्नों के उत्तर।', 'Answers to common questions regarding home healthcare in Dehradun.')}
        </p>
      </div>

      <div className="space-y-3">
        {FAQ_DATA.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <span className="text-sm font-bold text-slate-900">
                  {language === 'hi' ? faq.questionHi : faq.questionEn}
                </span>
                {isOpen ? <ChevronUp className="w-4 h-4 text-teal-600 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
              </button>

              {isOpen && (
                <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                  {language === 'hi' ? faq.answerHi : faq.answerEn}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const PrivacyPolicyPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-6 text-slate-700 leading-relaxed">
        <div className="flex items-center gap-2 text-teal-700">
          <ShieldCheck className="w-6 h-6" />
          <h1 className="text-2xl font-bold text-slate-900">
            {t('मरीजों की गोपनीयता नीति (Privacy Policy)', 'Privacy Policy')}
          </h1>
        </div>

        <p className="text-xs sm:text-sm text-slate-600">
          {t(
            'Health UK07 मरीजों और उनके परिवारों की व्यक्तिगत और मेडिकल जानकारी की पूर्ण गोपनीयता और सुरक्षा बनाए रखने के लिए प्रतिबद्ध है।',
            'Health UK07 is firmly committed to protecting patient confidentiality and medical record privacy.'
          )}
        </p>

        <section className="space-y-2 text-xs sm:text-sm">
          <h3 className="font-bold text-slate-900">{t('1. एकत्र की जाने वाली जानकारी', '1. Information We Collect')}</h3>
          <p>
            {t(
              'बुकिंग के समय केवल मरीज का नाम, उम्र, संपर्क नंबर, देहरादून स्थित घर का पता और देखभाल संबंधी मेडिकल आवश्यकता एकत्र की जाती है।',
              'We collect basic patient details including name, age, contact telephone, Dehradun residential address, and clinical care requirements.'
            )}
          </p>
        </section>

        <section className="space-y-2 text-xs sm:text-sm">
          <h3 className="font-bold text-slate-900">{t('2. मेडिकल जानकारी की सुरक्षा', '2. Medical Data Confidentiality')}</h3>
          <p>
            {t(
              'मरीज की मेडिकल जानकारी सार्वजनिक नहीं की जाती। यह डेटा केवल उसी अधिकृत स्टाफ और केयर कोऑर्डिनेटर (Abhishek Chauhan) के साथ साझा किया जाता है जो सीधे मरीज की सेवा में नियुक्त हैं।',
              'Patient medical conditions are never shared publicly or sold. Information is accessible solely to assigned licensed healthcare personnel.'
            )}
          </p>
        </section>

        <section className="space-y-2 text-xs sm:text-sm">
          <h3 className="font-bold text-slate-900">{t('3. संपर्क एवं शिकायत निवारण', '3. Contact & Grievance')}</h3>
          <p>
            {t(
              'गोपनीयता संबंधी किसी भी प्रश्न के लिए आप सीधे 7906131879 पर संपर्क कर सकते हैं।',
              'For any privacy concerns, reach out to our grievance officer directly at 7906131879.'
            )}
          </p>
        </section>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-6 text-slate-700 leading-relaxed text-xs sm:text-sm">
        <div className="flex items-center gap-2 text-teal-700">
          <FileText className="w-6 h-6" />
          <h1 className="text-2xl font-bold text-slate-900">
            {t('नियम एवं शर्तें (Terms and Conditions)', 'Terms & Conditions')}
          </h1>
        </div>

        <section className="space-y-2">
          <h3 className="font-bold text-slate-900">{t('1. सेवा का स्वरूप', '1. Scope of Service')}</h3>
          <p>
            {t(
              'Health UK07 घर पर गैर-आपातकालीन मरीज देखभाल, नर्सिंग और फिजियोथेरेपी सुविधा उपलब्ध कराता है। आपातकालीन स्थिति में मरीज के परिजनों को 108 एंबुलेंस या अस्पताल आपातकालीन कक्ष में संपर्क करने की सलाह दी जाती है।',
              'Health UK07 coordinates certified home care, nursing, and physiotherapy. In life-threatening acute emergencies, call 108 ambulance immediately.'
            )}
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-bold text-slate-900">{t('2. डॉक्टर के पर्चे की अनिवार्यता', '2. Prescription Requirements')}</h3>
          <p>
            {t(
              'इंजेक्शन, आईवी ड्रिप, कैथेटर, राइल्स ट्यूब और वेंटिलेटर सेवा केवल पंजीकृत चिकित्सक (MBBS/MD) के वैध पर्चे पर ही दी जाएगी।',
              'Invasive medical procedures require a written prescription from the patient’s licensed physician.'
            )}
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-bold text-slate-900">{t('3. स्टाफ सुरक्षा एवं सम्मान', '3. Staff Safety & Respect')}</h3>
          <p>
            {t(
              'मरीज के घर पर हेल्थकेयर स्टाफ के साथ सम्मानजनक व सुरक्षित व्यवहार अनिवार्य है। 24 घंटे की ड्यूटी में स्टाफ के लिए उचित विश्राम व भोजन की व्यवस्था होनी चाहिए।',
              'Patients and families must provide a dignified, safe environment for visiting caregivers.'
            )}
          </p>
        </section>
      </div>
    </div>
  );
};

export const CancellationPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-6 text-slate-700 leading-relaxed text-xs sm:text-sm">
        <div className="flex items-center gap-2 text-teal-700">
          <RotateCcw className="w-6 h-6" />
          <h1 className="text-2xl font-bold text-slate-900">
            {t('कैंसलेशन व रिफंड नीति (Cancellation Policy)', 'Cancellation & Refund Policy')}
          </h1>
        </div>

        <section className="space-y-2">
          <h3 className="font-bold text-slate-900">{t('1. बुकिंग रद्द करने की शर्तें', '1. Shift Cancellation')}</h3>
          <p>
            {t(
              'ड्यूटी शिफ्ट शुरू होने से कम से कम 4 घंटे पहले सूचित करने पर बिना किसी शुल्क के बुकिंग रद्द की जा सकती है। 4 घंटे से कम समय पर सूचित करने पर उस शिफ्ट का न्यूनतम शुल्क देय हो सकता है।',
              'Cancellations made at least 4 hours prior to the shift incur zero penalty.'
            )}
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-bold text-slate-900">{t('2. निःशुल्क स्टाफ रिप्लेसमेंट', '2. Free Staff Replacement')}</h3>
          <p>
            {t(
              'यदि किसी कारणवश मरीज को स्टाफ की कार्यप्रणाली अनुकूल नहीं लगती, तो 24 घंटे में बिना किसी अतिरिक्त चार्ज के दूसरा सत्यापित स्टाफ उपलब्ध कराया जाएगा।',
              'If a caregiver is not suitable, we provide a qualified replacement within 24 hours at no extra cost.'
            )}
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-bold text-slate-900">{t('3. रिफंड प्रक्रिया', '3. Refund Turnaround')}</h3>
          <p>
            {t(
              'अग्रिम भुगतान की स्थिति में यदि मरीज पहले डिस्चार्ज हो जाता है, तो अप्रयुक्त दिनों का रिफंड 2 कार्यदिवसों के भीतर उसी UPI/बैंक खाते में वापस कर दिया जाएगा।',
              'Any unused advance balance is refunded directly to your UPI/bank account within 2 business days.'
            )}
          </p>
        </section>
      </div>
    </div>
  );
};
