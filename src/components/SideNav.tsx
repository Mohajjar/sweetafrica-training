"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const items = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/course/welcome", label: "Welcome to Sweet Africa" },
  { href: "/course/fundamentals", label: "Fundamentals of Cleaning" },
  { href: "/course/professionalism", label: "Professional Cleaning" },
];

export default function SideNav() {
  const path = usePathname();
  return (
    <aside className="hidden md:flex flex-col w-64 min-h-screen border-r bg-white">
      <div className="p-6 border-b flex-shrink-0">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Logo"
            width={200}
            height={64}
            className="h-auto"
          />
        </Link>
      </div>
      <nav className="p-4 flex-1">
        {items.map(({ href, label }) => {
          const active = path.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`block rounded-lg px-4 py-2 mb-2 transition-colors
                ${
                  active
                    ? "bg-green-100 text-green-700 font-semibold"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
            >
              <span className="text-sm">{label}</span>
            </Link>
          );
        })}
      </nav>
      {/* Optional footer for the nav */}
      <div className="p-6 border-t text-sm text-gray-400">
        &copy; 2025 Sweet Africa Global
      </div>
    </aside>
  );
}
