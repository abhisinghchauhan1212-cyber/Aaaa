import { Booking, ShiftDuration, StaffMember } from '../types';

export function generateBookingId(): string {
  const year = new Date().getFullYear();
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `UK07-${year}-${randomDigits}`;
}

export function calculateEstimatedPrice(basePrice: number, duration: ShiftDuration): number {
  switch (duration) {
    case '12h_day':
    case '12h_night':
      return basePrice;
    case '24h_live_in':
      // 24h is usually 1.8x - 2x single 12h
      return Math.round(basePrice * 1.8 / 100) * 100;
    case 'per_visit':
      return basePrice;
    case 'per_hour':
      return Math.max(300, Math.round(basePrice / 6));
    default:
      return basePrice;
  }
}

export function formatWhatsAppBookingMessage(
  booking: Pick<Booking, 'id' | 'patientName' | 'patientAge' | 'serviceName' | 'duration' | 'locality' | 'fullAddress' | 'mobileNumber' | 'startDate' | 'startTime' | 'specialInstructions'>
): string {
  const durationLabels: Record<ShiftDuration, string> = {
    '12h_day': '12 Hours (Day Shift)',
    '12h_night': '12 Hours (Night Shift)',
    '24h_live_in': '24 Hours (Continuous Care)',
    'per_visit': 'Per Visit / Single Procedure',
    'per_hour': 'Hourly Basis',
  };

  const text = `*New Booking Request - Health UK07 (Dehradun)*
-----------------------------------------
*Booking ID:* ${booking.id}
*Patient Name:* ${booking.patientName} (${booking.patientAge} Yrs)
*Phone:* ${booking.mobileNumber}
*Service Required:* ${booking.serviceName}
*Shift / Duration:* ${durationLabels[booking.duration] || booking.duration}
*Start Date:* ${booking.startDate} at ${booking.startTime}
*Locality:* ${booking.locality}
*Full Address:* ${booking.fullAddress}
*Special Instructions:* ${booking.specialInstructions || 'None'}
-----------------------------------------
Please confirm staff availability for this patient. Thank you!`;

  return encodeURIComponent(text);
}

export interface StaffFilterCriteria {
  category?: string;
  workArea?: string;
  onlyAvailable?: boolean;
  minRating?: number;
  searchQuery?: string;
}

export function filterStaff(staffList: StaffMember[], filters: StaffFilterCriteria): StaffMember[] {
  return staffList.filter((staff) => {
    if (filters.category && filters.category !== 'all' && staff.category !== filters.category) {
      return false;
    }
    if (filters.onlyAvailable && !staff.isAvailable) {
      return false;
    }
    if (filters.minRating && staff.rating < filters.minRating) {
      return false;
    }
    if (filters.workArea && filters.workArea !== 'all') {
      const matchesArea = staff.workAreas.some((area) =>
        area.toLowerCase().includes(filters.workArea!.toLowerCase())
      );
      if (!matchesArea) return false;
    }
    if (filters.searchQuery && filters.searchQuery.trim().length > 0) {
      const q = filters.searchQuery.toLowerCase();
      const matchesText =
        staff.name.toLowerCase().includes(q) ||
        staff.roleHi.toLowerCase().includes(q) ||
        staff.roleEn.toLowerCase().includes(q) ||
        staff.qualifications.toLowerCase().includes(q);
      if (!matchesText) return false;
    }
    return true;
  });
}

export interface BookingValidationErrors {
  [key: string]: string | undefined;
  patientName?: string;
  patientAge?: string;
  mobileNumber?: string;
  fullAddress?: string;
  serviceId?: string;
  startDate?: string;
}

export function validateBookingForm(data: {
  patientName: string;
  patientAge: number | string;
  mobileNumber: string;
  fullAddress: string;
  serviceId: string;
  startDate: string;
}): { isValid: boolean; errors: BookingValidationErrors } {
  const errors: BookingValidationErrors = {};

  if (!data.patientName || data.patientName.trim().length < 2) {
    errors.patientName = 'Please enter patient name (मरीज का नाम आवश्यक है)';
  }

  const ageNum = Number(data.patientAge);
  if (!data.patientAge || isNaN(ageNum) || ageNum <= 0 || ageNum > 120) {
    errors.patientAge = 'Please enter valid age between 1-120 (सही उम्र दर्ज करें)';
  }

  const phoneClean = data.mobileNumber.replace(/\D/g, '');
  if (!phoneClean || phoneClean.length < 10) {
    errors.mobileNumber = 'Please enter valid 10-digit mobile number (10 अंकों का मोबाइल नंबर)';
  }

  if (!data.fullAddress || data.fullAddress.trim().length < 5) {
    errors.fullAddress = 'Please enter complete home address in Dehradun (पूरा पता दर्ज करें)';
  }

  if (!data.serviceId) {
    errors.serviceId = 'Please select a healthcare service (सेवा चुनें)';
  }

  if (!data.startDate) {
    errors.startDate = 'Please select service start date (तारीख चुनें)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
