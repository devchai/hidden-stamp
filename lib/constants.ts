export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const MAX_FILE_COUNT = 20;
export const MAX_TEXT_LENGTH = 256;

export const SUPPORTED_FORMATS = [
  'image/jpeg',
  'image/png',
  'image/webp',
] as const;

export const DEFAULT_WATERMARK_TEXT = 'HiddenStamp';
