import { Badge } from "./Badge";

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const variants: Record<string, "success" | "warning" | "error" | "default"> = {
    active:   "success",
    verified: "success",
    closed:   "warning",
    pending:  "warning",
    draft:    "default",
    expired:  "error",
  };
  const labels: Record<string, string> = {
    active:   "Active",
    verified: "Verified",
    closed:   "Closed",
    pending:  "Pending",
    draft:    "Draft",
    expired:  "Expired",
  };
  return (
    <Badge variant={variants[status] || "default"}>
      {labels[status] || status}
    </Badge>
  );
}