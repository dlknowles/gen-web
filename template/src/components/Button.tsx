import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export function Button({ children, variant = "primary", className = "", ...props }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2";
  const styles =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
      : "bg-transparent text-slate-800 hover:bg-slate-100 focus:ring-slate-400";

  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  );
}
