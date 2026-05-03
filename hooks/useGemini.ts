import { useState, useCallback } from 'react';

interface UseGeminiOptions {
  endpoint: string;
  onSuccess?: (data: unknown) => void;
  onError?: (error: string) => void;
}

/**
 * Generic hook for calling CivicIQ Gemini-powered API endpoints
 */
export function useGemini({ endpoint, onSuccess, onError }: UseGeminiOptions) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const call = useCallback(async (body: Record<string, unknown>) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const errData = await res.json() as { error: string };
        throw new Error(errData.error ?? `HTTP ${res.status}`);
      }
      const data: unknown = await res.json();
      onSuccess?.(data);
      return data;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong';
      setError(msg);
      onError?.(msg);
    } finally {
      setLoading(false);
    }
  }, [endpoint, onSuccess, onError]);

  return { call, loading, error };
}
