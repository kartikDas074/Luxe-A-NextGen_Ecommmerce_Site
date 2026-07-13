"use client";

import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, Home } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl border border-neutral-100 shadow-xl p-8 text-center space-y-6">
        
        <div className="flex justify-center">
          <div className="h-16 w-16 bg-rose-50 rounded-full flex items-center justify-center border border-rose-100 animate-pulse">
            <ShieldAlert className="h-8 w-8 text-rose-600" strokeWidth={2} />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black tracking-tight text-neutral-900 uppercase">
            Access Denied
          </h2>
          <p className="text-xs font-medium text-neutral-500 max-w-xs mx-auto leading-relaxed">
            You do not have the required permissions or the correct role to view this premium dashboard page.
          </p>
        </div>

        <div className="border-t border-neutral-100 pt-2">
          <div className="bg-neutral-50 rounded-xl p-3 text-[11px] font-semibold tracking-wider text-neutral-400 uppercase">
            Error Code: 403 Forbidden
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <button
            onClick={() => window.history.back()}
            className="w-full flex items-center justify-center gap-2 border border-neutral-200 bg-white rounded-xl py-3 text-sm font-bold text-neutral-700 transition-all hover:bg-neutral-50 hover:border-neutral-300 active:scale-[0.99]"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>

          <Link
            href="/"
            className="w-full bg-neutral-950 text-white py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all shadow-md hover:bg-neutral-800 hover:shadow-lg active:scale-[0.99] flex items-center justify-center gap-2"
          >
            <Home size={16} />
            Back to Home
          </Link>
        </div>

        <div className="text-[11px] font-bold tracking-widest text-neutral-300 uppercase">
          LUXE Premium Retail
        </div>

      </div>
    </div>
  );
}