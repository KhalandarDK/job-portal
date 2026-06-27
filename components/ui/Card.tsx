import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingMap = {
  none: "",
  sm:   "p-3 sm:p-4",
  md:   "p-3 sm:p-5",
  lg:   "p-4 sm:p-6",
};

export function Card({ hover, padding = "none", className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm",
        hover && "hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 cursor-pointer",
        paddingMap[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-start justify-between mb-3 sm:mb-4", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-sm sm:text-base font-semibold text-slate-900", className)} {...props}>
      {children}
    </h3>
  );
}

export function CardBody({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 sm:gap-3 pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-slate-100",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}