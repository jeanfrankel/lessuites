import { client } from '@/sanity/lib/client';
import { pageHomeQuery } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import HomeClient from './HomeClient';

export const revalidate = 60; // Revalider toutes les 60 secondes

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
