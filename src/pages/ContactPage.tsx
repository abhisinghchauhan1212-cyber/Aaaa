import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Mail, 
  Send, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  Calendar,
  Building
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { BUSINESS_INFO } from '../data/initialData';
import { ContactEnquiry } from '../types';

export const ContactPage: React.FC = () => {
  const { t } = useLanguage();
  const { addEnquiry, setCurrentPage } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceNeeded, setServiceNeeded] = useState('Home Patient Care (घर पर मरीज देखभाल)');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const newEnq: ContactEnquiry = {
      id: `enq-${Date.now()}`,
      name: name.trim(),
      phone: phone.trim(),
      serviceNeeded,
      message: message.trim() || 'General enquiry from contact page',
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    addEnquiry(newEnq);
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 uppercase tracking-wider">
          {t('हमसे संपर्क करें (Contact Us)', 'Contact & Support')}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 mb-3">
          {t('Health UK07 हेल्पडेस्क से जुड़ें', 'Connect with Health UK07 Helpdesk')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {t(
            'देहरादून, शांति विहार और चकराता में मरीज देखभाल, नर्सिंग या ICU स्टाफ के लिए सीधे संपर्क करें। 24 घंटे त्वरित सहायता।',
            'Direct access to our care coordination desk for Shanti Vihar, Chakrata, and all Dehradun sectors.'
          )}
        </p>
      </div>

      {/* 4 Prominent Buttons Section Requested by User */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* 1. Call Now */}
        <a
          href={`tel:+91${BUSINESS_INFO.whatsappNumber}`}
          className="p-5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white flex flex-col items-center justify-center text-center shadow-sm transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-800 group-hover:bg-slate-700 flex items-center justify-center text-teal-400 mb-2">
            <Phone className="w-5 h-5" />
          </div>
          <span className="text-sm font-bold block">{t('Call Now', 'Call Now')}</span>
          <span className="text-[11px] text-teal-300 font-mono mt-0.5">{BUSINESS_INFO.formattedPhone}</span>
        </a>

        {/* 2. WhatsApp Now */}
        <a
          href={`${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent('Hello Abhishek ji, I want to inquire about home patient care in Dehradun.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white flex flex-col items-center justify-center text-center shadow-sm transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-700 group-hover:bg-emerald-800 flex items-center justify-center text-white mb-2">
            <MessageCircle className="w-5 h-5" />
          </div>
          <span className="text-sm font-bold block">{t('WhatsApp Now', 'WhatsApp Now')}</span>
          <span className="text-[11px] text-emerald-100 mt-0.5">{t('सीधी चैट खोलें', 'Open Direct Chat')}</span>
        </a>

        {/* 3. Book a Service */}
        <button
          onClick={() => setCurrentPage('book')}
          className="p-5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white flex flex-col items-center justify-center text-center shadow-sm transition-all group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-700 group-hover:bg-teal-800 flex items-center justify-center text-white mb-2">
            <Calendar className="w-5 h-5" />
          </div>
          <span className="text-sm font-bold block">{t('Book a Service', 'Book a Service')}</span>
          <span className="text-[11px] text-teal-100 mt-0.5">{t('ऑनलाइन फॉर्म', 'Online Booking')}</span>
        </button>

        {/* 4. Send an Enquiry */}
        <a
          href="#enquiry-form"
          className="p-5 rounded-2xl bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 flex flex-col items-center justify-center text-center shadow-2xs transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center text-slate-700 mb-2">
            <Send className="w-5 h-5" />
          </div>
          <span className="text-sm font-bold block">{t('Send an Enquiry', 'Send an Enquiry')}</span>
          <span className="text-[11px] text-slate-500 mt-0.5">{t('पूछताछ भेजें', 'Quick Message')}</span>
        </a>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Contact Info Card */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              {t('व्यावसायिक विवरण (Business Information)', 'Business Information')}
            </h3>
            <p className="text-xs text-slate-500">
              {t('उत्तराखंड में सत्यापित मरीज देखभाल नेटवर्क', 'Registered Home Care Provider in Uttarakhand')}
            </p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
              <Building className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">{t('व्यवसाय का नाम:', 'Business Name:')}</span>
                <span className="text-slate-700 font-medium">Health UK07 – Home Care Services</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
              <Phone className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">{t('संपर्क व्यक्ति (Contact Person):', 'Contact Person:')}</span>
                <span className="text-slate-800 font-medium text-sm">Abhishek Chauhan</span>
                <p className="text-slate-500 text-xs mt-0.5">Phone: {BUSINESS_INFO.formattedPhone}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-start gap-3">
              <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-emerald-950 block">{t('आधिकारिक WhatsApp नंबर:', 'Official WhatsApp:')}</span>
                <a 
                  href={`${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent('Hello Abhishek ji, I need home patient care assistance.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 hover:underline font-bold text-sm block"
                >
                  7906131879
                </a>
                <p className="text-slate-600 text-[11px] mt-0.5">
                  {t('बुकिंग, सवाल व मेडिकल रिपोर्ट साझा करने हेतु', 'For instant inquiries & reports')}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">{t('मुख्य सेवा क्षेत्र (Primary Service Areas):', 'Primary Service Areas:')}</span>
                <ul className="text-slate-700 mt-1 space-y-1">
                  <li className="font-semibold text-teal-900">1. Shanti Vihar, Dehradun, Uttarakhand</li>
                  <li className="font-semibold text-teal-900">2. Chakrata & Chakrata Road, Dehradun</li>
                  <li className="text-slate-600 text-xs">Rajpur Road, Clement Town, Prem Nagar, Sahastradhara Road</li>
                </ul>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
              <Clock className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">{t('हेल्पडेस्क समय:', 'Operating Hours:')}</span>
                <span className="text-slate-700">24 Hours / 7 Days a week (मरीज देखभाल निरंतर)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enquiry Form */}
        <div id="enquiry-form" className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8">
          <h3 className="text-lg font-bold text-slate-900 mb-1">
            {t('पूछताछ संदेश भेजें (Send an Enquiry)', 'Send an Enquiry')}
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            {t(
              'अपना संदेश छोड़ें, हमारी टीम (Abhishek Chauhan) तुरंत आपसे संपर्क करेगी।',
              'Leave your message below; our care coordinator will call or message you promptly.'
            )}
          </p>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
              <h4 className="text-base font-bold text-slate-900">
                {t('संदेश सफलतापूर्वक प्राप्त हुआ!', 'Enquiry Received!')}
              </h4>
              <p className="text-xs text-slate-600 mt-1 mb-4">
                {t(
                  'धन्यवाद! Abhishek Chauhan जल्द ही आपके फोन नंबर पर संपर्क करेंगे।',
                  'Thank you! Abhishek Chauhan will contact your phone number shortly.'
                )}
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-xs text-teal-700 font-bold hover:underline"
              >
                {t('दूसरा संदेश भेजें', 'Send Another Enquiry')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitEnquiry} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t('आपका नाम (Your Name) *', 'Your Name *')}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('उदा. हरीश सिंह', 'e.g. Harish Singh')}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-hidden focus:border-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t('फोन / WhatsApp नंबर *', 'Phone / WhatsApp *')}
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="7906131879"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-hidden focus:border-teal-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {t('किस सेवा की जानकारी चाहिए? *', 'Service Needed *')}
                </label>
                <select
                  value={serviceNeeded}
                  onChange={(e) => setServiceNeeded(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                >
                  <option value="Home Patient Care">Home Patient Care (घर पर मरीज देखभाल)</option>
                  <option value="24 Hours Patient Care">24 Hours Patient Care (24 घंटे मरीज देखभाल)</option>
                  <option value="Nursing Staff at Home">Nursing Staff at Home (घर पर नर्सिंग स्टाफ)</option>
                  <option value="ICU Patient Care at Home">ICU Patient Care at Home (होम ICU केयर)</option>
                  <option value="Critical Patient Care">Critical Patient Care (गंभीर मरीज देखभाल)</option>
                  <option value="GDA Staff at Home">GDA Staff at Home (जी.डी.ए. केयरगिवर)</option>
                  <option value="Physiotherapy at Home">Physiotherapy at Home (घर पर फिजियोथेरेपी)</option>
                  <option value="Dressing & Wound Care">Dressing & Wound Care (घाव की ड्रेसिंग)</option>
                  <option value="Catheter Care">Catheter Care (कैथेटर केयर)</option>
                  <option value="Other Assistance">Other / अन्य पूछताछ</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {t('मरीज की समस्या या कोई विशेष प्रश्न (Message) *', 'Your Message / Patient Condition *')}
                </label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t(
                    'मरीज की उम्र, समस्या व क्षेत्र (उदा. शांति विहार में 12 घंटे के लिए नर्स चाहिए)...',
                    'Describe patient condition and requirement in Dehradun...'
                  )}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-hidden"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm py-3 px-6 rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{t('पूछताछ सबमिट करें (Send Enquiry)', 'Send Enquiry Message')}</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
