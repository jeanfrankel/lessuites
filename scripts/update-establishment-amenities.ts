import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

// Charger les variables d'environnement
dotenv.config({ path: '.env.local' })

// Configuration Sanity
const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    token: process.env.SANITY_API_TOKEN!,
    apiVersion: '2024-01-01',
    useCdn: false,
})

const establishmentAmenitiesData = [
    {
        title: "Ses points forts",
        items: [
            "Connexion Wi-Fi gratuite", "Chambres familiales", "Chambres non-fumeurs", "Équipements pour les personnes handicapées", "Ascenseur"
        ]
    },
    {
        title: "Idéal pour votre séjour",
        items: [
            "Salle de bains privative", "Baignoire", "Climatisation", "Connexion Wi-Fi gratuite",
            "Chambres familiales", "Plage", "Télévision à écran plat", "Chambres non-fumeurs",
            "Équipements pour les personnes handicapées", "Lave-linge"
        ]
    },
    {
        title: "Parking",
        items: ["L'établissement ne dispose pas de parking."]
    },
    {
        title: "Internet",
        items: ["Une connexion Wi-Fi est disponible dans les chambres gratuitement."]
    },
    {
        title: "Cuisine",
        items: [
            "Chaise haute pour enfants", "Table à manger", "Machine à café", "Produits ménagers",
            "Grille-pain", "Plaque de cuisson", "Four", "Sèche-linge", "Ustensiles de cuisine",
            "Bouilloire électrique", "Cuisine", "Lave-linge", "Lave-vaisselle", "Micro-ondes", "Réfrigérateur"
        ]
    },
    {
        title: "Chambre",
        items: ["Linge de maison", "Armoire ou penderie", "Dressing"]
    },
    {
        title: "Salle de bains",
        items: [
            "Papier toilette", "Serviettes", "Salle de bains supplémentaire",
            "Serviettes / linge de lit (frais supplémentaires)", "Toilettes supplémentaires",
            "Salle de bains privative", "Toilettes", "Articles de toilette gratuits",
            "Sèche-cheveux", "Baignoire", "Douche"
        ]
    },
    {
        title: "Coin salon",
        items: ["Coin repas", "Canapé", "Coin salon", "Bureau"]
    },
    {
        title: "High-tech",
        items: [
            "Service de streaming (ex. Netflix)", "Lecteur Blu-ray", "Console de jeux",
            "Télévision à écran plat", "Chaînes du câble", "Chaînes satellite", "Jeux vidéo",
            "Lecteur DVD", "Radio", "Télévision"
        ]
    },
    {
        title: "Équipements en chambre",
        items: [
            "Prise près du lit", "Canapé-lit", "Étendoir", "Portant", "Sol carrelé / en marbre",
            "Insonorisation", "Entrée privée", "Matériel de repassage", "Fer à repasser"
        ]
    },
    {
        title: "Accessibilité",
        items: ["Étages supérieurs accessibles par ascenseur"]
    },
    {
        title: "Parties communes",
        items: ["Salon commun/salle de télévision"]
    },
    {
        title: "Restauration",
        items: ["Café sur place", "Vin/champagne", "En supplément", "Plateau / bouilloire"]
    },
    {
        title: "Activités",
        items: [
            "Plage", "Squash", "Équitation", "En dehors de l'établissement",
            "Bowling", "En dehors de l'établissement", "Randonnée", "En dehors de l'établissement",
            "Canoë-kayak", "Pêche", "En dehors de l'établissement",
            "Parcours de golf (à moins de 3 km)", "Court de tennis"
        ]
    },
    {
        title: "Extérieur/Vues",
        items: ["Vue sur une cour intérieure", "Vue sur la ville", "Vue"]
    },
    {
        title: "Caractéristiques du bâtiment",
        items: ["Appartement privé dans un immeuble"]
    },
    {
        title: "Réception",
        items: ["Facture fournie sur demande", "Enregistrement/départ privé", "Enregistrement/règlement rapide"]
    },
    {
        title: "Services de nettoyage",
        items: ["Service de ménage quotidien", "En supplément"]
    },
    {
        title: "Services d'affaires",
        items: ["Salles de réunion/réception"]
    },
    {
        title: "Boutiques",
        items: ["Supérette sur place"]
    },
    {
        title: "Divers",
        items: [
            "Accessible en fauteuil roulant", "Climatisation", "Établissement entièrement non-fumeurs",
            "Chauffage", "Chambres insonorisées", "Ascenseur", "Chambres familiales",
            "Équipements pour les personnes handicapées", "Chambres non-fumeurs"
        ]
    },
    {
        title: "Sécurité",
        items: [
            "Extincteurs", "Caméras de surveillance à l'extérieur de l'établissement",
            "Caméras de surveillance dans les parties communes", "Détecteurs de fumée", "Clés d'accès"
        ]
    },
    {
        title: "Langues parlées",
        items: ["Allemand", "Anglais", "Espagnol", "Français", "Portugais"]
    }
];

async function updateEstablishmentAmenities() {
    console.log('🚀 Démarrage de la mise à jour des équipements de l\'établissement...');

    const amenitiesCategories = establishmentAmenitiesData.map(cat => ({
        _type: 'object',
        _key: cat.title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        title: cat.title,
        items: cat.items
    }));

    const establishmentAmenities = {
        title: {
            fr: "Équipements de l'établissement Les Suites Du Cygne",
            en: "Facilities of Les Suites Du Cygne"
        },
        rating: "9,2",
        amenitiesCategories
    };

    try {
        await client
            .patch('pageAppartements')
            .set({ establishmentAmenities })
            .commit();
        console.log('✅ Document pageAppartements mis à jour avec les équipements de l\'établissement.');
    } catch (err) {
        console.error('❌ Erreur lors de la mise à jour:', err);
    }
}

updateEstablishmentAmenities();
