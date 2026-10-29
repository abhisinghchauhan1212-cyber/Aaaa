import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Booking, 
  BookingStatus, 
  ContactEnquiry, 
  HealthcareService, 
  StaffMember, 
  NotificationItem, 
  SmsDeliveryRecord 
} from '../types';
import { 
  INITIAL_BOOKINGS, 
  INITIAL_ENQUIRIES, 
  INITIAL_STAFF, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_SMS_LOGS 
} from '../data/initialData';
import { HEALTHCARE_SERVICES } from '../data/servicesData';
import { 
  createStatusChangeNotification, 
  createStaffAssignmentNotification,
  playNotificationSound,
  triggerBrowserNotification
} from '../utils/notificationUtils';

export type NavigationPage = 
  | 'home' 
  | 'services' 
  | 'book' 
  | 'track' 
  | 'staff' 
  | 'icu-care' 
  | 'physiotherapy' 
  | 'pricing' 
  | 'staff-register' 
  | 'contact' 
  | 'admin' 
  | 'faq' 
  | 'privacy' 
  | 'terms' 
  | 'cancellation'
  | 'setup-guide';

interface AppContextType {
  currentPage: NavigationPage;
  setCurrentPage: (page: NavigationPage) => void;
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  updateBookingStatus: (
    bookingId: string, 
    status: BookingStatus, 
    assignedStaffId?: string, 
    assignedStaffName?: string, 
    adminNotes?: string
  ) => void;
  staff: StaffMember[];
  addStaff: (member: StaffMember) => void;
  updateStaff: (member: StaffMember) => void;
  toggleStaffAvailability: (staffId: string) => void;
  enquiries: ContactEnquiry[];
  addEnquiry: (enquiry: ContactEnquiry) => void;
  updateEnquiryStatus: (id: string, status: 'Pending' | 'Contacted' | 'Closed') => void;
  selectedServiceForBooking: HealthcareService | null;
  setSelectedServiceForBooking: (service: HealthcareService | null) => void;
  selectedStaffForBooking: StaffMember | null;
  setSelectedStaffForBooking: (staff: StaffMember | null) => void;
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: (val: boolean) => void;
  navigateToBookingWithService: (service: HealthcareService) => void;
  navigateToBookingWithStaff: (staff: StaffMember) => void;
  lastCreatedBookingId: string | null;
  setLastCreatedBookingId: (id: string | null) => void;

  // Real-Time Notification State
  notifications: NotificationItem[];
  smsLogs: SmsDeliveryRecord[];
  activeToastNotification: NotificationItem | null;
  dismissToast: () => void;
  unreadNotificationsCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  clearNotifications: () => void;
  isNotificationModalOpen: boolean;
  setIsNotificationModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPageState] = useState<NavigationPage>('home');

  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('health_uk07_bookings');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_BOOKINGS;
  });

  const [staff, setStaff] = useState<StaffMember[]>(() => {
    try {
      const saved = localStorage.getItem('health_uk07_staff');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_STAFF;
  });

  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>(() => {
    try {
      const saved = localStorage.getItem('health_uk07_enquiries');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_ENQUIRIES;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem('health_uk07_notifications');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_NOTIFICATIONS;
  });

  const [smsLogs, setSmsLogs] = useState<SmsDeliveryRecord[]>(() => {
    try {
      const saved = localStorage.getItem('health_uk07_sms_logs');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_SMS_LOGS;
  });

  const [activeToastNotification, setActiveToastNotification] = useState<NotificationItem | null>(null);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<HealthcareService | null>(null);
  const [selectedStaffForBooking, setSelectedStaffForBooking] = useState<StaffMember | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem('health_uk07_admin_auth') === 'true';
  });
  const [lastCreatedBookingId, setLastCreatedBookingId] = useState<string | null>(null);

  // Sync to local storage for realistic persistence
  useEffect(() => {
    localStorage.setItem('health_uk07_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('health_uk07_staff', JSON.stringify(staff));
  }, [staff]);

  useEffect(() => {
    localStorage.setItem('health_uk07_enquiries', JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    localStorage.setItem('health_uk07_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('health_uk07_sms_logs', JSON.stringify(smsLogs));
  }, [smsLogs]);

  // Auto-dismiss notification toast after 6 seconds
  useEffect(() => {
    if (activeToastNotification) {
      const timer = setTimeout(() => {
        setActiveToastNotification(null);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [activeToastNotification]);

  const dismissToast = () => setActiveToastNotification(null);

  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const setCurrentPage = (page: NavigationPage) => {
    setCurrentPageState(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addBooking = (booking: Booking) => {
    setBookings((prev) => [booking, ...prev]);
    setLastCreatedBookingId(booking.id);

    // Initial booking receipt SMS & In-app notification
    const now = new Date().toISOString();
    const initSms: SmsDeliveryRecord = {
      id: `sms-${Date.now()}`,
      recipientPhone: booking.mobileNumber,
      recipientName: booking.patientName,
      recipientRole: 'Patient',
      bookingId: booking.id,
      message: `Health UK07: We have received your booking request ${booking.id} for ${booking.patientName}. Coordinator Abhishek Chauhan (7906131879) is reviewing staff availability in Dehradun.`,
      senderId: 'HLTH07',
      timestamp: now,
      deliveryStatus: 'Sent & Delivered',
    };

    const initNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      bookingId: booking.id,
      recipientType: 'patient',
      recipientName: booking.patientName,
      recipientPhone: booking.mobileNumber,
      titleHi: `बुकिंग प्राप्त हुई: ${booking.id}`,
      titleEn: `Booking Received: ${booking.id}`,
      messageHi: `मरीज ${booking.patientName} (${booking.serviceName}) की बुकिंग सफलतापूर्वक दर्ज की गई। समीक्षा चल रही है।`,
      messageEn: `Booking for ${booking.patientName} (${booking.serviceName}) is received and under review.`,
      channel: 'in_app',
      status: 'delivered',
      type: 'booking_created',
      createdAt: now,
      isRead: false,
      smsContent: initSms.message,
    };

    setNotifications((prev) => [initNotif, ...prev]);
    setSmsLogs((prev) => [initSms, ...prev]);
    setActiveToastNotification(initNotif);
    playNotificationSound();
    triggerBrowserNotification(initNotif.titleEn, initNotif.messageEn);
  };

  const updateBookingStatus = (
    bookingId: string,
    status: BookingStatus,
    assignedStaffId?: string,
    assignedStaffName?: string,
    adminNotes?: string
  ) => {
    const existing = bookings.find((b) => b.id === bookingId);
    if (!existing) return;

    const oldStatus = existing.status;

    // Update booking object
    const updatedBooking: Booking = {
      ...existing,
      status,
      ...(assignedStaffId !== undefined ? { assignedStaffId } : {}),
      ...(assignedStaffName !== undefined ? { assignedStaffName } : {}),
      ...(adminNotes !== undefined ? { adminNotes } : {}),
    };

    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? updatedBooking : b))
    );

    // If status changed or staff assigned: trigger real-time notification & SMS!
    const newNotifs: NotificationItem[] = [];
    const newSms: SmsDeliveryRecord[] = [];

    // 1. Patient Notification & SMS
    const { patientNotif, patientSms } = createStatusChangeNotification(
      updatedBooking,
      oldStatus,
      status,
      assignedStaffName || existing.assignedStaffName
    );
    newNotifs.push(patientNotif);
    newSms.push(patientSms);

    // 2. Staff Notification & SMS if assigned
    const targetStaffId = assignedStaffId || existing.assignedStaffId;
    if (targetStaffId) {
      const staffMember = staff.find((s) => s.id === targetStaffId);
      if (staffMember) {
        const { staffNotif, staffSms } = createStaffAssignmentNotification(
          updatedBooking,
          staffMember
        );
        newNotifs.push(staffNotif);
        newSms.push(staffSms);
      }
    }

    setNotifications((prev) => [...newNotifs, ...prev]);
    setSmsLogs((prev) => [...newSms, ...prev]);
    
    // Show toast for immediate visual gratification with sound & push alert
    setActiveToastNotification(newNotifs[0]);
    playNotificationSound();
    triggerBrowserNotification(newNotifs[0].titleEn, newNotifs[0].messageEn);
  };

  const addStaff = (member: StaffMember) => {
    setStaff((prev) => [member, ...prev]);
  };

  const updateStaff = (member: StaffMember) => {
    setStaff((prev) => prev.map((s) => (s.id === member.id ? member : s)));
  };

  const toggleStaffAvailability = (staffId: string) => {
    setStaff((prev) =>
      prev.map((s) => (s.id === staffId ? { ...s, isAvailable: !s.isAvailable } : s))
    );
  };

  const addEnquiry = (enquiry: ContactEnquiry) => {
    setEnquiries((prev) => [enquiry, ...prev]);
  };

  const updateEnquiryStatus = (id: string, status: 'Pending' | 'Contacted' | 'Closed') => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e))
    );
  };

  const navigateToBookingWithService = (service: HealthcareService) => {
    setSelectedServiceForBooking(service);
    setCurrentPage('book');
  };

  const navigateToBookingWithStaff = (staffMember: StaffMember) => {
    setSelectedStaffForBooking(staffMember);
    const match = HEALTHCARE_SERVICES.find((s) =>
      staffMember.availableServices.some((as) => as.toLowerCase().includes(s.id.toLowerCase()))
    );
    if (match) {
      setSelectedServiceForBooking(match);
    }
    setCurrentPage('book');
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        bookings,
        addBooking,
        updateBookingStatus,
        staff,
        addStaff,
        updateStaff,
        toggleStaffAvailability,
        enquiries,
        addEnquiry,
        updateEnquiryStatus,
        selectedServiceForBooking,
        setSelectedServiceForBooking,
        selectedStaffForBooking,
        setSelectedStaffForBooking,
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        navigateToBookingWithService,
        navigateToBookingWithStaff,
        lastCreatedBookingId,
        setLastCreatedBookingId,
        notifications,
        smsLogs,
        activeToastNotification,
        dismissToast,
        unreadNotificationsCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        clearNotifications,
        isNotificationModalOpen,
        setIsNotificationModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
