'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Utensils, Coffee, ShoppingBag, Store, Wrench } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Carousel from '@/components/Carousel';

const iconMap: { [key: string]: any } = {
  restaurant: Utensils,
  bar: Coffee,
  shopping: ShoppingBag,
  specialty: Store,
  practical: Wrench,
};

interface AdressesClientProps {
  pageData: {
    header: {
      title: { fr: string; en: string; de: string; zh: string };
      subtitle: { fr: string; en: string; de: string; zh: string };
    };
    categories: Array<{
      icon: string;
      categoryName: { fr: string; en: string; de: string; zh: string };
      items: Array<{
        name: string;
        type?: { fr: string; en: string; de: string; zh: string };
        description: { fr: string; en: string; de: string; zh: string };
        link?: string;
      }>;
    }>;
    addressesSectionHeader?: {
      title: { fr: string; en: string; de: string; zh: string };
      subtitle: { fr: string; en: string; de: string; zh: string };
    };
    christmasSection?: any;
  };
  colmarImages?: any[];
  christmasImages?: any[];
}

export default function AdressesClient({ pageData, colmarImages = [], christmasImages = [] }: AdressesClientProps) {
  const { language, t } = useLanguage();

  const title = pageData?.header?.title?.[language] || pageData?.header?.title?.fr || '';
  const subtitle = pageData?.header?.subtitle?.[language] || pageData?.header?.subtitle?.fr || '';
  const categories = pageData?.categories || [];

  // Addresses Section Header
  const addressesHeader = pageData?.addressesSectionHeader;
  const addressesTitle = addressesHeader?.title?.[language] || addressesHeader?.title?.fr || 'Bonnes Adresses';
  const addressesSubtitle = addressesHeader?.subtitle?.[language] || addressesHeader?.subtitle?.fr || 'Nos coups de cœur à Colmar';


  // Christmas Section Data
  const christmasSection = pageData?.christmasSection;
  const showChristmas = christmasSection?.isActive;
  const christmasTitle = christmasSection?.title?.[language] || christmasSection?.title?.fr || 'Noël à Colmar';
  const christmasText = christmasSection?.text?.[language] || christmasSection?.text?.fr || '';

  return (
    <div className="bg-cygne-cream min-h-screen">
      <div className="pt-40 pb-12 px-6 text-center">
        <h1 className="text-5xl font-serif mb-4 text-cygne-brown">{title}</h1>
        <p className="text-cygne-brown uppercase tracking-[0.2em] text-xs font-bold opacity-70">
          {subtitle}
        </p>
      </div>

      {/* Carousel Photos Colmar */}
      {colmarImages && colmarImages.length > 0 && (
        <div className="max-w-4xl mx-auto px-6 mb-16">
          <div className="shadow-2xl border border-cygne-brown/10">
            <Carousel
              images={colmarImages}
              autoplay={true}
              interval={4000}
              aspectRatio="aspect-video"
              defaultAlt="Vue de Colmar - Ville pittoresque d'Alsace"
            />
          </div>
        </div>
      )}

      {/* SECTION NOËL */}
      {
        showChristmas && (
          <div className="max-w-7xl mx-auto px-6 mb-24">
            <div className="relative bg-white rounded-lg shadow-lg overflow-hidden border border-cygne-gold/20">
              {/* Decorative background */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-bl-full z-0 opacity-50"></div>

              <div className="grid md:grid-cols-2 gap-8 relative z-10">
                {/* Content */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-bold uppercase tracking-widest mb-6 w-fit">
                    {t('addresses.festiveSeason')}
                  </div>

                  <h2 className="text-3xl md:text-5xl font-serif text-cygne-brown mb-6">
                    {christmasTitle}
                  </h2>

                  <p className="text-cygne-brown/80 text-lg leading-relaxed mb-8">
                    {christmasText}
                  </p>

                  {christmasSection?.link && (
                    <a
                      href={christmasSection.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-8 py-3 bg-red-700 text-white rounded hover:bg-red-800 transition-colors uppercase tracking-widest text-xs font-bold w-fit"
                    >
                      {t('addresses.learnMore')}
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>

                {/* Christmas Carousel */}
                <div className="h-[400px] md:h-auto bg-stone-100 relative">
                  {christmasImages.length > 0 ? (
                    <Carousel
                      images={christmasImages}
                      autoplay={true}
                      interval={4500}
                      className="h-full"
                      aspectRatio="aspect-auto h-full"
                      defaultAlt="Noël à Colmar"
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center text-cygne-brown/30 italic p-4 text-center">
                      Ajoutez des photos dans la section Noël de la page Adresses dans Sanity
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      }

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* En-tête de la section Adresses */}
        <div className="text-center mb-16">
          <span className="text-cygne-gold text-xs uppercase tracking-widest-xl mb-3 block font-bold">
            {addressesSubtitle}
          </span>
          <h2 className="text-4xl font-serif text-cygne-brown">
            {addressesTitle}
          </h2>
        </div>

        <div className="space-y-16">
          {categories.map((category, idx) => {
            const Icon = iconMap[category.icon] || Store;
            const categoryName = category.categoryName?.[language] || category.categoryName?.fr || '';

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                {/* Titre de catégorie */}
                <div className="flex items-center gap-3 mb-8">
                  <Icon className="text-cygne-gold" size={32} />
                  <h2 className="text-4xl font-serif text-cygne-brown">{categoryName}</h2>
                </div>

                {/* Grille des établissements */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items?.map((item: any, i: number) => {
                    const itemType = item.type?.[language] || item.type?.fr || '';
                    const description = item.description?.[language] || item.description?.fr || '';

                    return (
                      <div
                        key={i}
                        className="group bg-white p-6 rounded-sm shadow-sm border border-stone-100 hover:border-cygne-gold hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-lg font-bold text-cygne-brown group-hover:text-cygne-gold transition-colors flex-1">
                            {item.name}
                          </h3>
                          {item.link && (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-cygne-gold hover:text-cygne-brown transition-colors ml-2"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink size={18} />
                            </a>
                          )}
                        </div>

                        {itemType && (
                          <p className="text-xs uppercase tracking-wider text-cygne-gold font-bold mb-3">
                            {itemType}
                          </p>
                        )}

                        <p className="text-cygne-brown/70 text-sm leading-relaxed">
                          {description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div >
  );
}
