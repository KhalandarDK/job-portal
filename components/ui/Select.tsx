import { cn } from "@/lib/utils";
import { SelectHTMLAttributes, forwardRef } from "react";
import { ChevronDown } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, hint, options, placeholder, required, className, id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={selectId} className="text-sm font-medium text-textPrimary">
            {label}
            {required && <span className="text-error ml-0.5">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              "w-full h-11 rounded-xl border border-border bg-white px-4 pr-10 text-sm text-textPrimary appearance-none transition-all",
              "focus:outline-none focus:ring-2 focus:ring-primary-800 focus:border-transparent",
              "disabled:bg-gray-50 disabled:cursor-not-allowed",
              !props.value && "text-gray-400",
              error && "border-error focus:ring-error",
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textSecondary pointer-events-none" />
        </div>
        {error && <p className="text-xs text-error">{error}</p>}
        {hint && !error && <p className="text-xs text-textSecondary">{hint}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
