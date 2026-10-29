import { Booking, BookingStatus, NotificationItem, SmsDeliveryRecord, StaffMember } from '../types';

export function formatPatientSms(
  booking: Booking, 
  newStatus: BookingStatus, 
  assignedStaffName?: string
): string {
  switch (newStatus) {
    case 'Staff Available':
      return `Health UK07 Update: Qualified healthcare staff is AVAILABLE for Booking ID ${booking.id} (${booking.serviceName}). Our coordinator Abhishek Chauhan (7906131879) is confirming dispatch time.`;
    case 'Confirmed':
      return `Health UK07 Confirmed: Your patient care booking ${booking.id} for ${booking.patientName} is CONFIRMED for ${booking.startDate} at ${booking.startTime} (${booking.locality}, Dehradun).`;
    case 'Staff Assigned':
      return `Health UK07 Staff Assigned: Staff member ${assignedStaffName || 'Verified Nurse'} has been assigned to patient ${booking.patientName} for Booking ID ${booking.id}. Desk: 7906131879.`;
    case 'Completed':
      return `Health UK07: Care duty for Booking ID ${booking.id} (${booking.patientName}) has been marked COMPLETED. Thank you for trusting Health UK07 Dehradun.`;
    case 'Cancelled':
      return `Health UK07: Booking ID ${booking.id} for ${booking.patientName} has been cancelled. For queries, contact Abhishek Chauhan at 7906131879.`;
    default:
      return `Health UK07: Status update for Booking ID ${booking.id} (${booking.patientName}): ${newStatus}.`;
  }
}

export function formatStaffSms(booking: Booking, staffMember: StaffMember): string {
  return `Health UK07 Duty Alert: Hi ${staffMember.name}, you have been assigned to patient ${booking.patientName} (${booking.patientAge} Yrs) at ${booking.locality}, Dehradun. Shift: ${booking.duration.replace('_', ' ')} starting ${booking.startDate} at ${booking.startTime}. Contact desk: 7906131879.`;
}

export function createStatusChangeNotification(
  booking: Booking,
  oldStatus: BookingStatus,
  newStatus: BookingStatus,
  assignedStaffName?: string
): { patientNotif: NotificationItem; patientSms: SmsDeliveryRecord } {
  const notifId = `notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const smsId = `sms-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const now = new Date().toISOString();

  let titleHi = `बुकिंग स्थिति: ${newStatus}`;
  let titleEn = `Booking Status: ${newStatus}`;
  let messageHi = `आपकी बुकिंग ${booking.id} (${booking.patientName}) की स्थिति बदलकर "${newStatus}" हो गई है।`;
  let messageEn = `Your booking ${booking.id} for ${booking.patientName} has been updated to "${newStatus}".`;

  if (newStatus === 'Staff Available') {
    titleHi = 'स्टाफ उपलब्ध है';
    titleEn = 'Healthcare Staff Available';
    messageHi = `मरीज ${booking.patientName} (${booking.serviceName}) के लिए योग्य स्टाफ उपलब्ध हो गया है। कोऑर्डिनेटर जल्द पुष्टि करेंगे।`;
    messageEn = `Verified healthcare staff is available for ${booking.patientName} (${booking.serviceName}). Desk will confirm duty schedule shortly.`;
  } else if (newStatus === 'Confirmed') {
    titleHi = 'बुकिंग की पुष्टि हो गई (Confirmed)';
    titleEn = 'Booking Confirmed';
    messageHi = `आपकी मरीज सेवा बुकिंग ${booking.id} की पुष्टि हो गई है। सेवा ${booking.startDate} को ${booking.startTime} से शुरू होगी।`;
    messageEn = `Your booking ${booking.id} has been confirmed to commence on ${booking.startDate} at ${booking.startTime}.`;
  } else if (newStatus === 'Staff Assigned') {
    titleHi = `स्टाफ नियुक्त: ${assignedStaffName || 'हेल्थकेयर अटेंडेंट'}`;
    titleEn = `Staff Assigned: ${assignedStaffName || 'Healthcare Nurse'}`;
    messageHi = `मरीज ${booking.patientName} की सेवा के लिए ${assignedStaffName || 'सत्यापित स्टाफ'} को नियुक्त कर दिया गया है।`;
    messageEn = `${assignedStaffName || 'Verified Staff'} has been assigned to care for patient ${booking.patientName}.`;
  }

  const smsText = formatPatientSms(booking, newStatus, assignedStaffName);

  const patientNotif: NotificationItem = {
    id: notifId,
    bookingId: booking.id,
    recipientType: 'patient',
    recipientName: booking.patientName,
    recipientPhone: booking.mobileNumber,
    titleHi,
    titleEn,
    messageHi,
    messageEn,
    channel: 'in_app',
    status: 'delivered',
    type: 'status_change',
    createdAt: now,
    isRead: false,
    smsContent: smsText,
  };

  const patientSms: SmsDeliveryRecord = {
    id: smsId,
    recipientPhone: booking.mobileNumber,
    recipientName: booking.patientName,
    recipientRole: 'Patient',
    bookingId: booking.id,
    message: smsText,
    senderId: 'HLTH07',
    timestamp: now,
    deliveryStatus: 'Sent & Delivered',
  };

  return { patientNotif, patientSms };
}

export function createStaffAssignmentNotification(
  booking: Booking,
  staffMember: StaffMember
): { staffNotif: NotificationItem; staffSms: SmsDeliveryRecord } {
  const notifId = `notif-staff-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const smsId = `sms-staff-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const now = new Date().toISOString();

  const smsText = formatStaffSms(booking, staffMember);

  const staffNotif: NotificationItem = {
    id: notifId,
    bookingId: booking.id,
    recipientType: 'staff',
    recipientName: staffMember.name,
    recipientPhone: staffMember.phone,
    titleHi: `नया मरीज असाइनमेंट: ${booking.patientName}`,
    titleEn: `New Patient Assignment: ${booking.patientName}`,
    messageHi: `आपको मरीज ${booking.patientName} (${booking.locality}, देहरादून) की देखभाल के लिए नियुक्त किया गया है। तारीख: ${booking.startDate} (${booking.startTime})।`,
    messageEn: `You have been assigned to patient ${booking.patientName} in ${booking.locality}, Dehradun. Duty begins ${booking.startDate} at ${booking.startTime}.`,
    channel: 'in_app',
    status: 'delivered',
    type: 'staff_assigned',
    createdAt: now,
    isRead: false,
    smsContent: smsText,
  };

  const staffSms: SmsDeliveryRecord = {
    id: smsId,
    recipientPhone: staffMember.phone,
    recipientName: staffMember.name,
    recipientRole: 'Staff Member',
    bookingId: booking.id,
    message: smsText,
    senderId: 'HLTH07',
    timestamp: now,
    deliveryStatus: 'Sent & Delivered',
  };

  return { staffNotif, staffSms };
}

export function playNotificationSound(): void {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const now = ctx.currentTime;
    
    // Note 1: 587.33 Hz (D5)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, now);
    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.12, now + 0.03);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.25);

    // Note 2: 880 Hz (A5)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880, now + 0.15);
    gain2.gain.setValueAtTime(0, now + 0.15);
    gain2.gain.linearRampToValueAtTime(0.15, now + 0.18);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.15);
    osc2.stop(now + 0.48);
  } catch {
    // Ignore audio context restriction if user has not interacted
  }
}

export function triggerBrowserNotification(title: string, body: string): void {
  try {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        body,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
      });
    }
  } catch {
    // Fallback if Notification API not supported
  }
}

