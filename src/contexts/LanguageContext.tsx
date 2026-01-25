'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'fr' | 'en' | 'de' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children, initialLang = 'fr' }: { children: ReactNode, initialLang?: Language }) {
  const [language, setLanguageState] = useState<Language>(initialLang);
  const [translations, setTranslations] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [minLoadingDone, setMinLoadingDone] = useState(false);

  useEffect(() => {
    // Force sync state with initialLang prop if it changes (e.g. navigation)
    if (initialLang) {
      setLanguageState(initialLang);
    }
  }, [initialLang]);

  useEffect(() => {
    // Délai minimum de 300ms pour l'écran de chargement
    const minLoadingTimer = setTimeout(() => {
      setMinLoadingDone(true);
    }, 300);

    return () => clearTimeout(minLoadingTimer);
  }, []);

  useEffect(() => {
    // Load translations for current language
    setIsLoading(true);
    setMinLoadingDone(false);

    const minLoadingTimer = setTimeout(() => {
      setMinLoadingDone(true);
    }, 300);

    import(`@/translations/${language}.json`)
      .then((module) => {
        setTranslations(module.default);
        setIsLoading(false);
      })
      .catch(() => {
        setTranslations({});
        setIsLoading(false);
      });

    return () => clearTimeout(minLoadingTimer);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value = translations;

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) return key;
    }

    return value || key;
  };

  // Ne pas afficher le contenu tant que les traductions ne sont pas chargées ET que le délai minimum n'est pas écoulé
  if (!translations || isLoading || !minLoadingDone) {
    return (
      <div className="fixed inset-0 bg-cygne-cream flex items-center justify-center z-[10000]">
        <div className="flex flex-col items-center gap-8">
          {/* Spinners concentriques animés */}
          <div className="relative w-24 h-24">
            {/* Cercle extérieur */}
            <div className="absolute inset-0 border-4 border-cygne-brown/20 border-t-cygne-gold rounded-full animate-spin"></div>
            {/* Cercle intérieur - rotation inverse */}
            <div className="absolute inset-3 border-4 border-cygne-gold/20 border-b-cygne-brown rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
            {/* Point central */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 bg-cygne-gold rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
