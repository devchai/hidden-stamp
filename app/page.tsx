'use client';

import { useState } from 'react';
import { useFileUpload } from '@/hooks/useFileUpload';
import { useProcessingJob } from '@/hooks/useProcessingJob';
import { useVerifyJob } from '@/hooks/useVerifyJob';
import { FileUploadZone } from '@/components/FileUploadZone';
import { ConversionProgress } from '@/components/ConversionProgress';
import { ProcessingResult } from '@/components/ProcessingResult';
import { VerifyZone } from '@/components/VerifyZone';
import { BackgroundGradient } from '@/components/BackgroundGradient';

type Mode = 'stamp' | 'verify';
type Step = 'upload' | 'processing' | 'result';

export default function Home() {
  const [mode, setMode] = useState<Mode>('stamp');

  const { files, errors, addFiles, removeFile, clearFiles, dismissErrors, hasFiles } = useFileUpload();
  const {
    status,
    progress,
    error: processingError,
    startProcessing,
    cancelProcessing,
    downloadResults,
    reset,
  } = useProcessingJob();

  const verify = useVerifyJob();

  const step: Step =
    status === 'processing' || status === 'uploading'
      ? 'processing'
      : status === 'completed'
        ? 'result'
        : 'upload';

  const handleUpload = () => {
    if (hasFiles) startProcessing(files);
  };

  const handleCancel = () => cancelProcessing();

  const handleStartOver = () => {
    reset();
    clearFiles();
  };

  const handleModeSwitch = (newMode: Mode) => {
    if (newMode === mode) return;
    handleStartOver();
    verify.reset();
    setMode(newMode);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* SEO: visible heading + description */}
      <header className="sr-only">
        <h1>HiddenStamp — Invisible Image Watermark Tool</h1>
        <p>
          Protect your images with invisible watermarks using LSB steganography.
          Embed hidden text into JPEG, PNG, or WebP files and verify watermarks instantly — free and no sign-up required.
        </p>
      </header>

      {/* Mode Toggle */}
      <nav aria-label="Mode selection" className="fixed top-8 z-10 flex items-center gap-1 bg-bg-neutral/80 backdrop-blur-sm border border-border-neutral rounded-full p-1">
        <button
          onClick={() => handleModeSwitch('stamp')}
          aria-pressed={mode === 'stamp'}
          className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.15em] transition-all ${
            mode === 'stamp'
              ? 'bg-primary text-bg-dark'
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          Stamp
        </button>
        <button
          onClick={() => handleModeSwitch('verify')}
          aria-pressed={mode === 'verify'}
          className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.15em] transition-all ${
            mode === 'verify'
              ? 'bg-primary text-bg-dark'
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          Verify
        </button>
      </nav>

      {/* Stamp Mode */}
      {mode === 'stamp' && (
        <section aria-label="Embed watermark">
          <div
            className={`transition-all duration-500 ${
              step === 'upload'
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5 pointer-events-none absolute inset-0 flex items-center justify-center'
            }`}
          >
            <FileUploadZone
              files={files}
              errors={processingError ? [...errors, processingError] : errors}
              onFilesSelected={addFiles}
              onRemoveFile={removeFile}
              onUpload={handleUpload}
              onDismissErrors={() => { dismissErrors(); reset(); }}
            />
          </div>

          <div
            className={`transition-all duration-500 ${
              step === 'processing'
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5 pointer-events-none absolute inset-0 flex items-center justify-center'
            }`}
          >
            <ConversionProgress percent={progress} onCancel={handleCancel} />
          </div>

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
        </section>
      )}

      {/* Verify Mode */}
      {mode === 'verify' && (
        <section aria-label="Verify watermark">
          <VerifyZone
            status={verify.status}
            result={verify.result}
            error={verify.error}
            onVerify={verify.startVerify}
            onReset={verify.reset}
          />
        </section>
      )}

      <BackgroundGradient />

      <footer className="fixed bottom-4 z-10 text-[11px] text-slate-600 tracking-wider">
        &copy; {new Date().getFullYear()} DevC. All rights reserved.
      </footer>
    </main>
  );
}
