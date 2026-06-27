import { useLanguage } from '../../../context/LanguageContext';
import './LanguageToggle.scss';

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      className="language-toggle"
      onClick={toggleLanguage}
      aria-label="Switch language"
      title="EN / KA"
    >
      <span className={language === 'en' ? 'is-active' : ''}>EN</span>
      <span className="language-toggle__divider">/</span>
      <span className={language === 'ka' ? 'is-active' : ''}>ქა</span>
    </button>
  );
}
