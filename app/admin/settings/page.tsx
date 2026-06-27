"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Switch } from "@/components/ui/Switch";
import { useState } from "react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    emailNotifications: true,
    autoVerify: false,
  });

  return (
    <DashboardLayout role="admin" userName="Super Admin">
      <div className="mx-auto">
        <h1 className="text-3xl font-bold mb-2">Platform Settings</h1>
        <p className="text-textSecondary mb-8">Configure global platform preferences</p>

        <div className="space-y-8">
          {/* General Settings */}
          <Card>
            <div className="p-6 border-b">
              <h2 className="font-semibold text-lg">General Settings</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Maintenance Mode</p>
                  <p className="text-sm text-textSecondary">Temporarily disable the platform for users</p>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, maintenanceMode: checked }))}
                />
              </div>

              <Input label="Platform Name" defaultValue="Jobs" />
              <Input label="Support Email" defaultValue="support@jobs.com" type="email" />
            </div>
          </Card>

          {/* Notification Settings */}
          <Card>
            <div className="p-6 border-b">
              <h2 className="font-semibold text-lg">Notifications</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-textSecondary">Send system alerts to administrators</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, emailNotifications: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto-Verify Institutions</p>
                  <p className="text-sm text-textSecondary">Automatically verify trusted institutions</p>
                </div>
                <Switch
                  checked={settings.autoVerify}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoVerify: checked }))}
                />
              </div>
            </div>
          </Card>

          {/* Security */}
          <Card>
            <div className="p-6 border-b">
              <h2 className="font-semibold text-lg">Security</h2>
            </div>
            <div className="p-6">
              <Button variant="outline" className="w-full justify-start mb-3">
                Change Admin Password
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-600 hover:bg-red-50">
                Export Platform Data
              </Button>
            </div>
          </Card>
        </div>

        <div className="mt-10 flex justify-end">
          <Button size="lg">Save All Settings</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}