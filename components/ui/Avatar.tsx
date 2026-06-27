import { cn } from "@/lib/utils";

interface AvatarProps {
  name?: string;
  src?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  xs: "w-6 h-6 text-xs",
  sm: "w-8 h-8 text-sm",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-xl",
};

function getInitials(name?: string) {
  if (!name) return "U";
  const parts = name.split(" ");
  return parts.length >= 2
    ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
    : name.slice(0, 2).toUpperCase();
}

function getColorFromName(name?: string) {
  const colors = [
    "bg-primary-800",
    "bg-primary-600",
    "bg-green-700",
    "bg-teal-700",
    "bg-emerald-700",
  ];
  if (!name) return colors[0];
  const idx = name.charCodeAt(0) % colors.length;
  return colors[idx];
}

export function Avatar({ name, src, size = "md", className }: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={name || "Avatar"}
        className={cn("rounded-full object-cover", sizeMap[size], className)}
      />
    );
  }

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center text-white font-semibold shrink-0",
        sizeMap[size],
        getColorFromName(name),
        className
      )}
    >
      {getInitials(name)}
    </div>
  );
}
