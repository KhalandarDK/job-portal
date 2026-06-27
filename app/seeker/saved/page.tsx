"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { JobCard } from "@/components/job/JobCard";
import { SearchBar } from "@/components/ui/SearchBar";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Card } from "@/components/ui/Card";
import { mockJobs } from "@/lib/mockData";
import { useState } from "react";
import { Bookmark, Trash2 } from "lucide-react";

export default function SavedJobsPage() {
  const [savedJobs, setSavedJobs] = useState(mockJobs.slice(0, 4));
  const [searchTerm, setSearchTerm] = useState("");

  const filteredJobs = savedJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.institution?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout role="seeker" userName="Ahmed Abdullah" notificationCount={2}>
      <div>
        <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
          <div>
            <h1 className="text-lg sm:text-2xl font-bold text-slate-900">Saved Jobs</h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
              {savedJobs.length} saved · 30 day expiry
            </p>
          </div>
        </div>

        <div className="mb-4">
          <SearchBar
            placeholder="Search saved jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredJobs.length === 0 ? (
          <EmptyState
            icon={<Bookmark className="w-10 h-10 text-slate-300" />}
            title="No saved jobs"
            description="Browse and save jobs that interest you."
            actionLabel="Browse Jobs"
            actionHref="/jobs"
          />
        ) : (
          <div className="space-y-2 sm:space-y-3">
            {filteredJobs.map((job) => (
              <div key={job.id} className="relative">
                <JobCard job={job} showApply />
                <button
                  onClick={() => setSavedJobs((p) => p.filter((j) => j.id !== job.id))}
                  className="absolute top-3 right-3 p-1.5 bg-white rounded-lg shadow-sm border border-slate-200 text-red-400 hover:bg-red-50 transition-colors"
                  aria-label="Remove"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}