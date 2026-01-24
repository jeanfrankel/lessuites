import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';
import { pageMentionsLegalesQuery } from '../src/sanity/lib/queries';

dotenv.config({ path: '.env.local' });

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    token: process.env.SANITY_API_TOKEN!,
    apiVersion: '2024-01-01',
    useCdn: false,
});

async function updateLegalPagesEditor() {
    console.log('Update legal pages editor info...');

    try {
        // 1. Update Mentions Légales
        console.log('Fetching pageMentionsLegales...');
        const mentionsDoc = await client.fetch('*[_id == "pageMentionsLegales"][0]');

        if (mentionsDoc) {
            console.log('Updating pageMentionsLegales...');
            // Update editor name to add ABS 2 JF Kelber
            // Check if it's already there to avoid duplication
            let nom = mentionsDoc.editeur?.nom || 'Immo Com SARL';
            if (!nom.includes('ABS 2 JF Kelber')) {
                nom = `${nom}\nABS 2 JF Kelber`;

                await client
                    .patch(mentionsDoc._id)
                    .set({
                        editeur: {
                            ...mentionsDoc.editeur,
                            nom: nom
                        }
                    })
                    .commit();
                console.log('✅ Mentions Légales updated');
            } else {
                console.log('ℹ️ Mentions Légales already contains ABS 2 JF Kelber');
            }
        }

        // 2. Politique de Confidentialité - NO editor field usually, but let's check
        // The previous seeding script didn't put an editor field in privacy policy, but it has contact info at the bottom
        console.log('Fetching pagePolitiqueConfidentialite...');
        const privacyDoc = await client.fetch('*[_id == "pagePolitiqueConfidentialite"][0]');

        // Check if we need to update contact info or intro text
        // The request says "below Immo Com SARL", assume it means wherever Immo Com SARL appears as an entity name

        // Privacy policy might mention it in "Introduction" or "Contact"
        // In seed script: "Contact" object has "nom": "Les Suites du Cygne".
        // "Introduction" mentions "Les Suites du Cygne".
        // Immo Com SARL is mentioned in "Droit d'accès" section address.

        if (privacyDoc) {
            console.log('Updating pagePolitiqueConfidentialite...');
            const sections = privacyDoc.sections || [];
            let modified = false;

            // Look for "Droit d'accès" section which contains the address with Immo Com SARL
            const accessSectionIndex = sections.findIndex((s: any) => s._key === 'droit-acces');
            if (accessSectionIndex !== -1) {
                const content = sections[accessSectionIndex].contenu;
                // Replace Immo Com SARL with Immo Com SARL - ABS 2 JF Kelber in addresses
                // But only if not already present

                const replaceInText = (text: string) => {
                    if (text && text.includes('Immo Com SARL') && !text.includes('ABS 2 JF Kelber')) {
                        return text.replace('Immo Com SARL', 'Immo Com SARL\nABS 2 JF Kelber');
                    }
                    return text;
                };

                sections[accessSectionIndex].contenu = {
                    fr: replaceInText(content.fr),
                    en: replaceInText(content.en),
                    de: replaceInText(content.de),
                    zh: replaceInText(content.zh)
                };
                modified = true;
            }

            if (modified) {
                await client
                    .patch(privacyDoc._id)
                    .set({ sections: sections })
                    .commit();
                console.log('✅ Politique de Confidentialité updated');
            } else {
                console.log('ℹ️ No "Immo Com SARL" found to update in Privacy Policy (or already updated)');
            }
        }


        // 3. Conditions Générales
        console.log('Fetching pageConditionsGenerales...');
        const cgvDoc = await client.fetch('*[_id == "pageConditionsGenerales"][0]');

        // CGV usually mentions Immo Com SARL in article 1 (Objet) or contact
        if (cgvDoc) {
            console.log('Updating pageConditionsGenerales...');
            const articles = cgvDoc.articles || [];
            let modified = false;

            // Check Article 1 (Objet)
            const article1Index = articles.findIndex((a: any) => a.numero === 'Article 1');
            if (article1Index !== -1) {
                // Actually Article 1 mentions "Les Suites du Cygne" in seed script, not Immo Com SARL directly?
                // Wait, seed script says: "contractuelles entre Les Suites du Cygne et ses clients"
                // But Article 12 (Litiges) mentions Immo Com SARL
            }

            // Let's sweep all articles for "Immo Com SARL"
            articles.forEach((article: any) => {
                const updateContent = (text: string) => {
                    if (text && text.includes('Immo Com SARL') && !text.includes('ABS 2 JF Kelber')) {
                        // Try to preserve readable structure, add it on new line if possible
                        return text.replace('Immo Com SARL', 'Immo Com SARL (ABS 2 JF Kelber)');
                    }
                    return text;
                };

                if (article.contenu) {
                    const oldFr = article.contenu.fr;
                    const newFr = updateContent(oldFr);

                    if (oldFr !== newFr) {
                        article.contenu.fr = newFr;
                        article.contenu.en = updateContent(article.contenu.en);
                        article.contenu.de = updateContent(article.contenu.de);
                        article.contenu.zh = updateContent(article.contenu.zh);
                        modified = true;
                    }
                }
            });

            if (modified) {
                await client
                    .patch(cgvDoc._id)
                    .set({ articles: articles })
                    .commit();
                console.log('✅ Conditions Générales updated');
            } else {
                console.log('ℹ️ No "Immo Com SARL" found to update in CGV (or already updated)');
            }
        }


    } catch (error) {
        console.error('Error updating legal pages:', error);
    }
}

updateLegalPagesEditor();
