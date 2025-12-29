import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";
import { LanguageProvider } from "@/contexts/LanguageContext";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";

// Configuration des polices avec optimisation maximale
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-serif',
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
});

// Configuration du viewport (Next.js 16+)
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#433E37',
};

export const metadata: Metadata = {
  title: {
    default: 'Location Appartement de Charme à Colmar | Les Suites du Cygne',
    template: '%s | Les Suites du Cygne'
  },
  description: "Location d'appartements de charme 4 étoiles à Colmar centre-ville. Appartements meublés pour 2 à 10 personnes, idéaux pour familles et groupes. Réservation en ligne.",
  keywords: ['appartement Colmar', 'location meublée Colmar', 'hébergement Colmar', 'appartement de charme Colmar', 'location vacances Colmar', 'logement Colmar centre', 'location courte durée Colmar'],
  authors: [{ name: 'Les Suites du Cygne' }],
  creator: 'Les Suites du Cygne',
  publisher: 'Les Suites du Cygne',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Les Suites du Cygne',
  },
  formatDetection: {
    telephone: true,
    email: true,
  },
  alternates: {
    canonical: 'https://lessuitesducygne.com',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    alternateLocale: ['en_US', 'de_DE', 'zh_CN'],
    url: 'https://lessuitesducygne.com',
    siteName: 'Les Suites du Cygne',
    title: 'Location Appartement de Charme à Colmar | Les Suites du Cygne',
    description: "Appartements de charme 4 étoiles au cœur de Colmar. Location meublée pour 2 à 10 personnes. Réservez votre séjour en Alsace.",
    images: [
      {
        url: 'https://lessuitesducygne.com/images/baudelaire.jpg',
        width: 1200,
        height: 630,
        alt: 'Les Suites du Cygne - Appartements de charme à Colmar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Location Appartement de Charme à Colmar | Les Suites du Cygne',
    description: "Appartements de charme 4 étoiles au cœur de Colmar pour familles et groupes.",
    images: ['https://lessuitesducygne.com/images/baudelaire.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="overflow-x-hidden">
      <head>
        {/* Preconnect pour les ressources externes critiques */}
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://secure.reservit.com" />
        <LocalBusinessSchema />
      </head>
      <body className={`${playfair.variable} ${lato.variable} font-sans antialiased bg-stone-50 overflow-x-hidden`}>
        <LanguageProvider>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </LanguageProvider>
      </body>
    </html>
  );
}