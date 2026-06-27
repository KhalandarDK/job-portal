"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { SearchBar } from "@/components/ui/SearchBar";
import { Tabs } from "@/components/ui/Tabs";
import { mockJobs } from "@/lib/mockData";
import { Eye, Trash2, PlusCircle, ToggleLeft, ToggleRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "@/lib/dateUtils";

const tabs = [
  { id: "all", label: "All Jobs", count: mockJobs.length },
  { id: "active", label: "Active", count: mockJobs.filter(j => j.status === "active").length },
  { id: "closed", label: "Closed", count: 2 },
];

export default function ProviderJobsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [jobs, setJobs] = useState(mockJobs);

  const filtered = activeTab === "all" 
    ? jobs 
    : jobs.filter(j => j.status === activeTab);

  const toggleStatus = (id: string) => {
    setJobs(prev => prev.map(job => 
      job.id === id 
        ? { ...job, status: job.status === "active" ? "closed" : "active" } 
        : job
    ));
  };

  return (
    <DashboardLayout
      role="provider"
      institutionName="Masjid Al-Noor"
      notificationCount={4}
    >
      <div className="mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-textPrimary">My Job Postings</h1>
            <p className="text-textSecondary mt-1">Manage all your active and past opportunities</p>
          </div>
          
          <Link href="/provider/jobs/create">
            <Button leftIcon={<PlusCircle className="w-4 h-4" />} size="lg">
              Post New Job
            </Button>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <SearchBar placeholder="Search your jobs..." className="flex-1" />
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>

        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border bg-slate-50">
                <tr className="text-left text-xs text-textSecondary uppercase tracking-wider">
                  <th className="px-6 py-4 font-medium">Job Title</th>
                  <th className="px-6 py-4 font-medium hidden md:table-cell">Category</th>
                  <th className="px-6 py-4 font-medium hidden sm:table-cell">Posted</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-center">Applications</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-5">
                      <div>
                        <p className="font-medium text-textPrimary">{job.title}</p>
                        <p className="text-sm text-textSecondary">{job.city}</p>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm text-textSecondary hidden md:table-cell">
                      {job.categoryId}
                    </td>
                    <td className="px-6 py-5 text-sm text-textSecondary hidden sm:table-cell">
                      {formatDistanceToNow(job.createdAt)}
                    </td>
                    <td className="px-6 py-5">
                      <StatusBadge status={job.status} />
                    </td>
                    <td className="px-6 py-5 text-center font-medium">
                      {job.applicationsCount || 0}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/jobs/${job.id}`}>
                          <Button variant="ghost" size="icon">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleStatus(job.id)}
                          className={job.status === "active" ? "text-emerald-600" : ""}
                        >
                          {job.status === "active" ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                        </Button>

                        <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}