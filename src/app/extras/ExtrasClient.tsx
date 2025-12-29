'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Coffee, Wine, ConciergeBell, Sparkles, Car, Mail, Phone } from 'lucide-react';
import { siteConfig } from '@/data/content';

const iconMap: { [key: string]: any } = {
  coffee: Coffee,
  wine: Wine,
  concierge: ConciergeBell,
  cleaning: Sparkles,
  car: Car,
};

interface ExtrasClientProps {
  pageData: {
    header: {
      title: { fr: string; en: string; de: string; zh: string };
      subtitle: { fr: string; en: string; de: string; zh: string };
    };
    extras: Array<{
      icon: string;
      title: { fr: string; en: string; de: string; zh: string };
      description: { fr: string; en: string; de: string; zh: string };
      price?: { fr: string; en: string; de: string; zh: string };
      items?: { fr: string; en: string; de: string; zh: string };
    }>;
    services: Array<{
      icon: string;
      title: { fr: string; en: string; de: string; zh: string };
      description: { fr: string; en: string; de: string; zh: string };
    }>;
    contactCta: {
      title: { fr: string; en: string; de: string; zh: string };
      text: { fr: string; en: string; de: string; zh: string };
    };
  };
}

export default function ExtrasClient({ pageData }: ExtrasClientProps) {
  const { language } = useLanguage();

  const title = pageData?.header?.title?.[language] || pageData?.header?.title?.fr || '';
  const subtitle = pageData?.header?.subtitle?.[language] || pageData?.header?.subtitle?.fr || '';
  const extras = pageData?.extras || [];
  const services = pageData?.services || [];
  const ctaTitle = pageData?.contactCta?.title?.[language] || pageData?.contactCta?.title?.fr || '';
  const ctaText = pageData?.contactCta?.text?.[language] || pageData?.contactCta?.text?.fr || '';

  return (
    <div className="bg-cygne-cream min-h-screen">
      {/* Hero Section */}
      <div className="pt-40 pb-12 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-serif mb-4 text-cygne-brown"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-cygne-brown uppercase tracking-[0.2em] text-xs font-bold opacity-70"
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Extras Cards */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {extras.map((extra, index) => {
            const Icon = iconMap[extra.icon] || Coffee;
            const extraTitle = extra.title?.[language] || extra.title?.fr || '';
            const description = extra.description?.[language] || extra.description?.fr || '';
            const price = extra.price?.[language] || extra.price?.fr;
            const items = extra.items?.[language] || extra.items?.fr;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-lg border border-stone-100 hover:border-cygne-gold hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-cygne-gold/10 rounded-lg">
                    <Icon className="text-cygne-gold" size={32} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-serif text-cygne-brown mb-3">
                      {extraTitle}
                    </h3>
                    {price && (
                      <p className="text-cygne-gold font-bold text-lg mb-4">
                        {price}
                      </p>
                    )}
                    <p className="text-cygne-brown/70 mb-4 leading-relaxed">
                      {description}
                    </p>
                    {items && (
                      <div className="pt-4 border-t border-stone-200">
                        <p className="text-sm text-cygne-brown/60 leading-relaxed">
                          {items}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Services Section */}
        {services.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="grid md:grid-cols-3 gap-6">
              {services.map((service, index) => {
                const Icon = iconMap[service.icon] || ConciergeBell;
                const serviceTitle = service.title?.[language] || service.title?.fr || '';
                const description = service.description?.[language] || service.description?.fr || '';

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white p-6 rounded-lg shadow-md border border-stone-100 hover:border-cygne-gold hover:shadow-lg transition-all duration-300 text-center"
                  >
                    <div className="inline-flex p-4 bg-cygne-gold/10 rounded-full mb-4">
                      <Icon className="text-cygne-gold" size={28} />
                    </div>
                    <h3 className="text-lg font-bold text-cygne-brown mb-3">
                      {serviceTitle}
                    </h3>
                    <p className="text-sm text-cygne-brown/60 leading-relaxed">
                      {description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-cygne-brown text-white p-12 rounded-lg shadow-2xl text-center"
        >
          <h2 className="text-3xl font-serif mb-4">{ctaTitle}</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            {ctaText}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`mailto:${siteConfig.contact.emailClient}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-cygne-gold text-white uppercase tracking-wider text-xs font-bold hover:bg-white hover:text-cygne-brown transition-all duration-300 rounded-sm shadow-lg"
            >
              <Mail size={18} />
              Email
            </a>
            <a
              href={`tel:${siteConfig.contact.mobile}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white uppercase tracking-wider text-xs font-bold hover:bg-white hover:text-cygne-brown transition-all duration-300 rounded-sm"
            >
              <Phone size={18} />
              {siteConfig.contact.mobile}
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
