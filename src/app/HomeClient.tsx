'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Carousel from '@/components/Carousel';
import { useLanguage } from '@/contexts/LanguageContext';

const Map = dynamic(() => import('@/components/Map'), {
  loading: () => <div className="h-[500px] bg-cygne-cream/50 animate-pulse rounded-lg" />,
  ssr: false
});

const CompactBookingWidget = dynamic(() => import('@/components/CompactBookingWidget'), {
  loading: () => (
    <div className="h-[550px] bg-white rounded-lg shadow-xl flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cygne-gold"></div>
    </div>
  )
});

export default function HomeClient({ pageData }: { pageData: any }) {
  const { language } = useLanguage();

  // Extraire les données selon la langue
  const t = (section: string, field: string) => {
    const parts = section.split('.');
    let data = pageData;
    for (const part of parts) {
      data = data?.[part];
    }
    return data?.[field]?.[language] || data?.[field]?.fr || '';
  };

  // Préparer les images de Colmar
  const colmarImages = pageData?.colmarSection?.gallery || [];

  // Images des suites depuis la galerie de la section Suites
  const suitesImages = (pageData?.suitesSection?.gallery || []).map((img: any) => img.url);

  // Textes alternatifs pour les images des suites
  const suitesAltTexts = (pageData?.suitesSection?.gallery || []).map(
    (_: any, index: number) => `Suite ${index + 1} - Les Suites du Cygne à Colmar`
  );

  return (
    <div className="bg-cygne-cream">
      {/* HERO SECTION */}
      <section className="relative w-full bg-cygne-cream pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <p className="text-xs md:text-sm uppercase tracking-widest-xl mb-8 text-cygne-gold font-sans font-bold">
              {t('hero', 'location')}
            </p>

            <h1 className="text-5xl md:text-8xl font-serif mb-8 leading-[0.95] font-thin text-cygne-brown">
              {t('hero', 'title')}
            </h1>

            <p className="text-lg md:text-xl font-light tracking-wide mb-12 max-w-2xl mx-auto opacity-90 leading-relaxed">
              {t('hero', 'subtitle')}
            </p>
          </motion.div>

          <div className="mb-12">
            <CompactBookingWidget />
          </div>

          <div className="flex justify-center">
            <Link
              href="/appartements"
              className="group px-10 py-5 bg-cygne-brown text-white uppercase tracking-[0.2em] text-xs font-bold hover:bg-cygne-gold transition-all duration-500 rounded-sm relative overflow-hidden"
            >
              <span className="relative z-10">{t('hero', 'cta')}</span>
              <span className="absolute inset-0 bg-cygne-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION IMAGE VILLE DE COLMAR */}
      <section className="pt-32 md:pt-10 pb-24 md:pb-32 px-6 bg-cygne-brown">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-cygne-gold text-xs uppercase tracking-widest-xl mb-4 block font-bold">
              {t('colmarSection', 'title')}
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white font-light">
              {t('colmarSection', 'subtitle')}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="shadow-2xl border border-cygne-brown/10"
          >
            {colmarImages.length > 0 ? (
              <Carousel
                images={colmarImages.map((img: any) => img.url)}
                autoplay={true}
                interval={4000}
                defaultAlt="Vue de Colmar - Ville pittoresque d'Alsace"
              />
            ) : (
              <div className="h-[500px] bg-cygne-cream/10 flex items-center justify-center text-white">
                Uploadez des images dans Sanity Studio
              </div>
            )}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mt-8 text-white/90 text-sm italic"
          >
            {t('colmarSection', 'caption')}
          </motion.p>
        </div>
      </section>

      {/* SECTION EDITO */}
      <section className="py-36 px-6 bg-white">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-cygne-gold text-xs uppercase tracking-widest-xl mb-6 block font-bold">
            {t('philosophySection', 'label')}
          </span>

          <h2 className="text-4xl md:text-6xl font-serif text-cygne-brown mb-12 leading-tight font-light">
            {t('philosophySection', 'title')}
          </h2>

          <div className="w-[1px] h-20 bg-cygne-gold mx-auto mb-12" />

          <p className="text-cygne-brown/80 text-lg md:text-xl leading-loose font-light mb-10 max-w-2xl mx-auto">
            {t('philosophySection', 'text')}
          </p>

          <Link
            href="/infos"
            className="group inline-block text-cygne-brown border-b border-cygne-brown/30 pb-1 hover:text-cygne-gold hover:border-cygne-gold transition-all duration-400 uppercase tracking-widest text-xs"
          >
            {t('philosophySection', 'link')}
            <span className="inline-block ml-2 group-hover:translate-x-2 transition-transform duration-400">→</span>
          </Link>
        </motion.div>
      </section>

      {/* SECTION APERCU */}
      <section className="grid md:grid-cols-2 min-h-[650px]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="bg-cygne-brown text-white flex flex-col justify-center items-center p-16 md:p-20 text-center"
        >
          <h3 className="text-5xl md:text-6xl font-serif mb-8 font-light">
            {t('suitesSection', 'title')}
          </h3>

          <p className="mb-12 max-w-sm font-light leading-loose text-white/90 text-lg">
            {t('suitesSection', 'text')}
          </p>

          <Link
            href="/appartements"
            className="group inline-block px-10 py-4 border border-white/40 hover:bg-white hover:text-cygne-brown transition-all duration-500 uppercase tracking-widest text-xs relative overflow-hidden"
          >
            <span className="relative z-10">{t('suitesSection', 'link')}</span>
          </Link>
        </motion.div>

        <div className="bg-stone-200 relative min-h-[450px] md:min-h-[650px]">
          <Carousel
            images={suitesImages}
            autoplay={true}
            interval={5000}
            className="h-full"
            aspectRatio="aspect-auto min-h-[450px] md:min-h-[650px]"
            altTexts={suitesAltTexts}
          />
        </div>
      </section>

      {/* SECTION CTA RESERVATION */}
      <section className="py-20 px-6 bg-cygne-gold">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 font-light">
            {t('hero', 'title')}
          </h2>
          <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">
            {t('ctaSection', 'text')}
          </p>
          <a
            href={`https://secure.reservit.com/engine/booking/2/254654/dates?langcode=${language === 'fr' ? 'FR' : language === 'de' ? 'DE' : language === 'zh' ? 'ZH' : 'EN'}`}
            className="inline-block px-12 py-5 bg-white text-black uppercase tracking-[0.2em] text-sm font-bold hover:bg-cygne-brown hover:text-white transition-all duration-500 rounded-sm shadow-lg"
          >
            {t('ctaSection', 'button')}
          </a>
        </motion.div>
      </section>

      {/* SECTION LOCALISATION AVEC CARTE */}
      <section className="py-20 md:py-32 px-6 bg-cygne-cream">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <span className="text-cygne-gold text-xs uppercase tracking-widest-xl mb-4 block font-bold">
              {t('mapSection', 'label')}
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-cygne-brown font-light mb-6">
              {t('mapSection', 'title')}
            </h2>
            <p className="text-cygne-brown/70 text-lg max-w-2xl mx-auto">
              {t('mapSection', 'address')}<br />
              <span className="text-sm">{t('mapSection', 'subtitle')}</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-[500px]"
          >
            <Map />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
