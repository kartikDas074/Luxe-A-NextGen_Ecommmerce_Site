"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles, ShieldCheck, Gem } from "lucide-react";

export default function PromoGlassSection() {
  const highlights = [
    {
      icon: Gem,
      title: "Handcrafted Luxury",
      desc: "Every piece tells a story of absolute precision.",
    },
    {
      icon: Sparkles,
      title: "Limited Release",
      desc: "Only a few items are crafted globally per season.",
    },
  ];

  return (
    <section className="w-full bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        
        {/* Outer Dark Wrapper for Background Depth */}
        <div className="relative w-full overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 px-6 py-16 sm:px-12 sm:py-20 md:px-20 shadow-2xl">
          
          {/* Subtle Decorative Ambient Glow Behind Glass */}
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-neutral-800/30 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-neutral-700/20 blur-3xl" />

          {/* Core Glassmorphism Container */}
          <div className="relative z-10 w-full rounded-3xl border border-white/10 bg-neutral-950/40 p-8 sm:p-12 backdrop-blur-xl shadow-inner flex flex-col lg:flex-row items-center justify-between gap-10">
            
            {/* Left: Heading & Main Hook */}
            <div className="max-w-xl text-left space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-black tracking-widest text-neutral-300 uppercase backdrop-blur-md">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                Luxe Authenticity Guaranteed
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.15]">
                Uncompromising Quality. <br />
                Designed For The Few.
              </h2>
              
              <p className="text-xs sm:text-sm font-medium text-neutral-400 leading-relaxed max-w-md">
                Our signature curation bridges modern minimalism with timeless heritage craftsmanship. Elevate your everyday space with objects that inspire.
              </p>

              <div className="pt-2">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-xs font-black tracking-wider uppercase text-neutral-950 shadow-lg transition-all duration-300 hover:bg-neutral-100 active:scale-95 group"
                >
                  Explore Collection
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>

            {/* Right: Premium Dynamic Stats / Highlights Grid inside Glass */}
            <div className="w-full lg:max-w-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6">
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={idx} 
                    className="flex gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-5 sm:p-6 backdrop-blur-xs transition-all duration-300 hover:bg-white/[0.05]"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white tracking-tight">
                        {item.title}
                      </h4>
                      <p className="text-[11px] sm:text-xs font-medium text-neutral-400 leading-normal">
                        {item.desc}
                      </p>
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