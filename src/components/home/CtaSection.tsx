'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function CtaSection({ data, heroTitle }: { data: any, heroTitle: any }) {
    const { language, t: tContext } = useLanguage();

    const t = (field: string) => {
        return data?.[field]?.[language] || data?.[field]?.fr || '';
    };

    const title = heroTitle?.[language] || heroTitle?.fr || '';

    return (
        <section className="py-20 px-6 bg-cygne-gold">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 font-light">
                    {title}
                </h2>
                <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">
                    {t('text')}
                </p>

                <div className="flex justify-center mb-12">
                    <div className="bg-white/10 border border-white/20 px-8 py-4 rounded-lg text-center max-w-2xl backdrop-blur-sm">
                        <p className="text-white text-base font-bold uppercase tracking-widest">
                            {data?.bestRate?.[language] || data?.bestRate?.fr || tContext('reviews.bestRate')}
                        </p>
                    </div>
                </div>
                <a
                    href={`https://secure.reservit.com/engine/booking/2/254654/dates?langcode=${language === 'fr' ? 'FR' : language === 'de' ? 'DE' : language === 'zh' ? 'ZH' : 'EN'}`}
                    className="inline-block px-12 py-5 bg-white text-black uppercase tracking-[0.2em] text-sm font-bold hover:bg-cygne-brown hover:text-white transition-all duration-500 rounded-sm shadow-lg"
                >
                    {t('button')}
                </a>
            </div>
        </section>
    );
}
