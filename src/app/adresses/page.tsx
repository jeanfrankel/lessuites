import { client } from '@/sanity/lib/client';
import { pageAdressesQuery } from '@/sanity/lib/queries';
import AdressesClient from './AdressesClient';

export const revalidate = 60;

export default async function AdressesPage() {
  const pageData = await client.fetch(pageAdressesQuery);

  return <AdressesClient pageData={pageData} />;
}