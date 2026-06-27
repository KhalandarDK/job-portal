"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { mockJobs } from "@/lib/mockData";
import {
  MapPin, Briefcase, Home, Utensils, Users,
  Calendar, GraduationCap, Clock, ArrowLeft,
  BookmarkPlus, Share2, CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { formatDate } from "@/lib/dateUtils";

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const job = mockJobs.find((j) => j.id === params.id) ?? mockJobs[0];
  const [applyOpen, setApplyOpen] = useState(false);
  const [applied,   setApplied]   = useState(false);

  const handleApply = () => {
    setApplied(true);
    setApplyOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header isLoggedIn userName="Ahmed Abdullah" />

      <div className="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-6 py-4 sm:py-6">

        {/* Back link */}
        <Link
          href="/jobs"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 hover:text-slate-800 mb-4 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Jobs
        </Link>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 items-start">

          {/* ── Left / main ── */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">

            {/* Hero card */}
            <Card className="p-4 sm:p-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-blue-50 flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0 border border-blue-100">
                  🕌
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h1 className="text-base sm:text-xl font-bold text-slate-900 leading-snug">
                        {job.title}
                      </h1>
                      <p className="text-slate-500 text-xs sm:text-sm mt-0.5 truncate">
                        {job.institution?.name}
                      </p>
                    </div>
                    <StatusBadge status={job.status} />
                  </div>

                  {/* Meta row */}
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2.5 text-[11px] sm:text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                      {job.city}, {job.state}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                      {job.vacancyCount} {job.vacancyCount === 1 ? "vacancy" : "vacancies"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                      Posted {formatDate(job.createdAt)}
                    </span>
                  </div>

                  {/* Amenity badges */}
                  <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-100">
                    {job.accommodationAvailable && (
                      <Badge variant="success">
                        <Home className="w-3 h-3" /> Accommodation
                      </Badge>
                    )}
                    {job.foodAvailable && (
                      <Badge variant="info">
                        <Utensils className="w-3 h-3" /> Food
                      </Badge>
                    )}
                    <Badge variant="gold">💰 {job.salary}</Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Mobile-only apply bar — sticky at bottom */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-3 z-30 flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-900 text-sm leading-none">{job.salary}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">per month</p>
              </div>
              <Button variant="outline" size="sm" leftIcon={<BookmarkPlus className="w-3.5 h-3.5" />}>
                Save
              </Button>
              {applied ? (
                <Button size="sm" variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Applied
                </Button>
              ) : (
                <Button size="sm" onClick={() => setApplyOpen(true)}>
                  Apply Now
                </Button>
              )}
            </div>

            {/* Description */}
            <Card className="p-4 sm:p-6">
              <h2 className="font-semibold text-sm sm:text-base text-slate-900 mb-2.5">
                Job Description
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{job.description}</p>
            </Card>

            {/* Responsibilities */}
            <Card className="p-4 sm:p-6">
              <h2 className="font-semibold text-sm sm:text-base text-slate-900 mb-2.5">
                Responsibilities
              </h2>
              <ul className="space-y-2">
                {job.responsibilities.split(", ").map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </Card>

            {/* Requirements */}
            <Card className="p-4 sm:p-6">
              <h2 className="font-semibold text-sm sm:text-base text-slate-900 mb-3">
                Requirements
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: <GraduationCap className="w-4 h-4 text-blue-600" />, label: "Education",    value: job.educationRequired },
                  { icon: <Briefcase     className="w-4 h-4 text-blue-600" />, label: "Experience",   value: job.experienceRequired },
                  { icon: <Calendar      className="w-4 h-4 text-blue-600" />, label: "Joining",      value: formatDate(job.joiningDate) },
                  { icon: <Users         className="w-4 h-4 text-blue-600" />, label: "Vacancies",    value: `${job.vacancyCount} open` },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                      {icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] sm:text-xs text-slate-400">{label}</p>
                      <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Extra bottom padding for the mobile apply bar */}
            <div className="h-4 lg:hidden" />
          </div>

          {/* ── Right sidebar — desktop only ── */}
          <div className="hidden lg:block space-y-4">

            {/* Apply card */}
            <Card className="p-5 sticky top-20">
              <p className="text-2xl font-bold text-blue-600 leading-none">{job.salary}</p>
              <p className="text-xs text-slate-500 mt-1 mb-4">per month</p>

              {applied ? (
                <div className="text-center py-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-2">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  </div>
                  <p className="text-sm font-semibold text-slate-900">Application Submitted!</p>
                  <p className="text-xs text-slate-500 mt-1">We&apos;ll notify you of updates</p>
                </div>
              ) : (
                <Button fullWidth onClick={() => setApplyOpen(true)}>Apply Now</Button>
              )}

              <div className="flex gap-2 mt-3">
                <Button variant="outline" size="sm" fullWidth leftIcon={<BookmarkPlus className="w-3.5 h-3.5" />}>
                  Save
                </Button>
                <Button variant="ghost" size="sm" leftIcon={<Share2 className="w-3.5 h-3.5" />}>
                  Share
                </Button>
              </div>

              <p className="text-[11px] text-slate-400 text-center mt-4">
                {job.applicationsCount} people applied
              </p>
            </Card>

            {/* Institution card */}
            <Card className="p-4 sm:p-5">
              <h3 className="font-semibold text-xs sm:text-sm text-slate-900 mb-3">About the Institution</h3>
              <div className="space-y-2">
                <p className="font-semibold text-xs sm:text-sm text-slate-800">{job.institution?.name}</p>
                <p className="flex items-start gap-1.5 text-[11px] sm:text-xs text-slate-500">
                  <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                  {job.institution?.address}, {job.institution?.city}
                </p>
                <p className="text-[11px] sm:text-xs text-slate-500">
                  📧 {job.institution?.email}
                </p>
                <p className="text-[11px] sm:text-xs text-slate-500">
                  📞 {job.institution?.phone}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      <Modal
        open={applyOpen}
        onClose={() => setApplyOpen(false)}
        title="Apply for this position"
        size="sm"
      >
        <div className="space-y-3 sm:space-y-4">
          <div className="bg-blue-50 rounded-xl p-3 sm:p-4">
            <p className="font-semibold text-sm text-slate-900">{job.title}</p>
            <p className="text-xs text-slate-500 mt-0.5">{job.institution?.name}</p>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Your saved resume and profile will be sent to the institution.
            Make sure your profile is up to date before applying.
          </p>
          <div className="flex gap-2 sm:gap-3">
            <Button variant="outline" size="sm" fullWidth onClick={() => setApplyOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" fullWidth onClick={handleApply}>
              Confirm Apply
            </Button>
          </div>
        </div>
      </Modal>

      <Footer />
    </div>
  );
}