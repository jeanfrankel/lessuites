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

async function updateTranslations() {
    console.log('🚀 Updating missing translations...');

    // 1. Mise à jour de Page Appartements (Equipements Etablissement)
    console.log('--- Updating PageAppartements ---');
    try {
        await client
            .patch('pageAppartements')
            .set({
                'establishmentAmenities.title': {
                    fr: "Équipements des Suites Du Cygne",
                    en: "Amenities at Suites Du Cygne",
                    de: "Ausstattung der Suites Du Cygne",
                    zh: "天鹅套房设施"
                },
                'establishmentAmenities.intro': { // Added field for "Des équipements haut de gamme..."
                    fr: "Des équipements haut de gamme soigneusement sélectionnés pour garantir votre confort et votre bien-être tout au long de votre séjour.",
                    en: "Carefully selected high-end amenities to ensure your comfort and well-being throughout your stay.",
                    de: "Sorgfältig ausgewählte hochwertige Annehmlichkeiten, um Ihren Komfort und Ihr Wohlbefinden während Ihres gesamten Aufenthalts zu gewährleisten.",
                    zh: "精心挑选的高端设施，确保您在入住期间的舒适和健康。"
                },
                'establishmentAmenities.amenitiesCategories': [
                    {
                        _key: "general",
                        title: "Général",
                        icon: "layout-grid",
                        items: ["Non-fumeur"]
                    },
                    {
                        _key: "internet",
                        title: "Internet",
                        icon: "wifi",
                        items: ["Wi-Fi gratuit", "Haut débit"]
                    },
                    {
                        _key: "bedroom",
                        title: "Chambre",
                        icon: "bed",
                        items: ["Linge de lit fourni", "Penderie"]
                    },
                    {
                        _key: "kitchen",
                        title: "Cuisine",
                        icon: "chef-hat",
                        items: ["Cuisine équipée", "Machine à café", "Bouilloire", "Grille-pain", "Ustensiles de cuisine", "Lave-vaisselle", "Réfrigérateur", "Plaque de cuisson"]
                    },
                    {
                        _key: "bathroom",
                        title: "Salle de bain",
                        icon: "bath",
                        items: ["Serviettes fournies", "Sèche-cheveux", "Produits de toilette offerts", "Douche à l'italienne"]
                    },
                    {
                        _key: "entertainment",
                        title: "High-Tech",
                        icon: "tv",
                        items: ["Télévision à écran plat", "Chaînes satellite"]
                    },
                    {
                        _key: "comfort",
                        title: "Confort",
                        icon: "thermometer",
                        items: ["Chauffage", "Ventilateur", "Insonorisation"]
                    },
                    {
                        _key: "security",
                        title: "Sécurité",
                        icon: "shield",
                        items: ["Détecteurs de fumée", "Extincteurs"]
                    }
                ]
            })
            .commit();
        console.log('✅ PageAppartements updated!');
    } catch (error) {
        console.error('❌ Error updating PageAppartements:', error);
    }

    // 2. Mise à jour de Page Extras ("Meilleur tarif garanti") et titres
    console.log('--- Updating PageExtras ---');
    try {
        await client
            .patch('pageExtras')
            .set({
                'contactCta.bestRateText': {
                    fr: "Meilleur tarif garanti en réservant directement sur notre site.",
                    en: "Best rate guaranteed by booking directly on our website.",
                    de: "Bester Preis garantiert bei Buchung direkt auf unserer Website.",
                    zh: "通过我们的网站直接预订可保证最优惠价格。"
                },
                // Add translations for other hardcoded texts if they were purely in code, 
                // but based on request only bestRateText was explicit.
            })
            .commit();
        console.log('✅ PageExtras updated!');
    } catch (error) {
        console.error('❌ Error updating PageExtras:', error);
    }

    // 3. Mise à jour de Page Infos (Stationnement & Access)
    console.log('--- Updating PageInfos ---');
    const accessNotes = [
        {
            _key: 'pedestrian',
            text: {
                fr: "⚠️ La zone est piétonne de 11h à 18h",
                en: "⚠️ The area is pedestrian from 11am to 6pm",
                de: "⚠️ Die Zone ist von 11 bis 18 Uhr Fußgängerzone",
                zh: "⚠️ 该区域在上午11点至下午6点为步行区"
            }
        },
        {
            _key: 'parking-intro',
            text: {
                fr: "Voir les parkings à proximité :",
                en: "See nearby parking lots:",
                de: "Parkplätze in der Nähe anzeigen:",
                zh: "查看附近的停车场："
            }
        },
        {
            _key: 'parking-rapp',
            text: {
                fr: "**Parking Rapp (le plus proche)**\n20 avenue de la République, à 250m à pied.\n\nAttention : l’accès au parking est fermé aux véhicules entre 21h et 7h (sortie possible 24h/24).\nTarif : ~25€ / 24h.",
                en: "**Parking Rapp (nearest)**\n20 avenue de la République, 250m walk.\n\nWarning: access to the parking is closed to vehicles between 9pm and 7am (exit possible 24/7).\nRate: ~25€ / 24h.",
                de: "**Parkhaus Rapp (am nächsten)**\n20 avenue de la République, 250m zu Fuß.\n\nAchtung: Die Zufahrt zum Parkhaus ist zwischen 21:00 und 7:00 Uhr für Fahrzeuge geschlossen (Ausfahrt rund um die Uhr möglich).\nPreis: ~25€ / 24 Std.",
                zh: "**拉普停车场 (最近)**\n20 avenue de la République，步行250米。\n\n注意：停车场车辆入口在晚上9点至早上7点之间关闭（全天24小时可出场）。\n费率：~25€ / 24小时。"
            }
        },
        {
            _key: 'parking-lacarre',
            text: {
                fr: "**Parking Lacarre (le moins cher)**\n5 place Lacarre à environ 800m.\n\nSeulement ~3€ / 24h aux étages inférieurs.",
                en: "**Parking Lacarre (cheapest)**\n5 place Lacarre about 800m away.\n\nOnly ~3€ / 24h on lower floors.",
                de: "**Parkhaus Lacarre (am günstigsten)**\n5 place Lacarre, ca. 800m entfernt.\n\nNur ~3€ / 24 Std. in den unteren Etagen.",
                zh: "**拉卡雷停车场 (最便宜)**\n5 place Lacarre，约800米。\n\n下层仅需 ~3€ / 24小时。"
            }
        }
    ];

    try {
        await client
            .patch('pageInfos')
            .set({ accessNotes: accessNotes })
            .commit();
        console.log('✅ PageInfos updated!');
    } catch (error) {
        console.error('❌ Error updating PageInfos:', error);
    }
}

updateTranslations();
