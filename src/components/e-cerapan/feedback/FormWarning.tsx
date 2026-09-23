import type { ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface FormWarningProps {
  message?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export default function FormWarning({
  message,
  children,
  className = "",
}: FormWarningProps) {
  const content = message ?? children;

  if (!content) return null;

  return (
    <div
      role="alert"
      className={[
        "flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-700",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500" />
      <div className="text-sm leading-normal">{content}</div>
    </div>
  );
}
