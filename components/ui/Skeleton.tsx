type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={`skeleton ${className}`} />;
}

export function SkeletonText({ className = '' }: SkeletonProps) {
  return <div className={`skeleton h-3.5 max-w-[12rem] ${className}`} />;
}

export function SkeletonBlock({ className = '' }: SkeletonProps) {
  return <div className={`skeleton rounded-3xl ${className}`} />;
}
