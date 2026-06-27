import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Character } from '../types';

interface FavoritesContextValue {
  favorites: Character[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (character: Character) => void;
  count: number;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  // The full favorite character objects are persisted in localStorage,
  // so the Favorites page works without re-fetching the API.
  const [favorites, setFavorites] = useLocalStorage<Character[]>(
    'rm-favorites',
    []
  );

  const isFavorite = useCallback(
    (id: number) => favorites.some((c) => c.id === id),
    [favorites]
  );

  const toggleFavorite = useCallback(
    (character: Character) => {
      setFavorites((prev) =>
        prev.some((c) => c.id === character.id)
          ? prev.filter((c) => c.id !== character.id)
          : [...prev, character]
      );
    },
    [setFavorites]
  );

  const value = useMemo(
    () => ({
      favorites,
      isFavorite,
      toggleFavorite,
      count: favorites.length,
    }),
    [favorites, isFavorite, toggleFavorite]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext);
  if (!ctx)
    throw new Error('useFavorites must be used within a FavoritesProvider');
  return ctx;
}
