import { client } from '@/sanity/lib/client';
import { pageInfosQuery } from '@/sanity/lib/queries';
import InfosClient from './InfosClient';

export const revalidate = 60;

export default async function InfosPage() {
  const pageData = await client.fetch(pageInfosQuery);

  return <InfosClient pageData={pageData} />;
}