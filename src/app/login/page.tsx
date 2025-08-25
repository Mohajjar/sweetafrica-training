"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { auth, db } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

// Upsert the user doc and include extra profile fields
async function upsertUserDoc(
  u: {
    uid: string;
    email: string | null;
    displayName: string | null;
    emailVerified?: boolean;
  },
  extra?: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    displayName?: string;
  }
) {
  await setDoc(
    doc(db, "users", u.uid),
    {
      email: u.email ?? null,
      displayName: u.displayName ?? null,
      emailVerified: u.emailVerified ?? false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      ...(extra || {}),
    },
    { merge: true }
  );
}

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  // Shared
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  // Sign-up extra fields
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [phone, setPhone] = useState("");
  const [confirm, setConfirm] = useState("");

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      if (mode === "signup") {
        if (pass !== confirm) throw new Error("Passwords do not match.");
        if (!first.trim() || !last.trim())
          throw new Error("Please enter your first and last name.");

        // Create account
        const cred = await createUserWithEmailAndPassword(
          auth,
          email.trim(),
          pass
        );

        const displayName = `${first.trim()} ${last.trim()}`.trim();

        // Set the Firebase Auth displayName (non-blocking)
        try {
          await updateProfile(cred.user, { displayName });
        } catch {
          /* ignore */
        }

        // Write user document with extra fields
        await upsertUserDoc(
          {
            uid: cred.user.uid,
            email: cred.user.email,
            displayName,
            emailVerified: cred.user.emailVerified,
          },
          {
            firstName: first.trim(),
            lastName: last.trim(),
            phone: phone.trim(),
            displayName,
          }
        );

        // Send verification email
        await sendEmailVerification(cred.user);

        // Then redirect to the verify screen
        window.location.href = "/verify";
        return;
      } else {
        // Login
        await signInWithEmailAndPassword(auth, email.trim(), pass);
        window.location.href = "/dashboard";
        return;
      }
    } catch (e: any) {
      setErr(e?.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg border border-gray-200 p-8 space-y-6">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/logo.png"
            alt="Sweet Africa Global Logo"
            width={112}
            height={112}
            className="mb-4"
          />
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {mode === "login" ? "Sign in to your account" : "Create an account"}
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            {mode === "login"
              ? "Welcome back! Please enter your details."
              : "Join our team today."}
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {mode === "signup" && (
            <>
              <input
                type="text"
                placeholder="First name"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors placeholder-gray-500 text-gray-900"
                value={first}
                onChange={(e) => setFirst(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Last name"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors placeholder-gray-500 text-gray-900"
                value={last}
                onChange={(e) => setLast(e.target.value)}
                required
              />
              <input
                type="tel"
                placeholder="Phone number"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors placeholder-gray-500 text-gray-900"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                // Keep optional or add pattern if you want strict validation
              />
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors placeholder-gray-500 text-gray-900"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors placeholder-gray-500 text-gray-900"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />

          {mode === "signup" && (
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors placeholder-gray-500 text-gray-900"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          )}

          {err && <div className="text-red-600 text-sm">{err}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg px-4 py-3 bg-green-500 text-white font-semibold text-sm shadow-md hover:bg-green-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {loading
              ? "Please wait…"
              : mode === "login"
              ? "Sign in"
              : "Create account"}
          </button>
        </form>

        <div className="mt-4 text-sm text-center text-gray-600">
          {mode === "login" ? (
            <span>
              Don&apos;t have an account?{" "}
              <button
                onClick={() => setMode("signup")}
                className="text-green-600 hover:underline font-medium"
              >
                Sign up
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-green-600 hover:underline font-medium"
              >
                Sign in
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
