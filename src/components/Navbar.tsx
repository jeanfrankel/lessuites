'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

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

  const links = [
    { name: t('nav.apartments'), href: '/appartements' },
    { name: t('nav.place'), href: '/infos' },
    { name: t('nav.addresses'), href: '/adresses' },
    { name: t('nav.book'), href: '/reservation' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-cygne-brown/95 py-2 shadow-sm' : 'bg-cygne-brown py-4'}`}>
      {/* Language Selector - Top Right */}
      <div className="absolute top-2 right-6 z-50 hidden md:flex gap-2">
        <button
          onClick={() => setLanguage('fr')}
          className={`text-xs font-bold uppercase tracking-wider transition-colors ${
            language === 'fr' ? 'text-cygne-gold' : 'text-cygne-cream/50 hover:text-cygne-cream'
          }`}
        >
          FR
        </button>
        <span className="text-cygne-cream/30">|</span>
        <button
          onClick={() => setLanguage('en')}
          className={`text-xs font-bold uppercase tracking-wider transition-colors ${
            language === 'en' ? 'text-cygne-gold' : 'text-cygne-cream/50 hover:text-cygne-cream'
          }`}
        >
          EN
        </button>
        <span className="text-cygne-cream/30">|</span>
        <button
          onClick={() => setLanguage('de')}
          className={`text-xs font-bold uppercase tracking-wider transition-colors ${
            language === 'de' ? 'text-cygne-gold' : 'text-cygne-cream/50 hover:text-cygne-cream'
          }`}
        >
          DE
        </button>
        <span className="text-cygne-cream/30">|</span>
        <button
          onClick={() => setLanguage('zh')}
          className={`text-xs font-bold uppercase tracking-wider transition-colors ${
            language === 'zh' ? 'text-cygne-gold' : 'text-cygne-cream/50 hover:text-cygne-cream'
          }`}
        >
          中文
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

        {/* Logo */}
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="z-50 block ml-8 group"
          style={{ width: '240px', height: 'auto' }}
        >
          <img
            src="/images/file.svg"
            alt="Les Suites du Cygne"
            className="w-full h-auto transition-all duration-300"
            style={{
              maxHeight: '80px',
              width: 'auto',
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
        <div className="hidden md:flex gap-12 items-center mt-6">
            {links.map((link, index) => {
              const isActive = pathname === link.href;
              const isBooking = link.href === '/reservation';

              if (isBooking) {
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="px-6 py-3 bg-cygne-gold text-white uppercase tracking-[0.15em] text-xs font-bold hover:bg-cygne-brown transition-all duration-300 rounded-sm shadow-sm"
                  >
                    {link.name}
                  </Link>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs uppercase tracking-[0.15em] font-bold transition-colors ${
                    isActive
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
        <div className={`fixed inset-0 bg-cygne-cream flex flex-col items-center justify-center gap-8 transition-transform duration-500 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            {/* Language Selector Mobile */}
            <div className="flex gap-3 mb-4">
              <button
                onClick={() => setLanguage('fr')}
                className={`text-sm font-bold uppercase tracking-wider transition-colors ${
                  language === 'fr' ? 'text-cygne-gold' : 'text-cygne-brown/50'
                }`}
              >
                FR
              </button>
              <span className="text-cygne-brown/30">|</span>
              <button
                onClick={() => setLanguage('en')}
                className={`text-sm font-bold uppercase tracking-wider transition-colors ${
                  language === 'en' ? 'text-cygne-gold' : 'text-cygne-brown/50'
                }`}
              >
                EN
              </button>
              <span className="text-cygne-brown/30">|</span>
              <button
                onClick={() => setLanguage('de')}
                className={`text-sm font-bold uppercase tracking-wider transition-colors ${
                  language === 'de' ? 'text-cygne-gold' : 'text-cygne-brown/50'
                }`}
              >
                DE
              </button>
              <span className="text-cygne-brown/30">|</span>
              <button
                onClick={() => setLanguage('zh')}
                className={`text-sm font-bold uppercase tracking-wider transition-colors ${
                  language === 'zh' ? 'text-cygne-gold' : 'text-cygne-brown/50'
                }`}
              >
                中文
              </button>
            </div>

            {links.map((link) => {
              const isActive = pathname === link.href;
              const isBooking = link.href === '/reservation';

              if (isBooking) {
                return (
                  <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="px-8 py-4 bg-cygne-gold text-white text-xl font-serif hover:bg-cygne-brown transition-all duration-300 rounded-sm"
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
                    className={`text-2xl font-serif transition-colors ${
                      isActive
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
