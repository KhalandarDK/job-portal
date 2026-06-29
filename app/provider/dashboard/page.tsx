"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { StatsCard } from "@/components/ui/StatsCard";
import { mockApplications, mockJobs } from "@/lib/mockData";
import { Briefcase, Users, TrendingUp, PlusCircle, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "@/lib/dateUtils";

export default function ProviderDashboard() {
  const recentApplications = mockApplications.slice(0, 3);
  const activeJobs = mockJobs.slice(0, 4);

  return (
    <DashboardLayout role="provider" institutionName="Masjid Al-Noor" notificationCount={4}>
      <div className="space-y-4 sm:space-y-6">

        {/* Welcome row */}
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-base sm:text-2xl font-bold text-slate-900 leading-tight truncate">
              Welcome, Masjid Al-Noor 👋
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
              Manage your institution&apos;s hiring
            </p>
          </div>
          <Link href="/provider/jobs/create" className="flex-shrink-0">
            <Button size="sm" leftIcon={<PlusCircle className="w-3.5 h-3.5" />}>
              <span className="hidden xs:inline">Post Job</span>
              <span className="xs:hidden">Post</span>
            </Button>
          </Link>
        </div>

        {/* Stats — 2×2 on mobile, 4-col on sm+ */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-4">
          <StatsCard title="Active Jobs"      value="8"   icon={<Briefcase />} change="+2 this month" trend="up" />
          <StatsCard title="Total Applicants" value="47"  icon={<Users />}     change="+12"           trend="up" />
          <StatsCard title="Response Rate"    value="84%" icon={<TrendingUp />} change="Excellent"    trend="neutral" />
          <StatsCard title="Hired"            value="3"   icon={<Users />}     change="This month"    trend="neutral" />
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-12 gap-4 sm:gap-6">

          {/* Recent Applications */}
          <div className="lg:col-span-7">
            <Card>
              <div className="flex items-center justify-between px-3 sm:px-5 pt-3 sm:pt-5 pb-3">
                <div>
                  <h2 className="font-semibold text-sm sm:text-base text-slate-900">Recent Applications</h2>
                  <p className="text-slate-500 text-[11px] sm:text-xs mt-0.5">Latest candidates</p>
                </div>
                <Link href="/provider/applications">
                  <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3 h-3" />}>
                    All
                  </Button>
                </Link>
              </div>

              <div className="space-y-1.5 px-3 sm:px-5 pb-3 sm:pb-5">
                {recentApplications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between bg-slate-50 rounded-xl p-2.5 sm:p-3.5 gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center text-sm flex-shrink-0">
                        👤
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-xs sm:text-sm text-slate-900 truncate">
                          {app.seeker?.fullName}
                        </p>
                        <p className="text-[11px] text-slate-500 truncate">{app.job?.title}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Badge
                        variant={
                          app.status === "selected"   ? "success" :
                          app.status === "shortlisted" ? "gold"   : "default"
                        }
                      >
                        {app.status === "under_review" ? "Review" :
                         app.status === "shortlisted"  ? "Listed" :
                         app.status === "selected"     ? "Selected" : app.status}
                      </Badge>
                      <Button variant="outline" size="sm" className="hidden sm:flex">View</Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-3 sm:px-5 pb-3 sm:pb-5">
                <Link href="/provider/applications">
                  <Button variant="outline" size="sm" fullWidth>View All Applications</Button>
                </Link>
              </div>
            </Card>
          </div>

          {/* Active Jobs */}
          <div className="lg:col-span-5">
            <Card>
              <div className="flex items-center justify-between px-3 sm:px-5 pt-3 sm:pt-5 pb-3">
                <div>
                  <h2 className="font-semibold text-sm sm:text-base text-slate-900">Active Postings</h2>
                  <p className="text-slate-500 text-[11px] sm:text-xs mt-0.5">{activeJobs.length} live jobs</p>
                </div>
                <Link href="/provider/jobs/create">
                  <Button size="sm" leftIcon={<PlusCircle className="w-3 h-3" />}>Post</Button>
                </Link>
              </div>

              <div className="space-y-1.5 px-3 sm:px-5">
                {activeJobs.map((job) => (
                  <div key={job.id} className="flex items-center justify-between bg-slate-50 rounded-xl p-2.5 sm:p-3 gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-xs sm:text-sm text-slate-900 truncate">{job.title}</p>
                      <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-slate-500">
                        <Users className="w-3 h-3" />
                        <span>{job.applicationsCount || 0} applicants</span>
                        <Clock className="w-3 h-3 ml-1" />
                        <span className="truncate">{formatDistanceToNow(job.createdAt)}</span>
                      </div>
                    </div>
                    <Badge variant="success">Active</Badge>
                  </div>
                ))}
              </div>

              <div className="px-3 sm:px-5 py-3 sm:py-4 border-t border-slate-100 mt-2">
                <Link href="/provider/jobs">
                  <Button variant="outline" size="sm" fullWidth>Manage All Jobs</Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}