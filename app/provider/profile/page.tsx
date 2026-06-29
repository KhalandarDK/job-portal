"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { FileUpload } from "@/components/ui/FileUpload";
import { Badge } from "@/components/ui/Badge";
import { Building2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "basic",     label: "Info" },
  { id: "contact",   label: "Contact" },
  { id: "documents", label: "Docs" },
];

export default function ProviderProfilePage() {
  const [activeTab, setActiveTab] = useState("basic");
  const [saving,    setSaving]    = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1500);
  };

  return (
    <DashboardLayout role="provider" institutionName="Masjid Al-Noor">
      <div>

        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-lg sm:text-2xl font-bold text-slate-900">Institution Profile</h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">Keep your details updated</p>
        </div>

        {/* Profile hero card */}
        <Card className="p-3 sm:p-5 mb-4 sm:mb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0 text-2xl sm:text-3xl">
              🕌
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-sm sm:text-base text-slate-900 leading-tight">
                Masjid Al-Noor
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                Masjid · Mumbai, Maharashtra
              </p>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                <Badge variant="success" dot>Verified</Badge>
                <Badge variant="info">4 Active Jobs</Badge>
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-4 h-4 text-blue-600" />
            </div>
          </div>
        </Card>

        {/* Tab pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 mb-4 scrollbar-none">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-shrink-0 px-4 h-8 rounded-lg text-xs font-medium transition-all whitespace-nowrap",
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-600 border border-slate-200"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <Card className="p-4 sm:p-5">

          {activeTab === "basic" && (
            <div className="space-y-3 sm:space-y-4">
              <h3 className="font-semibold text-xs sm:text-sm text-slate-900">Institution Information</h3>
              <Input label="Institution Name" defaultValue="Masjid Al-Noor" required />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Select
                  label="Institution Type"
                  value="masjid"
                  required
                  options={[
                    { value: "masjid",  label: "Masjid" },
                    { value: "madrasa", label: "Madrasa" },
                    { value: "school",  label: "School" },
                    { value: "other",   label: "Other" },
                  ]}
                />
                <Input
                  label="Registration Number"
                  defaultValue="REG-2010-MH-001"
                  hint="Trust/Society registration"
                />
              </div>
              <Textarea
                label="About the Institution"
                defaultValue="Masjid Al-Noor has been serving the community in Mumbai since 1985."
                rows={3}
              />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Year Established"  defaultValue="1985"  type="number" />
                <Input label="Congregation Size" defaultValue="500+"  hint="Friday attendance" />
              </div>
            </div>
          )}

          {activeTab === "contact" && (
            <div className="space-y-3 sm:space-y-4">
              <h3 className="font-semibold text-xs sm:text-sm text-slate-900">Contact Details</h3>
              <Input label="Contact Person" defaultValue="Mohammed Ali" required />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input label="Phone" type="tel"   defaultValue="+91 9876543210"         required />
                <Input label="Email" type="email" defaultValue="info@masjidalnoor.com"  required />
              </div>
              <Input label="Website" placeholder="https://www.masjidalnoor.com" type="url" />
              <Input label="Full Address" defaultValue="123 Main Street, Kurla" required />
              <div className="grid grid-cols-3 gap-3">
                <Input label="City"    defaultValue="Mumbai"      required />
                <Input label="State"   defaultValue="Maharashtra" required />
                <Select
                  label="Country"
                  value="india"
                  required
                  options={[{ value: "india", label: "India" }]}
                />
              </div>
            </div>
          )}

          {activeTab === "documents" && (
            <div className="space-y-4 sm:space-y-5">
              <h3 className="font-semibold text-xs sm:text-sm text-slate-900">Documents & Verification</h3>
              <FileUpload
                label="Registration Certificate"
                accept=".pdf,image/*"
                hint="Trust/Society registration for verification"
              />
              <FileUpload
                label="Institution Logo"
                accept="image/*"
                hint="JPG or PNG, square format recommended"
              />
              <FileUpload
                label="Institution Photos"
                accept="image/*"
                hint="Interior/exterior photos"
              />
            </div>
          )}
        </Card>

        {/* Save button */}
        <div className="mt-4 sm:mt-5">
          <Button size="sm" onClick={handleSave} loading={saving} className="w-full sm:w-auto sm:float-right">
            Save Changes
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}