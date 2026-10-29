import test from 'node:test';
import assert from 'node:assert/strict';
import {
  generateBookingId,
  calculateEstimatedPrice,
  formatWhatsAppBookingMessage,
  filterStaff,
  validateBookingForm,
} from './bookingUtils';
import { StaffMember } from '../types';

test('generateBookingId produces proper UK07 prefix and current year format', () => {
  const id = generateBookingId();
  assert.match(id, /^UK07-\d{4}-\d{4}$/);
  const currentYear = new Date().getFullYear().toString();
  assert.ok(id.includes(currentYear));
});

test('calculateEstimatedPrice handles 12h, 24h, and visit rates', () => {
  const base = 1200;
  assert.equal(calculateEstimatedPrice(base, '12h_day'), 1200);
  assert.equal(calculateEstimatedPrice(base, '12h_night'), 1200);
  assert.equal(calculateEstimatedPrice(base, '24h_live_in'), 2200); // 1200 * 1.8 rounded to nearest 100
  assert.equal(calculateEstimatedPrice(600, 'per_visit'), 600);
});

test('formatWhatsAppBookingMessage contains critical patient and booking details', () => {
  const mockBooking = {
    id: 'UK07-2026-9999',
    patientName: 'Test Patient',
    patientAge: 65,
    serviceName: 'ICU Patient Care',
    duration: '24h_live_in' as const,
    locality: 'Shanti Vihar',
    fullAddress: 'Lane 2, House 10, Shanti Vihar',
    mobileNumber: '7906131879',
    startDate: '2026-11-01',
    startTime: '08:00 AM',
    specialInstructions: 'Oxygen needed',
  };

  const encoded = formatWhatsAppBookingMessage(mockBooking);
  const decoded = decodeURIComponent(encoded);
  assert.ok(decoded.includes('UK07-2026-9999'));
  assert.ok(decoded.includes('Test Patient'));
  assert.ok(decoded.includes('Shanti Vihar'));
  assert.ok(decoded.includes('7906131879'));
});

test('filterStaff accurately filters by category, availability, and search', () => {
  const sampleStaff: StaffMember[] = [
    {
      id: 's1',
      name: 'Sunita Rawat',
      photoUrl: '',
      roleHi: 'नर्स',
      roleEn: 'ICU Nurse',
      category: 'icu_critical',
      qualifications: 'B.Sc Nursing',
      experienceYears: 6,
      availableServices: ['ICU Care'],
      shiftPreferences: ['12h_day'],
      workAreas: ['Shanti Vihar', 'Rajpur Road'],
      verificationStatus: 'Verified',
      policeVerificationDone: true,
      dailyRate: 3500,
      isAvailable: true,
      rating: 4.9,
      reviewsCount: 30,
      phone: '7906131879',
    },
    {
      id: 's2',
      name: 'Pooja Joshi',
      photoUrl: '',
      roleHi: 'केयरगिवर',
      roleEn: 'GDA Caregiver',
      category: 'gda_attendant',
      qualifications: 'Certified GDA',
      experienceYears: 4,
      availableServices: ['GDA Care'],
      shiftPreferences: ['12h_day'],
      workAreas: ['Prem Nagar'],
      verificationStatus: 'Verified',
      policeVerificationDone: true,
      dailyRate: 1100,
      isAvailable: false,
      rating: 4.5,
      reviewsCount: 15,
      phone: '7906131879',
    },
  ];

  const icuOnly = filterStaff(sampleStaff, { category: 'icu_critical' });
  assert.equal(icuOnly.length, 1);
  assert.equal(icuOnly[0].id, 's1');

  const availableOnly = filterStaff(sampleStaff, { onlyAvailable: true });
  assert.equal(availableOnly.length, 1);
  assert.equal(availableOnly[0].id, 's1');

  const searchByName = filterStaff(sampleStaff, { searchQuery: 'Pooja' });
  assert.equal(searchByName.length, 1);
  assert.equal(searchByName[0].id, 's2');
});

test('validateBookingForm detects empty and invalid fields', () => {
  const invalid = validateBookingForm({
    patientName: '',
    patientAge: 0,
    mobileNumber: '123',
    fullAddress: 'No',
    serviceId: '',
    startDate: '',
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.patientName);
  assert.ok(invalid.errors.patientAge);
  assert.ok(invalid.errors.mobileNumber);
  assert.ok(invalid.errors.fullAddress);
  assert.ok(invalid.errors.serviceId);

  const valid = validateBookingForm({
    patientName: 'Kishan Singh',
    patientAge: 72,
    mobileNumber: '7906131879',
    fullAddress: 'Chakrata Road, Dehradun',
    serviceId: 'home-patient-care',
    startDate: '2026-10-30',
  });
  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});
