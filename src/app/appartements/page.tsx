import SuiteCard from '@/components/SuiteCard';
import { suites } from '@/data/content';

export default function AppartementsPage() {
  return (
    <div className="bg-cygne-cream min-h-screen">
      {/* Header Beige */}
      <div className="pt-40 pb-12 px-6 text-center">
        <h1 className="text-5xl font-serif mb-4 text-cygne-brown">Nos Appartements</h1>
        <p className="text-cygne-brown uppercase tracking-[0.2em] text-xs font-bold opacity-70">
            Confort moderne & Charme Alsacien
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
            {suites.map((suite) => (
                <SuiteCard key={suite.id} suite={suite} />
            ))}
        </div>
        <div className="mt-20 text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-serif text-cygne-brown mb-4">Services inclus</h3>
            <p className="text-cygne-brown/70 leading-relaxed">
                Wifi haut débit, Climatisation, Linge de maison fourni.
            </p>
        </div>
      </div>
    </div>
  );
}