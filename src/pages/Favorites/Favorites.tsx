import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useFavorites } from '../../context/FavoritesContext';
import { useLanguage } from '../../context/LanguageContext';
import CharacterCard from '../../components/character/CharacterCard/CharacterCard';
import CharacterQuickView from '../../components/character/CharacterQuickView/CharacterQuickView';
import Modal from '../../components/ui/Modal/Modal';
import type { Character } from '../../types';
import './Favorites.scss';

export default function Favorites() {
  const { favorites, count } = useFavorites();
  const { t } = useLanguage();
  const [selected, setSelected] = useState<Character | null>(null);

  return (
    <div className="page container favorites">
      <header className="favorites__header">
        <h1>{t('favorites.title')}</h1>
        {count > 0 && (
          <span className="favorites__count">
            {count} {t('favorites.count')}
          </span>
        )}
      </header>

      {count === 0 ? (
        <motion.div
          className="favorites__empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span className="favorites__empty-icon">🤍</span>
          <p>{t('favorites.empty')}</p>
          <Link to="/characters" className="btn btn--primary">
            {t('nav.characters')}
          </Link>
        </motion.div>
      ) : (
        <div className="favorites__grid">
          <AnimatePresence mode="popLayout">
            {favorites.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                onSelect={setSelected}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      <Modal
        isOpen={selected !== null}
        onClose={() => setSelected(null)}
        title={selected?.name}
      >
        {selected && <CharacterQuickView character={selected} />}
      </Modal>
    </div>
  );
}
