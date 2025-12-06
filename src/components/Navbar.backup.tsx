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
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#EAE5D9]/95 py-2 shadow-sm' : 'bg-transparent py-4'}`}>
      {/* Language Selector - Top Right */}
      <div className="absolute top-2 right-6 z-50 hidden md:flex gap-2">
        <button
          onClick={() => setLanguage('fr')}
          className={`text-xs font-bold uppercase tracking-wider transition-colors ${
            language === 'fr' ? 'text-cygne-gold' : 'text-cygne-brown/50 hover:text-cygne-brown'
          }`}
        >
          FR
        </button>
        <span className="text-cygne-brown/30">|</span>
        <button
          onClick={() => setLanguage('en')}
          className={`text-xs font-bold uppercase tracking-wider transition-colors ${
            language === 'en' ? 'text-cygne-gold' : 'text-cygne-brown/50 hover:text-cygne-brown'
          }`}
        >
          EN
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
              filter: 'invert(22%) sepia(8%) saturate(1200%) hue-rotate(356deg) brightness(93%) contrast(88%)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = 'invert(63%) sepia(19%) saturate(618%) hue-rotate(358deg) brightness(92%) contrast(87%)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = 'invert(22%) sepia(8%) saturate(1200%) hue-rotate(356deg) brightness(93%) contrast(88%)';
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
                      : 'text-cygne-brown hover:text-cygne-gold'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden z-50 text-cygne-brown">
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
