export default function StatusDot({ className = '' }) {
  return (
    <span className={`relative inline-flex h-2.5 w-2.5 ${className}`}>
      <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-online" />
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-online" />
    </span>
  );
}
