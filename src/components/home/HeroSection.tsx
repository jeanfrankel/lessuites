'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/contexts/LanguageContext';

const CompactBookingWidget = dynamic(() => import('@/components/CompactBookingWidget'), {
    loading: () => (
        <div className="h-[550px] bg-white rounded-lg shadow-xl flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cygne-gold"></div>
        </div>
    ),
    ssr: false
});

export default function HeroSection({ heroData, ctaData }: { heroData: any, ctaData: any }) {
    const { language, t: tContext } = useLanguage();

    const t = (data: any, field: string) => {
        return data?.[field]?.[language] || data?.[field]?.fr || '';
    };

    if (!heroData) return null;

    return (
        <section className="relative w-full bg-cygne-cream pt-32 pb-16 px-6">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12 animate-fadeIn">
                    <p className="text-xs md:text-sm uppercase tracking-widest-xl mb-8 text-cygne-gold font-sans font-bold">
                        {t(heroData, 'location')}
                    </p>

                    <h1 className="text-5xl md:text-8xl font-serif mb-8 leading-[0.95] font-thin text-cygne-brown">
                        {t(heroData, 'title')}
                    </h1>

                    <p className="text-lg md:text-xl font-light tracking-wide mb-12 max-w-2xl mx-auto opacity-90 leading-relaxed">
                        {t(heroData, 'subtitle')}
                    </p>
                </div>

                <div className="mb-4">
                    <CompactBookingWidget />
                </div>

                <div className="flex justify-center mb-24">
                    <div className="bg-cygne-brown/5 border border-cygne-brown/10 px-8 py-4 rounded-lg text-center max-w-2xl">
                        <p className="text-cygne-brown text-base font-bold uppercase tracking-widest mb-1">
                            {t(ctaData, 'bestRate') || tContext('reviews.bestRate')}
                        </p>
                    </div>
                </div>

                <div className="flex justify-center">
                    <Link
                        href="/appartements"
                        className="group px-10 py-5 bg-cygne-brown text-white uppercase tracking-[0.2em] text-xs font-bold hover:bg-cygne-gold transition-all duration-500 rounded-sm relative overflow-hidden"
                    >
                        <span className="relative z-10">{t(heroData, 'cta')}</span>
                        <span className="absolute inset-0 bg-cygne-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
