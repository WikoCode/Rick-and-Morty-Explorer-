import { useLanguage } from '../../../context/LanguageContext';
import './ErrorMessage.scss';

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  const { t } = useLanguage();
  return (
    <div className="error-message" role="alert">
      <span className="error-message__icon" aria-hidden="true">
        ⚠️
      </span>
      <p>{message ?? t('common.error')}</p>
      {onRetry && (
        <button className="btn btn--primary" onClick={onRetry}>
          {t('common.retry')}
        </button>
      )}
    </div>
  );
}
