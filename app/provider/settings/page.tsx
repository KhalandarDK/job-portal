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
    newApplications: true,
    applicationUpdates: true,
    newsletter: false,
    weeklyReport: true,
  });

  const toggle = (key: keyof typeof notifications) =>
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <DashboardLayout
      role="provider"
      institutionName="Masjid Al-Noor"
      notificationCount={4}
    >
      <div className="mx-auto">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-textSecondary mb-8">Manage your institution account preferences</p>

        <div className="space-y-8">

          {/* Institution Details */}
          <Card>
            <div className="p-6 border-b">
              <h2 className="font-semibold text-lg flex items-center gap-2">
                <Building2 className="w-5 h-5" /> Institution Details
              </h2>
            </div>
            <div className="p-6 space-y-5">
              <Input label="Institution Name"    defaultValue="Masjid Al-Noor" />
              <Input label="Contact Email"       defaultValue="contact@masjidalnoor.org" type="email" />
              <Input label="Phone Number"        defaultValue="+91 98765 43210" />
              <Input label="City"                defaultValue="Mumbai" />
              <Input label="State"               defaultValue="Maharashtra" />
              <Input label="Website (optional)"  defaultValue="https://masjidalnoor.org" />
            </div>
          </Card>

          {/* Notification Preferences */}
          <Card>
            <div className="p-6 border-b">
              <h2 className="font-semibold text-lg flex items-center gap-2">
                <Bell className="w-5 h-5" /> Notification Preferences
              </h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">New Applications</p>
                  <p className="text-sm text-textSecondary">Alert when someone applies to your job</p>
                </div>
                <Switch checked={notifications.newApplications}    onCheckedChange={() => toggle("newApplications")} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Application Status Updates</p>
                  <p className="text-sm text-textSecondary">When a candidate withdraws or updates</p>
                </div>
                <Switch checked={notifications.applicationUpdates} onCheckedChange={() => toggle("applicationUpdates")} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Weekly Hiring Report</p>
                  <p className="text-sm text-textSecondary">Summary of views, applications & activity</p>
                </div>
                <Switch checked={notifications.weeklyReport}       onCheckedChange={() => toggle("weeklyReport")} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Newsletter</p>
                  <p className="text-sm text-textSecondary">Monthly Islamic job market insights</p>
                </div>
                <Switch checked={notifications.newsletter}         onCheckedChange={() => toggle("newsletter")} />
              </div>
            </div>
          </Card>

          {/* Privacy & Security */}
          <Card>
            <div className="p-6 border-b">
              <h2 className="font-semibold text-lg flex items-center gap-2">
                <Shield className="w-5 h-5" /> Privacy & Security
              </h2>
            </div>
            <div className="p-6 space-y-3">
              <Button variant="outline" className="w-full justify-start" leftIcon={<Globe className="w-4 h-4" />}>
                Institution Visibility Settings
              </Button>
              <Button variant="outline" className="w-full justify-start" leftIcon={<Mail className="w-4 h-4" />}>
                Change Email Address
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-600 hover:bg-red-50 hover:border-red-200">
                Delete Institution Account
              </Button>
            </div>
          </Card>
        </div>

        <div className="mt-10 flex justify-end">
          <Button size="lg">Save All Changes</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}