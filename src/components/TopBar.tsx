"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import useIsAdmin from "@/hooks/useIsAdmin";

export default function TopBar() {
  const [user, setUser] = useState<User | null>(null);
  const { isAdmin } = useIsAdmin();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  return (
    <header className="sticky top-0 z-10 bg-white border-b">
      <div className="max-w-screen-2xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Left: page label (keep minimal to match your design) */}
        <div className="font-semibold text-gray-800">Dashboard</div>

        {/* Right: actions */}
        <div className="flex items-center gap-3">
          {isAdmin && (
            <Link
              href="/admin"
              className="inline-flex items-center rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-900 px-4 py-2 text-sm font-semibold shadow-sm"
            >
              Admin Console →
            </Link>
          )}

          {user && (
            <span className="hidden sm:inline text-sm text-gray-700">
              {user.displayName || user.email}
            </span>
          )}

          <button
            onClick={() => signOut(auth)}
            className="inline-flex items-center rounded-lg bg-gray-900 hover:bg-black text-white px-4 py-2 text-sm font-semibold shadow-sm"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
