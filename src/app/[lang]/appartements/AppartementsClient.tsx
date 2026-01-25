'use client';

import SuiteCard from '@/components/SuiteCard';
import AmenitiesSection from '@/components/AmenitiesSection';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AppartementsClient({ pageData, suites }: { pageData: any; suites: any[] }) {
  const { language } = useLanguage();

  // Extraire les données selon la langue
  const t = (field: string) => {
    return pageData?.header?.[field]?.[language] || pageData?.header?.[field]?.fr || '';
  };

  const intro = pageData?.intro?.[language] || pageData?.intro?.fr || '';

  // Transformer les suites pour le format attendu par SuiteCard
  const transformedSuites = suites.map((suite) => ({
    id: suite.slug,
    name: suite.title?.[language] || suite.title?.fr || '',
    subtitle: '', // Pas de sous-titre dans le nouveau format
    description: suite.description?.[language] || suite.description?.fr || '',
    capacity: suite.capacity ? `${suite.capacity} ${language === 'fr' ? 'personnes' : language === 'en' ? 'people' : language === 'de' ? 'Personen' : '人'}` : '',
    surface: suite.surface ? `${suite.surface} m²` : '',
    features: [],
    image: suite.mainImageUrl,
    images: suite.galleryUrls,
    amenitiesData: suite.amenitiesData,
  }));

  return (
    <div className="bg-cygne-cream min-h-screen">
      {/* Header Beige */}
      <div className="pt-40 pb-12 px-6 text-center">
        <h1 className="text-5xl font-serif mb-4 text-cygne-brown">{t('title')}</h1>
        <p className="text-cygne-brown uppercase tracking-[0.2em] text-xs font-bold opacity-70">
          {t('subtitle')}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {transformedSuites.map((suite, index) => (
            <SuiteCard key={suite.id || index} suite={suite} />
          ))}
        </div>
        {intro && (
          <div className="mt-20 text-center max-w-3xl mx-auto">
            <p className="text-cygne-brown/70 leading-relaxed whitespace-pre-line">
              {intro}
            </p>
          </div>
        )}
      </div>

      {pageData?.establishmentAmenities && (
        <AmenitiesSection data={pageData.establishmentAmenities} />
      )}
    </div>
  );
}
