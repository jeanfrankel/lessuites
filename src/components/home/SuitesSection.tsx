'use client';

import Link from 'next/link';
import Carousel from '@/components/Carousel';
import { useLanguage } from '@/contexts/LanguageContext';

export default function SuitesSection({ data }: { data: any }) {
    const { language } = useLanguage();

    const t = (field: string) => {
        return data?.[field]?.[language] || data?.[field]?.fr || '';
    };

    const images = data?.gallery || [];
    const altTexts = images.map((_: any, index: number) => `Suite ${index + 1} - Les Suites du Cygne à Colmar`);

    return (
        <section className="grid md:grid-cols-2 min-h-[650px]">
            <div className="bg-cygne-brown text-white flex flex-col justify-center items-center p-16 md:p-20 text-center">
                <h3 className="text-5xl md:text-6xl font-serif mb-8 font-light">
                    {t('title')}
                </h3>

                <p className="mb-12 max-w-sm font-light leading-loose text-white/90 text-lg">
                    {t('text')}
                </p>

                <Link
                    href="/appartements"
                    className="group inline-block px-10 py-4 border border-white/40 hover:bg-white hover:text-cygne-brown transition-all duration-500 uppercase tracking-widest text-xs relative overflow-hidden"
                >
                    <span className="relative z-10">{t('link')}</span>
                </Link>
            </div>

            <div className="bg-stone-200 relative min-h-[450px] md:min-h-[650px]">
                <Carousel
                    images={images}
                    autoplay={true}
                    interval={5000}
                    className="h-full"
                    aspectRatio="aspect-auto min-h-[450px] md:min-h-[650px]"
                    altTexts={altTexts}
                />
            </div>
        </section>
    );
}
