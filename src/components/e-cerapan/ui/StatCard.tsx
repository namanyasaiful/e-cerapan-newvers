import React from 'react';

interface StatCardProps {
    value: number;
    label: string;
    valueColor?: string;
}

export default function StatCard({ value, label, valueColor = 'text-[#2479BC]' }: StatCardProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-center">
            <span className={`text-[40px] font-bold leading-none mb-3 ${valueColor}`}>
                {value}
            </span>
            <span className="text-gray-600 text-[15px] font-medium">
                {label}
            </span>
        </div>
    );
}