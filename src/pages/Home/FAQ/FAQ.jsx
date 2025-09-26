import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaChevronRight } from "react-icons/fa";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How does this posture corrector work?",
      answer:
        "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. It helps reduce pain, improve mobility, and strengthen your body alignment.",
    },
    {
      question: "Is it suitable for all ages and body types?",
      answer:
        "Yes, posture correctors are designed to fit different body types and can be adjusted for children, adults, and seniors. However, consulting a doctor before use is recommended for medical conditions.",
    },
    {
      question: "Does it really help with back pain and posture improvement?",
      answer:
        "Absolutely! With consistent use, posture correctors can reduce strain, relieve back pain, and improve posture by gently guiding your body into proper alignment.",
    },
    {
      question: "Does it have smart features like vibration alerts?",
      answer:
        "Some advanced models include smart features like vibration alerts that notify you when you slouch, making posture correction even more effective.",
    },
    {
      question: "How will I be notified when the product is back in stock?",
      answer:
        "You can sign up for restock alerts via email or SMS on our website. We’ll notify you as soon as the product becomes available.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto py-12 px-6">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Frequently Asked Question (FAQ)
        </h2>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`border rounded-xl overflow-hidden shadow-sm transition-all duration-300 ${
              openIndex === index ? "bg-green-50 border-green-400" : "bg-white"
            }`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center text-left p-5 font-medium text-gray-800 hover:bg-gray-50"
            >
              <span>{faq.question}</span>
              {openIndex === index ? (
                <FaChevronUp className="text-green-500" />
              ) : (
                <FaChevronDown className="text-gray-500" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-5 pb-5 text-gray-600 border-t">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CTA button */}
      <div className="text-center mt-10">
        <button className="px-6 py-3 bg-lime-500 hover:bg-lime-600 text-white font-semibold rounded-full flex items-center gap-2 mx-auto transition-all shadow-md">
          See More FAQ’s
          <span className="bg-black text-white p-1 rounded-full">
            <FaChevronRight />
          </span>
        </button>
      </div>
    </section>
  );
};

export default FAQ;
