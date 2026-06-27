"use client";
import { cn } from "@/lib/utils";
import { Upload, X, FileText, Image } from "lucide-react";
import { useState, useRef } from "react";

interface FileUploadProps {
  label?: string;
  accept?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  onFileSelect?: (file: File) => void;
  className?: string;
}

export function FileUpload({ label, accept, hint, error, required, onFileSelect, className }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    setFile(f);
    onFileSelect?.(f);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const isImage = accept?.includes("image");

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label className="text-sm font-medium text-textPrimary">
          {label}
          {required && <span className="text-error ml-0.5">*</span>}
        </label>
      )}
      <div
        className={cn(
          "relative border-2 border-dashed rounded-xl p-5 transition-all text-center cursor-pointer",
          isDragging ? "border-primary-800 bg-primary-50" : "border-border hover:border-primary-400 hover:bg-primary-50/50",
          error && "border-error",
          file && "border-primary-800 bg-primary-50"
        )}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
        {file ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isImage ? (
                <Image className="w-8 h-8 text-primary-800" />
              ) : (
                <FileText className="w-8 h-8 text-primary-800" />
              )}
              <div className="text-left">
                <p className="text-sm font-medium text-textPrimary">{file.name}</p>
                <p className="text-xs text-textSecondary">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setFile(null); }}
              className="p-1 rounded-full hover:bg-gray-200 text-textSecondary"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center">
              <Upload className="w-5 h-5 text-primary-800" />
            </div>
            <div>
              <p className="text-sm font-medium text-textPrimary">
                <span className="text-primary-800">Click to upload</span> or drag & drop
              </p>
              {hint && <p className="text-xs text-textSecondary mt-0.5">{hint}</p>}
            </div>
          </div>
        )}
      </div>
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  );
}
