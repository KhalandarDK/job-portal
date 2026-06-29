"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SearchBar } from "@/components/ui/SearchBar";
import { mockJobs } from "@/lib/mockData";
import { Eye, Trash2, ToggleLeft, ToggleRight, Users } from "lucide-react";
import { useState } from "react";
import { formatDistanceToNow } from "@/lib/dateUtils";
import Link from "next/link";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "all",    label: "All",    count: mockJobs.length },
  { id: "active", label: "Active", count: mockJobs.filter((j) => j.status === "active").length },
  { id: "closed", label: "Closed", count: 0 },
];

export default function AdminJobsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [search,    setSearch]    = useState("");
  const [jobs,      setJobs]      = useState(mockJobs);

  const filtered = jobs.filter((j) => {
    const matchesTab    = activeTab === "all" || j.status === activeTab;
    const matchesSearch = !search || j.title.toLowerCase().includes(search.toLowerCase()) || j.institution?.name.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const toggleStatus = (id: string) =>
    setJobs((prev) =>
      prev.map((j) => j.id === id ? { ...j, status: j.status === "active" ? "closed" : "active" } as typeof j : j)
    );

  return (
    <DashboardLayout role="admin" userName="Super Admin">
      <div>
        <div className="mb-4 sm:mb-6">
          <h1 className="text-lg sm:text-2xl font-bold text-slate-900">Job Postings</h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">Manage all listings across the platform</p>
        </div>

        <div className="mb-3">
          <SearchBar placeholder="Search jobs or institutions..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1 mb-4 scrollbar-none">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-shrink-0 flex items-center gap-1 px-3 h-8 rounded-lg text-xs font-medium transition-all whitespace-nowrap",
                activeTab === tab.id ? "bg-blue-600 text-white" : "bg-white text-slate-600 border border-slate-200"
              )}
            >
              {tab.label}
              <span className={cn(
                "text-[10px] px-1.5 py-0.5 rounded-full font-semibold min-w-[18px] text-center",
                activeTab === tab.id ? "bg-white/25 text-white" : "bg-slate-100 text-slate-500"
              )}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Desktop table */}
        <div className="hidden sm:block">
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-slate-100 bg-slate-50">
                  <tr className="text-left text-[11px] text-slate-500 uppercase tracking-wider">
                    <th className="px-4 py-3 font-semibold">Job</th>
                    <th className="px-4 py-3 font-semibold hidden md:table-cell">Institution</th>
                    <th className="px-4 py-3 font-semibold hidden lg:table-cell">Posted</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold text-right">Apps</th>
                    <th className="px-4 py-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((job) => (
                    <tr key={job.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3.5">
                        <p className="font-semibold text-xs text-slate-900">{job.title}</p>
                        <p className="text-[11px] text-slate-500">{job.city}, {job.state}</p>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-slate-500 hidden md:table-cell truncate max-w-[140px]">
                        {job.institution?.name}
                      </td>
                      <td className="px-4 py-3.5 text-xs text-slate-500 hidden lg:table-cell">
                        {formatDistanceToNow(job.createdAt)}
                      </td>
                      <td className="px-4 py-3.5">
                        <Badge variant={job.status === "active" ? "success" : "default"}>{job.status}</Badge>
                      </td>
                      <td className="px-4 py-3.5 text-right text-xs font-semibold text-slate-700">
                        {job.applicationsCount}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center justify-end gap-1">
                          <Link href={`/jobs/${job.id}`}>
                            <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          </Link>
                          <button
                            onClick={() => toggleStatus(job.id)}
                            className={cn("p-1.5 rounded-lg transition-colors",
                              job.status === "active" ? "text-emerald-600 hover:bg-emerald-50" : "text-slate-400 hover:bg-slate-100"
                            )}
                          >
                            {job.status === "active" ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                          </button>
                          <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition-colors">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Mobile cards */}
        <div className="sm:hidden space-y-2">
          {filtered.map((job) => (
            <Card key={job.id} className="p-3">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="min-w-0">
                  <h3 className="font-semibold text-xs text-slate-900 truncate">{job.title}</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5 truncate">{job.institution?.name} · {job.city}</p>
                </div>
                <Badge variant={job.status === "active" ? "success" : "default"}>{job.status}</Badge>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-2.5">
                <Users className="w-3 h-3" />
                <span>{job.applicationsCount} applicants</span>
              </div>
              <div className="flex items-center gap-2 pt-2.5 border-t border-slate-100">
                <Link href={`/jobs/${job.id}`} className="flex-1">
                  <Button variant="outline" size="sm" fullWidth leftIcon={<Eye className="w-3.5 h-3.5" />}>View</Button>
                </Link>
                <Button
                  variant="outline" size="sm"
                  onClick={() => toggleStatus(job.id)}
                  className={cn(job.status === "active" ? "text-emerald-600 border-emerald-200" : "text-slate-500")}
                >
                  {job.status === "active" ? "Pause" : "Activate"}
                </Button>
                <button className="p-2 rounded-lg hover:bg-red-50 text-red-400 border border-slate-200 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}