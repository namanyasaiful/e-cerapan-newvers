import React from "react";
import Image from "next/image";


export default function TopBar() {
  return (
    <div>
      <div className="flex gap-[7.36px] items-center">
        <Image 
            src="/logo.png" 
            alt="Logo Metrologi" 
            width={35} 
            height={35}
            className="shrink-0 object-contain "
            />
        <div>
          <h1 className="font-bold text-lg text-[#2479BC]">Direktorat Metrologi</h1>
          <h2 className="text-xs text-black">Kementerian Perdagangan Republik Indonesia</h2>
        </div>
      </div>
      
    </div>
  );
}
