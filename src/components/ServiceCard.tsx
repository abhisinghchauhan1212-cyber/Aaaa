import React from 'react';
import { 
  HeartPulse, 
  ClockAlert, 
  UserCheck, 
  Activity, 
  ShieldAlert, 
  Brain, 
  HelpingHand, 
  Stethoscope, 
  Footprints, 
  Bandage, 
  Users, 
  Bed, 
  Wind, 
  Utensils, 
  ShieldCheck, 
  Droplet, 
  FileCheck,
  CheckCircle2,
  Calendar,
  MessageCircle
} from 'lucide-react';
import { HealthcareService } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { BUSINESS_INFO } from '../data/initialData';

interface ServiceCardProps {
  service: HealthcareService;
}

const iconMap: Record<string, React.ElementType> = {
  HeartPulse,
  ClockAlert,
  UserCheck,
  Activity,
  ShieldAlert,
  Brain,
  HelpingHand,
  Stethoscope,
  Footprints,
  Bandage,
  Users,
  Bed,
  Wind,
  Utensils,
  ShieldCheck,
  Droplet,
  FileCheck,
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { language, t } = useLanguage();
  const { navigateToBookingWithService } = useApp();

  const IconComponent = iconMap[service.iconName] || HeartPulse;

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Hello Abhishek ji, I want to inquire about "${service.nameEn}" (Health UK07 Home Care in Dehradun). Please share available staff details.`
    );
    window.open(`${BUSINESS_INFO.whatsappUrl}?text=${text}`, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-teal-500/50 hover:shadow-md transition-all duration-200 group">
      <div>
        {/* Top Header: Icon & Category Indicator */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 group-hover:bg-teal-600 group-hover:text-white transition-colors">
            <IconComponent className="w-6 h-6" />
          </div>

          <div className="text-right">
            <span className="text-base font-bold text-slate-900 block">
              {language === 'hi' ? service.priceUnitHi : service.priceUnitEn}
            </span>
            <span className="text-[11px] text-slate-500 block">
              {t('अनुमानित शुरुआती दर', 'Estimated Starting Rate')}
            </span>
          </div>
        </div>

        {/* Title & Tagline */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors leading-snug">
          {language === 'hi' ? service.nameHi : service.nameEn}
        </h3>
        
        <p className="text-xs text-teal-800 font-medium mt-1 mb-3">
          {language === 'hi' ? service.taglineHi : service.taglineEn}
        </p>

        {/* Description */}
        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          {language === 'hi' ? service.descriptionHi : service.descriptionEn}
        </p>

        {/* Key Features */}
        <div className="mb-4 pt-3 border-t border-slate-100">
          <p className="text-[11px] font-semibold text-slate-500 mb-2 uppercase tracking-wider">
            {t('शामिल सेवाएँ:', 'Key Inclusions:')}
          </p>
          <ul className="space-y-1.5">
            {(language === 'hi' ? service.featuresHi : service.featuresEn).map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Staff Qualifications & Booking Actions */}
      <div className="pt-4 border-t border-slate-100 space-y-3">
        {/* Qualification notice */}
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200/60">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
          <span className="truncate">
            {t('स्टाफ योग्यता:', 'Staff:')} {language === 'hi' ? service.qualificationsHi : service.qualificationsEn}
          </span>
        </div>

        {/* CTAs */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => navigateToBookingWithService(service)}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold py-2.5 px-3 rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{t('Book Now', 'Book Now')}</span>
          </button>

          <button
            onClick={handleWhatsAppInquiry}
            className="w-full bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 text-xs font-medium py-2.5 px-3 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
