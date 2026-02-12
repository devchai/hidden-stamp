'use client';

import { useCallback, useRef, useState } from 'react';
import { AlertTriangle, Plus, X, Search, CircleCheck, CircleX } from 'lucide-react';
import type { VerifyStatus, VerifyResult } from '@/types';
import { formatFileSize } from '@/lib/utils';

interface VerifyZoneProps {
  status: VerifyStatus;
  result: VerifyResult | null;
  error: string | null;
  onVerify: (file: File) => void;
  onReset: () => void;
}

export function VerifyZone({ status, result, error, onVerify, onReset }: VerifyZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSelectFile = useCallback((file: File) => {
    setSelectedFile(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleSelectFile(file);
    },
    [handleSelectFile],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleSelectFile(file);
      e.target.value = '';
    },
    [handleSelectFile],
  );

  const handleVerify = useCallback(() => {
    if (selectedFile) onVerify(selectedFile);
  }, [selectedFile, onVerify]);

  const handleStartOver = useCallback(() => {
    setSelectedFile(null);
    onReset();
  }, [onReset]);

  const isIdle = status === 'idle';
  const isVerifying = status === 'verifying';
  const hasResult = status === 'found' || status === 'not-found';
  const hasError = status === 'error';

  // Result view
  if (hasResult && result) {
    return (
      <div className="w-full max-w-2xl flex flex-col items-center">
        <div className="relative group mb-12">
          <div className={`absolute -inset-4 ${result.found ? 'bg-primary/20' : 'bg-slate-500/20'} rounded-full blur-2xl animate-glow-pulse`} />
          {result.found ? (
            <CircleCheck className="w-20 h-20 text-primary relative" strokeWidth={1} />
          ) : (
            <CircleX className="w-20 h-20 text-slate-500 relative" strokeWidth={1} />
          )}
        </div>

        {result.found ? (
          <>
            <p className="text-sm font-medium tracking-wide text-primary uppercase mb-6">
              Watermark Found
            </p>
            <div className="w-full max-w-md px-6 py-4 bg-bg-neutral border border-border-neutral rounded-lg">
              <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500 mb-2">
                Embedded Text
              </p>
              <p className="text-slate-100 font-mono text-sm break-all">
                {result.text}
              </p>
            </div>
          </>
        ) : (
          <p className="text-sm font-medium tracking-wide text-slate-500 uppercase">
            No watermark found
          </p>
        )}

        <button
          onClick={handleStartOver}
          className="mt-16 text-xs font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-primary transition-colors duration-300"
        >
          Verify another
        </button>
      </div>
    );
  }

  // Verifying state
  if (isVerifying) {
    return (
      <div className="w-full max-w-md flex flex-col items-center">
        <div className="text-sm font-medium tracking-wide mb-4">
          Verifying... <Search className="inline w-4 h-4 animate-pulse" />
        </div>
        <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-primary glow-bar animate-[indeterminate_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
    );
  }

  // Upload / select view (idle or error)
  return (
    <div className="w-full max-w-2xl flex flex-col items-center gap-6">
      {/* Drop Zone */}
      <div className="w-full group" onClick={handleClick}>
        <div
          className={`custom-dashed-border rounded-3xl w-full aspect-[16/10] flex flex-col items-center justify-center cursor-pointer transition-all ${
            isDragOver
              ? 'bg-primary/5 drag-over'
              : 'bg-bg-neutral/30 hover:bg-primary/5'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <Plus
            className={`w-12 h-12 transition-colors ${
              isDragOver ? 'text-primary' : 'text-slate-500 group-hover:text-primary'
            }`}
            strokeWidth={1}
          />
          <p className="mt-4 text-slate-500 group-hover:text-slate-300 transition-colors tracking-[0.15em] text-sm uppercase font-medium">
            Drop image to verify
          </p>
          <p className="mt-1 text-white/30 text-[10px] tracking-[0.1em] uppercase">
            JPG, PNG, WebP up to 4.5MB
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleInputChange}
        />
      </div>

      {/* Error Alert */}
      {(hasError && error) && (
        <div className="w-full px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3 animate-[fadeIn_0.2s_ease-out]">
          <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
          <p className="flex-1 text-sm text-red-300">{error}</p>
          <button
            onClick={handleStartOver}
            className="text-red-400/50 hover:text-red-300 transition-colors"
            aria-label="Dismiss error"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Selected File */}
      {selectedFile && (
        <div className="w-full flex flex-col gap-2">
          <div className="flex items-center justify-between px-4 py-3 bg-bg-neutral border border-border-neutral rounded-lg text-sm">
            <span className="text-slate-100 font-medium truncate max-w-[60%]">
              {selectedFile.name}
            </span>
            <div className="flex items-center gap-3">
              <span className="text-slate-500 text-xs">
                {formatFileSize(selectedFile.size)}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFile(null);
                }}
                className="text-white/30 hover:text-red-500 transition-colors"
                aria-label={`Remove ${selectedFile.name}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Verify Button */}
      <button
        onClick={handleVerify}
        disabled={!selectedFile}
        className="w-full max-w-64 py-4 bg-primary text-bg-dark font-bold text-sm tracking-[0.2em] uppercase rounded-full neon-glow transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Verify
      </button>
    </div>
  );
}
