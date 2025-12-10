import { siteConfig } from '@/data/content';

export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": siteConfig.name,
    "image": "https://lessuitesducygne.com/images/baudelaire.jpg",
    "description": siteConfig.description,
    "@id": "https://lessuitesducygne.com",
    "url": "https://lessuitesducygne.com",
    "telephone": "+33389209364",
    "email": siteConfig.contact.emailClient,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "20-22 Rue des Boulangers",
      "addressLocality": "Colmar",
      "addressRegion": "Grand Est",
      "postalCode": "68000",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "48.0779",
      "longitude": "7.3584"
    },
    "priceRange": "€€€",
    "starRating": {
      "@type": "Rating",
      "ratingValue": "4"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      }
    ],
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "Wifi gratuit",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Climatisation",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Cuisine équipée",
        "value": true
      }
    ],
    "checkinTime": "16:00",
    "checkoutTime": "11:00",
    "numberOfRooms": 3,
    "petsAllowed": false
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
