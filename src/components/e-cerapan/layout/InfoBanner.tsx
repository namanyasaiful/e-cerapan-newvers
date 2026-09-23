import React from 'react';
import { AlertCircle } from 'lucide-react';

interface InfoBannerProps {
  title: string;
  description: string;
}

export default function InfoBanner({ title, description }: InfoBannerProps) {
  return (
    <div className="bg-[#2479BC] rounded-xl py-6 px-8 flex items-center gap-6 w-full">
      <div className="bg-white rounded-2xl shrink-0 flex items-center justify-center w-[54px] h-[54px]">
        <AlertCircle className="w-[28px] h-[28px] text-[#2479BC]" strokeWidth={1.5} />
      </div>
      <div className="flex flex-col justify-center">
        <h3 className="font-normal text-[20px] text-white mb-1 leading-[1.4]">{title}</h3>
        <p className="text-neutral-50 text-[16px] font-normal leading-[1.4]">
          {description}
        </p>
      </div>
    </div>
  );
}
