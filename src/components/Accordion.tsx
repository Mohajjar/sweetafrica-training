"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

type AccordionItem = {
  title: string;
  content: string;
};

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="border rounded-lg overflow-hidden">
          <button
            onClick={() => handleToggle(index)}
            className="w-full text-left p-4 font-semibold text-gray-800 flex justify-between items-center"
          >
            <span>{item.title}</span>
            <FaChevronDown
              className={`transition-transform duration-300 ${
                openIndex === index ? "transform rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`transition-all duration-500 ease-in-out ${
              openIndex === index
                ? "max-h-screen opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="p-4 border-t text-gray-800">{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
