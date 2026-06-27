"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { MapPin, Phone, Mail, GraduationCap, Briefcase, Edit } from "lucide-react";
import { useState } from "react";

export default function SeekerProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  const profile = {
    name: "Ahmed Abdullah",
    email: "ahmed.abdullah@email.com",
    phone: "+91 98765 43210",
    location: "Mumbai, Maharashtra",
    bio: "Dedicated Hafiz with 5+ years of experience leading prayers and teaching Quran at local masjids.",
    education: "Master's in Islamic Studies, Darul Uloom University",
    experience: "Imam at Masjid Al-Falah (3 years)",
    skills: ["Quran Recitation", "Arabic Teaching", "Community Leadership", "Counseling"],
    languages: ["Arabic", "Urdu", "English", "Hindi"],
    profileCompletion: 72,
  };

  return (
    <DashboardLayout role="seeker" userName="Ahmed Abdullah" notificationCount={2}>
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
          <div>
            <h1 className="text-lg sm:text-2xl font-bold text-slate-900">My Profile</h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5">Manage your professional presence</p>
          </div>
          <Button
            size="sm"
            variant={isEditing ? "primary" : "outline"}
            onClick={() => setIsEditing(!isEditing)}
            leftIcon={<Edit className="w-3.5 h-3.5" />}
          >
            {isEditing ? "Save" : "Edit"}
          </Button>
        </div>

        <div className="grid lg:grid-cols-12 gap-4 sm:gap-6">

          {/* Summary card */}
          <div className="lg:col-span-4">
            <Card className="p-4 sm:p-6 lg:sticky lg:top-20">

              {/* Avatar row — horizontal on mobile, centered on desktop */}
              <div className="flex items-center gap-3 lg:flex-col lg:items-center lg:text-center">
                <Avatar
                  name={profile.name}
                  size="lg"
                  className="ring-4 ring-slate-100 flex-shrink-0"
                />
                <div className="min-w-0 lg:mt-3">
                  <h2 className="font-bold text-sm sm:text-lg text-slate-900 leading-tight">
                    {profile.name}
                  </h2>
                  <p className="text-slate-500 text-xs mt-0.5">Job Seeker • Hafiz</p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex justify-around mt-4 pt-4 border-t border-slate-100">
                <div className="text-center">
                  <p className="text-lg sm:text-2xl font-bold text-blue-600">47</p>
                  <p className="text-[10px] sm:text-xs text-slate-500">Views</p>
                </div>
                <div className="w-px bg-slate-100" />
                <div className="text-center">
                  <p className="text-lg sm:text-2xl font-bold text-blue-600">12</p>
                  <p className="text-[10px] sm:text-xs text-slate-500">Applied</p>
                </div>
              </div>

              {/* Strength */}
              <div className="mt-4">
                <div className="flex justify-between text-[11px] text-slate-500 mb-1.5">
                  <span>Profile Strength</span>
                  <span className="font-semibold text-emerald-600">{profile.profileCompletion}%</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full"
                    style={{ width: `${profile.profileCompletion}%` }}
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Detail cards */}
          <div className="lg:col-span-8 space-y-3 sm:space-y-4">

            {/* Bio */}
            <Card>
              <div className="px-3 sm:px-5 py-3 border-b border-slate-100">
                <h3 className="font-semibold text-xs sm:text-sm text-slate-900">About Me</h3>
              </div>
              <div className="p-3 sm:p-5">
                <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">{profile.bio}</p>
              </div>
            </Card>

            {/* Contact */}
            <Card>
              <div className="px-3 sm:px-5 py-3 border-b border-slate-100">
                <h3 className="font-semibold text-xs sm:text-sm text-slate-900">Contact</h3>
              </div>
              <div className="p-3 sm:p-5 space-y-3">
                {[
                  { icon: <Mail className="w-3.5 h-3.5 text-slate-400" />, label: "Email", value: profile.email },
                  { icon: <Phone className="w-3.5 h-3.5 text-slate-400" />, label: "Phone", value: profile.phone },
                  { icon: <MapPin className="w-3.5 h-3.5 text-slate-400" />, label: "Location", value: profile.location },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex items-center gap-2.5">
                    {icon}
                    <div className="min-w-0">
                      <p className="text-[10px] text-slate-400">{label}</p>
                      <p className="font-medium text-xs sm:text-sm text-slate-800 truncate">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Exp + Edu */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="p-3 sm:p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                  <h3 className="font-semibold text-xs sm:text-sm text-slate-900">Experience</h3>
                </div>
                <p className="text-xs text-slate-600 leading-snug">{profile.experience}</p>
              </Card>
              <Card className="p-3 sm:p-5">
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                  <h3 className="font-semibold text-xs sm:text-sm text-slate-900">Education</h3>
                </div>
                <p className="text-xs text-slate-600 leading-snug">{profile.education}</p>
              </Card>
            </div>

            {/* Skills */}
            <Card>
              <div className="px-3 sm:px-5 py-3 border-b border-slate-100">
                <h3 className="font-semibold text-xs sm:text-sm text-slate-900">Skills & Languages</h3>
              </div>
              <div className="p-3 sm:p-5 space-y-3">
                <div>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-2">
                    Skills
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.skills.map((s, i) => (
                      <Badge key={i} variant="info">{s}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-2">
                    Languages
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.languages.map((l, i) => (
                      <Badge key={i} variant="default">{l}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}