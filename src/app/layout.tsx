import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";

// Configuration des polices "Pro"
const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-serif', 
});

const lato = Lato({ 
  subsets: ["latin"], 
  weight: ["300", "400", "700"],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: "Les Suites du Cygne | Appartements à Colmar",
  description: "Location d'appartements de charme pour groupes et familles au centre de Colmar.",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  themeColor: '#433E37',
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
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://lessuitesducygne.com',
    siteName: 'Les Suites du Cygne',
    title: 'Les Suites du Cygne | Appartements à Colmar',
    description: 'Location d\'appartements de charme pour groupes et familles au centre de Colmar.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="overflow-x-hidden">
      <body className={`${playfair.variable} ${lato.variable} font-sans antialiased bg-stone-50 overflow-x-hidden`}>
        <LanguageProvider>
          <Navbar />
          <main className="min-h-screen overflow-x-hidden">
              {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}