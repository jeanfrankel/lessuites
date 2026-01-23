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

// URL de base pour la production - INDISPENSABLE pour OpenGraph
const baseUrl = 'https://lessuitesducygne.fr';

export const metadata: Metadata = {
  // MetadataBase: Essentiel pour les URLs absolues des images OG
  metadataBase: new URL(baseUrl),

  title: {
    default: 'Location Appartement de Charme à Colmar | Les Suites du Cygne',
    template: '%s | Les Suites du Cygne'
  },
  description: "Location d'appartements de charme 4 étoiles à Colmar centre-ville. Appartements meublés pour 2 à 10 personnes, idéaux pour familles et groupes. Réservation en ligne.",
  keywords: ['appartement Colmar', 'location meublée Colmar', 'hébergement Colmar', 'appartement de charme Colmar', 'location vacances Colmar', 'logement Colmar centre', 'location courte durée Colmar'],
  authors: [{ name: 'Les Suites du Cygne' }],
  creator: 'Les Suites du Cygne',
  publisher: 'Les Suites du Cygne',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-144x144.png', sizes: '144x144', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
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
    canonical: baseUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    alternateLocale: ['en_US', 'de_DE', 'zh_CN'],
    url: baseUrl,
    siteName: 'Les Suites du Cygne',
    title: 'Location Appartement de Charme à Colmar | Les Suites du Cygne',
    description: "Appartements de charme 4 étoiles au cœur de Colmar. Location meublée pour 2 à 10 personnes. Réservez votre séjour en Alsace.",
    images: [
      {
        url: '/images/baudelaire.jpg', // Relatif car metadataBase est défini
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
    images: ['/images/baudelaire.jpg'], // Relatif car metadataBase est défini
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