"use client";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your account"
      footerText="Don't have an account?"
      footerLinkText="Create one"
      footerLinkHref="/auth/register"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          required
          leftIcon={<Mail className="w-4 h-4" />}
        />
        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          required
          leftIcon={<Lock className="w-4 h-4" />}
        />

        <div className="flex items-center justify-between">
          <Checkbox label="Remember me" />
          <Link href="/auth/forgot-password" className="text-xs text-primary-800 hover:underline font-medium">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" fullWidth loading={loading} className="mt-2">
          Sign In
        </Button>

        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs text-textSecondary bg-white px-3">
            or continue with
          </div>
        </div>

        <Link href="/auth/register">
          <Button type="button" variant="outline" fullWidth>
            Create an account
          </Button>
        </Link>
      </form>
    </AuthLayout>
  );
}
