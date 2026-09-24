import React from "react";
import { ChevronLeft } from "lucide-react";

interface ChevronButtonProps {
  label?: string;
  onClick?: () => void;
  className?: string;
}

export default function ChevronButton({
  label = "Kembali",
  onClick,
  className = "",
}: ChevronButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group inline-flex items-center gap-1 text-sm font-medium text-[#5094C9] transition-colors focus:outline-none ${className}`}
    >
      <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
      <span>{label}</span>
    </button>
  );
}