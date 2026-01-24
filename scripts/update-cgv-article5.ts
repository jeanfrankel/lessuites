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

async function updateCgvArticle5() {
    console.log('Fetching pageConditionsGenerales...');
    const doc = await client.fetch('*[_id == "pageConditionsGenerales"][0]');

    if (!doc) {
        console.error('Document pageConditionsGenerales not found');
        return;
    }

    const articles = doc.articles || [];
    const articleIndex = articles.findIndex((a: any) => a.numero === 'Article 5' || a._key === 'article-5');

    if (articleIndex === -1) {
        console.error('Article 5 not found');
        return;
    }

    console.log('Found Article 5, updating content...');

    const newFrenchContent = `5.1 Annulation par le client

• Plus de 60 jours avant l'arrivée : Annulation possible moyennant 50€ de frais d'annulation. L'acompte (moins les frais) est remboursé.
• Moins de 60 jours avant l'arrivée : 100% du montant total est dû.
• Non-présentation (no-show) : 100% du montant total est dû.

5.2 Assurance annulation
Nous vous recommandons de souscrire une assurance annulation auprès de votre assureur ou d'un organisme spécialisé.

5.3 Annulation par le propriétaire
En cas d'annulation de notre fait, le client sera intégralement remboursé des sommes versées. Aucune indemnité supplémentaire ne pourra être réclamée.`;

    // Update French content
    articles[articleIndex].contenu.fr = newFrenchContent;

    // Optional: Update English content to match the new logic (Less than 60 days = 100%)
    // Old English:
    // • More than 60 days before arrival: Cancellation possible with €50 cancellation fee. Deposit (minus fees) is refunded.
    // • Between 60 and 30 days before arrival: 50% of total amount is due.
    // • Less than 30 days before arrival: 100% of total amount is due.

    // New English logic implied:
    const newEnglishContent = `5.1 Cancellation by the Client

• More than 60 days before arrival: Cancellation possible with €50 cancellation fee. Deposit (minus fees) is refunded.
• Less than 60 days before arrival: 100% of total amount is due.
• No-show: 100% of total amount is due.

5.2 Cancellation Insurance
We recommend taking out cancellation insurance with your insurer or a specialized organization.

5.3 Cancellation by the Owner
In case of cancellation on our part, the client will be fully refunded. No additional compensation may be claimed.`;

    articles[articleIndex].contenu.en = newEnglishContent;


    // Optional: Update German content
    const newGermanContent = `5.1 Stornierung durch den Kunden

• Mehr als 60 Tage vor Anreise: Stornierung möglich mit 50€ Stornogebühr. Anzahlung (abzüglich Gebühren) wird erstattet.
• Weniger als 60 Tage vor Anreise: 100% des Gesamtbetrags sind fällig.
• Nichterscheinen: 100% des Gesamtbetrags sind fällig.

5.2 Reiserücktrittsversicherung
Wir empfehlen den Abschluss einer Reiserücktrittsversicherung bei Ihrem Versicherer oder einem spezialisierten Anbieter.

5.3 Stornierung durch den Eigentümer
Im Falle einer Stornierung unsererseits wird der Kunde vollständig erstattet. Keine zusätzliche Entschädigung kann geltend gemacht werden.`;

    articles[articleIndex].contenu.de = newGermanContent;

    // Optional: Update Chinese content (Assuming translations based on logic)
    const newChineseContent = `5.1 客户取消

• 抵达前超过60天：可取消，需支付50欧元取消费。定金（扣除费用后）将退还。
• 抵达前少于60天：需支付总金额的100%。
• 未入住：需支付总金额的100%。

5.2 取消保险
我们建议您向您的保险公司或专业机构购买取消保险。

5.3 业主取消
如果我们取消，客户将获得全额退款。不得要求额外赔偿。`;

    articles[articleIndex].contenu.zh = newChineseContent;

    await client
        .patch(doc._id)
        .set({ articles: articles })
        .commit();

    console.log('✅ Article 5 updated successfully');
}

updateCgvArticle5();
