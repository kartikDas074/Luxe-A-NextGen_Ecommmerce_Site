"use client";

import React from "react";
import { Star, Quote } from "lucide-react";

export default function CustomerReviews() {
  const reviews = [
    {
      id: 1,
      name: "Sarah Jenkins",
      role: "Verified Buyer",
      rating: 5,
      comment: "The craftsmanship on these products is absolutely unmatched. Every single detail feels intentional and premium. Delivery was incredibly swift too!",
      date: "2 days ago"
    },
    {
      id: 2,
      name: "Marcus Vance",
      role: "Verified Buyer",
      rating: 5,
      comment: "I was skeptical about purchasing luxury items online, but Luxe exceeded all my expectations. The customer service concierge team is top-tier.",
      date: "1 week ago"
    },
    {
      id: 3,
      name: "Elena Rostova",
      role: "Verified Buyer",
      rating: 5,
      comment: "Minimalist, sleek, and elegant. The packaging itself felt like an experience. Highly recommend to anyone who appreciates true quality.",
      date: "2 weeks ago"
    }
  ];

  return (
    <section className="w-full bg-white py-16 sm:py-24 border-b border-neutral-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        
      
        <div className="text-center mb-16 max-w-xl mx-auto space-y-3">
          <span className="inline-block text-[10px] font-black tracking-widest text-neutral-400 uppercase">
            What They Say
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-950">
            Customer Reviews
          </h2>
          <div className="h-1 w-12 bg-neutral-950 mx-auto rounded" />
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((review) => (
            <div 
              key={review.id}
              className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-neutral-50/60 border border-neutral-100/50 shadow-2xs transition-all duration-300 hover:shadow-xs hover:bg-neutral-50"
            >
             
              <div className="absolute top-6 right-6 text-neutral-200/60 group-hover:text-neutral-300/80 transition-colors">
                <Quote className="w-8 h-8 transform rotate-180" strokeWidth={1.5} />
              </div>

              <div>
             
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-4 h-4 fill-amber-500 text-amber-500" 
                    />
                  ))}
                </div>

              
                <p className="text-sm font-medium text-neutral-600 leading-relaxed pr-4 mb-6">
                  "{review.comment}"
                </p>
              </div>

          
              <div className="flex items-center justify-between pt-4 border-t border-neutral-200/40">
                <div>
                  <h4 className="text-sm font-bold text-neutral-950 tracking-tight">
                    {review.name}
                  </h4>
                  <p className="text-[11px] font-semibold text-emerald-600 tracking-wide uppercase mt-0.5">
                    {review.role}
                  </p>
                </div>
                <span className="text-[11px] font-medium text-neutral-400">
                  {review.date}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}