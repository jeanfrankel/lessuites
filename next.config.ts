import type { NextConfig } from "next";

// Note: La configuration i18n (Internationalisation) est gérée par src/middleware.ts
// car Next.js App Router ne supporte pas la config i18n dans ce fichier.


const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // Cache images for 1 year
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
    // Désactiver l'optimisation en dev seulement (à cause de l'erreur IPv6)
    unoptimized: process.env.NODE_ENV === 'development',
  },
  // Optimisation pour la production
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: true,

  // Optimisation du bundling et code splitting
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },

  // Optimisation des performances de compilation
  reactStrictMode: true,

  // Headers de sécurité
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ],
      },
    ];
  },
  // Gestion des redirections pour le SEO (Mapping Ancien Site -> Nouveau Site)
  async redirects() {
    return [
      // 1. Pages Principales
      {
        source: '/a-propos',
        destination: '/infos', // Plus pertinent que juste l'accueil
        permanent: true,
      },
      {
        source: '/lequipe-du-projet',
        destination: '/infos',
        permanent: true,
      },
      {
        source: '/avis-clients',
        destination: '/#reviews', // Ancre vers la section avis de la home
        permanent: true,
      },
      {
        source: '/temoignages',
        destination: '/#reviews',
        permanent: true,
      },
      {
        source: '/nous-trouver',
        destination: '/infos', // Contient la carte et l'adresse
        permanent: true,
      },
      {
        source: '/de/nous-trouver',
        destination: '/infos',
        permanent: true,
      },
      {
        source: '/en/find-us',
        destination: '/infos',
        permanent: true,
      },
      {
        source: '/plans-et-guide',
        destination: '/infos',
        permanent: true,
      },
      {
        source: '/environs',
        destination: '/adresses', // Page "Nos bonnes adresses"
        permanent: true,
      },
      {
        source: '/nos-bonnes-adresses',
        destination: '/adresses',
        permanent: true,
      },

      // 2. Tarifs & Réservation
      {
        source: '/tarifs',
        destination: '/appartements', // Les tarifs sont sur la page appartements
        permanent: true,
      },

      // 3. Suites (Mapping spécifique des slugs)

      {
        source: '/en/appartements',
        destination: '/appartements',
        permanent: true,
      },
      {
        source: '/suite-baudelaire',
        destination: '/appartements/baudelaire',
        permanent: true,
      },
      {
        source: '/suite-schubert',
        destination: '/appartements/schubert',
        permanent: true,
      },
      {
        source: '/suite-asselin',
        destination: '/appartements/asselin',
        permanent: true,
      },

      // 4. Pages Légales & Techniques


      {
        source: '/en/legal-mentions',
        destination: '/mentions-legales',
        permanent: true,
      },
      {
        source: '/de/impressum',
        destination: '/mentions-legales',
        permanent: true,
      },
      {
        source: '/conditions-generales-de-vente',
        destination: '/conditions-generales',
        permanent: true,
      },
      {
        source: '/en/terms-and-conditions',
        destination: '/conditions-generales',
        permanent: true,
      },
      {
        source: '/terms-and-conditions-2', // URL "Garbage" détectée
        destination: '/conditions-generales',
        permanent: true,
      },
      {
        source: '/de/allgemeine-verkaufsbedingungen',
        destination: '/conditions-generales',
        permanent: true,
      },

      // 5. Blog & Contenu Obsolète (Redirection vers l'accueil ou page pertinente)
      {
        source: '/blog',
        destination: '/', // Pas de blog sur le nouveau site, redirection propre
        permanent: true,
      },
      {
        source: '/idees',
        destination: '/adresses', // Plus pertinent que l'accueil
        permanent: true,
      },

      // 6. Gestion des langues (Anciennes URLs de langues)
      // On redirige vers la racine, le middleware de langue s'occupera du reste si nécessaire
      {
        source: '/en',
        destination: '/',
        permanent: true,
      },
      {
        source: '/de',
        destination: '/',
        permanent: true,
      },
      {
        source: '/zh-hans',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
