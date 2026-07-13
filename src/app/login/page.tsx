"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";
import { signIn } from "@/lib/auth-client";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    const {data,error}=await signIn.email({
        email:email,
        password:password
    });
    if(data){
        toast.success("Logged in successfully!");
    }else{
        toast.error('Try Again Later.')
    }
   
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl border border-neutral-100 shadow-xl p-8 space-y-6">
        
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black tracking-tight text-neutral-900">Welcome Back</h2>
          <p className="text-xs font-medium text-neutral-500">
            Sign in to your LUXE account to continue shopping.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-bold text-neutral-700 uppercase tracking-wide">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@luxepremium.com"
              className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 py-3 px-4 text-sm font-medium text-neutral-800 transition-all placeholder:text-neutral-400 focus:border-neutral-950 focus:bg-white focus:outline-none focus:ring-4 focus:ring-neutral-950/5"
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-neutral-700 uppercase tracking-wide">Password</label>
              <Link href="/forgot-password" className="text-xs font-bold text-neutral-950 hover:underline">
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 py-3 pl-4 pr-11 text-sm font-medium text-neutral-800 transition-all placeholder:text-neutral-400 focus:border-neutral-950 focus:bg-white focus:outline-none focus:ring-4 focus:ring-neutral-950/5"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-neutral-950 text-white py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all shadow-md hover:bg-neutral-800 hover:shadow-lg active:scale-[0.99] flex items-center justify-center gap-2"
          >
            Sign In
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="relative flex py-2 items-center text-neutral-400">
          <div className="flex-grow border-t border-neutral-200"></div>
          <span className="flex-shrink mx-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Or Continue With</span>
          <div className="flex-grow border-t border-neutral-200"></div>
        </div>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 border border-neutral-200 bg-white rounded-xl py-3 text-sm font-bold text-neutral-700 transition-all hover:bg-neutral-50 hover:border-neutral-300 active:scale-[0.99]"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.555 0-6.433-2.878-6.433-6.433 0-3.556 2.878-6.433 6.433-6.433 1.483 0 2.844.504 3.928 1.346l3.057-3.057C18.23 1.439 15.42 0 12.24 0 5.48 0 0 5.48 0 12.24s5.48 12.24 12.24 12.24c6.8 0 12.24-5.44 12.24-12.24 0-.768-.077-1.507-.22-2.215H12.24z"
            />
          </svg>
          Google Sign In
        </button>

        <div className="text-center text-xs font-semibold text-neutral-500">
          Don't have an account?{" "}
          <Link href="/register" className="text-neutral-950 font-bold hover:underline">
            Register
          </Link>
        </div>

      </div>
    </div>
  );
}