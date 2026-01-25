'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PhilosophySection({ data }: { data: any }) {
    const { language } = useLanguage();

    const t = (field: string) => {
        return data?.[field]?.[language] || data?.[field]?.fr || '';
    };

    return (
        <section className="py-36 px-6 bg-white">
            <div className="max-w-3xl mx-auto text-center">
                <span className="text-cygne-gold text-xs uppercase tracking-widest-xl mb-6 block font-bold">
                    {t('label')}
                </span>

                <h2 className="text-4xl md:text-6xl font-serif text-cygne-brown mb-12 leading-tight font-light">
                    {t('title')}
                </h2>

                <div className="w-[1px] h-20 bg-cygne-gold mx-auto mb-12" />

                <p className="text-cygne-brown/80 text-lg md:text-xl leading-loose font-light mb-10 max-w-2xl mx-auto">
                    {t('text')}
                </p>

                <Link
                    href={`/${language}/infos`}
                    className="group inline-block text-cygne-brown border-b border-cygne-brown/30 pb-1 hover:text-cygne-gold hover:border-cygne-gold transition-all duration-400 uppercase tracking-widest text-xs"
                >
                    {t('link')}
                    <span className="inline-block ml-2 group-hover:translate-x-2 transition-transform duration-400">→</span>
                </Link>
            </div>
        </section>
    );
}
