'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Wifi, Users, Accessibility, ArrowUp, ShowerHead, ChefHat, Fan, WashingMachine, Tv, Calendar, Car, Dumbbell, Coffee, Store, ShieldCheck, MessageCircle, Home, Monitor, Trees, Building, MapPin } from 'lucide-react';

interface AmenitiesSectionProps {
    data: {
        title?: { fr?: string; en?: string; de?: string; zh?: string };
        rating?: string;
        intro?: { fr?: string; en?: string; de?: string; zh?: string };
        amenitiesCategories?: {
            title: string;
            icon?: string;
            items: (string | { fr?: string; en?: string; de?: string; zh?: string })[];
        }[];
    };
}

// Map category titles to icons (simple heuristic)
const getIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('wifi') || t.includes('internet')) return <Wifi size={20} />;
    if (t.includes('cuisine') || t.includes('kitchen')) return <ChefHat size={20} />;
    if (t.includes('bain') || t.includes('sanitaire') || t.includes('bath')) return <ShowerHead size={20} />;
    if (t.includes('chambre') || t.includes('lit') || t.includes('bed')) return <Home size={20} />;
    if (t.includes('salon') || t.includes('living')) return <Users size={20} />;
    if (t.includes('high-tech') || t.includes('télévision') || t.includes('tv') || t.includes('media')) return <Tv size={20} />;
    if (t.includes('accessibilité') || t.includes('handicap') || t.includes('accessibility')) return <Accessibility size={20} />;
    if (t.includes('ascenseur') || t.includes('elevator')) return <ArrowUp size={20} />;
    if (t.includes('climatisation') || t.includes('chauffage') || t.includes('heating')) return <Fan size={20} />;
    if (t.includes('ménage') || t.includes('lave-linge') || t.includes('cleaning')) return <WashingMachine size={20} />;
    if (t.includes('parking') || t.includes('voiture')) return <Car size={20} />;
    if (t.includes('activité') || t.includes('sport')) return <Dumbbell size={20} />;
    if (t.includes('restauration') || t.includes('café') || t.includes('dining')) return <Coffee size={20} />;
    if (t.includes('boutique') || t.includes('commerce') || t.includes('shop')) return <Store size={20} />;
    if (t.includes('sécurité') || t.includes('security')) return <ShieldCheck size={20} />;
    if (t.includes('langue') || t.includes('language')) return <MessageCircle size={20} />;
    if (t.includes('extérieur') || t.includes('vue') || t.includes('outside')) return <Trees size={20} />;
    if (t.includes('bâtiment') || t.includes('immeuble') || t.includes('building')) return <Building size={20} />;
    if (t.includes('réception') || t.includes('reception')) return <MapPin size={20} />;

    return <Home size={20} />;
};

// Hardcoded translations for Category Titles (since they are strings in CMS)
const categoryTranslations: Record<string, { en: string; de: string; zh: string }> = {
    "Ses points forts": { en: "Highlights", de: "Highlights", zh: "亮点" },
    "Idéal pour votre séjour": { en: "Perfect for your stay", de: "Ideal für Ihren Aufenthalt", zh: "最佳住宿体验" },
    "Parking": { en: "Parking", de: "Parkplatz", zh: "停车场" },
    "Internet": { en: "Internet", de: "Internet", zh: "网络" },
    "Cuisine": { en: "Kitchen", de: "Küche", zh: "厨房" },
    "Chambre": { en: "Bedroom", de: "Schlafzimmer", zh: "卧室" },
    "Salle de bains": { en: "Bathroom", de: "Badezimmer", zh: "浴室" },
    "Coin salon": { en: "Living Area", de: "Wohnbereich", zh: "休息区" },
    "High-tech": { en: "Media & Technology", de: "Medien & Technik", zh: "媒体与科技" },
    "Équipements en chambre": { en: "Room Amenities", de: "Zimmerausstattung", zh: "客房设施" },
    "Accessibilité": { en: "Accessibility", de: "Barrierefreiheit", zh: "无障碍" },
    "Caractéristiques du bâtiment": { en: "Building characteristics", de: "Gebäudemerkmale", zh: "建筑特色" },
    "Réception": { en: "Reception services", de: "Rezeptionsservice", zh: "前台服务" },
    "Services de nettoyage": { en: "Cleaning services", de: "Reinigungsservices", zh: "清洁服务" },
    "Services d'affaires": { en: "Business facilities", de: "Business-Einrichtungen", zh: "商务设施" },
    "Boutiques": { en: "Shops", de: "Geschäfte", zh: "商店" },
    "Divers": { en: "Miscellaneous", de: "Sonstiges", zh: "其他" },
    "Sécurité": { en: "Safety & Security", de: "Sicherheit", zh: "安全" },
    "Langues parlées": { en: "Languages spoken", de: "Gesprochene Sprachen", zh: "语言" }
};

// Hardcoded translations for amenity items (fallback for string items)
const itemTranslations: Record<string, { en: string; de: string; zh: string }> = {
    "Étages supérieurs accessibles par ascenseur": { en: "Upper floors accessible by elevator", de: "Obere Etagen mit Aufzug erreichbar", zh: "高层可乘电梯到达" },
    "Étages supérieurs accessibles uniquement par escaliers": { en: "Upper floors accessible by stairs only", de: "Obere Etagen nur über Treppen erreichbar", zh: "高层只能通过楼梯到达" },
    "Accessible aux personnes à mobilité réduite": { en: "Wheelchair accessible", de: "Rollstuhlgerecht", zh: "无障碍通道" },
    "Parking public à proximité": { en: "Public parking nearby", de: "Öffentlicher Parkplatz in der Nähe", zh: "附近有公共停车场" },
    "Parking privé": { en: "Private parking", de: "Privater Parkplatz", zh: "私人停车场" },
    "Wifi gratuit": { en: "Free WiFi", de: "Kostenloses WLAN", zh: "免费WiFi" },
    "WiFi": { en: "WiFi", de: "WLAN", zh: "无线网络" },
    "Climatisation": { en: "Air conditioning", de: "Klimaanlage", zh: "空调" },
    "Chauffage": { en: "Heating", de: "Heizung", zh: "暖气" },
    "Lave-linge": { en: "Washing machine", de: "Waschmaschine", zh: "洗衣机" },
    "Sèche-linge": { en: "Dryer", de: "Trockner", zh: "烘干机" },
    "Lave-vaisselle": { en: "Dishwasher", de: "Geschirrspüler", zh: "洗碗机" },
    "Réfrigérateur": { en: "Refrigerator", de: "Kühlschrank", zh: "冰箱" },
    "Four": { en: "Oven", de: "Backofen", zh: "烤箱" },
    "Micro-ondes": { en: "Microwave", de: "Mikrowelle", zh: "微波炉" },
    "Machine à café": { en: "Coffee machine", de: "Kaffeemaschine", zh: "咖啡机" },
    "Bouilloire": { en: "Kettle", de: "Wasserkocher", zh: "电热水壶" },
    "Grille-pain": { en: "Toaster", de: "Toaster", zh: "烤面包机" },
    "Ustensiles de cuisine": { en: "Kitchen utensils", de: "Küchenutensilien", zh: "厨房用具" },
    "Vaisselle et couverts": { en: "Dishes and cutlery", de: "Geschirr und Besteck", zh: "餐具" },
    "Télévision": { en: "Television", de: "Fernseher", zh: "电视" },
    "Télévision écran plat": { en: "Flat-screen TV", de: "Flachbildfernseher", zh: "平板电视" },
    "Netflix": { en: "Netflix", de: "Netflix", zh: "Netflix" },
    "Draps fournis": { en: "Bed linen provided", de: "Bettwäsche gestellt", zh: "提供床单" },
    "Serviettes fournies": { en: "Towels provided", de: "Handtücher gestellt", zh: "提供毛巾" },
    "Sèche-cheveux": { en: "Hair dryer", de: "Haartrockner", zh: "吹风机" },
    "Fer à repasser": { en: "Iron", de: "Bügeleisen", zh: "熨斗" },
    "Produits d'accueil": { en: "Toiletries", de: "Pflegeprodukte", zh: "洗漱用品" },
    "Douche": { en: "Shower", de: "Dusche", zh: "淋浴" },
    "Baignoire": { en: "Bathtub", de: "Badewanne", zh: "浴缸" },
    "Lit double": { en: "Double bed", de: "Doppelbett", zh: "双人床" },
    "Lits simples": { en: "Single beds", de: "Einzelbetten", zh: "单人床" },
    "Canapé-lit": { en: "Sofa bed", de: "Schlafsofa", zh: "沙发床" },
    "Vue sur la ville": { en: "City view", de: "Stadtblick", zh: "城市景观" },
    "Vue sur jardin": { en: "Garden view", de: "Gartenblick", zh: "花园景观" },
    "Balcon": { en: "Balcony", de: "Balkon", zh: "阳台" },
    "Terrasse": { en: "Terrace", de: "Terrasse", zh: "露台" },
    "Jardin": { en: "Garden", de: "Garten", zh: "花园" },
    "Non-fumeur": { en: "Non-smoking", de: "Nichtraucher", zh: "禁烟" },
    "Animaux acceptés": { en: "Pets allowed", de: "Haustiere erlaubt", zh: "允许携带宠物" },
    "Entrée privée": { en: "Private entrance", de: "Separater Eingang", zh: "独立入口" },
    "Insonorisé": { en: "Soundproofed", de: "Schallisoliert", zh: "隔音" },
    "Check-in autonome": { en: "Self check-in", de: "Selbst-Check-in", zh: "自助入住" },
    "Coffre-fort": { en: "Safe", de: "Safe", zh: "保险箱" },
    "Détecteur de fumée": { en: "Smoke detector", de: "Rauchmelder", zh: "烟雾探测器" },
    "Extincteur": { en: "Fire extinguisher", de: "Feuerlöscher", zh: "灭火器" },
    "Français": { en: "French", de: "Französisch", zh: "法语" },
    "Anglais": { en: "English", de: "Englisch", zh: "英语" },
    "Allemand": { en: "German", de: "Deutsch", zh: "德语" },
    "Ménage inclus": { en: "Cleaning included", de: "Reinigung inklusive", zh: "包含清洁服务" },
    "Ménage quotidien": { en: "Daily housekeeping", de: "Tägliche Reinigung", zh: "每日清洁" }
};

export default function AmenitiesSection({ data }: AmenitiesSectionProps) {
    const { language } = useLanguage();

    if (!data || !data.amenitiesCategories) return null;

    const title = data.title?.[language as 'fr' | 'en' | 'de' | 'zh'] || data.title?.fr || "Équipements";
    const intro = data.intro?.[language as 'fr' | 'en' | 'de' | 'zh'] || data.intro?.fr || "Des équipements haut de gamme soigneusement sélectionnés pour garantir votre confort et votre bien-être tout au long de votre séjour.";
    const rating = data.rating || "9,2";

    // Translations for UI elements
    const avisLabel = language === 'fr' ? 'Avis clients' : language === 'en' ? 'Guest Reviews' : language === 'de' ? 'Gästebewertungen' : '客人评价';
    const excellentLabel = language === 'fr' ? 'Excellents équipements !' : language === 'en' ? 'Excellent facilities!' : language === 'de' ? 'Ausgezeichnete Ausstattung!' : '设施一流！';

    return (
        <div className="bg-cygne-cream py-24 px-6 border-t border-cygne-brown/5">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="flex flex-col items-center text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif text-cygne-brown mb-6 max-w-4xl">{title}</h2>
                    <p className="text-cygne-brown/70 leading-relaxed font-light text-lg max-w-2xl mb-10">
                        {intro}
                    </p>

                    <div className="flex flex-col items-center gap-2">
                        <span className="text-cygne-gold text-xs uppercase tracking-[0.2em] font-bold">{avisLabel}</span>
                        <div className="flex items-center gap-4 bg-white/50 p-2 pl-6 rounded-sm border border-cygne-gold/20 shadow-sm">
                            <span className="text-cygne-brown font-serif italic text-lg">{excellentLabel}</span>
                            <span className="bg-cygne-brown text-cygne-cream font-serif text-xl px-4 py-2 rounded-sm min-w-[3.5rem] text-center">
                                {rating}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-12 space-y-12">
                    {data.amenitiesCategories.map((category, idx) => {
                        const translation = categoryTranslations[category.title];
                        const displayTitle = translation && (language === 'en' || language === 'de' || language === 'zh')
                            ? translation[language]
                            : category.title;

                        return (
                            <div key={idx} className="break-inside-avoid mb-12">
                                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-cygne-brown/10">
                                    <div className="p-3 bg-white rounded-full shadow-sm text-cygne-gold border border-cygne-gold/10">
                                        {getIcon(category.title)}
                                    </div>
                                    <h3 className="font-serif text-xl text-cygne-brown">{displayTitle}</h3>
                                </div>

                                <ul className="space-y-3">
                                    {category.items.map((item, itemIdx) => {
                                        let itemText: string;
                                        if (typeof item === 'string') {
                                            // Check if we have a translation for this string item
                                            const translation = itemTranslations[item];
                                            if (translation && (language === 'en' || language === 'de' || language === 'zh')) {
                                                itemText = translation[language];
                                            } else {
                                                itemText = item;
                                            }
                                        } else {
                                            itemText = item[language as 'fr' | 'en' | 'de' | 'zh'] || item.fr || '';
                                        }

                                        return (
                                            <li key={itemIdx} className="flex items-start gap-4 text-cygne-brown/80 group hover:text-cygne-brown transition-colors">
                                                {/* Stylized bullet */}
                                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-cygne-gold flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
                                                <span className="leading-relaxed font-light">{itemText}</span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}
