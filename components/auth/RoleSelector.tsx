"use client";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface RoleOption {
  value: string;
  label: string;
  description: string;
  icon: string;
}

interface RoleSelectorProps {
  options: RoleOption[];
  value?: string;
  onChange?: (value: string) => void;
}

export function RoleSelector({ options, value, onChange }: RoleSelectorProps) {
  return (
    <div className="grid gap-3">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange?.(option.value)}
          className={cn(
            "flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all",
            value === option.value
              ? "border-primary-800 bg-primary-50"
              : "border-border hover:border-primary-300 hover:bg-gray-50"
          )}
        >
          <span className="text-3xl shrink-0">{option.icon}</span>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-textPrimary">{option.label}</p>
            <p className="text-xs text-textSecondary mt-0.5">{option.description}</p>
          </div>
          <div className={cn(
            "w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all",
            value === option.value ? "border-primary-800 bg-primary-800" : "border-gray-300"
          )}>
            {value === option.value && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
          </div>
        </button>
      ))}
    </div>
  );
}
