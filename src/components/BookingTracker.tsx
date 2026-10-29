import React, { useState } from 'react';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  UserCheck, 
  Phone, 
  MessageCircle, 
  XCircle,
  ShieldCheck,
  Calendar,
  MapPin,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { BookingStatus, Booking } from '../types';
import { BUSINESS_INFO } from '../data/initialData';

export const BookingTracker: React.FC = () => {
  const { language, t } = useLanguage();
  const { 
    bookings, 
    lastCreatedBookingId, 
    staff, 
    setCurrentPage, 
    smsLogs, 
    updateBookingStatus, 
    setIsNotificationModalOpen 
  } = useApp();

  const [query, setQuery] = useState(lastCreatedBookingId || '');
  const [searchedBooking, setSearchedBooking] = useState<Booking | null>(() => {
    if (lastCreatedBookingId) {
      return bookings.find((b) => b.id === lastCreatedBookingId) || null;
    }
    return bookings[0] || null;
  });
  const [searched, setSearched] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const q = query.trim().toLowerCase();
    const found = bookings.find(
      (b) => b.id.toLowerCase() === q || b.mobileNumber.includes(q)
    );
    setSearchedBooking(found || null);
    setSearched(true);
  };

  const statusSteps: BookingStatus[] = [
    'Booking Received',
    'Under Review',
    'Staff Available',
    'Confirmed',
    'Staff Assigned',
    'Completed',
  ];

  const getStatusIndex = (currentStatus: BookingStatus) => {
    if (currentStatus === 'Cancelled') return -1;
    return statusSteps.indexOf(currentStatus);
  };

  const assignedStaff = searchedBooking?.assignedStaffId
    ? staff.find((s) => s.id === searchedBooking.assignedStaffId)
    : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 uppercase tracking-wider">
          {t('लाइव स्टेटस ट्रैकिंग', 'Live Booking Tracking')}
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 mb-2">
          {t('अपनी मरीज सेवा बुकिंग की स्थिति जानें', 'Check Patient Care Booking Status')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {t('बुकिंग आईडी (उदा. UK07-2026-1021) अथवा अपना 10 अंकों का मोबाइल नंबर दर्ज करें।', 'Enter your Booking ID (e.g. UK07-2026-1021) or 10-digit mobile number.')}
        </p>
      </div>

      {/* Search Input Bar */}
      <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-10">
        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border-2 border-teal-600/30 shadow-sm focus-within:border-teal-600 transition-all">
          <Search className="w-5 h-5 text-teal-600 ml-2 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('बुकिंग आईडी या फोन नंबर (उदा. UK07-2026-1021 या 9897123456)', 'Booking ID or Mobile Number')}
            className="flex-1 px-2 py-1.5 text-sm outline-hidden text-slate-900"
          />
          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors cursor-pointer shrink-0"
          >
            {t('स्थिति देखें', 'Track Status')}
          </button>
        </div>
      </form>

      {/* Result Display */}
      {searched && (
        <>
          {searchedBooking ? (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-200">
              {/* Header Banner */}
              <div className="bg-slate-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-teal-400 font-semibold block">
                    {searchedBooking.id}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold mt-1">
                    {searchedBooking.patientName} ({searchedBooking.patientAge} Yrs, {searchedBooking.patientGender})
                  </h2>
                  <p className="text-xs text-slate-300 mt-1">
                    {searchedBooking.serviceName} · {searchedBooking.locality}
                  </p>
                </div>

                <div className="text-right">
                  <div className="inline-block px-3 py-1.5 rounded-lg text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                    {searchedBooking.status}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {t('तारीख:', 'Date:')} {searchedBooking.startDate} ({searchedBooking.startTime})
                  </p>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="p-6 sm:p-8 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-6">
                  {t('प्रगति व स्थिति टाइमलाइन (Booking Lifecycle)', 'Live Status Timeline')}
                </h3>

                {searchedBooking.status === 'Cancelled' ? (
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-3 text-red-800 text-sm font-medium">
                    <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                    <span>{t('यह बुकिंग रद्द (Cancelled) कर दी गई है। अधिक जानकारी हेतु संपर्क करें।', 'This booking has been cancelled.')}</span>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
                      {statusSteps.map((step, idx) => {
                        const currentIndex = getStatusIndex(searchedBooking.status);
                        const isDone = idx <= currentIndex;
                        const isCurrent = idx === currentIndex;

                        return (
                          <div key={idx} className="flex flex-col items-center text-center">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs mb-2 transition-all ${
                                isCurrent
                                  ? 'bg-teal-600 text-white ring-4 ring-teal-100 shadow-sm'
                                  : isDone
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-slate-100 text-slate-400'
                              }`}
                            >
                              {isDone ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                            </div>
                            <span
                              className={`text-[11px] font-semibold leading-tight ${
                                isCurrent
                                  ? 'text-teal-900 font-bold'
                                  : isDone
                                  ? 'text-slate-800'
                                  : 'text-slate-400'
                              }`}
                            >
                              {step}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Assigned Staff Section (if assigned) */}
              {searchedBooking.status === 'Staff Assigned' && (
                <div className="p-6 sm:p-8 bg-teal-50/60 border-b border-teal-100">
                  <div className="flex items-center gap-2 mb-3">
                    <UserCheck className="w-5 h-5 text-teal-700" />
                    <h3 className="text-sm font-bold text-teal-900">
                      {t('मरीज के लिए नियुक्त हेल्थकेयर स्टाफ', 'Assigned Healthcare Staff')}
                    </h3>
                  </div>

                  <div className="bg-white rounded-2xl p-4 border border-teal-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {assignedStaff?.photoUrl ? (
                        <img
                          src={assignedStaff.photoUrl}
                          alt={assignedStaff.name}
                          className="w-14 h-14 rounded-xl object-cover border border-teal-300"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                          {searchedBooking.assignedStaffName?.charAt(0) || 'S'}
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-base font-bold text-slate-900">
                            {searchedBooking.assignedStaffName || assignedStaff?.name}
                          </h4>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-semibold">
                            {t('सत्यापित', 'Verified')}
                          </span>
                        </div>
                        <p className="text-xs text-teal-800 font-medium">
                          {assignedStaff ? (language === 'hi' ? assignedStaff.roleHi : assignedStaff.roleEn) : 'Qualified Medical Staff'}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {assignedStaff?.qualifications || 'Uttarakhand Medical Council Verified'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <a
                        href={`tel:+91${BUSINESS_INFO.whatsappNumber}`}
                        className="flex-1 sm:flex-none px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5 text-teal-400" />
                        <span>{t('कॉल स्टाफ डेस्क', 'Call Desk')}</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Real-time SMS & Notification Box */}
              <div className="p-6 sm:p-8 bg-slate-900 text-white border-b border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-teal-300">
                      {t('मरीज के मोबाइल पर भेजा गया रीयल-टाइम एसएमएस (Live SMS Alert)', 'Live SMS Dispatched to Patient')}
                    </h4>
                  </div>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono border border-slate-700">
                    Sender: HLTH07 · DLT Approved
                  </span>
                </div>

                <div className="bg-slate-950/70 p-3.5 rounded-xl border border-teal-500/30 font-mono text-xs text-teal-200 leading-relaxed shadow-inner">
                  "{smsLogs.find((s) => s.bookingId === searchedBooking.id)?.message || 
                    `Health UK07: We have received your booking request ${searchedBooking.id} for ${searchedBooking.patientName}. Coordinator Abhishek Chauhan (7906131879) is reviewing staff availability.`}"
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px]">
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{t('मोबाइल पर सफलतापूर्वक डिलीवर हुआ', 'Delivered to')} {searchedBooking.mobileNumber}</span>
                  </span>

                  <button
                    onClick={() => setIsNotificationModalOpen(true)}
                    className="text-teal-300 hover:text-white underline cursor-pointer"
                  >
                    {t('सभी नोटिफिकेशन व SMS लॉग देखें →', 'View All SMS Logs →')}
                  </button>
                </div>

                {/* Quick Simulation Bar for reviewing status updates */}
                <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] text-slate-400 font-medium">
                    {t('त्वरित स्टेटस टेस्ट:', 'Simulate Live Status Change:')}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      updateBookingStatus(searchedBooking.id, 'Staff Available');
                      setSearchedBooking({ ...searchedBooking, status: 'Staff Available' });
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-300 border border-slate-700 text-[11px] font-semibold transition-colors cursor-pointer"
                  >
                    → Staff Available
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      updateBookingStatus(searchedBooking.id, 'Confirmed');
                      setSearchedBooking({ ...searchedBooking, status: 'Confirmed' });
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 text-[11px] font-semibold transition-colors cursor-pointer"
                  >
                    → Confirmed
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const firstStaff = staff.find((s) => s.verificationStatus === 'Verified') || staff[0];
                      updateBookingStatus(
                        searchedBooking.id,
                        'Staff Assigned',
                        firstStaff.id,
                        firstStaff.name,
                        `Assigned ${firstStaff.name}. Duty confirmed.`
                      );
                      setSearchedBooking({
                        ...searchedBooking,
                        status: 'Staff Assigned',
                        assignedStaffId: firstStaff.id,
                        assignedStaffName: firstStaff.name,
                      });
                    }}
                    className="px-2.5 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-[11px] font-semibold transition-colors cursor-pointer shadow-xs"
                  >
                    → Assign Staff Nurse
                  </button>
                </div>
              </div>

              {/* Status Note or Staff Availability Advisory */}
              <div className="p-6 sm:p-8 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                <div>
                  <span className="font-semibold text-slate-700 block mb-0.5">
                    {t('कोऑर्डिनेटर नोट / अपडेट:', 'Care Coordinator Note:')}
                  </span>
                  <p className="text-slate-600">
                    {searchedBooking.adminNotes || 
                      t(
                        'आपकी बुकिंग समीक्षाधीन है। यदि किसी विशिष्ट सेवा के लिए स्टाफ उपलब्ध नहीं होता, तो हमारी टीम तुरंत आपको सूचित करेगी और सर्वोत्तम वैकल्पिक समाधान देगी।',
                        'Your booking is in review. If designated staff is temporarily unavailable in your locality, our desk will inform you immediately with certified alternates.'
                      )}
                  </p>
                </div>

                <a
                  href={`${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent(
                    `Hello Abhishek ji, regarding my Booking ID ${searchedBooking.id} for ${searchedBooking.patientName}. Please provide status update.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-4 rounded-xl flex items-center gap-1.5 shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t('WhatsApp पर पूछें', 'Inquire on WhatsApp')}</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center max-w-lg mx-auto">
              <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900 mb-1">
                {t('कोई बुकिंग नहीं मिली', 'No Booking Found')}
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                {t('कृपया अपनी सही बुकिंग आईडी या पंजीकृत मोबाइल नंबर जांचें।', 'Please check the Booking ID or registered 10-digit mobile number.')}
              </p>
              <button
                onClick={() => setCurrentPage('book')}
                className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl cursor-pointer"
              >
                {t('नई बुकिंग शुरू करें', 'Start New Booking')}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
