"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SearchBar } from "@/components/ui/SearchBar";
import { ShieldCheck, ShieldX, Eye, MapPin, Phone, User } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const institutions = [
  { id: "1", type: "masjid",  name: "Masjid Al-Falah",     city: "Mumbai",    state: "Maharashtra", contact: "Mufti Ismail",   phone: "+91 9876543210", status: "verified" },
  { id: "2", type: "madrasa", name: "Darul Uloom Academy", city: "Hyderabad", state: "Telangana",   contact: "Maulana Yusuf",  phone: "+91 9876543211", status: "pending"  },
  { id: "3", type: "masjid",  name: "Jama Masjid Trust",   city: "Delhi",     state: "Delhi",       contact: "Hafiz Rahman",   phone: "+91 9876543212", status: "verified" },
];

const TABS = [
  { id: "all",     label: "All",      count: institutions.length },
  { id: "masjid",  label: "Masjids",  count: 2 },
  { id: "madrasa", label: "Madrasas", count: 1 },
  { id: "pending", label: "Pending",  count: 1 },
];

export default function AdminInstitutionsPage() {
  const [activeTab,  setActiveTab]  = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = institutions.filter((inst) => {
    const matchesTab    = activeTab === "all" || (activeTab === "pending" ? inst.status === "pending" : inst.type === activeTab);
    const matchesSearch = !searchTerm || inst.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <DashboardLayout role="admin" userName="Super Admin">
      <div>
        <div className="mb-4 sm:mb-6">
          <h1 className="text-lg sm:text-2xl font-bold text-slate-900">Institutions</h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">Manage registered Masjids and Madrasas</p>
        </div>

        <div className="mb-3">
          <SearchBar placeholder="Search institutions..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
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

        <div className="space-y-2 sm:space-y-3">
          {filtered.map((inst) => (
            <Card key={inst.id} className="p-3 sm:p-5">
              <div className="flex items-start gap-3 sm:gap-4">

                {/* Icon */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-50 flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">
                  {inst.type === "masjid" ? "🕌" : "📚"}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Title row */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-bold text-sm sm:text-base text-slate-900 leading-snug truncate">
                        {inst.name}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-500 capitalize mt-0.5">{inst.type}</p>
                    </div>
                    <Badge variant={inst.status === "verified" ? "success" : "warning"} dot className="flex-shrink-0">
                      {inst.status}
                    </Badge>
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-[11px] sm:text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {inst.city}, {inst.state}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3" /> {inst.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" /> {inst.contact}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <Button variant="outline" size="sm" leftIcon={<Eye className="w-3.5 h-3.5" />}>
                      View
                    </Button>
                    {inst.status === "pending" && (
                      <>
                        <Button size="sm" leftIcon={<ShieldCheck className="w-3.5 h-3.5" />}>
                          Verify
                        </Button>
                        <Button variant="danger" size="sm" leftIcon={<ShieldX className="w-3.5 h-3.5" />}>
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}