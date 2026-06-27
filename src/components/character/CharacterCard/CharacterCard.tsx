import { motion } from 'framer-motion';
import { useFavorites } from '../../../context/FavoritesContext';
import { useLanguage } from '../../../context/LanguageContext';
import StatusBadge from '../../ui/StatusBadge/StatusBadge';
import type { Character } from '../../../types';
import './CharacterCard.scss';

interface CharacterCardProps {
  character: Character;
  /** Called when the card body is clicked (opens the quick-view modal). */
  onSelect: (character: Character) => void;
}

export default function CharacterCard({
  character,
  onSelect,
}: CharacterCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { t } = useLanguage();
  const favorite = isFavorite(character.id);

  return (
    <motion.article
      className="character-card"
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
    >
      <button
        className="character-card__heart"
        aria-label={favorite ? t('common.removeFavorite') : t('common.addFavorite')}
        aria-pressed={favorite}
        onClick={() => toggleFavorite(character)}
      >
        <span className={favorite ? 'is-active' : ''}>{favorite ? '❤️' : '🤍'}</span>
      </button>

      <button
        className="character-card__body"
        onClick={() => onSelect(character)}
        aria-label={`${t('common.viewDetails')}: ${character.name}`}
      >
        <div className="character-card__image-wrap">
          <img
            src={character.image}
            alt={character.name}
            loading="lazy"
            width={300}
            height={300}
          />
        </div>
        <div className="character-card__info">
          <h3 className="character-card__name">{character.name}</h3>
          <StatusBadge status={character.status} />
          <p className="character-card__species">{character.species}</p>
        </div>
      </button>
    </motion.article>
  );
}
