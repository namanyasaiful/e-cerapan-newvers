import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ChevronButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  iconPosition?: "left" | "right";
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "neutral";
  iconClassName?: string;
}

const sizeClasses = {
  sm: "text-xs gap-1",
  md: "text-sm gap-1.5",
  lg: "text-base gap-2",
};

const iconSizes = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

const variantClasses = {
  primary: "text-[#5094C9] hover:text-[#3e79a7]",
  secondary: "text-gray-600 hover:text-gray-900",
  neutral: "text-gray-400 hover:text-gray-600",
};

export default function ChevronButton({
  label = "Kembali",
  iconPosition = "left",
  size = "md",
  variant = "primary",
  onClick,
  className = "",
  iconClassName = "",
  type = "button",
  children,
  ...props
}: ChevronButtonProps) {
  const Icon = iconPosition === "left" ? ChevronLeft : ChevronRight;
  const hoverTranslateClass =
    iconPosition === "left"
      ? "group-hover:-translate-x-0.5"
      : "group-hover:translate-x-0.5";

  return (
    <button
      type={type}
      onClick={onClick}
      className={[
        "group inline-flex items-center font-semibold transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
        sizeClasses[size],
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {iconPosition === "left" && (
        <Icon
          className={`${iconSizes[size]} transition-transform ${hoverTranslateClass} ${iconClassName}`}
        />
      )}

      <span>{children || label}</span>

      {iconPosition === "right" && (
        <Icon
          className={`${iconSizes[size]} transition-transform ${hoverTranslateClass} ${iconClassName}`}
        />
      )}
    </button>
  );
}