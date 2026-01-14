'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import Carousel from '@/components/Carousel';
import { useLanguage } from '@/contexts/LanguageContext';

// Données des avis Booking
const bookingReviews = [
  {
    author: "Fortunato",
    country: "Suisse",
    rating: 10,
    text: {
      fr: "Excellent emplacement, proche du centre névralgique de Colmar, parking public à 5' à pieds. Appartement très spacieux, parfaitement équipé, accès simple par soi-même.",
      en: "Excellent location, close to the heart of Colmar, public parking 5 min walk away. Very spacious apartment, perfectly equipped, easy self check-in.",
      de: "Ausgezeichnete Lage, nahe dem Zentrum von Colmar, öffentlicher Parkplatz 5 Gehminuten entfernt. Sehr geräumige Wohnung, perfekt ausgestattet, einfacher Selbst-Check-in.",
      zh: "位置极佳，靠近科尔马中心，步行5分钟即可到达公共停车场。公寓非常宽敞，设备齐全，自助入住简单方便。"
    }
  },
  {
    author: "Quentin",
    country: "Suisse",
    rating: 10,
    text: {
      fr: "Emplacement parfait (entrée du vieux centre de Colmar, 15 min à pied de la gare, 2 min à pied du parking Rapp). Logement bien équipé avec un grand espace de vie pour un agréable séjour entre amis ou en famille.",
      en: "Perfect location (entrance to old Colmar, 15 min walk from station, 2 min from Rapp parking). Well-equipped accommodation with large living space for a pleasant stay with friends or family.",
      de: "Perfekte Lage (Eingang zur Altstadt von Colmar, 15 Min. Fußweg vom Bahnhof, 2 Min. vom Parkplatz Rapp). Gut ausgestattete Unterkunft mit großem Wohnbereich für einen angenehmen Aufenthalt mit Freunden oder Familie.",
      zh: "位置完美（科尔马老城入口，距火车站步行15分钟，距Rapp停车场2分钟）。设备齐全的住宿，宽敞的生活空间，适合与朋友或家人愉快度假。"
    }
  },
  {
    author: "Perrier",
    country: "France",
    rating: 10,
    text: {
      fr: "Échanges préalables réguliers, bonnes recommandations et équipements de l'appartement très complets. Notre hôte a été facilitatrice pour nous accueillir en avance. Merci Adeline !",
      en: "Regular prior exchanges, good recommendations and very complete apartment equipment. Our host was helpful in welcoming us early. Thank you Adeline!",
      de: "Regelmäßiger vorheriger Austausch, gute Empfehlungen und sehr vollständige Wohnungsausstattung. Unsere Gastgeberin war hilfreich und hat uns früher empfangen. Danke Adeline!",
      zh: "事先沟通顺畅，推荐很好，公寓设备非常齐全。房东很贴心，提前接待了我们。谢谢Adeline！"
    }
  }
];

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
  const { language, t: tContext } = useLanguage();

  // Extraire les données selon la langue
  const t = (section: string, field: string) => {
    const parts = section.split('.');
    let data = pageData;
    for (const part of parts) {
      data = data?.[part];
    }
    return data?.[field]?.[language] || data?.[field]?.fr || '';
  };

  // Préparer les images de Colmar (avec LQIP pour blur placeholder)
  const colmarImages = pageData?.colmarSection?.gallery || [];

  // Images des suites depuis la galerie de la section Suites (avec LQIP)
  const suitesImages = pageData?.suitesSection?.gallery || [];

  // Textes alternatifs pour les images des suites
  const suitesAltTexts = (pageData?.suitesSection?.gallery || []).map(
    (_: any, index: number) => `Suite ${index + 1} - Les Suites du Cygne à Colmar`
  );

  return (
    <div className="bg-cygne-cream">
      {/* HERO SECTION */}
      <section className="relative w-full bg-cygne-cream pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 animate-fadeIn">
            <p className="text-xs md:text-sm uppercase tracking-widest-xl mb-8 text-cygne-gold font-sans font-bold">
              {t('hero', 'location')}
            </p>

            <h1 className="text-5xl md:text-8xl font-serif mb-8 leading-[0.95] font-thin text-cygne-brown">
              {t('hero', 'title')}
            </h1>

            <p className="text-lg md:text-xl font-light tracking-wide mb-12 max-w-2xl mx-auto opacity-90 leading-relaxed">
              {t('hero', 'subtitle')}
            </p>
          </div>

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
          <div className="text-center mb-16">
            <span className="text-cygne-gold text-xs uppercase tracking-widest-xl mb-4 block font-bold">
              {t('colmarSection', 'title')}
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white font-light">
              {t('colmarSection', 'subtitle')}
            </h2>
          </div>

          <div className="shadow-2xl border border-cygne-brown/10">
            {colmarImages.length > 0 ? (
              <Carousel
                images={colmarImages}
                autoplay={true}
                interval={4000}
                defaultAlt="Vue de Colmar - Ville pittoresque d'Alsace"
              />
            ) : (
              <div className="h-[500px] bg-cygne-cream/10 flex items-center justify-center text-white">
                Uploadez des images dans Sanity Studio
              </div>
            )}
          </div>

          <p className="text-center mt-8 text-white/90 text-sm italic">
            {t('colmarSection', 'caption')}
          </p>
        </div>
      </section>

      {/* SECTION EDITO */}
      <section className="py-36 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
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
        </div>
      </section>

      {/* SECTION APERCU */}
      <section className="grid md:grid-cols-2 min-h-[650px]">
        <div className="bg-cygne-brown text-white flex flex-col justify-center items-center p-16 md:p-20 text-center">
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
        </div>

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

      {/* SECTION AVIS BOOKING */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-cygne-gold text-xs uppercase tracking-widest-xl mb-4 block font-bold">
              {tContext('reviews.label')}
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-cygne-brown font-light mb-8">
              {tContext('reviews.title')}
            </h2>

            {/* Note globale Booking */}
            <div className="flex flex-col items-center gap-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="bg-[#003580] text-white text-4xl md:text-5xl font-bold px-5 py-3 rounded-lg shadow-lg">
                  9.1
                </div>
                <div className="text-left">
                  <p className="text-cygne-brown font-medium text-lg">{tContext('reviews.rating')}</p>
                  <p className="text-cygne-brown/60 text-sm">244 {tContext('reviews.experiences')}</p>
                </div>
              </div>
              <a
                href="https://www.booking.com/hotel/fr/les-suites-du-cygne.fr.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#003580] hover:underline text-sm font-medium"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.36 12.73c.1-.21.14-.43.14-.66 0-.65-.42-1.15-1-1.15-.42 0-.77.25-.93.62l-.02-.01c-.2-.98-.96-1.72-1.91-1.72-1.06 0-1.93.9-1.93 2.02s.87 2.02 1.93 2.02c.95 0 1.71-.74 1.91-1.72l.02-.01c.16.37.51.62.93.62.58 0 1-.5 1-1.15 0-.23-.04-.45-.14-.66l-.01.01zm-7.27-2.91c-1.06 0-1.93.9-1.93 2.02s.87 2.02 1.93 2.02 1.93-.9 1.93-2.02-.87-2.02-1.93-2.02zm-6.55 0c-1.06 0-1.93.9-1.93 2.02s.87 2.02 1.93 2.02 1.93-.9 1.93-2.02-.87-2.02-1.93-2.02zm-3.18 3.17c-.42 0-.77-.25-.93-.62l-.02.01c-.2.98-.96 1.72-1.91 1.72-1.06 0-1.93-.9-1.93-2.02s.87-2.02 1.93-2.02c.95 0 1.71.74 1.91 1.72l.02.01c.16-.37.51-.62.93-.62.58 0 1 .5 1 1.15 0 .23-.04.45-.14.66l.01-.01c-.1.21-.14.43-.14.66 0 .65.42 1.15 1 1.15"/>
                </svg>
                {tContext('reviews.onBooking')}
              </a>
            </div>
          </div>

          {/* Grille des avis */}
          <div className="grid md:grid-cols-3 gap-6">
            {bookingReviews.map((review, index) => (
              <div
                key={index}
                className="bg-cygne-cream p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-medium text-cygne-brown">{review.author}</p>
                    <p className="text-sm text-cygne-brown/60">{review.country}</p>
                  </div>
                  <div className="bg-[#003580] text-white font-bold px-3 py-1 rounded text-lg">
                    {review.rating}
                  </div>
                </div>
                <p className="text-cygne-brown/80 italic leading-relaxed">
                  "{review.text[language as keyof typeof review.text]}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION CTA RESERVATION */}
      <section className="py-20 px-6 bg-cygne-gold">
        <div className="max-w-4xl mx-auto text-center">
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
        </div>
      </section>

      {/* SECTION LOCALISATION AVEC CARTE */}
      <section className="py-20 md:py-32 px-6 bg-cygne-cream">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
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
          </div>

          <div className="h-[500px]">
            <Map />
          </div>
        </div>
      </section>
    </div>
  );
}
