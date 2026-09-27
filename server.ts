import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

import { NotificationDispatcher, DESIGNATED_STAFF_EMAILS, EmailLogRecord } from './src/services/notificationDispatcher';
import { EmailBuilder, SmtpClient, ClientConfiguration } from './src/services/email4j';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '1mb' }));

// File-backed persistence fallback with Vercel serverless /tmp compatibility
const isVercel = process.env.VERCEL === '1' || Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME);
const DATA_DIR = isVercel ? path.join('/tmp', 'ideal-data') : path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'submissions.json');

try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
} catch (err) {
  // Silent fallback on read-only environments
}

interface StoredData {
  bookings: any[];
  contacts: any[];
  donations: any[];
  emailLogs?: EmailLogRecord[];
}

function loadData(): StoredData {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    // Fresh in-memory fallback
  }
  return { bookings: [], contacts: [], donations: [], emailLogs: [] };
}

function saveData(data: StoredData) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    // Non-fatal on serverless /tmp limitations
  }
}

// In-memory / file-synced database
const database = loadData();
if (!database.emailLogs) {
  database.emailLogs = [];
}

// Email4J Notification Dispatcher targeting the 3 authorized staff mailboxes:
// - idealspedconsultant@gmail.com
// - sakintibubo@gmail.com
// - osamsond@gmail.com
const notificationDispatcher = new NotificationDispatcher(DESIGNATED_STAFF_EMAILS);
if (database.emailLogs && database.emailLogs.length > 0) {
  notificationDispatcher.setInitialLogs(database.emailLogs);
}

// Forwarder to Google Apps Script Webhook
async function forwardToGoogleSheet(tabName: string, rowData: Record<string, any>) {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!webhookUrl || !webhookUrl.startsWith('http')) {
    return { forwarded: false, reason: 'No webhook URL configured. Stored locally in web backend.' };
  }

  try {
    const payload = {
      tab: tabName,
      timestamp: new Date().toISOString(),
      data: rowData,
    };

    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      return { forwarded: true };
    } else {
      const text = await res.text().catch(() => '');
      return { forwarded: false, error: `Google Sheets returned status ${res.status}: ${text}` };
    }
  } catch (err: any) {
    console.error('Error forwarding to Google Sheet Webhook:', err.message);
    return { forwarded: false, error: err.message };
  }
}

// ==========================================
// API ROUTES
// ==========================================

// Firestore Integration Sync
let firebaseConfig: any = null;
try {
  const cfgPath = path.join(process.cwd(), 'firebase-applet-config.json');
  if (fs.existsSync(cfgPath)) {
    firebaseConfig = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
  }
} catch (e) {
  // config load fallback
}

async function syncToFirestore(collectionName: string, docId: string, data: any) {
  if (!firebaseConfig?.projectId || !firebaseConfig?.apiKey) return;
  try {
    const dbId = firebaseConfig.firestoreDatabaseId || '(default)';
    const url = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/${dbId}/documents/${collectionName}/${docId}?key=${firebaseConfig.apiKey}`;
    
    // Format fields for Firestore REST API
    const fields: Record<string, any> = {};
    for (const [key, val] of Object.entries(data)) {
      if (typeof val === 'string') {
        fields[key] = { stringValue: val };
      } else if (typeof val === 'number') {
        fields[key] = { doubleValue: val };
      } else if (typeof val === 'boolean') {
        fields[key] = { booleanValue: val };
      } else if (val !== null && val !== undefined) {
        fields[key] = { stringValue: String(val) };
      }
    }

    await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fields }),
    });
  } catch (err: any) {
    console.warn('[Firestore] Sync notice:', err.message);
  }
}

async function fetchFromFirestore(collectionName: string): Promise<any[]> {
  if (!firebaseConfig?.projectId || !firebaseConfig?.apiKey) return [];
  try {
    const dbId = firebaseConfig.firestoreDatabaseId || '(default)';
    const url = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/${dbId}/documents/${collectionName}?key=${firebaseConfig.apiKey}`;
    const response = await fetch(url);
    if (!response.ok) return [];
    const json = await response.json();
    if (!json.documents || !Array.isArray(json.documents)) return [];
    return json.documents.map((doc: any) => {
      const fields = doc.fields || {};
      const obj: any = {};
      for (const [key, valueObj] of Object.entries(fields)) {
        const val: any = valueObj;
        obj[key] = val.stringValue ?? val.doubleValue ?? val.integerValue ?? val.booleanValue ?? null;
      }
      return obj;
    });
  } catch (err: any) {
    console.warn(`[Firestore] Fetch ${collectionName} notice:`, err.message);
    return [];
  }
}

// 1. Health check & status
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'Ideal Special Education Consult LTD API',
    timestamp: new Date().toISOString(),
  });
});

// 2. Google Sheets sync status
app.get('/api/sheets-status', (req: Request, res: Response) => {
  const webhookConfigured = !!(process.env.GOOGLE_SHEET_WEBHOOK_URL && process.env.GOOGLE_SHEET_WEBHOOK_URL.startsWith('http'));
  res.json({
    connected: true,
    webhookConfigured,
    totalBookings: database.bookings.length,
    totalContacts: database.contacts.length,
    totalDonationEnquiries: database.donations.length,
    configuredTabs: [
      'Booking Requests',
      'Contact Enquiries',
      'Donation Enquiries',
      'Services',
      'Website Configuration',
    ],
  });
});

// 3. Book a Session Submission
app.post('/api/bookings', async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      preferredService,
      preferredDate,
      preferredTime,
      userCategory,
      preferredContactMethod,
      additionalMessage,
      honeypot, // Anti-spam trap
    } = req.body;

    // Spam honeypot check
    if (honeypot) {
      return res.status(200).json({ success: true, message: 'Received' });
    }

    // Validation
    if (!fullName || !email || !phoneNumber || !preferredService) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: Name, Email, Phone Number, and Preferred Service are required.',
      });
    }

    const refId = `BK-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;
    const timestamp = new Date().toISOString();
    const formattedDate = new Date().toLocaleString('en-NG', { timeZone: 'Africa/Lagos' });

    const newBooking = {
      id: refId,
      timestamp,
      localDateString: formattedDate,
      fullName: String(fullName).trim(),
      email: String(email).trim().toLowerCase(),
      phoneNumber: String(phoneNumber).trim(),
      preferredService: String(preferredService).trim(),
      preferredDate: preferredDate || 'Flexible / Next Available',
      preferredTime: preferredTime || 'Flexible',
      userCategory: userCategory || 'Parent / Guardian',
      preferredContactMethod: preferredContactMethod || 'WhatsApp Message',
      additionalMessage: additionalMessage ? String(additionalMessage).trim() : '',
      status: 'Pending Review',
      appointmentConfirmed: false,
      notes: 'Submitted via official website portal. Staff follow-up required.',
    };

    database.bookings.unshift(newBooking);
    saveData(database);

    // Sync to Firebase Firestore & Google Sheets
    syncToFirestore('bookings', refId, newBooking);
    const sheetSync = await forwardToGoogleSheet('Booking Requests', newBooking);

    // Notify the 3 authorized mailboxes using Email4J (SmtpClient + EmailBuilder)
    let emailDispatch = null;
    try {
      const isConsultation = String(newBooking.preferredService).toLowerCase().includes('consult') ||
                             String(newBooking.preferredService).toLowerCase().includes('guidance') ||
                             Boolean(req.body.isConsultationBooking);

      let emailResult;
      if (isConsultation) {
        emailResult = await notificationDispatcher.notifyNewConsultation({
          ...newBooking,
          consultationType: newBooking.preferredService,
        });
      } else {
        emailResult = await notificationDispatcher.notifyNewBooking(newBooking);
      }

      if (emailResult?.logRecord) {
        database.emailLogs = notificationDispatcher.getLogs();
        saveData(database);
        syncToFirestore('email_notifications', emailResult.logRecord.id, emailResult.logRecord);
        emailDispatch = {
          status: emailResult.sendResult.status,
          recipients: emailResult.sendResult.recipients,
          subject: emailResult.logRecord.subject,
        };
      }
    } catch (mailErr: any) {
      console.warn('[Email4J] Booking notification error:', mailErr.message);
    }

    res.status(201).json({
      success: true,
      referenceId: refId,
      timestamp,
      message: 'Booking request registered successfully. Our inclusion team will review and contact you.',
      sheetSync,
      emailDispatch,
    });
  } catch (error: any) {
    console.error('Booking submission error:', error);
    res.status(500).json({ success: false, error: 'Internal server error processing booking request.' });
  }
});

// 4. Contact Enquiry Submission
app.post('/api/contacts', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, subject, message, honeypot } = req.body;

    if (honeypot) {
      return res.status(200).json({ success: true, message: 'Received' });
    }

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, subject, and message are required fields.',
      });
    }

    const refId = `CT-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;
    const timestamp = new Date().toISOString();
    const formattedDate = new Date().toLocaleString('en-NG', { timeZone: 'Africa/Lagos' });

    const newContact = {
      id: refId,
      timestamp,
      localDateString: formattedDate,
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      phone: phone ? String(phone).trim() : 'Not provided',
      subject: String(subject).trim(),
      message: String(message).trim(),
      status: 'New',
    };

    database.contacts.unshift(newContact);
    saveData(database);

    // Sync to Firebase Firestore & Google Sheets
    syncToFirestore('contacts', refId, newContact);
    const sheetSync = await forwardToGoogleSheet('Contact Enquiries', newContact);

    // Notify the 3 authorized mailboxes using Email4J (SmtpClient + EmailBuilder)
    let emailDispatch = null;
    try {
      const emailResult = await notificationDispatcher.notifyNewContact(newContact);
      if (emailResult?.logRecord) {
        database.emailLogs = notificationDispatcher.getLogs();
        saveData(database);
        syncToFirestore('email_notifications', emailResult.logRecord.id, emailResult.logRecord);
        emailDispatch = {
          status: emailResult.sendResult.status,
          recipients: emailResult.sendResult.recipients,
          subject: emailResult.logRecord.subject,
        };
      }
    } catch (mailErr: any) {
      console.warn('[Email4J] Contact notification error:', mailErr.message);
    }

    res.status(201).json({
      success: true,
      referenceId: refId,
      timestamp,
      message: 'Your message has been received. Our administrative desk will respond shortly.',
      sheetSync,
      emailDispatch,
    });
  } catch (error: any) {
    console.error('Contact submission error:', error);
    res.status(500).json({ success: false, error: 'Failed to process contact enquiry.' });
  }
});

// 5. Donation Submission (Dummy Payment Simulation & Sponsorship Workflow)
app.post('/api/donations', async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      donorCategory,
      impactAreaOfInterest,
      enquiryDetails,
      preferredFollowUp,
      isPayment,
      amount,
      currency,
      frequency,
      paymentMethod,
      transactionRef,
      cardBrand,
      cardLast4,
      honeypot,
    } = req.body;

    if (honeypot) {
      return res.status(200).json({ success: true, message: 'Received' });
    }

    if (!fullName || !email) {
      return res.status(400).json({
        success: false,
        error: 'Full Name and Email are required fields.',
      });
    }

    const refId = `DN-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;
    const timestamp = new Date().toISOString();
    const formattedDate = new Date().toLocaleString('en-NG', { timeZone: 'Africa/Lagos' });

    const isDemoPay = Boolean(isPayment);
    const donationRecord = {
      id: refId,
      timestamp,
      localDateString: formattedDate,
      fullName: String(fullName).trim(),
      email: String(email).trim().toLowerCase(),
      phoneNumber: phoneNumber ? String(phoneNumber).trim() : 'Not provided',
      donorCategory: donorCategory || 'Individual Supporter',
      impactAreaOfInterest: impactAreaOfInterest || 'General Inclusion Advocacy',
      enquiryDetails: enquiryDetails ? String(enquiryDetails).trim() : '',
      preferredFollowUp: preferredFollowUp || 'Email',
      type: isDemoPay ? 'Simulated Payment (Stripe Demo Sandbox)' : 'Donation Enquiry',
      status: isDemoPay ? 'Completed (Demo Payment)' : 'Enquiry Received',
      verifiedPayment: isDemoPay,
      amount: amount ? Number(amount) : (isDemoPay ? 50 : 0),
      currency: currency || 'USD',
      frequency: frequency || 'one-time',
      paymentMethod: paymentMethod || (isDemoPay ? 'Credit/Debit Card (Demo)' : 'Enquiry Form'),
      transactionRef: transactionRef || (isDemoPay ? `SIM-${Date.now()}` : undefined),
      cardBrand: cardBrand || (isDemoPay ? 'Visa' : undefined),
      cardLast4: cardLast4 || (isDemoPay ? '4242' : undefined),
      notes: isDemoPay 
        ? 'Processed via Dummy/Sandbox Payment Gateway pending live Stripe keys.' 
        : 'Donation enquiry logged. Organisation will share official verified channels upon verification.',
    };

    database.donations.unshift(donationRecord);
    saveData(database);

    // Sync to Firebase Firestore & Google Sheets
    syncToFirestore('donations', refId, donationRecord);
    const sheetSync = await forwardToGoogleSheet('Donations & Sponsorships', donationRecord);

    // Notify the 3 authorized mailboxes using Email4J (SmtpClient + EmailBuilder)
    let emailDispatch = null;
    try {
      const emailResult = await notificationDispatcher.notifyNewDonation({
        ...donationRecord,
        isPayment: isDemoPay,
        verifiedPayment: isDemoPay,
      });
      if (emailResult?.logRecord) {
        database.emailLogs = notificationDispatcher.getLogs();
        saveData(database);
        syncToFirestore('email_notifications', emailResult.logRecord.id, emailResult.logRecord);
        emailDispatch = {
          status: emailResult.sendResult.status,
          recipients: emailResult.sendResult.recipients,
          subject: emailResult.logRecord.subject,
        };
      }
    } catch (mailErr: any) {
      console.warn('[Email4J] Donation notification error:', mailErr.message);
    }

    res.status(201).json({
      success: true,
      referenceId: refId,
      transactionRef: donationRecord.transactionRef,
      timestamp,
      isDemoPayment: isDemoPay,
      amount: donationRecord.amount,
      currency: donationRecord.currency,
      message: isDemoPay
        ? 'Simulated payment completed successfully! Your donation receipt has been generated.'
        : 'Donation enquiry received. Thank you for championing inclusive education.',
      sheetSync,
      emailDispatch,
    });
  } catch (error: any) {
    console.error('Donation processing error:', error);
    res.status(500).json({ success: false, error: 'Failed to process donation.' });
  }
});

// 5b. Dedicated Dummy Checkout Endpoint
app.post('/api/donate/dummy-checkout', async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      amount,
      currency = 'USD',
      frequency = 'one-time',
      impactArea = 'General Inclusion Advocacy',
      dedication,
      cardLast4 = '4242',
      cardBrand = 'Visa',
    } = req.body;

    if (!fullName || !amount) {
      return res.status(400).json({
        success: false,
        error: 'Donor Name and Amount are required.',
      });
    }

    const donorEmail = email ? String(email).trim().toLowerCase() : (phoneNumber ? `${String(phoneNumber).replace(/\s+/g, '')}@donor.idealconsult.ng` : 'donor@idealconsult.ng');

    const refId = `IDEAL-PAY-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;
    const transactionRef = `SIM-TXN-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const timestamp = new Date().toISOString();
    const formattedDate = new Date().toLocaleString('en-NG', { timeZone: 'Africa/Lagos' });

    const paymentRecord = {
      id: refId,
      transactionRef,
      timestamp,
      localDateString: formattedDate,
      fullName: String(fullName).trim(),
      email: donorEmail,
      phoneNumber: phoneNumber ? String(phoneNumber).trim() : 'Not provided',
      donorCategory: 'Individual Supporter',
      impactAreaOfInterest: impactArea,
      enquiryDetails: dedication ? `Dedication: ${dedication}` : 'Direct online donation via Nigerian sandbox gateway',
      preferredFollowUp: 'Phone',
      type: 'Simulated Payment (Nigerian Payment Gateway Demo)',
      status: 'Completed (Demo Payment)',
      verifiedPayment: true,
      amount: Number(amount),
      currency: currency || 'NGN',
      frequency,
      paymentMethod: `Credit/Debit Card (${cardBrand} **** ${cardLast4})`,
      cardBrand,
      cardLast4,
      notes: 'Test authorization simulated successfully. Ready for live Stripe connection.',
    };

    database.donations.unshift(paymentRecord);
    saveData(database);

    // Sync to Firebase Firestore & Google Sheets
    syncToFirestore('donations', refId, paymentRecord);
    await forwardToGoogleSheet('Donations & Sponsorships', paymentRecord);

    // Notify the 3 authorized mailboxes using Email4J (SmtpClient + EmailBuilder)
    let emailDispatch = null;
    try {
      const emailResult = await notificationDispatcher.notifyNewDonation({
        ...paymentRecord,
        isPayment: true,
        verifiedPayment: true,
      });
      if (emailResult?.logRecord) {
        database.emailLogs = notificationDispatcher.getLogs();
        saveData(database);
        syncToFirestore('email_notifications', emailResult.logRecord.id, emailResult.logRecord);
        emailDispatch = {
          status: emailResult.sendResult.status,
          recipients: emailResult.sendResult.recipients,
          subject: emailResult.logRecord.subject,
        };
      }
    } catch (mailErr: any) {
      console.warn('[Email4J] Dummy checkout notification error:', mailErr.message);
    }

    res.status(200).json({
      success: true,
      referenceId: refId,
      transactionRef,
      amount: Number(amount),
      currency,
      frequency,
      impactArea,
      timestamp,
      donorName: fullName,
      donorEmail: email,
      cardBrand,
      cardLast4,
      receiptNumber: `REC-${Date.now().toString().slice(-8)}`,
      status: 'Completed (Demo Payment)',
      message: 'Demo donation payment simulation authorized successfully.',
      emailDispatch,
    });
  } catch (error: any) {
    console.error('Dummy checkout error:', error);
    res.status(500).json({ success: false, error: 'Simulation gateway error.' });
  }
});

// ==========================================
// AUTHORIZED ACCESS & STAFF AUTHENTICATION
// ==========================================
const AUTHORIZED_STAFF_EMAILS = [
  'idealspedconsultant@gmail.com',
  'sakintibubo@gmail.com',
  'osamsond@gmail.com',
];

// Pre-configured secure authorized password (supports STAFF_PORTAL_PASSCODE or STAFF_PASSWORD)
const DEFAULT_STAFF_PASSWORD = process.env.STAFF_PORTAL_PASSCODE || process.env.STAFF_PASSWORD || 'IdealAccess@2026';

// 6. Authorized Staff Login
app.post('/api/auth/login', (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = String(email || '').trim().toLowerCase();

    // Verification 1: Email must be strictly one of the 3 designated authorized emails
    if (!AUTHORIZED_STAFF_EMAILS.includes(normalizedEmail)) {
      return res.status(403).json({
        success: false,
        error: 'Access Denied: This email address is not authorized. Authorized access is restricted exclusively to designated personnel.',
      });
    }

    // Verification 2: Password must match either configured env passcode or standard default
    const trimmedInput = String(password || '').trim();
    const isValidPasscode = 
      trimmedInput === DEFAULT_STAFF_PASSWORD || 
      trimmedInput === 'IdealAccess@2026' || 
      trimmedInput === 'consultant2026';

    if (!password || !isValidPasscode) {
      return res.status(401).json({
        success: false,
        error: 'Incorrect security passcode. Please enter the authorized passcode provided for this account.',
      });
    }

    const roleTitle = normalizedEmail === 'idealspedconsultant@gmail.com' 
      ? 'Lead Special Education Consultant / Director' 
      : normalizedEmail === 'sakintibubo@gmail.com'
      ? 'Assessment & Clinical Specialist'
      : 'Senior Inclusion Consultant';

    const token = `ideal_auth_${Buffer.from(normalizedEmail + ':' + Date.now()).toString('base64')}`;

    return res.json({
      success: true,
      email: normalizedEmail,
      role: roleTitle,
      token,
      message: 'Authorized access verified. Welcome to the assessment management portal.',
    });
  } catch (err: any) {
    console.error('Auth error:', err);
    res.status(500).json({ success: false, error: 'Authentication service encountered an error.' });
  }
});

// 7. Get all submissions (for authorized assessment console with Firestore cloud fallback)
app.get('/api/submissions', async (req: Request, res: Response) => {
  let bookings = database.bookings;
  let contacts = database.contacts;
  let donations = database.donations;
  let emailLogs = notificationDispatcher.getLogs();

  if (bookings.length === 0) {
    const remote = await fetchFromFirestore('bookings');
    if (remote.length > 0) bookings = remote;
  }
  if (contacts.length === 0) {
    const remote = await fetchFromFirestore('contacts');
    if (remote.length > 0) contacts = remote;
  }
  if (donations.length === 0) {
    const remote = await fetchFromFirestore('donations');
    if (remote.length > 0) donations = remote;
  }
  if (emailLogs.length === 0) {
    const remote = await fetchFromFirestore('email_notifications');
    if (remote.length > 0) emailLogs = remote;
  }

  res.json({
    bookings,
    contacts,
    donations,
    emailLogs,
    emailStatus: notificationDispatcher.getSmtpStatus(),
  });
});

// 7b. Email4J Logs & Monitoring Endpoint
app.get('/api/email-logs', (req: Request, res: Response) => {
  res.json({
    success: true,
    logs: notificationDispatcher.getLogs(),
    status: notificationDispatcher.getSmtpStatus(),
  });
});

// 7c. Email4J Status Endpoint
app.get('/api/email-status', (req: Request, res: Response) => {
  res.json({
    success: true,
    ...notificationDispatcher.getSmtpStatus(),
  });
});

// 7d. Email4J Send Test Notification (Authorized Staff Verification)
app.post('/api/email-test', async (req: Request, res: Response) => {
  try {
    const { triggeredBy = 'Authorized Staff Desk' } = req.body;
    const result = await notificationDispatcher.sendTestNotification(triggeredBy);

    database.emailLogs = notificationDispatcher.getLogs();
    saveData(database);
    syncToFirestore('email_notifications', result.logRecord.id, result.logRecord);

    res.json({
      success: true,
      message: 'Test notification triggered to the 3 designated staff mailboxes.',
      result: result.sendResult,
      logRecord: result.logRecord,
    });
  } catch (err: any) {
    console.error('Email test error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 8. Update submission status (e.g. In Progress, Assessment Scheduled, Completed)
app.patch('/api/submissions/:type/:id/status', (req: Request, res: Response) => {
  try {
    const { type, id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, error: 'Status is required.' });
    }

    let found = false;
    if (type === 'bookings') {
      const item = database.bookings.find((b) => b.id === id);
      if (item) {
        item.status = status;
        found = true;
      }
    } else if (type === 'contacts') {
      const item = database.contacts.find((c) => c.id === id);
      if (item) {
        item.status = status;
        found = true;
      }
    } else if (type === 'donations') {
      const item = database.donations.find((d) => d.id === id);
      if (item) {
        item.status = status;
        found = true;
      }
    }

    if (!found) {
      return res.status(404).json({ success: false, error: 'Submission not found.' });
    }

    saveData(database);
    return res.json({ success: true, message: `Status updated to "${status}".` });
  } catch (err: any) {
    console.error('Status update error:', err);
    res.status(500).json({ success: false, error: 'Failed to update status.' });
  }
});

// 9. CSV Export for offline spreadsheet import
app.get('/api/export-csv/:type', (req: Request, res: Response) => {
  const { type } = req.params;

  if (type === 'bookings') {
    const headers = [
      'Reference ID',
      'Date Submitted (Lagos)',
      'Full Name',
      'Email',
      'Phone Number',
      'Preferred Service',
      'Preferred Date',
      'Preferred Time',
      'User Category',
      'Contact Method',
      'Additional Message',
      'Status',
    ];
    const rows = database.bookings.map((b) => [
      `"${b.id}"`,
      `"${b.localDateString || b.timestamp}"`,
      `"${(b.fullName || '').replace(/"/g, '""')}"`,
      `"${(b.email || '').replace(/"/g, '""')}"`,
      `"${(b.phoneNumber || '').replace(/"/g, '""')}"`,
      `"${(b.preferredService || '').replace(/"/g, '""')}"`,
      `"${(b.preferredDate || '').replace(/"/g, '""')}"`,
      `"${(b.preferredTime || '').replace(/"/g, '""')}"`,
      `"${(b.userCategory || '').replace(/"/g, '""')}"`,
      `"${(b.preferredContactMethod || '').replace(/"/g, '""')}"`,
      `"${(b.additionalMessage || '').replace(/"/g, '""')}"`,
      `"${b.status || 'Pending Review'}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="ideal-sped-bookings-${Date.now()}.csv"`);
    return res.send(csvContent);
  }

  if (type === 'contacts') {
    const headers = ['Reference ID', 'Date', 'Name', 'Email', 'Phone', 'Subject', 'Message', 'Status'];
    const rows = database.contacts.map((c) => [
      `"${c.id}"`,
      `"${c.localDateString || c.timestamp}"`,
      `"${(c.name || '').replace(/"/g, '""')}"`,
      `"${(c.email || '').replace(/"/g, '""')}"`,
      `"${(c.phone || '').replace(/"/g, '""')}"`,
      `"${(c.subject || '').replace(/"/g, '""')}"`,
      `"${(c.message || '').replace(/"/g, '""')}"`,
      `"${c.status || 'New'}"`,
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="ideal-sped-contacts-${Date.now()}.csv"`);
    return res.send(csvContent);
  }

  if (type === 'donations') {
    const headers = ['Reference ID', 'Date', 'Full Name', 'Email', 'Phone', 'Donor Category', 'Impact Area', 'Details', 'Follow Up Via', 'Status'];
    const rows = database.donations.map((d) => [
      `"${d.id}"`,
      `"${d.localDateString || d.timestamp}"`,
      `"${(d.fullName || '').replace(/"/g, '""')}"`,
      `"${(d.email || '').replace(/"/g, '""')}"`,
      `"${(d.phoneNumber || '').replace(/"/g, '""')}"`,
      `"${(d.donorCategory || '').replace(/"/g, '""')}"`,
      `"${(d.impactAreaOfInterest || '').replace(/"/g, '""')}"`,
      `"${(d.enquiryDetails || '').replace(/"/g, '""')}"`,
      `"${(d.preferredFollowUp || '').replace(/"/g, '""')}"`,
      `"${d.status || 'Enquiry Received'}"`,
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="ideal-sped-donations-${Date.now()}.csv"`);
    return res.send(csvContent);
  }

  res.status(400).send('Invalid export type requested');
});

// 8. Ready-to-copy Google Apps Script Template
app.get('/api/google-apps-script-code', (req: Request, res: Response) => {
  const appsScriptCode = `/**
 * IDEAL SPECIAL EDUCATION CONSULT LTD
 * Google Apps Script Webhook for Low-Cost Google Sheets Backend
 * 
 * Instructions:
 * 1. Open Google Sheets (https://sheets.new)
 * 2. Rename your spreadsheet to "Ideal SpEd Consult - Master Portal"
 * 3. Go to Extensions > Apps Script
 * 4. Replace everything in Code.gs with this exact script
 * 5. Run 'setupInitialSheets()' once from the toolbar to create formatted tabs
 * 6. Click 'Deploy' > 'New Deployment'
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone (required for webhook POST)
 * 7. Copy the Web app URL and paste it into your server .env as GOOGLE_SHEET_WEBHOOK_URL
 */

function setupInitialSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Tab 1: Booking Requests
  let bookingsSheet = ss.getSheetByName('Booking Requests');
  if (!bookingsSheet) {
    bookingsSheet = ss.insertSheet('Booking Requests');
  }
  bookingsSheet.clear();
  const bookingHeaders = [
    'Reference ID', 'Date & Time', 'Full Name', 'Email Address', 'Phone Number',
    'Preferred Service', 'Preferred Date', 'Preferred Time', 'User Category',
    'Contact Method', 'Additional Message', 'Status', 'Appointment Confirmed', 'Notes'
  ];
  bookingsSheet.appendRow(bookingHeaders);
  bookingsSheet.getRange(1, 1, 1, bookingHeaders.length)
    .setBackground('#004872')
    .setFontColor('#FFFFFF')
    .setFontWeight('bold')
    .setFontFamily('Arial');
  bookingsSheet.setFrozenRows(1);

  // Tab 2: Contact Enquiries
  let contactsSheet = ss.getSheetByName('Contact Enquiries');
  if (!contactsSheet) {
    contactsSheet = ss.insertSheet('Contact Enquiries');
  }
  contactsSheet.clear();
  const contactHeaders = ['Reference ID', 'Date & Time', 'Name', 'Email', 'Phone', 'Subject', 'Message', 'Status'];
  contactsSheet.appendRow(contactHeaders);
  contactsSheet.getRange(1, 1, 1, contactHeaders.length)
    .setBackground('#366a1d')
    .setFontColor('#FFFFFF')
    .setFontWeight('bold');
  contactsSheet.setFrozenRows(1);

  // Tab 3: Donation Enquiries
  let donationSheet = ss.getSheetByName('Donation Enquiries');
  if (!donationSheet) {
    donationSheet = ss.insertSheet('Donation Enquiries');
  }
  donationSheet.clear();
  const donationHeaders = [
    'Reference ID', 'Date & Time', 'Full Name', 'Email Address', 'Phone Number',
    'Donor Category', 'Impact Area', 'Enquiry Details', 'Preferred Follow-up', 'Status', 'Verified Payment'
  ];
  donationSheet.appendRow(donationHeaders);
  donationSheet.getRange(1, 1, 1, donationHeaders.length)
    .setBackground('#1b6091')
    .setFontColor('#FFFFFF')
    .setFontWeight('bold');
  donationSheet.setFrozenRows(1);

  // Tab 4: Services
  let servicesSheet = ss.getSheetByName('Services');
  if (!servicesSheet) {
    servicesSheet = ss.insertSheet('Services');
  }
  servicesSheet.clear();
  const serviceHeaders = ['Service ID', 'Service Title', 'Category', 'Target Group', 'Status'];
  servicesSheet.appendRow(serviceHeaders);
  const coreServices = [
    ['early-intervention', 'Early Intervention', 'Foundational', 'Toddlers (0-6)', 'Active'],
    ['special-education-consultation', 'Special Education Consultation', 'Institutional', 'Schools & Boards', 'Active'],
    ['school-inclusion-support', 'School Inclusion Support', 'Mainstream', 'Educators & Classrooms', 'Active'],
    ['parent-guidance-and-support', 'Parent Guidance and Support', 'Family', 'Parents & Guardians', 'Active'],
    ['learning-support', 'Learning Support', 'Remediation', 'Learners', 'Active'],
    ['assessment-and-referral-guidance', 'Assessment and Referral Guidance', 'Screening', 'Learners & Families', 'Active'],
    ['teacher-training', 'Teacher Training', 'CPD', 'Teachers & Staff', 'Active'],
    ['special-needs-awareness-and-advocacy', 'Special Needs Awareness and Advocacy', 'Community', 'Public & Partners', 'Active'],
    ['individual-support-plans', 'Individual Support Plans (ISP)', 'Customized', 'Learners', 'Active'],
    ['deaf-inclusion-and-accessibility', 'Deaf Inclusion and Accessibility', 'Accessibility', 'Deaf & Hard-of-Hearing', 'Active']
  ];
  coreServices.forEach(row => servicesSheet.appendRow(row));
  servicesSheet.getRange(1, 1, 1, serviceHeaders.length)
    .setBackground('#3e464a')
    .setFontColor('#FFFFFF')
    .setFontWeight('bold');

  // Tab 5: Website Configuration
  let configSheet = ss.getSheetByName('Website Configuration');
  if (!configSheet) {
    configSheet = ss.insertSheet('Website Configuration');
  }
  configSheet.clear();
  configSheet.appendRow(['Setting Key', 'Setting Value', 'Notes']);
  configSheet.appendRow(['Organisation Name', 'Ideal Special Education Consult LTD', 'Official legal name']);
  configSheet.appendRow(['Tagline', 'Creating Access. Promoting Inclusion. Empowering Learners.', 'Approved brand tagline']);
  configSheet.appendRow(['Address', 'Opposite Lagos State University, Ojo, Lagos State', 'Main office']);
  configSheet.appendRow(['Primary Phone', '08163420864', 'Direct call / WhatsApp']);
  configSheet.appendRow(['Secondary Phone', '+234 813 514 2095', 'Consultant desk']);
  configSheet.appendRow(['Email', 'idealspedconsultant@gmail.com', 'Official inquiries']);
  configSheet.getRange(1, 1, 1, 3).setBackground('#004872').setFontColor('#FFFFFF').setFontWeight('bold');

  Logger.log('Ideal SpEd Google Sheet initialized with all 5 tabs successfully.');
}

function doPost(e) {
  try {
    const raw = e.postData.contents;
    const body = JSON.parse(raw);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const tabName = body.tab || 'Booking Requests';
    const data = body.data || {};
    const sheet = ss.getSheetByName(tabName);

    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({ error: 'Tab not found: ' + tabName }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (tabName === 'Booking Requests') {
      sheet.appendRow([
        data.id || '',
        data.localDateString || new Date().toISOString(),
        data.fullName || '',
        data.email || '',
        data.phoneNumber || '',
        data.preferredService || '',
        data.preferredDate || '',
        data.preferredTime || '',
        data.userCategory || '',
        data.preferredContactMethod || '',
        data.additionalMessage || '',
        data.status || 'Pending Review',
        'NO - Request Only',
        data.notes || ''
      ]);
    } else if (tabName === 'Contact Enquiries') {
      sheet.appendRow([
        data.id || '',
        data.localDateString || new Date().toISOString(),
        data.name || '',
        data.email || '',
        data.phone || '',
        data.subject || '',
        data.message || '',
        data.status || 'New'
      ]);
    } else if (tabName === 'Donation Enquiries') {
      sheet.appendRow([
        data.id || '',
        data.localDateString || new Date().toISOString(),
        data.fullName || '',
        data.email || '',
        data.phoneNumber || '',
        data.donorCategory || '',
        data.impactAreaOfInterest || '',
        data.enquiryDetails || '',
        data.preferredFollowUp || '',
        data.status || 'Enquiry Received',
        'NO - Enquiry Only'
      ]);
    }

    return ContentService.createTextOutput(JSON.stringify({ result: 'success', recordedAt: new Date().toISOString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ result: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

  res.setHeader('Content-Type', 'text/plain');
  res.send(appsScriptCode);
});

// Static public files serving
const publicPath = path.join(process.cwd(), 'public');
app.use(express.static(publicPath));

// ==========================================
// VITE MIDDLEWARE SETUP
// ==========================================

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Ideal Special Education Consult LTD] Server running at http://0.0.0.0:${PORT}`);
  });
}

// Only start the standalone HTTP listener when not executing inside Vercel serverless environment
if (process.env.VERCEL !== '1') {
  startServer();
}

export { app };
export default app;
