'use client';

import dynamic from 'next/dynamic';
import HeroSection from '@/components/home/HeroSection';

// Code splitting des sections "sous la ligne de flottaison"
// ssr: true pour garantir le SEO, mais le JS sera chargé dans des chunks séparés
const ColmarSection = dynamic(() => import('@/components/home/ColmarSection'));
const PhilosophySection = dynamic(() => import('@/components/home/PhilosophySection'));
const SuitesSection = dynamic(() => import('@/components/home/SuitesSection'));
// Reviews contient beaucoup de texte statique mais aussi des widgets. On le code-split.
const ReviewsSection = dynamic(() => import('@/components/home/ReviewsSection'));
const CtaSection = dynamic(() => import('@/components/home/CtaSection'));
// Map est déjà dynamic dans MapSection, mais on peut aussi dynamic la section elle-même
const MapSection = dynamic(() => import('@/components/home/MapSection'));

export default function HomeClient({ pageData }: { pageData: any }) {
  if (!pageData) return null;

  return (
    <div className="bg-cygne-cream">
      {/* LCP Critical Path */}
      <HeroSection heroData={pageData.hero} ctaData={pageData.ctaSection} />

      {/* Deferred Content */}
      <ColmarSection data={pageData.colmarSection} />

      <PhilosophySection data={pageData.philosophySection} />

      <SuitesSection data={pageData.suitesSection} />

      <ReviewsSection data={pageData.reviewsSection} />

      <CtaSection data={pageData.ctaSection} heroTitle={pageData.hero?.title} />

      <MapSection data={pageData.mapSection} />
    </div>
  );
}
