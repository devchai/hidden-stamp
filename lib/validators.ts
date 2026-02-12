import { MAX_FILE_SIZE, MAX_FILE_COUNT, SUPPORTED_FORMATS } from './constants';

export function validateImageFile(file: File): string | null {
  if (!SUPPORTED_FORMATS.includes(file.type as typeof SUPPORTED_FORMATS[number])) {
    return `Unsupported format: ${file.type}`;
  }
  if (file.size > MAX_FILE_SIZE) {
    return `File too large: ${(file.size / 1024 / 1024).toFixed(1)}MB (max 10MB)`;
  }
  return null;
}

export function validateFileCount(currentCount: number): string | null {
  if (currentCount >= MAX_FILE_COUNT) {
    return `Maximum ${MAX_FILE_COUNT} files allowed`;
  }
  return null;
}
