"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MapPin, Clock, Users, Heart } from "lucide-react";
import { Job } from "@/types";
import { formatDistanceToNow } from "@/lib/dateUtils";

interface JobCardProps {
  job: Job;
  showApply?: boolean;
}

export function JobCard({ job, showApply = true }: JobCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-200">

      <div className="p-3 sm:p-5">
        <div className="flex items-start gap-2.5 sm:gap-4">

          {/* Mosque icon */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-50 flex items-center justify-center text-xl sm:text-2xl shrink-0 border border-blue-100">
            🕌
          </div>

          <div className="flex-1 min-w-0">
            {/* Title row */}
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <Link href={`/jobs/${job.id}`}>
                  <h3 className="font-semibold text-sm sm:text-base text-slate-900 hover:text-blue-600 transition-colors line-clamp-1 leading-snug">
                    {job.title}
                  </h3>
                </Link>
                <p className="text-[11px] sm:text-sm text-slate-500 mt-0.5 truncate">
                  {job.institution?.name}
                </p>
              </div>
              <Badge variant="success">
                {job.status === "active" ? "Open" : "Closed"}
              </Badge>
            </div>

            {/* Meta row */}
            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 sm:mt-3 text-[11px] sm:text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 shrink-0" />
                <span className="truncate max-w-[100px] sm:max-w-none">{job.city}, {job.state}</span>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 shrink-0" />
                {formatDistanceToNow(job.createdAt)}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3 shrink-0" />
                {job.vacancyCount} openings
              </span>
            </div>

            {/* Salary + perks */}
            <div className="flex flex-wrap items-center gap-1.5 mt-2 sm:mt-3">
              <Badge variant="gold" size="md" className="font-semibold">{job.salary}</Badge>
              {job.accommodationAvailable && <Badge variant="info">+ Stay</Badge>}
              {job.foodAvailable && <Badge variant="info">+ Food</Badge>}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-100 bg-slate-50/70 px-3 sm:px-5 py-2 sm:py-3 flex items-center justify-between">
        <p className="text-[11px] sm:text-xs text-slate-400">
          {job.applicationsCount || 0} applied
        </p>
        <div className="flex items-center gap-1.5">
          <button className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-50 transition-colors">
            <Heart className="w-3.5 h-3.5" />
          </button>
          {showApply && (
            <Link href={`/jobs/${job.id}`}>
              <Button size="sm">Apply</Button>
            </Link>
          )}
        </div>
      </div>
    </Card>
  );
}