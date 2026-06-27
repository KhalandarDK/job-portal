import { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function Textarea({ label, className, ...props }: TextareaProps) {
  return (
    <div>
      {label && <label className="block text-sm font-medium mb-2">{label}</label>}
      <textarea
        className={cn(
          "w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm focus:outline-none focus:border-primary resize-y min-h-[120px]",
          className
        )}
        {...props}
      />
    </div>
  );
}