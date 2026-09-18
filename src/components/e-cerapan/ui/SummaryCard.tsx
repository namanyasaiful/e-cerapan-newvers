// src/components/e-cerapan/ui/SummaryCard.tsx
import React from 'react';

interface SummaryCardProps {
  label: string;
  value: string;
  status?: string;
  variant?: 'success' | 'error' | 'neutral';
}

export default function SummaryCard({ 
  label, 
  value, 
  status, 
  variant = 'success' 
}: SummaryCardProps) {
  const isError = variant === 'error';
  const isNeutral = variant === 'neutral';
  
  // Dynamic color assignments based on variant
  const borderColor = isError ? 'border-red-500' : isNeutral ? 'border-gray-200' : 'border-[#64CC4A]';
  const valueColor = isError ? 'text-red-500' : isNeutral ? 'text-gray-800' : 'text-[#64CC4A]';
  const badgeBg = isError ? 'bg-red-50' : 'bg-[#64CC4A]/10';
  const badgeText = isError ? 'text-red-500' : 'text-[#64CC4A]';
  const badgeBorder = isError ? 'border-red-500' : 'border-[#64CC4A]';

  return (
    <div className={`border ${borderColor} rounded-xl p-5 flex flex-col justify-between bg-white h-full transition-colors duration-200`}>
      <span className="text-[13px] text-gray-500 mb-3 block">{label}</span>
      <div className="flex justify-between items-end gap-2">
        <span className={`text-[18px] font-semibold ${valueColor}`}>{value}</span>
        {status && (
          <span className={`px-3 py-1 ${badgeBg} ${badgeText} border ${badgeBorder} rounded-full text-[11px] font-bold tracking-wide`}>
            {status}
          </span>
        )}
      </div>
    </div>
  );
}