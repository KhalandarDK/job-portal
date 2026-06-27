"use client";

import { ReactNode } from "react";
import { Card } from "./Card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: string;
  trend?: "up" | "down" | "neutral";
}

export function StatsCard({ title, value, icon, change, trend = "up" }: StatsCardProps) {
  return (
    <Card className="p-3 sm:p-5 hover:shadow-md transition-all duration-300 group">
      <div className="flex items-center justify-between mb-2 sm:mb-0">
        {/* Icon — compact on mobile */}
        <div className="p-1.5 sm:p-2.5 bg-slate-100 rounded-lg sm:rounded-xl group-hover:bg-blue-50 transition-colors">
          <div className="text-blue-600 [&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-5 sm:[&>svg]:h-5">
            {icon}
          </div>
        </div>

        {/* Trend badge */}
        {trend !== "neutral" && change && (
          <div className={`flex items-center gap-0.5 text-[10px] sm:text-xs font-medium ${
            trend === "up" ? "text-emerald-600" : "text-red-500"
          }`}>
            {trend === "up"
              ? <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              : <TrendingDown className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            }
            <span className="hidden xs:inline">{change}</span>
          </div>
        )}
      </div>

      {/* Value + label — tight on mobile */}
      <div className="mt-2 sm:mt-4">
        <p className="text-xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-none">
          {value}
        </p>
        <p className="text-[11px] sm:text-sm text-slate-500 mt-0.5 sm:mt-1 leading-tight">
          {title}
        </p>
        {change && (
          <p className={`text-[10px] sm:text-xs font-medium mt-0.5 xs:hidden ${
            trend === "up" ? "text-emerald-600" : trend === "down" ? "text-red-500" : "text-slate-400"
          }`}>
            {change}
          </p>
        )}
      </div>
    </Card>
  );
}