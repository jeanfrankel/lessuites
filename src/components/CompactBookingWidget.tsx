'use client';

import { useState, useEffect, useRef } from 'react';
import Script from 'next/script';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CompactBookingWidget() {
  const { t, language } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Convertir la langue en code Reservit
  const reservitLang = language === 'fr' ? 'FR' : language === 'de' ? 'DE' : language === 'zh' ? 'ZH' : 'EN';

  const toggleFullscreen = () => {
    if (!wrapperRef.current) return;

    if (!document.fullscreenElement) {
      wrapperRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.error('Erreur fullscreen:', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <>
      {/* jQuery */}
      <Script
        src="https://code.jquery.com/jquery-3.2.1.min.js"
        strategy="afterInteractive"
      />

      {/* CSS pour réduire la taille de l'interface Reservit */}
      <style jsx global>{`
        .compact-booking-wrapper {
          overflow: hidden;
          height: 550px;
        }

        .compact-booking-wrapper iframe {
          transform: scale(0.85);
          transform-origin: top left;
          width: 117.65% !important;
          height: 647px;
        }

        /* Optimisation mobile */
        @media (max-width: 768px) {
          .compact-booking-wrapper {
            height: 550px;
          }
          .compact-booking-wrapper iframe {
            transform: scale(0.65);
            transform-origin: top left;
            width: 153.85% !important;
            height: 846px;
          }
        }

        @media (max-width: 480px) {
          .compact-booking-wrapper {
            height: 550px;
          }
          .compact-booking-wrapper iframe {
            transform: scale(0.55);
            transform-origin: top left;
            width: 181.82% !important;
            height: 1000px;
          }
        }

        .compact-booking-wrapper:fullscreen {
          background: white;
          padding: 0;
          width: 100vw !important;
          height: 100vh !important;
          overflow: auto;
        }
        .compact-booking-wrapper:fullscreen iframe {
          transform: scale(1) !important;
          transform-origin: top left !important;
          width: 100% !important;
          height: 100vh !important;
          min-height: 100vh !important;
        }
        .compact-booking-wrapper:fullscreen .absolute {
          position: fixed !important;
        }
      `}</style>

      {/* Widget de réservation compact */}
      <div className="compact-booking-wrapper relative bg-white rounded-lg overflow-hidden shadow-xl" ref={wrapperRef}>
        {/* Bouton plein écran - Étendu pour masquer le titre Reservit - Caché sur mobile */}
        <button
          onClick={toggleFullscreen}
          className={`absolute top-0 z-40 px-6 bg-cygne-white text-black text-xs uppercase tracking-wider font-bold hover:shadow-lg transition-all duration-300 shadow-md hidden md:flex items-center justify-start gap-3 ${
            isFullscreen
              ? 'left-0 right-56 py-[1.69rem]'
              : 'left-0 right-44 py-[1.375rem]'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isFullscreen ? (
              <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
            ) : (
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
            )}
          </svg>
          <span>{isFullscreen ? t('booking.fullscreenExit') : t('booking.fullscreenEnter')}</span>
        </button>

        {/* Loader pendant le chargement */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-cygne-cream/80 z-10 rounded-lg min-h-[400px]">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-cygne-gold mb-3"></div>
              <p className="text-cygne-brown text-xs uppercase tracking-wider">
                {t('booking.loading')}
              </p>
            </div>
          </div>
        )}

        {/* Iframe de réservation compact */}
        <iframe
          src={`https://secure.reservit.com/engine/booking/2/254654?langcode=${reservitLang}`}
          className="w-full border-0"
          title="Système de réservation compact"
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </>
  );
}
