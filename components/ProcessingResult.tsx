'use client';

import { CircleCheck } from 'lucide-react';

interface ProcessingResultProps {
  fileCount: number;
  onDownload: () => void;
  onStartOver: () => void;
}

export function ProcessingResult({
  fileCount,
  onDownload,
  onStartOver,
}: ProcessingResultProps) {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Check Icon with Glow */}
      <div className="relative group mb-12">
        <div className="absolute -inset-4 bg-primary/20 rounded-full blur-2xl animate-glow-pulse" />
        <CircleCheck className="w-20 h-20 text-primary relative" strokeWidth={1} />
      </div>

      {/* Download Button */}
      <button
        onClick={onDownload}
        className="w-full max-w-sm py-6 bg-primary text-bg-dark font-bold text-lg tracking-[0.15em] uppercase rounded-lg neon-glow transition-all hover:scale-[1.01] active:scale-[0.99]"
      >
        Download All
      </button>

      {/* Result Message */}
      <p className="mt-8 text-slate-500 text-sm font-medium tracking-wide">
        {fileCount} file{fileCount !== 1 ? 's' : ''} processed successfully
      </p>

      {/* Start Over */}
      <button
        onClick={onStartOver}
        className="mt-16 text-xs font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-primary transition-colors duration-300"
      >
        Start over
      </button>
    </div>
  );
}
