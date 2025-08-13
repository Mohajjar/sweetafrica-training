"use client";

import { useMemo, useState } from "react";
import type { QuizQuestion } from "@/lib/quiz";

type Props = {
  title?: string;
  questions: QuizQuestion[];
  /** Passing threshold as a percentage (0–100). Default 80. */
  passingPercent?: number;
  /** Called when user passes the quiz. Receives score percent and correct count. */
  onPass?: (result: {
    percent: number;
    correct: number;
    total: number;
  }) => void;
  /** Called when user fails the quiz. Receives score percent and correct count. */
  onFail?: (result: {
    percent: number;
    correct: number;
    total: number;
  }) => void;
};

export default function Quiz({
  title = "Module Quiz",
  questions,
  passingPercent = 80,
  onPass,
  onFail,
}: Props) {
  const total = questions.length;
  const [answers, setAnswers] = useState<number[]>(
    Array.from({ length: total }, () => -1)
  );
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = useMemo(() => answers.every((a) => a >= 0), [answers]);

  const { correctCount, percent } = useMemo(() => {
    if (!submitted) return { correctCount: 0, percent: 0 };
    const correct = questions.reduce((acc, q, i) => {
      return acc + (answers[i] === q.answerIndex ? 1 : 0);
    }, 0);
    const pct = Math.round((correct / total) * 100);
    return { correctCount: correct, percent: pct };
  }, [submitted, answers, questions, total]);

  const passed = submitted && percent >= passingPercent;

  const select = (qIdx: number, optIdx: number) => {
    if (submitted) return; // lock answers after submit
    setAnswers((prev) => {
      const next = [...prev];
      next[qIdx] = optIdx;
      return next;
    });
  };

  const submit = () => {
    if (!allAnswered) return;
    setSubmitted(true);
    const correct = questions.reduce(
      (acc, q, i) => acc + (answers[i] === q.answerIndex ? 1 : 0),
      0
    );
    const pct = Math.round((correct / total) * 100);
    const payload = { percent: pct, correct, total };
    if (pct >= passingPercent) onPass?.(payload);
    else onFail?.(payload);
  };

  const reset = () => {
    setAnswers(Array.from({ length: total }, () => -1));
    setSubmitted(false);
  };

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6 md:p-8">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-600">
            Answer all questions. Passing score: {passingPercent}%.
          </p>
        </div>

        {submitted && (
          <div
            className={`rounded-xl px-3 py-1 text-sm font-semibold ${
              passed
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {percent}% ({correctCount}/{total}){" "}
            {passed ? "Passed" : "Try again"}
          </div>
        )}
      </div>

      <ol className="space-y-6">
        {questions.map((q, qIdx) => {
          const userPick = answers[qIdx];
          const isCorrect = submitted && userPick === q.answerIndex;
          const isIncorrect = submitted && userPick !== q.answerIndex;

          return (
            <li key={q.id} className="rounded-xl border p-4">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-medium text-gray-900">
                  {qIdx + 1}. {q.prompt}
                </h3>
                {submitted && (
                  <span
                    className={`text-xs font-semibold rounded-full px-2 py-0.5 ${
                      isCorrect
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {isCorrect ? "Correct" : "Incorrect"}
                  </span>
                )}
              </div>

              <div className="mt-3 grid gap-2">
                {q.options.map((opt, optIdx) => {
                  const picked = userPick === optIdx;
                  const correctOpt = submitted && q.answerIndex === optIdx;

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => select(qIdx, optIdx)}
                      className={[
                        "text-left rounded-lg border px-3 py-2 transition",
                        picked
                          ? "border-green-500 bg-green-50"
                          : "hover:bg-gray-50",
                        submitted
                          ? correctOpt
                            ? "border-green-500 bg-green-50"
                            : picked
                            ? "border-red-300 bg-red-50"
                            : ""
                          : "",
                      ].join(" ")}
                      disabled={submitted}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={[
                            "inline-flex h-4 w-4 items-center justify-center rounded-full border",
                            picked ? "border-green-600" : "border-gray-300",
                            submitted && correctOpt ? "bg-green-600" : "",
                          ].join(" ")}
                        />
                        <span className="text-sm text-gray-800">{opt}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-8 flex items-center justify-between">
        {!submitted ? (
          <button
            onClick={submit}
            disabled={!allAnswered}
            className={`inline-flex items-center rounded-lg px-5 py-2.5 text-sm font-semibold shadow-md transition
              ${
                allAnswered
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
          >
            Submit answers
          </button>
        ) : (
          <div className="flex items-center gap-3">
            {!passed && (
              <button
                onClick={reset}
                className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                Retake quiz
              </button>
            )}
          </div>
        )}

        <div className="text-xs text-gray-500">
          {submitted
            ? `Score: ${percent}% (${correctCount}/${total})`
            : `${total} questions`}
        </div>
      </div>
    </div>
  );
}
