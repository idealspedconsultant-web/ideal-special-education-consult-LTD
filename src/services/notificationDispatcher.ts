import { EmailBuilder, SmtpClient, ClientConfiguration, OutgoingEmail, SendResult } from './email4j';

export const DESIGNATED_STAFF_EMAILS = [
  'idealspedconsultant@gmail.com',
  'sakintibubo@gmail.com',
  'osamsond@gmail.com',
];

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

export class NotificationDispatcher {
  private smtpClient: SmtpClient;
  private recipients: string[];
  private logs: EmailLogRecord[] = [];

  constructor(
    recipients: string[] = DESIGNATED_STAFF_EMAILS,
    customSmtpClient?: SmtpClient
  ) {
    this.recipients = recipients;

    if (customSmtpClient) {
      this.smtpClient = customSmtpClient;
    } else {
      const host = process.env.SMTP_HOST || 'smtp.gmail.com';
      const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
      const user = process.env.SMTP_USER;
      const pass = process.env.SMTP_PASS;

      const clientConfig = new ClientConfiguration({
        tls: true,
        ssl: port === 465,
        connectionTimeout: 12000,
        simulationMode: !Boolean(user && pass),
      });

      this.smtpClient = new SmtpClient(user, pass, host, port, clientConfig);
    }
  }

  public getRecipients(): string[] {
    return [...this.recipients];
  }

  public getSmtpStatus() {
    return {
      ...this.smtpClient.getConfigurationInfo(),
      designatedRecipients: this.recipients,
      totalLoggedEmails: this.logs.length,
    };
  }

  public getLogs(): EmailLogRecord[] {
    return [...this.logs];
  }

  public setInitialLogs(initial: EmailLogRecord[]) {
    this.logs = [...initial];
  }

  private recordLog(email: OutgoingEmail, sendResult: SendResult): EmailLogRecord {
    const record: EmailLogRecord = {
      id: email.id,
      timestamp: sendResult.timestamp,
      subject: email.subject,
      to: email.to,
      from: email.from,
      category: email.category || 'booking',
      status: sendResult.status,
      errorMessage: sendResult.error,
      bodySnippet: email.body.slice(0, 160).replace(/\n+/g, ' ') + '...',
      fullBody: email.body,
      fullHtml: email.html,
      referenceId: email.referenceId,
    };
    this.logs.unshift(record);
    if (this.logs.length > 250) {
      this.logs.pop();
    }
    return record;
  }

  /**
   * 1. NOTIFY NEW BOOKING (General Assessment & Support Session)
   */
  public async notifyNewBooking(booking: {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    preferredService: string;
    preferredDate: string;
    preferredTime: string;
    userCategory?: string;
    preferredContactMethod?: string;
    additionalMessage?: string;
    localDateString?: string;
  }): Promise<{ sendResult: SendResult; logRecord: EmailLogRecord }> {
    const subject = `[NEW BOOKING] Session Request: ${booking.fullName} — ${booking.preferredService} (${booking.id})`;

    const textBody = `
======================================================
IDEAL SPECIAL EDUCATION CONSULT LTD — OFFICIAL ALERT
======================================================
EVENT: NEW SESSION BOOKING REQUEST
REFERENCE ID: ${booking.id}
DATE RECORDED: ${booking.localDateString || new Date().toISOString()}

APPLICANT INFORMATION:
- Full Name: ${booking.fullName}
- Email: ${booking.email}
- Phone Number: ${booking.phoneNumber}
- Category: ${booking.userCategory || 'Parent / Guardian'}
- Preferred Contact Method: ${booking.preferredContactMethod || 'WhatsApp'}

BOOKING SPECIFICATIONS:
- Service Requested: ${booking.preferredService}
- Preferred Date: ${booking.preferredDate}
- Preferred Time: ${booking.preferredTime}

NOTES / MESSAGE:
${booking.additionalMessage || 'None provided.'}

ACTION REQUIRED:
1. Contact parent/client to verify intake requirements.
2. Log into Authorized Assessment Portal to schedule appointment.
3. Update booking status in official roster.

Recipients Notified:
${this.recipients.join('\n')}
======================================================
`.trim();

    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f7fa; margin: 0; padding: 24px; color: #2d3748;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.06);">
    <div style="background-color: #004872; padding: 20px 24px; text-align: left;">
      <span style="display: inline-block; background: #00ff66; color: #003311; font-weight: bold; font-size: 11px; padding: 4px 8px; border-radius: 4px; text-transform: uppercase; margin-bottom: 8px;">New Session Booking</span>
      <h1 style="color: #ffffff; font-size: 20px; margin: 0; font-weight: 700;">Ideal Special Education Consult LTD</h1>
      <p style="color: #c9e4f7; font-size: 13px; margin: 4px 0 0 0;">Official Intake Notification Dispatch</p>
    </div>
    
    <div style="padding: 24px;">
      <div style="background-color: #f0f7ff; border-left: 4px solid #004872; padding: 12px 16px; margin-bottom: 20px;">
        <p style="margin: 0; font-size: 14px; font-weight: 600; color: #004872;">Reference ID: <span style="font-family: monospace;">${booking.id}</span></p>
        <p style="margin: 4px 0 0 0; font-size: 13px; color: #4a5568;">Submitted: ${booking.localDateString || new Date().toLocaleString()}</p>
      </div>

      <h3 style="color: #004872; font-size: 15px; border-bottom: 1px solid #edf2f7; padding-bottom: 6px; margin-top: 0;">Applicant Contact Details</h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
        <tr>
          <td style="padding: 6px 0; color: #718096; width: 38%;">Full Name:</td>
          <td style="padding: 6px 0; font-weight: 600; color: #1a202c;">${booking.fullName}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #718096;">Email Address:</td>
          <td style="padding: 6px 0; font-weight: 600; color: #004872;"><a href="mailto:${booking.email}" style="color: #004872; text-decoration: underline;">${booking.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #718096;">Phone Number:</td>
          <td style="padding: 6px 0; font-weight: 600; color: #1a202c;"><a href="tel:${booking.phoneNumber}" style="color: #1a202c; text-decoration: none;">${booking.phoneNumber}</a></td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #718096;">Category:</td>
          <td style="padding: 6px 0; color: #1a202c;">${booking.userCategory || 'Parent / Guardian'}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #718096;">Preferred Contact:</td>
          <td style="padding: 6px 0; font-weight: 600; color: #2f855a;">${booking.preferredContactMethod || 'WhatsApp'}</td>
        </tr>
      </table>

      <h3 style="color: #004872; font-size: 15px; border-bottom: 1px solid #edf2f7; padding-bottom: 6px;">Booking Specifics</h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
        <tr>
          <td style="padding: 6px 0; color: #718096; width: 38%;">Service Requested:</td>
          <td style="padding: 6px 0; font-weight: bold; color: #004872;">${booking.preferredService}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #718096;">Preferred Date:</td>
          <td style="padding: 6px 0; color: #1a202c;">${booking.preferredDate}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #718096;">Preferred Window:</td>
          <td style="padding: 6px 0; color: #1a202c;">${booking.preferredTime}</td>
        </tr>
      </table>

      ${booking.additionalMessage ? `
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px; margin-bottom: 20px;">
        <span style="font-size: 12px; font-weight: bold; color: #718096; text-transform: uppercase;">Learner Context / Message:</span>
        <p style="margin: 6px 0 0 0; font-size: 13px; color: #2d3748; line-height: 1.5;">${booking.additionalMessage}</p>
      </div>` : ''}

      <div style="background-color: #f7fafc; padding: 16px; border-radius: 6px; text-align: center; margin-top: 24px;">
        <a href="https://wa.me/234${booking.phoneNumber.replace(/^0+/, '').replace(/\D/g, '')}" style="display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 10px 18px; border-radius: 6px; font-weight: 600; font-size: 14px; margin-right: 8px;">
          Message via WhatsApp
        </a>
        <a href="tel:${booking.phoneNumber}" style="display: inline-block; background-color: #004872; color: #ffffff; text-decoration: none; padding: 10px 18px; border-radius: 6px; font-weight: 600; font-size: 14px;">
          Call Client
        </a>
      </div>
    </div>

    <div style="background-color: #edf2f7; padding: 14px 24px; font-size: 12px; color: #718096; text-align: center; border-top: 1px solid #e2e8f0;">
      <p style="margin: 0;">Dispatched automatically to official personnel:</p>
      <p style="margin: 4px 0 0 0; font-weight: 600; color: #4a5568;">${this.recipients.join(' • ')}</p>
    </div>
  </div>
</body>
</html>
`.trim();

    const email = EmailBuilder.newEmail()
      .withSubject(subject)
      .to(this.recipients)
      .withBody(textBody)
      .withHtml(htmlBody)
      .withCategory('booking')
      .withReferenceId(booking.id)
      .withMetadata({ ...booking })
      .build();

    const sendResult = await this.smtpClient.send(email);
    const logRecord = this.recordLog(email, sendResult);
    return { sendResult, logRecord };
  }

  /**
   * 2. NOTIFY NEW CONSULTATION BOOKING
   */
  public async notifyNewConsultation(consultation: {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    preferredService: string;
    consultationType?: string;
    preferredDate: string;
    preferredTime: string;
    learnerAge?: string;
    clinicalConcern?: string;
    userCategory?: string;
    preferredContactMethod?: string;
    additionalMessage?: string;
    localDateString?: string;
  }): Promise<{ sendResult: SendResult; logRecord: EmailLogRecord }> {
    const subject = `[CONSULTATION BOOKING] New Consultation Session: ${consultation.fullName} — ${consultation.preferredService} (${consultation.id})`;

    const textBody = `
======================================================
IDEAL SPECIAL EDUCATION CONSULT LTD — OFFICIAL ALERT
======================================================
EVENT: NEW SPECIALIZED CONSULTATION BOOKING
REFERENCE ID: ${consultation.id}
DATE RECORDED: ${consultation.localDateString || new Date().toISOString()}

CONSULTATION DETAILS:
- Client Name: ${consultation.fullName}
- Email: ${consultation.email}
- Phone: ${consultation.phoneNumber}
- Role/Category: ${consultation.userCategory || 'Parent / Guardian'}
- Consultation Topic: ${consultation.preferredService}
- Preferred Date: ${consultation.preferredDate}
- Preferred Time: ${consultation.preferredTime}
- Contact Method: ${consultation.preferredContactMethod || 'WhatsApp'}

CONSULTATION CONTEXT:
${consultation.additionalMessage || 'Intake screening request submitted via consultation portal.'}

ACTION REQUIRED:
1. Clinical & consulting specialists must review intake details.
2. Confirm consultation mode (Virtual / In-person at Ojo, Lagos).
3. Schedule pre-assessment interview.

Designated Recipients Notified:
${this.recipients.join('\n')}
======================================================
`.trim();

    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f7fa; margin: 0; padding: 24px; color: #2d3748;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.06);">
    <div style="background: linear-gradient(135deg, #004872 0%, #1a365d 100%); padding: 22px 24px; text-align: left;">
      <span style="display: inline-block; background: #ffd700; color: #1a202c; font-weight: bold; font-size: 11px; padding: 4px 8px; border-radius: 4px; text-transform: uppercase; margin-bottom: 8px;">Priority Consultation</span>
      <h1 style="color: #ffffff; font-size: 20px; margin: 0; font-weight: 700;">Special Education Consultation Booked</h1>
      <p style="color: #e2e8f0; font-size: 13px; margin: 4px 0 0 0;">Ideal Special Education Consult LTD Assessment Team</p>
    </div>
    
    <div style="padding: 24px;">
      <div style="background-color: #fffaf0; border-left: 4px solid #dd6b20; padding: 12px 16px; margin-bottom: 20px;">
        <p style="margin: 0; font-size: 14px; font-weight: 600; color: #c05621;">Consultation Reference: <span style="font-family: monospace;">${consultation.id}</span></p>
        <p style="margin: 4px 0 0 0; font-size: 13px; color: #744210;">Scheduled Window: <strong>${consultation.preferredDate}</strong> (${consultation.preferredTime})</p>
      </div>

      <h3 style="color: #004872; font-size: 15px; border-bottom: 1px solid #edf2f7; padding-bottom: 6px; margin-top: 0;">Consultation Subject & Client</h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
        <tr>
          <td style="padding: 6px 0; color: #718096; width: 38%;">Consultation Service:</td>
          <td style="padding: 6px 0; font-weight: 700; color: #004872;">${consultation.preferredService}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #718096;">Client / Parent Name:</td>
          <td style="padding: 6px 0; font-weight: 600; color: #1a202c;">${consultation.fullName}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #718096;">Email Address:</td>
          <td style="padding: 6px 0; font-weight: 600;"><a href="mailto:${consultation.email}" style="color: #004872;">${consultation.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #718096;">Phone / WhatsApp:</td>
          <td style="padding: 6px 0; font-weight: 600;"><a href="tel:${consultation.phoneNumber}" style="color: #1a202c;">${consultation.phoneNumber}</a></td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #718096;">Client Designation:</td>
          <td style="padding: 6px 0; color: #1a202c;">${consultation.userCategory || 'Parent / Guardian'}</td>
        </tr>
      </table>

      ${consultation.additionalMessage ? `
      <div style="background: #edf2f7; border-radius: 6px; padding: 14px; margin-bottom: 20px;">
        <span style="font-size: 12px; font-weight: bold; color: #4a5568; text-transform: uppercase;">Diagnostic Concern / Client Request:</span>
        <p style="margin: 6px 0 0 0; font-size: 13px; color: #2d3748; line-height: 1.5;">${consultation.additionalMessage}</p>
      </div>` : ''}

      <div style="background-color: #f7fafc; padding: 16px; border-radius: 6px; text-align: center;">
        <a href="https://wa.me/234${consultation.phoneNumber.replace(/^0+/, '').replace(/\D/g, '')}" style="display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 10px 18px; border-radius: 6px; font-weight: 600; font-size: 14px; margin-right: 8px;">
          WhatsApp Client
        </a>
        <a href="tel:${consultation.phoneNumber}" style="display: inline-block; background-color: #004872; color: #ffffff; text-decoration: none; padding: 10px 18px; border-radius: 6px; font-weight: 600; font-size: 14px;">
          Call Direct
        </a>
      </div>
    </div>

    <div style="background-color: #edf2f7; padding: 14px 24px; font-size: 12px; color: #718096; text-align: center; border-top: 1px solid #e2e8f0;">
      <p style="margin: 0;">Dispatched automatically to the 3 designated authorized personnel:</p>
      <p style="margin: 4px 0 0 0; font-weight: 600; color: #2d3748;">${this.recipients.join(' • ')}</p>
    </div>
  </div>
</body>
</html>
`.trim();

    const email = EmailBuilder.newEmail()
      .withSubject(subject)
      .to(this.recipients)
      .withBody(textBody)
      .withHtml(htmlBody)
      .withCategory('consultation')
      .withReferenceId(consultation.id)
      .withMetadata({ ...consultation })
      .build();

    const sendResult = await this.smtpClient.send(email);
    const logRecord = this.recordLog(email, sendResult);
    return { sendResult, logRecord };
  }

  /**
   * 3. NOTIFY NEW DONATION / SPONSORSHIP
   */
  public async notifyNewDonation(donation: {
    id: string;
    fullName: string;
    email: string;
    phoneNumber?: string;
    amount?: number;
    currency?: string;
    donorCategory?: string;
    impactAreaOfInterest?: string;
    enquiryDetails?: string;
    isPayment?: boolean;
    verifiedPayment?: boolean;
    paymentMethod?: string;
    transactionRef?: string;
    localDateString?: string;
  }): Promise<{ sendResult: SendResult; logRecord: EmailLogRecord }> {
    const isPaid = Boolean(donation.isPayment || donation.verifiedPayment || (donation.amount && donation.amount > 0));
    const formattedAmount = `${donation.currency || 'NGN'} ${(donation.amount || 0).toLocaleString()}`;
    const subject = isPaid
      ? `[NEW DONATION] Contribution of ${formattedAmount} Received from ${donation.fullName} (${donation.id})`
      : `[DONATION ENQUIRY] Sponsorship Inquiry from ${donation.fullName} (${donation.id})`;

    const textBody = `
======================================================
IDEAL SPECIAL EDUCATION CONSULT LTD — OFFICIAL ALERT
======================================================
EVENT: ${isPaid ? 'CONFIRMED DONATION / CONTRIBUTION' : 'NEW DONATION & SPONSORSHIP ENQUIRY'}
REFERENCE ID: ${donation.id}
TRANSACTION REF: ${donation.transactionRef || 'N/A'}
DATE RECORDED: ${donation.localDateString || new Date().toISOString()}

CONTRIBUTION SUMMARY:
- Donor / Sponsor: ${donation.fullName}
- Email: ${donation.email}
- Phone: ${donation.phoneNumber || 'Not provided'}
- Amount: ${formattedAmount}
- Status: ${isPaid ? 'Payment Confirmed / Demo Sandbox' : 'Enquiry Received'}
- Payment Method: ${donation.paymentMethod || 'Online Gateway'}
- Impact Area: ${donation.impactAreaOfInterest || 'General Inclusion Advocacy'}
- Donor Category: ${donation.donorCategory || 'Individual Supporter'}

DETAILS / DEDICATION:
${donation.enquiryDetails || 'Online donation contribution championing special education and inclusive learners.'}

Designated Recipients Notified:
${this.recipients.join('\n')}
======================================================
`.trim();

    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f7fa; margin: 0; padding: 24px; color: #2d3748;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.06);">
    <div style="background-color: #366a1d; padding: 22px 24px; text-align: left;">
      <span style="display: inline-block; background: #ffd700; color: #1c3d0b; font-weight: bold; font-size: 11px; padding: 4px 8px; border-radius: 4px; text-transform: uppercase; margin-bottom: 8px;">
        ${isPaid ? 'Direct Contribution' : 'Sponsorship Enquiry'}
      </span>
      <h1 style="color: #ffffff; font-size: 20px; margin: 0; font-weight: 700;">Ideal Special Education Consult LTD</h1>
      <p style="color: #e2f5d8; font-size: 13px; margin: 4px 0 0 0;">Donation & Partnership Notification</p>
    </div>
    
    <div style="padding: 24px;">
      <div style="background-color: #f0fff4; border-left: 4px solid #38a169; padding: 14px 16px; margin-bottom: 20px;">
        <span style="font-size: 12px; font-weight: bold; color: #276749; text-transform: uppercase;">Contribution Amount:</span>
        <h2 style="margin: 4px 0 0 0; color: #22543d; font-size: 24px;">${formattedAmount}</h2>
        <p style="margin: 4px 0 0 0; font-size: 12px; color: #48bb78;">Reference: ${donation.id} ${donation.transactionRef ? `• Txn: ${donation.transactionRef}` : ''}</p>
      </div>

      <h3 style="color: #366a1d; font-size: 15px; border-bottom: 1px solid #edf2f7; padding-bottom: 6px; margin-top: 0;">Donor Information</h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
        <tr>
          <td style="padding: 6px 0; color: #718096; width: 38%;">Donor Name:</td>
          <td style="padding: 6px 0; font-weight: 600; color: #1a202c;">${donation.fullName}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #718096;">Email Address:</td>
          <td style="padding: 6px 0; font-weight: 600;"><a href="mailto:${donation.email}" style="color: #366a1d;">${donation.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #718096;">Phone:</td>
          <td style="padding: 6px 0; color: #1a202c;">${donation.phoneNumber || 'Not provided'}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #718096;">Donor Category:</td>
          <td style="padding: 6px 0; color: #1a202c;">${donation.donorCategory || 'Individual Supporter'}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #718096;">Impact Area:</td>
          <td style="padding: 6px 0; font-weight: 600; color: #2d3748;">${donation.impactAreaOfInterest || 'General Inclusion Advocacy'}</td>
        </tr>
      </table>

      ${donation.enquiryDetails ? `
      <div style="background: #f7fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px; margin-bottom: 20px;">
        <span style="font-size: 12px; font-weight: bold; color: #718096; text-transform: uppercase;">Dedication / Notes:</span>
        <p style="margin: 6px 0 0 0; font-size: 13px; color: #2d3748; line-height: 1.5;">${donation.enquiryDetails}</p>
      </div>` : ''}

      <div style="background-color: #f7fafc; padding: 16px; border-radius: 6px; text-align: center;">
        <a href="mailto:${donation.email}?subject=Official%20Appreciation%20from%20Ideal%20Special%20Education%20Consult%20LTD" style="display: inline-block; background-color: #366a1d; color: #ffffff; text-decoration: none; padding: 10px 18px; border-radius: 6px; font-weight: 600; font-size: 14px;">
          Send Appreciation Email
        </a>
      </div>
    </div>

    <div style="background-color: #edf2f7; padding: 14px 24px; font-size: 12px; color: #718096; text-align: center; border-top: 1px solid #e2e8f0;">
      <p style="margin: 0;">Dispatched automatically to designated personnel:</p>
      <p style="margin: 4px 0 0 0; font-weight: 600; color: #4a5568;">${this.recipients.join(' • ')}</p>
    </div>
  </div>
</body>
</html>
`.trim();

    const email = EmailBuilder.newEmail()
      .withSubject(subject)
      .to(this.recipients)
      .withBody(textBody)
      .withHtml(htmlBody)
      .withCategory('donation')
      .withReferenceId(donation.id)
      .withMetadata({ ...donation })
      .build();

    const sendResult = await this.smtpClient.send(email);
    const logRecord = this.recordLog(email, sendResult);
    return { sendResult, logRecord };
  }

  /**
   * 4. NOTIFY NEW CONTACT ENQUIRY
   */
  public async notifyNewContact(contact: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    localDateString?: string;
  }): Promise<{ sendResult: SendResult; logRecord: EmailLogRecord }> {
    const subject = `[CONTACT INQUIRY] New Message: ${contact.subject} — ${contact.name} (${contact.id})`;

    const textBody = `
======================================================
IDEAL SPECIAL EDUCATION CONSULT LTD — OFFICIAL ALERT
======================================================
EVENT: NEW CONTACT & PARTNERSHIP INQUIRY
REFERENCE ID: ${contact.id}
DATE RECORDED: ${contact.localDateString || new Date().toISOString()}

SENDER INFORMATION:
- Name: ${contact.name}
- Email: ${contact.email}
- Phone: ${contact.phone || 'Not provided'}
- Subject: ${contact.subject}

MESSAGE:
${contact.message}

Designated Recipients Notified:
${this.recipients.join('\n')}
======================================================
`.trim();

    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f7fa; margin: 0; padding: 24px; color: #2d3748;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.06);">
    <div style="background-color: #004872; padding: 20px 24px; text-align: left;">
      <span style="display: inline-block; background: #c9e4f7; color: #004872; font-weight: bold; font-size: 11px; padding: 4px 8px; border-radius: 4px; text-transform: uppercase; margin-bottom: 8px;">General Inquiry</span>
      <h1 style="color: #ffffff; font-size: 20px; margin: 0; font-weight: 700;">Ideal Special Education Consult LTD</h1>
      <p style="color: #c9e4f7; font-size: 13px; margin: 4px 0 0 0;">Official Contact Form Message</p>
    </div>
    
    <div style="padding: 24px;">
      <h3 style="color: #004872; font-size: 15px; border-bottom: 1px solid #edf2f7; padding-bottom: 6px; margin-top: 0;">Sender Details</h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
        <tr>
          <td style="padding: 6px 0; color: #718096; width: 38%;">Name:</td>
          <td style="padding: 6px 0; font-weight: 600; color: #1a202c;">${contact.name}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #718096;">Email:</td>
          <td style="padding: 6px 0; font-weight: 600;"><a href="mailto:${contact.email}" style="color: #004872;">${contact.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #718096;">Phone:</td>
          <td style="padding: 6px 0; color: #1a202c;">${contact.phone || 'Not provided'}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #718096;">Subject:</td>
          <td style="padding: 6px 0; font-weight: 600; color: #004872;">${contact.subject}</td>
        </tr>
      </table>

      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px; margin-bottom: 20px;">
        <span style="font-size: 12px; font-weight: bold; color: #718096; text-transform: uppercase;">Message Body:</span>
        <p style="margin: 6px 0 0 0; font-size: 13px; color: #2d3748; line-height: 1.6; white-space: pre-wrap;">${contact.message}</p>
      </div>

      <div style="background-color: #f7fafc; padding: 16px; border-radius: 6px; text-align: center;">
        <a href="mailto:${contact.email}?subject=Re:%20${encodeURIComponent(contact.subject)}" style="display: inline-block; background-color: #004872; color: #ffffff; text-decoration: none; padding: 10px 18px; border-radius: 6px; font-weight: 600; font-size: 14px;">
          Reply to Sender
        </a>
      </div>
    </div>

    <div style="background-color: #edf2f7; padding: 14px 24px; font-size: 12px; color: #718096; text-align: center; border-top: 1px solid #e2e8f0;">
      <p style="margin: 0;">Dispatched to the 3 authorized emails:</p>
      <p style="margin: 4px 0 0 0; font-weight: 600; color: #4a5568;">${this.recipients.join(' • ')}</p>
    </div>
  </div>
</body>
</html>
`.trim();

    const email = EmailBuilder.newEmail()
      .withSubject(subject)
      .to(this.recipients)
      .withBody(textBody)
      .withHtml(htmlBody)
      .withCategory('contact')
      .withReferenceId(contact.id)
      .withMetadata({ ...contact })
      .build();

    const sendResult = await this.smtpClient.send(email);
    const logRecord = this.recordLog(email, sendResult);
    return { sendResult, logRecord };
  }

  /**
   * 5. SEND TEST NOTIFICATION (Staff Portal Verification)
   */
  public async sendTestNotification(triggeredBy: string): Promise<{ sendResult: SendResult; logRecord: EmailLogRecord }> {
    const testId = `TST-${Date.now().toString().slice(-6)}`;
    const subject = `[SYSTEM TEST] Email4J Notification Pipeline Verification (${testId})`;

    const textBody = `
======================================================
IDEAL SPECIAL EDUCATION CONSULT LTD — SYSTEM TEST
======================================================
EMAIL NOTIFICATION ENGINE: Email4J (SmtpClient + EmailBuilder)
TEST ID: ${testId}
TRIGGERED BY: ${triggeredBy}
TIMESTAMP: ${new Date().toISOString()}

STATUS: ACTIVE AND OPERATIONAL
RECIPIENTS VERIFIED:
1. idealspedconsultant@gmail.com
2. sakintibubo@gmail.com
3. osamsond@gmail.com

This verification confirms that automated alerts for:
- New session bookings
- New consultation appointments
- New donations & sponsorships
- Contact inquiries
are actively monitored and queued for delivery to the designated staff.
======================================================
`.trim();

    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f7fa; margin: 0; padding: 24px; color: #2d3748;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.06);">
    <div style="background-color: #004872; padding: 20px 24px; text-align: left;">
      <span style="display: inline-block; background: #00ff66; color: #003311; font-weight: bold; font-size: 11px; padding: 4px 8px; border-radius: 4px; text-transform: uppercase; margin-bottom: 8px;">Pipeline Verified</span>
      <h1 style="color: #ffffff; font-size: 20px; margin: 0; font-weight: 700;">Email4J Notification System Test</h1>
      <p style="color: #c9e4f7; font-size: 13px; margin: 4px 0 0 0;">Ideal Special Education Consult LTD</p>
    </div>
    <div style="padding: 24px;">
      <p style="font-size: 14px; line-height: 1.6; color: #2d3748;">
        This test message verifies that your Email4J notification architecture is properly configured.
      </p>
      <div style="background: #edf2f7; padding: 14px; border-radius: 6px; font-size: 13px;">
        <p style="margin: 0; font-weight: bold; color: #004872;">Triggered by: ${triggeredBy}</p>
        <p style="margin: 4px 0 0 0; color: #718096;">Timestamp: ${new Date().toLocaleString()}</p>
        <p style="margin: 4px 0 0 0; color: #276749; font-weight: 600;">Delivery Targets: 3 Authorized Mailboxes</p>
      </div>
    </div>
    <div style="background-color: #edf2f7; padding: 14px 24px; font-size: 12px; color: #718096; text-align: center; border-top: 1px solid #e2e8f0;">
      ${this.recipients.join(' • ')}
    </div>
  </div>
</body>
</html>
`.trim();

    const email = EmailBuilder.newEmail()
      .withSubject(subject)
      .to(this.recipients)
      .withBody(textBody)
      .withHtml(htmlBody)
      .withCategory('test')
      .withReferenceId(testId)
      .build();

    const sendResult = await this.smtpClient.send(email);
    const logRecord = this.recordLog(email, sendResult);
    return { sendResult, logRecord };
  }
}
