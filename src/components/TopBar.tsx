"use client";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa"; // Using this icon for a more modern look

export default function TopBar() {
  const [email, setEmail] = useState<string | null>(null);
  useEffect(() => setEmail(auth.currentUser?.email ?? null), []);
  return (
    <header className="sticky top-0 z-20 bg-white shadow-sm border-b">
      <div className="mx-auto max-w-7xl h-16 px-4 md:px-8 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight text-gray-900">
          Dashboard
        </h1>
        <div className="flex items-center gap-4 text-sm">
          <div className="hidden sm:flex items-center gap-2 text-gray-600">
            <FaUserCircle size={20} />
            <span className="font-medium">{email}</span>
          </div>
          <button
            onClick={() => signOut(auth)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
