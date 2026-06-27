"use client";
import { DashboardLayout, PageHeader } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { StatsCard } from "@/components/ui/StatsCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { Select } from "@/components/ui/Select";
import {
  BarChart2, Users, Briefcase, TrendingUp, Download
} from "lucide-react";
import { useState } from "react";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "users", label: "Users" },
  { id: "jobs", label: "Jobs" },
  { id: "applications", label: "Applications" },
];

const monthlyData = [
  { month: "Aug", users: 45, jobs: 12, apps: 80 },
  { month: "Sep", users: 60, jobs: 18, apps: 110 },
  { month: "Oct", users: 80, jobs: 22, apps: 145 },
  { month: "Nov", users: 95, jobs: 28, apps: 180 },
  { month: "Dec", users: 120, jobs: 35, apps: 210 },
  { month: "Jan", users: 156, jobs: 48, apps: 265 },
];

const maxApps = Math.max(...monthlyData.map((d) => d.apps));

export default function AdminReportsPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <DashboardLayout role="admin" userName="Super Admin">
      <div className="p-5 sm:p-6 mx-auto">
        <PageHeader
          title="Reports & Analytics"
          description="Platform-wide statistics and trends"
          action={
            <Button variant="outline" leftIcon={<Download className="w-4 h-4" />}>
              Export CSV
            </Button>
          }
        />

        <div className="flex items-center gap-3 mb-5">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
          <div className="ml-auto">
            <Select
              value="jan-2025"
              onChange={() => {}}
              options={[
                { value: "jan-2025", label: "Jan 2025" },
                { value: "dec-2024", label: "Dec 2024" },
                { value: "q4-2024", label: "Q4 2024" },
              ]}
            />
          </div>
        </div>

        {/* Overview */}
        {activeTab === "overview" && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatsCard title="Total Users" value="1,240" icon={<Users className="w-5 h-5 text-primary-800" />} iconBg="bg-primary-50" change={18} />
              <StatsCard title="Active Jobs" value="48" icon={<Briefcase className="w-5 h-5 text-blue-600" />} iconBg="bg-blue-50" change={10} />
              <StatsCard title="Applications" value="265" icon={<TrendingUp className="w-5 h-5 text-green-600" />} iconBg="bg-green-50" change={22} />
              <StatsCard title="Placements" value="34" icon={<BarChart2 className="w-5 h-5 text-purple-600" />} iconBg="bg-purple-50" change={15} />
            </div>

            {/* Bar Chart */}
            <Card>
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-semibold text-textPrimary">Monthly Applications Trend</h3>
                <Badge variant="success" dot>Growing</Badge>
              </div>
              <div className="flex items-end gap-3 h-40">
                {monthlyData.map((d) => (
                  <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
                    <span className="text-xs font-medium text-primary-800">{d.apps}</span>
                    <div
                      className="w-full bg-primary-100 rounded-t-lg relative overflow-hidden group"
                      style={{ height: `${(d.apps / maxApps) * 120}px` }}
                    >
                      <div
                        className="absolute bottom-0 left-0 right-0 gradient-primary rounded-t-lg transition-all"
                        style={{ height: "100%" }}
                      />
                    </div>
                    <span className="text-xs text-textSecondary">{d.month}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Breakdown */}
            <div className="grid sm:grid-cols-2 gap-5">
              <Card>
                <h3 className="font-semibold text-textPrimary mb-4">Top Job Roles</h3>
                <div className="space-y-3">
                  {[
                    { role: "Imam", count: 45, pct: 34 },
                    { role: "Arabic Teacher", count: 32, pct: 24 },
                    { role: "Hafiz Teacher", count: 28, pct: 21 },
                    { role: "Muazzin", count: 18, pct: 13 },
                    { role: "Others", count: 10, pct: 8 },
                  ].map((item) => (
                    <div key={item.role}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-textSecondary">{item.role}</span>
                        <span className="font-medium text-textPrimary">{item.count} ({item.pct}%)</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 gradient-primary rounded-full" style={{ width: `${item.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <h3 className="font-semibold text-textPrimary mb-4">Users by Type</h3>
                <div className="space-y-3">
                  {[
                    { type: "Job Seekers", count: 986, pct: 79, color: "bg-primary-600" },
                    { type: "Institutions", count: 254, pct: 21, color: "bg-gold" },
                  ].map((item) => (
                    <div key={item.type}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-textSecondary">{item.type}</span>
                        <span className="font-medium text-textPrimary">{item.count} ({item.pct}%)</span>
                      </div>
                      <div className="h-3 bg-gray-100 rounded-full">
                        <div className={`h-3 ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-border">
                  <h4 className="text-xs font-medium text-textSecondary mb-3">Top States</h4>
                  <div className="space-y-1.5">
                    {["Maharashtra", "Delhi", "Telangana", "Tamil Nadu", "Karnataka"].map((state, i) => (
                      <div key={state} className="flex justify-between text-xs">
                        <span className="text-textSecondary">{i + 1}. {state}</span>
                        <span className="font-medium text-textPrimary">{[220, 185, 140, 118, 95][i]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {(activeTab !== "overview") && (
          <Card className="text-center py-12">
            <BarChart2 className="w-10 h-10 text-primary-800 mx-auto mb-3 opacity-50" />
            <p className="text-textSecondary text-sm">Detailed {activeTab} analytics coming soon</p>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
