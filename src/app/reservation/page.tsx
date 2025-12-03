import { siteConfig } from '@/data/content';

export default function ReservationPage() {
  return (
    <div className="bg-cygne-cream min-h-screen flex flex-col">
      <div className="pt-40 pb-12 px-6 text-center">
            <h1 className="text-5xl font-serif mb-4 text-cygne-brown">Réserver</h1>
            <p className="text-cygne-brown uppercase tracking-[0.2em] text-xs font-bold opacity-70">
                Meilleur tarif garanti en direct
            </p>
      </div>

      <div className="flex-grow flex items-center justify-center px-4 py-16">
        <div className="bg-white p-10 md:p-16 max-w-3xl w-full shadow-lg border-t-4 border-cygne-brown text-center">
            <h2 className="text-3xl md:text-4xl font-serif text-cygne-brown mb-8">
                Votre séjour commence ici
            </h2>
            <p className="text-cygne-brown/70 mb-12 text-lg font-light max-w-lg mx-auto">
                Pour toute demande, privilégiez le contact direct. Nous vous répondons sous 24h.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
                <a href={`mailto:${siteConfig.contact.emailClient}`} className="bg-cygne-brown text-white py-5 px-8 hover:bg-cygne-gold transition duration-500 uppercase tracking-widest text-xs font-bold">
                    Par Email
                </a>
                <a href={`tel:${siteConfig.contact.mobile}`} className="border border-cygne-brown text-cygne-brown py-5 px-8 hover:bg-cygne-brown hover:text-white transition duration-500 uppercase tracking-widest text-xs font-bold">
                    {siteConfig.contact.mobile}
                </a>
            </div>
        </div>
      </div>
    </div>
  );
}