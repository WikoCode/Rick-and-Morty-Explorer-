import { useLanguage } from '../../../context/LanguageContext';
import type { CharacterStatus } from '../../../types';
import './StatusBadge.scss';

export default function StatusBadge({ status }: { status: CharacterStatus }) {
  const { t } = useLanguage();
  const modifier = status.toLowerCase(); // alive | dead | unknown

  return (
    <span className={`status-badge status-badge--${modifier}`}>
      <span className="status-badge__dot" aria-hidden="true" />
      {t(`status.${status}`)}
    </span>
  );
}
