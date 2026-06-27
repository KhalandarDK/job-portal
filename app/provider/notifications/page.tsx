"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { EmptyState } from "@/components/ui/EmptyState";
import { mockNotifications } from "@/lib/mockData";
import { useState } from "react";
import { Bell, CheckCheck } from "lucide-react";
import { formatDistanceToNow } from "@/lib/dateUtils";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "all",         label: "All",          count: mockNotifications.length },
  { id: "unread",      label: "Unread",       count: mockNotifications.filter((n) => !n.read).length },
  { id: "application", label: "Applications", count: 4 },
  { id: "job",         label: "Jobs",         count: 3 },
];

export default function ProviderNotificationsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const markAsRead = (id: string) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

  const filtered = notifications.filter((n) => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !n.read;
    return n.type === activeTab;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <DashboardLayout
      role="provider"
      institutionName="Masjid Al-Noor"
      notificationCount={unreadCount}
    >
      <div className="mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-textPrimary">Notifications</h1>
            <p className="text-textSecondary mt-1">
              {unreadCount} unread · Stay updated with your applicants
            </p>
          </div>

          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              leftIcon={<CheckCheck className="w-4 h-4" />}
              onClick={markAllRead}
            >
              Mark all read
            </Button>
          )}
        </div>

        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        <div className="mt-6 space-y-3">
          {filtered.length === 0 ? (
            <EmptyState
              icon={<Bell className="w-12 h-12 text-slate-300" />}
              title="All caught up!"
              description="No new notifications at the moment."
            />
          ) : (
            filtered.map((notif) => (
              <Card
                key={notif.id}
                className={cn(
                  "p-5 cursor-pointer transition-all hover:shadow-md",
                  !notif.read && "bg-blue-50 border-blue-100"
                )}
                onClick={() => markAsRead(notif.id)}
              >
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-xl border flex-shrink-0">
                    {notif.type === "application" ? "📋" : notif.type === "job" ? "💼" : "🔔"}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={cn("font-medium", !notif.read && "text-textPrimary")}>
                        {notif.title}
                      </p>
                      {!notif.read && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 flex-shrink-0" />
                      )}
                    </div>

                    <p className="text-sm text-textSecondary mt-1 leading-relaxed">
                      {notif.message}
                    </p>

                    <p className="text-xs text-textSecondary mt-3">
                      {formatDistanceToNow(notif.createdAt)}
                    </p>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}