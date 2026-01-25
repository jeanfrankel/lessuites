import { client } from '@/sanity/lib/client';
import { pageConditionsGeneralesQuery } from '@/sanity/lib/queries';
import ConditionsGeneralesClient from './ConditionsGeneralesClient';

export const revalidate = 60;

async function getPageData() {
  return await client.fetch(pageConditionsGeneralesQuery);
}

export default async function ConditionsGeneralesPage() {
  const pageData = await getPageData();
  return <ConditionsGeneralesClient pageData={pageData} />;
}
