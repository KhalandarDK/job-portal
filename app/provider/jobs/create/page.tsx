"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Checkbox } from "@/components/ui/Checkbox";
import { useState } from "react";
import { PlusCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

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
    <DashboardLayout
      role="provider"
      institutionName="Masjid Al-Noor"
      notificationCount={4}
    >
      <div className="mx-auto">
        <div className="mb-8">
          {/* <Link href="/provider/jobs" className="inline-flex items-center gap-2 text-textSecondary hover:text-textPrimary mb-4">
            <ArrowLeft className="w-4 h-4" /> Back to My Jobs
          </Link> */}
          <h1 className="text-3xl font-bold text-textPrimary">Post a New Job</h1>
          <p className="text-textSecondary mt-1">Reach dedicated professionals in the community</p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <Input label="Job Title" placeholder="e.g. Imam" required />
              <Select
                label="Category"
                options={[
                  { value: "religious", label: "Religious Roles" },
                  { value: "education", label: "Education & Teaching" },
                  { value: "administration", label: "Administration" },
                  { value: "support", label: "Support Staff" },
                ]}
              />
            </div>

            <Input label="Role / Position" placeholder="e.g. Senior Imam" required />

            <div className="grid md:grid-cols-3 gap-6">
              <Input label="Monthly Salary" placeholder="₹45,000" required />
              <Input label="City" placeholder="Mumbai" required />
              <Input label="State" placeholder="Maharashtra" required />
            </div>

            <Textarea
              label="Job Description"
              placeholder="Describe the role, responsibilities, and what you're looking for..."
              rows={5}
              required
            />

            <div className="grid md:grid-cols-2 gap-6">
              <Input label="Experience Required" placeholder="3+ years" />
              <Input label="Education Required" placeholder="Hafiz / Studies" />
            </div>

            <div className="space-y-4">
              <Checkbox label="Accommodation Provided" defaultChecked />
              <Checkbox label="Food Provided" />
              <Checkbox label="Transportation Allowance" />
            </div>

            <div className="pt-6 border-t">
              <Button 
                type="submit" 
                fullWidth 
                size="lg" 
                loading={loading}
                leftIcon={<PlusCircle className="w-5 h-5" />}
              >
                Post Job Now
              </Button>
              <p className="text-center text-xs text-textSecondary mt-4">
                Your job will be reviewed and published within 24 hours
              </p>
            </div>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
}