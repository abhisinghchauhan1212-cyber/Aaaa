import React, { useState } from 'react';
import { 
  DollarSign, 
  CheckCircle2, 
  HelpCircle, 
  Calendar, 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  Calculator,
  QrCode,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { HEALTHCARE_SERVICES } from '../data/servicesData';
import { ShiftDuration } from '../types';
import { calculateEstimatedPrice } from '../utils/bookingUtils';
import { BUSINESS_INFO } from '../data/initialData';

export const PricingPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { setCurrentPage, setSelectedServiceForBooking } = useApp();

  // Quote Calculator State
  const [calcServiceId, setCalcServiceId] = useState('home-patient-care');
  const [calcDuration, setCalcDuration] = useState<ShiftDuration>('12h_day');
  const [calcDays, setCalcDays] = useState(7);

  const selectedService = HEALTHCARE_SERVICES.find((s) => s.id === calcServiceId) || HEALTHCARE_SERVICES[0];
  const unitRate = calculateEstimatedPrice(selectedService.basePrice, calcDuration);
  const totalCalculated = unitRate * calcDays;

  const handleBookFromQuote = () => {
    setSelectedServiceForBooking(selectedService);
    setCurrentPage('book');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 uppercase tracking-wider">
          {t('पारदर्शी शुल्क तालिका', 'Transparent Rate Card')}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 mb-3">
          {t('Health UK07 सेवा दरें एवं पैकेज (Dehradun Rates)', 'Home Care Pricing & Custom Packages')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {t(
            'कोई छिपा हुआ शुल्क (No Hidden Charges) नहीं। 12 घंटे ड्यूटी, 24 घंटे लाइव-इन, प्रति-विजिट और मासिक पैकेज के लिए निर्धारित दरें।',
            'No hidden charges or registration fees. Clear and affordable standard rates for 12-hour shifts, 24-hour continuous care, single clinical visits, and monthly care plans.'
          )}
        </p>
      </div>

      {/* Interactive "Get a Quote" Calculator */}
      <div className="bg-gradient-to-br from-teal-900 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Calculator className="w-4 h-4" />
            <span>{t('कीमत कैलकुलेटर (Get an Instant Quote)', 'Instant Price Estimate Calculator')}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mb-6">
            {t('अपनी जरूरत के अनुसार अनुमानित खर्च जानें', 'Calculate Your Estimated Care Cost')}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {t('सेवा चुनें', 'Choose Service')}
              </label>
              <select
                value={calcServiceId}
                onChange={(e) => setCalcServiceId(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white outline-hidden font-medium"
              >
                {HEALTHCARE_SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {language === 'hi' ? s.nameHi : s.nameEn}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {t('ड्यूटी का समय / शिफ्ट', 'Shift / Duration')}
              </label>
              <select
                value={calcDuration}
                onChange={(e) => setCalcDuration(e.target.value as ShiftDuration)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white outline-hidden font-medium"
              >
                <option value="12h_day">{t('12 घंटे (दिन ड्यूटी)', '12 Hours (Day)')}</option>
                <option value="12h_night">{t('12 घंटे (रात ड्यूटी)', '12 Hours (Night)')}</option>
                <option value="24h_live_in">{t('24 घंटे (रेजिडेंट केयर)', '24 Hours (Live-in)')}</option>
                <option value="per_visit">{t('प्रति विजिट / प्रोसीजर', 'Per Visit / Procedure')}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {t('दिनों की संख्या (Days)', 'Number of Days')}
              </label>
              <select
                value={calcDays}
                onChange={(e) => setCalcDays(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white outline-hidden font-medium"
              >
                <option value="1">1 {t('दिन', 'Day')}</option>
                <option value="3">3 {t('दिन', 'Days')}</option>
                <option value="7">7 {t('दिन (1 सप्ताह)', 'Days (1 Week)')}</option>
                <option value="15">15 {t('दिन (2 सप्ताह)', 'Days (2 Weeks)')}</option>
                <option value="30">30 {t('दिन (मासिक पैकेज)', 'Days (1 Month)')}</option>
              </select>
            </div>
          </div>

          <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-400 block">{t('कुल अनुमानित पैकेज दर:', 'Estimated Package Amount:')}</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-teal-300">
                  ₹{totalCalculated.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-slate-400">
                  (₹{unitRate.toLocaleString('en-IN')} x {calcDays} {t('दिन', 'Days')})
                </span>
              </div>
              <p className="text-[11px] text-emerald-400 mt-1">
                {t('✓ 15 दिन या अधिक के पैकेज पर स्टाफ रिप्लेसमेंट की पूरी गारंटी', '✓ Free staff replacement guarantee on 15+ days plans')}
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleBookFromQuote}
                className="w-full sm:w-auto bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs py-3 px-6 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>{t('इस कोटेशन पर बुक करें', 'Book With This Quote')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Standard Duty Pricing Cards */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 text-center">
          {t('मानक ड्यूटी विकल्प (Standard Shift Options)', 'Standard Shift Options')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {t('डेली सपोर्ट', 'Daily Support')}
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1 mb-2">
                {t('12 घंटे ड्यूटी', '12 Hours Shift')}
              </h3>
              <p className="text-xs text-slate-600 mb-4">
                {t('दिन में 8 AM से 8 PM या रात में 8 PM से 8 AM तक समर्पित स्टाफ।', '8 AM to 8 PM day or 8 PM to 8 AM night single dedicated shift.')}
              </p>
              <div className="mb-4">
                <span className="text-2xl font-black text-slate-900">₹900 - ₹1,800</span>
                <span className="text-xs text-slate-500 block">{t('प्रति 12 घंटे (स्टाफ श्रेणी अनुसार)', 'Per 12 hours')}</span>
              </div>
            </div>
            <button
              onClick={() => setCurrentPage('book')}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-teal-50 hover:text-teal-800 text-xs font-semibold text-slate-700 border border-slate-200 transition-colors"
            >
              {t('12 घंटे बुक करें', 'Book 12h')}
            </button>
          </div>

          <div className="bg-white rounded-2xl border-2 border-teal-600 p-6 flex flex-col justify-between relative shadow-md">
            <span className="absolute -top-3 right-4 bg-teal-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
              {t('सर्वाधिक लोकप्रिय', 'Most Popular')}
            </span>
            <div>
              <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
                {t('लगातार देखभाल', 'Continuous Care')}
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1 mb-2">
                {t('24 घंटे रेजिडेंट केयर', '24 Hours Resident')}
              </h3>
              <p className="text-xs text-slate-600 mb-4">
                {t('दिन-रात मरीज के घर पर रहकर सेवा। रात में निगरानी, दवा और सुरक्षा।', 'Caregiver stays at home round-the-clock for peace of mind.')}
              </p>
              <div className="mb-4">
                <span className="text-2xl font-black text-slate-900">₹2,200 - ₹3,500</span>
                <span className="text-xs text-slate-500 block">{t('प्रति 24 घंटे', 'Per 24 hours')}</span>
              </div>
            </div>
            <button
              onClick={() => setCurrentPage('book')}
              className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold transition-colors shadow-xs"
            >
              {t('24 घंटे बुक करें', 'Book 24h')}
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {t('क्लिनिकल प्रोसीजर', 'Clinical Procedures')}
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1 mb-2">
                {t('प्रति विजिट / प्रोसीजर', 'Per Visit / Procedure')}
              </h3>
              <p className="text-xs text-slate-600 mb-4">
                {t('फिजियोथेरेपी सेशन, घाव की ड्रेसिंग, कैथेटर लगाना या इंजेक्शन लगाना।', 'Short procedure visits for dressings, catheter insertion, injections.')}
              </p>
              <div className="mb-4">
                <span className="text-2xl font-black text-slate-900">₹500 - ₹700</span>
                <span className="text-xs text-slate-500 block">{t('प्रति विजिट / सेशन', 'Per visit / procedure')}</span>
              </div>
            </div>
            <button
              onClick={() => setCurrentPage('book')}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-teal-50 hover:text-teal-800 text-xs font-semibold text-slate-700 border border-slate-200 transition-colors"
            >
              {t('विजिट बुक करें', 'Book Visit')}
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {t('मासिक बचत', 'Monthly Care')}
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1 mb-2">
                {t('30-दिवसीय केयर पैकेज', 'Monthly Package')}
              </h3>
              <p className="text-xs text-slate-600 mb-4">
                {t('दीर्घकालिक मरीजों के लिए विशेष रियायती दर और तत्काल स्टाफ रिप्लेसमेंट।', 'Long-term patient care with discounted bulk rate and priority backup.')}
              </p>
              <div className="mb-4">
                <span className="text-2xl font-black text-slate-900">Custom Quote</span>
                <span className="text-xs text-slate-500 block">{t('कोऑर्डिनेटर से सीधे बात करें', 'Direct quote with Abhishek')}</span>
              </div>
            </div>
            <a
              href={`${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent('Hello Abhishek ji, I want a monthly package quote for home patient care in Dehradun.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold text-center"
            >
              {t('कोटेशन प्राप्त करें', 'Get Quote')}
            </a>
          </div>
        </div>
      </div>

      {/* Payment Modes & Refund Policy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200">
          <div className="flex items-center gap-2 mb-3">
            <QrCode className="w-5 h-5 text-teal-600" />
            <h3 className="text-base font-bold text-slate-900">
              {t('भुगतान विकल्प (UPI & Digital Payment)', 'Payment Options')}
            </h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed mb-4">
            {t(
              'बुकिंग के बाद और स्टाफ की उपलब्धता सुनिश्चित होने पर आप गूगल पे (Google Pay), फोनपे (PhonePe), पेटीएम (Paytm) अथवा नेट बैंकिंग के माध्यम से सुरक्षित भुगतान कर सकते हैं।',
              'Payment is accepted directly via UPI (Google Pay, PhonePe, Paytm QR), IMPS Bank Transfer, or Cash on service initiation.'
            )}
          </p>
          <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
            <p><span className="font-semibold text-slate-900">UPI VPA:</span> 7906131879@upi</p>
            <p><span className="font-semibold text-slate-900">{t('प्राप्तकर्ता:', 'Recipient:')}</span> Health UK07 (Abhishek Chauhan)</p>
          </div>
        </div>

        <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="w-5 h-5 text-teal-600" />
            <h3 className="text-base font-bold text-slate-900">
              {t('कैंसलेशन व रिफंड की शर्तें (Cancellation & Refund)', 'Cancellation & Refund Summary')}
            </h3>
          </div>
          <ul className="text-xs text-slate-600 space-y-2">
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{t('ड्यूटी शुरू होने से 4 घंटे पूर्व रद्द करने पर कोई कैंसलेशन चार्ज नहीं।', 'Zero cancellation fee if cancelled at least 4 hours before shift.')}</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{t('यदि स्टाफ पसंद न आए, तो 24 घंटे में बिना किसी शुल्क के रिप्लेसमेंट।', 'Free staff replacement within 24 hours if not satisfied.')}</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{t('अप्रयुक्त दिनों की अग्रिम राशि 2 कार्यदिवसों में सीधे खाते में वापस।', 'Unused advance balance refunded within 2 business days.')}</span>
            </li>
          </ul>
        </div>
      </div>

    </div>
  );
};
