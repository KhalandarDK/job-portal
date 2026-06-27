"use client";
import { DashboardLayout, PageHeader } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { FileUpload } from "@/components/ui/FileUpload";
import { Tabs } from "@/components/ui/Tabs";
import { Badge } from "@/components/ui/Badge";
import { useState } from "react";
import { Building2 } from "lucide-react";

const profileTabs = [
  { id: "basic", label: "Institution Info" },
  { id: "contact", label: "Contact" },
  { id: "documents", label: "Documents" },
];

export default function ProviderProfilePage() {
  const [activeTab, setActiveTab] = useState("basic");
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1500);
  };

  return (
    <DashboardLayout role="provider" institutionName="Masjid Al-Noor">
      <div className="p-5 sm:p-6 mx-auto">
        <PageHeader title="Institution Profile" description="Keep your institution details updated" />

        {/* Profile Header */}
        <Card className="mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center shrink-0 text-3xl">
              🕌
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-textPrimary text-lg">Masjid Al-Noor</h2>
              <p className="text-sm text-textSecondary">Masjid · Mumbai, Maharashtra</p>
              <div className="flex gap-2 mt-2">
                <Badge variant="success" dot>Verified Institution</Badge>
                <Badge variant="info">4 Active Jobs</Badge>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary-800" />
            </div>
          </div>
        </Card>

        <Tabs tabs={profileTabs} activeTab={activeTab} onChange={setActiveTab} />

        <div className="mt-5">
          {/* Institution Info */}
          {activeTab === "basic" && (
            <Card>
              <h3 className="font-semibold text-textPrimary mb-5">Institution Information</h3>
              <div className="space-y-4">
                <Input label="Institution Name" defaultValue="Masjid Al-Noor" required />
                <div className="grid sm:grid-cols-2 gap-4">
                  <Select
                    label="Institution Type"
                    value="masjid"
                    required
                    options={[
                      { value: "masjid", label: "Masjid" },
                      { value: "madrasa", label: "Madrasa" },
                      { value: "school", label: "School" },
                      { value: "other", label: "Other" },
                    ]}
                  />
                  <Input label="Registration Number" defaultValue="REG-2010-MH-001" hint="Trust/Society registration" />
                </div>
                <Textarea
                  label="About the Institution"
                  defaultValue="Masjid Al-Noor has been serving the community in Mumbai since 1985. We host daily prayers, Quran classes, and community events."
                  rows={4}
                />
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Year Established" defaultValue="1985" type="number" />
                  <Input label="Congregation Size" defaultValue="500+" hint="Approximate Friday prayer attendance" />
                </div>
              </div>
            </Card>
          )}

          {/* Contact */}
          {activeTab === "contact" && (
            <Card>
              <h3 className="font-semibold text-textPrimary mb-5">Contact Details</h3>
              <div className="space-y-4">
                <Input label="Contact Person Name" defaultValue="Mohammed Ali" required />
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Phone Number" type="tel" defaultValue="+91 9876543210" required />
                  <Input label="Email Address" type="email" defaultValue="info@masjidalnoor.com" required />
                </div>
                <Input label="Website (optional)" placeholder="https://www.masjidalnoor.com" type="url" />
                <Input label="Full Address" defaultValue="123 Main Street, Kurla" required />
                <div className="grid sm:grid-cols-3 gap-4">
                  <Input label="City" defaultValue="Mumbai" required />
                  <Input label="State" defaultValue="Maharashtra" required />
                  <Select
                    label="Country"
                    value="india"
                    required
                    options={[
                      { value: "india", label: "India" },
                      { value: "pakistan", label: "Pakistan" },
                      { value: "bangladesh", label: "Bangladesh" },
                    ]}
                  />
                </div>
              </div>
            </Card>
          )}

          {/* Documents */}
          {activeTab === "documents" && (
            <Card>
              <h3 className="font-semibold text-textPrimary mb-5">Documents & Verification</h3>
              <div className="space-y-5">
                <FileUpload
                  label="Trust / Society Registration Certificate"
                  accept=".pdf,image/*"
                  hint="For verification purposes"
                />
                <FileUpload
                  label="Institution Logo"
                  accept="image/*"
                  hint="JPG or PNG, square format recommended"
                />
                <FileUpload
                  label="Photos of the Institution"
                  accept="image/*"
                  hint="Masjid interior/exterior photos"
                />
              </div>
            </Card>
          )}

          <div className="mt-5 flex justify-end">
            <Button onClick={handleSave} loading={saving}>Save Changes</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
