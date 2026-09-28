import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  ShieldAlert,
  Lock,
  Mail,
  Key,
  Eye,
  EyeOff,
  LogOut,
  Calendar,
  Phone,
  MessageCircle,
  FileSpreadsheet,
  Download,
  Printer,
  RefreshCw,
  Search,
  CheckCircle2,
  Clock,
  UserCheck,
  ChevronRight,
  X,
  ExternalLink,
  ClipboardCheck,
  FileText,
  HelpCircle,
  Sparkles,
  Info,
  Film
} from 'lucide-react';
import { IdealLogo } from './IdealLogo';
import {
  BookingSubmission,
  ContactSubmission,
  DonationEnquirySubmission,
  StaffAuthSession,
  EmailLogRecord,
  EmailServiceStatus,
} from '../types';
import { Email4JMailboxTab } from './Email4JMailboxTab';
import { ProgrammesManagerTab } from './ProgrammesManagerTab';

interface AuthorizedAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AUTHORIZED_EMAILS = [
  'idealspedconsultant@gmail.com',
  'sakintibubo@gmail.com',
  'osamsond@gmail.com',
];

const DEFAULT_PASSCODE = 'IdealAccess@2026';

export const AuthorizedAccessModal: React.FC<AuthorizedAccessModalProps> = ({ isOpen, onClose }) => {
  // Session persistence in sessionStorage
  const [session, setSession] = useState<StaffAuthSession | null>(() => {
    try {
      const saved = sessionStorage.getItem('ideal_staff_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Login form state
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Submissions data state
  const [activeTab, setActiveTab] = useState<'assessments' | 'contacts' | 'donations' | 'emails' | 'programmes' | 'export' | 'audit'>('assessments');
  const [auditSubTab, setAuditSubTab] = useState<'assumptions' | 'clarifications' | 'future' | 'checklist'>('assumptions');
  const [bookings, setBookings] = useState<BookingSubmission[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [donations, setDonations] = useState<DonationEnquirySubmission[]>([]);
  const [emailLogs, setEmailLogs] = useState<EmailLogRecord[]>([]);
  const [emailStatus, setEmailStatus] = useState<EmailServiceStatus | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [statusUpdateMessage, setStatusUpdateMessage] = useState<string | null>(null);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock background body scroll while modal is open to ensure clean mobile scrolling
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalTouchAction = document.body.style.touchAction;
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.touchAction = originalTouchAction;
      };
    }
  }, [isOpen]);

  // Load submissions data when authenticated
  const loadSubmissionsData = async () => {
    if (!session) return;
    setIsLoadingData(true);
    try {
      const res = await fetch('/api/submissions');
      if (res.ok) {
        const data = await res.json();
        setBookings(data.bookings || []);
        setContacts(data.contacts || []);
        setDonations(data.donations || []);
        setEmailLogs(data.emailLogs || []);
        setEmailStatus(data.emailStatus || null);
      }
    } catch (err) {
      console.error('Error fetching submissions:', err);
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    if (session && isOpen) {
      loadSubmissionsData();
    }
  }, [session, isOpen]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const normalizedEmail = emailInput.trim().toLowerCase();

    // Check email restriction strictly
    if (!AUTHORIZED_EMAILS.includes(normalizedEmail)) {
      setLoginError(
        'Access Denied: This email address is not authorized. Authorized access is restricted exclusively to idealspedconsultant@gmail.com, sakintibubo@gmail.com, and osamsond@gmail.com.'
      );
      return;
    }

    setIsAuthenticating(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail, password: passwordInput.trim() }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setLoginError(data.error || 'Authentication failed. Please verify your passcode.');
        setIsAuthenticating(false);
        return;
      }

      const newSession: StaffAuthSession = {
        email: data.email,
        role: data.role,
        token: data.token,
        loginTime: new Date().toLocaleTimeString(),
      };

      setSession(newSession);
      sessionStorage.setItem('ideal_staff_session', JSON.stringify(newSession));
      setPasswordInput('');
    } catch (err) {
      setLoginError('Unable to connect to authentication service. Please try again.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  // Handle Sign Out
  const handleSignOut = () => {
    setSession(null);
    sessionStorage.removeItem('ideal_staff_session');
    setEmailInput('');
    setPasswordInput('');
    setLoginError(null);
  };

  // Handle Status Update
  const handleUpdateStatus = async (type: 'bookings' | 'contacts' | 'donations', id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/submissions/${type}/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setStatusUpdateMessage(`Updated status to "${newStatus}"`);
        setTimeout(() => setStatusUpdateMessage(null), 3000);
        // Refresh local state
        if (type === 'bookings') {
          setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus as any } : b));
        } else if (type === 'contacts') {
          setContacts(prev => prev.map(c => c.id === id ? { ...c, status: newStatus as any } : c));
        } else if (type === 'donations') {
          setDonations(prev => prev.map(d => d.id === id ? { ...d, status: newStatus as any } : d));
        }
      }
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  // Filter Bookings / Assessments
  const filteredBookings = bookings.filter(item => {
    const matchesSearch = 
      (item.fullName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.phoneNumber || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.preferredService || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.id || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-black/60 backdrop-blur-sm flex items-start sm:items-center justify-center p-2 sm:p-5"
      style={{ WebkitOverflowScrolling: 'touch' }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-portal-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-5xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[calc(100dvh-1rem)] sm:max-h-[92vh] my-auto min-h-0"
      >
        {/* Modal Top Header */}
        <div className="bg-[#004872] text-white px-4 sm:px-8 py-3.5 sm:py-4 flex items-center justify-between gap-3 sm:gap-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-[#b3f092] shrink-0">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 id="auth-portal-title" className="font-headline text-sm sm:text-lg font-bold text-white leading-tight truncate">
                  Authorized Assessment Portal
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#366a1d] text-[#b3f092] border border-[#b3f092]/30 shrink-0">
                  Restricted
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-white/80 truncate">
                Ideal Special Education Consult LTD • Clinical Assessment Management
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            aria-label="Close portal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Login View OR Authenticated Console */}
        {!session ? (
          /* ==========================================
             AUTHENTICATION FORM (Step 1)
             ========================================== */
          <div 
            className="p-4 sm:p-10 overflow-y-auto flex-1 min-h-0 overscroll-contain touch-pan-y"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <div className="max-w-md mx-auto">
              <div className="text-center mb-6">
                <div className="inline-flex p-3 bg-[#eef4ff] rounded-2xl border border-[#d2e3fc] text-[#004872] mb-3">
                  <Lock className="w-8 h-8 text-[#004872]" />
                </div>
                <h3 className="font-headline text-xl sm:text-2xl font-bold text-[#121c27]">
                  Authorized Access Verification
                </h3>
                <p className="text-xs sm:text-sm text-[#526070] mt-1.5 leading-relaxed">
                  Confidential intake and assessment data. Access is strictly limited to the three designated consultant emails.
                </p>
              </div>

              {/* Provided Password Banner */}
              <div className="p-3.5 mb-6 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
                <Key className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Authorized Security Passcode Provided:</div>
                  <div className="mt-1 flex items-center gap-2">
                    <code className="px-2 py-0.5 bg-white border border-amber-300 rounded font-mono font-bold text-amber-950 text-sm select-all">
                      {DEFAULT_PASSCODE}
                    </code>
                    <span className="text-[11px] text-amber-700">
                      (Use this passcode to sign in)
                    </span>
                  </div>
                </div>
              </div>

              {/* Authorized Email Selection Pills */}
              <div className="mb-5">
                <label className="block text-xs font-bold text-[#004872] uppercase tracking-wider mb-2">
                  Select or Enter Authorized Email:
                </label>
                <div className="space-y-1.5">
                  {AUTHORIZED_EMAILS.map((email) => (
                    <button
                      key={email}
                      type="button"
                      onClick={() => {
                        setEmailInput(email);
                        setPasswordInput(DEFAULT_PASSCODE);
                        setLoginError(null);
                      }}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold border transition-all text-left cursor-pointer ${
                        emailInput.toLowerCase() === email.toLowerCase()
                          ? 'bg-[#eef4ff] border-[#0074b6] text-[#004872] shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-[#41474f] hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <UserCheck className="w-3.5 h-3.5 text-[#0074b6] shrink-0" />
                        <span className="truncate">{email}</span>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-[#0074b6] shrink-0 ml-2">
                        {emailInput.toLowerCase() === email.toLowerCase() ? 'Selected' : 'Use Email'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="auth-email-field" className="block text-xs font-semibold text-[#121c27] mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      id="auth-email-field"
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => {
                        setEmailInput(e.target.value);
                        setLoginError(null);
                      }}
                      placeholder="e.g. idealspedconsultant@gmail.com"
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-300 focus:border-[#0074b6] focus:ring-2 focus:ring-[#0074b6]/20 transition-all text-[#121c27] bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="auth-password-field" className="block text-xs font-semibold text-[#121c27] mb-1">
                    Authorized Passcode
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      id="auth-password-field"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={passwordInput}
                      onChange={(e) => {
                        setPasswordInput(e.target.value);
                        setLoginError(null);
                      }}
                      placeholder="Enter security passcode"
                      className="w-full pl-9 pr-10 py-2 text-sm rounded-xl border border-slate-300 focus:border-[#0074b6] focus:ring-2 focus:ring-[#0074b6]/20 transition-all text-[#121c27] bg-white font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700"
                      aria-label={showPassword ? 'Hide passcode' : 'Show passcode'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Error Banner */}
                {loginError && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2"
                  >
                    <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>{loginError}</span>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-[#004872] hover:bg-[#003453] transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-70 mt-2"
                >
                  {isAuthenticating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Verifying Credentials...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 text-[#b3f092]" />
                      <span>Unlock Assessment Console</span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
                Ideal Special Education Consult LTD • Secured End-to-End System
              </div>
            </div>
          </div>
        ) : (
          /* ==========================================
             AUTHENTICATED ASSESSMENT CONSOLE (Step 2)
             ========================================== */
          <div className="flex flex-col flex-1 overflow-hidden min-h-0">
            {/* Top User Session Strip */}
            <div className="bg-slate-50 border-b border-slate-200 px-5 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#004872] text-white flex items-center justify-center font-bold text-xs">
                  {session.email.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="text-xs font-bold text-[#121c27] flex items-center gap-2">
                    <span>{session.email}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4caf50]" />
                    <span className="text-[11px] font-semibold text-[#0074b6]">{session.role}</span>
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Session Active • Logged in at {session.loginTime}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={loadSubmissionsData}
                  disabled={isLoadingData}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#004872] bg-white border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer shadow-2xs"
                  title="Refresh submission records"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingData ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">Refresh Data</span>
                </button>

                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-red-700 bg-red-50 border border-red-200 hover:bg-red-100 transition-colors cursor-pointer shadow-2xs"
                  title="Sign out of authorized console"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* Notification alert for status updates */}
            {statusUpdateMessage && (
              <div className="bg-[#eef4ff] text-[#004872] px-6 py-2 text-xs font-bold border-b border-[#cce0ff] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4caf50]" />
                <span>{statusUpdateMessage}</span>
              </div>
            )}

            {/* Metrics Overview Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-4 p-4 sm:px-8 bg-white border-b border-slate-200 shrink-0">
              <div className="p-3 rounded-2xl bg-[#f7f9ff] border border-[#e4effe]">
                <div className="text-[11px] font-semibold text-[#526070] uppercase">Assessments & Intakes</div>
                <div className="text-xl sm:text-2xl font-black text-[#004872]">{bookings.length}</div>
              </div>
              <div className="p-3 rounded-2xl bg-[#f7f9ff] border border-[#e4effe]">
                <div className="text-[11px] font-semibold text-[#526070] uppercase">Direct Inquiries</div>
                <div className="text-xl sm:text-2xl font-black text-[#0074b6]">{contacts.length}</div>
              </div>
              <div className="p-3 rounded-2xl bg-[#f7f9ff] border border-[#e4effe]">
                <div className="text-[11px] font-semibold text-[#526070] uppercase">Support & Donations</div>
                <div className="text-xl sm:text-2xl font-black text-[#366a1d]">{donations.length}</div>
              </div>
              <div className="p-3 rounded-2xl bg-[#eef4ff] border border-[#cce0ff]">
                <div className="text-[11px] font-semibold text-[#004872] uppercase">Email4J Dispatched</div>
                <div className="text-xl sm:text-2xl font-black text-[#004872] flex items-center gap-1.5">
                  <span>{emailLogs.length}</span>
                  <span className="text-[10px] font-bold text-[#366a1d] bg-[#f0f8ec] px-1.5 py-0.5 rounded border border-[#366a1d]/20">
                    3 Mails
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/60">
                <div className="text-[11px] font-semibold text-amber-800 uppercase">Pending Review</div>
                <div className="text-xl sm:text-2xl font-black text-amber-900">
                  {bookings.filter(b => !b.status || b.status === 'Pending Review').length}
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-slate-200 px-5 sm:px-8 bg-white gap-2 overflow-x-auto shrink-0">
              <button
                onClick={() => setActiveTab('assessments')}
                className={`py-3 px-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'assessments'
                    ? 'border-[#004872] text-[#004872]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Assessments & Intakes</span>
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-[#eef4ff] text-[#004872] font-mono">
                  {bookings.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('contacts')}
                className={`py-3 px-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'contacts'
                    ? 'border-[#004872] text-[#004872]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>Direct Inquiries</span>
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-[#eef4ff] text-[#004872] font-mono">
                  {contacts.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('donations')}
                className={`py-3 px-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'donations'
                    ? 'border-[#004872] text-[#004872]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                <span>Support & Pledges</span>
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-[#eef4ff] text-[#004872] font-mono">
                  {donations.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('emails')}
                className={`py-3 px-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'emails'
                    ? 'border-[#004872] text-[#004872] bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Mail className="w-4 h-4 text-[#0074b6]" />
                <span className="font-bold">Email Alerts & Mailbox</span>
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-[#eef4ff] text-[#004872] font-mono font-bold">
                  {emailLogs.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('programmes')}
                className={`py-3 px-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'programmes'
                    ? 'border-[#004872] text-[#004872] bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Film className="w-4 h-4 text-[#7c3aed]" />
                <span className="font-bold">Programmes &amp; Media</span>
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-purple-50 text-purple-700 font-bold border border-purple-200">
                  Live Deck
                </span>
              </button>

              <button
                onClick={() => setActiveTab('export')}
                className={`py-3 px-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'export'
                    ? 'border-[#004872] text-[#004872]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Download className="w-4 h-4" />
                <span>Export & Print</span>
              </button>
              <button
                onClick={() => setActiveTab('audit')}
                className={`py-3 px-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'audit'
                    ? 'border-[#004872] text-[#004872] bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <ClipboardCheck className="w-4 h-4 text-[#366a1d]" />
                <span className="font-bold">Assumption Audit & Specifications</span>
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-[#f0f8ec] text-[#366a1d] font-bold">
                  Internal
                </span>
              </button>
            </div>

            {/* Content Area */}
            <div 
              className="flex-1 overflow-y-auto min-h-0 overscroll-contain touch-pan-y p-3.5 sm:p-8 bg-[#f7f9ff]"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {/* TAB 1: ASSESSMENTS & INTAKES */}
              {activeTab === 'assessments' && (
                <div className="space-y-4">
                  {/* Search and Filter Toolbar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200">
                    <div className="relative flex-1 min-w-[220px]">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Search by client name, email, phone, or service..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:border-[#0074b6] focus:ring-1 focus:ring-[#0074b6] bg-slate-50 text-slate-800"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-semibold">Status:</span>
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="text-xs font-semibold px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 focus:border-[#0074b6]"
                      >
                        <option value="ALL">All Statuses</option>
                        <option value="Pending Review">Pending Review</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Archived">Archived</option>
                      </select>
                    </div>
                  </div>

                  {filteredBookings.length === 0 ? (
                    <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center">
                      <Clock className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                      <h4 className="font-headline font-bold text-slate-700">No Assessment Intakes Found</h4>
                      <p className="text-xs text-slate-500 mt-1">
                        {searchQuery ? 'Try clearing your search query.' : 'New submissions from parents and schools will appear here in real time.'}
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-3.5">
                      {filteredBookings.map((item) => (
                        <div
                          key={item.id}
                          className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow"
                        >
                          <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-mono text-xs font-bold text-[#004872] bg-[#eef4ff] px-2 py-0.5 rounded-md">
                                  {item.id}
                                </span>
                                <h4 className="font-headline font-bold text-sm sm:text-base text-[#121c27]">
                                  {item.fullName}
                                </h4>
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                                  {item.userCategory}
                                </span>
                              </div>
                              <div className="text-xs font-bold text-[#0074b6] mt-1">
                                {item.preferredService}
                              </div>
                            </div>

                            {/* Status Selector */}
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] text-slate-500 font-semibold">Status:</span>
                              <select
                                value={item.status || 'Pending Review'}
                                onChange={(e) => handleUpdateStatus('bookings', item.id!, e.target.value)}
                                className={`text-xs font-bold px-2.5 py-1 rounded-xl border transition-colors ${
                                  item.status === 'Confirmed'
                                    ? 'bg-green-50 border-green-300 text-green-800'
                                    : item.status === 'Contacted'
                                    ? 'bg-blue-50 border-blue-300 text-blue-800'
                                    : item.status === 'Archived'
                                    ? 'bg-slate-100 border-slate-300 text-slate-600'
                                    : 'bg-amber-50 border-amber-300 text-amber-800'
                                }`}
                              >
                                <option value="Pending Review">Pending Review</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Archived">Archived</option>
                              </select>
                            </div>
                          </div>

                          {/* Client Details Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-slate-600 bg-slate-50/80 p-3 rounded-xl mb-3">
                            <div>
                              <span className="text-[10px] text-slate-400 uppercase font-bold block">Contact Details</span>
                              <div className="font-semibold text-slate-800">{item.phoneNumber}</div>
                              <div className="truncate text-slate-600">{item.email}</div>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-400 uppercase font-bold block">Preferred Schedule</span>
                              <div className="font-semibold text-slate-800">{item.preferredDate || 'Flexible'}</div>
                              <div>{item.preferredTime}</div>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-400 uppercase font-bold block">Preferred Channel</span>
                              <div className="font-semibold text-slate-800">{item.preferredContactMethod}</div>
                              <div className="text-[11px] text-slate-500">Submitted: {item.timestamp ? new Date(item.timestamp).toLocaleDateString() : 'Recent'}</div>
                            </div>
                          </div>

                          {/* Additional Notes */}
                          {item.additionalMessage && (
                            <div className="text-xs text-slate-700 bg-white border border-slate-200/80 p-2.5 rounded-xl mb-3">
                              <span className="font-bold text-[#004872]">Client Notes: </span>
                              {item.additionalMessage}
                            </div>
                          )}

                          {/* Quick Action Buttons */}
                          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100">
                            <a
                              href={`tel:${item.phoneNumber}`}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold text-[#004872] bg-[#eef4ff] hover:bg-[#d8e8fe] transition-colors"
                            >
                              <Phone className="w-3.5 h-3.5" />
                              <span>Call {item.phoneNumber}</span>
                            </a>
                            <a
                              href={`https://wa.me/${item.phoneNumber.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(item.fullName)},%20this%20is%20Ideal%20Special%20Education%20Consult%20LTD%20regarding%20your%20intake%20request.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold text-[#366a1d] bg-[#f0f8ec] hover:bg-[#e0f2d8] transition-colors"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>WhatsApp</span>
                            </a>
                            <a
                              href={`mailto:${item.email}?subject=Ideal%20Special%20Education%20Consult%20-%20Intake%20Follow-up%20(${item.id})`}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                            >
                              <Mail className="w-3.5 h-3.5" />
                              <span>Email</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: CONTACTS */}
              {activeTab === 'contacts' && (
                <div className="space-y-3.5">
                  {contacts.length === 0 ? (
                    <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center">
                      <Mail className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                      <h4 className="font-headline font-bold text-slate-700">No General Inquiries</h4>
                      <p className="text-xs text-slate-500 mt-1">
                        Messages sent through the contact form will appear here.
                      </p>
                    </div>
                  ) : (
                    contacts.map((c) => (
                      <div key={c.id} className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                                {c.id}
                              </span>
                              <h4 className="font-headline font-bold text-sm text-[#121c27]">{c.name}</h4>
                              <span className="text-xs text-slate-500">({c.email})</span>
                            </div>
                            <div className="text-xs font-bold text-[#004872] mt-1">
                              Subject: {c.subject}
                            </div>
                          </div>

                          <select
                            value={c.status || 'New'}
                            onChange={(e) => handleUpdateStatus('contacts', c.id!, e.target.value)}
                            className="text-xs font-bold px-2 py-1 rounded-lg border bg-slate-50 text-slate-700"
                          >
                            <option value="New">New</option>
                            <option value="Replied">Replied</option>
                            <option value="Archived">Archived</option>
                          </select>
                        </div>

                        <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl leading-relaxed my-2">
                          {c.message}
                        </p>

                        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 text-xs">
                          {c.phone && c.phone !== 'Not provided' && (
                            <a href={`tel:${c.phone}`} className="font-bold text-[#004872] hover:underline">
                              Call: {c.phone}
                            </a>
                          )}
                          <a href={`mailto:${c.email}?subject=RE:%20${encodeURIComponent(c.subject)}`} className="text-[#0074b6] hover:underline font-semibold">
                            Reply to {c.email}
                          </a>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* TAB 3: DONATIONS */}
              {activeTab === 'donations' && (
                <div className="space-y-3.5">
                  {donations.length === 0 ? (
                    <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center">
                      <MessageCircle className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                      <h4 className="font-headline font-bold text-slate-700">No Donation Enquiries</h4>
                      <p className="text-xs text-slate-500 mt-1">
                        Sponsorship inquiries and pledge interests will appear here.
                      </p>
                    </div>
                  ) : (
                    donations.map((d) => (
                      <div key={d.id} className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-[#366a1d] bg-[#f0f8ec] px-2 py-0.5 rounded">
                                {d.id}
                              </span>
                              <h4 className="font-headline font-bold text-sm text-[#121c27]">{d.fullName}</h4>
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#eef4ff] text-[#004872]">
                                {d.donorCategory}
                              </span>
                            </div>
                            <div className="text-xs font-bold text-[#366a1d] mt-1">
                              Impact Focus: {d.impactAreaOfInterest}
                            </div>
                          </div>

                          <select
                            value={d.status || 'Enquiry Received'}
                            onChange={(e) => handleUpdateStatus('donations', d.id!, e.target.value)}
                            className="text-xs font-bold px-2 py-1 rounded-lg border bg-slate-50 text-slate-700"
                          >
                            <option value="Enquiry Received">Enquiry Received</option>
                            <option value="Followed Up">Followed Up</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </div>

                        <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl my-2">
                          <p className="font-semibold text-slate-800">{d.enquiryDetails}</p>
                          <div className="mt-2 text-[11px] text-slate-500">
                            Contact: {d.phoneNumber} • {d.email} • Preferred Follow-up: {d.preferredFollowUp}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* TAB: EMAIL4J MAILBOX & NOTIFICATIONS */}
              {activeTab === 'emails' && (
                <Email4JMailboxTab
                  emailLogs={emailLogs}
                  emailStatus={emailStatus}
                  onRefresh={loadSubmissionsData}
                  isLoading={isLoadingData}
                  userEmail={session.email}
                />
              )}

              {/* TAB: PROGRAMMES & MEDIA MANAGER (Upcoming & Previous Program Control) */}
              {activeTab === 'programmes' && (
                <ProgrammesManagerTab />
              )}

              {/* TAB 4: EXPORT & PRINT */}
              {activeTab === 'export' && (
                <div className="max-w-xl mx-auto space-y-4">
                  <div className="bg-white p-6 rounded-2xl border border-slate-200">
                    <h4 className="font-headline font-bold text-base text-[#004872] mb-1">
                      Download Secure CSV Data
                    </h4>
                    <p className="text-xs text-slate-500 mb-4">
                      Export records to spreadsheet format for offline analysis or official records archiving.
                    </p>

                    <div className="space-y-2.5">
                      <a
                        href="/api/export-csv/bookings"
                        download
                        className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-[#eef4ff] hover:border-[#0074b6] transition-all text-xs font-bold text-[#004872] cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <FileSpreadsheet className="w-4 h-4 text-[#366a1d]" />
                          <span>Export Assessment & Booking Intakes (.csv)</span>
                        </div>
                        <Download className="w-4 h-4 text-slate-400" />
                      </a>

                      <a
                        href="/api/export-csv/contacts"
                        download
                        className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-[#eef4ff] hover:border-[#0074b6] transition-all text-xs font-bold text-[#004872] cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <FileSpreadsheet className="w-4 h-4 text-[#0074b6]" />
                          <span>Export Direct Messages & Inquiries (.csv)</span>
                        </div>
                        <Download className="w-4 h-4 text-slate-400" />
                      </a>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center">
                    <Printer className="w-8 h-8 text-[#004872] mx-auto mb-2" />
                    <h4 className="font-headline font-bold text-sm text-[#121c27]">Print Intake Summary</h4>
                    <p className="text-xs text-slate-500 mb-4 mt-1">
                      Generate a formatted printable copy of current assessment requests.
                    </p>
                    <button
                      onClick={() => window.print()}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#004872] hover:bg-[#003453] transition-colors cursor-pointer inline-flex items-center gap-2"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Summary</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 5: INTERNAL ASSUMPTION AUDIT & ARCHITECTURAL SPECS */}
              {activeTab === 'audit' && (
                <div className="space-y-5 max-w-4xl mx-auto">
                  {/* Banner explaining authorization */}
                  <div className="p-4 bg-[#eef4ff] rounded-2xl border border-[#b3d8ff] flex items-start gap-3.5">
                    <div className="p-2 bg-[#004872] rounded-xl text-white shrink-0">
                      <ShieldCheck className="w-5 h-5 text-[#b3f092]" />
                    </div>
                    <div>
                      <h4 className="font-headline font-bold text-sm text-[#004872]">
                        Restricted Internal Audit & Architectural Specifications
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                        This technical and operational audit report is securely stored inside the Authorized Personnel Portal for consultant verification, regulatory tracking, and deployment sign-off.
                      </p>
                    </div>
                  </div>

                  {/* Sub-tab Pills */}
                  <div className="flex border-b border-slate-200 gap-2 overflow-x-auto pb-1">
                    {[
                      { id: 'assumptions', label: '1. Architectural Assumptions', icon: FileText },
                      { id: 'clarifications', label: '2. Clarifications Needed', icon: HelpCircle },
                      { id: 'future', label: '3. Roadmap & Upgrades', icon: Sparkles },
                      { id: 'checklist', label: '4. Pre-Launch Checklist', icon: ClipboardCheck },
                    ].map(sub => {
                      const IconComp = sub.icon;
                      const isSubActive = auditSubTab === sub.id;
                      return (
                        <button
                          key={sub.id}
                          type="button"
                          onClick={() => setAuditSubTab(sub.id as any)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                            isSubActive
                              ? 'bg-[#004872] text-white shadow-2xs'
                              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <IconComp className="w-3.5 h-3.5" />
                          <span>{sub.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Sub-tab 1: Architectural Assumptions */}
                  {auditSubTab === 'assumptions' && (
                    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                      <div className="border-b border-slate-100 pb-3">
                        <h4 className="font-headline font-bold text-base text-[#004872]">
                          Operational & Clinical Assumptions
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Assumptions applied during system engineering and content structuring for Ideal Special Education Consult LTD.
                        </p>
                      </div>
                      <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                        <div className="p-3 bg-[#f7f9ff] rounded-xl border border-[#dfe9f8]">
                          <strong className="text-[#004872] block mb-1">1. Entity Registration & Location:</strong>
                          Operating strictly under <em>"Ideal Special Education Consult LTD"</em> with permanent clinical and consultation premises situated on the Lagos State University (LASU) Ojo corridor, Lagos State.
                        </div>
                        <div className="p-3 bg-[#f7f9ff] rounded-xl border border-[#dfe9f8]">
                          <strong className="text-[#004872] block mb-1">2. Zero Fabricated Personnel:</strong>
                          In strict adherence to ethical and clinical standards, no artificial or unverified team members or partner logos were fabricated. Real clinical licenses remain confidential until verified.
                        </div>
                        <div className="p-3 bg-[#f7f9ff] rounded-xl border border-[#dfe9f8]">
                          <strong className="text-[#004872] block mb-1">3. Three-Email Authorized Security:</strong>
                          Administrative intakes, assessments, and CSV exports are strictly restricted to <code>idealspedconsultant@gmail.com</code>, <code>sakintibubo@gmail.com</code>, and <code>osamsond@gmail.com</code>.
                        </div>
                        <div className="p-3 bg-[#f7f9ff] rounded-xl border border-[#dfe9f8]">
                          <strong className="text-[#004872] block mb-1">4. Preliminary Scheduling Request Distinction:</strong>
                          Booking submissions are recorded as expressions of interest and initial intake assessments, allowing clinicians to review child profiles before issuing formal clinical dates.
                        </div>
                        <div className="p-3 bg-[#f7f9ff] rounded-xl border border-[#dfe9f8]">
                          <strong className="text-[#004872] block mb-1">5. Ethical Donation Safeguards:</strong>
                          Live credit-card collection is not faked; instead, a compliant Sponsorship Enquiry workflow records donor intent for direct consultant follow-up.
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Sub-tab 2: Clarifications Needed */}
                  {auditSubTab === 'clarifications' && (
                    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                      <div className="border-b border-slate-100 pb-3">
                        <h4 className="font-headline font-bold text-base text-[#004872]">
                          Recommended Clarifications Prior to Public Launch
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Items requiring executive sign-off from Ideal Special Education Consult management.
                        </p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                        <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/80">
                          <strong className="text-amber-950 block mb-1">CAC / Regulatory Number:</strong>
                          <p className="text-amber-900 text-xs">Verify whether the Corporate Affairs Commission (CAC) registration number should be published in public tenders and institutional proposals.</p>
                        </div>
                        <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/80">
                          <strong className="text-amber-950 block mb-1">Banking Modalities:</strong>
                          <p className="text-amber-900 text-xs">Confirm corporate commercial banking account details for verified wire donations and corporate foundation grants.</p>
                        </div>
                        <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/80">
                          <strong className="text-amber-950 block mb-1">Operating Hours & Walk-ins:</strong>
                          <p className="text-amber-900 text-xs">Clarify whether physical diagnostic assessments at the LASU Axis center accept walk-ins or require mandatory appointment booking.</p>
                        </div>
                        <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/80">
                          <strong className="text-amber-950 block mb-1">Staff Accreditation Display:</strong>
                          <p className="text-amber-900 text-xs">Once verified by HR, publish public profiles of certified special educators, SLTs, and Sign Language interpreters (NSL, BSL, ASL).</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Sub-tab 3: Technical Roadmap */}
                  {auditSubTab === 'future' && (
                    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                      <div className="border-b border-slate-100 pb-3">
                        <h4 className="font-headline font-bold text-base text-[#004872]">
                          Phase 2 & Phase 3 Technical Enhancements
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Architectural roadmap for scaling the consultation portal.
                        </p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-4 bg-[#f7f9ff] rounded-2xl border border-[#dfe9f8]">
                          <strong className="text-[#004872] block text-xs font-bold mb-1">1. Automated SMS & WhatsApp Dispatch:</strong>
                          <p className="text-xs text-slate-600">Integrate Twilio or official WhatsApp Business API to trigger instant appointment confirmations and parental reminders.</p>
                        </div>
                        <div className="p-4 bg-[#f7f9ff] rounded-2xl border border-[#dfe9f8]">
                          <strong className="text-[#366a1d] block text-xs font-bold mb-1">2. Regulated Payment Gateway:</strong>
                          <p className="text-xs text-slate-600">Connect Paystack or Flutterwave once corporate merchant accounts and AML checks are finalized.</p>
                        </div>
                        <div className="p-4 bg-[#f7f9ff] rounded-2xl border border-[#dfe9f8]">
                          <strong className="text-[#004872] block text-xs font-bold mb-1">3. Parent & School IEP Portal:</strong>
                          <p className="text-xs text-slate-600">Authenticated portal for tracking Individual Support Plans (ISPs), IEP milestones, and clinical speech therapy reports.</p>
                        </div>
                        <div className="p-4 bg-[#f7f9ff] rounded-2xl border border-[#dfe9f8]">
                          <strong className="text-[#366a1d] block text-xs font-bold mb-1">4. Sign Language (NSL, BSL, ASL) Video Library:</strong>
                          <p className="text-xs text-slate-600">Embed accessible video player modules with certified NSL, BSL, and ASL signers explaining special education rights and visual learning concepts.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Sub-tab 4: Pre-Launch Checklist */}
                  {auditSubTab === 'checklist' && (
                    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                      <div className="border-b border-slate-100 pb-3">
                        <h4 className="font-headline font-bold text-base text-[#004872]">
                          Pre-Launch Verification Checklist
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Verification criteria confirmed by the engineering team.
                        </p>
                      </div>
                      <div className="space-y-2">
                        {[
                          'Brand identity (#004872, #366a1d, #f7f9ff) strictly applied throughout.',
                          'Interactive Domain Talk dialogs with audio speech narration active for all 4 domains.',
                          'Learning Differences terminology simplified and parent-friendly.',
                          'High Contrast mode active and togglable from navbar and footer with WCAG AAA overrides.',
                          'Authorized Personnel access restricted exclusively to 3 verified email addresses.',
                          'Assumption Audit relocated securely behind Authorized Personnel login.',
                          'Assessment and booking intake CSV export operational.',
                          'Official contact information (Opposite LASU, Ojo; 08163420864) verified.'
                        ].map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2.5 p-3 bg-[#f7f9ff] rounded-xl border border-[#e4effe]"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#366a1d] shrink-0 mt-0.5" />
                            <span className="text-xs font-medium text-[#121c27]">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Console Footer */}
            <div className="bg-slate-100 border-t border-slate-200 px-5 sm:px-8 py-3 flex items-center justify-between text-[11px] text-slate-600 shrink-0">
              <span>
                Ideal Special Education Consult LTD • Confidential Assessment Database
              </span>
              <span className="font-semibold text-[#004872]">
                Session Protected
              </span>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
