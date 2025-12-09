'use client';

import SuiteCard from '@/components/SuiteCard';
import { suites } from '@/data/content';
import { suitesEn } from '@/data/content-en';
import { suitesDe } from '@/data/content-de';
import { suitesZh } from '@/data/content-zh';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AppartementsPage() {
  const { t, language } = useLanguage();
  const currentSuites =
    language === 'en' ? suitesEn :
    language === 'de' ? suitesDe :
    language === 'zh' ? suitesZh :
    suites;

  return (
    <div className="bg-cygne-cream min-h-screen">
      {/* Header Beige */}
      <div className="pt-40 pb-12 px-6 text-center">
        <h1 className="text-5xl font-serif mb-4 text-cygne-brown">{t('apartments.title')}</h1>
        <p className="text-cygne-brown uppercase tracking-[0.2em] text-xs font-bold opacity-70">
            {t('apartments.subtitle')}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
            {currentSuites.map((suite) => (
                <SuiteCard key={suite.id} suite={suite} />
            ))}
        </div>
        <div className="mt-20 text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-serif text-cygne-brown mb-4">{t('apartments.servicesTitle')}</h3>
            <p className="text-cygne-brown/70 leading-relaxed">
                {t('apartments.servicesText')}
            </p>
        </div>
      </div>
    </div>
  );
}