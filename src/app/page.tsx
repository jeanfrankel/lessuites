import { client } from '@/sanity/lib/client';
import { pageHomeQuery } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import HomeClient from './HomeClient';

import { Metadata } from 'next';

export const revalidate = 60; // Revalider toutes les 60 secondes

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await client.fetch(pageHomeQuery);
  const title = pageData?.seo?.metaTitle?.fr || 'Location Appartement de Charme à Colmar | Les Suites du Cygne';
  const description = pageData?.seo?.metaDescription?.fr || "Location d'appartements de charme 4 étoiles à Colmar centre-ville. Appartements meublés pour 2 à 10 personnes, idéaux pour familles et groupes. Réservation en ligne.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'fr_FR',
      url: 'https://lessuitesducygne.fr',
      siteName: 'Les Suites du Cygne',
      images: [
        {
          url: '/images/baudelaire.jpg',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/baudelaire.jpg'],
    },
  };
}

export default async function Home() {
  // Récupérer les données depuis Sanity
  const pageData = await client.fetch(pageHomeQuery);

  // Transformer les images de la galerie Colmar
  if (pageData?.colmarSection?.gallery) {
    pageData.colmarSection.gallery = pageData.colmarSection.gallery
      .filter((img: any) => img && img.asset && (img.asset._ref || img.asset._id))
      .map((img: any) => ({
        url: urlFor(img)
          .width(1920)
          .fit('max')
          .auto('format')
          .quality(75)
          .url(),
        lqip: img.asset?.metadata?.lqip,
      }));
  }

  // Transformer les images de la galerie Suites
  if (pageData?.suitesSection?.gallery) {
    pageData.suitesSection.gallery = pageData.suitesSection.gallery
      .filter((img: any) => img && img.asset && (img.asset._ref || img.asset._id))
      .map((img: any) => ({
        url: urlFor(img)
          .width(1920)
          .fit('max')
          .auto('format')
          .quality(75)
          .url(),
        lqip: img.asset?.metadata?.lqip,
      }));
  }

  return <HomeClient pageData={pageData} />;
}
