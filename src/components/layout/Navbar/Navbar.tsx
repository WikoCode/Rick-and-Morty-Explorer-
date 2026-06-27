import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import { useFavorites } from '../../../context/FavoritesContext';
import ThemeToggle from '../../ui/ThemeToggle/ThemeToggle';
import LanguageToggle from '../../ui/LanguageToggle/LanguageToggle';
import './Navbar.scss';

export default function Navbar() {
  const { t } = useLanguage();
  const { count } = useFavorites();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { to: '/', label: t('nav.home'), end: true },
    { to: '/characters', label: t('nav.characters'), end: false },
    { to: '/episodes', label: t('nav.episodes'), end: false },
    { to: '/favorites', label: t('nav.favorites'), end: false },
  ];

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <NavLink to="/" className="navbar__brand" onClick={() => setMenuOpen(false)}>
          <span className="navbar__brand-mark">RM</span>
          <span className="navbar__brand-text">{t('nav.brand')}</span>
        </NavLink>

        <nav
          className={`navbar__links ${menuOpen ? 'is-open' : ''}`}
          aria-label="Main"
        >
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `navbar__link ${isActive ? 'is-active' : ''}`
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
              {link.to === '/favorites' && count > 0 && (
                <span className="navbar__badge">{count}</span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__actions">
          <LanguageToggle />
          <ThemeToggle />
          <button
            className={`navbar__burger ${menuOpen ? 'is-open' : ''}`}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
