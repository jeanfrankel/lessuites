import { client } from '@/sanity/lib/client';
import { pageHomeQuery } from '@/sanity/lib/queries';

export const revalidate = 0; // Pas de cache pour les tests

export default async function TestSanity() {
  try {
    const pageData = await client.fetch(pageHomeQuery);

    return (
      <div style={{ padding: '50px', fontFamily: 'monospace' }}>
        <h1>Test de connexion Sanity</h1>
        <h2>✅ Connexion réussie !</h2>
        <h3>Données récupérées :</h3>
        <pre style={{ background: '#f5f5f5', padding: '20px', overflow: 'auto' }}>
          {JSON.stringify(pageData, null, 2)}
        </pre>
      </div>
    );
  } catch (error: any) {
    return (
      <div style={{ padding: '50px', fontFamily: 'monospace', color: 'red' }}>
        <h1>❌ Erreur de connexion Sanity</h1>
        <h2>Message d'erreur :</h2>
        <pre style={{ background: '#ffe0e0', padding: '20px' }}>
          {error.message || String(error)}
        </pre>
      </div>
    );
  }
}
