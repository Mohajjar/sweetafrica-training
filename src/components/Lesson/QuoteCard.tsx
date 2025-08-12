"use client";
export default function QuoteCard({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
      <p className="text-gray-700 italic leading-relaxed">
        <span className="text-2xl text-gray-400 mr-2">“</span>
        {children}
        <span className="text-2xl text-gray-400 ml-2">”</span>
      </p>
    </blockquote>
  );
}
