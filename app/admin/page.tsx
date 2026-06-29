"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/ui/StatsCard";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { mockJobs, mockDashboardStats } from "@/lib/mockData";
import { Users, Briefcase, Building2, TrendingUp, ArrowRight, ShieldCheck, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "@/lib/dateUtils";
import { StatusBadge } from "@/components/ui/Badge";

const recentUsers = [
  { id: "1", name: "Mohammed Ahmed",  role: "seeker",   city: "Mumbai",    joinedAt: new Date(Date.now() - 2 * 3600000).toISOString() },
  { id: "2", name: "Masjid Al-Falah", role: "provider", city: "Delhi",     joinedAt: new Date(Date.now() - 5 * 3600000).toISOString() },
  { id: "3", name: "Ibrahim Khan",    role: "seeker",   city: "Hyderabad", joinedAt: new Date(Date.now() - 86400000).toISOString() },
];

export default function AdminDashboard() {
  return (
    <DashboardLayout role="admin" userName="Super Admin">
      <div className="space-y-4 sm:space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-lg sm:text-2xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">Platform overview and management</p>
        </div>

        {/* Stats — 2×2 mobile, 4-col sm+ */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-4">
          <StatsCard title="Total Users"   value={mockDashboardStats.totalUsers || 1240} icon={<Users />}     change="+18 this week" trend="up" />
          <StatsCard title="Institutions"  value="48"                                    icon={<Building2 />} change="+5"            trend="up" />
          <StatsCard title="Active Jobs"   value={mockDashboardStats.activeJobs}         icon={<Briefcase />} change="+10"           trend="up" />
          <StatsCard title="Applications"  value={mockDashboardStats.totalApplications}  icon={<TrendingUp />} change="+22"          trend="up" />
        </div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-12 gap-4 sm:gap-6">

          {/* Left */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-5">

            {/* Recent Registrations */}
            <Card>
              <div className="flex items-center justify-between px-3 sm:px-5 pt-3 sm:pt-5 pb-3">
                <div>
                  <h2 className="font-semibold text-sm sm:text-base text-slate-900">Recent Registrations</h2>
                  <p className="text-slate-500 text-[11px] sm:text-xs mt-0.5">Newest users on the platform</p>
                </div>
                <Link href="/admin/users">
                  <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3 h-3" />}>All</Button>
                </Link>
              </div>

              <div className="space-y-1.5 px-3 sm:px-5 pb-3 sm:pb-5">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl hover:bg-slate-50 transition-colors">
                    <Avatar name={user.name} size="sm" className="flex-shrink-0 w-8 h-8 text-xs" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-xs sm:text-sm text-slate-900 truncate">{user.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.city} · {formatDistanceToNow(user.joinedAt)}</p>
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
              <div className="flex items-center justify-between px-3 sm:px-5 pt-3 sm:pt-5 pb-3">
                <div>
                  <h2 className="font-semibold text-sm sm:text-base text-slate-900">Recent Job Postings</h2>
                  <p className="text-slate-500 text-[11px] sm:text-xs mt-0.5">Latest listings across the platform</p>
                </div>
                <Link href="/admin/jobs">
                  <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3 h-3" />}>All</Button>
                </Link>
              </div>

              {/* Desktop table */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-100 text-[11px] text-slate-500 uppercase tracking-wide">
                      <th className="px-5 py-2.5 text-left font-semibold">Job</th>
                      <th className="px-5 py-2.5 text-left font-semibold hidden md:table-cell">Institution</th>
                      <th className="px-5 py-2.5 text-left font-semibold">Status</th>
                      <th className="px-5 py-2.5 text-right font-semibold">Apps</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {mockJobs.slice(0, 5).map((job) => (
                      <tr key={job.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-5 py-3">
                          <p className="font-medium text-xs text-slate-900">{job.title}</p>
                          <p className="text-[11px] text-slate-500">{job.city}</p>
                        </td>
                        <td className="px-5 py-3 text-xs text-slate-500 hidden md:table-cell truncate max-w-[140px]">
                          {job.institution?.name}
                        </td>
                        <td className="px-5 py-3">
                          <StatusBadge status={job.status} />
                        </td>
                        <td className="px-5 py-3 text-right text-xs font-semibold text-slate-700">
                          {job.applicationsCount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile job list */}
              <div className="sm:hidden space-y-1.5 px-3 pb-3">
                {mockJobs.slice(0, 4).map((job) => (
                  <div key={job.id} className="flex items-center justify-between bg-slate-50 rounded-xl p-2.5 gap-2">
                    <div className="min-w-0">
                      <p className="font-medium text-xs text-slate-900 truncate">{job.title}</p>
                      <p className="text-[11px] text-slate-500 truncate">{job.institution?.name}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <StatusBadge status={job.status} />
                      <span className="text-[11px] font-semibold text-slate-600">{job.applicationsCount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right sidebar */}
          <div className="lg:col-span-4 space-y-4 sm:space-y-5">

            {/* Platform Health */}
            <Card className="p-3 sm:p-5">
              <h3 className="font-semibold text-xs sm:text-sm text-slate-900 mb-3">Platform Health</h3>
              <div className="space-y-2.5">
                {[
                  { label: "API Uptime",              value: "99.9%", variant: "success" as const },
                  { label: "Active Sessions",          value: "142",   variant: "info"    as const },
                  { label: "Pending Verifications",   value: "7",     variant: "warning" as const },
                  { label: "Reported Content",         value: "2",     variant: "error"   as const },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center">
                    <span className="text-[11px] sm:text-xs text-slate-500">{item.label}</span>
                    <Badge variant={item.variant}>{item.value}</Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-3 sm:p-5">
              <h3 className="font-semibold text-xs sm:text-sm text-slate-900 mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <Link href="/admin/institutions" className="block">
                  <Button variant="outline" size="sm" fullWidth leftIcon={<ShieldCheck className="w-3.5 h-3.5" />}>
                    Verify Institutions (7)
                  </Button>
                </Link>
                <Link href="/admin/reports" className="block">
                  <Button variant="outline" size="sm" fullWidth leftIcon={<AlertTriangle className="w-3.5 h-3.5" />}>
                    Review Reports (2)
                  </Button>
                </Link>
                <Link href="/admin/categories" className="block">
                  <Button variant="outline" size="sm" fullWidth leftIcon={<Briefcase className="w-3.5 h-3.5" />}>
                    Manage Categories
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}