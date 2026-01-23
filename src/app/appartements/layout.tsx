import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Appartements de Charme 4 Étoiles à Colmar | Les Suites du Cygne',
  description: 'Découvrez nos 3 appartements de charme 4 étoiles à Colmar : Suite Baudelaire (2-4 pers.), Suite Schubert (4-6 pers.), Suite Asselin (6-10 pers.). Tout équipés, centre-ville.',
  keywords: [
    'appartement de charme Colmar',
    'location meublée 4 étoiles Colmar',
    'suite familiale Colmar',
    'appartement centre-ville Colmar',
    'hébergement grand groupe Colmar',
    'location haut de gamme Colmar'
  ],
  openGraph: {
    title: 'Appartements de Charme 4 Étoiles à Colmar | Les Suites du Cygne',
    description: 'Découvrez nos 3 appartements de charme 4 étoiles à Colmar : Suite Baudelaire (2-4 pers.), Suite Schubert (4-6 pers.), Suite Asselin (6-10 pers.).',
    url: '/appartements',
    images: [
      {
        url: '/images/baudelaire.jpg',
        width: 1200,
        height: 630,
        alt: 'Suite Baudelaire - Appartement de charme 4 étoiles à Colmar',
      },
    ],
  },
  alternates: {
    canonical: '/appartements',
  },
};

export default function AppartementsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
