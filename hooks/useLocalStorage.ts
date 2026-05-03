import { useState, useEffect } from 'react';

/**
 * Hook for type-safe localStorage with SSR support
 * @param key - localStorage key
 * @param initialValue - default value if key not found
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) setStoredValue(JSON.parse(item) as T);
    } catch (error) {
      console.error(`useLocalStorage read error "${key}":`, error);
    }
  }, [key]);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`useLocalStorage write error "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}
