import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

// Charger les variables d'environnement
dotenv.config({ path: '.env.local' })

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    token: process.env.SANITY_API_TOKEN!,
    apiVersion: '2024-01-01',
    useCdn: false,
})

async function translateAllAmenities() {
    console.log('🚀 Translating All Amenities to EN, DE, ZH...');

    // Mapping des traductions pour chaque élément
    // Ceci est une map simplifiée, idéalement on utiliserait une API de trad mais ici on hardcode pour la qualité
    const translations: Record<string, { en: string; de: string; zh: string }> = {
        // Points forts
        "Connexion Wi-Fi gratuite": { en: "Free Wi-Fi", de: "Kostenloses WLAN", zh: "免费WiFi" },
        "Chambres familiales": { en: "Family rooms", de: "Familienzimmer", zh: "家庭房" },
        "Chambres non-fumeurs": { en: "Non-smoking rooms", de: "Nichtraucherzimmer", zh: "禁烟客房" },
        "Équipements pour les personnes handicapées": { en: "Facilities for disabled guests", de: "Einrichtungen für behinderte Gäste", zh: "残疾人设施" },
        "Ascenseur": { en: "Elevator", de: "Aufzug", zh: "电梯" },

        // Salle de bain / Idéal séjour
        "Salle de bains privative": { en: "Private bathroom", de: "Eigenes Badezimmer", zh: "私人浴室" },
        "Baignoire": { en: "Bathtub", de: "Badewanne", zh: "浴缸" },
        "Climatisation": { en: "Air conditioning", de: "Klimaanlage", zh: "空调" },
        "Télévision à écran plat": { en: "Flat-screen TV", de: "Flachbild-TV", zh: "平板电视" },
        "Lave-linge": { en: "Washing machine", de: "Waschmaschine", zh: "洗衣机" },

        // Parking
        "L'établissement ne dispose pas de parking.": {
            en: "No parking available at the property.",
            de: "Die Unterkunft verfügt über keine Parkplätze.",
            zh: "酒店不提供停车位。"
        },

        // Internet
        "Une connexion Wi-Fi est disponible dans les chambres gratuitement.": {
            en: "WiFi is available in all areas and is free of charge.",
            de: "WLAN ist in allen Bereichen nutzbar und ist kostenfrei.",
            zh: "所有区域均提供免费WiFi。"
        },

        // Cuisine
        "Chaise haute pour enfants": { en: "High chair", de: "Hochstuhl", zh: "儿童高脚椅" },
        "Table à manger": { en: "Dining table", de: "Esstisch", zh: "餐桌" },
        "Machine à café": { en: "Coffee machine", de: "Kaffeemaschine", zh: "咖啡机" },
        "Produits ménagers": { en: "Cleaning products", de: "Reinigungsmittel", zh: "清洁用品" },
        "Grille-pain": { en: "Toaster", de: "Toaster", zh: "烤面包机" },
        "Plaque de cuisson": { en: "Stovetop", de: "Herdplatte", zh: "炉灶" },
        "Four": { en: "Oven", de: "Backofen", zh: "烤箱" },
        "Sèche-linge": { en: "Tumble dryer", de: "Wäschetrockner", zh: "干衣机" },
        "Ustensiles de cuisine": { en: "Kitchenware", de: "Küchenutensilien", zh: "厨房用具" },
        "Bouilloire électrique": { en: "Electric kettle", de: "Wasserkocher", zh: "电烧水壶" },
        "Cuisine": { en: "Kitchen", de: "Küche", zh: "厨房" },
        "Lave-vaisselle": { en: "Dishwasher", de: "Spülmaschine", zh: "洗碗机" },
        "Micro-ondes": { en: "Microwave", de: "Mikrowelle", zh: "微波炉" },
        "Réfrigérateur": { en: "Refrigerator", de: "Kühlschrank", zh: "冰箱" },

        // Chambre
        "Linge de maison": { en: "Linens", de: "Bettwäsche", zh: "床单" },
        "Armoire ou penderie": { en: "Wardrobe or closet", de: "Schrank", zh: "衣柜" },
        "Dressing": { en: "Dressing room", de: "Ankleidezimmer", zh: "更衣室" },
        "Lit": { en: "Bed", de: "Bett", zh: "床" },

        // SDB suite
        "Papier toilette": { en: "Toilet paper", de: "Toilettenpapier", zh: "卫生纸" },
        "Serviettes": { en: "Towels", de: "Handtücher", zh: "毛巾" },
        "Salle de bains supplémentaire": { en: "Additional bathroom", de: "Zusätzliches Badezimmer", zh: "额外浴室" },
        "Serviettes / linge de lit (frais supplémentaires)": { en: "Towels/Sheets (extra fee)", de: "Handtücher/Bettwäsche (gegen Aufpreis)", zh: "毛巾/床单（额外收费）" },
        "Toilettes supplémentaires": { en: "Additional toilet", de: "Zusätzliches WC", zh: "额外卫生间" },
        "Toilettes": { en: "Toilet", de: "WC", zh: "卫生间" },
        "Articles de toilette gratuits": { en: "Free toiletries", de: "Kostenlose Pflegeprodukte", zh: "免费洗浴用品" },
        "Sèche-cheveux": { en: "Hairdryer", de: "Haartrockner", zh: "吹风机" },
        "Douche": { en: "Shower", de: "Dusche", zh: "淋浴" },

        // Salon
        "Coin repas": { en: "Dining area", de: "Essbereich", zh: "用餐区" },
        "Canapé": { en: "Sofa", de: "Sofa", zh: "沙发" },
        "Coin salon": { en: "Seating Area", de: "Sitzbereich", zh: "休息区" },
        "Bureau": { en: "Desk", de: "Schreibtisch", zh: "书桌" },

        // High Tech
        "Service de streaming (ex. Netflix)": { en: "Streaming service (like Netflix)", de: "Streaming-Dienste (z.B. Netflix)", zh: "流媒体服务（如Netflix）" },
        "Lecteur Blu-ray": { en: "Blu-ray player", de: "Blu-ray-Player", zh: "蓝光播放器" },
        "Console de jeux": { en: "Game console", de: "Spielekonsole", zh: "游戏机" },
        "Chaînes du câble": { en: "Cable channels", de: "Kabelkanäle", zh: "有线频道" },
        "Chaînes satellite": { en: "Satellite channels", de: "Satellitenkanäle", zh: "卫星频道" },
        "Jeux vidéo": { en: "Video games", de: "Videospiele", zh: "电子游戏" },
        "Lecteur DVD": { en: "DVD player", de: "DVD-Player", zh: "DVD播放机" },
        "Radio": { en: "Radio", de: "Radio", zh: "收音机" },
        "Télévision": { en: "TV", de: "TV", zh: "电视" },

        // Room amenities
        "Prise près du lit": { en: "Socket near the bed", de: "Steckdose in Bettnähe", zh: "床头插座" },
        "Canapé-lit": { en: "Sofa bed", de: "Schlafsofa", zh: "沙发床" },
        "Étendoir": { en: "Clothes rack", de: "Wäscheständer", zh: "晾衣架" },
        "Portant": { en: "Clothes rack", de: "Kleiderständer", zh: "衣架" },
        "Sol carrelé / en marbre": { en: "Tile/Marble floor", de: "Fliesen-/Marmorboden", zh: "瓷砖/大理石地板" },
        "Insonorisation": { en: "Soundproofing", de: "Schallisolierung", zh: "隔音" },
        "Entrée privée": { en: "Private entrance", de: "Eigener Eingang", zh: "私人入口" },
        "Matériel de repassage": { en: "Ironing facilities", de: "Bügeleisen/brett", zh: "熨烫设备" },
        "Fer à repasser": { en: "Iron", de: "Bügeleisen", zh: "熨斗" },
        "Lit bébé sur demande": { en: "Crib upon request", de: "Babybett auf Anfrage", zh: "可按要求提供婴儿床" },

        // Building
        "Appartement privé dans un immeuble": { en: "Private apartment in building", de: "Private Wohnung im Gebäude", zh: "大楼内的私人公寓" },

        // Reception
        "Facture fournie sur demande": { en: "Invoice provided on request", de: "Rechnung auf Anfrage", zh: "按要求提供发票" },
        "Enregistrement/départ privé": { en: "Private check-in/check-out", de: "Privater Check-in/-out", zh: "私人入住/退房" },
        "Enregistrement/règlement rapide": { en: "Express check-in/check-out", de: "Express-Check-in/-out", zh: "快速入住/退房" },

        // Cleaning
        "Service de ménage quotidien (En supplément)": {
            en: "Daily housekeeping (Additional charge)",
            de: "Täglicher Reinigungsservice (gegen Aufpreis)",
            zh: "每日清洁服务（额外收费）"
        },

        // Business
        "Salles de réunion/réception (En supplément)": {
            en: "Meeting/Banquet facilities (Additional charge)",
            de: "Konferenz-/Veranstaltungsräume (gegen Aufpreis)",
            zh: "会议/宴会设施（额外收费）"
        },

        // Shops
        "Supérette sur place": { en: "Minimarket on site", de: "Minimarkt vor Ort", zh: "内部小超市" },

        // Misc
        "Accessible en fauteuil roulant": { en: "Wheelchair accessible", de: "Rollstuhlgerecht", zh: "无障碍设施" },
        "Établissement entièrement non-fumeurs": { en: "Non-smoking property", de: "Nichtraucherunterkunft", zh: "完全禁烟" },
        "Chauffage": { en: "Heating", de: "Heizung", zh: "暖气" },
        "Chambres insonorisées": { en: "Soundproof rooms", de: "Schallisolierte Zimmer", zh: "隔音客房" },
        "Sécurité": { en: "Security", de: "Sicherheit", zh: "安保" },
        "Extincteurs": { en: "Fire extinguishers", de: "Feuerlöscher", zh: "灭火器" },
        "Caméras de surveillance à l'extérieur de l'établissement": { en: "CCTV outside property", de: "Videoüberwachung im Außenbereich", zh: "室外监控摄像头" },
        "Caméras de surveillance dans les parties communes": { en: "CCTV in common areas", de: "Videoüberwachung in Gemeinschaftsbereichen", zh: "公共区域监控摄像头" },
        "Détecteurs de fumée": { en: "Smoke alarms", de: "Rauchmelder", zh: "烟雾报警器" },
        "Clés d'accès": { en: "Key access", de: "Zugang mit Schlüssel", zh: "钥匙进入" },

        // Langues
        "Langues parlées": { en: "Languages spoken", de: "Gesprochene Sprachen", zh: "通用语言" },
        "Allemand": { en: "German", de: "Deutsch", zh: "德语" },
        "Anglais": { en: "English", de: "Englisch", zh: "英语" },
        "Espagnol": { en: "Spanish", de: "Spanisch", zh: "西班牙语" },
        "Français": { en: "French", de: "Französisch", zh: "法语" },
        "Portugais": { en: "Portuguese", de: "Portugiesisch", zh: "葡萄牙语" },
    };

    // Recupérer le document actuel
    const query = '*[_type == "pageAppartements"][0]';
    const pageData = await client.fetch(query);

    if (!pageData || !pageData.establishmentAmenities || !pageData.establishmentAmenities.amenitiesCategories) {
        console.error("❌ No amenities data found.");
        return;
    }

    const categories = pageData.establishmentAmenities.amenitiesCategories;

    // Pour chaque catégorie et chaque item, transformer en objet multilingue
    const updatedCategories = categories.map((cat: any) => {
        const updatedItems = cat.items.map((item: any) => {
            // Si c'est déjà un objet, on le garde
            if (typeof item === 'object' && item.fr) return item;

            // Sinon on traduit
            const itemString = typeof item === 'string' ? item : '';
            const trans = translations[itemString];

            if (trans) {
                return {
                    fr: itemString,
                    en: trans.en,
                    de: trans.de,
                    zh: trans.zh
                };
            } else {
                console.warn(`⚠️ Missing translation for: "${itemString}"`);
                return {
                    fr: itemString,
                    en: itemString, // Fallback
                    de: itemString,
                    zh: itemString
                };
            }
        });

        // Traduire aussi le titre de la catégorie si possible (simple mapping) - déjà fait en partie mais bon
        const catTitles: any = {
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

        // Note: Sanity schema for title is STRING currently in establishedAmenities (L188 in step 600)
        // Oops, in my schema update I kept title as string. I should have made it object for i18n?
        // Let's check schema pageAppartements again. L188: { name: 'title', type: 'string' ... }
        // So I cannot easily translate Category Titles unless I change schema. 
        // But the user complained about ITEMS mostly.
        // Let's stick to translating ITEMS for now, as that's the bulk of the content.
        // The components/AmenitiesSection.tsx displays `category.title`. 
        // If I want to translate category titles, I need to update schema for categories too or use a mapping in frontend.
        // I will use a mapping in frontend for category titles as it is easier and safer than migrating schema structure for now.

        return {
            ...cat,
            items: updatedItems
        };
    });

    try {
        await client
            .patch('pageAppartements')
            .set({
                'establishmentAmenities.amenitiesCategories': updatedCategories
            })
            .commit();
        console.log('✅ Amenities translated successfully!');
    } catch (error) {
        console.error('❌ Error translating amenities:', error);
    }
}

translateAllAmenities();
