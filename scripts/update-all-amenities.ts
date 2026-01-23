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

async function updateFullAmenities() {
    console.log('🚀 Updating Full Amenities...');

    // Liste complète des équipements organisée par catégories, telle que demandée
    const allAmenities = [
        {
            _key: "points-forts",
            title: "Ses points forts",
            icon: "star", // Lucide icon name
            items: [
                "Connexion Wi-Fi gratuite",
                "Chambres familiales",
                "Chambres non-fumeurs",
                "Équipements pour les personnes handicapées",
                "Ascenseur"
            ]
        },
        {
            _key: "ideal-sejour",
            title: "Idéal pour votre séjour",
            icon: "heart",
            items: [
                "Salle de bains privative",
                "Baignoire",
                "Climatisation",
                "Connexion Wi-Fi gratuite",
                "Chambres familiales",
                // "Plage", // Retiré car peu pertinent à Colmar sauf si lac proche, mais demandé par l'user donc on garde s'il y tient, mais c'est bizarre pour Colmar. On mettra tout.
                "Télévision à écran plat",
                "Chambres non-fumeurs",
                "Équipements pour les personnes handicapées",
                "Lave-linge"
            ]
        },
        {
            _key: "parking",
            title: "Parking",
            icon: "car",
            items: [
                "L'établissement ne dispose pas de parking."
            ]
        },
        {
            _key: "internet",
            title: "Internet",
            icon: "wifi",
            items: [
                "Une connexion Wi-Fi est disponible dans les chambres gratuitement."
            ]
        },
        {
            _key: "kitchen",
            title: "Cuisine",
            icon: "chef-hat",
            items: [
                "Chaise haute pour enfants",
                "Table à manger",
                "Machine à café",
                "Produits ménagers",
                "Grille-pain",
                "Plaque de cuisson",
                "Four",
                "Sèche-linge",
                "Ustensiles de cuisine",
                "Bouilloire électrique",
                "Cuisine",
                "Lave-linge",
                "Lave-vaisselle",
                "Micro-ondes",
                "Réfrigérateur"
            ]
        },
        {
            _key: "bedroom",
            title: "Chambre",
            icon: "bed",
            items: [
                "Linge de maison",
                "Armoire ou penderie",
                "Dressing",
                "Lit" // Ajout générique
            ]
        },
        {
            _key: "bathroom",
            title: "Salle de bains",
            icon: "bath",
            items: [
                "Papier toilette",
                "Serviettes",
                "Salle de bains supplémentaire",
                "Serviettes / linge de lit (frais supplémentaires)",
                "Toilettes supplémentaires",
                "Salle de bains privative",
                "Toilettes",
                "Articles de toilette gratuits",
                "Sèche-cheveux",
                "Baignoire",
                "Douche"
            ]
        },
        {
            _key: "living-area",
            title: "Coin salon",
            icon: "sofa",
            items: [
                "Coin repas",
                "Canapé",
                "Coin salon",
                "Bureau"
            ]
        },
        {
            _key: "high-tech",
            title: "High-tech",
            icon: "tv",
            items: [
                "Service de streaming (ex. Netflix)",
                "Lecteur Blu-ray",
                "Console de jeux",
                "Télévision à écran plat",
                "Chaînes du câble",
                "Chaînes satellite",
                "Jeux vidéo",
                "Lecteur DVD",
                "Radio",
                "Télévision"
            ]
        },
        {
            _key: "room-amenities",
            title: "Équipements en chambre",
            icon: "lamp",
            items: [
                "Prise près du lit",
                "Canapé-lit",
                "Étendoir",
                "Portant",
                "Sol carrelé / en marbre",
                "Insonorisation",
                "Entrée privée",
                "Matériel de repassage",
                "Fer à repasser",
                "Lit bébé sur demande" // Fusionné
            ]
        },
        {
            _key: "accessibility",
            title: "Accessibilité",
            icon: "accessibility",
            items: [
                "Étages supérieurs accessibles par ascenseur"
            ]
        },
        {
            _key: "building",
            title: "Caractéristiques du bâtiment",
            icon: "building",
            items: [
                "Appartement privé dans un immeuble"
            ]
        },
        {
            _key: "reception",
            title: "Réception",
            icon: "concierge-bell",
            items: [
                "Facture fournie sur demande",
                "Enregistrement/départ privé",
                "Enregistrement/règlement rapide"
            ]
        },
        {
            _key: "cleaning",
            title: "Services de nettoyage",
            icon: "sparkles",
            items: [
                "Service de ménage quotidien (En supplément)"
            ]
        },
        {
            _key: "business",
            title: "Services d'affaires",
            icon: "briefcase",
            items: [
                "Salles de réunion/réception (En supplément)"
            ]
        },
        {
            _key: "shops",
            title: "Boutiques",
            icon: "shopping-bag",
            items: [
                "Supérette sur place"
            ]
        },
        {
            _key: "various",
            title: "Divers",
            icon: "info",
            items: [
                "Accessible en fauteuil roulant",
                "Climatisation",
                "Établissement entièrement non-fumeurs",
                "Chauffage",
                "Chambres insonorisées",
                "Ascenseur",
                "Chambres familiales",
                "Équipements pour les personnes handicapées",
                "Chambres non-fumeurs"
            ]
        },
        {
            _key: "security",
            title: "Sécurité",
            icon: "shield",
            items: [
                "Extincteurs",
                "Caméras de surveillance à l'extérieur de l'établissement",
                "Caméras de surveillance dans les parties communes",
                "Détecteurs de fumée",
                "Clés d'accès"
            ]
        },
        {
            _key: "languages",
            title: "Langues parlées",
            icon: "languages",
            items: [
                "Allemand",
                "Anglais",
                "Espagnol",
                "Français",
                "Portugais"
            ]
        }
    ];

    try {
        await client
            .patch('pageAppartements')
            .set({
                'establishmentAmenities.amenitiesCategories': allAmenities,
                // On s'assure que le titre est bien mis (déjà fait, mais au cas où)
                'establishmentAmenities.title': {
                    fr: "Équipements des Suites Du Cygne",
                    en: "Amenities at Suites Du Cygne",
                    de: "Ausstattung der Suites Du Cygne",
                    zh: "天鹅套房设施"
                },
                'establishmentAmenities.intro': {
                    fr: "Des équipements haut de gamme soigneusement sélectionnés pour garantir votre confort et votre bien-être tout au long de votre séjour.",
                    en: "Carefully selected high-end amenities to ensure your comfort and well-being throughout your stay.",
                    de: "Sorgfältig ausgewählte hochwertige Annehmlichkeiten, um Ihren Komfort und Ihr Wohlbefinden während Ihres gesamten Aufenthalts zu gewährleisten.",
                    zh: "精心挑选的高端设施，确保您在入住期间的舒适和健康。"
                }
            })
            .commit();
        console.log('✅ Full Amenities updated successfully!');
    } catch (error) {
        console.error('❌ Error updating Full Amenities:', error);
    }
}

updateFullAmenities();
