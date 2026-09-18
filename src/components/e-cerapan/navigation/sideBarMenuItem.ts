import { LayoutPanelLeft, Fuel, LucideIcon } from "lucide-react";

export interface SideBarMenuItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const SIDEBAR_MENU_ITEMS: SideBarMenuItem[] = [
  {
    label: "Beranda",
    href: "/e-cerapan",
    icon: LayoutPanelLeft,
  },
  {
    label: "Pompa Ukur BBM",
    href: "/e-cerapan/pengujian",
    icon: Fuel,
  }
];
