"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { StatsCard } from "@/components/ui/StatsCard";
import { ApplicationCard } from "@/components/job/ApplicationCard";
import { mockApplications, mockJobs } from "@/lib/mockData";
import { 
  Briefcase, Users, TrendingUp, PlusCircle, 
  ArrowRight 
} from "lucide-react";
import Link from "next/link";

export default function ProviderDashboard() {
  const recentApplications = mockApplications.slice(0, 3);
  const activeJobs = mockJobs.slice(0, 3);

  return (
    <DashboardLayout
      role="provider"
      institutionName="Masjid Al-Noor"
      notificationCount={4}
    >
      <div className="space-y-8">
        {/* Welcome */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-textPrimary">
              Welcome back, Masjid Al-Noor
            </h1>
            <p className="text-textSecondary mt-1">Manage your institution&apos;s hiring</p>
          </div>
          <Link href="/provider/jobs/create">
            <Button leftIcon={<PlusCircle className="w-4 h-4" />} size="lg">
              Post New Job
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatsCard
            title="Active Jobs"
            value="8"
            icon={<Briefcase className="w-5 h-5" />}
            change="+2 this month"
            trend="up"
          />
          <StatsCard
            title="Total Applicants"
            value="47"
            icon={<Users className="w-5 h-5" />}
            change="+12"
            trend="up"
          />
          <StatsCard
            title="Response Rate"
            value="84%"
            icon={<TrendingUp className="w-5 h-5" />}
            change="Excellent"
          />
          <StatsCard
            title="Hired This Month"
            value="3"
            icon={<Users className="w-5 h-5" />}
            change="Good progress"
          />
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Recent Applications */}
          <div className="lg:col-span-7">
            <Card>
              <div className="flex items-center justify-between px-6 pt-6 mb-6">
                <h2 className="font-semibold text-xl">Recent Applications</h2>
                <Link href="/provider/applications">
                  <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    View All
                  </Button>
                </Link>
              </div>

              <div className="px-6 pb-6 space-y-4">
                {recentApplications.map((app) => (
                  <ApplicationCard key={app.id} application={app} />
                ))}
              </div>
            </Card>
          </div>

          {/* Active Jobs Sidebar */}
          <div className="lg:col-span-5">
            <Card>
              <div className="px-6 pt-6">
                <h2 className="font-semibold text-xl mb-6">Active Job Postings</h2>
              </div>

              <div className="px-6 pb-6 space-y-4">
                {activeJobs.map((job) => (
                  <div key={job.id} className="flex items-center justify-between bg-slate-50 rounded-2xl p-4">
                    <div>
                      <p className="font-medium">{job.title}</p>
                      <p className="text-sm text-textSecondary">{job.applicationsCount} applications</p>
                    </div>
                    <Badge variant="success">Active</Badge>
                  </div>
                ))}
              </div>

              <div className="border-t p-6">
                <Link href="/provider/jobs">
                  <Button variant="outline" fullWidth>
                    Manage All Jobs
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