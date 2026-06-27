"use client";

import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";

interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab?: string;
  onChange?: (tabId: string) => void;
  children?: ReactNode;
  variant?: "default" | "pills" | "underline";
}

export function Tabs({ tabs, activeTab, onChange, variant = "underline" }: TabsProps) {
  const [internalActive, setInternalActive] = useState(tabs[0]?.id);
  const current = activeTab ?? internalActive;

  const handleChange = (id: string) => {
    setInternalActive(id);
    onChange?.(id);
  };

  if (variant === "pills") {
    return (
      <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleChange(tab.id)}
            className={cn(
              "flex-shrink-0 flex items-center gap-1 px-2.5 sm:px-3 h-8 rounded-lg text-xs font-medium transition-all whitespace-nowrap",
              current === tab.id
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700"
            )}
          >
            {tab.icon}
            {tab.label}
            {tab.count !== undefined && (
              <span className={cn(
                "text-[10px] px-1 py-0.5 rounded-full font-semibold min-w-[16px] text-center",
                current === tab.id ? "bg-white/25 text-white" : "bg-slate-200 text-slate-500"
              )}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="border-b border-slate-200 overflow-x-auto scrollbar-none">
      <div className="flex min-w-max sm:min-w-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleChange(tab.id)}
            className={cn(
              "flex items-center gap-1 px-3 sm:px-4 h-10 text-xs sm:text-sm font-medium border-b-2 transition-all whitespace-nowrap",
              current === tab.id
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
            )}
          >
            {tab.icon}
            {tab.label}
            {tab.count !== undefined && (
              <span className={cn(
                "text-[10px] px-1.5 py-0.5 rounded-full font-semibold min-w-[18px] text-center",
                current === tab.id
                  ? "bg-blue-50 text-blue-600"
                  : "bg-slate-100 text-slate-400"
              )}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export function useTab(initialTab: string) {
  const [activeTab, setActiveTab] = useState(initialTab);
  return { activeTab, setActiveTab };
}