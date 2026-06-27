import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  type ReactNode,
} from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import {
  translations,
  type Language,
  type TranslationKey,
} from '../i18n/translations';

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  /** Translate a key into the active language. */
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useLocalStorage<Language>('rm-lang', 'en');

  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  const t = useCallback(
    (key: TranslationKey) => translations[language][key] ?? key,
    [language]
  );

  const toggleLanguage = () =>
    setLanguage(language === 'en' ? 'ka' : 'en');

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, toggleLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx)
    throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}
