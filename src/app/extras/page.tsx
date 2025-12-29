import { client } from '@/sanity/lib/client';
import { pageExtrasQuery } from '@/sanity/lib/queries';
import ExtrasClient from './ExtrasClient';

export const revalidate = 60;

export default async function ExtrasPage() {
  const pageData = await client.fetch(pageExtrasQuery);

  return <ExtrasClient pageData={pageData} />;
}
