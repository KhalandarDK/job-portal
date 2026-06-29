"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SearchBar } from "@/components/ui/SearchBar";
import { EmptyState } from "@/components/ui/EmptyState";
import { mockApplications } from "@/lib/mockData";
import { useState } from "react";
import { Users } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "all",          label: "All",         count: mockApplications.length },
  { id: "under_review", label: "In Review",   count: 5 },
  { id: "shortlisted",  label: "Shortlisted", count: 3 },
  { id: "selected",     label: "Selected",    count: 2 },
];

export default function ProviderApplicationsPage() {
  const [activeTab,  setActiveTab]  = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = mockApplications.filter((app) => {
    const matchesTab    = activeTab === "all" || app.status === activeTab;
    const matchesSearch =
      !searchTerm ||
      app.seeker?.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.job?.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <DashboardLayout role="provider" institutionName="Masjid Al-Noor" notificationCount={4}>
      <div>
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-lg sm:text-2xl font-bold text-slate-900">Applications</h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Review candidates for your institution
          </p>
        </div>

        {/* Search */}
        <div className="mb-3">
          <SearchBar
            placeholder="Search applicants or job titles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 mb-4 scrollbar-none">
          {TABS.map((tab) => (
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
                "text-[10px] px-1.5 py-0.5 rounded-full font-semibold min-w-[18px] text-center",
                activeTab === tab.id ? "bg-white/25 text-white" : "bg-slate-100 text-slate-500"
              )}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* List */}
        {filtered.length === 0 ? (
          <EmptyState
            icon={<Users className="w-10 h-10 text-slate-300" />}
            title="No applications found"
            description="Try adjusting your filters or search terms."
          />
        ) : (
          <div className="space-y-2 sm:space-y-3">
            {filtered.map((app) => (
              <Card key={app.id} className="p-3 sm:p-4 hover:shadow-sm transition-all">
                <div className="flex items-start gap-3">

                  {/* Avatar */}
                  <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center text-lg flex-shrink-0">
                    👤
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-semibold text-xs sm:text-sm text-slate-900 truncate leading-snug">
                          {app.seeker?.fullName}
                        </h3>
                        <p className="text-[11px] sm:text-xs text-slate-500 truncate mt-0.5">
                          Applied for: {app.job?.title}
                        </p>
                      </div>
                      <Badge
                        variant={
                          app.status === "selected"    ? "success" :
                          app.status === "shortlisted" ? "gold"    :
                          app.status === "under_review"? "warning" : "default"
                        }
                        className="flex-shrink-0"
                      >
                        {app.status === "under_review" ? "In Review" :
                         app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </Badge>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1.5 mt-2">
                      <Button variant="outline" size="sm">View Profile</Button>
                      <Button size="sm">Contact</Button>
                      {/* Status change — mobile-friendly select */}
                      <select className="ml-auto text-[11px] sm:text-xs border border-slate-200 rounded-lg px-2 h-8 text-slate-600 bg-white focus:outline-none focus:border-blue-400">
                        <option value="under_review">In Review</option>
                        <option value="shortlisted">Shortlist</option>
                        <option value="selected">Select</option>
                        <option value="rejected">Reject</option>
                      </select>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}