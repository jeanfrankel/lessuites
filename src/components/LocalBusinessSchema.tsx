import { siteConfig } from '@/data/content';

// URL de base - doit correspondre à metadataBase dans layout.tsx
const baseUrl = 'https://lessuitesducygne.fr';

export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": baseUrl,
    "name": siteConfig.name,
    "description": siteConfig.description,
    "url": baseUrl,
    "logo": `${baseUrl}/images/logo.png`,
    "image": [
      `${baseUrl}/images/baudelaire.jpg`,
      `${baseUrl}/images/schubert.jpg`,
      `${baseUrl}/images/asselin1.jpg`
    ],
    "telephone": "+33609172461",
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
      "latitude": 48.0779,
      "longitude": 7.3584
    },
    "priceRange": "€€€",
    "starRating": {
      "@type": "Rating",
      "ratingValue": "4",
      "bestRating": "5"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "9.4",
      "bestRating": "10",
      "reviewCount": "244"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "WiFi gratuit", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Climatisation", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Cuisine équipée", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Parking à proximité", "value": true }
    ],
    "checkinTime": "16:00",
    "checkoutTime": "11:00",
    "numberOfRooms": 3,
    "petsAllowed": false,
    "sameAs": [
      "https://www.booking.com/hotel/fr/les-suites-du-cygne.fr.html",
      "https://www.airbnb.fr/users/show/4269158"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
