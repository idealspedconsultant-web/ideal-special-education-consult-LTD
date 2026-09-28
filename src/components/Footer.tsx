import React from 'react';
import { motion } from 'motion/react';
import { 
  Heart, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Info, 
  Eye, 
  MessageCircle
} from 'lucide-react';
import { IdealLogo } from './IdealLogo';
import { ORGANISATION_INFO, SERVICES_LIST } from '../data/orgData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenAuthorizedAccess: () => void;
  onToggleHighContrast: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenAuthorizedAccess,
  onToggleHighContrast,
}) => {
  return (
    <footer className="bg-[#002842] text-white border-t border-[#004872] pt-16 pb-12 transition-colors overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info (4 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4 space-y-4"
          >
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white/95 p-3 rounded-2xl inline-block shadow-sm"
            >
              <IdealLogo variant="horizontal" size="md" />
            </motion.div>
            
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-sm">
              <strong className="text-white">Ideal Special Education Consult LTD</strong> is dedicated to 
              {' '}{ORGANISATION_INFO.tagline.toLowerCase()} through evidence-based, compassionate, and accessible special education services.
            </p>

            {/* Quick Contact Points */}
            <div className="space-y-2 text-xs text-white/90 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#b3f092] shrink-0 mt-0.5" />
                <span>{ORGANISATION_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#b3f092] shrink-0" />
                <a href={`tel:${ORGANISATION_INFO.phones[0].raw}`} className="hover:underline">
                  {ORGANISATION_INFO.phones[0].display}
                </a>
                <span>•</span>
                <a href={`tel:${ORGANISATION_INFO.phones[1].raw}`} className="hover:underline">
                  {ORGANISATION_INFO.phones[1].display}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#b3f092] shrink-0" />
                <a href={`mailto:${ORGANISATION_INFO.email}`} className="hover:underline">
                  {ORGANISATION_INFO.email}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Quick Nav (2 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="lg:col-span-2"
          >
            <h4 className="font-headline text-xs font-bold uppercase tracking-wider text-[#b3f092] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-white/80">
              {['home', 'services', 'early-intervention', 'inclusive-expertise', 'past-events', 'about', 'booking', 'donate', 'faq', 'contact'].map((id) => (
                <li key={id}>
                  <motion.button
                    type="button"
                    onClick={() => onNavigate(id)}
                    whileHover={{ x: 4, color: '#ffffff' }}
                    whileTap={{ scale: 0.96 }}
                    className="hover:underline capitalize text-left cursor-pointer transition-colors block text-sm"
                  >
                    {id === 'home' 
                      ? 'Home' 
                      : id === 'services' 
                      ? 'Our Services' 
                      : id === 'early-intervention'
                      ? 'Early Intervention'
                      : id === 'inclusive-expertise'
                      ? 'Inclusive Expertise'
                      : id === 'past-events'
                      ? 'Events & Programs'
                      : id === 'faq' 
                      ? 'FAQ' 
                      : id.replace('-', ' ')}
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 10 Services Fast Directory (4 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="lg:col-span-4"
          >
            <h4 className="font-headline text-xs font-bold uppercase tracking-wider text-[#b3f092] mb-4">
              10 Core Specialized Services
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs text-white/70">
              {SERVICES_LIST.map((svc) => (
                <motion.button
                  key={svc.id}
                  type="button"
                  onClick={() => onNavigate('services')}
                  whileHover={{ x: 3, color: '#ffffff' }}
                  whileTap={{ scale: 0.97 }}
                  className="hover:underline text-left truncate cursor-pointer transition-colors"
                  title={svc.title}
                >
                  • {svc.title}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Accessibility & Admin Quick Links (2 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="lg:col-span-2 space-y-3"
          >
            <h4 className="font-headline text-xs font-bold uppercase tracking-wider text-[#b3f092] mb-4">
              Portals & Tools
            </h4>

            <motion.button
              type="button"
              onClick={onOpenAuthorizedAccess}
              whileHover={{ scale: 1.04, x: 2 }}
              whileTap={{ scale: 0.96 }}
              className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#b3f092]" />
              <span>Authorized Access</span>
            </motion.button>

            <motion.button
              type="button"
              onClick={onToggleHighContrast}
              whileHover={{ scale: 1.04, x: 2 }}
              whileTap={{ scale: 0.96 }}
              className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-medium text-white/90 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>Contrast Switch</span>
            </motion.button>

            <motion.a
              href={`https://wa.me/${ORGANISATION_INFO.whatsappNumber.replace('+', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, x: 2 }}
              whileTap={{ scale: 0.96 }}
              className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-medium text-[#b3f092] bg-[#366a1d]/40 hover:bg-[#366a1d]/60 border border-[#366a1d] transition-colors inline-block"
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>WhatsApp Direct</span>
              </div>
            </motion.a>
          </motion.div>

        </div>

        {/* Bottom Sub-footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60"
        >
          <div>
            © {new Date().getFullYear()} Ideal Special Education Consult LTD. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span>Opposite LASU, Ojo, Lagos State, Nigeria</span>
            <span>•</span>
            <span className="text-[#b3f092]">Inclusion • Empathy • Integrity</span>
          </div>
        </motion.div>

      </div>
    </footer>
  );
};
