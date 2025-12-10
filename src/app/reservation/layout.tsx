import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Réservation en Ligne | Appartements 4 Étoiles Colmar | Les Suites du Cygne',
  description: 'Réservez directement votre appartement de charme 4 étoiles à Colmar. Meilleur tarif garanti. Disponibilité en temps réel. Check-in 16h, Check-out 11h.',
  keywords: [
    'réserver appartement Colmar',
    'réservation en ligne Colmar',
    'booking Colmar centre-ville',
    'disponibilité appartement Colmar',
    'meilleur tarif Colmar',
    'réservation directe Colmar'
  ],
  openGraph: {
    title: 'Réservation | Appartements 4 Étoiles Colmar',
    description: 'Réservez directement votre appartement. Meilleur tarif garanti.',
    url: 'https://lessuitesducygne.com/reservation',
  },
  alternates: {
    canonical: 'https://lessuitesducygne.com/reservation',
  },
};

export default function ReservationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
