import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const JOB_CATEGORIES = [
  {
    id: "religious",
    name: "Religious Services",
    roles: ["Imam", "Muazzin", "Khadim"],
  },
  {
    id: "education",
    name: "Education",
    roles: ["Teacher", "Head Teacher", "Hafiz Teacher", "Arabic Teacher"],
  },
  {
    id: "administration",
    name: "Administration",
    roles: ["Accountant"],
  },
  {
    id: "support",
    name: "Support Staff",
    roles: ["Cook", "Caretaker"],
  },
];

export const INSTITUTION_TYPES = ["Masjid", "Madrasa", "School", "Other"];

export const APPLICATION_STATUSES = [
  { value: "applied", label: "Applied", color: "bg-blue-100 text-blue-800" },
  { value: "under_review", label: "Under Review", color: "bg-yellow-100 text-yellow-800" },
  { value: "shortlisted", label: "Shortlisted", color: "bg-purple-100 text-purple-800" },
  { value: "interview_scheduled", label: "Interview Scheduled", color: "bg-indigo-100 text-indigo-800" },
  { value: "selected", label: "Selected", color: "bg-green-100 text-green-800" },
  { value: "rejected", label: "Rejected", color: "bg-red-100 text-red-800" },
];

export const JOB_STATUSES = ["Draft", "Active", "Closed", "Expired"];

export type UserRole = "seeker" | "provider" | "admin";
export type InstitutionType = "masjid" | "madrasa";
