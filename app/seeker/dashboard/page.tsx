"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { JobCard } from "@/components/job/JobCard";
import { StatsCard } from "@/components/ui/StatsCard";
import { Briefcase, Users, TrendingUp, ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { mockJobs } from "@/lib/mockData";
import { formatDistanceToNow } from "@/lib/dateUtils";

export default function SeekerDashboard() {
  const recentApplications = mockJobs.slice(0, 3);
  const recommendedJobs = mockJobs.slice(2, 5);

  return (
    <DashboardLayout role="seeker" userName="Ahmed Abdullah" notificationCount={2}>
      <div className="space-y-4 sm:space-y-6">

        {/* Welcome — compact on mobile */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-base sm:text-2xl font-bold text-slate-900 leading-tight">
              Hello, Ahmed 👋
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
              Your job search at a glance
            </p>
          </div>
          <Link href="/jobs">
            <Button size="sm" className="whitespace-nowrap">
              Find Jobs
            </Button>
          </Link>
        </div>

        {/* Stats — always 2×2 grid on mobile */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-4">
          <StatsCard
            title="Applications"
            value="12"
            icon={<Briefcase />}
            change="+3 this week"
            trend="up"
          />
          <StatsCard
            title="Saved Jobs"
            value="8"
            icon={<Star />}
            change="2 new"
            trend="up"
          />
          <StatsCard
            title="Profile Views"
            value="47"
            icon={<Users />}
            change="+12"
            trend="up"
          />
          <StatsCard
            title="Response Rate"
            value="67%"
            icon={<TrendingUp />}
            change="Good"
            trend="neutral"
          />
        </div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-12 gap-4 sm:gap-6">

          {/* Left — main content */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-6">

            {/* Recent Applications */}
            <Card>
              <div className="flex items-center justify-between px-3 sm:px-5 pt-3 sm:pt-5 pb-3">
                <div>
                  <h2 className="font-semibold text-sm sm:text-base text-slate-900">
                    Recent Applications
                  </h2>
                  <p className="text-slate-500 text-[11px] sm:text-xs mt-0.5">Track your progress</p>
                </div>
                <Link href="/seeker/applications">
                  <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3 h-3" />}>
                    All
                  </Button>
                </Link>
              </div>

              <div className="space-y-1.5 px-3 sm:px-5 pb-3 sm:pb-5">
                {recentApplications.map((job) => (
                  <div
                    key={job.id}
                    className="flex items-center justify-between bg-slate-50 rounded-xl p-2.5 sm:p-3.5 gap-2"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-50 rounded-xl flex items-center justify-center text-base sm:text-lg flex-shrink-0">
                        🕌
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-xs sm:text-sm text-slate-900 truncate">
                          {job.title}
                        </p>
                        <p className="text-[11px] text-slate-500 truncate">
                          {job.institution?.name}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <Badge variant="warning" dot>In Review</Badge>
                      <p className="text-[10px] text-slate-400 mt-1">
                        {formatDistanceToNow(job.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recommended Jobs */}
            <Card>
              <div className="flex items-center justify-between px-3 sm:px-5 pt-3 sm:pt-5 pb-3">
                <div>
                  <h2 className="font-semibold text-sm sm:text-base text-slate-900">
                    Recommended for You
                  </h2>
                  <p className="text-slate-500 text-[11px] sm:text-xs mt-0.5">Based on your profile</p>
                </div>
                <Link href="/jobs">
                  <Button variant="outline" size="sm">Browse</Button>
                </Link>
              </div>
              <div className="px-3 sm:px-5 pb-3 sm:pb-5 space-y-2 sm:space-y-3">
                {recommendedJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </Card>
          </div>

          {/* Right sidebar */}
          <div className="lg:col-span-4 space-y-4 sm:space-y-5">

            {/* Profile Completion */}
            <Card className="p-3 sm:p-5">
              <div className="flex justify-between items-center mb-2.5">
                <h3 className="font-semibold text-xs sm:text-sm text-slate-900">Profile Completion</h3>
                <span className="text-emerald-600 font-bold text-xs sm:text-sm">72%</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full mb-3">
                <div className="h-1.5 w-[72%] bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full" />
              </div>
              <div className="space-y-2">
                {[
                  { label: "Resume Uploaded", status: "done" },
                  { label: "Experience Details", status: "pending" },
                  { label: "Certifications", status: "pending" },
                ].map(({ label, status }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-[11px] sm:text-xs text-slate-600">{label}</span>
                    <span className={`text-[11px] font-semibold ${
                      status === "done" ? "text-emerald-600" : "text-amber-500"
                    }`}>
                      {status === "done" ? "✓" : "Pending"}
                    </span>
                  </div>
                ))}
              </div>
              <Link href="/seeker/profile" className="block mt-3">
                <Button variant="outline" size="sm" fullWidth>Complete Profile</Button>
              </Link>
            </Card>

            {/* Quick Actions */}
            <Card className="p-3 sm:p-5">
              <h3 className="font-semibold text-xs sm:text-sm text-slate-900 mb-2.5">Quick Actions</h3>
              <div className="space-y-2">
                <Link href="/jobs" className="block">
                  <Button fullWidth variant="outline" size="sm" leftIcon={<Briefcase className="w-3.5 h-3.5" />}>
                    Browse Jobs
                  </Button>
                </Link>
                <Link href="/seeker/profile" className="block">
                  <Button fullWidth variant="outline" size="sm" leftIcon={<Users className="w-3.5 h-3.5" />}>
                    Update Profile
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Tip */}
            <Card className="p-3 sm:p-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
              <p className="text-[11px] sm:text-xs font-semibold text-slate-400 mb-1">💡 PRO TIP</p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Mention Quranic knowledge and masjid experience in your profile to get faster responses.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}