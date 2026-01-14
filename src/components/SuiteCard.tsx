'use client';

import { useState, memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Users, MoveDiagonal, Check, Expand } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import ImageLightbox from './ImageLightbox';
import Carousel from './Carousel';
import { useLanguage } from '@/contexts/LanguageContext';

interface SuiteCardProps {
  suite: {
    id: string;
    name: string;
    subtitle: string;
    description: string;
    capacity: string;
    surface: string;
    features: string[];
    amenitiesData?: { title: string; items: string[] }[]; // New prop
    image: string;
    images?: string[];
  }
}

const SuiteCard = memo(function SuiteCard({ suite }: SuiteCardProps) {
  const { t, language } = useLanguage();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isAmenitiesOpen, setIsAmenitiesOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Support pour plusieurs images ou une seule
  const imageArray = suite.images || [suite.image];
  const images = imageArray.map((src, index) => ({
    src,
    alt: `${suite.name} - Photo ${index + 1}`
  }));

  // Génération des alt texts SEO-optimisés pour le carrousel
  const carouselAltTexts = imageArray.map((_, index) =>
    `${suite.name} - Appartement de charme 4 étoiles à Colmar - Vue ${index + 1}`
  );

  return (
    <>
      <div className="group flex flex-col bg-white border border-stone-100 hover:border-cygne-gold/30 transition-all duration-500 hover:shadow-lg rounded-sm overflow-hidden h-full">
        {/* Zone Carrousel */}
        <div className="h-72 bg-stone-200 w-full overflow-hidden">
          {imageArray.length > 1 ? (
            <Carousel
              images={imageArray}
              autoplay={true}
              interval={6000}
              aspectRatio="h-72"
              altTexts={carouselAltTexts}
              defaultAlt={`${suite.name} - Appartement de charme 4 étoiles à Colmar`}
            />
          ) : (
            <div
              className="h-72 w-full relative overflow-hidden cursor-pointer"
              onClick={() => setIsLightboxOpen(true)}
            >
              <Image
                src={imageArray[0] || suite.image}
                alt={`${suite.name} - Appartement de charme 4 étoiles à Colmar`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <Expand className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={32} />
              </div>
            </div>
          )}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {isLightboxOpen && (
            <ImageLightbox
              images={images}
              currentIndex={currentImageIndex}
              onClose={() => setIsLightboxOpen(false)}
              onNavigate={(index) => setCurrentImageIndex(index)}
            />
          )}
        </AnimatePresence>

        <div className="p-8 flex flex-col flex-grow text-center">
          <h3 className="text-3xl font-serif text-cygne-brown mb-2">{suite.name}</h3>
          <p className="text-xs uppercase tracking-[0.2em] text-cygne-gold mb-6 font-medium">
            {suite.subtitle}
          </p>

          <div className="flex justify-center gap-6 mb-6 text-cygne-brown/60 text-sm border-b border-cygne-cream pb-6 mx-4">
            <div className="flex items-center gap-2">
              <Users size={16} /> {suite.capacity}
            </div>
            <div className="flex items-center gap-2">
              <MoveDiagonal size={16} /> {suite.surface}
            </div>
          </div>

          <p className="text-cygne-brown/80 mb-8 leading-relaxed font-light text-sm">
            {suite.description}
          </p>

          {/* Liste équipements compacte */}
          <div className="mb-4 flex-grow">
            <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2">
              {suite.features.slice(0, 3).map((feat, idx) => (
                <li key={idx} className="text-xs text-cygne-brown/60 font-medium">
                  • {feat}
                </li>
              ))}
            </ul>
          </div>

          {/* Bouton équipements */}
          {suite.amenitiesData && suite.amenitiesData.length > 0 && (
            <button
              onClick={() => setIsAmenitiesOpen(true)}
              className="mb-8 text-xs uppercase tracking-widest text-cygne-gold hover:text-cygne-brown transition-colors font-semibold"
            >
              {t('apartments.seeAllAmenities') || (language === 'fr' ? 'Voir tous les équipements' : 'See all amenities')}
            </button>
          )}

          <a
            href={`https://secure.reservit.com/engine/booking/2/254654/dates?langcode=${language === 'fr' ? 'FR' : language === 'de' ? 'DE' : language === 'zh' ? 'ZH' : 'EN'}`}
            className="btn-outline w-full block text-center mx-auto"
          >
            {t('apartments.seeAvailability')}
          </a>
        </div>
      </div>

      {/* Amenities Modal */}
      <AnimatePresence>
        {isAmenitiesOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsAmenitiesOpen(false)}>
            <div
              className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl p-8 lg:p-12 relative animate-in fade-in zoom-in duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsAmenitiesOpen(false)}
                className="absolute top-4 right-4 p-2 hover:bg-stone-100 rounded-full transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <h2 className="text-3xl font-serif text-cygne-brown mb-2 text-center">{suite.name}</h2>
              <p className="text-center text-cygne-gold uppercase tracking-widest text-sm mb-12">
                {t('apartments.amenities') || (language === 'fr' ? 'Équipements' : 'Amenities')}
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {suite.amenitiesData?.map((category, idx) => (
                  <div key={idx} className="mb-6 break-inside-avoid">
                    <h3 className="font-serif text-lg text-cygne-brown mb-4 border-b border-cygne-cream pb-2">
                      {category.title}
                    </h3>
                    <ul className="space-y-2">
                      {category.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="text-sm text-cygne-brown/80 flex items-start gap-2">
                          <span className="text-cygne-gold mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
});

export default SuiteCard;