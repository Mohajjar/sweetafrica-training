"use client";

export default function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="w-full">
      <div className="flex justify-between mb-2 text-sm font-medium text-gray-700">
        <span>Module Progress</span>
        <span>{percent}%</span>
      </div>
      <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden shadow-sm">
        <div
          className="h-full rounded-full bg-green-500 transition-[width] duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
