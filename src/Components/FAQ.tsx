import { forwardRef } from 'react';

const FAQSection = forwardRef<HTMLDivElement>((_, ref) => {
  const faqs = [
    { question: "What is Permissionless Ecosystem Funding?", answer: "Permissionless: Anyone can without project or legal barriers\nEcosystem: Normal users take part who actually believe in you\nFunding: as it sounds!\nBy incentivizing users to bridge their assets into the AO network, developers are rewarded with AO token yields, creating a long-term revenue stream for their projects. This mechanism removes the need for developers to seek approval from centralized parties. Now they can innovate freely and create impactful applications that thrive on the economic participation of their users!\nUsers, in turn, have the power to decide which applications to support by choosing where to allocate their liquidity.\nThis results in a decentralized funding model that naturally aligns incentives between developers and users, making the AO network a vibrant and dynamic ecosystem for innovation." },
    { question: "What are $tAoETH and $SAT? What's their value?", answer: "tAoETH and SAT are tokens in the ecosystem with values that vary based on demand and supply in the market." },
    { question: "When can I start staking on my favorite projects?", answer: "Staking opportunities will be announced soon. Stay tuned for updates on our platform." }
  ];

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center text-white ">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-6">FAQ</h1>
        <p className="text-xl text-center text-gray-400 mb-8">Everything You Need to Know About Sentio.</p>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group rounded-lg border border-[#6C3AE1] p-4 bg-[#1a1a1a] overflow-hidden"
            >
              <summary className="flex justify-between items-center cursor-pointer font-medium text-lg text-white">
                <span>{faq.question}</span>
                <span className="text-2xl text-[#6C3AE1]">&#x25BC;</span>
              </summary>
              <p className="mt-4 text-gray-300 whitespace-pre-line">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
});

export default FAQSection;
