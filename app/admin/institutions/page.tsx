"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SearchBar } from "@/components/ui/SearchBar";
import { Tabs } from "@/components/ui/Tabs";
import { ShieldCheck, ShieldX, Eye, MapPin } from "lucide-react";
import { useState } from "react";

const institutions = [
  { id: "1", type: "masjid", name: "Masjid Al-Falah", city: "Mumbai", state: "Maharashtra", contact: "Mufti Ismail", phone: "+91 9876543210", status: "verified" },
  { id: "2", type: "madrasa", name: "Darul Uloom Academy", city: "Hyderabad", state: "Telangana", contact: "Maulana Yusuf", phone: "+91 9876543211", status: "pending" },
  { id: "3", type: "masjid", name: "Jama Masjid Trust", city: "Delhi", state: "Delhi", contact: "Hafiz Rahman", phone: "+91 9876543212", status: "verified" },
];

const tabs = [
  { id: "all", label: "All Institutions", count: institutions.length },
  { id: "masjid", label: "Masjids", count: 2 },
  { id: "madrasa", label: "Madrasas", count: 1 },
  { id: "pending", label: "Pending", count: 1 },
];

export default function AdminInstitutionsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = institutions.filter((inst) => {
    const matchesTab = activeTab === "all" || 
      (activeTab === "pending" ? inst.status === "pending" : inst.type === activeTab);
    const matchesSearch = !searchTerm || 
      inst.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <DashboardLayout role="admin" userName="Super Admin">
      <div className="mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Institutions</h1>
          <p className="text-textSecondary mt-1">Manage registered Masjids and Madrasas</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <SearchBar 
            placeholder="Search institutions..." 
            className="flex-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>

        <div className="space-y-4">
          {filtered.map((inst) => (
            <Card key={inst.id} className="p-6">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center text-4xl shrink-0">
                  {inst.type === "masjid" ? "🕌" : "📚"}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-xl">{inst.name}</h3>
                      <p className="text-textSecondary capitalize">{inst.type}</p>
                    </div>
                    <Badge variant={inst.status === "verified" ? "success" : "warning"}>
                      {inst.status}
                    </Badge>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-4 text-sm text-textSecondary">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      {inst.city}, {inst.state}
                    </span>
                    <span>📞 {inst.phone}</span>
                    <span>👤 {inst.contact}</span>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <Button variant="outline" size="sm" leftIcon={<Eye className="w-4 h-4" />}>
                      View Details
                    </Button>
                    {inst.status === "pending" && (
                      <>
                        <Button size="sm" leftIcon={<ShieldCheck className="w-4 h-4" />}>
                          Verify
                        </Button>
                        <Button variant="danger" size="sm" leftIcon={<ShieldX className="w-4 h-4" />}>
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