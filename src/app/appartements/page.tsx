import { client } from '@/sanity/lib/client';
import { pageAppartementsQuery } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import AppartementsClient from './AppartementsClient';

export const revalidate = 60;

export default async function AppartementsPage() {
  const pageData = await client.fetch(pageAppartementsQuery);

  // Transformer les suites avec les images optimisées mais garder les données multilingues
  const transformedSuites = (pageData?.suites || []).map((suite: any) => {
    // Préparer les images
    const mainImageUrl = suite.mainImage && suite.mainImage.asset
      ? urlFor(suite.mainImage)
          .width(800)
          .fit('max')
          .auto('format')
          .quality(75)
          .url()
      : '/images/placeholder.jpg';

    const galleryUrls = suite.gallery && suite.gallery.length > 0
      ? suite.gallery
          .filter((img: any) => img && img.asset && (img.asset._ref || img.asset._id))
          .map((img: any) =>
            urlFor(img)
              .width(1920)
              .fit('max')
              .auto('format')
              .quality(75)
              .url()
          )
      : [];

    return {
      ...suite,
      mainImageUrl,
      galleryUrls: galleryUrls.length > 0 ? galleryUrls : [mainImageUrl],
    };
  });

  return <AppartementsClient pageData={pageData} suites={transformedSuites} />;
}
