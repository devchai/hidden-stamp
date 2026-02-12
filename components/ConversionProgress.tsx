'use client';

interface ConversionProgressProps {
  percent: number;
  onCancel: () => void;
}

export function ConversionProgress({ percent, onCancel }: ConversionProgressProps) {
  return (
    <div className="w-full max-w-md flex flex-col items-center">
      <div className="text-sm font-medium tracking-wide mb-4">
        Converting... <span className="text-white/90">{percent}%</span>
      </div>
      <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-primary glow-bar transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
      <button
        onClick={onCancel}
        className="text-[10px] uppercase tracking-[0.2em] text-white/30 hover:text-white/60 transition-colors"
      >
        Cancel
      </button>
    </div>
  );
}
