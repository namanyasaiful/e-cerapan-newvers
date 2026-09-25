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
  const borderColor = isError ? 'border-danger' : isNeutral ? 'border-gray-200' : 'border-success';
  const valueColor = isError ? 'text-danger' : isNeutral ? 'text-black' : 'text-success';
  const badgeBg = isError ? 'bg-danger-hover/30' : 'bg-success-hover/30';
  const badgeText = isError ? 'text-danger' : 'text-success';
  const badgeBorder = isError ? 'border-danger' : 'border-success';

  return (
    <div className={`border ${borderColor} rounded-xl p-4 flex flex-col justify-between bg-white h-full transition-colors duration-200 shadow-xs`}>
      <div className="flex items-start justify-between gap-1.5 mb-2.5">
        <span className="text-xs text-neutral leading-tight font-medium">{label}</span>
        {status && (
          <span className={`shrink-0 px-2 py-0.5 ${badgeBg} ${badgeText} border ${badgeBorder} rounded-full text-[10px] font-bold tracking-wide uppercase whitespace-nowrap`}>
            {status}
          </span>
        )}
      </div>
      <div>
        <span className={`text-[17px] font-bold ${valueColor} block truncate`}>{value}</span>
      </div>
    </div>
  );
}