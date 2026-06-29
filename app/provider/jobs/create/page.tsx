"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Checkbox } from "@/components/ui/Checkbox";
import { useState } from "react";
import { PlusCircle } from "lucide-react";

export default function CreateJobPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert("Job posted successfully! 🎉");
      setLoading(false);
    }, 1500);
  };

  return (
    <DashboardLayout role="provider" institutionName="Masjid Al-Noor" notificationCount={4}>
      <div>

        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-lg sm:text-2xl font-bold text-slate-900">Post a New Job</h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Reach dedicated professionals in the community
          </p>
        </div>

        <Card className="p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">

            {/* Title + Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <Input label="Job Title"  placeholder="e.g. Imam"     required />
              <Select
                label="Category"
                options={[
                  { value: "religious",      label: "Religious Roles" },
                  { value: "education",      label: "Education & Teaching" },
                  { value: "administration", label: "Administration" },
                  { value: "support",        label: "Support Staff" },
                ]}
              />
            </div>

            {/* Role */}
            <Input label="Role / Position" placeholder="e.g. Senior Imam" required />

            {/* Salary + Location */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <Input label="Monthly Salary" placeholder="₹45,000" required />
              <Input label="City"           placeholder="Mumbai"       required />
              <Input label="State"          placeholder="Maharashtra"  required />
            </div>

            {/* Description */}
            <Textarea
              label="Job Description"
              placeholder="Describe the role, responsibilities, and what you're looking for..."
              rows={4}
              required
            />

            {/* Exp + Edu */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <Input label="Experience Required" placeholder="3+ years" />
              <Input label="Education Required"  placeholder="Hafiz / Alim" />
            </div>

            {/* Joining + Vacancies */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <Input label="Expected Joining Date" type="date" />
              <Input label="Number of Vacancies"   type="number" placeholder="1" />
            </div>

            {/* Amenities */}
            <div>
              <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2">
                Benefits Provided
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
                <Checkbox label="Accommodation" defaultChecked />
                <Checkbox label="Food Provided" />
                <Checkbox label="Transport Allowance" />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-3 sm:pt-4 border-t border-slate-100">
              <Button
                type="submit"
                fullWidth
                size="md"
                loading={loading}
                leftIcon={<PlusCircle className="w-4 h-4" />}
              >
                Post Job Now
              </Button>
              <p className="text-center text-[11px] text-slate-400 mt-3">
                Your job will be reviewed and published within 24 hours
              </p>
            </div>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
}