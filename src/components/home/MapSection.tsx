'use client';

import dynamic from 'next/dynamic';
import { useLanguage } from '@/contexts/LanguageContext';

const Map = dynamic(() => import('@/components/Map'), {
    loading: () => <div className="h-[500px] bg-cygne-cream/50 animate-pulse rounded-lg" />,
    ssr: false
});

export default function MapSection({ data }: { data: any }) {
    const { language } = useLanguage();

    const t = (field: string) => {
        return data?.[field]?.[language] || data?.[field]?.fr || '';
    };

    return (
        <section className="py-20 md:py-32 px-6 bg-cygne-cream">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <span className="text-cygne-gold text-xs uppercase tracking-widest-xl mb-4 block font-bold">
                        {t('label')}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif text-cygne-brown font-light mb-6">
                        {t('title')}
                    </h2>
                    <p className="text-cygne-brown/70 text-lg max-w-2xl mx-auto">
                        {t('address')}<br />
                        <span className="text-sm">{t('subtitle')}</span>
                    </p>
                </div>

                <div className="h-[500px]">
                    <Map />
                </div>
            </div>
        </section>
    );
}
