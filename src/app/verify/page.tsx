// src/app/verify/page.tsx
"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import {
  onAuthStateChanged,
  reload,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import Link from "next/link";

export default function VerifyPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [checking, setChecking] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setEmail(u?.email ?? null);
    });
    return () => unsub();
  }, []);

  const resend = async () => {
    if (!auth.currentUser) return;
    setMsg(null);
    setSending(true);
    try {
      const site = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
      await sendEmailVerification(auth.currentUser, { url: `${site}/verify` });
      setMsg("Verification email sent. Please check your inbox.");
    } catch (e: any) {
      setMsg(e?.message ?? "Failed to send verification email.");
    } finally {
      setSending(false);
    }
  };

  const iveVerified = async () => {
    if (!auth.currentUser) return;
    setMsg(null);
    setChecking(true);
    try {
      await reload(auth.currentUser);
      if (auth.currentUser.emailVerified) {
        // Reflect in Firestore (optional but useful for admin)
        await setDoc(
          doc(db, "users", auth.currentUser.uid),
          { emailVerified: true, updatedAt: serverTimestamp() },
          { merge: true }
        );
        window.location.href = "/dashboard";
      } else {
        setMsg(
          "Still not verified. Please click the link in your email, then try again."
        );
      }
    } catch (e: any) {
      setMsg(e?.message ?? "Could not check verification status.");
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white border rounded-2xl shadow p-8">
        <h1 className="text-2xl font-bold text-gray-900">Verify your email</h1>
        <p className="mt-2 text-gray-600">
          We sent a verification link to{" "}
          <span className="font-medium text-gray-900">
            {email ?? "your email"}
          </span>
          . Please click the link, then return here.
        </p>

        {msg && <div className="mt-4 text-sm text-gray-700">{msg}</div>}

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={resend}
            disabled={sending}
            className="inline-flex justify-center rounded-lg bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 text-sm font-semibold disabled:opacity-60"
          >
            {sending ? "Sending…" : "Resend verification email"}
          </button>
          <button
            onClick={iveVerified}
            disabled={checking}
            className="inline-flex justify-center rounded-lg border px-5 py-2.5 text-sm font-semibold hover:bg-gray-50 disabled:opacity-60"
          >
            {checking ? "Checking…" : "I’ve verified — continue"}
          </button>
        </div>

        <div className="mt-6 text-sm text-gray-600">
          Wrong address?{" "}
          <Link href="/login" className="text-green-600 underline">
            Sign out and try again
          </Link>
          .
        </div>
      </div>
    </div>
  );
}
