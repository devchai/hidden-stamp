'use client';

import { useState, useCallback, useRef } from 'react';
import type { ImageFile } from '@/types';
import { validateImageFile, validateFileCount } from '@/lib/validators';
import { generateId } from '@/lib/utils';

export function useFileUpload() {
  const [files, setFiles] = useState<ImageFile[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const errorTimerRef = useRef<NodeJS.Timeout | null>(null);

  const showErrors = useCallback((newErrors: string[]) => {
    if (newErrors.length === 0) return;
    setErrors(newErrors);
    if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    errorTimerRef.current = setTimeout(() => setErrors([]), 4000);
  }, []);

  const dismissErrors = useCallback(() => {
    setErrors([]);
    if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
  }, []);

  const addFiles = useCallback((newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles);
    const rejected: string[] = [];

    setFiles((prev) => {
      const updated = [...prev];

      for (const file of fileArray) {
        const countError = validateFileCount(updated.length);
        if (countError) {
          rejected.push(countError);
          break;
        }

        const validationError = validateImageFile(file);
        if (validationError) {
          rejected.push(`${file.name}: ${validationError}`);
          continue;
        }

        const isDuplicate = updated.some((f) => f.name === file.name && f.size === file.size);
        if (isDuplicate) continue;

        updated.push({
          file,
          id: generateId(),
          name: file.name,
          size: file.size,
          type: file.type,
        });
      }

      return updated;
    });

    showErrors(rejected);
  }, [showErrors]);

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const clearFiles = useCallback(() => {
    setFiles([]);
  }, []);

  return {
    files,
    errors,
    addFiles,
    removeFile,
    clearFiles,
    dismissErrors,
    hasFiles: files.length > 0,
  };
}
