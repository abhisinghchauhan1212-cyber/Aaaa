import React from 'react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { BUSINESS_INFO } from '../data/initialData';

export const FloatingActions: React.FC = () => {
  const { t } = useLanguage();
  const { setCurrentPage, currentPage } = useApp();

  if (currentPage === 'book') return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200 md:hidden shadow-lg">
      <div className="grid grid-cols-3 gap-2">
        <a
          href={`tel:+91${BUSINESS_INFO.whatsappNumber}`}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-900 text-white text-[11px] font-semibold active:scale-95 transition-transform shadow-xs"
        >
          <Phone className="w-4 h-4 text-teal-400 mb-0.5" />
          <span>{t('कॉल करें', 'Call')}</span>
        </a>

        <a
          href={`${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent('Hello Abhishek ji, I want to book patient care service in Dehradun.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-600 text-white text-[11px] font-semibold active:scale-95 transition-transform shadow-xs"
        >
          <MessageCircle className="w-4 h-4 text-white mb-0.5" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={() => setCurrentPage('book')}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-teal-600 text-white text-[11px] font-semibold active:scale-95 transition-transform shadow-xs cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-teal-200 mb-0.5" />
          <span>{t('बुक करें', 'Book Care')}</span>
        </button>
      </div>
    </div>
  );
};
