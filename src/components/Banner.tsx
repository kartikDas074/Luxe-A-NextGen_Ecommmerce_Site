"use client";

import React from "react";
import Link from "next/link";
import { Truck, ShieldCheck, RotateCcw, Headphones } from "lucide-react";

export default function Hero() {
  const features = [
    {
      icon: Truck,
      title: "Fast Delivery",
      desc: "Global expedited shipping",
    },
    {
      icon: ShieldCheck,
      title: "Secure Payment",
      desc: "100% encrypted transactions",
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      desc: "30-day hassle-free policy",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      desc: "Dedicated concierge team",
    },
  ];

  return (
    <section className="w-full bg-white">
     
      <div className="mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-8 md:pt-20 md:pb-24 flex flex-col md:flex-row items-center justify-between gap-12">
        
       
        <div className="flex-1 max-w-xl text-left order-2 md:order-1">
          <span className="inline-block rounded-full bg-neutral-100 px-4 py-1.5 text-[11px] font-bold tracking-widest text-neutral-600 uppercase mb-4 sm:mb-6">
            Summer 2026 Collection
          </span>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-neutral-950 leading-[1.1] mb-6">
            Elevate Your <br />
            Lifestyle
          </h1>
          
          <p className="text-sm sm:text-base font-medium text-neutral-500 leading-relaxed mb-8 max-w-md">
            Experience the pinnacle of craftsmanship. Shop the new premium collection curated for those who demand excellence in every detail.
          </p>
          
          <div>
            <Link
              href="/shop"
              className="inline-block rounded-xl bg-neutral-950 px-8 py-4 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:bg-neutral-800 hover:shadow-xl active:scale-95"
            >
              Shop Now
            </Link>
          </div>
        </div>

        
        <div className="flex-1 w-full order-1 md:order-2 flex justify-center md:justify-end">
          <div className="relative w-full max-w-md md:max-w-xl aspect-16/11 rounded-3xl overflow-hidden shadow-2xl bg-neutral-50 border border-neutral-100">
            <img
              src="/Assets/banner.png"
              alt="Premium Interior Banner"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>

      
      <div className="w-full border-t border-neutral-100 bg-neutral-50/50 py-8 md:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4 md:gap-6">
            {features.map((feat, index) => {
              const Icon = feat.icon;
              return (
                <div key={index} className="flex items-start gap-3 sm:gap-4 px-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white border border-neutral-200 text-neutral-950 shadow-xs">
                    <Icon className="w-5 h-5" strokeWidth={2} />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs sm:text-sm font-bold text-neutral-950 tracking-tight">
                      {feat.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs font-medium text-neutral-400 leading-snug">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}