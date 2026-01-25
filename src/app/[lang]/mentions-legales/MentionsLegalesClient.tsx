'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

interface PageData {
  title: { fr: string; en: string; de: string; zh: string };
  lastUpdate: string;
  editeur: {
    nom: string;
    adresse: string;
    telephone: string;
    rcs: string;
    siret: string;
    ape: string;
    tva: string;
    siteWeb: string;
  };
  directeurPublication: {
    nom: string;
    societe: string;
    adresse: string;
  };
  hebergeur: {
    nom: string;
    adresse: string;
    siteWeb: string;
  };
  sections: Array<{
    _key: string;
    titre: { fr: string; en: string; de: string; zh: string };
    contenu: { fr: string; en: string; de: string; zh: string };
  }>;
  contactEmail: string;
}

export default function MentionsLegalesClient({ pageData }: { pageData: PageData }) {
  const { language } = useLanguage();

  const title = pageData?.title?.[language] || pageData?.title?.fr || 'Mentions Légales';

  const sectionTitles: { [key: string]: { fr: string; en: string; de: string; zh: string } } = {
    editeur: { fr: 'Éditeur du site', en: 'Website Publisher', de: 'Herausgeber der Website', zh: '网站编辑' },
    directeur: { fr: 'Responsable éditorial / Directeur de la publication', en: 'Editorial Manager / Publication Director', de: 'Redaktionsleiter / Veröffentlichungsdirektor', zh: '编辑负责人 / 出版主任' },
    hebergeur: { fr: 'Hébergement', en: 'Hosting', de: 'Hosting', zh: '托管' },
    documents: { fr: 'Documents complémentaires', en: 'Additional Documents', de: 'Ergänzende Dokumente', zh: '补充文件' },
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

            {/* ÉDITEUR DU SITE */}
            <section>
              <h2 className="text-2xl font-serif text-cygne-brown border-b border-cygne-gold/30 pb-2 mb-6">
                {sectionTitles.editeur[language]}
              </h2>
              <p>
                <strong>{pageData?.editeur?.nom}</strong><br />
                {pageData?.editeur?.adresse?.split('\n').map((line, i) => (
                  <span key={i}>{line}<br /></span>
                ))}
                {language === 'fr' ? 'Tél.' : language === 'de' ? 'Tel.' : 'Phone'} : {pageData?.editeur?.telephone}
              </p>
              <p className="mt-4">
                RCS : {pageData?.editeur?.rcs}<br />
                SIRET : {pageData?.editeur?.siret}<br />
                APE : {pageData?.editeur?.ape}<br />
                {language === 'fr' ? 'N° TVA intracommunautaire' : 'VAT Number'} : {pageData?.editeur?.tva}
              </p>
              <p className="mt-4">
                {language === 'fr' ? 'Site web' : 'Website'} : <a href={pageData?.editeur?.siteWeb} className="text-cygne-gold hover:underline">{pageData?.editeur?.siteWeb}</a>
              </p>
            </section>

            {/* DIRECTEUR DE PUBLICATION */}
            <section>
              <h2 className="text-2xl font-serif text-cygne-brown border-b border-cygne-gold/30 pb-2 mb-6">
                {sectionTitles.directeur[language]}
              </h2>
              <p>
                <strong>{pageData?.directeurPublication?.nom}</strong><br />
                {pageData?.directeurPublication?.societe}<br />
                {pageData?.directeurPublication?.adresse?.split('\n').map((line, i) => (
                  <span key={i}>{line}<br /></span>
                ))}
              </p>
            </section>

            {/* HÉBERGEMENT */}
            <section>
              <h2 className="text-2xl font-serif text-cygne-brown border-b border-cygne-gold/30 pb-2 mb-6">
                {sectionTitles.hebergeur[language]}
              </h2>
              <p>
                <strong>{pageData?.hebergeur?.nom}</strong><br />
                {pageData?.hebergeur?.adresse?.split('\n').map((line, i) => (
                  <span key={i}>{line}<br /></span>
                ))}
                {language === 'fr' ? 'Site web' : 'Website'} : <a href={pageData?.hebergeur?.siteWeb} target="_blank" rel="noopener noreferrer" className="text-cygne-gold hover:underline">{pageData?.hebergeur?.siteWeb}</a>
              </p>
            </section>

            {/* SECTIONS DYNAMIQUES */}
            {pageData?.sections?.map((section) => (
              <section key={section._key}>
                <h2 className="text-2xl font-serif text-cygne-brown border-b border-cygne-gold/30 pb-2 mb-6">
                  {section.titre?.[language] || section.titre?.fr}
                </h2>
                <div className="whitespace-pre-line">
                  {section.contenu?.[language] || section.contenu?.fr}
                </div>
              </section>
            ))}

            {/* LIENS */}
            <section className="pt-6 border-t border-cygne-gold/30">
              <h2 className="text-2xl font-serif text-cygne-brown mb-6">
                {sectionTitles.documents[language]}
              </h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/politique-confidentialite" className="text-cygne-gold hover:underline">
                    → {language === 'fr' ? 'Politique de Confidentialité' : language === 'en' ? 'Privacy Policy' : language === 'de' ? 'Datenschutzerklärung' : '隐私政策'}
                  </Link>
                </li>
                <li>
                  <Link href="/conditions-generales" className="text-cygne-gold hover:underline">
                    → {language === 'fr' ? 'Conditions Générales de Vente' : language === 'en' ? 'Terms and Conditions' : language === 'de' ? 'Allgemeine Geschäftsbedingungen' : '销售条款'}
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
