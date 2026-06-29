"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { StatsCard } from "@/components/ui/StatsCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { BarChart2, Users, Briefcase, TrendingUp, Download } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "overview",      label: "Overview" },
  { id: "users",         label: "Users" },
  { id: "jobs",          label: "Jobs" },
  { id: "applications",  label: "Applications" },
];

const monthlyData = [
  { month: "Aug", apps: 80  },
  { month: "Sep", apps: 110 },
  { month: "Oct", apps: 145 },
  { month: "Nov", apps: 180 },
  { month: "Dec", apps: 210 },
  { month: "Jan", apps: 265 },
];
const maxApps = Math.max(...monthlyData.map((d) => d.apps));

export default function AdminReportsPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <DashboardLayout role="admin" userName="Super Admin">
      <div>

        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
          <div>
            <h1 className="text-lg sm:text-2xl font-bold text-slate-900">Reports & Analytics</h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5">Platform-wide statistics and trends</p>
          </div>
          <Button variant="outline" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>
            Export
          </Button>
        </div>

        {/* Tabs + period selector */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-none flex-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-shrink-0 px-3 h-8 rounded-lg text-xs font-medium transition-all whitespace-nowrap",
                  activeTab === tab.id ? "bg-blue-600 text-white" : "bg-white text-slate-600 border border-slate-200"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <select className="flex-shrink-0 text-xs border border-slate-200 rounded-lg px-2 h-8 text-slate-600 bg-white focus:outline-none focus:border-blue-400">
            <option>Jan 2025</option>
            <option>Dec 2024</option>
            <option>Q4 2024</option>
          </select>
        </div>

        {activeTab === "overview" && (
          <div className="space-y-4 sm:space-y-5">

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-4">
              <StatsCard title="Total Users"   value="1,240" icon={<Users />}     change="+18" trend="up" />
              <StatsCard title="Active Jobs"   value="48"    icon={<Briefcase />} change="+10" trend="up" />
              <StatsCard title="Applications"  value="265"   icon={<TrendingUp />} change="+22" trend="up" />
              <StatsCard title="Placements"    value="34"    icon={<BarChart2 />} change="+15" trend="up" />
            </div>

            {/* Bar chart */}
            <Card className="p-3 sm:p-5">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="font-semibold text-xs sm:text-sm text-slate-900">Monthly Applications</h3>
                <Badge variant="success" dot>Growing</Badge>
              </div>
              <div className="flex items-end gap-1.5 sm:gap-3 h-28 sm:h-36">
                {monthlyData.map((d) => (
                  <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] sm:text-xs font-semibold text-blue-600">{d.apps}</span>
                    <div
                      className="w-full bg-blue-600 rounded-t-lg"
                      style={{ height: `${(d.apps / maxApps) * 80}%` }}
                    />
                    <span className="text-[10px] sm:text-xs text-slate-500">{d.month}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Breakdown cards */}
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-5">

              {/* Top Roles */}
              <Card className="p-3 sm:p-5">
                <h3 className="font-semibold text-xs sm:text-sm text-slate-900 mb-3">Top Job Roles</h3>
                <div className="space-y-2.5">
                  {[
                    { role: "Imam",           count: 45, pct: 34 },
                    { role: "Arabic Teacher", count: 32, pct: 24 },
                    { role: "Hafiz Teacher",  count: 28, pct: 21 },
                    { role: "Muazzin",        count: 18, pct: 13 },
                    { role: "Others",         count: 10, pct:  8 },
                  ].map((item) => (
                    <div key={item.role}>
                      <div className="flex justify-between text-[11px] sm:text-xs mb-1">
                        <span className="text-slate-500">{item.role}</span>
                        <span className="font-semibold text-slate-700">{item.count} ({item.pct}%)</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full">
                        <div className="h-1.5 bg-blue-500 rounded-full" style={{ width: `${item.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Users by type */}
              <Card className="p-3 sm:p-5">
                <h3 className="font-semibold text-xs sm:text-sm text-slate-900 mb-3">Users by Type</h3>
                <div className="space-y-2.5">
                  {[
                    { type: "Job Seekers",  count: 986, pct: 79, color: "bg-blue-500" },
                    { type: "Institutions", count: 254, pct: 21, color: "bg-amber-400" },
                  ].map((item) => (
                    <div key={item.type}>
                      <div className="flex justify-between text-[11px] sm:text-xs mb-1">
                        <span className="text-slate-500">{item.type}</span>
                        <span className="font-semibold text-slate-700">{item.count} ({item.pct}%)</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full">
                        <div className={`h-2 ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <h4 className="text-[11px] sm:text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">Top States</h4>
                  <div className="space-y-1.5">
                    {["Maharashtra", "Delhi", "Telangana", "Tamil Nadu", "Karnataka"].map((state, i) => (
                      <div key={state} className="flex justify-between text-[11px] sm:text-xs">
                        <span className="text-slate-500">{i + 1}. {state}</span>
                        <span className="font-semibold text-slate-700">{[220, 185, 140, 118, 95][i]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab !== "overview" && (
          <Card className="p-8 sm:p-12 text-center">
            <BarChart2 className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400 mx-auto mb-3 opacity-50" />
            <p className="text-slate-500 text-xs sm:text-sm">
              Detailed {activeTab} analytics coming soon
            </p>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}