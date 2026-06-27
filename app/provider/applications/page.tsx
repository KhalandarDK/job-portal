"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Tabs } from "@/components/ui/Tabs";
import { SearchBar } from "@/components/ui/SearchBar";
import { mockApplications } from "@/lib/mockData";
import { useState } from "react";
import { Users, Filter } from "lucide-react";

const tabs = [
  { id: "all", label: "All Applicants", count: mockApplications.length },
  { id: "under_review", label: "Under Review", count: 5 },
  { id: "shortlisted", label: "Shortlisted", count: 3 },
  { id: "selected", label: "Selected", count: 2 },
];

export default function ProviderApplicationsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredApplications = mockApplications.filter((app) => {
    const matchesTab = activeTab === "all" || app.status === activeTab;
    const matchesSearch = !searchTerm || 
      app.seeker?.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.job?.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <DashboardLayout
      role="provider"
      institutionName="Masjid Al-Noor"
      notificationCount={4}
    >
      <div className="mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-textPrimary">Applications Received</h1>
          <p className="text-textSecondary mt-1">Review candidates for your institution</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <SearchBar 
            placeholder="Search applicants or job titles..." 
            className="flex-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>

        <div className="space-y-4">
          {filteredApplications.length === 0 ? (
            <Card className="p-12 text-center">
              <Users className="w-16 h-16 mx-auto text-slate-300 mb-4" />
              <h3 className="font-semibold text-xl">No applications found</h3>
              <p className="text-textSecondary mt-2">Try adjusting your filters or search terms.</p>
            </Card>
          ) : (
            filteredApplications.map((application) => (
              <Card key={application.id} className="p-6 hover:shadow-md transition-all">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center text-2xl">
                      👤
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{application.seeker?.fullName}</h3>
                      <p className="text-sm text-textSecondary">{application.job?.title}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Badge 
                      variant={
                        application.status === "selected" ? "success" : 
                        application.status === "shortlisted" ? "warning" : "default"
                      }
                    >
                      {application.status.replace("_", " ")}
                    </Badge>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                      <Button size="sm">
                        Contact
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}