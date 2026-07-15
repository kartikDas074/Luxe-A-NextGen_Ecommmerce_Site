"use client";

import React from "react";
import { 
  Truck, 
  ShieldCheck, 
  BadgeCheck, 
  RotateCcw, 
  Headphones 
} from "lucide-react";

export default function WhyShopLuxe() {
  const valueProps = [
    {
      icon: Truck,
      title: "Free Shipping",
      desc: "On all orders. Packaged with extreme care and tracking.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Stripe Payment",
      desc: "Fully encrypted transaction gateways keeping you safe.",
    },
    {
      icon: BadgeCheck,
      title: "Verified Sellers",
      desc: "Shop with absolute peace of mind from trusted merchants.",
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      desc: "Hassle-free 30-day return policy for eligible products.",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      desc: "Our dedicated support desks are always ready to assist.",
    },
  ];

  return (
    <section className="w-full bg-white py-16 sm:py-24 border-b border-neutral-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        
        
        <div className="text-center mb-16 max-w-xl mx-auto space-y-3">
          <span className="inline-block text-[10px] font-black tracking-widest text-neutral-400 uppercase">
            The Luxe Promise
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-950">
            Why Shop With Luxe
          </h2>
          <div className="h-1 w-12 bg-neutral-950 mx-auto rounded" />
        </div>

       
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
          {valueProps.map((prop, index) => {
            const Icon = prop.icon;
            return (
              <div 
                key={index}
                className="group flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-neutral-100 shadow-2xs hover:shadow-xs transition-all duration-300 hover:-translate-y-1"
              >
              
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-50 border border-neutral-100/80 text-neutral-950 mb-5 group-hover:scale-110 group-hover:bg-neutral-950 group-hover:text-white transition-all duration-300">
                  <Icon className="w-6 h-6" strokeWidth={1.8} />
                </div>

                
                <h3 className="text-sm font-bold text-neutral-950 tracking-tight mb-2">
                  {prop.title}
                </h3>
                <p className="text-xs font-medium text-neutral-400 leading-relaxed">
                  {prop.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}