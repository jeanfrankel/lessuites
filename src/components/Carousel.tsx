'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

interface CarouselProps {
  images: string[];
  autoplay?: boolean;
  interval?: number;
  className?: string;
  aspectRatio?: string;
  enableLightbox?: boolean;
  altTexts?: string[];
  defaultAlt?: string;
}

const Carousel = memo(function Carousel({
  images,
  autoplay = true,
  interval = 5000,
  className = '',
  aspectRatio = 'aspect-[4/3]',
  enableLightbox = true,
  altTexts,
  defaultAlt = 'Image de présentation'
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isAutoplayActive, setIsAutoplayActive] = useState(autoplay);
  const [direction, setDirection] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);

  // Filtrer les images vides
  const validImages = images.filter(img => img && img.trim() !== '');

  // Préparer les images pour ImageLightbox
  const lightboxImages = validImages.map((src, index) => ({
    src,
    alt: altTexts?.[index] || `${defaultAlt} - Photo ${index + 1}`
  }));

  // Reprendre le défilement automatique après 8 secondes d'inactivité
  useEffect(() => {
    if (!userInteracted) return;

    const timer = setTimeout(() => {
      setUserInteracted(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, [userInteracted, currentIndex]);

  // Autoplay
  useEffect(() => {
    if (!isAutoplayActive || validImages.length <= 1 || isLightboxOpen || userInteracted) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) =>
        prevIndex === validImages.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [isAutoplayActive, interval, validImages.length, isLightboxOpen, userInteracted]);

  const goToPrevious = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setUserInteracted(true);
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? validImages.length - 1 : prevIndex - 1
    );
  }, [validImages.length]);

  const goToNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setUserInteracted(true);
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex === validImages.length - 1 ? 0 : prevIndex + 1
    );
  }, [validImages.length]);

  const goToSlide = useCallback((index: number) => {
    setUserInteracted(true);
    setCurrentIndex((prev) => {
      setDirection(index > prev ? 1 : -1);
      return index;
    });
  }, []);

  const handleLightboxNavigate = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  if (validImages.length === 0) return null;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.98
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.98
    })
  };

  return (
    <>
      <div className={`relative w-full ${className} group`}>
        {/* Image principale - cliquable */}
        <div
          className={`relative w-full ${aspectRatio} overflow-hidden rounded-sm cursor-pointer`}
          onClick={() => enableLightbox && setIsLightboxOpen(true)}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 }
              }}
              className="absolute inset-0"
            >
              <Image
                src={validImages[currentIndex]}
                alt={altTexts?.[currentIndex] || `${defaultAlt} ${currentIndex + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                priority={currentIndex === 0}
                loading={currentIndex === 0 ? "eager" : "lazy"}
                quality={85}
              />
              {/* Préchargement des images suivantes */}
              {validImages[currentIndex + 1] && (
                <link
                  rel="prefetch"
                  as="image"
                  href={validImages[currentIndex + 1]}
                />
              )}
              {validImages[currentIndex + 2] && (
                <link
                  rel="prefetch"
                  as="image"
                  href={validImages[currentIndex + 2]}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Overlay avec icône d'agrandissement */}
          {enableLightbox && (
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center z-10">
              <Expand className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={32} />
            </div>
          )}
        </div>

      {/* Boutons de navigation - visibles au hover */}
      {validImages.length > 1 && (
        <>
          <button
            onClick={(e) => goToPrevious(e)}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-cygne-brown p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
            aria-label="Image précédente"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={(e) => goToNext(e)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-cygne-brown p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
            aria-label="Image suivante"
          >
            <ChevronRight size={24} />
          </button>

          {/* Indicateurs de pagination */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {validImages.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  goToSlide(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-white w-8'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Aller à l'image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>

      {/* Lightbox plein écran */}
      <AnimatePresence>
        {isLightboxOpen && (
          <ImageLightbox
            images={lightboxImages}
            currentIndex={currentIndex}
            onClose={() => setIsLightboxOpen(false)}
            onNavigate={handleLightboxNavigate}
          />
        )}
      </AnimatePresence>
    </>
  );
});

export default Carousel;
