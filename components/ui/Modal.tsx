"use client";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useEffect, ReactNode } from "react";
import { Button } from "./Button";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  showCloseButton?: boolean;
}

const sizeMap = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
};

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  size = "md",
  showCloseButton = true,
}: ModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative w-full bg-white rounded-t-3xl sm:rounded-2xl shadow-modal z-10 max-h-[90vh] overflow-y-auto",
          sizeMap[size]
        )}
      >
        {(title || showCloseButton) && (
          <div className="flex items-start justify-between p-5 border-b border-border">
            <div>
              {title && <h2 className="text-lg font-semibold text-textPrimary">{title}</h2>}
              {description && <p className="text-sm text-textSecondary mt-0.5">{description}</p>}
            </div>
            {showCloseButton && (
              <Button variant="ghost" size="icon" onClick={onClose} className="shrink-0 -mr-1 -mt-1">
                <X className="w-5 h-5" />
              </Button>
            )}
          </div>
        )}
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
