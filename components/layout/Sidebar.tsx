"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home, Briefcase, Users, Settings, BarChart2, FileText,
  Building2, Bell, LogOut, PlusCircle, Shield, Bookmark, X,
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { cn } from "@/lib/utils";

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

const seekerItems: SidebarItem[] = [
  { label: "Dashboard",     href: "/seeker/dashboard",    icon: <Home size={18} /> },
  { label: "Find Jobs",     href: "/jobs",                icon: <Briefcase size={18} /> },
  { label: "Applications",  href: "/seeker/applications", icon: <FileText size={18} />, badge: 3 },
  { label: "Saved Jobs",    href: "/seeker/saved",        icon: <Bookmark size={18} /> },
  { label: "Notifications", href: "/notifications",       icon: <Bell size={18} />, badge: 2 },
  { label: "Profile",       href: "/seeker/profile",      icon: <Users size={18} /> },
  { label: "Settings",      href: "/seeker/settings",     icon: <Settings size={18} /> },
];

const providerItems: SidebarItem[] = [
  { label: "Dashboard",     href: "/provider/dashboard",     icon: <Home size={18} /> },
  { label: "Post Job",      href: "/provider/jobs/create",   icon: <PlusCircle size={18} /> },
  { label: "My Jobs",       href: "/provider/jobs",          icon: <Briefcase size={18} /> },
  { label: "Applicants",    href: "/provider/applications",  icon: <Users size={18} /> },
  { label: "Institution",   href: "/provider/profile",       icon: <Building2 size={18} /> },
  { label: "Notifications", href: "/provider/notifications", icon: <Bell size={18} /> },
  { label: "Settings",      href: "/provider/settings",      icon: <Settings size={18} /> },
];

const adminItems: SidebarItem[] = [
  { label: "Dashboard",    href: "/admin",              icon: <Home size={18} /> },
  { label: "Users",        href: "/admin/users",        icon: <Users size={18} /> },
  { label: "Institutions", href: "/admin/institutions", icon: <Building2 size={18} /> },
  { label: "Jobs",         href: "/admin/jobs",         icon: <Briefcase size={18} /> },
  { label: "Categories",   href: "/admin/categories",   icon: <Shield size={18} /> },
  { label: "Reports",      href: "/admin/reports",      icon: <BarChart2 size={18} /> },
  { label: "Settings",     href: "/admin/settings",     icon: <Settings size={18} /> },
];

interface SidebarProps {
  role: "seeker" | "provider" | "admin";
  userName?: string;
  institutionName?: string;
  onClose?: () => void;
}

export function Sidebar({ role, userName, institutionName, onClose }: SidebarProps) {
  const pathname = usePathname();
  const items = role === "admin" ? adminItems : role === "provider" ? providerItems : seekerItems;
  const displayName = userName || institutionName || "User";

  return (
    <aside className="h-full w-72 bg-slate-950 text-white flex flex-col">

      {/* Logo */}
      <div className="h-14 flex items-center px-4 border-b border-slate-800 flex-shrink-0">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-base flex-shrink-0">
          🕌
        </div>
        <div className="ml-2.5 flex-1 min-w-0">
          <h2 className="font-bold text-base leading-none">Jobs Portal</h2>
          <p className="text-[10px] text-slate-400 mt-0.5">Find Purposeful Work</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Profile */}
      <div className="px-3 py-3 flex-shrink-0">
        <div className="rounded-xl bg-slate-900 p-3 border border-slate-800">
          <div className="flex items-center gap-2.5">
            <Avatar name={displayName} size="sm" className="ring-2 ring-slate-700 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-sm truncate leading-none">{displayName}</h3>
              <p className="text-[11px] text-emerald-400 mt-0.5">
                {role === "seeker" ? "Job Seeker" : role === "provider" ? "Institution" : "Super Admin"}
              </p>
            </div>
          </div>
          {role === "seeker" && (
            <div className="mt-3">
              <div className="flex justify-between text-[10px] mb-1 text-slate-400">
                <span>Profile Strength</span>
                <span className="text-emerald-400 font-medium">72%</span>
              </div>
              <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full w-[72%] bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 overflow-y-auto pb-2">
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-2 mb-1.5">Menu</p>
        <div className="space-y-0.5">
          {items.map((item) => {
            const hasMoreSpecific = items.some(
              (o) => o.href !== item.href && (pathname === o.href || pathname.startsWith(o.href + "/"))
            );
            const isActive =
              pathname === item.href ||
              (!hasMoreSpecific && pathname.startsWith(item.href + "/"));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                )}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span className="flex-1 text-[13px]">{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 bg-white/20 rounded-full leading-none">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Sign out */}
      <div className="px-3 py-3 border-t border-slate-800 flex-shrink-0">
        <button className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all text-[13px] font-medium">
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}