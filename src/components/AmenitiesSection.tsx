'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Wifi, Users, Accessibility, ArrowUp, ShowerHead, ChefHat, Fan, WashingMachine, Tv, Calendar, Car, Dumbbell, Coffee, Store, ShieldCheck, MessageCircle, Home, Monitor, Trees, Building, MapPin } from 'lucide-react';

interface AmenitiesSectionProps {
    data: {
        title?: { fr?: string; en?: string };
        rating?: string;
        amenitiesCategories?: {
            title: string;
            icon?: string;
            items: string[];
        }[];
    };
}

// Map category titles to icons (simple heuristic)
const getIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('wifi') || t.includes('internet')) return <Wifi size={20} />;
    if (t.includes('cuisine')) return <ChefHat size={20} />;
    if (t.includes('bain') || t.includes('sanitaire')) return <ShowerHead size={20} />;
    if (t.includes('chambre') || t.includes('lit')) return <Home size={20} />;
    if (t.includes('salon')) return <Users size={20} />;
    if (t.includes('high-tech') || t.includes('télévision') || t.includes('tv')) return <Tv size={20} />; // Changed from Monitor to Tv for better fit
    if (t.includes('accessibilité') || t.includes('handicap')) return <Accessibility size={20} />;
    if (t.includes('ascenseur')) return <ArrowUp size={20} />;
    if (t.includes('climatisation') || t.includes('chauffage')) return <Fan size={20} />;
    if (t.includes('ménage') || t.includes('lave-linge')) return <WashingMachine size={20} />;
    if (t.includes('parking') || t.includes('voiture')) return <Car size={20} />;
    if (t.includes('activité') || t.includes('sport')) return <Dumbbell size={20} />;
    if (t.includes('restauration') || t.includes('café')) return <Coffee size={20} />;
    if (t.includes('boutique') || t.includes('commerce')) return <Store size={20} />;
    if (t.includes('sécurité')) return <ShieldCheck size={20} />;
    if (t.includes('langue')) return <MessageCircle size={20} />;
    if (t.includes('extérieur') || t.includes('vue')) return <Trees size={20} />;
    if (t.includes('bâtiment') || t.includes('immeuble')) return <Building size={20} />;
    if (t.includes('réception')) return <MapPin size={20} />; // Using MapPin as a generic icon for reception/location

    return <Home size={20} />;
};

export default function AmenitiesSection({ data }: AmenitiesSectionProps) {
    const { language } = useLanguage();

    if (!data || !data.amenitiesCategories) return null;

    const title = data.title?.[language as 'fr' | 'en'] || data.title?.fr || "Équipements";
    const rating = data.rating || "9,2";

    return (
        <div className="bg-cygne-cream py-24 px-6 border-t border-cygne-brown/5">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="flex flex-col items-center text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif text-cygne-brown mb-6 max-w-4xl">{title}</h2>
                    <p className="text-cygne-brown/70 leading-relaxed font-light text-lg max-w-2xl mb-10">
                        Des équipements haut de gamme soigneusement sélectionnés pour garantir votre confort et votre bien-être tout au long de votre séjour.
                    </p>

                    <div className="flex flex-col items-center gap-2">
                        <span className="text-cygne-gold text-xs uppercase tracking-[0.2em] font-bold">Avis clients</span>
                        <div className="flex items-center gap-4 bg-white/50 p-2 pl-6 rounded-sm border border-cygne-gold/20 shadow-sm">
                            <span className="text-cygne-brown font-serif italic text-lg">Excellents équipements !</span>
                            <span className="bg-cygne-brown text-cygne-cream font-serif text-xl px-4 py-2 rounded-sm min-w-[3.5rem] text-center">
                                {rating}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Categories Grid - Masonry-like layout using CSS columns */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-12 space-y-12">
                    {data.amenitiesCategories.map((category, idx) => (
                        <div key={idx} className="break-inside-avoid mb-12">
                            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-cygne-brown/10">
                                <div className="p-3 bg-white rounded-full shadow-sm text-cygne-gold border border-cygne-gold/10">
                                    {getIcon(category.title)}
                                </div>
                                <h3 className="font-serif text-xl text-cygne-brown">{category.title}</h3>
                            </div>

                            <ul className="space-y-3">
                                {category.items.map((item, itemIdx) => (
                                    <li key={itemIdx} className="flex items-start gap-4 text-cygne-brown/80 group hover:text-cygne-brown transition-colors">
                                        {/* Stylized bullet */}
                                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-cygne-gold flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
                                        <span className="leading-relaxed font-light">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
