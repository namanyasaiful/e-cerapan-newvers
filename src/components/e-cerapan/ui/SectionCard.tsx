import React from 'react';

interface SectionCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function SectionCard({ title, subtitle, children }: SectionCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="bg-gray-100/70 px-6 py-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        {subtitle && <p className="text-[13px] text-gray-500 mt-1">{subtitle}</p>}
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}