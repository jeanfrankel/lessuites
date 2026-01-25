import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services & Extras | Les Suites du Cygne Colmar',
  description: 'Services supplémentaires disponibles pour votre séjour à Colmar : petit-déjeuner, panier gourmand, parking privé, services personnalisés.',
  keywords: [
    'services extras Colmar',
    'petit-déjeuner Colmar',
    'parking privé Colmar',
    'services personnalisés Colmar',
    'conciergerie Colmar'
  ],
  openGraph: {
    title: 'Services & Extras | Les Suites du Cygne Colmar',
    description: 'Services supplémentaires : petit-déjeuner, parking, services personnalisés.',
    url: '/extras',
  },
  alternates: {
    canonical: '/extras',
  },
};

export default function ExtrasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
