import { client } from '@/sanity/lib/client';
import { pagePolitiqueConfidentialiteQuery } from '@/sanity/lib/queries';
import PolitiqueConfidentialiteClient from './PolitiqueConfidentialiteClient';

export const revalidate = 60;

async function getPageData() {
  return await client.fetch(pagePolitiqueConfidentialiteQuery);
}

export default async function PolitiqueConfidentialitePage() {
  const pageData = await getPageData();
  return <PolitiqueConfidentialiteClient pageData={pageData} />;
}
