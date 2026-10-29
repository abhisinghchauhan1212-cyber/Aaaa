import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  MessageCircle, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck,
  Send,
  Printer,
  ChevronRight,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { HEALTHCARE_SERVICES } from '../data/servicesData';
import { BUSINESS_INFO } from '../data/initialData';
import { Booking, ShiftDuration } from '../types';
import { 
  generateBookingId, 
  calculateEstimatedPrice, 
  formatWhatsAppBookingMessage, 
  validateBookingForm,
  BookingValidationErrors
} from '../utils/bookingUtils';

export const BookingForm: React.FC = () => {
  const { language, t } = useLanguage();
  const { 
    addBooking, 
    selectedServiceForBooking, 
    setSelectedServiceForBooking,
    selectedStaffForBooking,
    setSelectedStaffForBooking,
    setCurrentPage
  } = useApp();

  // Form State
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [mobileNumber, setMobileNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [sameAsMobile, setSameAsMobile] = useState(true);
  const [locality, setLocality] = useState(BUSINESS_INFO.serviceAreas[0]);
  const [customLocality, setCustomLocality] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [patientCondition, setPatientCondition] = useState('');
  const [serviceId, setServiceId] = useState(
    selectedServiceForBooking ? selectedServiceForBooking.id : 'home-patient-care'
  );
  const [duration, setDuration] = useState<ShiftDuration>('12h_day');
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [startTime, setStartTime] = useState('09:00 AM');
  const [specialInstructions, setSpecialInstructions] = useState('');
  
  // Submission result state
  const [submittedBooking, setSubmittedBooking] = useState<Booking | null>(null);
  const [formErrors, setFormErrors] = useState<BookingValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync if service changed externally
  useEffect(() => {
    if (selectedServiceForBooking) {
      setServiceId(selectedServiceForBooking.id);
    }
  }, [selectedServiceForBooking]);

  const activeService = HEALTHCARE_SERVICES.find((s) => s.id === serviceId) || HEALTHCARE_SERVICES[0];
  const estimatedCost = calculateEstimatedPrice(activeService.basePrice, duration);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validation = validateBookingForm({
      patientName,
      patientAge,
      mobileNumber,
      fullAddress,
      serviceId,
      startDate,
    });

    if (!validation.isValid) {
      setFormErrors(validation.errors);
      setIsSubmitting(false);
      window.scrollTo({ top: 300, behavior: 'smooth' });
      return;
    }

    setFormErrors({});

    const chosenLocality = locality === 'Other (अन्य क्षेत्र)' ? customLocality : locality;
    const newBookingId = generateBookingId();

    const newBooking: Booking = {
      id: newBookingId,
      patientName: patientName.trim(),
      patientAge: Number(patientAge),
      patientGender,
      mobileNumber: mobileNumber.trim(),
      whatsappNumber: (sameAsMobile ? mobileNumber : whatsappNumber).trim(),
      city: 'Dehradun',
      locality: chosenLocality || 'Dehradun',
      fullAddress: fullAddress.trim(),
      patientCondition: patientCondition.trim() || 'General care assistance requested',
      serviceId: activeService.id,
      serviceName: language === 'hi' ? activeService.nameHi : activeService.nameEn,
      duration,
      startDate,
      startTime,
      specialInstructions: specialInstructions.trim(),
      preferredStaffId: selectedStaffForBooking?.id,
      assignedStaffId: undefined,
      assignedStaffName: undefined,
      status: 'Booking Received',
      createdAt: new Date().toISOString(),
      estimatedPrice: estimatedCost,
      adminNotes: selectedStaffForBooking ? `Preferred staff requested: ${selectedStaffForBooking.name}` : undefined,
    };

    // Save to state & storage
    addBooking(newBooking);
    setSubmittedBooking(newBooking);
    setIsSubmitting(false);
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  const handlePrintSlip = () => {
    window.print();
  };

  // If submitted, show the confirmation screen
  if (submittedBooking) {
    const waUrl = `${BUSINESS_INFO.whatsappUrl}?text=${formatWhatsAppBookingMessage(submittedBooking)}`;

    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl border border-emerald-200 shadow-xl p-6 sm:p-10 text-center animate-in fade-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-5 shadow-xs">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            {t('बुकिंग सफलतापूर्वक प्राप्त हुई', 'Booking Received Successfully')}
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 mb-2">
            {t('आपकी बुकिंग आईडी (Booking ID):', 'Your Booking ID:')}
          </h2>

          <div className="inline-block bg-slate-900 text-teal-400 font-mono text-xl sm:text-2xl font-black px-6 py-2.5 rounded-xl shadow-inner my-2">
            {submittedBooking.id}
          </div>

          <p className="text-sm text-slate-600 max-w-lg mx-auto mt-2 mb-6">
            {t(
              'हमारी हेल्थकेयर कोऑर्डिनेटर टीम (Abhishek Chauhan) आपके द्वारा दिए गए नंबर पर तुरंत संपर्क कर स्टाफ की उपलब्धता की पुष्टि करेगी।',
              'Our care coordination team (Abhishek Chauhan) will review verified staff availability and contact you shortly.'
            )}
          </p>

          {/* Booking Summary Box */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 text-left mb-6 space-y-2.5 text-xs sm:text-sm">
            <div className="flex justify-between border-b border-slate-200/80 pb-2">
              <span className="text-slate-500">{t('मरीज का नाम:', 'Patient Name:')}</span>
              <span className="font-semibold text-slate-900">{submittedBooking.patientName} ({submittedBooking.patientAge} yrs, {submittedBooking.patientGender})</span>
            </div>
            <div className="flex justify-between border-b border-slate-200/80 pb-2">
              <span className="text-slate-500">{t('चुनी गई सेवा:', 'Requested Service:')}</span>
              <span className="font-semibold text-teal-900">{submittedBooking.serviceName}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200/80 pb-2">
              <span className="text-slate-500">{t('शुरुआत की तारीख व समय:', 'Start Date & Time:')}</span>
              <span className="font-medium text-slate-900">{submittedBooking.startDate} at {submittedBooking.startTime}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200/80 pb-2">
              <span className="text-slate-500">{t('स्थान / पता:', 'Location / Address:')}</span>
              <span className="font-medium text-slate-900 text-right max-w-xs truncate">{submittedBooking.locality}, {submittedBooking.fullAddress}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200/80 pb-2">
              <span className="text-slate-500">{t('अनुमानित शुल्क:', 'Estimated Rate:')}</span>
              <span className="font-bold text-slate-900">₹{submittedBooking.estimatedPrice.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center pt-1">
              <span className="text-slate-500">{t('वर्तमान स्थिति:', 'Live Status:')}</span>
              <span className="px-2.5 py-1 rounded bg-amber-100 text-amber-800 font-bold text-xs">
                {t('Booking Received (समीक्षा में)', 'Booking Received (Under Review)')}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm py-3 px-6 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t('WhatsApp पर बुकिंग भेजें (7906131879)', 'Send Details on WhatsApp')}</span>
            </a>

            <button
              onClick={() => setCurrentPage('track')}
              className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm py-3 px-6 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>{t('लाइव स्टेटस ट्रैक करें', 'Track Live Status')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handlePrintSlip}
              className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs sm:text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 border border-slate-200 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>{t('स्लिप प्रिंट करें', 'Print Slip')}</span>
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-4 text-xs text-slate-500">
            <button
              onClick={() => {
                setSubmittedBooking(null);
                setSelectedStaffForBooking(null);
                setSelectedServiceForBooking(null);
              }}
              className="text-teal-700 hover:underline cursor-pointer font-medium"
            >
              {t('← दूसरी बुकिंग करें', '← Make Another Booking')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 uppercase tracking-wider">
          {t('ऑनलाइन मरीज सेवा बुकिंग', 'Online Home Patient Care Booking')}
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 mb-3">
          {t('घर बैठे योग्य हेल्थकेयर स्टाफ बुक करें', 'Book Qualified Healthcare Staff at Home')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {t(
            'देहरादून और आसपास के क्षेत्रों के लिए सत्यापित नर्स, जी.डी.ए., आईसीयू स्टाफ और फिजियोथेरेपिस्ट। फॉर्म भरें, हम तुरंत उपलब्धता की पुष्टि करेंगे।',
            'Verified nurses, GDAs, ICU attendants, and physiotherapists in Dehradun & Uttarakhand. Submit requirements below for immediate confirmation.'
          )}
        </p>
      </div>

      {/* Preferred Staff Banner if user clicked "Book This Staff" */}
      {selectedStaffForBooking && (
        <div className="mb-6 p-4 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={selectedStaffForBooking.photoUrl}
              alt={selectedStaffForBooking.name}
              className="w-12 h-12 rounded-xl object-cover border border-teal-300"
            />
            <div>
              <p className="text-xs text-teal-800 font-semibold">
                {t('पसंदीदा स्टाफ चुना गया है:', 'Preferred Staff Selected:')}
              </p>
              <h4 className="text-sm font-bold text-slate-900">
                {selectedStaffForBooking.name} ({selectedStaffForBooking.roleEn})
              </h4>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSelectedStaffForBooking(null)}
            className="text-xs text-slate-500 hover:text-red-600 underline cursor-pointer"
          >
            {t('हटाएँ', 'Remove')}
          </button>
        </div>
      )}

      {/* Main Booking Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8">
        
        {/* Section 1: Patient Information */}
        <div>
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
            <User className="w-5 h-5 text-teal-600" />
            <h2 className="text-base font-bold text-slate-900">
              {t('1. मरीज का विवरण (Patient Information)', '1. Patient Information')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {t('मरीज का पूरा नाम *', 'Patient Full Name *')}
              </label>
              <input
                type="text"
                required
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder={t('उदा. रमेश चन्द्र जोशी', 'e.g. Ramesh Chandra Joshi')}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-sm outline-hidden transition-all"
              />
              {formErrors.patientName && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {formErrors.patientName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {t('उम्र (Age) *', 'Age *')}
              </label>
              <input
                type="number"
                min="1"
                max="120"
                required
                value={patientAge}
                onChange={(e) => setPatientAge(e.target.value)}
                placeholder="72"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-sm outline-hidden transition-all"
              />
              {formErrors.patientAge && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {formErrors.patientAge}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {t('लिंग (Gender) *', 'Gender *')}
              </label>
              <select
                value={patientGender}
                onChange={(e) => setPatientGender(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-sm bg-white outline-hidden"
              >
                <option value="Male">{t('पुरुष (Male)', 'Male')}</option>
                <option value="Female">{t('महिला (Female)', 'Female')}</option>
                <option value="Other">{t('अन्य (Other)', 'Other')}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {t('मोबाइल नंबर *', 'Mobile Number *')}
              </label>
              <input
                type="tel"
                required
                maxLength={10}
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="9876543210"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-sm outline-hidden"
              />
              {formErrors.mobileNumber && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {formErrors.mobileNumber}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {t('WhatsApp नंबर *', 'WhatsApp Number *')}
              </label>
              <input
                type="tel"
                disabled={sameAsMobile}
                value={sameAsMobile ? mobileNumber : whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="9876543210"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 disabled:bg-slate-50 text-sm outline-hidden"
              />
              <label className="flex items-center gap-1.5 text-xs text-slate-600 mt-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sameAsMobile}
                  onChange={(e) => setSameAsMobile(e.target.checked)}
                  className="rounded text-teal-600"
                />
                <span>{t('मोबाइल नंबर ही WhatsApp है', 'Same as Mobile Number')}</span>
              </label>
            </div>
          </div>
        </div>

        {/* Section 2: Address in Dehradun */}
        <div>
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
            <MapPin className="w-5 h-5 text-teal-600" />
            <h2 className="text-base font-bold text-slate-900">
              {t('2. मरीज का शहर और पूरा पता (Address & Location)', '2. Patient Address in Dehradun')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {t('देहरादून क्षेत्र / कॉलोनी (Locality) *', 'Dehradun Locality *')}
              </label>
              <select
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-sm bg-white outline-hidden"
              >
                {BUSINESS_INFO.serviceAreas.map((area, idx) => (
                  <option key={idx} value={area}>{area}</option>
                ))}
                <option value="Other (अन्य क्षेत्र)">{t('अन्य क्षेत्र (Other Locality in Uttarakhand)', 'Other Locality')}</option>
              </select>
            </div>

            {locality === 'Other (अन्य क्षेत्र)' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {t('क्षेत्र का नाम लिखें *', 'Specify Locality Name *')}
                </label>
                <input
                  type="text"
                  value={customLocality}
                  onChange={(e) => setCustomLocality(e.target.value)}
                  placeholder={t('उदा. डाकपत्थर, विकासनगर, ऋषिकेश', 'e.g. Dakpathar, Rishikesh')}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>
            )}

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {t('मकान नंबर, गली व पूरा लैंडमार्क (Full Address) *', 'House No., Street & Complete Address *')}
              </label>
              <input
                type="text"
                required
                value={fullAddress}
                onChange={(e) => setFullAddress(e.target.value)}
                placeholder={t('उदा. मकान न. 12, लेन नंबर 3, शांति विहार, चकराता रोड, देहरादून', 'e.g. House 12, Lane 3, Shanti Vihar, Chakrata Road, Dehradun')}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-sm outline-hidden"
              />
              {formErrors.fullAddress && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {formErrors.fullAddress}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Section 3: Care Need & Service Selection */}
        <div>
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
            <FileText className="w-5 h-5 text-teal-600" />
            <h2 className="text-base font-bold text-slate-900">
              {t('3. कौन-सी सेवा चाहिए? (Required Service & Medical Condition)', '3. Service & Condition')}
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {t('सेवा का चयन करें (17 आधिकारिक सेवाएँ) *', 'Select Healthcare Service (17 Core Services) *')}
              </label>
              <select
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-sm bg-white font-medium text-slate-800"
              >
                {HEALTHCARE_SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {language === 'hi' ? s.nameHi : s.nameEn} — {language === 'hi' ? s.priceUnitHi : s.priceUnitEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Shift duration buttons */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                {t('स्टाफ कितने समय के लिए चाहिए? (Shift Duration) *', 'Staff Duration Required *')}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: '12h_day', labelHi: '12 घंटे (दिन ड्यूटी)', labelEn: '12h (Day Shift)' },
                  { id: '12h_night', labelHi: '12 घंटे (रात ड्यूटी)', labelEn: '12h (Night Shift)' },
                  { id: '24h_live_in', labelHi: '24 घंटे (रेजिडेंट केयर)', labelEn: '24h (Continuous)' },
                  { id: 'per_visit', labelHi: 'विजिट आधार पर (प्रोसीजर)', labelEn: 'Per Visit (Short)' },
                ].map((item) => {
                  const isSelected = duration === item.id;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setDuration(item.id as ShiftDuration)}
                      className={`p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer text-center ${
                        isSelected 
                          ? 'bg-teal-50 border-teal-600 text-teal-900 shadow-xs ring-1 ring-teal-600'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {t(item.labelHi, item.labelEn)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Patient Medical Condition */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {t('मरीज की समस्या या देखभाल की जरूरत (Diagnosis / Care Need) *', 'Patient Condition / Diagnosis *')}
              </label>
              <textarea
                rows={2}
                value={patientCondition}
                onChange={(e) => setPatientCondition(e.target.value)}
                placeholder={t(
                  'उदा. लकवा (Paralysis), सर्जरी के बाद टांके की ड्रेसिंग, बुजुर्ग मरीज को चलने में सहारा, बीपी व शुगर मॉनिटरिंग',
                  'e.g. Post-stroke paralysis, surgical wound dressing, bedridden assistance, BP/sugar charting'
                )}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-sm outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Schedule & Instructions */}
        <div>
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
            <Calendar className="w-5 h-5 text-teal-600" />
            <h2 className="text-base font-bold text-slate-900">
              {t('4. समय व विशेष निर्देश (Schedule & Doctor Notes)', '4. Schedule & Instructions')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {t('सेवा शुरू करने की तारीख (Start Date) *', 'Service Start Date *')}
              </label>
              <input
                type="date"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-sm bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {t('सेवा शुरू करने का समय (Start Time) *', 'Preferred Start Time *')}
              </label>
              <select
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-sm bg-white"
              >
                <option value="08:00 AM">08:00 AM (सुबह 8 बजे)</option>
                <option value="09:00 AM">09:00 AM (सुबह 9 बजे)</option>
                <option value="10:00 AM">10:00 AM (सुबह 10 बजे)</option>
                <option value="02:00 PM">02:00 PM (दोपहर 2 बजे)</option>
                <option value="06:00 PM">06:00 PM (शाम 6 बजे)</option>
                <option value="08:00 PM">08:00 PM (रात 8 बजे - नाइट ड्यूटी)</option>
                <option value="Immediate / Urgent">Immediate / यथाशीघ्र (आपातकालीन)</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {t('मरीज की देखभाल के लिए विशेष निर्देश / डॉक्टर की सलाह (Special Instructions)', 'Special Instructions / Doctor Advice')}
              </label>
              <textarea
                rows={2}
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder={t(
                  'उदा. डॉक्टर ने नमक कम खाने को कहा है, हर 2 घंटे में करवट बदलनी है, दवा का पर्चा उपलब्ध है।',
                  'e.g. Doctor prescribed low sodium, patient has Ryle tube, prescription is ready at home'
                )}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Estimated Price & Booking Action */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-6 rounded-2xl">
          <div>
            <span className="text-xs text-slate-500 block">
              {t('अनुमानित सेवा शुल्क:', 'Estimated Starting Rate:')}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">
                ₹{estimatedCost.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-600">
                / {duration === '24h_live_in' ? t('24 घंटे', '24 Hours') : duration === 'per_visit' ? t('विजिट', 'Visit') : t('12 घंटे', '12 Hours')}
              </span>
            </div>
            <p className="text-[11px] text-teal-800 font-medium mt-0.5">
              {t('✓ कोई अग्रिम छिपी फीस नहीं (No Hidden Charges)', '✓ No Hidden Charges')}
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm py-3.5 px-8 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>{isSubmitting ? t('बुकिंग सबमिट हो रही है...', 'Submitting...') : t('बुकिंग सबमिट करें (Confirm Booking)', 'Submit Booking Request')}</span>
          </button>
        </div>

      </form>
    </div>
  );
};
