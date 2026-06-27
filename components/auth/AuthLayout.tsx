import { ReactNode } from "react";
import Link from "next/link";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  footerText?: string;
  footerLinkText?: string;
  footerLinkHref?: string;
}

export function AuthLayout({
  children,
  title,
  subtitle,
  footerText,
  footerLinkText,
  footerLinkHref,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-white">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded bg-brand-600 flex items-center justify-center text-white font-bold text-xs">
            JP
          </div>
          <span className="font-semibold text-ink text-sm">Jobs</span>
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-textPrimary font-display">{title}</h1>
            {subtitle && <p className="text-textSecondary mt-2 text-sm">{subtitle}</p>}
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl border border-border shadow-card p-6">
            {children}
          </div>

          {/* Footer */}
          {footerText && footerLinkText && footerLinkHref && (
            <p className="text-center text-sm text-textSecondary mt-6">
              {footerText}{" "}
              <Link href={footerLinkHref} className="text-primary-800 font-medium hover:underline">
                {footerLinkText}
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
