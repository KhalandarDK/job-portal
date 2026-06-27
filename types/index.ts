export interface User {
  id: string;
  email: string;
  role: "seeker" | "provider" | "admin";
  createdAt: string;
}

export interface JobSeeker extends User {
  fullName: string;
  mobile: string;
  age: number;
  gender: string;
  maritalStatus: string;
  roles: string[];
  education: string;
  experience: number;
  languages: string[];
  certifications: string[];
  country: string;
  state: string;
  city: string;
  resumeUrl?: string;
}

export interface Institution {
  id: string;
  type: "masjid" | "madrasa";
  name: string;
  registrationNumber?: string;
  address: string;
  city: string;
  state: string;
  country: string;
  contactPerson: string;
  phone: string;
  email: string;
}

export interface Job {
  id: string;
  title: string;
  categoryId: string;
  role: string;
  description: string;
  responsibilities: string;
  salary: string;
  accommodationAvailable: boolean;
  foodAvailable: boolean;
  location: string;
  city: string;
  state: string;
  country: string;
  experienceRequired: string;
  educationRequired: string;
  vacancyCount: number;
  joiningDate: string;
  status: "draft" | "active" | "closed" | "expired";
  institutionId: string;
  institution?: Institution;
  applicationsCount?: number;
  createdAt: string;
}

export interface Application {
  id: string;
  jobId: string;
  seekerId: string;
  status: "applied" | "under_review" | "shortlisted" | "interview_scheduled" | "selected" | "rejected";
  appliedAt: string;
  job?: Job;
  seeker?: JobSeeker;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  type: "application" | "job" | "system";
}

export interface DashboardStats {
  totalJobs: number;
  activeJobs: number;
  totalApplications: number;
  newApplications: number;
  totalUsers?: number;
  userGrowth?: number;
}
