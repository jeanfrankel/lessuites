import { client } from '@/sanity/lib/client';
import { pageMentionsLegalesQuery } from '@/sanity/lib/queries';
import MentionsLegalesClient from './MentionsLegalesClient';

export const revalidate = 60;

async function getPageData() {
  return await client.fetch(pageMentionsLegalesQuery);
}

export default async function MentionsLegalesPage() {
  const pageData = await getPageData();
  return <MentionsLegalesClient pageData={pageData} />;
}
