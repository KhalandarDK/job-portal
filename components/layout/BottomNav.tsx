"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, Bookmark, User, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const seekerNav = [
  { label: "Home",    href: "/seeker/dashboard",    icon: Home },
  { label: "Jobs",    href: "/jobs",                icon: Briefcase },
  { label: "Saved",   href: "/seeker/saved",        icon: Bookmark },
  { label: "Applied", href: "/seeker/applications", icon: FileText },
  { label: "Profile", href: "/seeker/profile",      icon: User },
];

const providerNav = [
  { label: "Home",    href: "/provider/dashboard",   icon: Home },
  { label: "Jobs",    href: "/provider/jobs",         icon: Briefcase },
  { label: "Post",    href: "/provider/jobs/create",  icon: Briefcase },
  { label: "Apps",    href: "/provider/applications", icon: User },
  { label: "Profile", href: "/provider/profile",      icon: User },
];

interface BottomNavProps {
  role: "seeker" | "provider";
  notificationCount: number; 
}

export function BottomNav({ role, notificationCount }: BottomNavProps) {
  const pathname = usePathname();
  const navItems = role === "seeker" ? seekerNav : providerNav;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 lg:hidden z-40 shadow-[0_-2px_8px_rgba(0,0,0,0.06)]">
      <div className="flex items-stretch justify-around h-14">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 gap-0.5 transition-colors relative",
                isActive ? "text-blue-600" : "text-slate-400"
              )}
            >
              {/* Active pill indicator at top */}
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-blue-600 rounded-b-full" />
              )}
              <div className="relative">
                <item.icon
                  style={{ width: 18, height: 18 }}
                  strokeWidth={isActive ? 2.5 : 1.8}
                />
                {item.label === "Applied" && notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 bg-red-500 text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                    {notificationCount}
                  </span>
                )}
              </div>
              <span className={cn(
                "text-[10px] font-medium leading-none",
                isActive ? "text-blue-600" : "text-slate-400"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}