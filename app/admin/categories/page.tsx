"use client";
import { DashboardLayout, PageHeader } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { JOB_CATEGORIES } from "@/lib/utils";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

export default function AdminCategoriesPage() {
  const [addModal, setAddModal] = useState(false);

  return (
    <DashboardLayout role="admin" userName="Super Admin">
      <div className="p-5 sm:p-6 mx-auto">
        <PageHeader
          title="Job Categories"
          description="Manage roles and categories on the platform"
          action={
            <Button leftIcon={<PlusCircle className="w-4 h-4" />} onClick={() => setAddModal(true)}>
              Add Category
            </Button>
          }
        />

        <div className="space-y-4">
          {JOB_CATEGORIES.map((cat) => (
            <Card key={cat.id}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">
                      {cat.id === "religious" ? "🕌" : cat.id === "education" ? "📚" : cat.id === "administration" ? "📊" : "🤝"}
                    </span>
                    <h3 className="font-semibold text-textPrimary">{cat.name}</h3>
                    <Badge variant="info" size="sm">{cat.roles.length} roles</Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.roles.map((role) => (
                      <div key={role} className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1 text-xs text-textPrimary">
                        {role}
                        <button className="text-textSecondary hover:text-error ml-1 transition-colors">×</button>
                      </div>
                    ))}
                    <button className="flex items-center gap-1 bg-primary-50 text-primary-800 rounded-full px-3 py-1 text-xs font-medium hover:bg-primary-100 transition-colors">
                      <PlusCircle className="w-3 h-3" /> Add Role
                    </button>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button variant="ghost" size="icon">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-error hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Modal open={addModal} onClose={() => setAddModal(false)} title="Add New Category" size="sm">
        <div className="space-y-4">
          <Input label="Category Name" placeholder="e.g. Administrative" required />
          <Input label="Description" placeholder="Brief description of this category" />
          <Button fullWidth onClick={() => setAddModal(false)}>Create Category</Button>
        </div>
      </Modal>
    </DashboardLayout>
  );
}
