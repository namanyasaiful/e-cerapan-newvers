// src/components/e-cerapan/ui/StatusBanner.tsx
import React from 'react';
import { Check, X } from 'lucide-react'; // Changed to standard Check and X

interface StatusBannerProps {
    status: 'memenuhi' | 'tidak_memenuhi';
    title: string;
    subtitle: string;
}

export default function StatusBanner({ status, title, subtitle }: StatusBannerProps) {
    const isSuccess = status === 'memenuhi';

    return (
        <div className="w-full bg-white rounded-xl border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-center text-center">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 ${isSuccess ? 'bg-[#64CC4A]' : 'bg-red-500'}`}>
                {isSuccess ? (
                    <Check className="w-12 h-12 text-white" strokeWidth={3} />
                ) : (
                    <X className="w-12 h-12 text-white" strokeWidth={3} />
                )}
            </div>
            <h2 className={`text-2xl font-bold mb-2 uppercase ${isSuccess ? 'text-[#64CC4A]' : 'text-red-500'}`}>
                {title}
            </h2>
            <p className="text-gray-600 text-[15px]">
                {subtitle}
            </p>
        </div>
    );
}