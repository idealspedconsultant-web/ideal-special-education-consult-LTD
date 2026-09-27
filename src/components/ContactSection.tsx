import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Clock
} from 'lucide-react';
import { ORGANISATION_INFO } from '../data/orgData';
import { ContactSubmission } from '../types';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactSubmission>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setErrorMessage('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          honeypot,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmissionSuccess(data);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
      } else {
        setErrorMessage(data.error || 'Failed to submit contact enquiry.');
      }
    } catch (err) {
      setErrorMessage('Network error communicating with the server. Please call or WhatsApp directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
      aria-label="Contact Information and Direct Inquiries"
      className="py-16 md:py-24 bg-white border-b border-[#dfe9f8] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.55 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#004872] uppercase tracking-wider mb-3">
            <Mail className="w-3.5 h-3.5 text-[#366a1d]" />
            <span>Direct Communication Channels</span>
          </div>
          <h2 
            className="font-headline text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#004872] tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Contact Ideal Special Education Consult LTD
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#41474f] font-normal leading-relaxed">
            Reach out for school inclusion audits, family consultations, assessment referral guidance, or institutional partnerships.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Official Contact Details Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Address Card */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              whileHover={{ y: -4, scale: 1.02, boxShadow: '0 12px 24px -6px rgba(0, 72, 114, 0.12)', borderColor: '#0074b6' }}
              className="bg-[#f7f9ff] rounded-2xl p-5 sm:p-6 border border-[#e4effe] shadow-2xs transition-all"
            >
              <div className="flex items-start gap-4">
                <motion.div 
                  whileHover={{ rotate: 10, scale: 1.15 }}
                  className="w-10 h-10 rounded-xl bg-[#004872] text-white flex items-center justify-center shrink-0 cursor-pointer shadow-xs"
                >
                  <MapPin className="w-5 h-5" />
                </motion.div>
                <div>
                  <h3 className="font-headline text-sm font-bold text-[#004872] uppercase tracking-wider mb-1">
                    Physical Consultation Office
                  </h3>
                  <p className="text-sm text-[#121c27] font-semibold leading-relaxed">
                    {ORGANISATION_INFO.address}
                  </p>
                  <p className="text-xs text-[#41474f] mt-1">
                    Directly opposite the main gates of Lagos State University (LASU), Ojo Axis, Lagos.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Telephone Card */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.08 }}
              whileHover={{ y: -4, scale: 1.02, boxShadow: '0 12px 24px -6px rgba(54, 106, 29, 0.12)', borderColor: '#366a1d' }}
              className="bg-[#f7f9ff] rounded-2xl p-5 sm:p-6 border border-[#e4effe] shadow-2xs transition-all"
            >
              <div className="flex items-start gap-4">
                <motion.div 
                  whileHover={{ rotate: 10, scale: 1.15 }}
                  className="w-10 h-10 rounded-xl bg-[#366a1d] text-white flex items-center justify-center shrink-0 cursor-pointer shadow-xs"
                >
                  <Phone className="w-5 h-5" />
                </motion.div>
                <div>
                  <h3 className="font-headline text-sm font-bold text-[#004872] uppercase tracking-wider mb-1">
                    Direct Phone Lines
                  </h3>
                  <div className="space-y-1">
                    {ORGANISATION_INFO.phones.map((p, i) => (
                      <div key={i}>
                        <a
                          href={`tel:${p.raw}`}
                          className="text-base font-bold text-[#004872] hover:underline focus:ring-1 focus:ring-[#004872] rounded inline-block"
                        >
                          {p.display}
                        </a>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-[#41474f] mt-1">
                    Lines active during working hours. 24/7 voicemail and WhatsApp monitoring.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Email Card */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.16 }}
              whileHover={{ y: -4, scale: 1.02, boxShadow: '0 12px 24px -6px rgba(0, 72, 114, 0.12)', borderColor: '#0074b6' }}
              className="bg-[#f7f9ff] rounded-2xl p-5 sm:p-6 border border-[#e4effe] shadow-2xs transition-all"
            >
              <div className="flex items-start gap-4">
                <motion.div 
                  whileHover={{ rotate: 10, scale: 1.15 }}
                  className="w-10 h-10 rounded-xl bg-[#004872] text-white flex items-center justify-center shrink-0 cursor-pointer shadow-xs"
                >
                  <Mail className="w-5 h-5" />
                </motion.div>
                <div>
                  <h3 className="font-headline text-sm font-bold text-[#004872] uppercase tracking-wider mb-1">
                    Official Email
                  </h3>
                  <a
                    href={`mailto:${ORGANISATION_INFO.email}`}
                    className="text-sm sm:text-base font-bold text-[#004872] hover:underline break-all inline-block"
                  >
                    {ORGANISATION_INFO.email}
                  </a>
                  <p className="text-xs text-[#41474f] mt-1">
                    Formal documentation, institutional proposals, and assessment records.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* WhatsApp Quick Connect Button */}
            <motion.a
              href={`https://wa.me/${ORGANISATION_INFO.whatsappNumber.replace('+', '')}?text=Hello%20Ideal%20Special%20Education%20Consult%20LTD,%20I%20would%20like%20to%20make%20an%20enquiry.`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -2, boxShadow: '0 8px 16px -2px rgba(54, 106, 29, 0.3)' }}
              whileTap={{ scale: 0.97 }}
              className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-sm font-bold text-white bg-[#366a1d] hover:bg-[#2d5818] shadow-xs cursor-pointer transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat Directly on WhatsApp</span>
            </motion.a>

            {/* Operational Hours */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="p-4 rounded-2xl bg-[#eef4ff] text-xs text-[#41474f] flex items-center gap-3"
            >
              <Clock className="w-4 h-4 text-[#004872] shrink-0" />
              <div>
                <strong>Working Hours:</strong> Monday – Friday: 8:30 AM – 5:00 PM • Saturday Sessions by Prior Appointment.
              </div>
            </motion.div>

          </div>

          {/* Right Column: Interactive General Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              whileHover={{ boxShadow: '0 20px 30px -10px rgba(0, 72, 114, 0.1)' }}
              className="bg-[#f7f9ff] rounded-3xl p-6 sm:p-8 border border-[#dfe9f8] shadow-xs transition-shadow"
            >
              
              <h3 className="font-headline text-xl font-bold text-[#004872] mb-1">
                Send an Enquiry to Our Administrative Desk
              </h3>
              <p className="text-xs sm:text-sm text-[#41474f] mb-6">
                All submissions are received securely by our authorized clinical and consulting desk and addressed promptly.
              </p>

              <AnimatePresence>
                {submissionSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-6 bg-white rounded-2xl border border-[#366a1d]/30 text-center"
                  >
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="w-12 h-12 rounded-full bg-[#b3f092] text-[#366a1d] flex items-center justify-center mx-auto mb-3 shadow-xs"
                    >
                      <CheckCircle2 className="w-7 h-7" />
                    </motion.div>
                    <h4 className="font-headline text-lg font-bold text-[#004872]">
                      Message Transmitted Successfully
                    </h4>
                    <p className="text-xs text-[#41474f] mt-1 mb-4">
                      Reference ID: <strong className="font-mono text-[#004872]">{submissionSuccess.referenceId}</strong>.
                      Our desk will respond shortly.
                    </p>
                    <motion.button
                      type="button"
                      onClick={() => setSubmissionSuccess(null)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-xs font-bold text-[#004872] hover:underline cursor-pointer"
                    >
                      Send another message
                    </motion.button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    <div className="hidden" aria-hidden="true">
                      <input
                        type="text"
                        tabIndex={-1}
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                      />
                    </div>

                    {errorMessage && (
                      <div className="p-3 bg-[#ffdad6] text-[#93000a] text-xs rounded-xl flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#004872] uppercase tracking-wider mb-1">
                          Your Full Name <span className="text-[#ba1a1a]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Mr. Olusegun"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-2.5 bg-white border border-[#c1c7d0] rounded-xl text-sm text-[#121c27] focus:border-[#004872] focus:ring-2 focus:ring-[#004872] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#004872] uppercase tracking-wider mb-1">
                          Email Address <span className="text-[#ba1a1a]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. olusegun@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-2.5 bg-white border border-[#c1c7d0] rounded-xl text-sm text-[#121c27] focus:border-[#004872] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#004872] uppercase tracking-wider mb-1">
                          Phone / WhatsApp (Optional)
                        </label>
                        <input
                          type="tel"
                          placeholder="e.g. 0816 342 0864"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-2.5 bg-white border border-[#c1c7d0] rounded-xl text-sm text-[#121c27] focus:border-[#004872] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#004872] uppercase tracking-wider mb-1">
                          Subject of Message <span className="text-[#ba1a1a]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. School Inclusion Inquiry"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full px-4 py-2.5 bg-white border border-[#c1c7d0] rounded-xl text-sm text-[#121c27] focus:border-[#004872] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#004872] uppercase tracking-wider mb-1">
                        Message <span className="text-[#ba1a1a]">*</span>
                      </label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Write your enquiry, school requirements, or question here..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-[#c1c7d0] rounded-xl text-sm text-[#121c27] focus:border-[#004872] transition-colors"
                      />
                    </div>

                    <motion.button
                      id="btn-submit-contact-enquiry"
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.04, y: -2, boxShadow: '0 10px 20px -4px rgba(0, 72, 114, 0.35)' }}
                      whileTap={{ scale: 0.96 }}
                      className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-[#004872] hover:bg-[#1b6091] disabled:opacity-50 transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </AnimatePresence>

            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};
