'use client';

import { siteConfig } from '@/data/content';
import { useLanguage } from '@/contexts/LanguageContext';
import dynamic from 'next/dynamic';

// Import dynamique pour ReservitBooking (iframe lourde)
const ReservitBooking = dynamic(() => import('@/components/ReservitBooking'), {
  loading: () => (
    <div className="h-[800px] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cygne-gold mb-4 mx-auto"></div>
      </div>
    </div>
  ),
  ssr: false
});

export default function ReservationPage() {
  const { t } = useLanguage();

  return (
    <div className="bg-cygne-cream min-h-screen">
      {/* Hero Section */}
      <div className="pt-40 pb-16 px-6 text-center bg-cygne-cream">
        <span className="text-cygne-gold text-xs uppercase tracking-widest-xl mb-4 block font-bold">
          {t('reservation.onlineBooking')}
        </span>
        <h1 className="text-5xl md:text-6xl font-serif mb-6 text-cygne-brown font-light">
          {t('reservation.title')}
        </h1>
        <p className="text-cygne-brown/70 text-lg font-light max-w-2xl mx-auto">
          {t('reservation.bookingDescription')}
        </p>
      </div>

      {/* Interface de réservation */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden border-t-4 border-cygne-gold">
          {/* Barre décorative */}
          <div className="bg-gradient-to-r from-cygne-brown via-cygne-gold to-cygne-brown h-1"></div>

          {/* Introduction */}
          <div className="bg-cygne-cream/30 px-8 py-6 border-b border-cygne-brown/10">
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-[1px] bg-cygne-gold"></div>
              <p className="text-cygne-brown text-sm uppercase tracking-wider font-bold">
                {t('reservation.secureSystem')}
              </p>
              <div className="w-12 h-[1px] bg-cygne-gold"></div>
            </div>
          </div>

          {/* Iframe Reservit */}
          <div className="bg-white">
            <ReservitBooking />
          </div>
        </div>

        {/* Section contact alternative */}
        <div className="mt-16 text-center">
          <div className="flex items-center justify-center mb-8">
            <div className="flex-grow h-[1px] bg-cygne-brown/20 max-w-xs"></div>
            <span className="px-6 text-cygne-brown/50 text-sm uppercase tracking-widest">
              {t('reservation.needHelp')}
            </span>
            <div className="flex-grow h-[1px] bg-cygne-brown/20 max-w-xs"></div>
          </div>

          <p className="text-cygne-brown/70 mb-8 text-base">
            {t('reservation.teamAvailable')}
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <a
              href={`mailto:${siteConfig.contact.emailClient}`}
              className="group bg-cygne-brown text-white py-5 px-8 hover:bg-cygne-gold transition-all duration-500 uppercase tracking-widest text-xs font-bold rounded-sm shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <span className="block mb-1">✉</span>
              {t('reservation.emailBtn')}
            </a>
            <a
              href={`tel:${siteConfig.contact.mobile}`}
              className="group border-2 border-cygne-brown text-cygne-brown py-5 px-8 hover:bg-cygne-brown hover:text-white transition-all duration-500 uppercase tracking-widest text-xs font-bold rounded-sm shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <span className="block mb-1">📞</span>
              {siteConfig.contact.mobile}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}