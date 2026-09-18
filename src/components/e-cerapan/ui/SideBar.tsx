"use client";

import React from 'react';
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { SIDEBAR_MENU_ITEMS } from '../navigation/sideBarMenuItem';
import { LogOut } from 'lucide-react';

export default function SideBar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="sticky top-0 self-start h-screen w-73 overflow-y-auto bg-white border-r border-[#E7EEFF] flex flex-col shrink-0 shadow-[4px_0px_10px_0px_rgba(0,0,0,0.03)]">
      <div className="h-22.5 flex items-end justify-center">
        <div className="w-61 border-b border-[#E7EEFF]" />
      </div>

      <div className="flex flex-col gap-4 pt-4">
        <nav className="flex flex-col items-center gap-2">
          {SIDEBAR_MENU_ITEMS.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={`${item.href}-${index}`}
                href={item.href}
                className={`w-61 flex items-center gap-2.5 px-5 py-2.5 rounded-lg text-base  transition-colors ${
                  isActive
                    ? "bg-[#2479BC] text-white"
                    : "text-black hover:bg-slate-50"
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="w-61 mx-auto border-b border-[#E7EEFF] my-1" />

        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="w-61 flex items-center gap-2.5 px-5 py-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors text-left"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span>Keluar</span>
          </button>
        </div>
      </div>
    </aside>
  );
}