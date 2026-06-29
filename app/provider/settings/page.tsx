"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Switch } from "@/components/ui/Switch";
import { useState } from "react";
import { Bell, Shield, Building2, Globe, Mail } from "lucide-react";

export default function ProviderSettingsPage() {
  const [notifications, setNotifications] = useState({
    newApplications:    true,
    applicationUpdates: true,
    newsletter:         false,
    weeklyReport:       true,
  });

  const toggle = (key: keyof typeof notifications) =>
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));

  const notifItems = [
    { key: "newApplications"    as const, title: "New Applications",       desc: "When someone applies to your job" },
    { key: "applicationUpdates" as const, title: "Application Updates",    desc: "When a candidate updates or withdraws" },
    { key: "weeklyReport"       as const, title: "Weekly Hiring Report",   desc: "Summary of views and activity" },
    { key: "newsletter"         as const, title: "Newsletter",             desc: "Monthly job market insights" },
  ];

  return (
    <DashboardLayout role="provider" institutionName="Masjid Al-Noor" notificationCount={4}>
      <div>

        <div className="mb-4 sm:mb-6">
          <h1 className="text-lg sm:text-2xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Manage your institution account preferences
          </p>
        </div>

        <div className="space-y-3 sm:space-y-5">

          {/* Institution Details */}
          <Card>
            <div className="px-3 sm:px-5 py-3 border-b border-slate-100 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-slate-500" />
              <h2 className="font-semibold text-xs sm:text-sm text-slate-900">Institution Details</h2>
            </div>
            <div className="p-3 sm:p-5 space-y-3">
              <Input label="Institution Name"   defaultValue="Masjid Al-Noor" />
              <Input label="Contact Email"      defaultValue="contact@masjidalnoor.org" type="email" />
              <Input label="Phone Number"       defaultValue="+91 98765 43210" />
              <div className="grid grid-cols-2 gap-3">
                <Input label="City"  defaultValue="Mumbai" />
                <Input label="State" defaultValue="Maharashtra" />
              </div>
              <Input label="Website" defaultValue="https://masjidalnoor.org" />
            </div>
          </Card>

          {/* Notifications */}
          <Card>
            <div className="px-3 sm:px-5 py-3 border-b border-slate-100 flex items-center gap-2">
              <Bell className="w-4 h-4 text-slate-500" />
              <h2 className="font-semibold text-xs sm:text-sm text-slate-900">Notifications</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {notifItems.map(({ key, title, desc }) => (
                <div key={key} className="flex items-center justify-between px-3 sm:px-5 py-3 gap-4">
                  <div className="min-w-0">
                    <p className="font-medium text-xs sm:text-sm text-slate-800">{title}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{desc}</p>
                  </div>
                  <Switch
                    checked={notifications[key]}
                    onCheckedChange={() => toggle(key)}
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
                Institution Visibility Settings
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start" leftIcon={<Mail className="w-3.5 h-3.5" />}>
                Change Email Address
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Change Password
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start text-red-600 hover:bg-red-50 border-red-100">
                Delete Institution Account
              </Button>
            </div>
          </Card>
        </div>

        <div className="mt-4 sm:mt-6">
          <Button size="sm" className="w-full sm:w-auto sm:float-right">
            Save All Changes
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}