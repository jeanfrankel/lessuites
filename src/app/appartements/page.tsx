import { client } from '@/sanity/lib/client';
import { pageAppartementsQuery, suitesQuery } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import AppartementsClient from './AppartementsClient';

export const revalidate = 60;

export default async function AppartementsPage() {
  const [pageData, suitesData] = await Promise.all([
    client.fetch(pageAppartementsQuery),
    client.fetch(suitesQuery),
  ]);

  // Transformer les images des suites
  const transformedSuites = suitesData.map((suite: any) => ({
    ...suite,
    mainImage: suite.mainImage && suite.mainImage.asset
      ? {
          url: urlFor(suite.mainImage)
            .width(800)
            .fit('max')
            .auto('format')
            .quality(75)
            .url(),
          lqip: suite.mainImage.asset?.metadata?.lqip,
        }
      : null,
    gallery: suite.gallery && suite.gallery.length > 0
      ? suite.gallery
          .filter((img: any) => img && img.asset && (img.asset._ref || img.asset._id))
          .map((img: any) => ({
            url: urlFor(img)
              .width(1920)
              .fit('max')
              .auto('format')
              .quality(75)
              .url(),
            lqip: img.asset?.metadata?.lqip,
          }))
      : [],
  }));

  return <AppartementsClient pageData={pageData} suites={transformedSuites} />;
}
