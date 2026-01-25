'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

interface PageData {
  title: { fr: string; en: string; de: string; zh: string };
  lastUpdate: string;
  articles: Array<{
    _key: string;
    numero: string;
    titre: { fr: string; en: string; de: string; zh: string };
    contenu: { fr: string; en: string; de: string; zh: string };
  }>;
  contact: {
    nom: string;
    adresse: string;
    email: string;
    telephone: string;
  };
}

export default function ConditionsGeneralesClient({ pageData }: { pageData: PageData }) {
  const { language } = useLanguage();

  const title = pageData?.title?.[language] || pageData?.title?.fr || 'Conditions Générales de Vente';

  const contactTitle: { [key: string]: string } = {
    fr: 'Contact',
    en: 'Contact',
    de: 'Kontakt',
    zh: '联系方式',
  };

  return (
    <div className="bg-cygne-cream min-h-screen">
      <div className="pt-40 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif text-cygne-brown mb-4 text-center">
            {title}
          </h1>
          <p className="text-cygne-brown/60 text-center mb-16 text-sm">
            {language === 'fr' && `Dernière mise à jour : ${pageData?.lastUpdate}`}
            {language === 'en' && `Last updated: ${pageData?.lastUpdate}`}
            {language === 'de' && `Letzte Aktualisierung: ${pageData?.lastUpdate}`}
            {language === 'zh' && `最后更新：${pageData?.lastUpdate}`}
          </p>

          <div className="prose prose-stone max-w-none space-y-10 text-cygne-brown/80">

            {/* ARTICLES DYNAMIQUES */}
            {pageData?.articles?.map((article) => (
              <section key={article._key}>
                <h2 className="text-2xl font-serif text-cygne-brown border-b border-cygne-gold/30 pb-2 mb-6">
                  {article.numero} - {article.titre?.[language] || article.titre?.fr}
                </h2>
                <div className="whitespace-pre-line">
                  {article.contenu?.[language] || article.contenu?.fr}
                </div>
              </section>
            ))}

            {/* CONTACT */}
            <section>
              <h2 className="text-2xl font-serif text-cygne-brown border-b border-cygne-gold/30 pb-2 mb-6">
                {contactTitle[language]}
              </h2>
              <p>
                <strong>{pageData?.contact?.nom}</strong><br />
                {pageData?.contact?.adresse?.split('\n').map((line, i) => (
                  <span key={i}>{line}<br /></span>
                ))}
                Email : <a href={`mailto:${pageData?.contact?.email}`} className="text-cygne-gold hover:underline">{pageData?.contact?.email}</a><br />
                {language === 'fr' ? 'Téléphone' : language === 'de' ? 'Telefon' : 'Phone'} : {pageData?.contact?.telephone}
              </p>
            </section>

            {/* LIENS */}
            <section className="pt-6 border-t border-cygne-gold/30">
              <ul className="space-y-2">
                <li>
                  <Link href="/mentions-legales" className="text-cygne-gold hover:underline">
                    → {language === 'fr' ? 'Mentions Légales' : language === 'en' ? 'Legal Notice' : language === 'de' ? 'Impressum' : '法律声明'}
                  </Link>
                </li>
                <li>
                  <Link href="/politique-confidentialite" className="text-cygne-gold hover:underline">
                    → {language === 'fr' ? 'Politique de Confidentialité' : language === 'en' ? 'Privacy Policy' : language === 'de' ? 'Datenschutzerklärung' : '隐私政策'}
                  </Link>
                </li>
              </ul>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
