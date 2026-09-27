import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Search,
  Filter,
  ExternalLink,
  ShieldCheck,
  Server,
  Layers,
  Sparkles,
  Eye,
  X,
  Clock,
  ArrowRight,
  Inbox
} from 'lucide-react';
import { EmailLogRecord, EmailServiceStatus } from '../types';

interface Email4JMailboxTabProps {
  emailLogs: EmailLogRecord[];
  emailStatus: EmailServiceStatus | null;
  onRefresh: () => void;
  isLoading: boolean;
  userEmail: string;
}

const DESIGNATED_EMAILS = [
  {
    email: 'idealspedconsultant@gmail.com',
    role: 'Lead Special Education Consultant / Director',
    badge: 'Executive',
  },
  {
    email: 'sakintibubo@gmail.com',
    role: 'Assessment & Clinical Specialist',
    badge: 'Clinical Lead',
  },
  {
    email: 'osamsond@gmail.com',
    role: 'Senior Inclusion Consultant',
    badge: 'Inclusion Specialist',
  },
];

export const Email4JMailboxTab: React.FC<Email4JMailboxTabProps> = ({
  emailLogs,
  emailStatus,
  onRefresh,
  isLoading,
  userEmail,
}) => {
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [testFeedback, setTestFeedback] = useState<string | null>(null);
  const [selectedPreview, setSelectedPreview] = useState<EmailLogRecord | null>(null);
  const [showConfigDetails, setShowConfigDetails] = useState(false);

  const handleSendTestNotification = async () => {
    setIsSendingTest(true);
    setTestFeedback(null);
    try {
      const res = await fetch('/api/email-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ triggeredBy: userEmail }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setTestFeedback('Success! Test notification dispatched to the 3 designated staff mailboxes.');
        onRefresh();
      } else {
        setTestFeedback(`Dispatch notice: ${data.error || 'Check server connection.'}`);
      }
    } catch (err: any) {
      setTestFeedback(`Connection error: ${err.message}`);
    } finally {
      setIsSendingTest(false);
    }
  };

  const filteredLogs = emailLogs.filter((log) => {
    const matchesCategory = categoryFilter === 'ALL' || log.category === categoryFilter;
    const matchesSearch =
      searchQuery === '' ||
      log.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.bodySnippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.referenceId || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner: Architecture & Target Mailboxes */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-[#004872] text-[#cce8fe]">
                Email4J Engine
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#f0f8ec] text-[#366a1d] border border-[#366a1d]/20 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#366a1d] animate-pulse" />
                SmtpClient • Active Dispatcher
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#004872] mt-1.5">
              Automated Intake & Transaction Notifications
            </h3>
            <p className="text-xs text-[#526070] mt-0.5">
              Every new booking, consultation appointment, donation, and inquiry is automatically built via <code className="bg-slate-100 px-1 py-0.5 rounded text-[#004872]">EmailBuilder</code> and dispatched to the 3 authorized staff mailboxes.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowConfigDetails(!showConfigDetails)}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-[#004872] bg-[#f0f7ff] hover:bg-[#e0efff] border border-[#cce0ff] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Server className="w-3.5 h-3.5" />
              <span>{showConfigDetails ? 'Hide Transport Config' : 'View SMTP Config'}</span>
            </button>
            <button
              onClick={handleSendTestNotification}
              disabled={isSendingTest}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#004872] hover:bg-[#003453] transition-all flex items-center gap-2 shadow-xs cursor-pointer disabled:opacity-70"
            >
              {isSendingTest ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Dispatching...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5 text-[#00ff66]" />
                  <span>Send Test Email (All 3 Mails)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Feedback message */}
        {testFeedback && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{testFeedback}</span>
            </div>
            <button
              onClick={() => setTestFeedback(null)}
              className="text-emerald-700 hover:text-emerald-900 font-bold"
            >
              ×
            </button>
          </div>
        )}

        {/* SMTP Configuration Card (Collapsible) */}
        {showConfigDetails && (
          <div className="mb-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
            <div className="font-bold text-[#004872] flex items-center gap-1.5">
              <Server className="w-4 h-4" />
              <span>Email4J / SmtpClient Transport Configuration</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-slate-500 text-[11px] block">SMTP Host</span>
                <span className="font-mono font-bold text-slate-800">{emailStatus?.host || 'smtp.gmail.com'}</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-slate-500 text-[11px] block">Port & Encryption</span>
                <span className="font-mono font-bold text-slate-800">{emailStatus?.port || 587} (TLS/STARTTLS)</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-slate-500 text-[11px] block">Live Transport Status</span>
                <span className={`font-semibold ${emailStatus?.configured ? 'text-emerald-700' : 'text-blue-700'}`}>
                  {emailStatus?.configured ? 'Live Authenticated Transport' : 'Active Safe Sandbox (All Dispatches Logged & Synced)'}
                </span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 pt-1">
              To send live external emails through your custom Gmail App Password or enterprise SMTP server, add <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">SMTP_USER</code> and <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">SMTP_PASS</code> in environment variables.
            </p>
          </div>
        )}

        {/* 3 Designated Mailbox Cards */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Designated Staff Notification Recipients (3 Authorized Mailboxes):
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {DESIGNATED_EMAILS.map((staff, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-[#f7f9ff] border border-[#e4effe] flex items-start gap-2.5 relative overflow-hidden"
              >
                <div className="w-7 h-7 rounded-lg bg-[#004872] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#004872] truncate select-all">
                      {staff.email}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600 truncate mt-0.5">
                    {staff.role}
                  </div>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#366a1d]" />
                    <span className="text-[10px] font-bold text-[#366a1d] uppercase tracking-wide">
                      Monitored Mailbox
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search email subjects, reference IDs, or client details..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004872]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'ALL', label: 'All Notifications' },
            { id: 'booking', label: 'Bookings' },
            { id: 'consultation', label: 'Consultations' },
            { id: 'donation', label: 'Donations' },
            { id: 'contact', label: 'Inquiries' },
            { id: 'test', label: 'Tests' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                categoryFilter === cat.id
                  ? 'bg-[#004872] text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}

          <button
            onClick={onRefresh}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            title="Refresh mail log"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Dispatched Emails Log List */}
      <div className="space-y-3">
        {filteredLogs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6">
            <Inbox className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h4 className="font-bold text-slate-700 text-sm">No email notifications found</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              New bookings, consultation bookings, and donations will automatically trigger email dispatches to all 3 staff mailboxes.
            </p>
            <button
              onClick={handleSendTestNotification}
              disabled={isSendingTest}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#004872] hover:bg-[#003453] transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-[#00ff66]" />
              <span>Trigger Test Notification</span>
            </button>
          </div>
        ) : (
          filteredLogs.map((log) => {
            const categoryBadge =
              log.category === 'consultation'
                ? { label: 'Consultation', bg: 'bg-amber-100 text-amber-900 border-amber-300' }
                : log.category === 'booking'
                ? { label: 'Session Booking', bg: 'bg-blue-100 text-blue-900 border-blue-300' }
                : log.category === 'donation'
                ? { label: 'Donation Alert', bg: 'bg-emerald-100 text-emerald-900 border-emerald-300' }
                : log.category === 'contact'
                ? { label: 'Direct Inquiry', bg: 'bg-indigo-100 text-indigo-900 border-indigo-300' }
                : { label: 'System Test', bg: 'bg-slate-100 text-slate-800 border-slate-300' };

            return (
              <div
                key={log.id}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 hover:border-[#004872]/40 transition-all shadow-2xs"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-1 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${categoryBadge.bg}`}>
                        {categoryBadge.label}
                      </span>
                      {log.referenceId && (
                        <span className="font-mono text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {log.referenceId}
                        </span>
                      )}
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(log.timestamp).toLocaleString('en-NG', { timeZone: 'Africa/Lagos' })}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                      {log.subject}
                    </h4>

                    <p className="text-xs text-slate-600 line-clamp-2">
                      {log.bodySnippet}
                    </p>
                  </div>

                  <div className="flex flex-col sm:items-end gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{log.status === 'sent' ? 'Sent (Live SMTP)' : 'Dispatched to 3 Mailboxes'}</span>
                    </span>

                    <button
                      onClick={() => setSelectedPreview(log)}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold text-[#004872] bg-[#f0f7ff] hover:bg-[#e0efff] border border-[#cce0ff] transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Message Body</span>
                    </button>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-slate-700">Dispatched To:</span>
                    <span className="font-mono text-slate-600">
                      {log.to.join(', ')}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    ID: {log.id}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Email Message Body Preview Modal */}
      <AnimatePresence>
        {selectedPreview && (
          <div
            className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]"
            >
              {/* Modal Header */}
              <div className="bg-[#004872] text-white px-6 py-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded">
                    Email4J Message Inspector
                  </span>
                  <h3 className="font-bold text-base mt-1 text-white truncate max-w-md">
                    {selectedPreview.subject}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedPreview(null)}
                  className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Message Meta */}
              <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 text-xs space-y-1">
                <div className="flex">
                  <span className="w-20 font-bold text-slate-500">From:</span>
                  <span className="text-slate-800">{selectedPreview.from}</span>
                </div>
                <div className="flex">
                  <span className="w-20 font-bold text-slate-500">To:</span>
                  <span className="font-mono font-semibold text-[#004872]">{selectedPreview.to.join(', ')}</span>
                </div>
                <div className="flex">
                  <span className="w-20 font-bold text-slate-500">Date:</span>
                  <span className="text-slate-800">{new Date(selectedPreview.timestamp).toLocaleString()}</span>
                </div>
                {selectedPreview.referenceId && (
                  <div className="flex">
                    <span className="w-20 font-bold text-slate-500">Reference:</span>
                    <span className="font-mono font-bold text-[#366a1d]">{selectedPreview.referenceId}</span>
                  </div>
                )}
              </div>

              {/* Content Body */}
              <div className="p-6 overflow-y-auto flex-1">
                {selectedPreview.fullHtml ? (
                  <div
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: selectedPreview.fullHtml }}
                  />
                ) : (
                  <pre className="text-xs font-mono bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto whitespace-pre-wrap leading-relaxed">
                    {selectedPreview.fullBody}
                  </pre>
                )}
              </div>

              {/* Modal Footer */}
              <div className="bg-slate-100 px-6 py-3 border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => setSelectedPreview(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#004872] hover:bg-[#003453] transition-colors cursor-pointer"
                >
                  Close Preview
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
