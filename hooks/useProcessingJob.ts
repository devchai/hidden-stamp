'use client';

import { useState, useCallback, useRef } from 'react';
import type { ImageFile, JobStatus, StampResult } from '@/types';
import { DEFAULT_WATERMARK_TEXT } from '@/lib/constants';

export function useProcessingJob() {
  const [status, setStatus] = useState<JobStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<StampResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const startProcessing = useCallback(async (files: ImageFile[]) => {
    setStatus('uploading');
    setProgress(0);
    setError(null);
    setResults([]);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const formData = new FormData();
      for (const imageFile of files) {
        formData.append('files', imageFile.file);
      }
      formData.append('watermarkText', DEFAULT_WATERMARK_TEXT);

      setStatus('processing');

      // Simulate progress while waiting for response
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      const response = await fetch('/api/stamp', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Processing failed');
      }

      const contentType = response.headers.get('content-type');

      if (contentType?.includes('application/zip')) {
        // Single zip response for multiple files
        const blob = await response.blob();
        setResults([{
          originalName: 'all_files',
          stampedName: 'stamped_files.zip',
          blob,
        }]);
      } else {
        // Single file response
        const blob = await response.blob();
        const disposition = response.headers.get('content-disposition');
        const filename = disposition?.match(/filename="(.+)"/)?.[1] || 'stamped.png';
        setResults([{
          originalName: files[0]?.name || 'image',
          stampedName: filename,
          blob,
        }]);
      }

      setProgress(100);
      setStatus('completed');
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        setStatus('idle');
        setProgress(0);
        return;
      }
      setError(err instanceof Error ? err.message : 'Unknown error');
      setStatus('error');
    } finally {
      abortRef.current = null;
    }
  }, []);

  const cancelProcessing = useCallback(() => {
    abortRef.current?.abort();
    setStatus('idle');
    setProgress(0);
  }, []);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setStatus('idle');
    setProgress(0);
    setResults([]);
    setError(null);
  }, []);

  const downloadResults = useCallback(() => {
    for (const result of results) {
      const url = URL.createObjectURL(result.blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = result.stampedName;
      a.click();
      URL.revokeObjectURL(url);
    }
  }, [results]);

  return {
    status,
    progress: Math.min(Math.round(progress), 100),
    results,
    error,
    startProcessing,
    cancelProcessing,
    downloadResults,
    reset,
  };
}
