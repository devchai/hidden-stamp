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
      {/* SEO: visible heading + description for crawlers */}
      <header className="sr-only">
        <h1>HiddenStamp — Free Invisible Image Watermark Tool Online</h1>
        <p>
          Protect your images with invisible watermarks using LSB steganography.
          Embed hidden text into JPEG, PNG, or WebP files and verify watermarks instantly — free, browser-based, and no sign-up required.
        </p>
        <h2>Embed Invisible Watermarks</h2>
        <p>
          Add hidden watermarks to your photos, digital art, and images.
          Upload up to 20 images at once and download watermarked PNG files.
          Your custom watermark text is invisibly embedded into the pixel data using LSB (Least Significant Bit) steganography — completely undetectable to the human eye.
        </p>
        <h2>Verify Hidden Watermarks</h2>
        <p>
          Check if an image contains a hidden watermark. Upload any JPEG, PNG, or WebP file to detect and extract embedded watermark text.
          Prove image ownership and verify authenticity with HiddenStamp&apos;s watermark detector.
        </p>
        <h2>Why Use Invisible Watermarks?</h2>
        <ul>
          <li>Protect your photos and digital artwork from unauthorized use</li>
          <li>Prove ownership of your images with embedded proof</li>
          <li>Track image distribution across the web</li>
          <li>Copyright protection without visible marks that ruin your images</li>
          <li>Free alternative to expensive watermark software</li>
        </ul>
        <h2>How It Works</h2>
        <p>
          HiddenStamp uses LSB steganography to embed invisible watermarks.
          This technique modifies the least significant bits of image pixel data to encode your custom text,
          making the changes completely imperceptible while securely storing your watermark inside the image.
        </p>

        {/* Korean SEO Content */}
        <h2>HiddenStamp — 무료 비가시 워터마크 도구</h2>
        <p>
          LSB 스테가노그래피 기술로 이미지에 보이지 않는 워터마크를 삽입하고 검증하세요.
          JPEG, PNG, WebP 파일에 숨겨진 텍스트를 넣어 저작권을 보호할 수 있습니다.
          회원가입 없이, 다운로드 없이 브라우저에서 바로 무료로 사용 가능합니다.
        </p>
        <h3>보이지 않는 워터마크 삽입</h3>
        <p>
          사진, 디지털 아트, 이미지에 숨겨진 워터마크를 추가하세요.
          한 번에 최대 20장까지 업로드하여 워터마크가 삽입된 PNG 파일을 다운로드할 수 있습니다.
          LSB(최하위 비트) 스테가노그래피 기술로 픽셀 데이터에 워터마크 텍스트를 보이지 않게 삽입하여
          육안으로는 전혀 구분할 수 없습니다.
        </p>
        <h3>숨겨진 워터마크 검증</h3>
        <p>
          이미지에 숨겨진 워터마크가 있는지 확인하세요. JPEG, PNG, WebP 파일을 업로드하면
          삽입된 워터마크 텍스트를 감지하고 추출합니다.
          이미지 소유권을 증명하고 진위 여부를 확인할 수 있습니다.
        </p>
        <h3>왜 보이지 않는 워터마크를 사용해야 할까요?</h3>
        <ul>
          <li>사진과 디지털 아트의 무단 사용 방지</li>
          <li>숨겨진 증거로 이미지 소유권 증명</li>
          <li>웹에서의 이미지 유통 경로 추적</li>
          <li>이미지를 훼손하지 않는 저작권 보호</li>
          <li>비싼 워터마크 소프트웨어의 무료 대안</li>
        </ul>
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
