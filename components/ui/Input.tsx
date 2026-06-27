import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  required?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightIcon, required, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-textPrimary">
            {label}
            {required && <span className="text-error ml-0.5">*</span>}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-textSecondary">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full h-9 rounded-md border border-line bg-white px-3 text-sm text-ink placeholder:text-slate-400 transition-all",
              "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent",
              "disabled:bg-muted disabled:cursor-not-allowed",
              error && "border-danger focus:ring-danger",
              leftIcon && "pl-9",
              rightIcon && "pr-9",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-textSecondary">
              {rightIcon}
            </span>
          )}
        </div>
        {error && <p className="text-xs text-error">{error}</p>}
        {hint && !error && <p className="text-xs text-textSecondary">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
