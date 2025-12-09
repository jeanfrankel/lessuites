'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { siteConfig } from '@/data/content';
import { Phone, Mail, MapPin, Clock, KeyRound, Info, Train } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Import dynamique pour Map
const Map = dynamic(() => import('@/components/Map'), {
  loading: () => <div className="h-full min-h-[600px] bg-cygne-cream/50 animate-pulse rounded-lg" />,
  ssr: false
});

export default function InfosPage() {
  const { t } = useLanguage();

  return (
    <div className="bg-cygne-cream min-h-screen">
       <div className="pt-40 pb-12 px-6 text-center">
            <h1 className="text-5xl font-serif mb-4 text-cygne-brown">{t('info.title')}</h1>
            <p className="text-cygne-brown uppercase tracking-[0.2em] text-xs font-bold opacity-70">
                {t('info.subtitle')}
            </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Section Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-serif text-cygne-brown mb-8 text-center">{t('info.contactTitle')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Téléphone fixe */}
            <a href={`tel:${siteConfig.contact.phone}`} className="flex flex-col items-center gap-3 p-6 bg-white rounded-sm shadow-sm border border-stone-100 hover:border-cygne-gold hover:shadow-md transition">
              <Phone className="text-cygne-gold" size={24} />
              <div className="text-center">
                <span className="block text-xs uppercase tracking-wider text-cygne-brown/50 mb-2">{t('info.phone')}</span>
                <p className="text-cygne-brown font-medium text-sm">{siteConfig.contact.phone}</p>
              </div>
            </a>

            {/* Mobile */}
            <a href={`tel:${siteConfig.contact.mobile}`} className="flex flex-col items-center gap-3 p-6 bg-white rounded-sm shadow-sm border border-stone-100 hover:border-cygne-gold hover:shadow-md transition">
              <Phone className="text-cygne-gold" size={24} />
              <div className="text-center">
                <span className="block text-xs uppercase tracking-wider text-cygne-brown/50 mb-2">{t('info.mobile')}</span>
                <p className="text-cygne-brown font-medium text-sm">{siteConfig.contact.mobile}</p>
              </div>
            </a>

            {/* Email clients */}
            <a href={`mailto:${siteConfig.contact.emailClient}`} className="flex flex-col items-center gap-3 p-6 bg-white rounded-sm shadow-sm border border-stone-100 hover:border-cygne-gold hover:shadow-md transition">
              <Mail className="text-cygne-gold" size={24} />
              <div className="text-center">
                <span className="block text-xs uppercase tracking-wider text-cygne-brown/50 mb-2">{t('info.clientRelations')}</span>
                <p className="text-cygne-brown font-medium text-sm break-all">{siteConfig.contact.emailClient}</p>
              </div>
            </a>

            {/* Email admin */}
            <a href={`mailto:${siteConfig.contact.emailAdmin}`} className="flex flex-col items-center gap-3 p-6 bg-white rounded-sm shadow-sm border border-stone-100 hover:border-cygne-gold hover:shadow-md transition">
              <Mail className="text-cygne-gold" size={24} />
              <div className="text-center">
                <span className="block text-xs uppercase tracking-wider text-cygne-brown/50 mb-2">{t('info.administration')}</span>
                <p className="text-cygne-brown font-medium text-sm break-all">{siteConfig.contact.emailAdmin}</p>
              </div>
            </a>
          </div>
        </motion.div>

        {/* Section Accès et Informations pratiques */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Colonne gauche : Informations pratiques */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Adresse et Accès */}
            <div className="bg-white p-8 rounded-sm shadow-sm border border-stone-100">
              <div className="flex items-start gap-4 mb-6">
                <MapPin className="text-cygne-gold shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="text-xl font-serif text-cygne-brown mb-3">{t('info.addressTitle')}</h3>
                  <p className="text-cygne-brown font-medium mb-3">{siteConfig.contact.address}</p>
                  <div className="space-y-2 text-sm text-cygne-brown/70 leading-relaxed">
                    <p>• {t('info.addressNote1')} <strong className="text-cygne-brown">{t('info.addressNote1Bold')}</strong> {t('info.addressNote1End')}</p>
                    <p>• {t('info.addressNote2')}</p>
                    <p className="flex items-center gap-2">
                      <Train size={16} className="text-cygne-gold" />
                      {t('info.addressNote3')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Check-in */}
            <div className="bg-white p-8 rounded-sm shadow-sm border border-stone-100">
              <div className="flex items-start gap-4">
                <KeyRound className="text-cygne-gold shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="text-xl font-serif text-cygne-brown mb-4">{t('info.checkinTitle')}</h3>
                  <div className="space-y-3 text-sm text-cygne-brown/70 leading-relaxed">
                    <p className="font-medium text-cygne-brown">
                      <Clock className="inline mr-2" size={16} />
                      {t('info.checkinTime')}
                    </p>
                    <p>• {t('info.checkinNote1')}</p>
                    <p className="bg-cygne-gold/10 p-3 rounded-sm border-l-4 border-cygne-gold">
                      <strong className="text-cygne-brown">{t('info.checkinNote2')}</strong> {t('info.checkinNote2End')}
                    </p>
                    <p>• {t('info.checkinNote3')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Check-out */}
            <div className="bg-white p-8 rounded-sm shadow-sm border border-stone-100">
              <div className="flex items-start gap-4">
                <Clock className="text-cygne-gold shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="text-xl font-serif text-cygne-brown mb-3">{t('info.checkoutTitle')}</h3>
                  <p className="text-cygne-brown font-medium">{t('info.checkoutTime')}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Colonne droite : Carte */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="h-full min-h-[600px]"
          >
            <Map />
          </motion.div>
        </div>
      </div>
    </div>
  );
}