'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Carousel from '@/components/Carousel';
import { useLanguage } from '@/contexts/LanguageContext';

// Import dynamique pour les composants lourds (chargés uniquement quand nécessaire)
const Map = dynamic(() => import('@/components/Map'), {
  loading: () => <div className="h-[500px] bg-cygne-cream/50 animate-pulse rounded-lg" />,
  ssr: false // Map n'a pas besoin de SSR
});

const CompactBookingWidget = dynamic(() => import('@/components/CompactBookingWidget'), {
  loading: () => (
    <div className="h-[550px] bg-white rounded-lg shadow-xl flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cygne-gold"></div>
    </div>
  )
});

export default function Home() {
  const { t, language } = useLanguage();

  // Images pour le carrousel de Colmar
  const colmarImages = [
    '/images/colmar.jpg',
    // Ajoutez d'autres images de Colmar ici
    '/images/colmar2.jpg',
    '/images/colmar3.jpg',
    '/images/colmar4.jpg',
    '/images/colmar5.jpg',
    '/images/colmar6.jpg',
    '/images/colmar7.jpg',
    '/images/colmar8.jpg',
    '/images/colmar9.jpg',
    '/images/colmar10.jpg',
    '/images/colmar11.jpg',
    '/images/colmar12.jpg',
    '/images/colmar13.jpg',
    '/images/colmar14.jpg',

  ];

  // Images pour le carrousel des suites
  const suitesImages = [
    '/images/baudelaire.jpg',
    '/images/schubert.jpg',
    '/images/asselin1.jpg',
  ];

  return (
    <div className="bg-cygne-cream">

      {/* HERO SECTION : Fond Beige, Texte Marron */}
      <section className="relative w-full bg-cygne-cream pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-xs md:text-sm uppercase tracking-widest-xl mb-8 text-cygne-gold font-sans font-bold"
            >
              {t('home.location')}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-5xl md:text-8xl font-serif mb-8 leading-[0.95] font-thin text-cygne-brown"
            >
              {t('home.title')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="text-lg md:text-xl font-light tracking-wide mb-12 max-w-2xl mx-auto opacity-90 leading-relaxed"
            >
              {t('home.subtitle')}
            </motion.p>
          </motion.div>

          {/* Widget de réservation intégré */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="mb-12"
          >
            <CompactBookingWidget />
          </motion.div>

          {/* Bouton Découvrir */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
            className="flex justify-center"
          >
            <Link
              href="/appartements"
              className="group px-10 py-5 bg-cygne-brown text-white uppercase tracking-[0.2em] text-xs font-bold hover:bg-cygne-gold transition-all duration-500 rounded-sm relative overflow-hidden"
            >
              <span className="relative z-10">{t('home.cta')}</span>
              <span className="absolute inset-0 bg-cygne-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SECTION IMAGE VILLE DE COLMAR - Bien intégrée */}
      <section className="pt-32 md:pt-10 pb-24 md:pb-32 px-6 bg-cygne-brown">
        <div className="max-w-4xl mx-auto">
          {/* Titre optionnel au-dessus */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-cygne-gold text-xs uppercase tracking-widest-xl mb-4 block font-bold">
              {t('home.locationTitle')}
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white font-light">
              {t('home.locationSubtitle')}
            </h2>
          </motion.div>

          {/* Carrousel d'images de Colmar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="shadow-2xl border border-cygne-brown/10"
          >
            <Carousel
              images={colmarImages}
              autoplay={true}
              interval={4000}
            />
          </motion.div>

          {/* Légende sous l'image */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mt-8 text-white/90 text-sm italic"
          >
            {t('home.locationCaption')}
          </motion.p>
        </div>
      </section>

      {/* SECTION EDITO : Fond Blanc pour créer une nuance douce */}
      <section className="py-36 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-cygne-gold text-xs uppercase tracking-widest-xl mb-6 block font-bold"
          >
            {t('home.philosophyLabel')}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-serif text-cygne-brown mb-12 leading-tight font-light"
          >
            {t('home.philosophyTitle')}
          </motion.h2>

          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-[1px] h-20 bg-cygne-gold mx-auto mb-12 origin-top"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-cygne-brown/80 text-lg md:text-xl leading-loose font-light mb-10 max-w-2xl mx-auto"
          >
            {t('home.philosophyText')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Link
              href="/infos"
              className="group inline-block text-cygne-brown border-b border-cygne-brown/30 pb-1 hover:text-cygne-gold hover:border-cygne-gold transition-all duration-400 uppercase tracking-widest text-xs"
            >
              {t('home.philosophyLink')}
              <span className="inline-block ml-2 group-hover:translate-x-2 transition-transform duration-400">→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SECTION APERCU */}
      <section className="grid md:grid-cols-2 min-h-[650px]">
        {/* Colonne Gauche : Marron pour casser le rythme */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="bg-cygne-brown text-white flex flex-col justify-center items-center p-16 md:p-20 text-center"
        >
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-6xl font-serif mb-8 font-light"
          >
            {t('home.suitesTitle')}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-12 max-w-sm font-light leading-loose text-white/90 text-lg"
          >
            {t('home.suitesText')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Link
              href="/appartements"
              className="group inline-block px-10 py-4 border border-white/40 hover:bg-white hover:text-cygne-brown transition-all duration-500 uppercase tracking-widest text-xs relative overflow-hidden"
            >
              <span className="relative z-10">{t('home.suitesLink')}</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Colonne Droite : Carrousel des suites */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="bg-stone-200 relative min-h-[450px] md:min-h-[650px]"
        >
          <Carousel
            images={suitesImages}
            autoplay={true}
            interval={5000}
            className="h-full"
            aspectRatio="aspect-auto min-h-[450px] md:min-h-[650px]"
          />
        </motion.div>
      </section>

      {/* SECTION CTA RESERVATION */}
      <section className="py-20 px-6 bg-cygne-gold">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-serif text-white mb-6 font-light"
          >
            {t('home.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/90 text-lg mb-10 max-w-2xl mx-auto"
          >
            {t('home.ctaReservation')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a
              href={`https://secure.reservit.com/engine/booking/2/254654/dates?langcode=${language === 'fr' ? 'FR' : language === 'de' ? 'DE' : language === 'zh' ? 'ZH' : 'EN'}`}
              className="inline-block px-12 py-5 bg-white text-black uppercase tracking-[0.2em] text-sm font-bold hover:bg-cygne-brown hover:text-white transition-all duration-500 rounded-sm shadow-lg"
            >
              {t('home.ctaButton')}
            </a>
          </motion.div>
        </div>
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
              {t('home.mapLabel')}
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-cygne-brown font-light mb-6">
              {t('home.mapTitle')}
            </h2>
            <p className="text-cygne-brown/70 text-lg max-w-2xl mx-auto">
              {t('home.mapAddress')}<br />
              <span className="text-sm">{t('home.mapSubtitle')}</span>
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