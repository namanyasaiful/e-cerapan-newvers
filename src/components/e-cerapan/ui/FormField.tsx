import React from 'react';

interface FormFieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function FormField({ label, required = false, children, className = '' }: FormFieldProps) {
  return (
    <div className={className}>
      <label className="block text-[14px] font-medium text-gray-700 mb-2 leading-[1.4]">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}
