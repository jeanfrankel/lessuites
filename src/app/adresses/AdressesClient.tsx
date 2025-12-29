'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Utensils, Coffee, ShoppingBag, Store, Wrench } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const iconMap: { [key: string]: any } = {
  restaurant: Utensils,
  bar: Coffee,
  shopping: ShoppingBag,
  specialty: Store,
  practical: Wrench,
};

interface AdressesClientProps {
  pageData: {
    header: {
      title: { fr: string; en: string; de: string; zh: string };
      subtitle: { fr: string; en: string; de: string; zh: string };
    };
    categories: Array<{
      icon: string;
      categoryName: { fr: string; en: string; de: string; zh: string };
      items: Array<{
        name: string;
        type?: { fr: string; en: string; de: string; zh: string };
        description: { fr: string; en: string; de: string; zh: string };
        link?: string;
      }>;
    }>;
  };
}

export default function AdressesClient({ pageData }: AdressesClientProps) {
  const { language } = useLanguage();

  const title = pageData?.header?.title?.[language] || pageData?.header?.title?.fr || '';
  const subtitle = pageData?.header?.subtitle?.[language] || pageData?.header?.subtitle?.fr || '';
  const categories = pageData?.categories || [];

  return (
    <div className="bg-cygne-cream min-h-screen">
      <div className="pt-40 pb-12 px-6 text-center">
        <h1 className="text-5xl font-serif mb-4 text-cygne-brown">{title}</h1>
        <p className="text-cygne-brown uppercase tracking-[0.2em] text-xs font-bold opacity-70">
          {subtitle}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="space-y-16">
          {categories.map((category, idx) => {
            const Icon = iconMap[category.icon] || Store;
            const categoryName = category.categoryName?.[language] || category.categoryName?.fr || '';

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                {/* Titre de catégorie */}
                <div className="flex items-center gap-3 mb-8">
                  <Icon className="text-cygne-gold" size={32} />
                  <h2 className="text-4xl font-serif text-cygne-brown">{categoryName}</h2>
                </div>

                {/* Grille des établissements */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items?.map((item: any, i: number) => {
                    const itemType = item.type?.[language] || item.type?.fr || '';
                    const description = item.description?.[language] || item.description?.fr || '';

                    return (
                      <div
                        key={i}
                        className="group bg-white p-6 rounded-sm shadow-sm border border-stone-100 hover:border-cygne-gold hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-lg font-bold text-cygne-brown group-hover:text-cygne-gold transition-colors flex-1">
                            {item.name}
                          </h3>
                          {item.link && (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-cygne-gold hover:text-cygne-brown transition-colors ml-2"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink size={18} />
                            </a>
                          )}
                        </div>

                        {itemType && (
                          <p className="text-xs uppercase tracking-wider text-cygne-gold font-bold mb-3">
                            {itemType}
                          </p>
                        )}

                        <p className="text-cygne-brown/70 text-sm leading-relaxed">
                          {description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
