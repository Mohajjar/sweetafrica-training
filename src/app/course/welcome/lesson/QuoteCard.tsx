"use client";
export default function QuoteCard({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="card shadow-soft p-5 border-l-4 border-l-[#57c8da]">
      <p className="text-[1.05rem] leading-relaxed italic text-[#1f2937]">
        {children}
      </p>
    </blockquote>
  );
}
