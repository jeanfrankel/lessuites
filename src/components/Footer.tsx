'use client';

import { siteConfig } from '@/data/content';
import { Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t, language } = useLanguage();

  const localePrefix = `/${language}`;

  return (
    <footer className="bg-cygne-brown text-cygne-cream pt-20 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 mb-16">

        {/* Marque */}
        <div className="space-y-6">
          <Link
            href={localePrefix}
            className="block mb-4 w-56 hover:opacity-90 transition-opacity duration-300"
          >
            <Image
              src="/images/file.svg"
              alt="Les Suites du Cygne - Appartements de charme à Colmar"
              width={224}
              height={150}
              className="w-full h-auto transition-all duration-300"
              style={{
                maxHeight: '150px',
                filter: 'invert(91%) sepia(12%) saturate(410%) hue-rotate(357deg) brightness(98%) contrast(90%)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = 'invert(77%) sepia(13%) saturate(629%) hue-rotate(358deg) brightness(92%) contrast(87%)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = 'invert(91%) sepia(12%) saturate(410%) hue-rotate(357deg) brightness(98%) contrast(90%)';
              }}
              priority
            />
          </Link>
          <p className="text-sm leading-loose opacity-80 max-w-xs font-light mb-6">
            {t('footer.description')}
          </p>
          <Link
            href={`${localePrefix}/reservation`}
            className="inline-block px-6 py-3 bg-cygne-gold text-white uppercase tracking-[0.15em] text-xs font-bold hover:bg-white hover:text-cygne-brown transition-all duration-300 rounded-sm"
          >
            {t('footer.book')}
          </Link>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-cygne-gold text-xs uppercase tracking-[0.2em] font-bold mb-8">{t('footer.navigation')}</h4>
          <ul className="space-y-4 text-sm font-light">
            <li><Link href={localePrefix} className="hover:text-cygne-gold transition-colors">{t('footer.home')}</Link></li>
            <li><Link href={`${localePrefix}/appartements`} className="hover:text-cygne-gold transition-colors">{t('footer.ourApartments')}</Link></li>
            <li><Link href={`${localePrefix}/infos`} className="hover:text-cygne-gold transition-colors">{t('footer.placeAccess')}</Link></li>
            <li><Link href={`${localePrefix}/adresses`} className="hover:text-cygne-gold transition-colors">{t('footer.discoverColmar')}</Link></li>
            <li><Link href={`${localePrefix}/extras`} className="hover:text-cygne-gold transition-colors">{t('footer.extras')}</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-cygne-gold text-xs uppercase tracking-[0.2em] font-bold mb-8">{t('footer.contact')}</h4>
          <div className="space-y-4 text-sm font-light">
            <a href={`tel:${siteConfig.contact.mobile}`} className="flex items-center gap-3 hover:text-cygne-gold transition-colors">
              <Phone size={16} className="text-cygne-gold" />
              {siteConfig.contact.phone}
            </a>
            <a href={`mailto:${siteConfig.contact.emailClient}`} className="flex items-center gap-3 hover:text-cygne-gold transition-colors">
              <Mail size={16} className="text-cygne-gold" />
              {siteConfig.contact.emailClient}
            </a>
            <div className="flex items-start gap-3 opacity-80">
              <MapPin size={16} className="text-cygne-gold shrink-0 mt-1" />
              <span className="max-w-[200px]">{siteConfig.contact.address}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-60">
        <p>© {new Date().getFullYear()} {siteConfig.name}.</p>
        <div className="flex gap-4">
          <Link href={`${localePrefix}/mentions-legales`} className="hover:text-cygne-gold transition-colors">Mentions légales</Link>
          <Link href={`${localePrefix}/politique-confidentialite`} className="hover:text-cygne-gold transition-colors">Confidentialité</Link>
          <Link href={`${localePrefix}/conditions-generales`} className="hover:text-cygne-gold transition-colors">CGV</Link>
        </div>
      </div>
    </footer>
  );
}