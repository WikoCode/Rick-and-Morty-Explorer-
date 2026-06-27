import { Link } from 'react-router-dom';
import { useFavorites } from '../../../context/FavoritesContext';
import { useLanguage } from '../../../context/LanguageContext';
import StatusBadge from '../../ui/StatusBadge/StatusBadge';
import type { Character } from '../../../types';
import './CharacterQuickView.scss';

/** Content shown inside the quick-view Modal for a single character. */
export default function CharacterQuickView({
  character,
}: {
  character: Character;
}) {
  const { t } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(character.id);

  const rows: { label: string; value: string }[] = [
    { label: t('detail.species'), value: character.species },
    { label: t('detail.gender'), value: t(`gender.${character.gender}`) },
    { label: t('detail.origin'), value: character.origin.name },
    { label: t('detail.location'), value: character.location.name },
  ];

  return (
    <div className="quick-view">
      <img
        className="quick-view__image"
        src={character.image}
        alt={character.name}
      />
      <div className="quick-view__meta">
        <StatusBadge status={character.status} />
        <dl className="quick-view__rows">
          {rows.map((row) => (
            <div className="quick-view__row" key={row.label}>
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
        <div className="quick-view__actions">
          <button
            className="btn btn--ghost"
            onClick={() => toggleFavorite(character)}
          >
            {favorite ? '❤️' : '🤍'}{' '}
            {favorite ? t('common.removeFavorite') : t('common.addFavorite')}
          </button>
          <Link
            to={`/character/${character.id}`}
            className="btn btn--primary"
          >
            {t('common.viewDetails')} →
          </Link>
        </div>
      </div>
    </div>
  );
}
