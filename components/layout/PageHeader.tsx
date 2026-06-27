import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-3 mb-4 sm:mb-6">
      <div className="min-w-0">
        <h1 className="text-lg sm:text-2xl font-bold text-slate-900 leading-tight truncate">
          {title}
        </h1>
        {description && (
          <p className="text-slate-500 mt-0.5 text-xs sm:text-sm">{description}</p>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}