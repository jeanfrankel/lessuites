'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { siteConfig } from '@/data/content';

export default function Navbar() {
  const { t, language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Bloquer le scroll quand le menu mobile est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  // Utiliser la langue du contexte comme source de vérité pour la navigation
  const localePrefix = `/${language}`;

  const links = [
    { name: t('nav.home'), href: localePrefix }, // Toujours utiliser le préfixe (ex: /fr, /en) pour éviter les redirections
    { name: t('nav.apartments'), href: `${localePrefix}/appartements` },
    { name: t('nav.place'), href: `${localePrefix}/infos` },
    { name: t('nav.addresses'), href: `${localePrefix}/adresses` },
    { name: t('nav.extras'), href: `${localePrefix}/extras` },
    { name: t('nav.book'), href: `${localePrefix}/reservation` },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-cygne-brown/95 py-3 shadow-sm' : 'bg-cygne-brown py-4'}`}>
      {/* Language Selector - Top Right */}
      <div className="absolute top-2 right-6 z-50 hidden md:flex items-center gap-1">
        {[
          { code: 'fr', label: 'FR' },
          { code: 'en', label: 'EN' },
          { code: 'de', label: 'DE' },
          { code: 'zh', label: '中文' },
        ].map((lang, index, arr) => (
          <div key={lang.code} className="flex items-center">
            <button
              onClick={() => {
                setLanguage(lang.code as any);
                // Redirection vers la nouvelle locale
                // Enlève la locale actuelle du chemin s'il y en a une (ex: /en/extras -> /extras)
                const segments = pathname.split('/');
                // segments[0] est vide "", segments[1] est la locale actuelle si on est dans [lang]
                // Mais usePathname avec App Router renvoie le chemin complet

                // Si le chemin commence par une locale connue (fr, en, de, zh), on la remplace
                // Redirect logic
                const currentLocale = ['fr', 'en', 'de', 'zh'].find(l => pathname.startsWith(`/${l}`));
                let newPath = pathname;

                if (currentLocale) {
                  // Replace existing locale (e.g. /fr/extras -> /en/extras)
                  newPath = pathname.replace(`/${currentLocale}`, `/${lang.code}`);
                } else {
                  // No locale present (should rarely happen with middleware, but handle root)
                  // If root '/', make it '/en'
                  // If '/extras' (unlikely without middleware redir), make it '/en/extras'
                  newPath = `/${lang.code}${pathname === '/' ? '' : pathname}`;
                }

                window.location.href = newPath;
              }}
              className={`px-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${language === lang.code ? 'text-cygne-gold' : 'text-cygne-cream/50 hover:text-cygne-cream'
                }`}
            >
              {lang.label}
            </button>
            {index < arr.length - 1 && <span className="text-cygne-cream/30 text-xs">|</span>}
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-full">

        {/* Logo */}
        <Link
          href={localePrefix}
          onClick={() => setIsOpen(false)}
          className="block z-50 ml-4 md:ml-12"
        >
          <img
            src="/images/file.svg"
            alt="Les Suites du Cygne"
            className="h-20 w-auto transition-all duration-300"
            style={{
              filter: 'invert(91%) sepia(12%) saturate(410%) hue-rotate(357deg) brightness(98%) contrast(90%)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = 'invert(77%) sepia(13%) saturate(629%) hue-rotate(358deg) brightness(92%) contrast(87%)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = 'invert(91%) sepia(12%) saturate(410%) hue-rotate(357deg) brightness(98%) contrast(90%)';
            }}
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {/* Call Button - same style as Réserver */}
          <a
            href={`tel:${siteConfig.contact.mobile.replace(/\s/g, '')}`}
            className="flex items-center gap-2 px-5 py-2.5 bg-cygne-gold text-white uppercase tracking-[0.15em] text-xs font-bold hover:bg-cygne-gold/80 transition-all duration-300 rounded-sm mr-40"
          >
            <Phone size={14} />
            06 09 17 24 61
          </a>

          {links.map((link) => {
            const isActive = pathname === link.href;
            const isBooking = link.href.endsWith('/reservation');

            if (isBooking) {
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-5 py-2.5 bg-cygne-gold text-white uppercase tracking-[0.15em] text-xs font-bold hover:bg-cygne-gold/80 transition-all duration-300 rounded-sm"
                >
                  {link.name}
                </Link>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-xs uppercase tracking-[0.15em] font-bold transition-colors ${isActive
                  ? 'text-cygne-gold'
                  : 'text-cygne-cream hover:text-cygne-gold'
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className={`md:hidden z-50 transition-colors ${isOpen ? 'text-cygne-brown' : 'text-cygne-cream'}`}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Fullscreen */}
        <div className={`fixed inset-0 bg-cygne-cream flex flex-col items-center justify-center gap-4 transition-transform duration-500 ease-in-out md:hidden z-40 overflow-hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          {/* Language Selector Mobile */}
          <div className="flex gap-3">
            {[
              { code: 'fr', label: 'FR' },
              { code: 'en', label: 'EN' },
              { code: 'de', label: 'DE' },
              { code: 'zh', label: '中文' },
            ].map((lang, index, arr) => (
              <div key={lang.code} className="flex items-center">
                <button
                  onClick={() => {
                    setLanguage(lang.code as any);
                    setIsOpen(false);
                    const currentLocale = ['fr', 'en', 'de', 'zh'].find(l => pathname.startsWith(`/${l}`));
                    let newPath = pathname;

                    if (currentLocale) {
                      newPath = pathname.replace(`/${currentLocale}`, `/${lang.code}`);
                    } else {
                      newPath = `/${lang.code}${pathname === '/' ? '' : pathname}`;
                    }

                    window.location.href = newPath;
                  }}
                  className={`text-sm font-bold uppercase tracking-wider transition-colors ${language === lang.code ? 'text-cygne-gold' : 'text-cygne-brown/50'
                    }`}
                >
                  {lang.label}
                </button>
                {index < arr.length - 1 && <span className="text-cygne-brown/30 mx-1">|</span>}
              </div>
            ))}
          </div>

          {/* Call Button - Mobile */}
          <a
            href={`tel:${siteConfig.contact.mobile.replace(/\s/g, '')}`}
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 px-8 py-3 bg-cygne-gold text-white text-lg font-serif hover:bg-cygne-brown transition-all duration-300 rounded-sm mb-2"
          >
            <Phone size={16} />
            {t('nav.call')}
          </a>

          {links.map((link) => {
            const isActive = pathname === link.href;
            const isBooking = link.href.endsWith('/reservation');

            if (isBooking) {
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-8 py-3 bg-cygne-gold text-white uppercase tracking-[0.15em] text-sm font-bold hover:bg-cygne-gold/80 transition-all duration-300 rounded-sm"
                >
                  {link.name}
                </Link>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-xl font-serif transition-colors ${isActive
                  ? 'text-cygne-gold'
                  : 'text-cygne-brown'
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
