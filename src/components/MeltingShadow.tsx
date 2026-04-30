type ShadowVariant = "default" | "medium" | "extreme";

const shadowMap: Record<ShadowVariant, string> = {
  default: "shadow-[40px_10px_60px_rgba(0,0,0,0.5)]",
  medium: "shadow-[20px_40px_80px_rgba(0,0,0,0.8)]",
  extreme: "shadow-[50px_40px_100px_rgba(0,0,0,0.5)]",
};

export function MeltingShadow({
  children,
  variant = "default",
  className = "",
}: {
  children: React.ReactNode;
  variant?: ShadowVariant;
  className?: string;
}) {
  return <div className={`${shadowMap[variant]} ${className}`}>{children}</div>;
}
