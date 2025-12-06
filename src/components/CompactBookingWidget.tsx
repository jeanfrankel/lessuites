'use client';

import { useState, useEffect, useRef } from 'react';
import Script from 'next/script';

export default function CompactBookingWidget() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

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
        {/* Bouton plein écran */}
        <button
          onClick={toggleFullscreen}
          className="absolute top-2 right-2 md:top-4 md:right-4 z-20 px-3 py-2 md:px-4 md:py-2 bg-cygne-gold text-white text-xs uppercase tracking-wider font-bold hover:bg-cygne-brown transition-all duration-300 rounded-sm shadow-lg flex items-center gap-1 md:gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="md:w-4 md:h-4"
          >
            {isFullscreen ? (
              <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
            ) : (
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
            )}
          </svg>
          <span className="hidden md:inline">{isFullscreen ? 'Quitter' : 'Plein écran'}</span>
        </button>

        {/* Loader pendant le chargement */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-cygne-cream/80 z-10 rounded-lg min-h-[400px]">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-cygne-gold mb-3"></div>
              <p className="text-cygne-brown text-xs uppercase tracking-wider">
                Chargement...
              </p>
            </div>
          </div>
        )}

        {/* Iframe de réservation compact */}
        <iframe
          src="https://secure.reservit.com/engine/booking/2/254654"
          className="w-full border-0"
          title="Système de réservation compact"
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </>
  );
}
