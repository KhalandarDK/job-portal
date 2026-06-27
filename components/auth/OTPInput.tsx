"use client";
import { useRef, useState, KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

interface OTPInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
  error?: string;
}

export function OTPInput({ length = 6, onComplete, error }: OTPInputProps) {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (idx: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const newValues = [...values];
    newValues[idx] = digit;
    setValues(newValues);

    if (digit && idx < length - 1) {
      inputRefs.current[idx + 1]?.focus();
    }

    if (newValues.every((v) => v !== "")) {
      onComplete?.(newValues.join(""));
    }
  };

  const handleKeyDown = (idx: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !values[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    const newValues = Array(length).fill("");
    pasted.split("").forEach((char, i) => { newValues[i] = char; });
    setValues(newValues);
    if (pasted.length === length) onComplete?.(pasted);
    inputRefs.current[Math.min(pasted.length, length - 1)]?.focus();
  };

  return (
    <div>
      <div className="flex gap-2 justify-center">
        {values.map((val, idx) => (
          <input
            key={idx}
            ref={(el) => { inputRefs.current[idx] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={val}
            onChange={(e) => handleChange(idx, e.target.value)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            onPaste={handlePaste}
            className={cn(
              "w-12 h-14 text-center text-xl font-bold rounded-xl border-2 transition-all outline-none",
              val ? "border-primary-800 bg-primary-50 text-primary-800" : "border-border",
              "focus:border-primary-800 focus:bg-primary-50",
              error && "border-error"
            )}
          />
        ))}
      </div>
      {error && <p className="text-xs text-error text-center mt-2">{error}</p>}
    </div>
  );
}
