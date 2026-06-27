import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";
import { Check } from "lucide-react";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  description?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, className, id, ...props }, ref) => {
    const checkId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <label htmlFor={checkId} className="flex items-start gap-2.5 cursor-pointer group py-1">
        <div className="relative mt-0.5 shrink-0">
          <input ref={ref} type="checkbox" id={checkId} className="sr-only peer" {...props} />
          <div className={cn(
            "w-4 h-4 sm:w-5 sm:h-5 rounded border-2 border-slate-300 bg-white transition-all",
            "peer-checked:bg-blue-600 peer-checked:border-blue-600",
            "group-hover:border-blue-400",
            className
          )} />
          <Check className="absolute inset-0 w-4 h-4 sm:w-5 sm:h-5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" strokeWidth={3} />
        </div>
        {(label || description) && (
          <div>
            {label && <p className="text-xs sm:text-sm font-medium text-slate-700 leading-snug">{label}</p>}
            {description && <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">{description}</p>}
          </div>
        )}
      </label>
    );
  }
);
Checkbox.displayName = "Checkbox";