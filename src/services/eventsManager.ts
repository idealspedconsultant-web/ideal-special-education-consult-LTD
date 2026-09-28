import { EVENT_SLIDES_DATA, EventSlideItem } from '../data/eventsData';

const STORAGE_KEY = 'ideal_event_slides_v2';
const UPDATE_EVENT_NAME = 'ideal_events_updated';

export const getStoredEventSlides = (): EventSlideItem[] => {
  if (typeof window === 'undefined') return EVENT_SLIDES_DATA;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Error reading event slides from localStorage:', err);
  }
  return EVENT_SLIDES_DATA;
};

export const saveStoredEventSlides = (slides: EventSlideItem[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(slides));
    window.dispatchEvent(new CustomEvent(UPDATE_EVENT_NAME, { detail: slides }));
  } catch (err) {
    console.error('Error saving event slides to localStorage:', err);
  }
};

export const fetchServerEventSlides = async (): Promise<EventSlideItem[]> => {
  try {
    const res = await fetch('/api/events');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.events) && data.events.length > 0) {
        saveStoredEventSlides(data.events);
        return data.events;
      }
    }
  } catch (err) {
    console.warn('Error fetching server events:', err);
  }
  return getStoredEventSlides();
};

export const syncEventSlidesToServer = async (slides: EventSlideItem[]): Promise<boolean> => {
  saveStoredEventSlides(slides);
  try {
    const res = await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ events: slides })
    });
    return res.ok;
  } catch (err) {
    console.warn('Failed to sync event slides to server:', err);
    return false;
  }
};

export const resetToDefaultEventSlides = (): EventSlideItem[] => {
  saveStoredEventSlides(EVENT_SLIDES_DATA);
  return EVENT_SLIDES_DATA;
};
