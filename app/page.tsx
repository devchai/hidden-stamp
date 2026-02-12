'use client';

import { useFileUpload } from '@/hooks/useFileUpload';
import { useProcessingJob } from '@/hooks/useProcessingJob';
import { FileUploadZone } from '@/components/FileUploadZone';
import { ConversionProgress } from '@/components/ConversionProgress';
import { ProcessingResult } from '@/components/ProcessingResult';
import { BackgroundGradient } from '@/components/BackgroundGradient';

type Step = 'upload' | 'processing' | 'result';

export default function Home() {
  const { files, addFiles, removeFile, clearFiles, hasFiles } = useFileUpload();
  const {
    status,
    progress,
    startProcessing,
    cancelProcessing,
    downloadResults,
    reset,
  } = useProcessingJob();

  const step: Step =
    status === 'processing' || status === 'uploading'
      ? 'processing'
      : status === 'completed'
        ? 'result'
        : 'upload';

  const handleUpload = () => {
    if (hasFiles) {
      startProcessing(files);
    }
  };

  const handleCancel = () => {
    cancelProcessing();
  };

  const handleStartOver = () => {
    reset();
    clearFiles();
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Step 1: Upload */}
      <div
        className={`transition-all duration-500 ${
          step === 'upload'
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-5 pointer-events-none absolute inset-0 flex items-center justify-center'
        }`}
      >
        <FileUploadZone
          files={files}
          onFilesSelected={addFiles}
          onRemoveFile={removeFile}
          onUpload={handleUpload}
        />
      </div>

      {/* Step 2: Processing */}
      <div
        className={`transition-all duration-500 ${
          step === 'processing'
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-5 pointer-events-none absolute inset-0 flex items-center justify-center'
        }`}
      >
        <ConversionProgress percent={progress} onCancel={handleCancel} />
      </div>

      {/* Step 3: Result */}
      <div
        className={`transition-all duration-500 ${
          step === 'result'
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-5 pointer-events-none absolute inset-0 flex items-center justify-center'
        }`}
      >
        <ProcessingResult
          fileCount={files.length}
          onDownload={downloadResults}
          onStartOver={handleStartOver}
        />
      </div>

      <BackgroundGradient />
    </main>
  );
}
