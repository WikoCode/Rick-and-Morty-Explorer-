import { useTheme } from '../../../context/ThemeContext';
import './ThemeToggle.scss';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      <span className={`theme-toggle__track ${isDark ? 'is-dark' : ''}`}>
        <span className="theme-toggle__thumb">{isDark ? '🌙' : '☀️'}</span>
      </span>
    </button>
  );
}
