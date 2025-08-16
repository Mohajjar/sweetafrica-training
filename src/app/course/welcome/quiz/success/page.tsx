"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import Shell from "@/components/Shell";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { jsPDF } from "jspdf";

// Load confetti only on the client
const Confetti = dynamic(() => import("react-confetti"), { ssr: false });

export default function QuizSuccessPage() {
  const router = useRouter();

  const [ready, setReady] = useState(false);
  const [name, setName] = useState<string>("Student");
  const [passed, setPassed] = useState(false);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  // Track viewport for confetti
  useEffect(() => {
    const handle = () =>
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    handle();
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  // Verify user + ensure they actually passed the quiz
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        router.replace("/login");
        return;
      }
      setName(u.displayName || u.email || "Student");

      // Check quiz doc
      const qref = doc(db, "users", u.uid, "quizzes", "welcome");
      const snap = await getDoc(qref);
      const ok = Boolean(snap.data()?.passed);
      setPassed(ok);
      setReady(true);

      // If not passed, bounce back to quiz
      if (!ok) {
        router.replace("/course/welcome/quiz");
      }
    });
    return () => unsub();
  }, [router]);

  const downloadCertificate = () => {
    const docPdf = new jsPDF({ unit: "pt", format: "letter" });
    // background
    docPdf.setFillColor(245, 247, 250);
    docPdf.rect(0, 0, 612, 792, "F");
    // border
    docPdf.setDrawColor(34, 197, 94);
    docPdf.setLineWidth(4);
    docPdf.rect(36, 36, 540, 720);

    // heading
    docPdf.setFont("helvetica", "bold");
    docPdf.setFontSize(28);
    docPdf.text("Certificate of Completion", 306, 160, { align: "center" });

    // name
    docPdf.setFont("helvetica", "normal");
    docPdf.setFontSize(16);
    docPdf.text("is hereby awarded to", 306, 200, { align: "center" });
    docPdf.setFont("helvetica", "bold");
    docPdf.setFontSize(24);
    docPdf.text(name, 306, 238, { align: "center" });

    // course
    docPdf.setFont("helvetica", "normal");
    docPdf.setFontSize(14);
    docPdf.text("for successful completion of", 306, 272, { align: "center" });
    docPdf.setFont("helvetica", "bold");
    docPdf.text("Welcome to Sweet Africa Global Training", 306, 298, {
      align: "center",
    });

    // footer
    const dateStr = new Date().toLocaleDateString();
    docPdf.setFont("helvetica", "normal");
    docPdf.setFontSize(12);
    docPdf.text(`Date: ${dateStr}`, 70, 690);
    docPdf.text("Sweet Africa Global LLC", 542, 690, { align: "right" });

    docPdf.save("SweetAfrica-Certificate.pdf");
  };

  return (
    <AuthGuard>
      <Shell>
        <div className="bg-gray-50 min-h-screen">
          {!!passed && viewport.width > 0 && viewport.height > 0 && (
            <Confetti
              width={viewport.width}
              height={viewport.height}
              numberOfPieces={250}
            />
          )}

          <div className="container mx-auto px-4 py-16 md:px-8">
            {!ready ? (
              <div className="mx-auto max-w-xl text-center bg-white border rounded-xl shadow p-10">
                <p className="text-gray-600">Checking your result…</p>
              </div>
            ) : passed ? (
              <div className="mx-auto max-w-2xl bg-white border rounded-2xl shadow-md p-8 md:p-12 text-center">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                  🎉 Congrats, {name.split("@")[0]}!
                </h1>
                <p className="mt-3 text-gray-600 text-lg">
                  You passed the <span className="font-semibold">Welcome</span>{" "}
                  quiz.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={downloadCertificate}
                    className="inline-flex items-center rounded-lg bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-sm font-semibold shadow"
                  >
                    Download Certificate
                  </button>
                  <Link
                    href="/course/welcome"
                    className="inline-flex items-center rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 px-6 py-3 text-sm font-semibold shadow"
                  >
                    Back to Module
                  </Link>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 px-6 py-3 text-sm font-semibold shadow"
                  >
                    Go to Dashboard
                  </Link>
                </div>
              </div>
            ) : (
              // If they didn't pass, we redirect; this is a tiny fallback
              (<div className="mx-auto max-w-xl text-center bg-white border rounded-xl shadow p-10">
                <p className="text-gray-600">Redirecting…</p>
              </div>)
            )}
          </div>
        </div>
      </Shell>
    </AuthGuard>
  );
}
