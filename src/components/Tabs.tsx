"use client";

import { useState } from "react";

type TabItem = {
  title: string;
  content: string;
};

export default function Tabs({ items }: { items: TabItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`py-2 px-4 rounded-lg text-sm font-semibold transition-colors ${
              activeIndex === index
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>
      <div
        key={activeIndex}
        className="p-4 border rounded-lg bg-gray-50 text-gray-800 animate-fade-in"
      >
        {items[activeIndex].content}
      </div>
    </div>
  );
}
