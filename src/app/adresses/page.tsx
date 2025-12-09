'use client';

import { motion } from 'framer-motion';
import { bonnesAdresses } from '@/data/content';
import { bonnesAdressesEn } from '@/data/content-en';
import { bonnesAdressesDe } from '@/data/content-de';
import { bonnesAdressesZh } from '@/data/content-zh';
import { ExternalLink, Utensils, Coffee, ShoppingBag, Store, Wrench } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const categoryIcons: { [key: string]: any } = {
  "Restaurants": Utensils,
  "Bars": Coffee,
  "Spécialités": Store,
  "Specialties": Store,
  "Spezialitäten": Store,
  "特色店": Store,
  "Shopping": ShoppingBag,
  "购物": ShoppingBag,
  "Utile et pratique": Wrench,
  "Useful & Practical": Wrench,
  "Nützlich & Praktisch": Wrench,
  "实用信息": Wrench,
  "餐厅": Utensils,
  "酒吧": Coffee,
};

export default function AdressesPage() {
  const { t, language } = useLanguage();
  const currentAdresses =
    language === 'en' ? bonnesAdressesEn :
    language === 'de' ? bonnesAdressesDe :
    language === 'zh' ? bonnesAdressesZh :
    bonnesAdresses;

  return (
    <div className="bg-cygne-cream min-h-screen">
      <div className="pt-40 pb-12 px-6 text-center">
            <h1 className="text-5xl font-serif mb-4 text-cygne-brown">{t('addresses.title')}</h1>
            <p className="text-cygne-brown uppercase tracking-[0.2em] text-xs font-bold opacity-70">
                {t('addresses.subtitle')}
            </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="space-y-16">
            {currentAdresses.map((category, idx) => {
              const Icon = categoryIcons[category.category];
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
                    {Icon && <Icon className="text-cygne-gold" size={32} />}
                    <h2 className="text-4xl font-serif text-cygne-brown">{category.category}</h2>
                  </div>

                  {/* Grille des établissements */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.items.map((item: any, i) => (
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

                              {item.type && (
                                <p className="text-xs uppercase tracking-wider text-cygne-gold font-bold mb-3">
                                  {item.type}
                                </p>
                              )}

                              <p className="text-cygne-brown/70 text-sm leading-relaxed">
                                  {item.desc}
                              </p>
                          </div>
                      ))}
                  </div>
                </motion.div>
              );
            })}
        </div>
      </div>
    </div>
  );
}