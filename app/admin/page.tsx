"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/ui/StatsCard";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { mockJobs, mockDashboardStats } from "@/lib/mockData";
import {
  Users, Briefcase, Building2, TrendingUp,
  ArrowRight, ShieldCheck, AlertTriangle, Clock
} from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "@/lib/dateUtils";
import { StatusBadge } from "@/components/ui/StatusBadge";
const recentUsers = [
  { id: "1", name: "Mohammed Ahmed", role: "seeker", city: "Mumbai", joinedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
  { id: "2", name: "Masjid Al-Falah", role: "provider", city: "Delhi", joinedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() },
  { id: "3", name: "Ibrahim Khan", role: "seeker", city: "Hyderabad", joinedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
];

export default function AdminDashboard() {
  return (
    <DashboardLayout
      role="admin"
      userName="Super Admin"
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-textSecondary mt-1">Platform overview and management</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatsCard
            title="Total Users"
            value={mockDashboardStats.totalUsers || 1240}
            icon={<Users className="w-5 h-5" />}
            change="+18 this week"
            trend="up"
          />
          <StatsCard
            title="Institutions"
            value="48"
            icon={<Building2 className="w-5 h-5" />}
            change="+5"
            trend="up"
          />
          <StatsCard
            title="Active Jobs"
            value={mockDashboardStats.activeJobs}
            icon={<Briefcase className="w-5 h-5" />}
            change="+10"
            trend="up"
          />
          <StatsCard
            title="Applications"
            value={mockDashboardStats.totalApplications}
            icon={<TrendingUp className="w-5 h-5" />}
            change="+22"
            trend="up"
          />
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Recent Users */}
            <Card>
              <div className="flex items-center justify-between px-6 pt-6">
                <h2 className="font-semibold text-xl">Recent Registrations</h2>
                <Link href="/admin/users">
                  <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    View All
                  </Button>
                </Link>
              </div>
              <div className="px-6 pb-6 space-y-4 mt-6">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50">
                    <Avatar name={user.name} size="md" />
                    <div className="flex-1">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-textSecondary">{user.city} • {formatDistanceToNow(user.joinedAt)}</p>
                    </div>
                    <Badge variant={user.role === "provider" ? "gold" : "info"}>
                      {user.role === "provider" ? "Institution" : "Seeker"}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Jobs */}
            <Card>
              <div className="flex items-center justify-between px-6 pt-6">
                <h2 className="font-semibold text-xl">Recent Job Postings</h2>
                <Link href="/admin/jobs">
                  <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    View All
                  </Button>
                </Link>
              </div>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-xs text-textSecondary">
                      <th className="px-6 py-4 text-left">Job</th>
                      <th className="px-6 py-4 text-left hidden md:table-cell">Institution</th>
                      <th className="px-6 py-4 text-left">Status</th>
                      <th className="px-6 py-4 text-right">Apps</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {mockJobs.slice(0, 5).map((job) => (
                      <tr key={job.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4">
                          <p className="font-medium">{job.title}</p>
                        </td>
                        <td className="px-6 py-4 text-textSecondary hidden md:table-cell">
                          {job.institution?.name}
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={job.status} />
                        </td>
                        <td className="px-6 py-4 text-right font-medium">
                          {job.applicationsCount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <Card>
              <div className="p-6">
                <h3 className="font-semibold mb-5">Platform Health</h3>
                <div className="space-y-4">
                  {[
                    { label: "API Uptime", value: "99.9%", status: "success" },
                    { label: "Active Sessions", value: "142", status: "info" },
                    { label: "Pending Verifications", value: "7", status: "warning" },
                    { label: "Reported Content", value: "2", status: "error" },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-sm text-textSecondary">{item.label}</span>
                      <Badge variant={item.status as any}>{item.value}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <h3 className="font-semibold mb-5">Quick Actions</h3>
                <div className="space-y-3">
                  <Link href="/admin/institutions">
                    <Button variant="outline" fullWidth leftIcon={<ShieldCheck className="w-4 h-4" />}>
                      Verify Institutions (7 pending)
                    </Button>
                  </Link>
                  <Link href="/admin/reports">
                    <Button variant="outline" fullWidth leftIcon={<AlertTriangle className="w-4 h-4" />}>
                      Review Reports (2 new)
                    </Button>
                  </Link>
                  <Link href="/admin/categories">
                    <Button variant="outline" fullWidth leftIcon={<Briefcase className="w-4 h-4" />}>
                      Manage Categories
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}