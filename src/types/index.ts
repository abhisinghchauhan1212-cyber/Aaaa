export type Language = 'hi' | 'en';

export type ServiceCategory = 
  | 'nursing' 
  | 'icu_critical' 
  | 'gda_attendant' 
  | 'physiotherapy' 
  | 'elderly_bedridden' 
  | 'clinical_procedure';

export type ShiftDuration = '12h_day' | '12h_night' | '24h_live_in' | 'per_visit' | 'per_hour';

export interface HealthcareService {
  id: string;
  category: ServiceCategory;
  nameHi: string;
  nameEn: string;
  taglineHi: string;
  taglineEn: string;
  descriptionHi: string;
  descriptionEn: string;
  featuresHi: string[];
  featuresEn: string[];
  basePrice: number;
  priceUnitHi: string;
  priceUnitEn: string;
  qualificationsHi: string;
  qualificationsEn: string;
  iconName: string;
  isPopular?: boolean;
  isEmergencyAvailable?: boolean;
}

export type BookingStatus = 
  | 'Booking Received'
  | 'Under Review'
  | 'Staff Available'
  | 'Confirmed'
  | 'Staff Assigned'
  | 'Completed'
  | 'Cancelled';

export interface Booking {
  id: string; // e.g. UK07-2026-1024
  patientName: string;
  patientAge: number;
  patientGender: 'Male' | 'Female' | 'Other';
  mobileNumber: string;
  whatsappNumber: string;
  city: string; // e.g. Dehradun
  locality: string; // e.g. Shanti Vihar, Chakrata, Rajpur Road
  fullAddress: string;
  patientCondition: string;
  serviceId: string;
  serviceName: string;
  duration: ShiftDuration;
  startDate: string;
  startTime: string;
  specialInstructions?: string;
  preferredStaffId?: string;
  assignedStaffId?: string;
  assignedStaffName?: string;
  status: BookingStatus;
  createdAt: string;
  estimatedPrice: number;
  adminNotes?: string;
}

export interface StaffMember {
  id: string;
  name: string;
  photoUrl: string;
  roleHi: string;
  roleEn: string;
  category: ServiceCategory;
  qualifications: string; // e.g. B.Sc Nursing, GNM, BPT, Certified GDA
  experienceYears: number;
  availableServices: string[];
  shiftPreferences: string[]; // 12h, 24h, visits
  workAreas: string[]; // Shanti Vihar, Dehradun, Chakrata, etc.
  verificationStatus: 'Verified' | 'Pending Verification';
  councilRegistrationNo?: string;
  policeVerificationDone: boolean;
  dailyRate: number;
  hourlyRate?: number;
  isAvailable: boolean;
  rating: number;
  reviewsCount: number;
  phone: string;
}

export interface ContactEnquiry {
  id: string;
  name: string;
  phone: string;
  serviceNeeded: string;
  message: string;
  status: 'Pending' | 'Contacted' | 'Closed';
  createdAt: string;
}

export type NotificationChannel = 'in_app' | 'sms' | 'whatsapp';
export type NotificationRecipientType = 'patient' | 'staff' | 'admin';

export interface NotificationItem {
  id: string;
  bookingId: string;
  recipientType: NotificationRecipientType;
  recipientName: string;
  recipientPhone: string;
  titleHi: string;
  titleEn: string;
  messageHi: string;
  messageEn: string;
  channel: NotificationChannel;
  status: 'delivered' | 'read';
  type: 'status_change' | 'staff_assigned' | 'duty_confirmed' | 'booking_created';
  createdAt: string;
  isRead: boolean;
  smsContent?: string;
}

export interface SmsDeliveryRecord {
  id: string;
  recipientPhone: string;
  recipientName: string;
  recipientRole: 'Patient' | 'Staff Member';
  bookingId: string;
  message: string;
  senderId: string; // e.g. "HLTH07"
  timestamp: string;
  deliveryStatus: 'Sent & Delivered' | 'Delivered' | 'Queued';
}

