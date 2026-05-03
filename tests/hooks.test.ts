import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useDebounce } from '@/hooks/useDebounce';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('useLocalStorage', () => {
  beforeEach(() => localStorageMock.clear());

  it('reads from localStorage if key exists', async () => {
    localStorageMock.setItem('test-key', JSON.stringify('hello'));
    const { result } = renderHook(() => useLocalStorage<string>('test-key', 'default'));
    // Wait for useEffect
    await act(async () => {});
    expect(result.current[0]).toBe('hello');
  });

  it('returns initialValue when key not found', () => {
    const { result } = renderHook(() => useLocalStorage<number>('missing-key', 42));
    expect(result.current[0]).toBe(42);
  });

  it('setValue updates both state and localStorage', async () => {
    const { result } = renderHook(() => useLocalStorage<string>('write-key', 'init'));
    act(() => { result.current[1]('updated'); });
    expect(result.current[0]).toBe('updated');
    expect(localStorageMock.getItem('write-key')).toBe(JSON.stringify('updated'));
  });

  it('handles JSON parse errors gracefully', async () => {
    localStorageMock.setItem('bad-key', '{invalid json}');
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { result } = renderHook(() => useLocalStorage<string>('bad-key', 'fallback'));
    await act(async () => {});
    expect(result.current[0]).toBe('fallback');
    consoleSpy.mockRestore();
  });
});

describe('useDebounce', () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  it('does not update before delay', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'initial' } }
    );
    rerender({ value: 'changed' });
    expect(result.current).toBe('initial');
  });

  it('updates after delay', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'initial' } }
    );
    rerender({ value: 'changed' });
    act(() => { vi.advanceTimersByTime(300); });
    expect(result.current).toBe('changed');
  });
});

describe('useMediaQuery', () => {
  it('returns correct boolean for matching query', async () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query === '(max-width: 768px)',
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
    const { useMediaQuery } = await import('@/hooks/useMediaQuery');
    const { result } = renderHook(() => useMediaQuery('(max-width: 768px)'));
    await act(async () => {});
    expect(result.current).toBe(true);
  });
});
