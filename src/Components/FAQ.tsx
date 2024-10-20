import { useRef, useEffect } from 'react';

export default function FAQSection() {
  const faqs = [
    { question: "What is Sentio?", answer: "Sentio is a Latin verb that means to perceive, feel, hear, or see" },
    { question: "Why Sentio?", answer:"Sentio as a platform it provides a complete pipeline from wrtiting code to deploying it and monitoring it" },
    { question: "Can I import my projects from another tool?", answer: "Yes, you can..." },
    { question: "What are projects and issues in Lighting?", answer: "Projects and issues in Lighting are..." },
    { question: "Can I integrate Lighting with other tools?", answer: "Yes, Lighting integrates with..." },
    { question: "Is my data secure in Lighting?", answer: "Yes, your data is secure..." },
    { question: "How do I upgrade my plan?", answer: "To upgrade your plan..." },
  ];

  const detailsRefs = useRef<(HTMLDetailsElement | null)[]>([]);

  useEffect(() => {
    detailsRefs.current.forEach((detailsEl) => {
      if (detailsEl) { // Check if detailsEl is not null
        detailsEl.addEventListener('toggle', (event) => {
          if (detailsEl.open) {
            event.preventDefault();
          }
        });
      }
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center text-white p-6">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-bold text-center mb-6">FAQ</h1>
        <p className="text-xl text-center text-gray-400 mb-8">Everything You Need to Know About Sentio.</p>

        {faqs.map((faq, index) => (
          <details
            key={index}
            ref={(el) => (detailsRefs.current[index] = el)}
            className="mb-4 group  rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"
          >
            <summary className="flex justify-between items-center cursor-pointer  p-4 rounded-lg bg-[#9966FF] transition-colors duration-300">
              <span className="text-lg font-medium">{faq.question}</span>
              <span className="transition-transform transform group-open:rotate-45 text-6xl ">+</span>
            </summary>
            <p className="mt-2 p-4 bg- rounded-lg text-gray-300">{faq.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
