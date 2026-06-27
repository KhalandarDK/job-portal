"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ApplicationCard } from "@/components/job/ApplicationCard";
import { SearchBar } from "@/components/ui/SearchBar";
import { EmptyState } from "@/components/ui/EmptyState";
import { mockApplications } from "@/lib/mockData";
import { useState } from "react";
import { Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "all",          label: "All",         count: mockApplications.length },
  { id: "under_review", label: "In Review",   count: 5 },
  { id: "shortlisted",  label: "Shortlisted", count: 2 },
  { id: "selected",     label: "Selected",    count: 1 },
];

export default function SeekerApplicationsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredApplications = mockApplications.filter((app) => {
    const matchesTab = activeTab === "all" || app.status === activeTab;
    const matchesSearch =
      !searchTerm ||
      app.job?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.job?.institution?.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <DashboardLayout role="seeker" userName="Ahmed Abdullah" notificationCount={2}>
      <div>
        <div className="mb-4 sm:mb-6">
          <h1 className="text-lg sm:text-2xl font-bold text-slate-900">My Applications</h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Track all your job applications
          </p>
        </div>

        <div className="mb-3 sm:mb-4">
          <SearchBar placeholder="Search applications..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        {/* Scrollable tabs */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 mb-4 scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-shrink-0 flex items-center gap-1 px-3 h-8 rounded-lg text-xs font-medium transition-all whitespace-nowrap",
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-600 border border-slate-200"
              )}
            >
              {tab.label}
              <span className={cn(
                "text-[10px] px-1.5 py-0.5 rounded-full font-semibold",
                activeTab === tab.id ? "bg-white/25 text-white" : "bg-slate-100 text-slate-500"
              )}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {filteredApplications.length === 0 ? (
          <EmptyState
            icon={<Briefcase className="w-10 h-10 text-slate-300" />}
            title="No applications found"
            description="You haven't applied to any jobs yet."
            actionLabel="Browse Jobs"
            actionHref="/jobs"
          />
        ) : (
          <div className="space-y-2 sm:space-y-3">
            {filteredApplications.map((app) => (
              <ApplicationCard key={app.id} application={app} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}