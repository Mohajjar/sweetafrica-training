"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function VerifyPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [authed, setAuthed] = useState(false);
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        setAuthed(false);
        setEmail(null);
        return;
      }
      setAuthed(true);
      setEmail(u.email ?? null);

      // If already verified, go to dashboard
      await u.reload();
      if (u.emailVerified) {
        router.replace("/dashboard");
      }
    });
    return () => unsub();
  }, [router]);

  const resend = async () => {
    setErr(null);
    setMsg(null);

    // ⛔ require login to send
    if (!auth.currentUser) {
      setErr("You must be signed in to resend the verification email.");
      return;
    }

    setSending(true);
    try {
      await sendEmailVerification(auth.currentUser);
      setMsg("Verification email sent. Please check your inbox (and spam).");
    } catch (e: any) {
      setErr(e?.message ?? "Failed to send verification email.");
    } finally {
      setSending(false);
    }
  };

  const refresh = async () => {
    setErr(null);
    setMsg(null);
    await auth.currentUser?.reload();
    if (auth.currentUser?.emailVerified) {
      router.replace("/dashboard");
    } else {
      setMsg(
        "Still not verified. Click the link in your email, then try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white border rounded-2xl p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Verify your email</h1>
        <p className="mt-2 text-gray-600">
          {authed ? (
            <>
              We sent a verification link to{" "}
              <span className="font-medium text-gray-900">
                {email ?? "your email"}
              </span>
              . Click the link, then return here.
            </>
          ) : (
            <>
              You must be signed in to resend the verification email.{" "}
              <Link href="/login" className="text-green-600 underline">
                Sign in
              </Link>
              .
            </>
          )}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={resend}
            disabled={!authed || sending}
            className={`rounded-lg px-4 py-2 text-sm font-semibold ${
              authed
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            {sending ? "Sending…" : "Resend email"}
          </button>

          <button
            onClick={refresh}
            className="rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-gray-50"
          >
            I verified, refresh
          </button>
        </div>

        {msg && <div className="mt-4 text-sm text-green-700">{msg}</div>}
        {err && <div className="mt-4 text-sm text-red-600">{err}</div>}
      </div>
    </div>
  );
}
