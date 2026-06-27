import Link from "next/link";
import { Card } from "./Card";
import { Button } from "./Button";

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}

export function EmptyState({ icon, title, description, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <Card className="p-12 text-center">
      <div className="mx-auto w-16 h-16 flex items-center justify-center text-slate-300 mb-6">
        {icon}
      </div>
      <h3 className="font-semibold text-xl mb-2">{title}</h3>
      <p className="text-textSecondary max-w-sm mx-auto">{description}</p>

      {actionLabel && actionHref && (
        <Link href={actionHref} className="mt-6 inline-block">
          <Button>{actionLabel}</Button>
        </Link>
      )}
    </Card>
  );
}