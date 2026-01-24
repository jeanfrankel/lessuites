'use client';

import Carousel from '@/components/Carousel';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ColmarSection({ data }: { data: any }) {
    const { language } = useLanguage();

    const t = (field: string) => {
        return data?.[field]?.[language] || data?.[field]?.fr || '';
    };

    const images = data?.gallery || [];

    return (
        <section className="pt-32 md:pt-10 pb-24 md:pb-32 px-6 bg-cygne-brown">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-cygne-gold text-xs uppercase tracking-widest-xl mb-4 block font-bold">
                        {t('title')}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif text-white font-light">
                        {t('subtitle')}
                    </h2>
                </div>

                <div className="shadow-2xl border border-cygne-brown/10">
                    {images.length > 0 ? (
                        <Carousel
                            images={images}
                            autoplay={true}
                            interval={4000}
                            defaultAlt="Vue de Colmar - Ville pittoresque d'Alsace"
                        />
                    ) : (
                        <div className="h-[500px] bg-cygne-cream/10 flex items-center justify-center text-white">
                            Uploadez des images dans Sanity Studio
                        </div>
                    )}
                </div>

                <p className="text-center mt-8 text-white/90 text-sm italic">
                    {t('caption')}
                </p>
            </div>
        </section>
    );
}
