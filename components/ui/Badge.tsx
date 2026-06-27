import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type BadgeVariant = "default" | "success" | "warning" | "error" | "info" | "gold" | "outline";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: "sm" | "md";
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-slate-100 text-slate-600",
  success: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-700",
  error:   "bg-red-50 text-red-700",
  info:    "bg-blue-50 text-blue-700",
  gold:    "bg-yellow-50 text-yellow-700 border border-yellow-200",
  outline: "bg-transparent border border-current",
};

const dotColors: Record<BadgeVariant, string> = {
  default: "bg-slate-400",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  error:   "bg-red-500",
  info:    "bg-blue-500",
  gold:    "bg-yellow-500",
  outline: "bg-current",
};

export function Badge({
  variant = "default",
  size = "sm",
  dot,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-medium whitespace-nowrap",
        // Mobile-first: smaller base, larger on sm+
        size === "sm"
          ? "px-1.5 py-0.5 text-[10px] sm:px-2 sm:text-[11px]"
          : "px-2 py-0.5 text-xs sm:px-2.5 sm:text-sm",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {dot && (
        <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", dotColors[variant])} />
      )}
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const statusMap: Record<string, { variant: BadgeVariant; label: string }> = {
    applied:             { variant: "info",    label: "Applied" },
    under_review:        { variant: "warning", label: "Under Review" },
    shortlisted:         { variant: "gold",    label: "Shortlisted" },
    interview_scheduled: { variant: "info",    label: "Interview" },
    selected:            { variant: "success", label: "Selected" },
    rejected:            { variant: "error",   label: "Rejected" },
    draft:               { variant: "default", label: "Draft" },
    active:              { variant: "success", label: "Active" },
    closed:              { variant: "error",   label: "Closed" },
    expired:             { variant: "warning", label: "Expired" },
  };
  const config = statusMap[status] || { variant: "default" as BadgeVariant, label: status };
  return <Badge variant={config.variant} dot>{config.label}</Badge>;
}