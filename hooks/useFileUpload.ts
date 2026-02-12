'use client';

import { useState, useCallback } from 'react';
import type { ImageFile } from '@/types';
import { validateImageFile, validateFileCount } from '@/lib/validators';
import { generateId } from '@/lib/utils';

export function useFileUpload() {
  const [files, setFiles] = useState<ImageFile[]>([]);

  const addFiles = useCallback((newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles);

    setFiles((prev) => {
      const updated = [...prev];

      for (const file of fileArray) {
        const countError = validateFileCount(updated.length);
        if (countError) break;

        const validationError = validateImageFile(file);
        if (validationError) continue;

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
  }, []);

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const clearFiles = useCallback(() => {
    setFiles([]);
  }, []);

  return {
    files,
    addFiles,
    removeFile,
    clearFiles,
    hasFiles: files.length > 0,
  };
}
