'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Map from '@/components/Map';

export default function Home() {
  return (
    <div className="bg-cygne-cream">

      {/* HERO SECTION : Fond Beige, Texte Marron */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-cygne-cream">

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 text-center px-6 max-w-6xl mx-auto text-cygne-brown"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xs md:text-sm uppercase tracking-widest-xl mb-8 text-cygne-gold font-sans font-bold"
          >
            Colmar — Alsace
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-6xl md:text-9xl font-serif mb-10 leading-[0.95] font-thin text-cygne-brown"
          >
            Les Suites du Cygne
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="text-lg md:text-2xl font-light tracking-wide mb-16 max-w-2xl mx-auto opacity-90 leading-relaxed"
          >
            L'art de vivre à l'alsacienne, revisité dans une atmosphère contemporaine et chaleureuse.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="flex flex-col md:flex-row gap-6 justify-center items-center"
          >
            <Link
              href="/appartements"
              className="group px-10 py-5 bg-cygne-brown text-white uppercase tracking-[0.2em] text-xs font-bold hover:bg-cygne-gold transition-all duration-500 rounded-sm relative overflow-hidden"
            >
              <span className="relative z-10">Découvrir nos suites</span>
              <span className="absolute inset-0 bg-cygne-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Indicateur de scroll subtil */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-16 bg-cygne-gold/40"
          />
        </motion.div>
      </section>

      {/* SECTION IMAGE VILLE DE COLMAR - Bien intégrée */}
      <section className="pt-32 md:pt-40 pb-24 md:pb-32 px-6 bg-cygne-cream">
        <div className="max-w-4xl mx-auto">
          {/* Titre optionnel au-dessus */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-cygne-gold text-xs uppercase tracking-widest-xl mb-4 block font-bold">
              Notre Emplacement
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-cygne-brown font-light">
              Au cœur de Colmar
            </h2>
          </motion.div>

          {/* Image avec bords et ombres */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-full aspect-[4/3] rounded-sm overflow-hidden shadow-2xl border border-cygne-brown/10 group"
          >
            <Image
              src="/images/colmar.jpg"
              alt="Colmar - La ville"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 1200px"
              priority
            />
            {/* Overlay subtil pour la profondeur */}
            <div className="absolute inset-0 bg-gradient-to-t from-cygne-brown/20 via-transparent to-transparent opacity-60" />
          </motion.div>

          {/* Légende sous l'image */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mt-8 text-cygne-brown/70 text-sm italic"
          >
            À quelques pas de la Petite Venise et du centre historique
          </motion.p>
        </div>
      </section>

      {/* SECTION EDITO : Fond Blanc pour créer une nuance douce */}
      <section className="py-36 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-cygne-gold text-xs uppercase tracking-widest-xl mb-6 block font-bold"
          >
            Notre Philosophie
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-serif text-cygne-brown mb-12 leading-tight font-light"
          >
            Une maison de famille, <br /> une âme d'artiste.
          </motion.h2>

          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-[1px] h-20 bg-cygne-gold mx-auto mb-12 origin-top"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-cygne-brown/80 text-lg md:text-xl leading-loose font-light mb-10 max-w-2xl mx-auto"
          >
            Nichée aux portes de la vieille ville, notre demeure alsacienne a été entièrement repensée pour vous offrir un refuge de sérénité.
            Loin des hébergements standardisés, nous vous proposons de véritables espaces de vie (jusqu'à 115m²), où le charme de l'ancien côtoie le confort absolu.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Link
              href="/infos"
              className="group inline-block text-cygne-brown border-b border-cygne-brown/30 pb-1 hover:text-cygne-gold hover:border-cygne-gold transition-all duration-400 uppercase tracking-widest text-xs"
            >
              En savoir plus sur la maison
              <span className="inline-block ml-2 group-hover:translate-x-2 transition-transform duration-400">→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SECTION APERCU */}
      <section className="grid md:grid-cols-2 min-h-[650px]">
        {/* Colonne Gauche : Marron pour casser le rythme */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="bg-cygne-brown text-white flex flex-col justify-center items-center p-16 md:p-20 text-center"
        >
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-6xl font-serif mb-8 font-light"
          >
            Nos Suites
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-12 max-w-sm font-light leading-loose text-white/90 text-lg"
          >
            De la poésie de la suite Baudelaire à la grandeur de la suite Asselin. Des espaces uniques pour 2 à 10 personnes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Link
              href="/appartements"
              className="group inline-block px-10 py-4 border border-white/40 hover:bg-white hover:text-cygne-brown transition-all duration-500 uppercase tracking-widest text-xs relative overflow-hidden"
            >
              <span className="relative z-10">Voir les appartements</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Colonne Droite : Image intérieur */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="bg-stone-200 relative min-h-[450px] md:min-h-[650px] overflow-hidden group"
        >
          <Image
            src="/images/baudelaire.jpg"
            alt="Intérieur des suites"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
      </section>

      {/* SECTION LOCALISATION AVEC CARTE */}
      <section className="py-20 md:py-32 px-6 bg-cygne-cream">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <span className="text-cygne-gold text-xs uppercase tracking-widest-xl mb-4 block font-bold">
              Localisation
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-cygne-brown font-light mb-6">
              Comment nous trouver
            </h2>
            <p className="text-cygne-brown/70 text-lg max-w-2xl mx-auto">
              20-22 Rue des Boulangers, 68000 Colmar<br />
              <span className="text-sm">À quelques minutes à pied du centre historique</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-[500px]"
          >
            <Map />
          </motion.div>
        </div>
      </section>

    </div>
  );
}