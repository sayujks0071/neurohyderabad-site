'use client';

import { useState } from "react";
import { FAQ_DATA, ChevronDownIcon } from "./constants";

interface FaqItemProps {
  question: string;
  answer: string;
}

function FaqItem({ question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 py-4">
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="w-full flex justify-between items-center text-left"
      >
        <h3 className="text-lg font-medium text-slate-800">{question}</h3>
        <ChevronDownIcon
          className={`w-6 h-6 text-slate-500 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="mt-3 text-slate-600 text-base leading-relaxed">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function Faq() {
  return (
    <section className="max-w-4xl mx-auto py-12 md:py-20 px-4">
      <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">
        Frequently Asked Questions
      </h2>
      <div className="space-y-2">
        {FAQ_DATA.map((item) => (
          <FaqItem
            key={item.question}
            question={item.question}
            answer={item.answer}
          />
        ))}
      </div>
    </section>
  );
}
