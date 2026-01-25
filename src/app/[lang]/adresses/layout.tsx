import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bonnes Adresses à Colmar | Restaurants, Bars, Shopping | Les Suites du Cygne',
  description: 'Nos meilleures adresses à Colmar : restaurants alsaciens, bars à vin, pâtisseries artisanales, boutiques locales. Conseils de locaux pour découvrir le vrai Colmar.',
  keywords: [
    'restaurants Colmar',
    'que faire à Colmar',
    'bonnes adresses Colmar',
    'bars Colmar centre',
    'pâtisserie Colmar',
    'shopping Colmar',
    'où manger à Colmar'
  ],
  openGraph: {
    title: 'Bonnes Adresses à Colmar | Restaurants & Shopping',
    description: 'Nos meilleures adresses : restaurants alsaciens, bars, pâtisseries et boutiques locales.',
    url: '/adresses',
  },
  alternates: {
    canonical: '/adresses',
  },
};

export default function AdressesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
