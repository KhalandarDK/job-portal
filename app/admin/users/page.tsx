"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { SearchBar } from "@/components/ui/SearchBar";
import { Tabs } from "@/components/ui/Tabs";
import { Modal } from "@/components/ui/Modal";
import { useState } from "react";
import { MoreHorizontal, UserX, UserCheck, Eye } from "lucide-react";

const mockUsers = [
  { id: "1", name: "Mohammed Ahmed", email: "m.ahmed@email.com", role: "seeker", city: "Mumbai", status: "active", joinedAt: "2025-01-15" },
  { id: "2", name: "Masjid Al-Falah Trust", email: "info@alfalah.com", role: "provider", city: "Delhi", status: "active", joinedAt: "2025-01-10" },
  { id: "3", name: "Ibrahim Hassan", email: "ibrahim@email.com", role: "seeker", city: "Hyderabad", status: "active", joinedAt: "2025-01-08" },
  { id: "4", name: "Darul Uloom Academy", email: "admin@darululoom.com", role: "provider", city: "Pune", status: "pending", joinedAt: "2025-01-20" },
  { id: "5", name: "Yusuf Khan", email: "yusuf@email.com", role: "seeker", city: "Bangalore", status: "suspended", joinedAt: "2024-12-20" },
];

const tabs = [
  { id: "all", label: "All Users", count: mockUsers.length },
  { id: "seeker", label: "Job Seekers", count: mockUsers.filter(u => u.role === "seeker").length },
  { id: "provider", label: "Institutions", count: mockUsers.filter(u => u.role === "provider").length },
  { id: "pending", label: "Pending", count: mockUsers.filter(u => u.status === "pending").length },
];

export default function AdminUsersPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [viewUser, setViewUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = mockUsers.filter((user) => {
    const matchesTab = activeTab === "all" || 
      (activeTab === "pending" ? user.status === "pending" : user.role === activeTab);
    const matchesSearch = !searchTerm || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <DashboardLayout role="admin" userName="Super Admin">
      <div className="mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-textSecondary mt-1">Manage all registered users on the platform</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <SearchBar 
            placeholder="Search users..." 
            className="flex-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        <Card className="mt-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border bg-slate-50">
                <tr className="text-left text-xs text-textSecondary uppercase tracking-wider">
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4 hidden sm:table-cell">Role</th>
                  <th className="px-6 py-4 hidden md:table-cell">Location</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 hidden lg:table-cell">Joined</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <Avatar name={user.name} size="md" />
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-textSecondary">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 hidden sm:table-cell">
                      <Badge variant={user.role === "provider" ? "gold" : "info"}>
                        {user.role === "provider" ? "Institution" : "Job Seeker"}
                      </Badge>
                    </td>
                    <td className="px-6 py-5 text-textSecondary hidden md:table-cell">{user.city}</td>
                    <td className="px-6 py-5">
                      <Badge variant={user.status === "active" ? "success" : user.status === "pending" ? "warning" : "error"}>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-5 text-textSecondary hidden lg:table-cell">{user.joinedAt}</td>
                    <td className="px-6 py-5 text-right">
                      <Button variant="ghost" size="icon" onClick={() => setViewUser(user)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* User Detail Modal */}
      <Modal open={!!viewUser} onClose={() => setViewUser(null)} title="User Details">
        {viewUser && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar name={viewUser.name} size="lg" />
              <div>
                <h3 className="font-semibold text-xl">{viewUser.name}</h3>
                <p className="text-textSecondary">{viewUser.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                { label: "Role", value: viewUser.role },
                { label: "Location", value: viewUser.city },
                { label: "Status", value: viewUser.status },
                { label: "Joined", value: viewUser.joinedAt },
              ].map((item) => (
                <div key={item.label} className="bg-slate-50 p-4 rounded-2xl">
                  <p className="text-textSecondary text-xs">{item.label}</p>
                  <p className="font-medium capitalize mt-1">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-4">
              <Button fullWidth variant="outline">View Full Profile</Button>
              <Button fullWidth>Take Action</Button>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
}