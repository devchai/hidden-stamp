export type OutputFormat = 'png';

export type JobStatus = 'idle' | 'uploading' | 'processing' | 'completed' | 'error';

export interface ImageFile {
  file: File;
  id: string;
  name: string;
  size: number;
  type: string;
}

export interface StampConfig {
  watermarkText: string;
  outputFormat: OutputFormat;
}

export interface StampResult {
  originalName: string;
  stampedName: string;
  blob: Blob;
}

export interface ProcessingJob {
  status: JobStatus;
  progress: number;
  files: ImageFile[];
  results: StampResult[];
  error: string | null;
}
