import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="flex flex-col ">
      <h1 className="text-[36px] font-bold leading-[1.4] text-[#2479BC]">
        {title}
      </h1>
      {subtitle && (
        <p className="text-black text-[20px] font-normal leading-[1.4]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
