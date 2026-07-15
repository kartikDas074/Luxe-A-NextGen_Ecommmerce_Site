import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-[#070708] flex items-center justify-center px-6 overflow-hidden text-neutral-100">
      {/* Premium Ambient Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-neutral-800/20 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-neutral-800/10 blur-[120px] pointer-events-none"></div>

      {/* Subtle Grid overlay for luxury tech texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

      <div className="relative max-w-xl w-full text-center py-16 px-8 sm:px-12 rounded-3xl border border-neutral-800/80 bg-neutral-900/40 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        
        {/* Luxury Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-medium tracking-[0.2em] uppercase bg-neutral-800/50 text-neutral-400 border border-neutral-700/30">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-neutral-300"></span>
          </span>
          Error 404
        </div>

        {/* Elegant Large Text with Gradient */}
        <h1 className="mt-8 text-5xl sm:text-7xl font-extrabold tracking-tight bg-gradient-to-b from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent">
          Page Not Found
        </h1>

        <p className="mt-6 text-sm sm:text-base text-neutral-400 leading-relaxed max-w-sm mx-auto font-light">
          The runway you are looking for doesn&apos;t exist. It might have been moved, or the URL has been misplaced.
        </p>

        {/* Premium Action Buttons (Custom Tailwind Only) */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href="/" 
            className="px-8 py-3.5 rounded-xl text-xs font-semibold tracking-widest uppercase bg-white text-black hover:bg-neutral-200 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-white/5"
          >
            Back to Home
          </Link>

          <Link 
            href="/products" 
            className="px-8 py-3.5 rounded-xl text-xs font-semibold tracking-widest uppercase border border-neutral-700 hover:border-white hover:bg-neutral-900/80 text-neutral-300 hover:text-white active:scale-[0.98] transition-all duration-200"
          >
            Browse Products
          </Link>
        </div>

        {/* Luxury Footer Divider (Custom Tailwind Only) */}
        <div className="mt-12 flex items-center justify-center gap-4">
          <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-neutral-800"></div>
          <span className="text-[10px] font-extralight tracking-[0.4em] uppercase text-neutral-500 select-none">
            LUXE Marketplace
          </span>
          <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-neutral-800"></div>
        </div>
      </div>
    </main>
  );
}