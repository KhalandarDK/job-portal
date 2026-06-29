"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { JOB_CATEGORIES } from "@/lib/utils";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

const iconMap: Record<string, string> = {
  religious:      "🕌",
  education:      "📚",
  administration: "📊",
  support:        "🤝",
};

export default function AdminCategoriesPage() {
  const [addModal, setAddModal] = useState(false);

  return (
    <DashboardLayout role="admin" userName="Super Admin">
      <div>
        <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
          <div>
            <h1 className="text-lg sm:text-2xl font-bold text-slate-900">Job Categories</h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5">Manage roles and categories</p>
          </div>
          <Button size="sm" leftIcon={<PlusCircle className="w-3.5 h-3.5" />} onClick={() => setAddModal(true)}>
            Add Category
          </Button>
        </div>

        <div className="space-y-2 sm:space-y-3">
          {JOB_CATEGORIES.map((cat) => (
            <Card key={cat.id} className="p-3 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">

                  {/* Category header */}
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="text-lg sm:text-xl">{iconMap[cat.id] ?? "📁"}</span>
                    <h3 className="font-bold text-sm sm:text-base text-slate-900">{cat.name}</h3>
                    <Badge variant="info">{cat.roles.length} roles</Badge>
                  </div>

                  {/* Roles */}
                  <div className="flex flex-wrap gap-1.5">
                    {cat.roles.map((role) => (
                      <div
                        key={role}
                        className="flex items-center gap-1 bg-slate-100 rounded-full px-2.5 py-1 text-[11px] sm:text-xs text-slate-700"
                      >
                        {role}
                        <button className="text-slate-400 hover:text-red-500 ml-0.5 transition-colors leading-none">
                          ×
                        </button>
                      </div>
                    ))}
                    <button className="flex items-center gap-1 bg-blue-50 text-blue-600 rounded-full px-2.5 py-1 text-[11px] sm:text-xs font-medium hover:bg-blue-100 transition-colors">
                      <PlusCircle className="w-3 h-3" /> Add Role
                    </button>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-1 flex-shrink-0">
                  <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Modal open={addModal} onClose={() => setAddModal(false)} title="Add New Category" size="sm">
        <div className="space-y-3">
          <Input label="Category Name"  placeholder="e.g. Administrative" required />
          <Input label="Description"    placeholder="Brief description" />
          <Button size="sm" fullWidth onClick={() => setAddModal(false)}>
            Create Category
          </Button>
        </div>
      </Modal>
    </DashboardLayout>
  );
}