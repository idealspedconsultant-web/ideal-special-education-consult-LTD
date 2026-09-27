import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  ShieldCheck, 
  HelpCircle,
  MessageCircle,
  FileSpreadsheet,
  Printer
} from 'lucide-react';
import { SERVICES_LIST, ORGANISATION_INFO } from '../data/orgData';
import { BookingSubmission, UserCategory, ContactMethod } from '../types';

interface BookingSectionProps {
  preselectedService?: string;
  onClearPreselectedService?: () => void;
  onOpenAuthorizedAccess?: () => void;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  preselectedService,
  onClearPreselectedService,
  onOpenAuthorizedAccess,
}) => {
  const [formData, setFormData] = useState<BookingSubmission>({
    fullName: '',
    email: '',
    phoneNumber: '',
    preferredService: preselectedService || SERVICES_LIST[0].title,
    preferredDate: '',
    preferredTime: 'Morning (9:00 AM – 12:00 PM)',
    userCategory: 'Parent / Guardian',
    preferredContactMethod: 'WhatsApp Message',
    additionalMessage: '',
  });

  const [bookingCategory, setBookingCategory] = useState<'consultation' | 'session'>('consultation');
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, preferredService: preselectedService }));
      if (preselectedService.toLowerCase().includes('consult') || preselectedService.toLowerCase().includes('guidance')) {
        setBookingCategory('consultation');
      }
    }
  }, [preselectedService]);

  const userCategories: UserCategory[] = [
    'Parent / Guardian',
    'School Administrator',
    'Teacher / Educator',
    'Individual Learner',
    'Corporate / NGO Partner',
  ];

  const contactMethods: ContactMethod[] = [
    'WhatsApp Message',
    'Phone Call',
    'Email',
    'Video Call (Accessible / Sign-Supported)',
  ];

  const timeOptions = [
    'Morning (9:00 AM – 12:00 PM)',
    'Afternoon (12:00 PM – 3:00 PM)',
    'Late Afternoon (3:00 PM – 5:30 PM)',
    'Saturday Session (By Prior Appointment)',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic frontend validations
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phoneNumber.trim()) {
      setErrorMessage('Please fill in your Full Name, Email Address, and Phone Number.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          isConsultationBooking: bookingCategory === 'consultation',
          honeypot, // Spam honeypot
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmissionSuccess(data);
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phoneNumber: '',
          preferredService: SERVICES_LIST[0].title,
          preferredDate: '',
          preferredTime: 'Morning (9:00 AM – 12:00 PM)',
          userCategory: 'Parent / Guardian',
          preferredContactMethod: 'WhatsApp Message',
          additionalMessage: '',
        });
      } else {
        setErrorMessage(data.error || 'Unable to register booking. Please verify inputs or contact via WhatsApp.');
      }
    } catch (err: any) {
      setErrorMessage('Network connection error. Please verify your connection or reach us on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="booking" 
      aria-label="Book a Consultation Session"
      className="py-16 md:py-24 bg-white border-b border-[#dfe9f8] overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.55 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#004872] uppercase tracking-wider mb-3">
            <Calendar className="w-3.5 h-3.5 text-[#366a1d]" />
            <span>Request an Appointment</span>
          </div>
          <h2 
            className="font-headline text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#004872] tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Book a Consultation or Support Session
          </h2>
          <p className="mt-3 text-base text-[#41474f] font-normal max-w-2xl mx-auto">
            Connect with our special education consultants and accessibility specialists. 
            We review each request individually to determine the ideal intervention framework.
          </p>
        </motion.div>

        {/* Clear Booking Request Disclaimer Notice */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.01 }}
          role="note"
          aria-label="Booking policy notice"
          className="bg-[#f7f9ff] border-l-4 border-[#004872] p-4 sm:p-5 rounded-r-2xl border border-y-[#e4effe] border-r-[#e4effe] mb-8 shadow-xs text-xs sm:text-sm text-[#41474f] flex items-start gap-3"
        >
          <HelpCircle className="w-5 h-5 text-[#004872] shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold text-[#121c27]">Important Appointment Note:</strong>
            <p className="mt-0.5 leading-relaxed">
              Submitting this form registers an official <em>booking request</em> and does <strong>not</strong> automatically confirm an appointment date. 
              Our inclusion team will review your case details, confirm specialist availability, and reach out via your chosen contact method within 24 to 48 hours.
            </p>
          </div>
        </motion.div>

        {/* Success Confirmation State */}
        <AnimatePresence>
          {submissionSuccess ? (
            <motion.div 
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="bg-[#eef4ff] rounded-3xl p-6 sm:p-10 border border-[#b3d8ff] text-center shadow-sm"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="w-16 h-16 rounded-full bg-[#366a1d] text-white flex items-center justify-center mx-auto mb-5 shadow-xs"
              >
                <CheckCircle2 className="w-9 h-9" />
              </motion.div>

              <span className="text-xs font-bold uppercase tracking-wider text-[#366a1d]">
                Request Registered Successfully
              </span>
              <h3 className="font-headline text-2xl font-bold text-[#004872] mt-1 mb-2">
                Thank You for Reaching Out
              </h3>
              <p className="text-sm sm:text-base text-[#41474f] max-w-lg mx-auto mb-6 leading-relaxed">
                Your consultation request has been logged into our secure backend. A coordinator from 
                <strong className="text-[#121c27]"> Ideal Special Education Consult LTD</strong> will review your submission and contact you.
              </p>

              {/* Reference Badge Card */}
              <div className="bg-white rounded-2xl p-4 max-w-md mx-auto border border-[#dfe9f8] mb-6 text-left text-xs sm:text-sm space-y-1.5 shadow-2xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Booking Reference:</span>
                  <span className="font-mono font-bold text-[#004872]">{submissionSuccess.referenceId}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Recorded At:</span>
                  <span className="text-[#121c27]">{new Date(submissionSuccess.timestamp).toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Backend Storage:</span>
                  <span className="font-semibold text-[#366a1d]">Tab: Booking Requests</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Current Status:</span>
                  <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-[#eef4ff] text-[#004872]">
                    Pending Review
                  </span>
                </div>
                <div className="flex items-center justify-between py-1.5 pt-2">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#0074b6]" />
                    <span>Notification Sent:</span>
                  </span>
                  <span className="font-semibold text-[11px] text-[#366a1d] bg-[#f0f8ec] px-2 py-0.5 rounded border border-[#366a1d]/20">
                    Dispatched to 3 Mailboxes (Email4J)
                  </span>
                </div>
              </div>

              {/* Direct WhatsApp Follow-up Option */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <motion.a
                  href={`https://wa.me/${ORGANISATION_INFO.whatsappNumber.replace('+', '')}?text=Hello%20Ideal%20Special%20Education%20Consult,%20I%20just%20submitted%20booking%20request%20${submissionSuccess.referenceId}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#366a1d] hover:bg-[#2d5818] shadow-xs cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Notify via WhatsApp</span>
                </motion.a>

                <motion.button
                  type="button"
                  onClick={() => window.print()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#41474f] bg-white border border-[#c1c7d0] hover:bg-slate-50 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Copy</span>
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => setSubmissionSuccess(null)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-1 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#004872] hover:underline cursor-pointer"
                >
                  Submit Another Request
                </motion.button>
              </div>
            </motion.div>
          ) : (
            /* The Interactive Booking Form */
            <motion.form 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              onSubmit={handleSubmit}
              className="bg-[#f7f9ff] rounded-3xl p-6 sm:p-10 border border-[#e4effe] shadow-xs"
              noValidate
            >
              {/* Honeypot Spam Guard */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website-trap-field">Leave this empty</label>
                <input
                  id="website-trap-field"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {/* Error Banner */}
              {errorMessage && (
                <div 
                  role="alert"
                  className="mb-6 p-4 rounded-2xl bg-[#ffdad6] text-[#93000a] text-sm flex items-center gap-2.5 border border-[#ba1a1a]/30"
                >
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="space-y-6">
                
                {/* Booking Nature: Consultation vs Structured Session */}
                <div className="bg-[#f7f9ff] p-4 rounded-2xl border border-[#e4effe]">
                  <label className="block text-xs font-bold text-[#004872] uppercase tracking-wider mb-2">
                    Select Appointment Category:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setBookingCategory('consultation')}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        bookingCategory === 'consultation'
                          ? 'bg-[#004872] text-white border-[#004872] shadow-xs'
                          : 'bg-white text-[#121c27] border-slate-200 hover:border-[#004872]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs sm:text-sm">Special Education Consultation</span>
                        {bookingCategory === 'consultation' && <CheckCircle2 className="w-4 h-4 text-[#00ff66]" />}
                      </div>
                      <p className={`text-[11px] mt-1 ${bookingCategory === 'consultation' ? 'text-blue-100' : 'text-slate-500'}`}>
                        Initial diagnostic evaluation, advisory, and tailored intervention planning.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setBookingCategory('session')}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        bookingCategory === 'session'
                          ? 'bg-[#004872] text-white border-[#004872] shadow-xs'
                          : 'bg-white text-[#121c27] border-slate-200 hover:border-[#004872]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs sm:text-sm">Intervention & Therapy Session</span>
                        {bookingCategory === 'session' && <CheckCircle2 className="w-4 h-4 text-[#00ff66]" />}
                      </div>
                      <p className={`text-[11px] mt-1 ${bookingCategory === 'session' ? 'text-blue-100' : 'text-slate-500'}`}>
                        Routine IEP / ISP learning remediation or classroom inclusion session.
                      </p>
                    </button>
                  </div>
                </div>

                {/* Row 1: Full Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label 
                      htmlFor="booking-full-name"
                      className="block text-sm font-bold text-[#004872] mb-1.5"
                    >
                      Full Name <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="booking-full-name"
                        type="text"
                        required
                        placeholder="e.g. Mrs. Adebayo Olanrewaju"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#c1c7d0] rounded-xl text-base text-[#121c27] focus:border-[#004872] focus:ring-2 focus:ring-[#004872] transition-colors"
                      />
                      <User className="w-5 h-5 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label 
                      htmlFor="booking-email"
                      className="block text-sm font-bold text-[#004872] mb-1.5"
                    >
                      Email Address <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="booking-email"
                        type="email"
                        required
                        placeholder="e.g. adebayo@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#c1c7d0] rounded-xl text-base text-[#121c27] focus:border-[#004872] focus:ring-2 focus:ring-[#004872] transition-colors"
                      />
                      <Mail className="w-5 h-5 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Row 2: Phone & User Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label 
                      htmlFor="booking-phone"
                      className="block text-sm font-bold text-[#004872] mb-1.5"
                    >
                      Phone / WhatsApp Number <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="booking-phone"
                        type="tel"
                        required
                        placeholder="e.g. 0816 342 0864"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#c1c7d0] rounded-xl text-base text-[#121c27] focus:border-[#004872] focus:ring-2 focus:ring-[#004872] transition-colors"
                      />
                      <Phone className="w-5 h-5 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label 
                      htmlFor="booking-user-category"
                      className="block text-sm font-bold text-[#004872] mb-1.5"
                    >
                      I am Reaching Out As <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <select
                        id="booking-user-category"
                        value={formData.userCategory}
                        onChange={(e) => setFormData({ ...formData, userCategory: e.target.value as UserCategory })}
                        className="w-full px-4 py-3 bg-white border border-[#c1c7d0] rounded-xl text-base text-[#121c27] focus:border-[#004872] focus:ring-2 focus:ring-[#004872] transition-colors"
                      >
                      {userCategories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 3: Preferred Service (All 10 services) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label 
                      htmlFor="booking-preferred-service"
                      className="block text-sm font-bold text-[#004872]"
                    >
                      Preferred Service <span className="text-[#ba1a1a]">*</span>
                    </label>
                    {preselectedService && (
                      <button
                        type="button"
                        onClick={onClearPreselectedService}
                        className="text-xs text-[#366a1d] hover:underline"
                      >
                        Reset selection
                      </button>
                    )}
                  </div>
                  <select
                    id="booking-preferred-service"
                    value={formData.preferredService}
                    onChange={(e) => setFormData({ ...formData, preferredService: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[#004872] rounded-xl text-base font-semibold text-[#004872] focus:ring-2 focus:ring-[#004872] transition-colors"
                  >
                    {SERVICES_LIST.map((svc) => (
                      <option key={svc.id} value={svc.title}>{svc.title}</option>
                    ))}
                  </select>
                </div>

                {/* Row 4: Preferred Date, Preferred Time, Contact Method */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label 
                      htmlFor="booking-date"
                      className="block text-sm font-bold text-[#004872] mb-1.5"
                    >
                      Target Date (Optional)
                    </label>
                    <input
                      id="booking-date"
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-3.5 py-3 bg-white border border-[#c1c7d0] rounded-xl text-base text-[#121c27] focus:border-[#004872] focus:ring-2 focus:ring-[#004872]"
                    />
                  </div>

                  <div>
                    <label 
                      htmlFor="booking-time"
                      className="block text-sm font-bold text-[#004872] mb-1.5"
                    >
                      Preferred Time Slot
                    </label>
                    <select
                      id="booking-time"
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full px-3 py-3 bg-white border border-[#c1c7d0] rounded-xl text-base text-[#121c27] focus:border-[#004872] focus:ring-2 focus:ring-[#004872]"
                    >
                      {timeOptions.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label 
                      htmlFor="booking-contact-method"
                      className="block text-sm font-bold text-[#004872] mb-1.5"
                    >
                      Preferred Contact Mode
                    </label>
                    <select
                      id="booking-contact-method"
                      value={formData.preferredContactMethod}
                      onChange={(e) => setFormData({ ...formData, preferredContactMethod: e.target.value as ContactMethod })}
                      className="w-full px-3 py-3 bg-white border border-[#c1c7d0] rounded-xl text-base text-[#121c27] focus:border-[#004872] focus:ring-2 focus:ring-[#004872]"
                    >
                      {contactMethods.map((cm) => (
                        <option key={cm} value={cm}>{cm}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 5: Additional Message */}
                <div>
                  <label 
                    htmlFor="booking-additional-message"
                    className="block text-sm font-bold text-[#004872] mb-1.5"
                  >
                    Brief Summary of Needs or Questions (Non-Sensitive)
                  </label>
                  <textarea
                    id="booking-additional-message"
                    rows={3}
                    placeholder="Share general learning goals, learner age or grade, or specific consultation topics. Please do not share medical diagnoses or private clinical records on this preliminary public form."
                    value={formData.additionalMessage}
                    onChange={(e) => setFormData({ ...formData, additionalMessage: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[#c1c7d0] rounded-xl text-base text-[#121c27] focus:border-[#004872] focus:ring-2 focus:ring-[#004872] transition-colors"
                  />
                </div>

                {/* Form Footer & Submit Button */}
                <div className="pt-4 border-t border-[#dfe9f8] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-[#717880]">
                    <ShieldCheck className="w-4 h-4 text-[#366a1d] shrink-0" />
                    <span>Confidential data handled by Ideal SpEd Consult LTD protocols.</span>
                  </div>

                  <motion.button
                    id="btn-submit-booking-form"
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.04, y: -2, boxShadow: '0 10px 20px -4px rgba(0, 72, 114, 0.35)' }}
                    whileTap={{ scale: 0.96 }}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-[#004872] hover:bg-[#1b6091] disabled:opacity-50 transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Transmitting Request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Booking Request</span>
                      </>
                    )}
                  </motion.button>
                </div>

              </div>
            </motion.form>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
