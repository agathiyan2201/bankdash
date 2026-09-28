export function Skeleton({ className = '' }) {
  return <div className={`animate-pulse rounded-[25px] bg-white/70 ${className}`} />;
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="panel flex flex-col items-center gap-3 text-center">
      <p className="text-sm text-brand-red">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="text-sm font-semibold text-brand-blue hover:underline">
          Try again
        </button>
      )}
    </div>
  );
}
