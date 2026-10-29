import React, { useState } from 'react';
import { 
  UserCheck, 
  Award, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  FileCheck,
  Send
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { ServiceCategory, StaffMember } from '../types';
import { BUSINESS_INFO } from '../data/initialData';

export const StaffRegisterView: React.FC = () => {
  const { t } = useLanguage();
  const { addStaff, setCurrentPage } = useApp();

  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState<ServiceCategory>('nursing');
  const [qualifications, setQualifications] = useState('');
  const [councilRegNo, setCouncilRegNo] = useState('');
  const [experienceYears, setExperienceYears] = useState('3');
  const [shiftPreference, setShiftPreference] = useState('12h_day');
  const [preferredAreas, setPreferredAreas] = useState<string[]>(['Shanti Vihar, Dehradun', 'Chakrata Road']);
  const [dailyRate, setDailyRate] = useState('1500');
  const [hasPoliceVerification, setHasPoliceVerification] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newStaff: StaffMember = {
      id: `staff-reg-${Date.now()}`,
      name: fullName.trim(),
      photoUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400',
      roleHi: category === 'nursing' ? 'स्टाफ नर्स (सत्यापन अधीन)' : category === 'physiotherapy' ? 'फिजियोथेरेपिस्ट' : 'सर्टिफाइड GDA केयरगिवर',
      roleEn: category === 'nursing' ? 'Staff Nurse (Pending Review)' : category === 'physiotherapy' ? 'Physiotherapist' : 'Certified GDA',
      category,
      qualifications: `${qualifications.trim()} (${councilRegNo ? `Reg: ${councilRegNo}` : 'Aadhaar Verified'})`,
      experienceYears: Number(experienceYears) || 1,
      availableServices: ['General Patient Care', 'Assistance in Treatment'],
      shiftPreferences: [shiftPreference],
      workAreas: preferredAreas.length > 0 ? preferredAreas : ['Dehradun Central'],
      verificationStatus: 'Pending Verification',
      councilRegistrationNo: councilRegNo.trim() || undefined,
      policeVerificationDone: hasPoliceVerification,
      dailyRate: Number(dailyRate) || 1200,
      isAvailable: false, // inactive until admin approves
      rating: 5.0,
      reviewsCount: 0,
      phone: mobileNumber.trim(),
    };

    addStaff(newStaff);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-3xl border border-emerald-200 shadow-md p-8 sm:p-12">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {t('पंजीकरण आवेदन प्राप्त हुआ!', 'Registration Application Submitted!')}
          </h2>
          <p className="text-sm text-slate-600 mb-6 leading-relaxed">
            {t(
              'धन्यवाद! आपका हेल्थकेयर स्टाफ पंजीकरण आवेदन Health UK07 एडमिन पैनल में भेज दिया गया है। हमारे कोऑर्डिनेटर (Abhishek Chauhan) आपके प्रमाणपत्रों और पृष्ठभूमि की जाँच के बाद आपका प्रोफाइल 24 घंटे में सक्रिय (Activate) करेंगे।',
              'Thank you! Your application is in review with Health UK07 Admin. Our coordinator (Abhishek Chauhan) will verify your council credentials and police verification within 24 hours.'
            )}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setCurrentPage('staff')}
              className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-6 py-3 rounded-xl cursor-pointer"
            >
              {t('स्टाफ डायरेक्टरी देखें', 'View Staff Directory')}
            </button>
            <button
              onClick={() => setCurrentPage('admin')}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-6 py-3 rounded-xl cursor-pointer"
            >
              {t('एडमिन में सत्यापन देखें', 'Inspect in Admin')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 uppercase tracking-wider">
          {t('स्टाफ जॉइनिंग पोर्टल', 'Healthcare Staff Registration')}
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 mb-2">
          {t('Health UK07 टीम से जुड़ें (Dehradun Caregivers)', 'Join Health UK07 Caregiver Network')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {t(
            'योग्य नर्स (B.Sc/GNM), GDA केयरगिवर्स और फिजियोथेरेपिस्ट देहरादून में उच्च सम्मान और बेहतर दैनिक वेतन पर काम करने हेतु आवेदन करें।',
            'Registered nurses, certified GDAs, and physiotherapists in Dehradun are invited to register for verified home care assignments.'
          )}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {t('पूरा नाम (Full Name) *', 'Full Name *')}
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={t('उदा. प्रियंका चौहान', 'e.g. Priyanka Chauhan')}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-hidden"
            />
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
              placeholder="7906131879"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {t('ईमेल आईडी (Email)', 'Email Address')}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="staff@example.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-hidden"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {t('वर्तमान पता (देहरादून / उत्तराखंड) *', 'Current Address in Dehradun *')}
            </label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={t('उदा. शांति विहार, चकराता रोड, देहरादून', 'e.g. Shanti Vihar, Chakrata Road, Dehradun')}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {t('स्टाफ की श्रेणी (Category) *', 'Role Category *')}
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ServiceCategory)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white font-medium"
            >
              <option value="nursing">{t('स्टाफ नर्स (GNM / B.Sc)', 'Registered Nurse (GNM / B.Sc)')}</option>
              <option value="icu_critical">{t('आईसीयू / क्रिटिकल केयर नर्स', 'ICU / Critical Care Nurse')}</option>
              <option value="gda_attendant">{t('जी.डी.ए. / पेशेंट केयर असिस्टेंट', 'Certified GDA Attendant')}</option>
              <option value="physiotherapy">{t('फिजियोथेरेपिस्ट (BPT / MPT)', 'Physiotherapist (BPT / MPT)')}</option>
              <option value="elderly_bedridden">{t('जेरियाट्रिक व बेडरिडन केयरगिवर', 'Geriatric & Bedridden Caregiver')}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {t('अनुभव (Experience in Years) *', 'Experience (Years) *')}
            </label>
            <select
              value={experienceYears}
              onChange={(e) => setExperienceYears(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
            >
              <option value="1">1 {t('वर्ष', 'Year')}</option>
              <option value="2">2 {t('वर्ष', 'Years')}</option>
              <option value="3">3 {t('वर्ष', 'Years')}</option>
              <option value="4">4 {t('वर्ष', 'Years')}</option>
              <option value="5">5 {t('वर्ष', 'Years')}</option>
              <option value="7">7+ {t('वर्ष', 'Years')}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {t('शैक्षणिक योग्यता (Degree/Diploma) *', 'Highest Qualification *')}
            </label>
            <input
              type="text"
              required
              value={qualifications}
              onChange={(e) => setQualifications(e.target.value)}
              placeholder={t('उदा. B.Sc Nursing, HNBGU', 'e.g. B.Sc Nursing / GNM')}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {t('काउंसिल रजिस्ट्रेशन नंबर (नर्स / फिजियो के लिए)', 'Council Registration No.')}
            </label>
            <input
              type="text"
              value={councilRegNo}
              onChange={(e) => setCouncilRegNo(e.target.value)}
              placeholder="UKNC/RN-XXXXX"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {t('कार्य का पसंदीदा समय (Shift Preference) *', 'Preferred Duty Shift *')}
            </label>
            <select
              value={shiftPreference}
              onChange={(e) => setShiftPreference(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
            >
              <option value="12h_day">{t('12 घंटे (दिन ड्यूटी - 8 AM से 8 PM)', '12h Day Shift')}</option>
              <option value="12h_night">{t('12 घंटे (रात ड्यूटी - 8 PM से 8 AM)', '12h Night Shift')}</option>
              <option value="24h_live_in">{t('24 घंटे (रेजिडेंट केयर)', '24h Live-in')}</option>
              <option value="per_visit">{t('प्रति विजिट (फिजियो / ड्रेसिंग)', 'Per Visit Basis')}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {t('अपेक्षित दैनिक दर (₹ Daily Rate)', 'Expected Daily Rate (₹)')}
            </label>
            <input
              type="number"
              value={dailyRate}
              onChange={(e) => setDailyRate(e.target.value)}
              placeholder="1500"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
            />
          </div>
        </div>

        {/* Verification Checkboxes */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
          <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium">
            <input
              type="checkbox"
              checked={hasPoliceVerification}
              onChange={(e) => setHasPoliceVerification(e.target.checked)}
              className="rounded text-teal-600"
            />
            <span>{t('मेरे पास आधार कार्ड एवं पुलिस वेरिफिकेशन / अनापत्ति प्रमाण पत्र उपलब्ध है।', 'I have valid Aadhaar card and police verification / NOC.')}</span>
          </label>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            {t(
              '* नोट: Health UK07 की सुरक्षा नीति के तहत हर स्टाफ का ओरिजिनल आधार व नर्सिंग डिप्लोमा एडमिन द्वारा भौतिक रूप से सत्यापित किया जाता है।',
              '* Note: As per safety norms, original government credentials will be physically verified before assignment.'
            )}
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm py-3 px-6 rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          <span>{t('पंजीकरण सबमिट करें (Submit Application)', 'Submit Staff Application')}</span>
        </button>
      </form>
    </div>
  );
};
