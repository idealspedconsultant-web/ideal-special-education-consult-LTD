import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  ShieldCheck, 
  CheckCircle2, 
  CreditCard, 
  Lock, 
  Printer, 
  Check, 
  Zap, 
  MessageCircle,
  Building2,
  Smartphone,
  Copy,
  Clock,
  ArrowRight,
  Shield,
  HelpCircle,
  Mail
} from 'lucide-react';
import { ORGANISATION_INFO } from '../data/orgData';

export const DonationSection: React.FC = () => {
  // Donor Form State (Strictly Name, Phone Number, and Amount in Naira)
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [selectedAmount, setSelectedAmount] = useState<number>(10000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState(false);

  // Gateway Modal & Channel State (Paystack / Flutterwave Nigerian Format)
  const [isGatewayOpen, setIsGatewayOpen] = useState(false);
  const [activeChannel, setActiveChannel] = useState<'card' | 'transfer' | 'ussd'>('card');
  const [selectedUssdBank, setSelectedUssdBank] = useState('GTBank');
  const [isCopied, setIsCopied] = useState(false);

  // Simulated Processing States
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [authStepMessage, setAuthStepMessage] = useState('');
  const [receipt, setReceipt] = useState<any | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Card details
  const [cardNumber, setCardNumber] = useState('5399 4120 0000 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('821');

  // Preset Naira Amounts tailored for Nigerian donors
  const nairaPresets = [2000, 5000, 10000, 25000, 50000, 100000];

  const currentAmountValue = isCustom ? (parseFloat(customAmount) || 0) : selectedAmount;

  // Handle Form Submission to Open Nigerian Payment Gateway
  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!fullName.trim()) {
      setFormError('Please enter your Full Name.');
      return;
    }

    if (!phoneNumber.trim()) {
      setFormError('Please enter your Phone Number.');
      return;
    }

    if (currentAmountValue < 500) {
      setFormError('Minimum donation amount is ₦500.');
      return;
    }

    setIsGatewayOpen(true);
  };

  // Copy virtual account number
  const handleCopyAccount = () => {
    navigator.clipboard.writeText('0284918293');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Auto-fill Nigerian test card
  const handleAutofillCard = () => {
    setCardNumber('5399 4120 0000 4242');
    setCardExpiry('12/28');
    setCardCvv('821');
  };

  // Execute Simulated Nigerian Payment Gateway Authorization
  const handleCompleteTransaction = async (channelName: string) => {
    setIsAuthorizing(true);
    setFormError(null);

    try {
      if (channelName === 'card') {
        setAuthStepMessage('Connecting to Nigerian Inter-Bank Settlement System (NIBSS)...');
        await new Promise((r) => setTimeout(r, 600));
        setAuthStepMessage('Verifying 3D-Secure One-Time Password (OTP)...');
        await new Promise((r) => setTimeout(r, 700));
      } else if (channelName === 'transfer') {
        setAuthStepMessage('Listening for incoming NIP bank transfer notification...');
        await new Promise((r) => setTimeout(r, 900));
        setAuthStepMessage('Matching payment transaction reference with Wema Bank...');
        await new Promise((r) => setTimeout(r, 600));
      } else {
        setAuthStepMessage(`Dialing ${selectedUssdBank} USSD channel...`);
        await new Promise((r) => setTimeout(r, 800));
      }

      setAuthStepMessage('Payment approved! Generating institutional receipt...');

      const response = await fetch('/api/donate/dummy-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phoneNumber: phoneNumber.trim(),
          email: email.trim() || `${phoneNumber.replace(/\s+/g, '')}@donor.idealconsult.ng`,
          amount: currentAmountValue,
          currency: 'NGN',
          frequency: 'one-time',
          impactArea: 'Special Education & Learner Inclusion Support',
          cardBrand: channelName === 'card' ? 'Mastercard / Verve' : 'Bank Transfer (Wema)',
          cardLast4: '4242',
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setReceipt({
          ...data,
          channelUsed: channelName === 'card' ? 'Debit Card' : channelName === 'transfer' ? 'Bank Transfer' : 'USSD Code',
        });
        setIsGatewayOpen(false);
      } else {
        setFormError(data.error || 'Failed to complete transaction.');
      }
    } catch {
      setFormError('Network communication error. Please check your connection.');
    } finally {
      setIsAuthorizing(false);
      setAuthStepMessage('');
    }
  };

  return (
    <section 
      id="donate" 
      aria-label="Donate to Ideal Special Education Consult LTD"
      className="py-14 sm:py-20 bg-gradient-to-b from-[#eef4ff] to-[#f7f9ff] border-b border-[#dfe9f8] relative overflow-hidden"
    >
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        
        {/* Simple Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#366a1d] uppercase tracking-wider mb-2">
            <Heart className="w-3.5 h-3.5 fill-[#366a1d]" />
            <span>Support Special Needs Education</span>
          </div>
          <h2 
            className="font-headline text-2xl sm:text-3xl font-extrabold text-[#004872] tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Make a Donation
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-600">
            Instant, secure donation in Nigerian Naira (₦). Every amount directly supports special learners, assistive materials, and teacher training.
          </p>
        </motion.div>

        {/* RECEIPT VIEW ON SUCCESSFUL PAYMENT */}
        <AnimatePresence mode="wait">
          {receipt ? (
            <motion.div
              key="success-receipt"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#366a1d]/30 shadow-xl text-center"
            >
              <div className="w-14 h-14 rounded-full bg-[#b3f092] text-[#366a1d] flex items-center justify-center mx-auto mb-3 shadow-xs">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#b3f092]/40 text-[#366a1d] mb-1">
                Payment Successful (Demo)
              </span>

              <h3 className="font-headline text-xl sm:text-2xl font-black text-[#004872]">
                Official Donation Receipt
              </h3>
              <p className="text-xs text-slate-600 mt-0.5 mb-5">
                Thank you, <strong>{receipt.donorName}</strong>, for supporting inclusive education in Nigeria!
              </p>

              {/* Receipt Summary Card */}
              <div className="bg-[#f7f9ff] border border-[#dfe9f8] rounded-2xl p-4 sm:p-5 text-left text-xs space-y-2 mb-6">
                <div className="flex justify-between items-center border-b border-[#dfe9f8] pb-2">
                  <span className="text-slate-500">Receipt Reference:</span>
                  <span className="font-mono font-bold text-slate-800">{receipt.receiptNumber}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500">Donor Name:</span>
                  <strong className="text-slate-800">{receipt.donorName}</strong>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500">Phone Number:</span>
                  <span className="font-mono text-slate-800">{phoneNumber}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500">Amount Donated:</span>
                  <strong className="text-lg font-black text-[#366a1d]">
                    ₦{receipt.amount.toLocaleString()}
                  </strong>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500">Channel Used:</span>
                  <span className="font-semibold text-slate-700">{receipt.channelUsed}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-t border-[#dfe9f8] pt-2">
                  <span className="text-slate-500 flex items-center gap-1.5 text-xs">
                    <Mail className="w-3.5 h-3.5 text-[#0074b6]" />
                    <span>Executive Alert:</span>
                  </span>
                  <span className="font-semibold text-[11px] text-[#366a1d] bg-[#f0f8ec] px-2 py-0.5 rounded border border-[#366a1d]/20">
                    Dispatched to 3 Mailboxes (Email4J)
                  </span>
                </div>
                <div className="flex justify-between items-center border-t border-[#dfe9f8] pt-2 text-[11px] text-slate-500">
                  <span>Transaction ID: {receipt.transactionRef}</span>
                  <span className="text-[#0074b6] font-semibold">Nigerian Gateway Sandbox</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-center gap-2.5">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#004872] hover:bg-[#003453] cursor-pointer inline-flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" /> Print Receipt
                </button>
                <a
                  href={`https://wa.me/${ORGANISATION_INFO.whatsappNumber.replace('+', '')}?text=Hello%20Ideal%20Special%20Education%20Consult,%20I%20have%20completed%20a%20donation%20of%20NGN%20${receipt.amount.toLocaleString()}%20(Receipt:%20${receipt.receiptNumber}).`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#366a1d] hover:bg-[#2d5818] cursor-pointer inline-flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> Notify on WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setReceipt(null);
                    setFullName('');
                    setPhoneNumber('');
                    setEmail('');
                    setCustomAmount('');
                  }}
                  className="w-full text-center text-xs text-[#004872] font-semibold hover:underline cursor-pointer pt-2"
                >
                  Make Another Donation
                </button>
              </div>
            </motion.div>
          ) : (

            /* MAIN CLEAN DONATION FORM (NAME, PHONE, AMOUNT ONLY IN NAIRA) */
            <motion.form
              key="donation-form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              onSubmit={handleProceedToPayment}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#c1c7d0] shadow-sm space-y-5"
            >
              {/* 1. Full Name */}
              <div>
                <label className="block text-xs font-bold text-[#004872] uppercase tracking-wider mb-1.5">
                  Full Name <span className="text-[#ba1a1a]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Babatunde Adeleke"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 bg-[#f7f9ff] border border-[#c1c7d0] rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:border-[#004872] focus:ring-1 focus:ring-[#004872] transition-colors"
                />
              </div>

              {/* 2. Phone Number */}
              <div>
                <label className="block text-xs font-bold text-[#004872] uppercase tracking-wider mb-1.5">
                  Phone Number <span className="text-[#ba1a1a]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0816 342 0864"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-3 bg-[#f7f9ff] border border-[#c1c7d0] rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:border-[#004872] focus:ring-1 focus:ring-[#004872] transition-colors"
                />
              </div>

              {/* 3. Donation Amount in Naira */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold text-[#004872] uppercase tracking-wider">
                    Donation Amount (₦) <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <span className="text-[11px] font-bold text-[#366a1d]">Nigerian Naira only</span>
                </div>

                {/* Preset Chips */}
                <div className="grid grid-cols-3 gap-2 mb-2.5">
                  {nairaPresets.map((val) => {
                    const isSelected = !isCustom && selectedAmount === val;
                    return (
                      <button
                        key={val}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(val);
                          setIsCustom(false);
                          setCustomAmount('');
                        }}
                        className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer border text-center ${
                          isSelected
                            ? 'bg-[#366a1d] text-white border-[#366a1d] shadow-xs ring-2 ring-[#366a1d]/20'
                            : 'bg-[#f7f9ff] border-[#c1c7d0] text-[#004872] hover:border-[#004872]'
                        }`}
                      >
                        ₦{val.toLocaleString()}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Amount Toggle or Input */}
                {!isCustom ? (
                  <button
                    type="button"
                    onClick={() => setIsCustom(true)}
                    className="text-xs text-[#004872] font-semibold hover:underline cursor-pointer flex items-center gap-1"
                  >
                    + Enter a custom amount in ₦
                  </button>
                ) : (
                  <div className="relative mt-2">
                    <span className="absolute left-3.5 top-3 text-slate-600 font-extrabold text-sm">
                      ₦
                    </span>
                    <input
                      type="number"
                      min="500"
                      step="500"
                      placeholder="Enter custom amount in Naira"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full pl-8 pr-4 py-2.5 bg-white border border-[#004872] rounded-xl text-base font-bold text-slate-900 focus:ring-2 focus:ring-[#004872]"
                      autoFocus
                    />
                  </div>
                )}
              </div>

              {formError && (
                <div className="p-3 bg-[#ffdad6] text-[#93000a] text-xs rounded-xl">
                  {formError}
                </div>
              )}

              {/* Submit Button */}
              <motion.button
                id="btn-donate-naira-now"
                type="submit"
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                className="w-full py-4 rounded-2xl font-black text-base text-white bg-[#366a1d] hover:bg-[#2d5818] shadow-md cursor-pointer flex items-center justify-center gap-2 transition-all"
              >
                <Lock className="w-4 h-4" />
                <span>Donate ₦{currentAmountValue.toLocaleString()}</span>
              </motion.button>

              {/* Trust Badge (Nigerian format) */}
              <div className="pt-1 flex items-center justify-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-[#366a1d]" />
                <span>Secured by Nigerian Payment Gateway • Card, Transfer & USSD</span>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* NIGERIAN PAYMENT GATEWAY MODAL (PAYSTACK / FLUTTERWAVE FORMAT) */}
        <AnimatePresence>
          {isGatewayOpen && (
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs"
            >
              <motion.div
                initial={{ scale: 0.94, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.94, y: 15 }}
                className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
              >
                {/* Gateway Header (Paystack / Flutterwave signature design) */}
                <div className="bg-[#004872] text-white p-4 sm:p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shadow-xs shrink-0">
                      <img
                        src="/logo-ideal.png"
                        alt="Ideal Special Education Consult LTD"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h4 className="font-headline font-bold text-sm sm:text-base leading-tight">
                        {ORGANISATION_INFO.name}
                      </h4>
                      <span className="text-[11px] text-white/80 block">
                        {ORGANISATION_INFO.email}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-white/70 block uppercase">Total to Pay</span>
                    <strong className="text-base sm:text-lg font-black text-[#b3f092]">
                      ₦{currentAmountValue.toLocaleString()}
                    </strong>
                  </div>
                </div>

                {/* Gateway Body: Left Channel Navigation + Right Form Panel */}
                <div className="flex flex-col sm:flex-row flex-1 overflow-y-auto">
                  
                  {/* Channels Sidebar */}
                  <div className="w-full sm:w-44 bg-[#f7f9ff] border-b sm:border-b-0 sm:border-r border-[#dfe9f8] p-2 flex sm:flex-col gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => setActiveChannel('card')}
                      className={`flex-1 sm:flex-initial flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold text-left cursor-pointer transition-all ${
                        activeChannel === 'card'
                          ? 'bg-[#004872] text-white shadow-2xs'
                          : 'text-slate-600 hover:bg-slate-200/60'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 shrink-0" />
                      <span>Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveChannel('transfer')}
                      className={`flex-1 sm:flex-initial flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold text-left cursor-pointer transition-all ${
                        activeChannel === 'transfer'
                          ? 'bg-[#004872] text-white shadow-2xs'
                          : 'text-slate-600 hover:bg-slate-200/60'
                      }`}
                    >
                      <Building2 className="w-4 h-4 shrink-0" />
                      <span>Transfer</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveChannel('ussd')}
                      className={`flex-1 sm:flex-initial flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold text-left cursor-pointer transition-all ${
                        activeChannel === 'ussd'
                          ? 'bg-[#004872] text-white shadow-2xs'
                          : 'text-slate-600 hover:bg-slate-200/60'
                      }`}
                    >
                      <Smartphone className="w-4 h-4 shrink-0" />
                      <span>USSD</span>
                    </button>
                  </div>

                  {/* Channel Content Panel */}
                  <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
                    
                    {/* CHANNEL 1: CARD */}
                    {activeChannel === 'card' && (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-slate-800">
                            Enter Card Details
                          </span>
                          <button
                            type="button"
                            onClick={handleAutofillCard}
                            className="text-[11px] text-[#0074b6] font-semibold hover:underline cursor-pointer"
                          >
                            Use Test Nigerian Card
                          </button>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                            Card Number
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono text-xs sm:text-sm text-slate-800 focus:bg-white"
                            />
                            <span className="absolute right-2.5 top-2.5 text-[10px] font-bold bg-slate-200 px-1.5 py-0.5 rounded text-slate-700">
                              VERVE / MC
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                              Valid Till
                            </label>
                            <input
                              type="text"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono text-center text-xs text-slate-800"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                              CVV
                            </label>
                            <input
                              type="password"
                              maxLength={4}
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono text-center text-xs text-slate-800"
                            />
                          </div>
                        </div>

                        <p className="text-[11px] text-slate-400">
                          Nigerian debit cards (Mastercard, Visa, and Verve) supported in demo mode.
                        </p>
                      </div>
                    )}

                    {/* CHANNEL 2: BANK TRANSFER (PAYSTACK STYLE VIRTUAL ACCOUNT) */}
                    {activeChannel === 'transfer' && (
                      <div className="space-y-3 text-xs">
                        <div className="bg-[#f7f9ff] border border-[#dfe9f8] rounded-2xl p-4 text-center space-y-2">
                          <span className="text-[11px] text-slate-500 block">
                            Transfer exactly <strong>₦{currentAmountValue.toLocaleString()}</strong> to:
                          </span>

                          <div className="py-1">
                            <span className="text-[11px] font-bold text-slate-600 block">Bank Name</span>
                            <strong className="text-sm text-[#004872]">Wema Bank (Paystack Demo)</strong>
                          </div>

                          <div className="py-1">
                            <span className="text-[11px] font-bold text-slate-600 block">Account Number</span>
                            <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-300 shadow-2xs">
                              <span className="font-mono font-black text-base text-slate-900 tracking-wider">
                                0284918293
                              </span>
                              <button
                                type="button"
                                onClick={handleCopyAccount}
                                className="text-[#0074b6] hover:text-[#004872] cursor-pointer"
                                title="Copy Account Number"
                              >
                                {isCopied ? <Check className="w-4 h-4 text-[#366a1d]" /> : <Copy className="w-4 h-4" />}
                              </button>
                            </div>
                            {isCopied && (
                              <span className="block text-[10px] text-[#366a1d] font-bold mt-1">Copied to clipboard!</span>
                            )}
                          </div>

                          <div className="py-1 text-[11px] text-slate-600">
                            <span>Beneficiary: </span>
                            <strong>Ideal Special Education Consult LTD</strong>
                          </div>
                        </div>

                        <div className="flex items-center justify-center gap-1.5 text-[11px] text-amber-700 bg-amber-50 p-2 rounded-xl">
                          <Clock className="w-3.5 h-3.5 shrink-0" />
                          <span>Expires in 30:00 minutes. Click below after test transfer.</span>
                        </div>
                      </div>
                    )}

                    {/* CHANNEL 3: USSD */}
                    {activeChannel === 'ussd' && (
                      <div className="space-y-3 text-xs">
                        <label className="block text-xs font-bold text-slate-700">
                          Choose Your Bank
                        </label>
                        <select
                          value={selectedUssdBank}
                          onChange={(e) => setSelectedUssdBank(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800"
                        >
                          <option value="GTBank">GTBank (*737#)</option>
                          <option value="Zenith Bank">Zenith Bank (*966#)</option>
                          <option value="Access Bank">Access Bank (*901#)</option>
                          <option value="UBA">United Bank for Africa (*919#)</option>
                          <option value="First Bank">First Bank (*894#)</option>
                          <option value="Fidelity Bank">Fidelity Bank (*770#)</option>
                        </select>

                        <div className="bg-[#f7f9ff] border border-[#dfe9f8] rounded-2xl p-3 text-center space-y-1">
                          <span className="text-[11px] text-slate-500 block">Dial this code on your mobile phone:</span>
                          <span className="font-mono text-base font-black text-[#004872]">
                            *737*000*4928#
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Processing State Indicator */}
                    {isAuthorizing && (
                      <div className="my-3 p-2.5 bg-[#e3f2fd] text-[#0074b6] text-xs rounded-xl flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-[#0074b6] border-t-transparent rounded-full animate-spin shrink-0" />
                        <span>{authStepMessage}</span>
                      </div>
                    )}

                    {/* Action Button */}
                    <div className="pt-4 space-y-2">
                      <button
                        type="button"
                        disabled={isAuthorizing}
                        onClick={() => handleCompleteTransaction(activeChannel)}
                        className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-[#366a1d] hover:bg-[#2d5818] shadow-md cursor-pointer disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                      >
                        {isAuthorizing ? (
                          <span>Verifying Payment...</span>
                        ) : activeChannel === 'transfer' ? (
                          <span>I have sent the ₦{currentAmountValue.toLocaleString()}</span>
                        ) : activeChannel === 'ussd' ? (
                          <span>I have dialed the USSD code</span>
                        ) : (
                          <span>Pay ₦{currentAmountValue.toLocaleString()}</span>
                        )}
                      </button>

                      <button
                        type="button"
                        disabled={isAuthorizing}
                        onClick={() => setIsGatewayOpen(false)}
                        className="w-full text-center text-xs text-slate-500 hover:text-black py-1 cursor-pointer"
                      >
                        Cancel Transaction
                      </button>
                    </div>

                  </div>
                </div>

                {/* Footer Security Badge */}
                <div className="bg-slate-50 border-t border-slate-200 px-4 py-2 flex items-center justify-between text-[10px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#366a1d]" />
                    Demo Nigerian Gateway Simulator (PCI-DSS)
                  </span>
                  <span>Lagos, Nigeria</span>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
