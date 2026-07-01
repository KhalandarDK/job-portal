"use client";

import { Search } from "lucide-react";
import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  showButton?: boolean;
  inputSize?: "default" | "lg";
}
export function SearchBar({
  placeholder = "Search...",
  showButton = false,
  inputSize = "default",
  className,
  value,
  onChange,
  ...props
}: SearchBarProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          "w-full bg-white border border-slate-200 rounded-xl",
          "pl-9 pr-4 h-10 sm:h-9",
          "text-sm placeholder:text-slate-400",
          "focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400",
          "transition-colors",
          inputSize === "lg" && "h-11 sm:h-10 text-base pl-10",
          showButton && "pr-20 sm:pr-24",
        )}
        {...props}
      />

      {showButton && (
        <button
          type="button"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-3 sm:px-4 h-7 rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
      )}
    </div>
  );
}
