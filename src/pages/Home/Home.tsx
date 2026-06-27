import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import logo from '../../assets/logo.svg';
import rick from '../../assets/rick.jpg';
import './Home.scss';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5 },
  }),
};

export default function Home() {
  const { t } = useLanguage();

  const features = [
    { icon: '🧬', title: t('home.feature1.title'), text: t('home.feature1.text') },
    { icon: '📺', title: t('home.feature2.title'), text: t('home.feature2.text') },
    { icon: '❤️', title: t('home.feature3.title'), text: t('home.feature3.text') },
  ];

  return (
    <div className="home">
      <section className="home__hero">
        <div className="container home__hero-inner">
          <motion.div
            className="home__hero-content"
            initial="hidden"
            animate="visible"
          >
            <motion.img
              className="home__logo"
              src={logo}
              alt="Rick and Morty"
              custom={0}
              variants={fadeUp}
            />
            <motion.span className="home__tagline" custom={1} variants={fadeUp}>
              {t('home.tagline')}
            </motion.span>
            <motion.h1 custom={2} variants={fadeUp}>
              {t('home.title')}
            </motion.h1>
            <motion.p className="home__subtitle" custom={3} variants={fadeUp}>
              {t('home.subtitle')}
            </motion.p>
            <motion.div className="home__cta" custom={4} variants={fadeUp}>
              <Link to="/characters" className="btn btn--primary">
                {t('home.cta.characters')}
              </Link>
              <Link to="/episodes" className="btn btn--ghost">
                {t('home.cta.episodes')}
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="home__hero-art"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="home__glow" aria-hidden="true" />
            <img className="home__rick" src={rick} alt="Rick Sanchez" />
          </motion.div>
        </div>
      </section>

      <section className="container home__features">
        {features.map((f, i) => (
          <motion.article
            key={f.title}
            className="home__feature"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.1, duration: 0.45 }}
          >
            <span className="home__feature-icon">{f.icon}</span>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </motion.article>
        ))}
      </section>
    </div>
  );
}
