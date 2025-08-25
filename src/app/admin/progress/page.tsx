import { Suspense } from "react";
import AdminGuard from "@/components/AdminGuard";
import Shell from "@/components/Shell";
import ProgressClient from "./ProgressClient";

export default function AdminProgressPage() {
  return (
    <AdminGuard>
      <Shell>
        <Suspense
          fallback={
            <div className="p-6 text-gray-600">Loading progress...</div>
          }
        >
          <ProgressClient />
        </Suspense>
      </Shell>
    </AdminGuard>
  );
}
