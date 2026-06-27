"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Switch } from "@/components/ui/Switch";
import { useState } from "react";
import { Bell, Shield, User, Globe } from "lucide-react";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    jobAlerts: true,
    applicationUpdates: true,
    newsletter: false,
  });

  return (
    <DashboardLayout role="seeker" userName="Ahmed Abdullah" notificationCount={2}>
      <div className="max-w-2xl lg:max-w-none">

        <div className="mb-4 sm:mb-6">
          <h1 className="text-lg sm:text-2xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">Manage your account preferences</p>
        </div>

        <div className="space-y-3 sm:space-y-5">

          {/* Profile */}
          <Card>
            <div className="px-3 sm:px-5 py-3 border-b border-slate-100 flex items-center gap-2">
              <User className="w-4 h-4 text-slate-500" />
              <h2 className="font-semibold text-xs sm:text-sm text-slate-900">Profile Settings</h2>
            </div>
            <div className="p-3 sm:p-5 space-y-3">
              <Input label="Full Name"     defaultValue="Ahmed Abdullah"           />
              <Input label="Email"         defaultValue="ahmed.abdullah@email.com" type="email" />
              <Input label="Phone"         defaultValue="+91 98765 43210"          />
              <Input label="Location"      defaultValue="Mumbai, Maharashtra"      />
            </div>
          </Card>

          {/* Notifications */}
          <Card>
            <div className="px-3 sm:px-5 py-3 border-b border-slate-100 flex items-center gap-2">
              <Bell className="w-4 h-4 text-slate-500" />
              <h2 className="font-semibold text-xs sm:text-sm text-slate-900">Notifications</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {[
                { key: "jobAlerts" as const,          title: "Job Alerts",          desc: "New relevant jobs" },
                { key: "applicationUpdates" as const, title: "Application Updates", desc: "Status changes" },
                { key: "newsletter" as const,         title: "Newsletter",           desc: "Monthly insights" },
              ].map(({ key, title, desc }) => (
                <div key={key} className="flex items-center justify-between px-3 sm:px-5 py-3 gap-4">
                  <div>
                    <p className="font-medium text-xs sm:text-sm text-slate-800">{title}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{desc}</p>
                  </div>
                  <Switch
                    checked={notifications[key]}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({ ...prev, [key]: checked }))
                    }
                  />
                </div>
              ))}
            </div>
          </Card>

          {/* Security */}
          <Card>
            <div className="px-3 sm:px-5 py-3 border-b border-slate-100 flex items-center gap-2">
              <Shield className="w-4 h-4 text-slate-500" />
              <h2 className="font-semibold text-xs sm:text-sm text-slate-900">Privacy & Security</h2>
            </div>
            <div className="p-3 sm:p-5 space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start" leftIcon={<Globe className="w-3.5 h-3.5" />}>
                Visibility Settings
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Change Password
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start text-red-600 hover:bg-red-50 border-red-100 hover:border-red-200">
                Delete Account
              </Button>
            </div>
          </Card>
        </div>

        <div className="mt-5 sm:mt-8">
          <Button size="md" className="w-full sm:w-auto sm:float-right">
            Save All Changes
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}