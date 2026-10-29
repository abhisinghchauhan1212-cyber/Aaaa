import React, { useState } from 'react';
import { 
  Bell, 
  Smartphone, 
  UserCheck, 
  CheckCircle2, 
  X, 
  Clock, 
  Trash2, 
  Check, 
  MessageSquare,
  ShieldCheck,
  Send,
  Radio
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';

export const NotificationCenterModal: React.FC = () => {
  const { 
    isNotificationModalOpen, 
    setIsNotificationModalOpen,
    notifications,
    smsLogs,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    clearNotifications,
    setCurrentPage
  } = useApp();

  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'patient' | 'staff' | 'sms'>('patient');

  if (!isNotificationModalOpen) return null;

  const patientNotifs = notifications.filter((n) => n.recipientType === 'patient');
  const staffNotifs = notifications.filter((n) => n.recipientType === 'staff');

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-slate-200 max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold">
                  {t('रीयल-टाइम नोटिफिकेशन व एसएमएस सेंटर', 'Real-Time Notification & SMS Center')}
                </h3>
                <span className="flex items-center gap-1 text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-mono font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  LIVE
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {t('मरीजों व स्टाफ को भेजे गए तत्काल अलर्ट व SMS', 'Instant notifications and SMS dispatched in real-time')}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsNotificationModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 pt-2">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('patient')}
              className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'patient'
                  ? 'bg-white text-teal-800 border-t-2 border-t-teal-600 border-x border-slate-200 -mb-px'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>{t('मरीज अलर्ट्स', 'Patient Alerts')}</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-teal-100 text-teal-800 font-mono">
                {patientNotifs.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('staff')}
              className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'staff'
                  ? 'bg-white text-teal-800 border-t-2 border-t-teal-600 border-x border-slate-200 -mb-px'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>{t('स्टाफ ड्यूटी अलर्ट्स', 'Staff Assignments')}</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-100 text-amber-800 font-mono">
                {staffNotifs.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('sms')}
              className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'sms'
                  ? 'bg-white text-teal-800 border-t-2 border-t-teal-600 border-x border-slate-200 -mb-px'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{t('एसएमएस गेटवे लॉग', 'SMS Gateway Log')}</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-200 text-slate-700 font-mono">
                {smsLogs.length}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-2 pb-2">
            <button
              onClick={markAllNotificationsAsRead}
              className="text-[11px] text-slate-500 hover:text-teal-700 font-medium cursor-pointer"
            >
              {t('सब पढ़ा हुआ मार्क करें', 'Mark all read')}
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-3">
          
          {/* TAB 1: PATIENT ALERTS */}
          {activeTab === 'patient' && (
            <div className="space-y-3">
              {patientNotifs.map((item) => (
                <div
                  key={item.id}
                  onClick={() => markNotificationAsRead(item.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    item.isRead ? 'bg-white border-slate-200' : 'bg-teal-50/50 border-teal-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">
                        {language === 'hi' ? item.titleHi : item.titleEn}
                      </span>
                      {!item.isRead && (
                        <span className="w-2 h-2 rounded-full bg-teal-600 shrink-0"></span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-2.5">
                    {language === 'hi' ? item.messageHi : item.messageEn}
                  </p>

                  {/* SMS Verbatim Preview */}
                  {item.smsContent && (
                    <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200 text-[11px] text-slate-700 flex items-start gap-2">
                      <Smartphone className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-slate-900 block">
                          SMS Sent to {item.recipientPhone} (Sender: HLTH07):
                        </span>
                        <span className="font-mono text-slate-600">{item.smsContent}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {patientNotifs.length === 0 && (
                <div className="py-12 text-center text-slate-400 text-xs">
                  {t('कोई मरीज नोटिफिकेशन नहीं है।', 'No patient notifications yet.')}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: STAFF ASSIGNMENTS */}
          {activeTab === 'staff' && (
            <div className="space-y-3">
              {staffNotifs.map((item) => (
                <div
                  key={item.id}
                  onClick={() => markNotificationAsRead(item.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    item.isRead ? 'bg-white border-slate-200' : 'bg-amber-50/50 border-amber-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-amber-600 shrink-0" />
                      <span className="text-xs font-bold text-slate-900">
                        {language === 'hi' ? item.titleHi : item.titleEn}
                      </span>
                      {!item.isRead && (
                        <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-2.5">
                    {language === 'hi' ? item.messageHi : item.messageEn}
                  </p>

                  {item.smsContent && (
                    <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200 text-[11px] text-slate-700 flex items-start gap-2">
                      <Smartphone className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-slate-900 block">
                          SMS Sent to Nurse ({item.recipientName} - {item.recipientPhone}):
                        </span>
                        <span className="font-mono text-slate-600">{item.smsContent}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {staffNotifs.length === 0 && (
                <div className="py-12 text-center text-slate-400 text-xs">
                  {t('कोई स्टाफ असाइनमेंट अलर्ट नहीं है।', 'No staff assignment alerts yet.')}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SMS GATEWAY LOGS */}
          {activeTab === 'sms' && (
            <div className="space-y-3">
              <div className="p-3 bg-slate-900 text-teal-300 rounded-xl text-xs flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Health UK07 Dehradun Telecom SMS Gateway</span>
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                  Sender ID: HLTH07
                </span>
              </div>

              {smsLogs.map((log) => (
                <div key={log.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 flex items-center gap-1">
                      <span>To: {log.recipientName}</span>
                      <span className="text-slate-400 font-mono">({log.recipientPhone})</span>
                      <span className="text-[10px] bg-slate-200 px-1.5 py-0.2 rounded font-semibold text-slate-700">
                        {log.recipientRole}
                      </span>
                    </span>

                    <span className="text-[10px] text-emerald-700 bg-emerald-100 font-bold px-2 py-0.5 rounded flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{log.deliveryStatus}</span>
                    </span>
                  </div>

                  <p className="font-mono text-[11px] text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200">
                    "{log.message}"
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>Booking Ref: {log.bookingId}</span>
                    <span>{new Date(log.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={clearNotifications}
            className="text-xs text-slate-500 hover:text-red-600 flex items-center gap-1 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{t('सभी साफ करें', 'Clear History')}</span>
          </button>

          <button
            onClick={() => setIsNotificationModalOpen(false)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl cursor-pointer"
          >
            {t('बंद करें', 'Close')}
          </button>
        </div>

      </div>
    </div>
  );
};
