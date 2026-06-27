"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Clock, MapPin } from "lucide-react";
import { Application } from "@/types";
import { formatDistanceToNow } from "@/lib/dateUtils";

interface ApplicationCardProps {
  application: Application;
}

export function ApplicationCard({ application }: ApplicationCardProps) {
  const { job, status, appliedAt } = application;

  const statusConfig: Record<string, {
    label: string;
    variant: "default" | "warning" | "success" | "error" | "info" | "gold";
  }> = {
    applied:             { label: "Applied",    variant: "info" },
    under_review:        { label: "In Review",  variant: "warning" },
    shortlisted:         { label: "Shortlisted",variant: "gold" },
    interview_scheduled: { label: "Interview",  variant: "success" },
    selected:            { label: "Selected",   variant: "success" },
    rejected:            { label: "Rejected",   variant: "error" },
  };

  const config = statusConfig[status] || statusConfig.applied;

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-200">
      <div className="p-3 sm:p-5">
        <div className="flex items-start gap-2.5 sm:gap-4">

          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-50 flex items-center justify-center text-xl sm:text-2xl shrink-0">
            🕌
          </div>

          <div className="flex-1 min-w-0">
            {/* Title + status */}
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-semibold text-sm sm:text-base text-slate-900 line-clamp-1 leading-snug">
                  {job?.title}
                </h3>
                <p className="text-[11px] sm:text-sm text-slate-500 mt-0.5 truncate">
                  {job?.institution?.name}
                </p>
              </div>
              <Badge variant={config.variant} dot className="shrink-0">
                {config.label}
              </Badge>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-[11px] sm:text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 shrink-0" />
                <span className="truncate max-w-[110px] sm:max-w-none">{job?.city}, {job?.state}</span>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 shrink-0" />
                {formatDistanceToNow(appliedAt)}
              </span>
            </div>

            {/* Bottom row */}
            <div className="flex items-center justify-between mt-2.5 sm:mt-4 pt-2.5 sm:pt-4 border-t border-slate-100 gap-2">
              <div>
                <p className="text-[10px] sm:text-xs text-slate-400">Salary</p>
                <p className="font-semibold text-xs sm:text-sm text-slate-800">{job?.salary}</p>
              </div>
              <div className="flex gap-1.5">
                <Button variant="outline" size="sm">Details</Button>
                {status === "shortlisted" && (
                  <Button size="sm">Prepare</Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}