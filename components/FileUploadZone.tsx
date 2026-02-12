'use client';

import { useCallback, useRef, useState } from 'react';
import { AlertTriangle, Plus, X } from 'lucide-react';
import type { ImageFile } from '@/types';
import { formatFileSize } from '@/lib/utils';

interface FileUploadZoneProps {
  files: ImageFile[];
  errors?: string[];
  onFilesSelected: (files: FileList) => void;
  onRemoveFile: (id: string) => void;
  onUpload: () => void;
  onDismissErrors?: () => void;
  disabled?: boolean;
}

export function FileUploadZone({
  files,
  errors = [],
  onFilesSelected,
  onRemoveFile,
  onUpload,
  onDismissErrors,
  disabled,
}: FileUploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      if (e.dataTransfer.files.length > 0) {
        onFilesSelected(e.dataTransfer.files);
      }
    },
    [onFilesSelected],
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
      if (e.target.files && e.target.files.length > 0) {
        onFilesSelected(e.target.files);
        e.target.value = '';
      }
    },
    [onFilesSelected],
  );

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
            Drop files here
          </p>
          <p className="mt-1 text-white/30 text-[10px] tracking-[0.1em] uppercase">
            JPG, PNG, WebP up to 4.5MB
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleInputChange}
        />
      </div>

      {/* Error Alert */}
      {errors.length > 0 && (
        <div className="w-full px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3 animate-[fadeIn_0.2s_ease-out]">
          <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
          <div className="flex-1 text-sm text-red-300">
            {errors.map((err, i) => (
              <p key={i}>{err}</p>
            ))}
          </div>
          <button
            onClick={onDismissErrors}
            className="text-red-400/50 hover:text-red-300 transition-colors"
            aria-label="Dismiss errors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="w-full flex flex-col gap-2">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between px-4 py-3 bg-bg-neutral border border-border-neutral rounded-lg text-sm"
            >
              <span className="text-slate-100 font-medium truncate max-w-[60%]">
                {file.name}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-slate-500 text-xs">
                  {formatFileSize(file.size)}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveFile(file.id);
                  }}
                  className="text-white/30 hover:text-red-500 transition-colors"
                  aria-label={`Remove ${file.name}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={onUpload}
        disabled={files.length === 0 || disabled}
        className="w-full max-w-64 py-4 bg-primary text-bg-dark font-bold text-sm tracking-[0.2em] uppercase rounded-full neon-glow transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Upload
      </button>
    </div>
  );
}
