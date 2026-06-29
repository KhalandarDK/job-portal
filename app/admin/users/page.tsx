"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { SearchBar } from "@/components/ui/SearchBar";
import { Modal } from "@/components/ui/Modal";
import { useState } from "react";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";

const mockUsers = [
  { id: "1", name: "Mohammed Ahmed",       email: "m.ahmed@email.com",      role: "seeker",   city: "Mumbai",    status: "active",    joinedAt: "2025-01-15" },
  { id: "2", name: "Masjid Al-Falah Trust",email: "info@alfalah.com",        role: "provider", city: "Delhi",     status: "active",    joinedAt: "2025-01-10" },
  { id: "3", name: "Ibrahim Hassan",       email: "ibrahim@email.com",       role: "seeker",   city: "Hyderabad", status: "active",    joinedAt: "2025-01-08" },
  { id: "4", name: "Darul Uloom Academy",  email: "admin@darululoom.com",    role: "provider", city: "Pune",      status: "pending",   joinedAt: "2025-01-20" },
  { id: "5", name: "Yusuf Khan",           email: "yusuf@email.com",         role: "seeker",   city: "Bangalore", status: "suspended", joinedAt: "2024-12-20" },
];

const TABS = [
  { id: "all",      label: "All",          count: mockUsers.length },
  { id: "seeker",   label: "Seekers",      count: mockUsers.filter((u) => u.role === "seeker").length },
  { id: "provider", label: "Institutions", count: mockUsers.filter((u) => u.role === "provider").length },
  { id: "pending",  label: "Pending",      count: mockUsers.filter((u) => u.status === "pending").length },
];

export default function AdminUsersPage() {
  const [activeTab,  setActiveTab]  = useState("all");
  const [viewUser,   setViewUser]   = useState<typeof mockUsers[0] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = mockUsers.filter((u) => {
    const matchesTab    = activeTab === "all" || (activeTab === "pending" ? u.status === "pending" : u.role === activeTab);
    const matchesSearch = !searchTerm || u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <DashboardLayout role="admin" userName="Super Admin">
      <div>

        <div className="mb-4 sm:mb-6">
          <h1 className="text-lg sm:text-2xl font-bold text-slate-900">User Management</h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">Manage all registered users</p>
        </div>

        <div className="mb-3">
          <SearchBar placeholder="Search users..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
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

        {/* Desktop table */}
        <div className="hidden sm:block">
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-slate-100 bg-slate-50">
                  <tr className="text-left text-[11px] text-slate-500 uppercase tracking-wider">
                    <th className="px-4 py-3 font-semibold">User</th>
                    <th className="px-4 py-3 font-semibold hidden md:table-cell">Role</th>
                    <th className="px-4 py-3 font-semibold hidden lg:table-cell">Location</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold hidden lg:table-cell">Joined</th>
                    <th className="px-4 py-3 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <Avatar name={user.name} size="sm" className="w-8 h-8 text-xs flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="font-semibold text-xs text-slate-900 truncate">{user.name}</p>
                            <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 hidden md:table-cell">
                        <Badge variant={user.role === "provider" ? "gold" : "info"}>
                          {user.role === "provider" ? "Institution" : "Seeker"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-slate-500 hidden lg:table-cell">{user.city}</td>
                      <td className="px-4 py-3.5">
                        <Badge variant={user.status === "active" ? "success" : user.status === "pending" ? "warning" : "error"}>
                          {user.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-slate-500 hidden lg:table-cell">{user.joinedAt}</td>
                      <td className="px-4 py-3.5 text-right">
                        <button
                          onClick={() => setViewUser(user)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Mobile card list */}
        <div className="sm:hidden space-y-2">
          {filtered.map((user) => (
            <Card key={user.id} className="p-3">
              <div className="flex items-start gap-2.5">
                <Avatar name={user.name} size="sm" className="w-9 h-9 text-xs flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-semibold text-xs text-slate-900 truncate">{user.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    </div>
                    <Badge variant={user.status === "active" ? "success" : user.status === "pending" ? "warning" : "error"}>
                      {user.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1.5">
                      <Badge variant={user.role === "provider" ? "gold" : "info"}>
                        {user.role === "provider" ? "Institution" : "Seeker"}
                      </Badge>
                      <span className="text-[11px] text-slate-400">{user.city}</span>
                    </div>
                    <button
                      onClick={() => setViewUser(user)}
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* User Detail Modal */}
      <Modal open={!!viewUser} onClose={() => setViewUser(null)} title="User Details">
        {viewUser && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar name={viewUser.name} size="md" />
              <div className="min-w-0">
                <h3 className="font-bold text-sm sm:text-base text-slate-900 truncate">{viewUser.name}</h3>
                <p className="text-slate-500 text-xs truncate">{viewUser.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Role",     value: viewUser.role === "provider" ? "Institution" : "Job Seeker" },
                { label: "Location", value: viewUser.city },
                { label: "Status",   value: viewUser.status },
                { label: "Joined",   value: viewUser.joinedAt },
              ].map((item) => (
                <div key={item.label} className="bg-slate-50 p-3 rounded-xl">
                  <p className="text-[11px] text-slate-400">{item.label}</p>
                  <p className="font-semibold text-xs text-slate-800 capitalize mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-1">
              <Button size="sm" variant="outline" fullWidth>View Profile</Button>
              <Button size="sm" fullWidth>Take Action</Button>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
}