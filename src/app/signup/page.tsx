"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Camera, Loader2, ArrowRight } from "lucide-react";

import { signUp } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [uploading, setUploading] = useState(false);

  const passwordRequirements = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarPreview(URL.createObjectURL(file));
    setUploading(true);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", `${process.env.NEXT_PUBLIC_UPLOAD_PRESET}`);
    data.append("cloud_name", `${process.env.NEXT_PUBLIC_CLOUD_NAME}`);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
        { method: "POST", body: data }
      );
      const resData = await res.json();

      if (resData.secure_url) {
        setAvatar(resData.secure_url);
        toast.success("Avatar uploaded successfully!");
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      toast.error("There is a problem in uploading the image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!avatar) {
      toast.error("Please upload a profile image");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const allRequirementsMet = Object.values(passwordRequirements).every(Boolean);
    if (!allRequirementsMet) {
      toast.error("Please meet all password requirements");
      return;
    }

    if (!agreeTerms) {
      toast.error("You must agree to the Terms & Conditions");
      return;
    }
    
    const {data,error}=await signUp.email({
        name:fullName,
        email:email,
        password:password,
        image:avatar,
    }) 
   if(data){
    window.location.href = "/";
    toast.success('You are welcome TO LUXE');
   }else{
    toast.error(`Plz Cheak ${error}`);
   }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl border border-neutral-100 shadow-xl p-8 space-y-6">
        
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black tracking-tight text-neutral-900">Join LUXE</h2>
          <p className="text-xs font-medium text-neutral-500">
            Create your account to start your premium shopping journey.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="relative group h-24 w-24 rounded-full border border-neutral-200 bg-neutral-50 overflow-hidden flex items-center justify-center shadow-inner">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar Preview" className="h-full w-full object-cover" />
              ) : (
                <Camera className="h-7 w-7 text-neutral-400" />
              )}
              {uploading && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Loader2 className="h-5 w-5 text-white animate-spin" />
                </div>
              )}
              <label className="absolute inset-0 cursor-pointer bg-black/0 group-hover:bg-black/20 flex items-center justify-center transition-all">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  className="hidden" 
                  disabled={uploading}
                />
              </label>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              Upload Avatar
            </span>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-neutral-700 uppercase tracking-wide">Full Name</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Alexander McQueen"
              className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 py-3 px-4 text-sm font-medium text-neutral-800 transition-all placeholder:text-neutral-400 focus:border-neutral-950 focus:bg-white focus:outline-none focus:ring-4 focus:ring-neutral-950/5"
            />
          </div>

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
            <label className="text-xs font-bold text-neutral-700 uppercase tracking-wide">Password</label>
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

          <div className="bg-neutral-50 border border-neutral-100 rounded-xl p-4 grid grid-cols-2 gap-2 text-xs font-semibold text-neutral-500">
            <div className={`flex items-center gap-2 ${passwordRequirements.length ? "text-emerald-600" : ""}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${passwordRequirements.length ? "bg-emerald-600" : "bg-neutral-300"}`} />
              8+ chars
            </div>
            <div className={`flex items-center gap-2 ${passwordRequirements.uppercase ? "text-emerald-600" : ""}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${passwordRequirements.uppercase ? "bg-emerald-600" : "bg-neutral-300"}`} />
              Uppercase
            </div>
            <div className={`flex items-center gap-2 ${passwordRequirements.lowercase ? "text-emerald-600" : ""}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${passwordRequirements.lowercase ? "bg-emerald-600" : "bg-neutral-300"}`} />
              Lowercase
            </div>
            <div className={`flex items-center gap-2 ${passwordRequirements.number ? "text-emerald-600" : ""}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${passwordRequirements.number ? "bg-emerald-600" : "bg-neutral-300"}`} />
              Number
            </div>
            <div className={`flex items-center gap-2 ${passwordRequirements.specialChar ? "text-emerald-600" : ""}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${passwordRequirements.specialChar ? "bg-emerald-600" : "bg-neutral-300"}`} />
              Special char
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-neutral-700 uppercase tracking-wide">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 py-3 pl-4 pr-11 text-sm font-medium text-neutral-800 transition-all placeholder:text-neutral-400 focus:border-neutral-950 focus:bg-white focus:outline-none focus:ring-4 focus:ring-neutral-950/5"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-950"
            />
            <label htmlFor="terms" className="text-xs font-medium text-neutral-600 leading-normal">
              I agree to the <Link href="/terms" className="font-bold text-neutral-900 hover:underline">Terms & Conditions</Link> and <Link href="/privacy" className="font-bold text-neutral-900 hover:underline">Privacy Policy</Link>
            </label>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-neutral-950 text-white py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all shadow-md hover:bg-neutral-800 hover:shadow-lg active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            Create Account
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
          Google Sign Up
        </button>

        <div className="text-center text-xs font-semibold text-neutral-500">
          Already have an account?{" "}
          <Link href="/login" className="text-neutral-950 font-bold hover:underline">
            Login
          </Link>
        </div>

      </div>
    </div>
  );
}