import { useLanguage } from '../../../context/LanguageContext';
import './Loader.scss';

export default function Loader() {
  const { t } = useLanguage();
  return (
    <div className="loader" role="status" aria-live="polite">
      <div className="loader__spinner" />
      <p className="loader__text">{t('common.loading')}</p>
    </div>
  );
}
