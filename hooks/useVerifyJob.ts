'use client';

import { useState, useCallback, useRef } from 'react';
import type { VerifyStatus, VerifyResult } from '@/types';

export function useVerifyJob() {
  const [status, setStatus] = useState<VerifyStatus>('idle');
  const [result, setResult] = useState<VerifyResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const startVerify = useCallback(async (file: File) => {
    setStatus('verifying');
    setResult(null);
    setError(null);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/verify', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Verification failed');
      }

      const data: VerifyResult = await response.json();
      setResult(data);
      setStatus(data.found ? 'found' : 'not-found');
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        setStatus('idle');
        return;
      }
      setError(err instanceof Error ? err.message : 'Unknown error');
      setStatus('error');
    } finally {
      abortRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setStatus('idle');
    setResult(null);
    setError(null);
  }, []);

  return { status, result, error, startVerify, reset };
}
