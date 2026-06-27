import { useEffect, useState } from 'react';

/**
 * useDebounce — returns a value that only updates after `delay` ms have
 * passed without it changing. Used to avoid firing an API request on
 * every keystroke in the search box.
 */
export function useDebounce<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
