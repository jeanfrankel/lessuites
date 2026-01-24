import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    token: process.env.SANITY_API_TOKEN!,
    apiVersion: '2024-01-01',
    useCdn: false,
});

async function updateCgvArticle6() {
    console.log('Fetching pageConditionsGenerales...');
    const doc = await client.fetch('*[_id == "pageConditionsGenerales"][0]');

    if (!doc) {
        console.error('Document pageConditionsGenerales not found');
        return;
    }

    const articles = doc.articles || [];
    const articleIndex = articles.findIndex((a: any) => a.numero === 'Article 6' || a._key === 'article-6');

    if (articleIndex === -1) {
        console.error('Article 6 not found');
        return;
    }

    console.log('Found Article 6, updating content (Check-in/Check-out times)...');

    // New Content Definitions

    // FR
    const frContent = `6.1 Arrivée (check-in)
Sauf convention contraire, l'appartement est disponible à partir de 16h00 le jour d'arrivée. L'accès se fait de manière autonome via un système de boîte à clés sécurisée. Les codes d'accès vous seront communiqués après un appel téléphonique de check-in.

6.2 Départ (check-out)
Sauf convention contraire, l'appartement doit être libéré au plus tard à 10h15 le jour du départ.

6.3 État des lieux
L'appartement est remis propre et en bon état. À votre départ, merci de le laisser dans un état correct (vaisselle faite, poubelles sorties).

6.4 Ménage
Les frais de ménage inclus couvrent 2 heures de travail. Si l'état de l'appartement à votre départ nécessite un temps de nettoyage supérieur, un supplément de 50€ par heure supplémentaire sera prélevé sur le dépôt de garantie.`;

    // EN
    const enContent = `6.1 Check-in
Unless otherwise agreed, the apartment is available from 4:00 PM on the day of arrival. Access is self-service via a secure key box system. Access codes will be provided after a phone check-in call.

6.2 Check-out
Unless otherwise agreed, the apartment must be vacated by 10:15 AM at the latest on the day of departure.

6.3 Inventory
The apartment is provided clean and in good condition. Upon departure, please leave it in a proper state (dishes done, trash taken out).

6.4 Cleaning
Included cleaning covers 2 hours of work. If the apartment's condition upon departure requires additional cleaning time, a supplement of €50 per additional hour will be deducted from the security deposit.`;

    // DE
    const deContent = `6.1 Check-in
Sofern nicht anders vereinbart, ist die Wohnung ab 16:00 Uhr am Anreisetag verfügbar. Der Zugang erfolgt selbstständig über ein sicheres Schlüsselboxsystem. Die Zugangscodes werden nach einem telefonischen Check-in mitgeteilt.

6.2 Check-out
Sofern nicht anders vereinbart, muss die Wohnung spätestens um 10:15 Uhr am Abreisetag geräumt werden.

6.3 Zustandsbericht
Die Wohnung wird sauber und in gutem Zustand übergeben. Bitte hinterlassen Sie sie bei der Abreise in ordentlichem Zustand (Geschirr gespült, Müll entsorgt).

6.4 Reinigung
Die enthaltene Reinigung umfasst 2 Arbeitsstunden. Wenn der Zustand der Wohnung bei der Abreise zusätzliche Reinigungszeit erfordert, wird ein Zuschlag von 50€ pro zusätzlicher Stunde von der Kaution abgezogen.`;

    // ZH
    const zhContent = `6.1 入住
除非另有约定，公寓于抵达当天下午4:00起可用。通过安全钥匙箱系统自助进入。电话办理入住手续后将提供访问代码。

6.2 退房
除非另有约定，最迟于离开当天上午10:15前腾空公寓。

6.3 房况
公寓交付时干净且状况良好。离开时，请保持适当状态（洗好碗、倒好垃圾）。

6.4 清洁
包含的清洁费用涵盖2小时的工作。如果您离开时公寓的状况需要额外的清洁时间，每增加一小时将从押金中扣除50欧元。`;


    // Apply updates
    articles[articleIndex].contenu.fr = frContent;
    articles[articleIndex].contenu.en = enContent;
    articles[articleIndex].contenu.de = deContent;
    articles[articleIndex].contenu.zh = zhContent;

    await client
        .patch(doc._id)
        .set({ articles: articles })
        .commit();

    console.log('✅ Article 6 updated successfully with new times and "Sauf convention contraire"');
}

updateCgvArticle6();
