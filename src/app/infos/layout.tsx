import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Informations Pratiques & Contact | Les Suites du Cygne Colmar',
  description: 'Toutes les informations pour votre séjour : horaires check-in/check-out, accès, parking, contact. 20-22 Rue des Boulangers, 68000 Colmar. Tél: +33 3 89 20 93 64.',
  keywords: [
    'contact Les Suites du Cygne',
    'horaires check-in Colmar',
    'accès appartement Colmar',
    'parking Colmar centre',
    'informations pratiques Colmar',
    '20-22 Rue des Boulangers Colmar'
  ],
  openGraph: {
    title: 'Informations Pratiques & Contact | Les Suites du Cygne Colmar',
    description: 'Horaires, accès, parking et contact. 20-22 Rue des Boulangers, 68000 Colmar.',
    url: 'https://lessuitesducygne.com/infos',
  },
  alternates: {
    canonical: 'https://lessuitesducygne.com/infos',
  },
};

export default function InfosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
