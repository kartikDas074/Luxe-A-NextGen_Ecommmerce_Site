"use client";

import React, { useState } from "react";
import { ChevronDown, Send, HelpCircle, Mail } from "lucide-react";

export default function InfoSections() {
 
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [email, setEmail] = useState("");

  const faqs = [
    {
      id: 1,
      question: "What is your return policy?",
      answer: "We offer a hassle-free 30-day return policy for all eligible pristine items. The products must be unused, in their original premium packaging with all security tags intact."
    },
    {
      id: 2,
      question: "How long does shipping take?",
      answer: "Domestic orders within Bangladesh take 2-3 business days. International expedited shipping usually takes 7-12 business days depending on your location, fully tracked from our hub."
    },
    {
      id: 3,
      question: "Are all products on Luxe authentic?",
      answer: "Absolutely. Luxe guarantees 100% authenticity. We directly source or meticulously verify every individual seller and item hosted on our platform to ensure absolute premium quality."
    },
    {
      id: 4,
      question: "Can I cancel or change my order?",
      answer: "Orders can be modified or cancelled within 2 hours of placement. After this window, the packaging process begins, and we are unable to intercept the shipment."
    }
  ];

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      alert(`Subscribed successfully with: ${email}`);
      setEmail("");
    }
  };

  return (
    <section className="w-full bg-white py-16 sm:py-24 border-b border-neutral-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        
       
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-start">
          
        
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-widest text-neutral-400 uppercase">
                <Mail className="w-3.5 h-3.5" />
                Stay Updated
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-950">
                Newsletter
              </h2>
              <p className="text-xs sm:text-sm font-medium text-neutral-400 leading-relaxed max-w-md">
                Get exclusive offers, early access to limited edition drops, and curated lifestyle inspiration directly to your inbox.
              </p>
            </div>

         
            <form onSubmit={handleSubscribe} className="w-full max-w-md space-y-3 pt-2">
              <div className="relative flex items-center">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your premium email..."
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3.5 pr-14 text-xs font-semibold text-neutral-900 placeholder-neutral-400 focus:border-neutral-950 focus:bg-white focus:outline-none transition-all duration-200 shadow-2xs"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-neutral-950 text-white hover:bg-neutral-800 transition active:scale-95 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[10px] font-medium text-neutral-400">
                By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
              </p>
            </form>
          </div>

         
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-widest text-neutral-400 uppercase">
                <HelpCircle className="w-3.5 h-3.5" />
                Questions & Answers
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-950">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3 pt-2">
              {faqs.map((faq) => {
                const isOpen = openFaq === faq.id;
                return (
                  <div 
                    key={faq.id}
                    className="rounded-xl border border-neutral-100 bg-neutral-50/50 overflow-hidden transition-all duration-300"
                  >
                  
                    <button
                      type="button"
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left font-bold text-neutral-950 text-sm hover:bg-neutral-50/80 transition-colors focus:outline-none cursor-pointer"
                    >
                      <span className="pr-4 tracking-tight">{faq.question}</span>
                      <ChevronDown 
                        className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-neutral-950" : ""
                        }`}
                      />
                    </button>

                  
                    <div 
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 pb-5 pt-1 text-xs sm:text-sm font-medium text-neutral-500 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}