import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import './NotFound.scss';

export default function NotFound() {
  const { t } = useLanguage();
  return (
    <div className="page container not-found">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <span className="not-found__code">404</span>
        <h1>{t('notfound.title')}</h1>
        <p>{t('notfound.text')}</p>
        <Link to="/" className="btn btn--primary">
          {t('notfound.cta')}
        </Link>
      </motion.div>
    </div>
  );
}
