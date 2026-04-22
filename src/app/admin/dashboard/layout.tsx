"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  };

  const navItems = [
    { label: "Manage Services", href: "/admin/dashboard/services" },
    { label: "Manage Theme", href: "/admin/dashboard/theme" },
  ];

  return (
    <div className="min-h-screen bg-[#f0f7ff] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a2332] text-white flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <Link href="/" className="flex items-center gap-2 text-white">
            <span className="text-[#2a9d8f] text-2xl">✦</span>
            <div>
              <div className="font-bold tracking-widest text-sm uppercase" style={{ fontFamily: "var(--font-heading)" }}>Admin</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider">Portal</div>
            </div>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-3 rounded text-sm font-medium tracking-wide transition-colors ${
                pathname.startsWith(item.href)
                  ? "bg-[#2a9d8f] text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-gray-800 hover:text-red-300 rounded transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-[#1a2332] uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
            {navItems.find(item => pathname.startsWith(item.href))?.label || "Dashboard"}
          </h2>
        </header>
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
