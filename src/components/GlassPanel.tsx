export function GlassPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-surface/40 backdrop-blur-xl border border-outline-variant/20 rounded-lg p-fluid-gap shadow-[0_8px_32px_rgba(0,0,0,0.3)] ${className}`}
    >
      {children}
    </div>
  );
}
