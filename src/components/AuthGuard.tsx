// src/components/AuthGuard.tsx (snippet)
"use client";

import { ReactNode, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { usePathname, useRouter } from "next/navigation";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) {
        router.replace("/login");
        return;
      }
      // Allow /verify itself, otherwise require verified
      if (!u.emailVerified && pathname !== "/verify") {
        router.replace("/verify");
        return;
      }
      setReady(true);
    });
    return () => unsub();
  }, [router, pathname]);

  if (!ready) return null;
  return <>{children}</>;
}
