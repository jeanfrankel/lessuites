'use client';

import { motion } from 'framer-motion';
import Map from '@/components/Map';
import { siteConfig } from '@/data/content';
import { Phone, Mail, MapPin, Clock, KeyRound, Info, Train } from 'lucide-react';

export default function InfosPage() {
  return (
    <div className="bg-cygne-cream min-h-screen">
       <div className="pt-40 pb-12 px-6 text-center">
            <h1 className="text-5xl font-serif mb-4 text-cygne-brown">Infos & Accès</h1>
            <p className="text-cygne-brown uppercase tracking-[0.2em] text-xs font-bold opacity-70">
                Toutes les informations pratiques
            </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Section Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-serif text-cygne-brown mb-8 text-center">Nous contacter</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Téléphone fixe */}
            <a href={`tel:${siteConfig.contact.phone}`} className="flex flex-col items-center gap-3 p-6 bg-white rounded-sm shadow-sm border border-stone-100 hover:border-cygne-gold hover:shadow-md transition">
              <Phone className="text-cygne-gold" size={24} />
              <div className="text-center">
                <span className="block text-xs uppercase tracking-wider text-cygne-brown/50 mb-2">Téléphone</span>
                <p className="text-cygne-brown font-medium text-sm">{siteConfig.contact.phone}</p>
              </div>
            </a>

            {/* Mobile */}
            <a href={`tel:${siteConfig.contact.mobile}`} className="flex flex-col items-center gap-3 p-6 bg-white rounded-sm shadow-sm border border-stone-100 hover:border-cygne-gold hover:shadow-md transition">
              <Phone className="text-cygne-gold" size={24} />
              <div className="text-center">
                <span className="block text-xs uppercase tracking-wider text-cygne-brown/50 mb-2">Mobile</span>
                <p className="text-cygne-brown font-medium text-sm">{siteConfig.contact.mobile}</p>
              </div>
            </a>

            {/* Email clients */}
            <a href={`mailto:${siteConfig.contact.emailClient}`} className="flex flex-col items-center gap-3 p-6 bg-white rounded-sm shadow-sm border border-stone-100 hover:border-cygne-gold hover:shadow-md transition">
              <Mail className="text-cygne-gold" size={24} />
              <div className="text-center">
                <span className="block text-xs uppercase tracking-wider text-cygne-brown/50 mb-2">Relations Clients</span>
                <p className="text-cygne-brown font-medium text-sm break-all">{siteConfig.contact.emailClient}</p>
              </div>
            </a>

            {/* Email admin */}
            <a href={`mailto:${siteConfig.contact.emailAdmin}`} className="flex flex-col items-center gap-3 p-6 bg-white rounded-sm shadow-sm border border-stone-100 hover:border-cygne-gold hover:shadow-md transition">
              <Mail className="text-cygne-gold" size={24} />
              <div className="text-center">
                <span className="block text-xs uppercase tracking-wider text-cygne-brown/50 mb-2">Administration</span>
                <p className="text-cygne-brown font-medium text-sm break-all">{siteConfig.contact.emailAdmin}</p>
              </div>
            </a>
          </div>
        </motion.div>

        {/* Section Accès et Informations pratiques */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Colonne gauche : Informations pratiques */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Adresse et Accès */}
            <div className="bg-white p-8 rounded-sm shadow-sm border border-stone-100">
              <div className="flex items-start gap-4 mb-6">
                <MapPin className="text-cygne-gold shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="text-xl font-serif text-cygne-brown mb-3">Adresse & Accès</h3>
                  <p className="text-cygne-brown font-medium mb-3">{siteConfig.contact.address}</p>
                  <div className="space-y-2 text-sm text-cygne-brown/70 leading-relaxed">
                    <p>• Les suites sont au n° 20, mais <strong className="text-cygne-brown">l'entrée se fait par le 22</strong> (juste à droite de la pharmacie)</p>
                    <p>• La zone est piétonne</p>
                    <p className="flex items-center gap-2">
                      <Train size={16} className="text-cygne-gold" />
                      Situé à seulement 1 km de la gare de Colmar
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Check-in */}
            <div className="bg-white p-8 rounded-sm shadow-sm border border-stone-100">
              <div className="flex items-start gap-4">
                <KeyRound className="text-cygne-gold shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="text-xl font-serif text-cygne-brown mb-4">Check-in</h3>
                  <div className="space-y-3 text-sm text-cygne-brown/70 leading-relaxed">
                    <p className="font-medium text-cygne-brown">
                      <Clock className="inline mr-2" size={16} />
                      À partir de 17h
                    </p>
                    <p>• Accès via digicode et boîte à clé</p>
                    <p className="bg-cygne-gold/10 p-3 rounded-sm border-l-4 border-cygne-gold">
                      <strong className="text-cygne-brown">Check-in téléphonique obligatoire</strong> avant votre arrivée
                    </p>
                    <p>• Si vos horaires d'arrivée ne sont pas entre 17h et 21h, contactez-nous pour organiser votre accès</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Check-out */}
            <div className="bg-white p-8 rounded-sm shadow-sm border border-stone-100">
              <div className="flex items-start gap-4">
                <Clock className="text-cygne-gold shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="text-xl font-serif text-cygne-brown mb-3">Check-out</h3>
                  <p className="text-cygne-brown font-medium">Jusqu'à 12h</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Colonne droite : Carte */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="h-full min-h-[600px]"
          >
            <Map />
          </motion.div>
        </div>
      </div>
    </div>
  );
}