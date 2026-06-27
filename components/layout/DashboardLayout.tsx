"use client";

import { ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { BottomNav } from "./BottomNav";
import { PageHeader } from "./PageHeader";


interface DashboardLayoutProps {
  children: ReactNode;
  role: "seeker" | "provider" | "admin";
  userName?: string;
  institutionName?: string;
  notificationCount?: number;
}

export function DashboardLayout({
  children,
  role,
  userName,
  institutionName,
  notificationCount = 0,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <Sidebar role={role} userName={userName} institutionName={institutionName} />
      </div>

      {/* Right column */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header
          role={role}
          userName={userName}
          institutionName={institutionName}
          notificationCount={notificationCount}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 overflow-y-auto">
          {/* pb-20 gives space above the bottom nav on mobile */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-8">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile bottom nav */}
      {(role === "seeker" || role === "provider") && (
        <BottomNav role={role} notificationCount={notificationCount} />
      )}

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div
            className="h-full w-[280px] max-w-[85vw] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar
              role={role}
              userName={userName}
              institutionName={institutionName}
              onClose={() => setSidebarOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
export { PageHeader };