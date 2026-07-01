"use client";

import { Bell, Menu, Search } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";

interface HeaderProps {
  role?: "seeker" | "provider" | "admin";
  userName?: string;
  institutionName?: string;
  notificationCount?: number;
  onMenuClick?: () => void;
}

export function Header({
  role = "seeker",
  userName,
  institutionName,
  notificationCount = 0,
  onMenuClick = () => {},
}: HeaderProps) {
  const displayName = userName || institutionName || "User";

  return (
    <header className="flex-shrink-0 bg-white border-b border-slate-100 shadow-sm">
      <div className="px-3 sm:px-6 h-14 flex items-center gap-2 sm:gap-4">

        {/* Hamburger */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-1 rounded-lg hover:bg-slate-100 transition-colors flex-shrink-0"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5 text-slate-600" />
        </button>

        {/* Search — takes remaining space */}
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search jobs, role..."
            className="w-full bg-slate-100 border border-transparent focus:border-blue-300 focus:bg-white pl-9 pr-3 h-9 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 placeholder:text-slate-400 transition-all"
          />
        </div>

        {/* Right: bell + avatar */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <div className="relative">
            <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-colors">
              <Bell className="w-4.5 h-4.5 text-slate-600" style={{ width: 18, height: 18 }} />
              {notificationCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-1 ring-white">
                  {notificationCount > 9 ? "9+" : notificationCount}
                </span>
              )}
            </button>
          </div>

          <Avatar
            name={displayName}
            size="sm"
            className="cursor-pointer ring-2 ring-slate-100 w-8 h-8 text-xs"
          />
        </div>
      </div>
    </header>
  );
}
