import { useLanguage } from '../../../context/LanguageContext';
import './Pagination.scss';

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onChange,
}: PaginationProps) {
  const { t } = useLanguage();
  if (totalPages <= 1) return null;

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        className="btn btn--ghost"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
      >
        ← {t('common.prev')}
      </button>

      <span className="pagination__status">
        {t('common.page')} <strong>{page}</strong> {t('common.of')}{' '}
        {totalPages}
      </span>

      <button
        className="btn btn--ghost"
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
      >
        {t('common.next')} →
      </button>
    </nav>
  );
}
