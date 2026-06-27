"use client";

import { useState } from "react";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Card } from "@/components/ui/Card";
import { SlidersHorizontal, RotateCcw, ChevronDown, ChevronUp } from "lucide-react";
import { JOB_CATEGORIES } from "@/lib/utils";

interface JobFilters {
  role: string;
  city: string;
  state: string;
  country: string;
  experience: string;
  salaryMin: string;
  salaryMax: string;
  accommodation: boolean;
  food: boolean;
}

const defaultFilters: JobFilters = {
  role: "", city: "", state: "", country: "",
  experience: "", salaryMin: "", salaryMax: "",
  accommodation: false, food: false,
};

interface JobFiltersProps {
  onFilter?: (filters: JobFilters) => void;
  className?: string;
}

export function JobFilters({ onFilter, className }: JobFiltersProps) {
  const [filters, setFilters] = useState<JobFilters>(defaultFilters);
  const [mobileOpen, setMobileOpen] = useState(false);
  const allRoles = JOB_CATEGORIES.flatMap((c) => c.roles);

  const update = (key: keyof JobFilters, value: string | boolean) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const reset = () => { setFilters(defaultFilters); onFilter?.(defaultFilters); };
  const apply = () => { onFilter?.(filters); setMobileOpen(false); };

  const body = (
    <div className="space-y-3 sm:space-y-4 mt-3">
      <Select
        label="Role" placeholder="Any role" value={filters.role}
        onChange={(e) => update("role", e.target.value)}
        options={allRoles.map((r) => ({ value: r.toLowerCase(), label: r }))}
      />
      <Select
        label="Country" placeholder="Any country" value={filters.country}
        onChange={(e) => update("country", e.target.value)}
        options={[
          { value: "india", label: "India" },
          { value: "pakistan", label: "Pakistan" },
          { value: "bangladesh", label: "Bangladesh" },
          { value: "uae", label: "UAE" },
          { value: "saudi-arabia", label: "Saudi Arabia" },
        ]}
      />
      <Select
        label="Experience" placeholder="Any level" value={filters.experience}
        onChange={(e) => update("experience", e.target.value)}
        options={[
          { value: "0", label: "Fresher" },
          { value: "1", label: "1+ years" },
          { value: "3", label: "3+ years" },
          { value: "5", label: "5+ years" },
          { value: "10", label: "10+ years" },
        ]}
      />
      <div>
        <p className="text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Amenities</p>
        <Checkbox label="Accommodation" checked={filters.accommodation}
          onChange={(e) => update("accommodation", e.target.checked)} />
        <Checkbox label="Food Provided" checked={filters.food}
          onChange={(e) => update("food", e.target.checked)} />
      </div>
      <Button fullWidth size="sm" onClick={apply}>Apply Filters</Button>
    </div>
  );

  return (
    <Card className={`p-3 sm:p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
          <span className="text-xs sm:text-sm font-semibold text-slate-800">Filters</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={reset} className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-blue-600 transition-colors">
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
          <button onClick={() => setMobileOpen(o => !o)} className="sm:hidden p-1 rounded-md hover:bg-slate-100 text-slate-400">
            {mobileOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>
      <div className={`${mobileOpen ? "block" : "hidden"} sm:block`}>{body}</div>
    </Card>
  );
}