"use client";
import { useSearchParams } from "next/navigation";

export default function AdminUserTestPage() {
  const sp = useSearchParams();
  const uid = sp.get("uid") || "(missing)";
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 22, fontWeight: 700 }}>Admin User (test)</h1>
      <p>
        UID from query: <code>{uid}</code>
      </p>
    </div>
  );
}
