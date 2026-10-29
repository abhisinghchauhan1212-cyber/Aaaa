import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ShieldCheck, 
  UserCheck, 
  UserPlus, 
  Star,
  MapPin
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { StaffCard } from '../components/StaffCard';
import { filterStaff } from '../utils/bookingUtils';
import { BUSINESS_INFO } from '../data/initialData';

export const StaffDirectoryPage: React.FC = () => {
  const { t } = useLanguage();
  const { staff, setCurrentPage } = useApp();

  const [category, setCategory] = useState<string>('all');
  const [workArea, setWorkArea] = useState<string>('all');
  const [onlyAvailable, setOnlyAvailable] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Verified staff only for public directory, as requested by user!
  const verifiedStaff = staff.filter((s) => s.verificationStatus === 'Verified');

  const filtered = filterStaff(verifiedStaff, {
    category,
    workArea,
    onlyAvailable,
    searchQuery,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 uppercase tracking-wider">
          {t('सत्यापित हेल्थकेयर स्टाफ', 'Verified Healthcare Personnel')}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 mb-3">
          {t('अपनी पसंद का योग्य स्टाफ चुनें व बुक करें', 'Choose & Book Verified Staff in Dehradun')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {t(
            'हर स्टाफ सदस्य की योग्यता, काउंसिल पंजीकरण, पुलिस सत्यापन और अस्पताल अनुभव की जाँच एडमिन द्वारा की जा चुकी है। अपनी जरूरत के अनुसार स्टाफ चुनें।',
            'Every nurse, GDA attendant, and physiotherapist has been physically verified by our care coordinator (Abhishek Chauhan). Select the right caregiver for your family.'
          )}
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('नाम, योग्यता या भूमिका से खोजें...', 'Search by name or skills...')}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 outline-hidden focus:border-teal-600"
            />
          </div>

          {/* Category */}
          <div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-white text-slate-700 font-medium"
            >
              <option value="all">{t('सभी स्टाफ श्रेणियाँ (All Roles)', 'All Roles')}</option>
              <option value="nursing">{t('स्टाफ नर्स (GNM / B.Sc)', 'Staff Nurse')}</option>
              <option value="icu_critical">{t('आईसीयू व क्रिटिकल नर्स', 'ICU & Critical Nurse')}</option>
              <option value="gda_attendant">{t('जी.डी.ए. केयरगिवर', 'GDA Attendant')}</option>
              <option value="physiotherapy">{t('फिजियोथेरेपिस्ट (BPT/MPT)', 'Physiotherapist')}</option>
              <option value="elderly_bedridden">{t('जेरियाट्रिक व बेडरिडन केयर', 'Elderly Caregiver')}</option>
            </select>
          </div>

          {/* Work Area */}
          <div>
            <select
              value={workArea}
              onChange={(e) => setWorkArea(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-white text-slate-700 font-medium"
            >
              <option value="all">{t('देहरादून के सभी क्षेत्र (All Areas)', 'All Dehradun Areas')}</option>
              <option value="Shanti Vihar">Shanti Vihar, Dehradun</option>
              <option value="Chakrata">Chakrata & Chakrata Road</option>
              <option value="Rajpur Road">Rajpur Road & Dalanwala</option>
              <option value="Prem Nagar">Prem Nagar & Selaqui</option>
              <option value="Clement Town">Clement Town</option>
              <option value="Sahastradhara">Sahastradhara Road</option>
            </select>
          </div>

          {/* Availability Toggle */}
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-semibold text-slate-700">
              {t('केवल उपलब्ध स्टाफ', 'Only Available Now')}
            </span>
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={(e) => setOnlyAvailable(e.target.checked)}
              className="rounded text-teal-600 w-4 h-4 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((member) => (
          <StaffCard key={member.id} staff={member} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center max-w-md mx-auto">
          <UserCheck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900 mb-1">
            {t('इस फ़िल्टर में कोई स्टाफ उपलब्ध नहीं है', 'No staff found for this filter')}
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            {t(
              'कृपया अपने फ़िल्टर रीसेट करें या हमारी डेस्क पर फोन करें। हम तत्काल वैकल्पिक स्टाफ उपलब्ध करा देंगे।',
              'Please adjust your filter or call our desk directly for emergency dispatch.'
            )}
          </p>
          <a
            href={`tel:+91${BUSINESS_INFO.whatsappNumber}`}
            className="inline-block px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold"
          >
            {t('डेस्क पर कॉल करें: 7906131879', 'Call Desk: 7906131879')}
          </a>
        </div>
      )}

      {/* Join Staff Banner */}
      <div className="bg-gradient-to-r from-teal-50 via-white to-teal-50/50 rounded-3xl p-8 border border-teal-200 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            {t('क्या आप एक योग्य नर्स, GDA या फिजियोथेरेपिस्ट हैं?', 'Are you a Qualified Nurse, GDA or Physiotherapist?')}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            {t(
              'देहरादून में सम्मानजनक मानदेय और लचीले कार्य समय पर Health UK07 से जुड़ें।',
              'Join Uttarakhand’s premier patient care network with fair rates, punctual payouts and verified homes.'
            )}
          </p>
        </div>

        <button
          onClick={() => setCurrentPage('staff-register')}
          className="shrink-0 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold py-3 px-6 rounded-xl flex items-center gap-2 cursor-pointer shadow-xs"
        >
          <UserPlus className="w-4 h-4 text-teal-400" />
          <span>{t('स्टाफ रजिस्ट्रेशन करें', 'Register as Staff')}</span>
        </button>
      </div>

    </div>
  );
};
