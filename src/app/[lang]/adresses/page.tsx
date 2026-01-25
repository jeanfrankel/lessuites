import { client } from '@/sanity/lib/client';
import { pageAdressesQuery, pageHomeQuery } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import AdressesClient from './AdressesClient';

export const revalidate = 60;

export default async function AdressesPage() {
  const [pageData, homeData] = await Promise.all([
    client.fetch(pageAdressesQuery),
    client.fetch(pageHomeQuery)
  ]);

  let colmarImages = [];

  if (homeData?.colmarSection?.gallery) {
    colmarImages = homeData.colmarSection.gallery
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

  let christmasImages = [];

  if (pageData?.christmasSection?.gallery) {
    christmasImages = pageData.christmasSection.gallery
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

  return <AdressesClient pageData={pageData} colmarImages={colmarImages} christmasImages={christmasImages} />;
}