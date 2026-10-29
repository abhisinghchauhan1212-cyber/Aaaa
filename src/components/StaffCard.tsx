import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Award, 
  Star, 
  Calendar, 
  Phone, 
  CheckCircle,
  MessageCircle,
  User
} from 'lucide-react';
import { StaffMember } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { BUSINESS_INFO } from '../data/initialData';

interface StaffCardProps {
  staff: StaffMember;
}

export const StaffCard: React.FC<StaffCardProps> = ({ staff }) => {
  const { language, t } = useLanguage();
  const { navigateToBookingWithStaff } = useApp();

  const handleStaffWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Abhishek ji, I want to book staff member "${staff.name}" (${staff.roleEn}) for home patient care in Dehradun.`
    );
    window.open(`${BUSINESS_INFO.whatsappUrl}?text=${text}`, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-teal-500/50 hover:shadow-md transition-all flex flex-col justify-between">
      {/* Top Media & Status */}
      <div className="p-6 pb-4">
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <img
              src={staff.photoUrl}
              alt={staff.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-teal-100 shadow-xs"
              onError={(e) => {
                // fallback to colored placeholder avatar if image load fails
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            {staff.isAvailable ? (
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" title={t('उपलब्ध है', 'Available')}></span>
            ) : (
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-amber-500 border-2 border-white rounded-full" title={t('ड्यूटी पर हैं', 'On Duty')}></span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <h3 className="text-base font-bold text-slate-900 truncate">
                {staff.name}
              </h3>
              {staff.verificationStatus === 'Verified' && (
                <span title={t('एडमिन द्वारा सत्यापित', 'Admin Verified')}>
                  <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                </span>
              )}
            </div>

            <p className="text-xs text-teal-800 font-semibold mb-2">
              {language === 'hi' ? staff.roleHi : staff.roleEn}
            </p>

            {/* Rating & Experience */}
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <div className="flex items-center gap-1 text-amber-600 font-medium">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{staff.rating}</span>
                <span className="text-slate-400 text-[11px]">({staff.reviewsCount})</span>
              </div>
              <span className="text-slate-300">·</span>
              <span className="font-medium text-slate-700">
                {staff.experienceYears} {t('वर्ष अनुभव', 'Yrs Exp')}
              </span>
            </div>
          </div>
        </div>

        {/* Verification & Qualifications */}
        <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs">
          <div className="flex items-start gap-2 text-slate-700">
            <Award className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <span className="leading-tight">{staff.qualifications}</span>
          </div>

          {staff.councilRegistrationNo && (
            <div className="flex items-center gap-2 text-slate-500 text-[11px]">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{t('काउंसिल पंजी.:', 'Reg No:')} {staff.councilRegistrationNo}</span>
            </div>
          )}

          <div className="flex items-start gap-2 text-slate-600">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <span className="text-[11px] leading-tight">
              {staff.workAreas.join(', ')}
            </span>
          </div>

          <div className="flex items-center gap-2 pt-1 text-[11px] font-medium">
            <span className={staff.isAvailable ? 'text-emerald-700' : 'text-amber-700'}>
              {staff.isAvailable ? t('● अभी बुकिंग हेतु उपलब्ध', '● Available Now') : t('○ अभी अन्य मरीज की ड्यूटी पर', '○ Currently on Duty')}
            </span>
            {staff.policeVerificationDone && (
              <span className="text-slate-500">
                · {t('पुलिस सत्यापन पूर्ण', 'Police Verified')}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer: Price & Book Button */}
      <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
        <div>
          <span className="text-xs text-slate-500 block">{t('दर:', 'Rate:')}</span>
          <span className="text-sm font-bold text-slate-900">
            ₹{staff.dailyRate.toLocaleString('en-IN')}
            <span className="text-xs font-normal text-slate-600"> / {t('12h ड्यूटी', '12h shift')}</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleStaffWhatsApp}
            className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-emerald-50 hover:border-emerald-300 text-slate-700 hover:text-emerald-700 transition-colors cursor-pointer"
            title={t('WhatsApp पर पूछें', 'Ask on WhatsApp')}
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
          </button>

          <button
            onClick={() => navigateToBookingWithStaff(staff)}
            className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-3.5 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{t('Book Staff', 'Book Staff')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
