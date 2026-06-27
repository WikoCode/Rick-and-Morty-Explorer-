import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getEpisodes, getCharactersByUrls } from '../../api/rickAndMortyApi';
import { useLanguage } from '../../context/LanguageContext';
import Loader from '../../components/ui/Loader/Loader';
import ErrorMessage from '../../components/ui/ErrorMessage/ErrorMessage';
import Pagination from '../../components/ui/Pagination/Pagination';
import Modal from '../../components/ui/Modal/Modal';
import type { Character, Episode } from '../../types';
import './Episodes.scss';

export default function Episodes() {
  const { t } = useLanguage();

  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Modal showing an episode's cast preview
  const [active, setActive] = useState<Episode | null>(null);
  const [cast, setCast] = useState<Character[]>([]);
  const [castLoading, setCastLoading] = useState(false);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError(false);

    getEpisodes(page)
      .then((data) => {
        if (!alive) return;
        setEpisodes(data.results);
        setTotalPages(data.info.pages);
      })
      .catch(() => alive && setError(true))
      .finally(() => alive && setLoading(false));

    return () => {
      alive = false;
    };
  }, [page]);

  const openEpisode = async (episode: Episode) => {
    setActive(episode);
    setCastLoading(true);
    try {
      const characters = await getCharactersByUrls(episode.characters, 6);
      setCast(characters);
    } catch {
      setCast([]);
    } finally {
      setCastLoading(false);
    }
  };

  return (
    <div className="page container episodes">
      <h1>{t('episodes.title')}</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage onRetry={() => setPage((p) => p)} />
      ) : (
        <>
          <div className="episodes__grid">
            {episodes.map((ep, i) => (
              <motion.button
                key={ep.id}
                className="episodes__card"
                onClick={() => openEpisode(ep)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (i % 10) * 0.04 }}
                whileHover={{ y: -4 }}
              >
                <span className="episodes__code">{ep.episode}</span>
                <span className="episodes__name">{ep.name}</span>
                <span className="episodes__date">
                  {t('episodes.aired')}: {ep.air_date}
                </span>
              </motion.button>
            ))}
          </div>

          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
      )}

      <Modal
        isOpen={active !== null}
        onClose={() => setActive(null)}
        title={active ? `${active.episode} · ${active.name}` : ''}
      >
        <p className="episodes__cast-label">{t('episodes.cast')}</p>
        {castLoading ? (
          <Loader />
        ) : (
          <div className="episodes__cast">
            {cast.map((c) => (
              <div className="episodes__cast-item" key={c.id}>
                <img src={c.image} alt={c.name} />
                <span>{c.name}</span>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
}
