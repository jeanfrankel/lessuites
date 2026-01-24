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

async function updateInfosTrainStation() {
    console.log('Fetching pageInfos...');
    const doc = await client.fetch('*[_id == "pageInfos"][0]');

    if (!doc) {
        console.error('Document pageInfos not found');
        return;
    }

    const accessNotes = doc.accessNotes || [];

    // Check if we already have a note about the distance (1km) or 10 min
    // In the migration script, there was "Situé à seulement 1 km de la gare de Colmar"
    // The user wants: "Le logement est à 10 min à pied de la gare de Colmar"

    // Let's modify the existing one if it matches "gare de colmar" closely, or add new if not found.
    const trainNoteIndex = accessNotes.findIndex((note: any) =>
        note.text?.fr?.toLowerCase().includes('gare de colmar')
    );

    const newNote = {
        text: {
            fr: 'Le logement est à 10 min à pied de la gare de Colmar.',
            en: 'The accommodation is a 10-minute walk from Colmar train station.',
            de: 'Die Unterkunft ist 10 Gehminuten vom Bahnhof Colmar entfernt.',
            zh: '住宿距离科尔马火车站步行 10 分钟。',
        }
    };

    if (trainNoteIndex !== -1) {
        console.log('Found existing train station note. Updating it...');
        accessNotes[trainNoteIndex] = newNote;
    } else {
        console.log('No existing train station note found. Adding new one...');
        accessNotes.push(newNote);
    }

    await client
        .patch(doc._id)
        .set({ accessNotes: accessNotes })
        .commit();

    console.log('✅ pageInfos updated successfully with train station info');
}

updateInfosTrainStation();
