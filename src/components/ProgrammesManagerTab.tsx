import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Plus, 
  Trash2, 
  Edit3, 
  ArrowUp, 
  ArrowDown, 
  Upload, 
  Image as ImageIcon, 
  Video, 
  Calendar, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  RotateCcw, 
  Eye, 
  X, 
  AlertCircle,
  Link as LinkIcon
} from 'lucide-react';
import { EventSlideItem } from '../data/eventsData';
import { 
  getStoredEventSlides, 
  syncEventSlidesToServer, 
  resetToDefaultEventSlides,
  fetchServerEventSlides 
} from '../services/eventsManager';

export const ProgrammesManagerTab: React.FC = () => {
  const [slides, setSlides] = useState<EventSlideItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  const [editingSlide, setEditingSlide] = useState<EventSlideItem | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [previewMediaUrl, setPreviewMediaUrl] = useState<string>('');
  const [uploadError, setUploadError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load slides on mount
  useEffect(() => {
    const initial = getStoredEventSlides();
    setSlides(initial);
    fetchServerEventSlides().then(serverSlides => {
      if (serverSlides && serverSlides.length > 0) {
        setSlides(serverSlides);
      }
    });
  }, []);

  const showFeedback = (msg: string) => {
    setSaveMessage(msg);
    setTimeout(() => setSaveMessage(null), 3500);
  };

  const handleSaveSlides = async (updated: EventSlideItem[], msg = 'Changes saved to live slideshow.') => {
    setSlides(updated);
    await syncEventSlidesToServer(updated);
    showFeedback(msg);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= slides.length) return;
    const updated = [...slides];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    handleSaveSlides(updated, 'Slideshow order updated.');
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('Are you sure you want to remove this programme slide from the slideshow?')) return;
    const updated = slides.filter(s => s.id !== id);
    handleSaveSlides(updated, 'Programme slide removed.');
  };

  const handleResetDefaults = () => {
    if (!window.confirm('Reset all programme slides to original default entries?')) return;
    const def = resetToDefaultEventSlides();
    setSlides(def);
    showFeedback('Reset to default programmes.');
  };

  // Open editor for existing slide
  const startEdit = (slide: EventSlideItem) => {
    setIsCreatingNew(false);
    setEditingSlide({ ...slide });
    setPreviewMediaUrl(slide.mediaUrl || slide.poster || '');
    setUploadError(null);
  };

  // Open editor for new slide
  const startCreate = () => {
    const newSlide: EventSlideItem = {
      id: `prog-${Date.now()}`,
      type: 'image',
      status: 'upcoming',
      title: 'Upcoming: New Special Education Workshop',
      category: 'Educator Training',
      date: 'Saturday, November 28, 2026',
      time: '10:00 AM – 2:00 PM WAT',
      location: 'LASU Education Corridor, Ojo, Lagos',
      mediaUrl: '/events/past_event_summit_1790589441170.jpg',
      registrationOpen: true
    };
    setIsCreatingNew(true);
    setEditingSlide(newSlide);
    setPreviewMediaUrl(newSlide.mediaUrl);
    setUploadError(null);
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit: 12MB
    if (file.size > 12 * 1024 * 1024) {
      setUploadError('File size exceeds 12MB limit. Please upload a smaller photo or compressed video clip.');
      return;
    }

    setUploadError(null);
    const isVideoFile = file.type.startsWith('video/');

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setPreviewMediaUrl(result);
      if (editingSlide) {
        setEditingSlide({
          ...editingSlide,
          type: isVideoFile ? 'video' : 'image',
          mediaUrl: result,
          videoUrl: isVideoFile ? result : editingSlide.videoUrl,
          poster: isVideoFile ? (editingSlide.poster || '/events/past_event_summit_1790589441170.jpg') : result
        });
      }
    };
    reader.onerror = () => {
      setUploadError('Failed to read media file.');
    };
    reader.readAsDataURL(file);
  };

  const handleSaveEditor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSlide) return;

    if (!editingSlide.title.trim()) {
      setUploadError('Title is required.');
      return;
    }

    let updated: EventSlideItem[];
    if (isCreatingNew) {
      updated = [editingSlide, ...slides];
    } else {
      updated = slides.map(s => s.id === editingSlide.id ? editingSlide : s);
    }

    handleSaveSlides(updated, isCreatingNew ? 'New programme slide added!' : 'Programme write-up & upload saved!');
    setEditingSlide(null);
  };

  const filteredSlides = slides.filter(slide => {
    if (filter === 'upcoming') return slide.status === 'upcoming';
    if (filter === 'past') return slide.status === 'past';
    return true;
  });

  const upcomingCount = slides.filter(s => s.status === 'upcoming').length;
  const pastCount = slides.filter(s => s.status === 'past').length;

  return (
    <div className="flex flex-col flex-1 p-4 sm:p-6 lg:p-8 bg-slate-50 min-h-0 overflow-y-auto">
      
      {/* Top Banner & Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-headline text-lg sm:text-xl font-bold text-[#004872]">
              Programme Slides &amp; Media Control
            </h3>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#eef4ff] text-[#004872] px-2 py-0.5 rounded-full border border-[#004872]/20">
              Live Website Sync
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage media uploads, titles, dates, venues, and status for both upcoming and previous programmes.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={startCreate}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#004872] hover:bg-[#003453] transition-colors cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Programme Slide</span>
          </button>

          <button
            type="button"
            onClick={handleResetDefaults}
            className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Reset to default slides"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>
        </div>
      </div>

      {/* Live feedback toast */}
      {saveMessage && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 rounded-xl bg-[#eef8eb] border border-[#a2e091] text-[#2e6d1c] text-xs sm:text-sm font-bold flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4 text-[#366a1d] shrink-0" />
          <span>{saveMessage}</span>
        </motion.div>
      )}

      {/* Metrics & Filter Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-[#004872] text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Slides ({slides.length})
          </button>

          <button
            type="button"
            onClick={() => setFilter('upcoming')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              filter === 'upcoming'
                ? 'bg-amber-500 text-slate-950 font-extrabold shadow-2xs'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Upcoming Programmes ({upcomingCount})
          </button>

          <button
            type="button"
            onClick={() => setFilter('past')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              filter === 'past'
                ? 'bg-[#366a1d] text-white shadow-2xs'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#366a1d]" />
            Previous Programmes ({pastCount})
          </button>
        </div>

        <div className="text-[11px] text-slate-500 font-medium hidden md:block">
          Slides rotate automatically every 10 seconds on the website display
        </div>
      </div>

      {/* Slides Cards List */}
      <div className="space-y-3">
        {filteredSlides.map((slide, index) => {
          const originalIndex = slides.findIndex(s => s.id === slide.id);
          const isUpcoming = slide.status === 'upcoming';

          return (
            <motion.div
              key={slide.id}
              layout
              className={`p-4 rounded-2xl bg-white border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs ${
                isUpcoming ? 'border-amber-200 hover:border-amber-300' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Left Side: Thumbnail Preview + Badge + Info */}
              <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
                {/* Reorder Buttons */}
                <div className="flex flex-col gap-1 text-slate-400 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleMove(originalIndex, 'up')}
                    disabled={originalIndex === 0}
                    className="p-1 rounded hover:bg-slate-100 hover:text-slate-800 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                    title="Move slide earlier in slideshow"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMove(originalIndex, 'down')}
                    disabled={originalIndex === slides.length - 1}
                    className="p-1 rounded hover:bg-slate-100 hover:text-slate-800 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                    title="Move slide later in slideshow"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Media Thumbnail */}
                <div className="relative w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-slate-200 flex items-center justify-center">
                  {slide.type === 'video' ? (
                    <video
                      src={slide.videoUrl}
                      poster={slide.poster || slide.mediaUrl}
                      className="w-full h-full object-cover"
                      muted
                    />
                  ) : (
                    <img
                      src={slide.mediaUrl}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute top-1 left-1 bg-black/70 rounded p-0.5 text-white">
                    {slide.type === 'video' ? <Video className="w-3 h-3 text-[#00a6ff]" /> : <ImageIcon className="w-3 h-3 text-[#b3f092]" />}
                  </div>
                </div>

                {/* Write-Up Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      isUpcoming ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {isUpcoming ? '★ Upcoming Programme' : 'Previous Programme'}
                    </span>
                    <span className="text-[10px] font-semibold text-[#004872] bg-[#eef4ff] px-2 py-0.5 rounded">
                      {slide.category}
                    </span>
                    {isUpcoming && slide.registrationOpen && (
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                        RSVP Open
                      </span>
                    )}
                  </div>

                  <h4 className="font-headline text-sm sm:text-base font-bold text-[#121c27] truncate">
                    {slide.title}
                  </h4>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {slide.date}
                    </span>
                    <span className="flex items-center gap-1 truncate max-w-[200px] sm:max-w-xs">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {slide.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side: Edit & Delete buttons */}
              <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                <button
                  type="button"
                  onClick={() => startEdit(slide)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-[#004872] bg-[#eef4ff] hover:bg-[#d8e7ff] transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Write-up &amp; Upload</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(slide.id)}
                  className="p-1.5 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  title="Remove slide"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* =========================================================================
          SLIDE EDITOR MODAL: Edit Uploads & Write-Ups
          ========================================================================= */}
      <AnimatePresence>
        {editingSlide && (
          <div 
            role="dialog"
            aria-modal="true"
            aria-labelledby="editor-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl border border-slate-200 max-h-[92vh] overflow-y-auto flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-4 pb-3.5 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold text-[#366a1d] uppercase tracking-wider block">
                      Programmes Manager
                    </span>
                    <h3 id="editor-title" className="font-headline text-lg sm:text-xl font-bold text-[#004872]">
                      {isCreatingNew ? 'Add New Programme Slide' : 'Edit Programme Write-Up & Upload'}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => setEditingSlide(null)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {uploadError && (
                  <div className="my-3 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{uploadError}</span>
                  </div>
                )}

                <form onSubmit={handleSaveEditor} className="mt-4 space-y-4">
                  
                  {/* Status Toggle: Upcoming vs Previous */}
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                    <label className="block text-xs font-bold text-[#004872] uppercase tracking-wider mb-2">
                      Programme Timeline Status:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingSlide({ ...editingSlide, status: 'upcoming' })}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          editingSlide.status === 'upcoming'
                            ? 'bg-amber-500 text-slate-950 shadow-xs'
                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Upcoming Programme</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setEditingSlide({ ...editingSlide, status: 'past' })}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          editingSlide.status === 'past'
                            ? 'bg-[#004872] text-white shadow-xs'
                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Previous Programme</span>
                      </button>
                    </div>
                  </div>

                  {/* Media Upload & Preview Control */}
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold text-[#004872] uppercase tracking-wider">
                        Slide Media (Picture / Video Upload):
                      </label>
                      <div className="flex items-center gap-1 text-xs">
                        <button
                          type="button"
                          onClick={() => setEditingSlide({ ...editingSlide, type: 'image' })}
                          className={`px-2.5 py-0.5 rounded-lg font-bold text-[11px] ${
                            editingSlide.type === 'image' ? 'bg-[#004872] text-white' : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          Photo
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingSlide({ ...editingSlide, type: 'video' })}
                          className={`px-2.5 py-0.5 rounded-lg font-bold text-[11px] ${
                            editingSlide.type === 'video' ? 'bg-[#004872] text-white' : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          Video
                        </button>
                      </div>
                    </div>

                    {/* Preview Box */}
                    <div className="relative h-44 rounded-xl overflow-hidden bg-black border border-slate-300 flex items-center justify-center mb-3">
                      {editingSlide.type === 'video' ? (
                        <video
                          src={editingSlide.videoUrl || previewMediaUrl}
                          poster={editingSlide.poster || previewMediaUrl}
                          controls
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <img
                          src={previewMediaUrl || editingSlide.mediaUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    {/* Upload File button & URL input */}
                    <div className="flex flex-col sm:flex-row items-center gap-2">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />

                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full sm:w-auto py-2 px-3.5 rounded-xl text-xs font-bold text-white bg-[#004872] hover:bg-[#003453] transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-2xs shrink-0"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload File from Device</span>
                      </button>

                      <div className="relative w-full">
                        <LinkIcon className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          placeholder="Or enter image/video URL"
                          value={editingSlide.mediaUrl}
                          onChange={(e) => {
                            setEditingSlide({ 
                              ...editingSlide, 
                              mediaUrl: e.target.value,
                              videoUrl: editingSlide.type === 'video' ? e.target.value : editingSlide.videoUrl
                            });
                            setPreviewMediaUrl(e.target.value);
                          }}
                          className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white border border-slate-300 text-xs focus:ring-2 focus:ring-[#004872] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Write-Up: Title */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Programme Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lagos Inclusive Classroom & Differentiated Instruction Workshop"
                      value={editingSlide.title}
                      onChange={(e) => setEditingSlide({ ...editingSlide, title: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm focus:ring-2 focus:ring-[#004872] focus:outline-none font-medium text-slate-900"
                    />
                  </div>

                  {/* Category & Date in 2 cols */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Category Tag
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Educator Training, Early Intervention Clinic"
                        value={editingSlide.category}
                        onChange={(e) => setEditingSlide({ ...editingSlide, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs focus:ring-2 focus:ring-[#004872] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Date
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Saturday, October 24, 2026"
                        value={editingSlide.date}
                        onChange={(e) => setEditingSlide({ ...editingSlide, date: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs focus:ring-2 focus:ring-[#004872] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Location & Time in 2 cols */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Location / Venue
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. LASU Education Corridor Auditorium, Ojo, Lagos"
                        value={editingSlide.location}
                        onChange={(e) => setEditingSlide({ ...editingSlide, location: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs focus:ring-2 focus:ring-[#004872] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Timing (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 10:00 AM – 2:00 PM WAT"
                        value={editingSlide.time || ''}
                        onChange={(e) => setEditingSlide({ ...editingSlide, time: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs focus:ring-2 focus:ring-[#004872] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Registration checkbox for upcoming events */}
                  {editingSlide.status === 'upcoming' && (
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        id="reg-check"
                        type="checkbox"
                        checked={Boolean(editingSlide.registrationOpen)}
                        onChange={(e) => setEditingSlide({ ...editingSlide, registrationOpen: e.target.checked })}
                        className="w-4 h-4 rounded text-[#004872] focus:ring-[#004872]"
                      />
                      <label htmlFor="reg-check" className="text-xs font-bold text-slate-700 cursor-pointer">
                        Enable "Register / RSVP" button on this slide
                      </label>
                    </div>
                  )}

                  {/* Submit / Cancel Footer */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setEditingSlide(null)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#004872] hover:bg-[#003453] transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{isCreatingNew ? 'Publish New Slide' : 'Save Changes'}</span>
                    </button>
                  </div>

                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
