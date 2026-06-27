"use client";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { RoleSelector } from "@/components/auth/RoleSelector";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Mail, Lock, User } from "lucide-react";
import { useState } from "react";

const roleOptions = [
  {
    value: "seeker",
    label: "Job Seeker",
    description: "I'm looking for Imam, Teacher or other roles",
    icon: "🤲",
  },
  {
    value: "provider",
    label: "Masjid / Madrasa",
    description: "I want to hire staff for my institution",
    icon: "🕌",
  },
];

export default function RegisterPage() {
  const [step, setStep] = useState<"role" | "form">("role");
  const [role, setRole] = useState("seeker");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  if (step === "role") {
    return (
      <AuthLayout
        title="Join Jobs"
        subtitle="How would you like to use the platform?"
        footerText="Already have an account?"
        footerLinkText="Sign in"
        footerLinkHref="/auth/login"
      >
        <RoleSelector options={roleOptions} value={role} onChange={setRole} />
        <Button fullWidth className="mt-5" onClick={() => setStep("form")}>
          Continue as {role === "seeker" ? "Job Seeker" : "Institution"} →
        </Button>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title={role === "seeker" ? "Create your profile" : "Register your institution"}
      subtitle="Fill in your details to get started"
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLinkHref="/auth/login"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label={role === "seeker" ? "Full Name" : "Institution Name"}
          placeholder={role === "seeker" ? "Ahmed Abdullah" : "Masjid Al-Noor"}
          required
          leftIcon={<User className="w-4 h-4" />}
        />
        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          required
          leftIcon={<Mail className="w-4 h-4" />}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Min 8 characters"
          required
          leftIcon={<Lock className="w-4 h-4" />}
          hint="Use at least 8 characters with a mix of letters and numbers"
        />

        <Checkbox
          label="I agree to the Terms of Service and Privacy Policy"
          required
        />

        <Button type="submit" fullWidth loading={loading} className="mt-2">
          Create Account
        </Button>

        <button
          type="button"
          onClick={() => setStep("role")}
          className="w-full text-sm text-textSecondary hover:text-textPrimary text-center"
        >
          ← Change account type
        </button>
      </form>
    </AuthLayout>
  );
}
