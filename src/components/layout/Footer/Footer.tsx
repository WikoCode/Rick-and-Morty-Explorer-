import { useLanguage } from '../../../context/LanguageContext';
import './Footer.scss';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>{t('footer.built')}</p>
        <p className="footer__muted">
          {t('footer.data')} ·{' '}
          <a
            href="https://rickandmortyapi.com"
            target="_blank"
            rel="noreferrer"
          >
            rickandmortyapi.com
          </a>
        </p>
      </div>
    </footer>
  );
}
