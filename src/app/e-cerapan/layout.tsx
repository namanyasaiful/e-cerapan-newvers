import TopBar from "@/components/e-cerapan/ui/TopBar";
import SideBar from "@/components/e-cerapan/ui/SideBar";

export default function ECerapanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-[#F8FAFC] ">
      <SideBar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 border-[#E7EEFF] bg-white px-8 py-4 shadow-sm">
          <TopBar />
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}