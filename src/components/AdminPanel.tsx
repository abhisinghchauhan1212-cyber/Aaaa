import React, { useState } from 'react';
import { 
  Lock, 
  Users, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  UserCheck, 
  AlertCircle, 
  Eye, 
  DollarSign, 
  Phone, 
  MessageCircle, 
  Plus, 
  Search, 
  Filter, 
  LogOut,
  Settings,
  ShieldCheck,
  Edit2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { Booking, BookingStatus, StaffMember } from '../types';
import { BUSINESS_INFO } from '../data/initialData';
import { HEALTHCARE_SERVICES } from '../data/servicesData';

export const AdminPanel: React.FC = () => {
  const { language, t } = useLanguage();
  const { 
    bookings, 
    updateBookingStatus, 
    staff, 
    updateStaff, 
    toggleStaffAvailability, 
    enquiries, 
    updateEnquiryStatus,
    isAdminLoggedIn,
    setIsAdminLoggedIn,
    smsLogs,
    notifications
  } = useApp();

  // Login form state
  const [adminPin, setAdminPin] = useState('');
  const [loginError, setLoginError] = useState('');

  // Dashboard Tab state
  const [activeTab, setActiveTab] = useState<'bookings' | 'staff' | 'enquiries' | 'pricing' | 'sms_logs'>('bookings');
  
  // Filter state for bookings
  const [bookingFilter, setBookingFilter] = useState<string>('all');
  const [searchBooking, setSearchBooking] = useState('');

  // Selected booking modal for status & staff assignment
  const [inspectBooking, setInspectBooking] = useState<Booking | null>(null);
  const [statusSelect, setStatusSelect] = useState<BookingStatus>('Booking Received');
  const [staffSelect, setStaffSelect] = useState<string>('');
  const [adminNoteInput, setAdminNoteInput] = useState('');

  // Login Handler (default passcode: uk07 or 7906)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPin === 'uk07' || adminPin === '7906' || adminPin === 'admin') {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem('health_uk07_admin_auth', 'true');
      setLoginError('');
    } else {
      setLoginError(t('अमान्य पासकोड। डेमो हेतु "uk07" या "7906" का उपयोग करें।', 'Invalid passcode. Use "uk07" or "7906" for demo.'));
    }
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('health_uk07_admin_auth');
  };

  const openInspectModal = (b: Booking) => {
    setInspectBooking(b);
    setStatusSelect(b.status);
    setStaffSelect(b.assignedStaffId || '');
    setAdminNoteInput(b.adminNotes || '');
  };

  const saveBookingUpdate = () => {
    if (!inspectBooking) return;
    const assignedMember = staff.find((s) => s.id === staffSelect);
    updateBookingStatus(
      inspectBooking.id,
      statusSelect,
      assignedMember ? assignedMember.id : undefined,
      assignedMember ? assignedMember.name : undefined,
      adminNoteInput
    );
    setInspectBooking(null);
  };

  // Staff Approval Handler
  const handleApproveStaff = (staffId: string) => {
    const member = staff.find((s) => s.id === staffId);
    if (!member) return;
    updateStaff({
      ...member,
      verificationStatus: 'Verified',
      isAvailable: true,
    });
  };

  // If not logged in, show secure login form
  if (!isAdminLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 text-teal-400 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">
            {t('Health UK07 एडमिन लॉगिन', 'Health UK07 Admin Portal')}
          </h2>
          <p className="text-xs text-slate-500 mb-6">
            {t('केवल अधिकृत प्रबंधक (Abhishek Chauhan) के लिए।', 'Authorized access only for care management.')}
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="text-left">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {t('एडमिन सिक्योरिटी पिन / पासवर्ड', 'Security Passcode')}
              </label>
              <input
                type="password"
                required
                value={adminPin}
                onChange={(e) => setAdminPin(e.target.value)}
                placeholder="Enter passcode (e.g. uk07)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-hidden focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
              />
              {loginError && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {loginError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm py-2.5 px-4 rounded-xl transition-colors cursor-pointer"
            >
              {t('लॉगिन करें (Login)', 'Login to Dashboard')}
            </button>
          </form>

          {/* Quick Demo Access Button */}
          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500 mb-2">
              {t('डेमो परीक्षण हेतु त्वरित एक्सेस:', 'Quick reviewer access:')}
            </p>
            <button
              type="button"
              onClick={() => {
                setAdminPin('uk07');
                setIsAdminLoggedIn(true);
                sessionStorage.setItem('health_uk07_admin_auth', 'true');
              }}
              className="text-xs font-semibold text-teal-700 bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-200 hover:bg-teal-100 cursor-pointer"
            >
              {t('One-Click Demo Login (Passcode: uk07)', 'One-Click Demo Login')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Filtered bookings
  const filteredBookings = bookings.filter((b) => {
    if (bookingFilter !== 'all' && b.status !== bookingFilter) return false;
    if (searchBooking.trim().length > 0) {
      const q = searchBooking.toLowerCase();
      const match =
        b.id.toLowerCase().includes(q) ||
        b.patientName.toLowerCase().includes(q) ||
        b.mobileNumber.includes(q) ||
        b.locality.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const pendingRegistrationsCount = staff.filter((s) => s.verificationStatus === 'Pending Verification').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
              Admin Control Center
            </span>
            <span className="text-xs text-slate-400">|</span>
            <span className="text-xs text-slate-600 font-medium">Abhishek Chauhan Desk</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">
            {t('Health UK07 एडमिन डैशबोर्ड', 'Health UK07 Admin Dashboard')}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-red-600 px-3 py-2 rounded-lg border border-slate-200 hover:border-red-200 cursor-pointer transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t('लॉगआउट', 'Logout')}</span>
          </button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
        <div className="bg-white p-4 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 font-medium">{t('कुल बुकिंग', 'Total Bookings')}</span>
            <Calendar className="w-4 h-4 text-teal-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">{bookings.length}</p>
          <span className="text-[11px] text-teal-700 font-medium">
            {bookings.filter((b) => b.status === 'Booking Received').length} {t('नई आई हैं', 'New requests')}
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 font-medium">{t('सत्यापित स्टाफ', 'Verified Staff')}</span>
            <UserCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">{staff.filter((s) => s.verificationStatus === 'Verified').length}</p>
          <span className="text-[11px] text-emerald-700 font-medium">
            {staff.filter((s) => s.isAvailable).length} {t('उपलब्ध हैं', 'Available now')}
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 font-medium">{t('लंबित स्टाफ रजिस्ट्रेशन', 'Pending Staff')}</span>
            <ShieldCheck className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">{pendingRegistrationsCount}</p>
          <span className="text-[11px] text-amber-700 font-medium">
            {pendingRegistrationsCount > 0 ? t('जाँच की आवश्यकता है', 'Needs verification') : t('कोई लंबित नहीं', 'All cleared')}
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 font-medium">{t('मरीज पूछताछ', 'Patient Enquiries')}</span>
            <MessageCircle className="w-4 h-4 text-sky-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">{enquiries.length}</p>
          <span className="text-[11px] text-sky-700 font-medium">
            {enquiries.filter((e) => e.status === 'Pending').length} {t('लंबित', 'Pending reply')}
          </span>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-slate-200 mb-6 overflow-x-auto pb-1">
        {[
          { id: 'bookings', label: t('बुकिंग प्रबंधन', 'Manage Bookings'), badge: bookings.length },
          { id: 'staff', label: t('हेल्थकेयर स्टाफ व वेरिफिकेशन', 'Staff & Verifications'), badge: staff.length },
          { id: 'enquiries', label: t('पूछताछ इनबॉक्स', 'Patient Inquiries'), badge: enquiries.length },
          { id: 'sms_logs', label: t('एसएमएस व नोटिफिकेशन ट्रैकर', 'SMS & Alerts Tracker'), badge: smsLogs.length },
          { id: 'pricing', label: t('सेवाएँ व मूल्य सूची', 'Services & Pricing') },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-white text-teal-800 border-t-2 border-t-teal-600 border-x border-slate-200 -mb-px shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-100 text-slate-700 font-mono">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* TAB 1: BOOKINGS MANAGEMENT */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2 flex-1">
              <Search className="w-4 h-4 text-slate-400 ml-1" />
              <input
                type="text"
                value={searchBooking}
                onChange={(e) => setSearchBooking(e.target.value)}
                placeholder={t('आईडी, मरीज का नाम, फोन या क्षेत्र से खोजें...', 'Search by ID, name, phone, locality...')}
                className="w-full text-xs outline-hidden text-slate-800"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={bookingFilter}
                onChange={(e) => setBookingFilter(e.target.value)}
                className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium"
              >
                <option value="all">{t('सभी स्टेटस (All Statuses)', 'All Statuses')}</option>
                <option value="Booking Received">Booking Received</option>
                <option value="Under Review">Under Review</option>
                <option value="Staff Available">Staff Available</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Staff Assigned">Staff Assigned</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Bookings Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Booking ID</th>
                    <th className="py-3 px-4">{t('मरीज विवरण', 'Patient Details')}</th>
                    <th className="py-3 px-4">{t('सेवा व शिफ्ट', 'Service & Shift')}</th>
                    <th className="py-3 px-4">{t('तारीख व पता', 'Date & Address')}</th>
                    <th className="py-3 px-4">{t('वर्तमान स्थिति', 'Status')}</th>
                    <th className="py-3 px-4">{t('नियुक्त स्टाफ', 'Assigned Staff')}</th>
                    <th className="py-3 px-4 text-right">{t('कार्रवाई', 'Action')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-teal-900">
                        {b.id}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-slate-900 block">{b.patientName}</span>
                        <span className="text-slate-500 text-[11px]">
                          {b.patientAge} Yrs, {b.patientGender} · {b.mobileNumber}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-slate-800 block">{b.serviceName}</span>
                        <span className="text-slate-500 text-[11px] capitalize">{b.duration.replace('_', ' ')}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-slate-800 font-medium block">{b.startDate} ({b.startTime})</span>
                        <span className="text-slate-500 text-[11px] block truncate max-w-xs">{b.locality}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                            b.status === 'Staff Assigned'
                              ? 'bg-teal-100 text-teal-800'
                              : b.status === 'Confirmed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : b.status === 'Cancelled'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {b.assignedStaffName ? (
                          <span className="font-medium text-slate-900 flex items-center gap-1">
                            <UserCheck className="w-3.5 h-3.5 text-teal-600" />
                            {b.assignedStaffName}
                          </span>
                        ) : (
                          <span className="text-slate-400 italic">{t('अभी नियुक्त नहीं', 'Not Assigned')}</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => openInspectModal(b)}
                          className="px-2.5 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-900 font-semibold text-xs border border-teal-200 transition-colors cursor-pointer"
                        >
                          {t('प्रबंधित करें', 'Manage')}
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredBookings.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-500">
                        {t('कोई बुकिंग नहीं मिली।', 'No bookings matching the filter.')}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STAFF & VERIFICATIONS */}
      {activeTab === 'staff' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              {t('पंजीकृत हेल्थकेयर स्टाफ की सूची (Total:', 'Healthcare Staff Directory (Total:')} {staff.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {staff.map((member) => (
              <div key={member.id} className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={member.photoUrl}
                        alt={member.name}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                      />
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1">
                          {member.name}
                          {member.verificationStatus === 'Verified' && (
                            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                          )}
                        </h4>
                        <p className="text-xs text-teal-800 font-medium">{member.roleEn}</p>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                        member.verificationStatus === 'Verified'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200 animate-pulse'
                      }`}
                    >
                      {member.verificationStatus}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600 mb-4">
                    <p className="truncate"><span className="text-slate-400">Exp:</span> {member.experienceYears} Years · {member.qualifications}</p>
                    <p className="truncate"><span className="text-slate-400">Areas:</span> {member.workAreas.join(', ')}</p>
                    <p><span className="text-slate-400">Rate:</span> ₹{member.dailyRate} / 12h</p>
                    <p><span className="text-slate-400">Phone:</span> {member.phone}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  {member.verificationStatus === 'Pending Verification' ? (
                    <button
                      onClick={() => handleApproveStaff(member.id)}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{t('सत्यापित व सक्रिय करें', 'Approve & Activate')}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleStaffAvailability(member.id)}
                      className={`w-full text-xs font-semibold py-2 px-3 rounded-lg border transition-colors cursor-pointer ${
                        member.isAvailable
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                          : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                      }`}
                    >
                      {member.isAvailable ? t('उपलब्ध है (ड्यूटी पर भेजें)', 'Available (Set On Duty)') : t('ड्यूटी पर है (उपलब्ध करें)', 'On Duty (Set Available)')}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PATIENT ENQUIRIES */}
      {activeTab === 'enquiries' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="text-sm font-bold text-slate-900 mb-4">
            {t('मरीजों व परिवारों से प्राप्त पूछताछ संदेश', 'Patient & Family Enquiries')}
          </h3>
          <div className="space-y-4">
            {enquiries.map((enq) => (
              <div key={enq.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{enq.name}</span>
                    <span className="text-slate-400">·</span>
                    <a href={`tel:${enq.phone}`} className="text-teal-700 font-medium text-xs flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      <span>{enq.phone}</span>
                    </a>
                    <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                      {enq.serviceNeeded}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    "{enq.message}"
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/91${enq.phone}?text=${encodeURIComponent(`Hello ${enq.name}, Abhishek Chauhan here from Health UK07 regarding your patient care enquiry.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 text-xs font-semibold flex items-center gap-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                  {enq.status === 'Pending' ? (
                    <button
                      onClick={() => updateEnquiryStatus(enq.id, 'Contacted')}
                      className="px-3 py-2 rounded-lg bg-teal-600 text-white text-xs font-semibold hover:bg-teal-700"
                    >
                      {t('संपर्क किया गया', 'Mark Contacted')}
                    </button>
                  ) : (
                    <span className="text-xs text-emerald-700 font-bold px-2 py-1 bg-emerald-100 rounded">
                      ✓ Contacted
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SERVICES & PRICING */}
      {activeTab === 'pricing' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="text-sm font-bold text-slate-900 mb-4">
            {t('सेवाओं की बेस दरें व विवरण (Dehradun Rate Card)', 'Services & Standard Base Rates')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {HEALTHCARE_SERVICES.map((s) => (
              <div key={s.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{s.nameEn}</h4>
                  <p className="text-[11px] text-slate-500">{s.qualificationsEn}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-bold text-slate-900 text-sm">₹{s.basePrice}</span>
                  <span className="text-[11px] text-slate-500 block">{s.priceUnitEn}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: REAL-TIME SMS & NOTIFICATION GATEWAY LOGS */}
      {activeTab === 'sms_logs' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {t('रीयल-टाइम एसएमएस एवं नोटिफिकेशन प्रेषण लॉग', 'Real-Time SMS & Notification Dispatch Log')}
              </h3>
              <p className="text-xs text-slate-500">
                {t('मरीजों व स्टाफ को भेजे गए सभी ऑटोमेटेड एसएमएस की तत्काल डिलीवरी स्थिति।', 'Live audit trail of automated SMS dispatched to patients and assigned caregivers.')}
              </p>
            </div>
            <span className="text-[11px] bg-slate-900 text-teal-300 px-3 py-1 rounded-lg font-mono font-bold">
              Gateway: DLT-HLTH07
            </span>
          </div>

          <div className="space-y-3">
            {smsLogs.map((log) => (
              <div key={log.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{log.recipientName}</span>
                    <span className="font-mono text-slate-500">({log.recipientPhone})</span>
                    <span className="text-[10px] bg-teal-100 text-teal-800 font-semibold px-2 py-0.5 rounded">
                      {log.recipientRole}
                    </span>
                  </div>

                  <span className="text-[11px] text-emerald-800 bg-emerald-100 font-bold px-2 py-0.5 rounded flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{log.deliveryStatus}</span>
                  </span>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200 font-mono text-[11px] text-slate-800 leading-relaxed">
                  "{log.message}"
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Booking ID: <strong className="text-slate-600">{log.bookingId}</strong></span>
                  <span>{new Date(log.timestamp).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* INSPECT & STATUS MODAL */}
      {inspectBooking && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-xl w-full p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <span className="text-xs font-mono font-bold text-teal-700">{inspectBooking.id}</span>
                <h3 className="text-lg font-bold text-slate-900">
                  {inspectBooking.patientName} ({inspectBooking.patientAge} Yrs)
                </h3>
              </div>
              <button
                onClick={() => setInspectBooking(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <p><span className="font-semibold text-slate-700">Service:</span> {inspectBooking.serviceName}</p>
                <p><span className="font-semibold text-slate-700">Phone:</span> {inspectBooking.mobileNumber}</p>
                <p><span className="font-semibold text-slate-700">Location:</span> {inspectBooking.locality}, {inspectBooking.fullAddress}</p>
                <p><span className="font-semibold text-slate-700">Condition:</span> {inspectBooking.patientCondition}</p>
              </div>

              {/* Status Change Selector */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {t('बुकिंग की स्थिति बदलें (Update Status) *', 'Update Booking Status *')}
                </label>
                <select
                  value={statusSelect}
                  onChange={(e) => setStatusSelect(e.target.value as BookingStatus)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-medium text-slate-900"
                >
                  <option value="Booking Received">Booking Received (बुकिंग प्राप्त हुई)</option>
                  <option value="Under Review">Under Review (समीक्षा में)</option>
                  <option value="Staff Available">Staff Available (स्टाफ उपलब्ध)</option>
                  <option value="Confirmed">Confirmed (पुष्टि हो गई)</option>
                  <option value="Staff Assigned">Staff Assigned (स्टाफ नियुक्त किया गया)</option>
                  <option value="Completed">Completed (पूर्ण)</option>
                  <option value="Cancelled">Cancelled (रद्द)</option>
                </select>
              </div>

              {/* Staff Assignment */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {t('स्टाफ नियुक्त करें (Assign Healthcare Staff)', 'Assign Healthcare Staff')}
                </label>
                <select
                  value={staffSelect}
                  onChange={(e) => setStaffSelect(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900"
                >
                  <option value="">{t('-- कोई स्टाफ चुनें (Select Staff) --', '-- Select Staff Member --')}</option>
                  {staff
                    .filter((s) => s.verificationStatus === 'Verified')
                    .map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.roleEn}) — {s.isAvailable ? 'Available' : 'On Duty'}
                      </option>
                    ))}
                </select>
              </div>

              {/* Admin Notes */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {t('एडमिन नोट / मरीज को दिखने वाला संदेश', 'Coordinator Note (Visible to patient on tracker)')}
                </label>
                <textarea
                  rows={2}
                  value={adminNoteInput}
                  onChange={(e) => setAdminNoteInput(e.target.value)}
                  placeholder="e.g. Assigned Sister Sunita. She will reach patient home at 9 AM."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setInspectBooking(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-medium"
                >
                  {t('रद्द करें', 'Cancel')}
                </button>
                <button
                  type="button"
                  onClick={saveBookingUpdate}
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold shadow-xs"
                >
                  {t('अपडेट सेव करें', 'Save Changes')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
