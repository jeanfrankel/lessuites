'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ReservitBooking() {
  const { t, language } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [reservitUrl, setReservitUrl] = useState('https://secure.reservit.com/engine/booking/2/254654');
  const searchParams = useSearchParams();

  useEffect(() => {
    // Convertir la langue en code Reservit
    const reservitLang = language === 'fr' ? 'FR' : language === 'de' ? 'DE' : language === 'zh' ? 'ZH' : 'EN';

    // Récupérer les dates depuis les paramètres d'URL
    const arrival = searchParams.get('arrival');
    const departure = searchParams.get('departure');

    let url = `https://secure.reservit.com/engine/booking/2/254654?langcode=${reservitLang}`;

    if (arrival && departure) {
      // Convertir le format YYYY-MM-DD en DD/MM/YYYY pour Reservit
      const formatDate = (dateStr: string) => {
        const [year, month, day] = dateStr.split('-');
        return `${day}/${month}/${year}`;
      };

      const arrivalFormatted = formatDate(arrival);
      const departureFormatted = formatDate(departure);

      // Ajouter les dates à l'URL
      url += `&arrival=${arrivalFormatted}&departure=${departureFormatted}`;
    }

    setReservitUrl(url);
  }, [searchParams, language]);

  return (
    <>
      {/* jQuery */}
      <Script
        src="https://code.jquery.com/jquery-3.2.1.min.js"
        strategy="afterInteractive"
      />

      {/* Iframe de réservation intégré */}
      <div className="w-full relative">
        {/* Loader pendant le chargement */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-cygne-cream/50 z-10">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cygne-gold mb-4"></div>
              <p className="text-cygne-brown text-sm uppercase tracking-wider">
                {t('booking.loadingSystem')}
              </p>
            </div>
          </div>
        )}

        <iframe
          src={reservitUrl}
          className="w-full border-0"
          style={{
            minHeight: '800px',
            height: 'calc(100vh - 100px)',
            maxHeight: '1200px'
          }}
          title="Système de réservation Reservit"
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </>
  );
}
