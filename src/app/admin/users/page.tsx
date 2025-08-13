// src/app/admin/users/page.tsx
import { Suspense } from "react";
import AdminGuard from "@/components/AdminGuard";
import Shell from "@/components/Shell";
import UsersClient from "./UsersClient";

export const dynamic = "force-static";

export default function AdminUsersPage() {
  return (
    <AdminGuard>
      <Shell>
        <Suspense
          fallback={<div className="p-6 text-gray-600">Loading users…</div>}
        >
          <UsersClient />
        </Suspense>
      </Shell>
    </AdminGuard>
  );
}
