export interface AgeCategoryItem {
  category: string;
  ageRange: string;
  focus: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  deliverables: string[];
  beneficiaries: string[];
  ageCategories?: AgeCategoryItem[];
  ctaLabel: string;
}

export type UserCategory = 
  | 'Parent / Guardian'
  | 'School Administrator'
  | 'Teacher / Educator'
  | 'Individual Learner'
  | 'Corporate / NGO Partner';

export type ContactMethod = 
  | 'WhatsApp Message'
  | 'Phone Call'
  | 'Email'
  | 'Video Call (Accessible / Sign-Supported)';

export interface BookingSubmission {
  id?: string;
  timestamp?: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  preferredService: string;
  preferredDate: string;
  preferredTime: string;
  userCategory: UserCategory;
  preferredContactMethod: ContactMethod;
  additionalMessage?: string;
  status?: 'Pending Review' | 'Contacted' | 'Confirmed' | 'Archived';
  source?: string;
}

export interface ContactSubmission {
  id?: string;
  timestamp?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status?: 'New' | 'Replied' | 'Archived';
}

export interface DonationEnquirySubmission {
  id?: string;
  timestamp?: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  donorCategory: 'Individual Supporter' | 'Corporate / CSR' | 'Foundation / Trust' | 'Alumni / Community';
  impactAreaOfInterest: 
    | 'Early Childhood Intervention'
    | 'Assistive Learning Tools & Materials'
    | 'Deaf & Hearing Accessibility Equipment'
    | 'Teacher Inclusion Training & Scholarships'
    | 'General Inclusion Advocacy';
  enquiryDetails: string;
  preferredFollowUp: 'Email' | 'Phone Call' | 'WhatsApp';
  status?: 'Enquiry Received' | 'Followed Up' | 'Completed';
}

export interface DonationPaymentRecord {
  id?: string;
  timestamp?: string;
  localDateString?: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  amount: number;
  currency: 'USD' | 'NGN' | 'GBP' | 'EUR';
  frequency: 'one-time' | 'monthly';
  impactAreaOfInterest: string;
  dedication?: string;
  isAnonymous?: boolean;
  status: 'Completed (Demo Payment)' | 'Completed (Stripe)' | 'Pending Verification' | 'Enquiry Received';
  paymentMethod?: string;
  transactionRef?: string;
  verifiedPayment: boolean;
  cardBrand?: string;
  cardLast4?: string;
}

export interface SheetsSyncStatus {
  connected: boolean;
  webhookConfigured: boolean;
  lastSyncTime?: string;
  totalBookings: number;
  totalContacts: number;
  totalDonationEnquiries: number;
  configuredTabs: string[];
}

export interface StaffAuthSession {
  email: string;
  role: string;
  token: string;
  loginTime: string;
}

export interface EmailLogRecord {
  id: string;
  timestamp: string;
  subject: string;
  to: string[];
  from: string;
  category: 'booking' | 'consultation' | 'donation' | 'contact' | 'test';
  status: 'sent' | 'simulated' | 'failed';
  errorMessage?: string;
  bodySnippet: string;
  fullBody: string;
  fullHtml?: string;
  referenceId?: string;
}

export interface EmailServiceStatus {
  host: string;
  port: number;
  configured: boolean;
  tls: boolean;
  ssl: boolean;
  username: string;
  designatedRecipients: string[];
  totalLoggedEmails: number;
}


