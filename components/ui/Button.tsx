"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "gold";
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:   "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-sm",
  secondary: "bg-blue-500 hover:bg-blue-600 text-white shadow-sm",
  outline:   "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300",
  ghost:     "text-slate-500 hover:bg-slate-100 hover:text-slate-800",
  danger:    "bg-red-600 hover:bg-red-700 text-white shadow-sm",
  gold:      "bg-amber-500 hover:bg-amber-600 text-white shadow-sm",
};

const sizeStyles: Record<ButtonSize, string> = {
  // xs: compact label buttons inside cards/tables
  xs:   "h-7 px-2.5 text-[11px] rounded-lg gap-1",
  // sm: secondary actions — 40px touch target on mobile
  sm:   "h-8 sm:h-8 px-3 text-xs rounded-lg gap-1.5",
  // md: default — 44px on mobile
  md:   "h-11 sm:h-9 px-4 text-sm rounded-xl gap-2",
  // lg: primary CTA
  lg:   "h-11 sm:h-11 px-5 sm:px-6 text-sm sm:text-base rounded-xl gap-2",
  // icon
  icon: "h-9 w-9 sm:h-8 sm:w-8 rounded-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading,
      fullWidth,
      leftIcon,
      rightIcon,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-150 active:scale-[0.97]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none select-none",
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {loading ? (
          <svg className="animate-spin h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : leftIcon ? (
          <span className="shrink-0 [&>svg]:w-3.5 [&>svg]:h-3.5">{leftIcon}</span>
        ) : null}

        {children}

        {!loading && rightIcon && (
          <span className="shrink-0 [&>svg]:w-3.5 [&>svg]:h-3.5">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";