import { Loader2 } from "lucide-react";

export function SkeletonLoader({ className = "h-32" }: { className?: string }) {
  return (
    <div className={`w-full rounded-xl bg-surface border border-primary/10 flex items-center justify-center ${className}`}>
      <div className="flex flex-col items-center gap-3 text-primary/40 animate-pulse">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="text-sm font-medium">Loading AI Intelligence...</span>
      </div>
    </div>
  );
}
