import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  lines?: number;
  circle?: boolean;
}

/** Animated loading skeleton for async content */
export function Skeleton({ className, lines = 1, circle = false }: SkeletonProps) {
  if (circle) {
    return <div className={cn('animate-pulse bg-gray-200 rounded-full', className)} />;
  }
  return (
    <div className="animate-pulse space-y-2 w-full">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn('bg-gray-200 rounded-md h-4', className)}
          style={{ width: i === lines - 1 && lines > 1 ? '70%' : '100%' }}
        />
      ))}
    </div>
  );
}
