import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Calendar, 
  MapPin, 
  Sparkles, 
  Video, 
  Image as ImageIcon, 
  Volume2, 
  VolumeX, 
  Clock, 
  ArrowRight,
  Send,
  X,
  CheckCircle2
} from 'lucide-react';
import { EVENT_SLIDES_DATA, EventSlideItem } from '../data/eventsData';
import { getStoredEventSlides, fetchServerEventSlides } from '../services/eventsManager';

interface PastEventsSectionProps {
  onNavigate?: (page: string) => void;
}

export const PastEventsSection: React.FC<PastEventsSectionProps> = ({ onNavigate }) => {
  const [slides, setSlides] = useState<EventSlideItem[]>(getStoredEventSlides);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeVideoPlaying, setActiveVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Sync slides with server and listen for real-time updates from Authorized Access portal
  useEffect(() => {
    fetchServerEventSlides().then(loaded => {
      if (loaded && loaded.length > 0) setSlides(loaded);
    });

    const handleUpdate = (e: any) => {
      if (e.detail && Array.isArray(e.detail)) {
        setSlides(e.detail);
      } else {
        setSlides(getStoredEventSlides());
      }
    };
    window.addEventListener('ideal_events_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('ideal_events_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  // RSVP registration modal state for upcoming slides
  const [registeringEvent, setRegisteringEvent] = useState<EventSlideItem | null>(null);
  const [registrationSubmitted, setRegistrationSubmitted] = useState(false);
  const [regForm, setRegForm] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    attendeeType: 'Parent / Guardian'
  });

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const SLIDE_DURATION = 10000; // 10 seconds auto-advance as requested
  const PROGRESS_TICK = 50;

  const currentSlide: EventSlideItem = slides[currentIndex] || slides[0] || EVENT_SLIDES_DATA[0];

  const handleNext = useCallback(() => {
    setProgress(0);
    setCurrentIndex(prev => (prev + 1) % slides.length);
  }, [slides.length]);

  const handlePrev = useCallback(() => {
    setProgress(0);
    setCurrentIndex(prev => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Handle automatic 10-second scrolling
  useEffect(() => {
    if (!isPlaying || isHovered || activeVideoPlaying) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    const startTime = Date.now();
    const initialProgress = progress;

    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgressRatio = initialProgress + (elapsed / SLIDE_DURATION) * 100;

      if (currentProgressRatio >= 100) {
        setProgress(0);
        handleNext();
      } else {
        setProgress(currentProgressRatio);
      }
    }, PROGRESS_TICK);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPlaying, isHovered, activeVideoPlaying, handleNext, currentIndex]);

  // Reset video playback on slide change
  useEffect(() => {
    setActiveVideoPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [currentIndex]);

  const toggleVideoPlayback = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setActiveVideoPlaying(true);
    } else {
      videoRef.current.pause();
      setActiveVideoPlaying(false);
    }
  };

  const toggleAudio = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistrationSubmitted(true);
    setTimeout(() => {
      setRegistrationSubmitted(false);
      setRegisteringEvent(null);
      setRegForm({
        fullName: '',
        email: '',
        phoneNumber: '',
        attendeeType: 'Parent / Guardian'
      });
    }, 2500);
  };

  return (
    <section 
      id="past-events"
      aria-label="Events and Program Slideshow"
      className="py-12 sm:py-16 bg-[#071624] text-white relative overflow-hidden"
    >
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0074b6]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#366a1d]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header & 10s Timer Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-[#b3f092] uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#b3f092]" />
              <span>Events &amp; Programs</span>
            </div>
            <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Events Showcase &amp; Media Slides
            </h2>
          </div>

          {/* 10s Autoplay Indicator & Play/Pause */}
          <div className="flex items-center gap-3 self-start sm:self-auto bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-white/15">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
              <Clock className="w-3.5 h-3.5 text-[#b3f092]" />
              <span>10s Auto-Scroll:</span>
              <span className={`font-bold ${isPlaying && !isHovered && !activeVideoPlaying ? 'text-[#b3f092]' : 'text-amber-300'}`}>
                {activeVideoPlaying ? 'Paused (Video)' : isHovered ? 'Paused (Hover)' : isPlaying ? 'Active' : 'Paused'}
              </span>
            </div>

            <div className="h-3.5 w-px bg-white/20" />

            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1 rounded-lg bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
              title={isPlaying ? "Pause 10s Slideshow" : "Resume 10s Slideshow"}
              aria-label={isPlaying ? "Pause 10s Slideshow" : "Resume 10s Slideshow"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* =========================================================================
            ONLY THE SLIDE: Clean, full-width presentation of pictures & videos
            - Integrates both upcoming and past events
            - 10-Second Auto-Scroll
            - Next & Previous arrows directly on the display
            - No extra write-up columns or sections below
            ========================================================================= */}
        <div 
          className="relative w-full rounded-3xl overflow-hidden bg-black border border-white/20 shadow-2xl group select-none"
          style={{ height: 'clamp(380px, 64vh, 640px)' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === ' ') {
              e.preventDefault();
              setIsPlaying(!isPlaying);
            }
          }}
          aria-roledescription="carousel"
          aria-label="Events Slideshow"
        >
          {/* Top 10-Second Countdown Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-black/60 z-30 overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#b3f092] via-[#00a6ff] to-[#b3f092]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>

          {/* Media Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, scale: 1.01 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="w-full h-full absolute inset-0 flex items-center justify-center bg-black"
            >
              {currentSlide.type === 'video' ? (
                /* Video Slide */
                <div className="relative w-full h-full flex items-center justify-center bg-black">
                  <video
                    ref={videoRef}
                    src={currentSlide.videoUrl}
                    poster={currentSlide.poster || currentSlide.mediaUrl}
                    playsInline
                    muted={isMuted}
                    loop
                    className="w-full h-full object-cover sm:object-contain bg-black"
                    onPlay={() => setActiveVideoPlaying(true)}
                    onPause={() => setActiveVideoPlaying(false)}
                    onEnded={() => {
                      setActiveVideoPlaying(false);
                      handleNext();
                    }}
                  />

                  {/* Center Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.button
                      type="button"
                      onClick={toggleVideoPlayback}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.92 }}
                      className="pointer-events-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#004872]/85 hover:bg-[#0074b6] border-2 border-white/90 text-white flex items-center justify-center shadow-2xl backdrop-blur-xs cursor-pointer transition-all"
                      aria-label={activeVideoPlaying ? "Pause video presentation" : "Play video presentation"}
                    >
                      {activeVideoPlaying ? (
                        <Pause className="w-8 h-8 text-white" />
                      ) : (
                        <Play className="w-8 h-8 text-white fill-current ml-1" />
                      )}
                    </motion.button>
                  </div>

                  {/* Audio Mute/Unmute Toggle */}
                  <button
                    type="button"
                    onClick={toggleAudio}
                    className="absolute top-4 right-4 z-20 p-2.5 rounded-xl bg-black/70 hover:bg-black/90 backdrop-blur-md text-white border border-white/25 transition-colors cursor-pointer"
                    aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                  >
                    {isMuted ? <VolumeX className="w-5 h-5 text-slate-300" /> : <Volume2 className="w-5 h-5 text-[#b3f092]" />}
                  </button>
                </div>
              ) : (
                /* Image Slide */
                <div className="relative w-full h-full">
                  <img
                    src={currentSlide.mediaUrl}
                    alt={currentSlide.title}
                    className="w-full h-full object-cover sm:object-contain bg-slate-950"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Top Status & Slide Counter Badge */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
            <span className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md backdrop-blur-md border ${
              currentSlide.status === 'upcoming'
                ? 'bg-amber-500/90 text-slate-950 border-amber-300'
                : 'bg-[#004872]/85 text-white border-white/20'
            }`}>
              {currentSlide.status === 'upcoming' ? '★ Upcoming Event' : 'Past Event Media'}
            </span>

            <span className="bg-black/75 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/20 shadow-md">
              {currentIndex + 1} / {slides.length}
            </span>
          </div>

          {/* Minimal Floating Caption on Display */}
          <div className="absolute bottom-5 left-16 right-16 z-20 pointer-events-none flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[11px] sm:text-xs font-bold text-[#b3f092] uppercase tracking-wider mb-2 shadow-md">
              {currentSlide.type === 'video' ? <Video className="w-3.5 h-3.5" /> : <ImageIcon className="w-3.5 h-3.5" />}
              <span>{currentSlide.category}</span>
              <span className="text-white/40">•</span>
              <span className="text-white/90">{currentSlide.date}</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2.5 max-w-2xl bg-black/70 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/15">
              <h3 className="font-headline text-sm sm:text-base md:text-lg font-bold text-white drop-shadow-md truncate text-center">
                {currentSlide.title}
              </h3>

              {/* Quick RSVP button right on the slide for upcoming events */}
              {currentSlide.status === 'upcoming' && (
                <button
                  type="button"
                  onClick={() => setRegisteringEvent(currentSlide)}
                  className="pointer-events-auto px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#003453] bg-[#b3f092] hover:bg-[#c6f7ad] transition-all cursor-pointer shadow-md flex items-center gap-1 shrink-0"
                >
                  <span>Register / RSVP</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* =========================================================================
              NEXT AND PREVIOUS ARROWS DIRECTLY ON THE DISPLAY
              ========================================================================= */}
          <button
            type="button"
            id="btn-display-prev-slide"
            onClick={handlePrev}
            aria-label="Previous slide"
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/70 hover:bg-[#004872] active:scale-95 text-white flex items-center justify-center border-2 border-white/40 backdrop-blur-md shadow-xl transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#b3f092]"
          >
            <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.5]" />
          </button>

          <button
            type="button"
            id="btn-display-next-slide"
            onClick={handleNext}
            aria-label="Next slide"
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/70 hover:bg-[#004872] active:scale-95 text-white flex items-center justify-center border-2 border-white/40 backdrop-blur-md shadow-xl transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#b3f092]"
          >
            <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.5]" />
          </button>
        </div>

        {/* Quick Dots / Direct Slide Navigators */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => {
                setProgress(0);
                setCurrentIndex(idx);
              }}
              className={`transition-all rounded-full cursor-pointer ${
                currentIndex === idx 
                  ? 'w-8 h-2.5 bg-[#b3f092] shadow-sm' 
                  : 'w-2.5 h-2.5 bg-white/25 hover:bg-white/50'
              }`}
              aria-label={`Jump to slide ${idx + 1}: ${slide.title}`}
              title={`${slide.status === 'upcoming' ? '[Upcoming] ' : ''}${slide.title}`}
            />
          ))}
        </div>

      </div>

      {/* =========================================================================
          UPCOMING EVENT RSVP MODAL
          ========================================================================= */}
      <AnimatePresence>
        {registeringEvent && (
          <div 
            role="dialog"
            aria-modal="true"
            aria-labelledby="reg-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.25 }}
              className="bg-slate-900 border border-white/20 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl text-white relative"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-400/20 px-2.5 py-1 rounded-md border border-amber-300/30">
                    Upcoming Event Registration
                  </span>
                  <h3 id="reg-modal-title" className="font-headline text-lg sm:text-xl font-bold text-white mt-2 leading-snug">
                    {registeringEvent.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 mt-1.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#b3f092]" />
                      {registeringEvent.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#00a6ff]" />
                      {registeringEvent.location}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setRegisteringEvent(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {registrationSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-[#366a1d]/50 text-[#b3f092] flex items-center justify-center mx-auto border border-[#b3f092]/40">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-headline text-lg font-bold text-white">
                    Registration Confirmed!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto">
                    We have reserved your spot for this upcoming program. You will receive event access instructions and updates.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="mt-4 space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Adebayo Ogunlesi"
                      value={regForm.fullName}
                      onChange={(e) => setRegForm({ ...regForm, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#b3f092] placeholder-slate-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={regForm.email}
                        onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#b3f092] placeholder-slate-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+234 800 000 0000"
                        value={regForm.phoneNumber}
                        onChange={(e) => setRegForm({ ...regForm, phoneNumber: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#b3f092] placeholder-slate-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Registering As:
                    </label>
                    <select
                      value={regForm.attendeeType}
                      onChange={(e) => setRegForm({ ...regForm, attendeeType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-white/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#b3f092]"
                    >
                      <option value="Parent / Guardian">Parent / Guardian</option>
                      <option value="Classroom Teacher / Educator">Classroom Teacher / Educator</option>
                      <option value="School Administrator">School Administrator</option>
                      <option value="Healthcare Professional">Healthcare Professional</option>
                      <option value="Special Education Advocate">Special Education Advocate</option>
                    </select>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setRegisteringEvent(null)}
                      className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-white/10 hover:bg-white/15 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold text-[#003453] bg-[#b3f092] hover:bg-[#a6ec81] transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Confirm Reservation</span>
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
