import { useRef, useEffect, forwardRef } from 'react';

const FAQSection = forwardRef<HTMLDivElement>((_, ref) => {
  const faqs = [
    { question: "What is Sentio?", answer: "Sentio is a Latin verb that means to perceive, feel, hear, or see" },
    { question: "Why Sentio?", answer: "Sentio as a platform provides a complete pipeline from writing code to deploying it and monitoring it" },
    { question: "How sentinals work's?", answer: "Yes, you can..." },
    { question: "How to spawn a process?", answer: "Projects and issues in Lighting are..." },

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
    <div ref={ref} className="min-h-screen flex items-center justify-center text-white p-6">
      <div className="w-full max-w-5xl">
        <h1 className="text-4xl font-bold text-center mb-6">FAQ</h1>
        <p className="text-xl text-center text-gray-400 mb-8">Everything You Need to Know About Sentio.</p>

        {/* Grid Layout for FAQ in 2x2 format */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <details
              key={index}
              ref={(el) => (detailsRefs.current[index] = el)}
              className="group rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"
            >
              <summary className="flex justify-between items-center cursor-pointer p-4 rounded-lg bg-[#9966FF] transition-colors duration-300">
                <span className="text-lg font-medium">{faq.question}</span>
                <span className="transition-transform transform group-open:rotate-45 text-6xl">+</span>
              </summary>
              <p className="mt-2 p-4 bg-[#1a1a1a] rounded-lg text-gray-300">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
});

export default FAQSection;
