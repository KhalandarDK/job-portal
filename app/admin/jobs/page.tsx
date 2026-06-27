"use client";
import { DashboardLayout, PageHeader } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { SearchBar } from "@/components/ui/SearchBar";
import { Tabs } from "@/components/ui/Tabs";
import { Select } from "@/components/ui/Select";
import { mockJobs } from "@/lib/mockData";
import { Eye, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import { useState } from "react";
import { formatDistanceToNow } from "@/lib/dateUtils";
import Link from "next/link";

const tabs = [
  { id: "all", label: "All", count: mockJobs.length },
  { id: "active", label: "Active", count: mockJobs.filter((j) => j.status === "active").length },
  { id: "closed", label: "Closed", count: 0 },
];

export default function AdminJobsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [jobs, setJobs] = useState(mockJobs);

  const filtered = activeTab === "all" ? jobs : jobs.filter((j) => j.status === activeTab);

  const toggleStatus = (id: string) => {
    setJobs((prev) =>
      prev.map((j) =>
        j.id === id ? { ...j, status: j.status === "active" ? "closed" : "active" } as typeof j : j
      )
    );
  };

  return (
    <DashboardLayout role="admin" userName="Super Admin">
      <div className="p-5 sm:p-6 mx-auto">
        <PageHeader title="Job Postings" description="Manage all job listings across the platform" />

        <div className="flex gap-3 mb-5">
          <SearchBar placeholder="Search jobs..." className="flex-1" />
          <div className="w-44 shrink-0">
            <Select
              placeholder="All categories"
              value=""
              onChange={() => {}}
              options={[
                { value: "religious", label: "Religious" },
                { value: "education", label: "Education" },
                { value: "support", label: "Support Staff" },
              ]}
            />
          </div>
        </div>

        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        <div className="mt-5">
          <Card padding="none">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr className="text-left text-xs text-textSecondary">
                    <th className="px-5 py-3 font-medium">Job</th>
                    <th className="px-5 py-3 font-medium hidden sm:table-cell">Institution</th>
                    <th className="px-5 py-3 font-medium hidden md:table-cell">Posted</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium text-right">Apps</th>
                    <th className="px-5 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3.5">
                        <div>
                          <p className="text-sm font-medium text-textPrimary">{job.title}</p>
                          <p className="text-xs text-textSecondary">{job.city}, {job.state}</p>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-textSecondary hidden sm:table-cell">
                        {job.institution?.name}
                      </td>
                      <td className="px-5 py-3.5 text-sm text-textSecondary hidden md:table-cell">
                        {formatDistanceToNow(job.createdAt)}
                      </td>
                      <td className="px-5 py-3.5">
                        <StatusBadge status={job.status} />
                      </td>
                      <td className="px-5 py-3.5 text-sm font-medium text-textPrimary text-right">
                        {job.applicationsCount}
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-end gap-1">
                          <Link href={`/jobs/${job.id}`}>
                            <Button variant="ghost" size="icon">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleStatus(job.id)}
                            className={job.status === "active" ? "text-success" : "text-textSecondary"}
                            title={job.status === "active" ? "Deactivate" : "Activate"}
                          >
                            {job.status === "active"
                              ? <ToggleRight className="w-4 h-4" />
                              : <ToggleLeft className="w-4 h-4" />}
                          </Button>
                          <Button variant="ghost" size="icon" className="text-error hover:bg-red-50">
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
      </div>
    </DashboardLayout>
  );
}
