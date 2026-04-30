import { ButtonHTMLAttributes } from "react";
import Link from "next/link";

type PulseButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  children: React.ReactNode;
  className?: string;
};

export function PulseButton({
  href,
  children,
  className = "",
  ...props
}: PulseButtonProps) {
  const classes = `inline-block rounded-[2rem_1.5rem_2.5rem_1rem] bg-primary text-on-primary px-horizon py-meridian font-label-sm hover:scale-105 transition-transform cursor-pointer ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
