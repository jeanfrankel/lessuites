import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="overflow-x-hidden">
      <body className={`${playfair.variable} ${lato.variable} font-sans antialiased bg-stone-50 overflow-x-hidden`}>
        <Navbar />
        <main className="min-h-screen overflow-x-hidden">
            {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}