import { useCallback, useState } from 'react';

/**
 * useLocalStorage — a useState that transparently persists to localStorage.
 * Reads the initial value synchronously so there is no flash of default state.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [stored, setStored] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStored((prev) => {
        const next = value instanceof Function ? value(prev) : value;
        try {
          window.localStorage.setItem(key, JSON.stringify(next));
        } catch {
          /* storage may be unavailable (private mode) — fail silently */
        }
        return next;
      });
    },
    [key]
  );

  return [stored, setValue];
}
