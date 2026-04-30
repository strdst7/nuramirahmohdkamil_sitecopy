export function OrganicCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-surface-container p-fluid-gap shadow-[20px_40px_80px_rgba(0,0,0,0.8)] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] ${className}`}
    >
      {children}
    </div>
  );
}
