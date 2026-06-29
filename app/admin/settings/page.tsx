"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Switch } from "@/components/ui/Switch";
import { useState } from "react";
import { Settings, Bell, Shield } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    maintenanceMode:    false,
    emailNotifications: true,
    autoVerify:         false,
  });

  const toggle = (key: keyof typeof settings) =>
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <DashboardLayout role="admin" userName="Super Admin">
      <div>
        <div className="mb-4 sm:mb-6">
          <h1 className="text-lg sm:text-2xl font-bold text-slate-900">Platform Settings</h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">Configure global platform preferences</p>
        </div>

        <div className="space-y-3 sm:space-y-5">

          {/* General */}
          <Card>
            <div className="px-3 sm:px-5 py-3 border-b border-slate-100 flex items-center gap-2">
              <Settings className="w-4 h-4 text-slate-500" />
              <h2 className="font-semibold text-xs sm:text-sm text-slate-900">General Settings</h2>
            </div>
            <div className="p-3 sm:p-5 space-y-3">

              {/* Maintenance toggle */}
              <div className="flex items-center justify-between py-1 gap-4">
                <div className="min-w-0">
                  <p className="font-medium text-xs sm:text-sm text-slate-800">Maintenance Mode</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Temporarily disable for users</p>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={() => toggle("maintenanceMode")}
                />
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-100">
                <Input label="Platform Name"  defaultValue="Jobs" />
                <Input label="Support Email"  defaultValue="support@jobs.com" type="email" />
              </div>
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
                { key: "emailNotifications" as const, title: "Email Notifications", desc: "System alerts to administrators" },
                { key: "autoVerify"         as const, title: "Auto-Verify Institutions", desc: "Automatically verify trusted institutions" },
              ].map(({ key, title, desc }) => (
                <div key={key} className="flex items-center justify-between px-3 sm:px-5 py-3 gap-4">
                  <div className="min-w-0">
                    <p className="font-medium text-xs sm:text-sm text-slate-800">{title}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{desc}</p>
                  </div>
                  <Switch checked={settings[key]} onCheckedChange={() => toggle(key)} />
                </div>
              ))}
            </div>
          </Card>

          {/* Security */}
          <Card>
            <div className="px-3 sm:px-5 py-3 border-b border-slate-100 flex items-center gap-2">
              <Shield className="w-4 h-4 text-slate-500" />
              <h2 className="font-semibold text-xs sm:text-sm text-slate-900">Security</h2>
            </div>
            <div className="p-3 sm:p-5 space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                Change Admin Password
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start text-red-600 hover:bg-red-50 border-red-100">
                Export Platform Data
              </Button>
            </div>
          </Card>
        </div>

        <div className="mt-4 sm:mt-6">
          <Button size="sm" className="w-full sm:w-auto sm:float-right">
            Save All Settings
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}