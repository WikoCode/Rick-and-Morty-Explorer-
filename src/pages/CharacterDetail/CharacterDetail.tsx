import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getCharacter, getEpisodesByUrls } from '../../api/rickAndMortyApi';
import { useFavorites } from '../../context/FavoritesContext';
import { useLanguage } from '../../context/LanguageContext';
import StatusBadge from '../../components/ui/StatusBadge/StatusBadge';
import Loader from '../../components/ui/Loader/Loader';
import ErrorMessage from '../../components/ui/ErrorMessage/ErrorMessage';
import type { Character, Episode } from '../../types';
import './CharacterDetail.scss';

export default function CharacterDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [character, setCharacter] = useState<Character | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;
    let active = true;
    setLoading(true);
    setError(false);

    getCharacter(id)
      .then(async (data) => {
        if (!active) return;
        setCharacter(data);
        // Resolve the first handful of episodes this character appears in.
        const eps = await getEpisodesByUrls(data.episode, 8);
        if (active) setEpisodes(eps);
      })
      .catch(() => active && setError(true))
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) return <div className="page container"><Loader /></div>;
  if (error || !character)
    return (
      <div className="page container">
        <ErrorMessage onRetry={() => navigate(0)} />
      </div>
    );

  const favorite = isFavorite(character.id);
  const facts: { label: string; value: string }[] = [
    { label: t('detail.species'), value: character.species },
    { label: t('detail.gender'), value: t(`gender.${character.gender}`) },
    { label: t('detail.origin'), value: character.origin.name },
    { label: t('detail.location'), value: character.location.name },
  ];

  return (
    <div className="page container detail">
      <button className="btn btn--ghost detail__back" onClick={() => navigate(-1)}>
        ← {t('detail.back')}
      </button>

      <motion.div
        className="detail__card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <img className="detail__image" src={character.image} alt={character.name} />

        <div className="detail__content">
          <h1>{character.name}</h1>
          <div className="detail__status">
            <StatusBadge status={character.status} /> · {character.species}
          </div>

          <dl className="detail__facts">
            {facts.map((fact) => (
              <div className="detail__fact" key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>

          <button
            className={`btn ${favorite ? 'btn--ghost' : 'btn--primary'}`}
            onClick={() => toggleFavorite(character)}
          >
            {favorite ? '❤️' : '🤍'}{' '}
            {favorite ? t('common.removeFavorite') : t('common.addFavorite')}
          </button>
        </div>
      </motion.div>

      {episodes.length > 0 && (
        <section className="detail__episodes">
          <h2>{t('detail.episodes')}</h2>
          <ul className="detail__episode-list">
            {episodes.map((ep) => (
              <li key={ep.id} className="detail__episode">
                <span className="detail__episode-code">{ep.episode}</span>
                <span className="detail__episode-name">{ep.name}</span>
                <span className="detail__episode-date">{ep.air_date}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
