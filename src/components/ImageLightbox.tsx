'use client';

import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageLightboxProps {
  images: { src: string; alt: string }[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function ImageLightbox({ images, currentIndex, onClose, onNavigate }: ImageLightboxProps) {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);
  const [direction, setDirection] = useState(0);
  const prevIndex = useRef(currentIndex);

  // Détecter la direction du changement
  useEffect(() => {
    if (currentIndex > prevIndex.current) {
      setDirection(1);
    } else if (currentIndex < prevIndex.current) {
      setDirection(-1);
    }
    prevIndex.current = currentIndex;
  }, [currentIndex]);

  // Créer le portal une seule fois au montage
  useEffect(() => {
    // Créer un conteneur dédié pour le portal
    const portalContainer = document.createElement('div');
    portalContainer.style.position = 'fixed';
    portalContainer.style.top = '0';
    portalContainer.style.left = '0';
    portalContainer.style.right = '0';
    portalContainer.style.bottom = '0';
    portalContainer.style.zIndex = '99999';
    portalContainer.style.backgroundColor = '#000000';
    document.body.appendChild(portalContainer);
    setPortalElement(portalContainer);

    // Sauvegarder la position de scroll
    const scrollY = window.scrollY;

    // Bloquer le scroll sur html et body
    const originalOverflowBody = document.body.style.overflow;
    const originalOverflowHtml = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      // Restaurer le scroll
      document.body.style.overflow = originalOverflowBody;
      document.documentElement.style.overflow = originalOverflowHtml;

      // Restaurer la position (au cas où)
      window.scrollTo(0, scrollY);

      if (portalContainer && portalContainer.parentNode) {
        portalContainer.parentNode.removeChild(portalContainer);
      }
    };
  }, []); // <- Dépendances vides = exécuté une seule fois

  // Gérer les événements clavier séparément
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate(Math.max(0, currentIndex - 1));
      if (e.key === 'ArrowRight') onNavigate(Math.min(images.length - 1, currentIndex + 1));
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, images.length, onClose, onNavigate]);

  const currentImage = images[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;

  // Préchargement des images adjacentes
  const nextImage = hasNext ? images[currentIndex + 1] : null;
  const prevImage = hasPrev ? images[currentIndex - 1] : null;

  const slideVariants = {
    enter: {
      opacity: 0,
      zIndex: 2
    },
    center: {
      zIndex: 2,
      opacity: 1
    },
    exit: {
      zIndex: 1,
      opacity: 0
    }
  };

  const lightboxContent = (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        touchAction: 'none'
      }}
      onClick={onClose}
    >
      {/* Bouton fermer */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 text-white"
        aria-label="Fermer"
      >
        <X size={24} />
      </button>

      {/* Compteur d'images */}
      <div className="absolute top-6 left-6 z-50 text-white text-sm font-medium">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Navigation gauche */}
      {hasPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(currentIndex - 1);
          }}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-50 p-4 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 text-white"
          aria-label="Image précédente"
        >
          <ChevronLeft size={32} />
        </button>
      )}

      {/* Navigation droite */}
      {hasNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(currentIndex + 1);
          }}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-50 p-4 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 text-white"
          aria-label="Image suivante"
        >
          <ChevronRight size={32} />
        </button>
      )}

      {/* Image */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          backgroundColor: '#000000'
        }}>
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.2,
                ease: "linear"
              }}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#000000',
                willChange: 'opacity'
              }}
            >
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
                quality={90}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Titre de l'image */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-center z-50">
        <p className="text-lg font-serif">{currentImage.alt}</p>
      </div>

      {/* Préchargement invisible */}
      <div style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', opacity: 0 }}>
        {nextImage && (
          <Image
            src={nextImage.src}
            alt="preload next"
            width={10}
            height={10}
            priority
          />
        )}
        {prevImage && (
          <Image
            src={prevImage.src}
            alt="preload prev"
            width={10}
            height={10}
            priority
          />
        )}
      </div>
    </div>
  );

  return portalElement ? createPortal(lightboxContent, portalElement) : null;
}
