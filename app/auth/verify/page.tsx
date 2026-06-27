"use client";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { OTPInput } from "@/components/auth/OTPInput";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

export default function VerifyPage() {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(30);

  const handleVerify = () => {
    if (otp.length < 6) return;
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <AuthLayout
      title="Verify your number"
      subtitle="Enter the 6-digit code sent to +91 ••••••7890"
      footerText="Wrong number?"
      footerLinkText="Go back"
      footerLinkHref="/auth/register"
    >
      <div className="space-y-6">
        <OTPInput length={6} onComplete={setOtp} />

        <Button fullWidth loading={loading} onClick={handleVerify} disabled={otp.length < 6}>
          Verify & Continue
        </Button>

        <div className="text-center">
          {resendTimer > 0 ? (
            <p className="text-sm text-textSecondary">
              Resend code in <span className="font-medium text-primary-800">{resendTimer}s</span>
            </p>
          ) : (
            <button className="text-sm text-primary-800 font-medium hover:underline">
              Resend code
            </button>
          )}
        </div>
      </div>
    </AuthLayout>
  );
}
