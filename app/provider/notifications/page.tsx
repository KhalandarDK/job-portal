"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { mockNotifications } from "@/lib/mockData";
import { useState } from "react";
import { Bell, CheckCheck } from "lucide-react";
import { formatDistanceToNow } from "@/lib/dateUtils";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "all",         label: "All" },
  { id: "unread",      label: "Unread" },
  { id: "application", label: "Applications" },
  { id: "job",         label: "Jobs" },
];

const iconMap: Record<string, string> = {
  application: "📋",
  job:         "💼",
  system:      "🔔",
};

export default function ProviderNotificationsPage() {
  const [activeTab,      setActiveTab]      = useState("all");
  const [notifications,  setNotifications]  = useState(mockNotifications);

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const markAsRead = (id: string) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filtered = notifications.filter((n) => {
    if (activeTab === "all")    return true;
    if (activeTab === "unread") return !n.read;
    return n.type === activeTab;
  });

  return (
    <DashboardLayout role="provider" institutionName="Masjid Al-Noor" notificationCount={unreadCount}>
      <div>

        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
          <div>
            <h1 className="text-lg sm:text-2xl font-bold text-slate-900">Notifications</h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
              {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              leftIcon={<CheckCheck className="w-3.5 h-3.5" />}
              onClick={markAllRead}
            >
              Mark all read
            </Button>
          )}
        </div>

        {/* Tab pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 mb-4 scrollbar-none">
          {TABS.map((tab) => {
            const count =
              tab.id === "all"    ? notifications.length :
              tab.id === "unread" ? unreadCount :
              notifications.filter((n) => n.type === tab.id).length;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-shrink-0 flex items-center gap-1 px-3 h-8 rounded-lg text-xs font-medium transition-all whitespace-nowrap",
                  activeTab === tab.id
                    ? "bg-blue-600 text-white"
                    : "bg-white text-slate-600 border border-slate-200"
                )}
              >
                {tab.label}
                <span className={cn(
                  "text-[10px] px-1.5 py-0.5 rounded-full font-semibold min-w-[18px] text-center",
                  activeTab === tab.id ? "bg-white/25 text-white" : "bg-slate-100 text-slate-500"
                )}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* List */}
        {filtered.length === 0 ? (
          <EmptyState
            icon={<Bell className="w-10 h-10 text-slate-300" />}
            title="All caught up!"
            description="No notifications here."
          />
        ) : (
          <div className="space-y-2">
            {filtered.map((notif) => (
              <div
                key={notif.id}
                onClick={() => markAsRead(notif.id)}
                className={cn(
                  "flex gap-3 p-3 sm:p-4 rounded-xl border cursor-pointer transition-all hover:shadow-sm",
                  notif.read ? "bg-white border-slate-100" : "bg-blue-50 border-blue-100"
                )}
              >
                <div className={cn(
                  "w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0",
                  notif.read ? "bg-slate-100" : "bg-white border border-blue-100"
                )}>
                  {iconMap[notif.type] ?? "🔔"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={cn(
                      "text-xs sm:text-sm font-semibold leading-snug",
                      notif.read ? "text-slate-700" : "text-slate-900"
                    )}>
                      {notif.title}
                    </p>
                    {!notif.read && (
                      <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1" />
                    )}
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">
                    {notif.message}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1.5">
                    {formatDistanceToNow(notif.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}