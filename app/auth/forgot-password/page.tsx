"use client";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Mail, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  if (sent) {
    return (
      <AuthLayout
        title="Check your email"
        subtitle="We've sent a password reset link"
        footerText="Back to"
        footerLinkText="Sign in"
        footerLinkHref="/auth/login"
      >
        <div className="text-center py-4">
          <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-primary-800" />
          </div>
          <p className="text-sm text-textSecondary leading-relaxed">
            If an account exists with that email, you&apos;ll receive a reset link shortly. Check your inbox and spam folder.
          </p>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Forgot password?"
      subtitle="Enter your email to receive a reset link"
      footerText="Remember your password?"
      footerLinkText="Sign in"
      footerLinkHref="/auth/login"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          required
          leftIcon={<Mail className="w-4 h-4" />}
        />
        <Button type="submit" fullWidth loading={loading}>
          Send Reset Link
        </Button>
      </form>
    </AuthLayout>
  );
}
