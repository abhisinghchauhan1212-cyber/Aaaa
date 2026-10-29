import React from 'react';
import { 
  Bell, 
  MessageSquare, 
  X, 
  CheckCircle2, 
  UserCheck, 
  ExternalLink,
  Smartphone
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';

export const NotificationToast: React.FC = () => {
  const { activeToastNotification, dismissToast, setIsNotificationModalOpen } = useApp();
  const { language, t } = useLanguage();

  if (!activeToastNotification) return null;

  const isStaff = activeToastNotification.recipientType === 'staff';

  return (
    <div className="fixed top-20 right-4 z-50 max-w-sm w-full animate-in slide-in-from-top-4 fade-in duration-300">
      <div className="bg-slate-900 text-white p-4 rounded-2xl border border-teal-500/40 shadow-2xl flex items-start gap-3 backdrop-blur-md">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
          isStaff ? 'bg-amber-500/20 text-amber-400' : 'bg-teal-500/20 text-teal-400'
        }`}>
          {isStaff ? <UserCheck className="w-5 h-5" /> : <Smartphone className="w-5 h-5" />}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1 mb-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping"></span>
              {isStaff ? t('स्टाफ एसएमएस व अलर्ट', 'Staff SMS & Alert') : t('मरीज एसएमएस व अलर्ट', 'Patient SMS & Alert')}
            </span>
            <button
              onClick={dismissToast}
              className="text-slate-400 hover:text-white p-0.5 rounded cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <h4 className="text-xs font-bold text-white truncate">
            {language === 'hi' ? activeToastNotification.titleHi : activeToastNotification.titleEn}
          </h4>

          <p className="text-[11px] text-slate-300 mt-1 line-clamp-2 leading-relaxed">
            {language === 'hi' ? activeToastNotification.messageHi : activeToastNotification.messageEn}
          </p>

          <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-mono">
              To: {activeToastNotification.recipientPhone}
            </span>
            <button
              onClick={() => {
                dismissToast();
                setIsNotificationModalOpen(true);
              }}
              className="text-[11px] font-semibold text-teal-300 hover:text-teal-200 cursor-pointer flex items-center gap-1"
            >
              <span>{t('विवरण देखें →', 'View Details →')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
