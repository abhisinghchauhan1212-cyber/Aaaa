import test from 'node:test';
import assert from 'node:assert/strict';
import { 
  formatPatientSms, 
  formatStaffSms, 
  createStatusChangeNotification, 
  createStaffAssignmentNotification 
} from './notificationUtils';
import { Booking, StaffMember } from '../types';

const mockBooking: Booking = {
  id: 'UK07-2026-8888',
  patientName: 'Ramesh Joshi',
  patientAge: 70,
  patientGender: 'Male',
  mobileNumber: '9897000000',
  whatsappNumber: '9897000000',
  city: 'Dehradun',
  locality: 'Shanti Vihar',
  fullAddress: 'Lane 1, Shanti Vihar',
  patientCondition: 'Stroke rehab',
  serviceId: 'home-patient-care',
  serviceName: 'Home Patient Care',
  duration: '12h_day',
  startDate: '2026-11-02',
  startTime: '09:00 AM',
  status: 'Under Review',
  createdAt: new Date().toISOString(),
  estimatedPrice: 1200,
};

const mockStaff: StaffMember = {
  id: 'staff-01',
  name: 'Sunita Rawat',
  photoUrl: '',
  roleHi: 'नर्स',
  roleEn: 'Staff Nurse',
  category: 'nursing',
  qualifications: 'B.Sc Nursing',
  experienceYears: 6,
  availableServices: [],
  shiftPreferences: [],
  workAreas: ['Shanti Vihar'],
  verificationStatus: 'Verified',
  policeVerificationDone: true,
  dailyRate: 1800,
  isAvailable: true,
  rating: 4.9,
  reviewsCount: 30,
  phone: '7906131879',
};

test('formatPatientSms produces clear messages for status changes', () => {
  const staffAvail = formatPatientSms(mockBooking, 'Staff Available');
  assert.ok(staffAvail.includes('UK07-2026-8888'));
  assert.ok(staffAvail.includes('AVAILABLE'));

  const confirmed = formatPatientSms(mockBooking, 'Confirmed');
  assert.ok(confirmed.includes('CONFIRMED'));
  assert.ok(confirmed.includes('Ramesh Joshi'));

  const assigned = formatPatientSms(mockBooking, 'Staff Assigned', 'Sunita Rawat');
  assert.ok(assigned.includes('Sunita Rawat'));
  assert.ok(assigned.includes('UK07-2026-8888'));
});

test('formatStaffSms generates actionable assignment details for caregiver', () => {
  const staffSms = formatStaffSms(mockBooking, mockStaff);
  assert.ok(staffSms.includes('Sunita Rawat'));
  assert.ok(staffSms.includes('Ramesh Joshi'));
  assert.ok(staffSms.includes('Shanti Vihar'));
  assert.ok(staffSms.includes('7906131879'));
});

test('createStatusChangeNotification generates both in-app notification and SMS delivery record', () => {
  const { patientNotif, patientSms } = createStatusChangeNotification(
    mockBooking,
    'Under Review',
    'Confirmed'
  );
  assert.equal(patientNotif.recipientName, 'Ramesh Joshi');
  assert.equal(patientNotif.recipientType, 'patient');
  assert.equal(patientNotif.isRead, false);
  assert.equal(patientSms.deliveryStatus, 'Sent & Delivered');
  assert.equal(patientSms.senderId, 'HLTH07');
});

test('createStaffAssignmentNotification correctly notifies assigned nurse', () => {
  const { staffNotif, staffSms } = createStaffAssignmentNotification(mockBooking, mockStaff);
  assert.equal(staffNotif.recipientName, 'Sunita Rawat');
  assert.equal(staffNotif.recipientType, 'staff');
  assert.equal(staffNotif.type, 'staff_assigned');
  assert.equal(staffSms.recipientPhone, '7906131879');
});
