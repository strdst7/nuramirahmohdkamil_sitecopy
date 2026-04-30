import { InputHTMLAttributes, forwardRef } from "react";

export const DripBorder = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className = "", ...props }, ref) => (
  <input
    ref={ref}
    className={`border-0 border-b border-outline-variant/40 bg-transparent pb-2 text-on-surface focus:border-b-primary focus:outline-none focus:ring-0 transition-all duration-300 ${className}`}
    {...props}
  />
));

DripBorder.displayName = "DripBorder";
