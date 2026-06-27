import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { getCharacters } from '../../api/rickAndMortyApi';
import { useDebounce } from '../../hooks/useDebounce';
import { useLanguage } from '../../context/LanguageContext';
import CharacterCard from '../../components/character/CharacterCard/CharacterCard';
import CharacterQuickView from '../../components/character/CharacterQuickView/CharacterQuickView';
import SearchBar from '../../components/ui/SearchBar/SearchBar';
import Pagination from '../../components/ui/Pagination/Pagination';
import Loader from '../../components/ui/Loader/Loader';
import ErrorMessage from '../../components/ui/ErrorMessage/ErrorMessage';
import Modal from '../../components/ui/Modal/Modal';
import type {
  Character,
  CharacterFilters,
  CharacterGender,
  CharacterStatus,
} from '../../types';
import './Characters.scss';

const STATUS_OPTIONS: CharacterStatus[] = ['Alive', 'Dead', 'unknown'];
const GENDER_OPTIONS: CharacterGender[] = [
  'Female',
  'Male',
  'Genderless',
  'unknown',
];

export default function Characters() {
  const { t } = useLanguage();

  // Filter state
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<CharacterFilters['status']>('');
  const [gender, setGender] = useState<CharacterFilters['gender']>('');
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 450);

  // Data state
  const [characters, setCharacters] = useState<Character[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Selected character for the quick-view modal
  const [selected, setSelected] = useState<Character | null>(null);

  // Reset to page 1 whenever a filter changes.
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, status, gender]);

  // Fetch characters whenever filters or page change.
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(false);

    getCharacters({ page, name: debouncedSearch, status, gender })
      .then((data) => {
        if (!active) return;
        setCharacters(data.results);
        setTotalPages(data.info.pages);
        setTotalCount(data.info.count);
      })
      .catch(() => {
        if (!active) return;
        // The API responds 404 when no character matches — treat as empty.
        setCharacters([]);
        setTotalPages(1);
        setTotalCount(0);
        setError(false);
      })
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [page, debouncedSearch, status, gender]);

  return (
    <div className="page container characters">
      <header className="characters__header">
        <div>
          <h1>{t('characters.title')}</h1>
          {!loading && (
            <p className="characters__count">
              {totalCount} {t('characters.results')}
            </p>
          )}
        </div>
      </header>

      <div className="characters__filters">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder={t('characters.search')}
        />
        <select
          className="characters__select"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value as CharacterFilters['status'])
          }
          aria-label={t('characters.filter.status')}
        >
          <option value="">
            {t('characters.filter.status')}: {t('characters.filter.all')}
          </option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {t(`status.${s}`)}
            </option>
          ))}
        </select>
        <select
          className="characters__select"
          value={gender}
          onChange={(e) =>
            setGender(e.target.value as CharacterFilters['gender'])
          }
          aria-label={t('characters.filter.gender')}
        >
          <option value="">
            {t('characters.filter.gender')}: {t('characters.filter.all')}
          </option>
          {GENDER_OPTIONS.map((g) => (
            <option key={g} value={g}>
              {t(`gender.${g}`)}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage onRetry={() => setPage((p) => p)} />
      ) : characters.length === 0 ? (
        <p className="characters__empty">{t('characters.empty')}</p>
      ) : (
        <>
          <div className="characters__grid">
            <AnimatePresence mode="popLayout">
              {characters.map((character) => (
                <CharacterCard
                  key={character.id}
                  character={character}
                  onSelect={setSelected}
                />
              ))}
            </AnimatePresence>
          </div>
          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={setPage}
          />
        </>
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
