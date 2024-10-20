export default function FAQSection() {
    const faqs = [
      { question: "What is Lighting?", answer: "Lighting is..." },
      { question: "Who is Lighting for?", answer: "Lighting is for..." },
      { question: "Can I import my projects from another tool?", answer: "Yes, you can..." },
      { question: "What are projects and issues in Lighting?", answer: "Projects and issues in Lighting are..." },
      { question: "Can I integrate Lighting with other tools?", answer: "Yes, Lighting integrates with..." },
      { question: "Is my data secure in Lighting?", answer: "Yes, your data is secure..." },
      { question: "How do I upgrade my plan?", answer: "To upgrade your plan..." },
    ];
  
    return (
      <div className="min-h-screen flex items-center justify-center  text-white p-6">
        <div className="w-full max-w-3xl">
          <h1 className="text-4xl font-bold text-center mb-6">FAQ</h1>
          <p className="text-xl text-center text-gray-400 mb-8">Everything You Need to Know About Lighting.</p>
  
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="mb-4 group bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"
            >
              <summary className="flex justify-between items-center cursor-pointer bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors duration-300">
                <span className="text-lg font-medium">{faq.question}</span>
                <span className="transition-transform transform group-open:rotate-45 text-2xl text-gray-400">+</span>
              </summary>
              <p className="mt-2 p-4 bg-gray-900 rounded-lg text-gray-300">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    );
  }
  