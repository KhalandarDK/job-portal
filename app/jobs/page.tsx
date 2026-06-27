"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { JobCard } from "@/components/job/JobCard";
import { JobFilters } from "@/components/job/JobFilters";
import { SearchBar } from "@/components/ui/SearchBar";
import { EmptyState } from "@/components/ui/EmptyState";
import { mockJobs } from "@/lib/mockData";
import { Briefcase, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "all",       label: "All",       count: mockJobs.length },
  { id: "religious", label: "Religious", count: 2 },
  { id: "education", label: "Education", count: 2 },
  { id: "support",   label: "Support",   count: 0 },
];

export default function JobsPage() {
  const [activeTab,   setActiveTab]   = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [search,      setSearch]      = useState("");

  const jobs = mockJobs.filter((j) => {
    const matchesTab    = activeTab === "all" || j.categoryId === activeTab;
    const matchesSearch =
      !search ||
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.institution?.name.toLowerCase().includes(search.toLowerCase()) ||
      j.city.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <DashboardLayout role="seeker" userName="Ahmed Abdullah" notificationCount={2}>

      {/* Page header */}
      <div className="mb-4 sm:mb-5">
        <h1 className="text-lg sm:text-2xl font-bold text-slate-900 mb-3">Find Jobs</h1>
        <SearchBar
          placeholder="Search role, institution, city..."
          showButton
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex gap-5">

        {/* Desktop sidebar filters */}
        <aside className="hidden lg:block w-56 shrink-0">
          <JobFilters />
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0">

          {/* Tabs + filter toggle row */}
          <div className="flex items-center justify-between gap-2 mb-3">
            {/* Category tabs — scrollable on mobile */}
            <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-none flex-1 min-w-0">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex-shrink-0 flex items-center gap-1 px-2.5 h-8 rounded-lg text-xs font-medium transition-all whitespace-nowrap",
                    activeTab === tab.id
                      ? "bg-blue-600 text-white"
                      : "bg-white text-slate-600 border border-slate-200"
                  )}
                >
                  {tab.label}
                  <span className={cn(
                    "text-[10px] px-1 py-0.5 rounded-full font-semibold min-w-[16px] text-center",
                    activeTab === tab.id
                      ? "bg-white/25 text-white"
                      : "bg-slate-100 text-slate-500"
                  )}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Filter toggle — mobile only */}
            <Button
              variant={showFilters ? "primary" : "outline"}
              size="sm"
              className="lg:hidden flex-shrink-0"
              leftIcon={showFilters
                ? <X className="w-3.5 h-3.5" />
                : <SlidersHorizontal className="w-3.5 h-3.5" />
              }
              onClick={() => setShowFilters((o) => !o)}
            >
              {showFilters ? "Close" : "Filters"}
            </Button>
          </div>

          {/* Mobile inline filters */}
          {showFilters && (
            <div className="lg:hidden mb-4">
              <JobFilters />
            </div>
          )}

          {/* Result count */}
          <p className="text-[11px] sm:text-xs text-slate-500 mb-3">
            <span className="font-semibold text-slate-700">{jobs.length}</span> jobs found
          </p>

          {/* Job list */}
          {jobs.length === 0 ? (
            <EmptyState
              icon={<Briefcase className="w-10 h-10 text-slate-300" />}
              title="No jobs found"
              description="Try adjusting your search or filters."
            />
          ) : (
            <div className="space-y-2 sm:space-y-3">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}