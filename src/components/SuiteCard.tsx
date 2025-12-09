'use client';

import { useState } from 'react';
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
        image: string;
        images?: string[];
    }
}

export default function SuiteCard({ suite }: SuiteCardProps) {
  const { t, language } = useLanguage();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Support pour plusieurs images ou une seule
  const imageArray = suite.images || [suite.image];
  const images = imageArray.map((src, index) => ({
    src,
    alt: `${suite.name} - Photo ${index + 1}`
  }));
  return (
    <div className="group flex flex-col bg-white border border-stone-100 hover:border-cygne-gold/30 transition-all duration-500 hover:shadow-lg rounded-sm overflow-hidden h-full">
      {/* Zone Carrousel */}
      <div className="h-72 bg-stone-200 w-full overflow-hidden">
         {imageArray.length > 1 ? (
           <Carousel
             images={imageArray}
             autoplay={true}
             interval={6000}
             aspectRatio="h-72"
           />
         ) : (
           <div
             className="h-72 w-full relative overflow-hidden cursor-pointer"
             onClick={() => setIsLightboxOpen(true)}
           >
             <Image
               src={suite.image}
               alt={suite.name}
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
        <div className="mb-8 flex-grow">
            <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                {suite.features.slice(0, 3).map((feat, idx) => (
                    <li key={idx} className="text-xs text-cygne-brown/60 font-medium">
                        • {feat}
                    </li>
                ))}
            </ul>
        </div>

        <a
          href={`https://secure.reservit.com/engine/booking/2/254654/dates?langcode=${language === 'fr' ? 'FR' : language === 'de' ? 'DE' : language === 'zh' ? 'ZH' : 'EN'}`}
          className="btn-outline w-full block text-center mx-auto"
        >
          {t('apartments.seeAvailability')}
        </a>
      </div>
    </div>
  );
}