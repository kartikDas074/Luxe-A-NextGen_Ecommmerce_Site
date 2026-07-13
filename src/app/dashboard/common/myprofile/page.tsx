"use client";

import React, { useState } from "react";
import { MapPin, CreditCard, Upload, User, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client"; 

interface MyProfileProps {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    createdAt?: string | Date;
    role?: string;
  };
  totalOrders?: number;
}

export default function MyProfile({ user, totalOrders = 0 }: MyProfileProps) {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user.image || null);
  const [uploading, setUploading] = useState(false);

 
  const memberSince = user.createdAt 
    ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "January 2026";

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
     
        const { data: updateData, error: updateError } = await authClient.updateUser({
          image: resData.secure_url
        });

        if (updateError) {
          console.error("Better Auth Update Error:", updateError);
          throw new Error(updateError.message || "Failed to update user database profile");
        }

       
        console.log("Success data:", updateData);
        setAvatarPreview(resData.secure_url);
        toast.success("Avatar updated successfully in database!");
      } else {
        throw new Error("Cloudinary upload failed");
      }
    } catch (error: any) {
      console.error("Upload/Update Error:", error);
      toast.error(error.message || "There is a problem in uploading the image");
      setAvatarPreview(user.image || null);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50/50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-neutral-950 uppercase">Profile</h1>
            <p className="text-xs font-semibold text-neutral-400">View your profile and update your avatar.</p>
          </div>
        
          {user.role && (
            <span className="bg-neutral-950 text-white text-[10px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-neutral-800 shadow-sm">
              {user.role}
            </span>
          )}
        </div>
      </div>

    
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        
     
        <div className="lg:col-span-2 space-y-6">
          
        
          <div className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-sm flex flex-col sm:flex-row items-center gap-6">
            <div className="relative h-24 w-24 rounded-full border border-neutral-200 bg-neutral-50 overflow-hidden flex items-center justify-center group shadow-inner">
              {avatarPreview ? (
                <img src={avatarPreview} alt={user.name} className="h-full w-full object-cover" />
              ) : (
                <User className="w-10 h-10 text-neutral-400" />
              )}
              {uploading && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center text-white">
                  <Loader2 className="w-6 h-6 animate-spin" />
                </div>
              )}
            </div>
            
            <div className="text-center sm:text-left space-y-1">
              <h3 className="text-sm font-bold text-neutral-950">Profile Photo</h3>
              <p className="text-[11px] font-medium text-neutral-400">Recommended size: 400x400px. JPG or PNG.</p>
              
              <div className="pt-3">
                <label className={`cursor-pointer inline-flex bg-neutral-950 text-white rounded-xl px-4 py-2.5 text-xs font-bold transition-all hover:bg-neutral-800 items-center gap-1.5 shadow-sm active:scale-95 ${uploading ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}>
                  <Upload size={12} />
                  {uploading ? "Uploading..." : "Upload New Photo"}
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    className="hidden" 
                    disabled={uploading}
                  />
                </label>
              </div>
            </div>
          </div>

         
          <div className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-neutral-950 tracking-tight">Personal Information</h2>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider bg-neutral-50 px-2 py-1 rounded-md">
                Read Only
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Full Name</label>
                <input
                  type="text"
                  value={user.name}
                  readOnly
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-xs font-bold text-neutral-800 cursor-not-allowed focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Email Address</label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-xs font-bold text-neutral-800 cursor-not-allowed focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

       
        <div className="space-y-6">
          
          
          <div className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-sm space-y-5">
            <h2 className="text-base font-bold text-neutral-950 tracking-tight">Account Summary</h2>
            
            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between items-center font-semibold">
                <span className="text-neutral-400">Member Since</span>
                <span className="text-neutral-950 font-bold">{memberSince}</span>
              </div>
              <div className="flex justify-between items-center font-semibold border-t border-neutral-50 pt-3">
                <span className="text-neutral-400">Total Orders</span>
                <span className="text-neutral-950 font-extrabold text-sm">{totalOrders}</span>
              </div>
            </div>

          
            <div className="border border-neutral-100 bg-neutral-50/50 rounded-xl p-4 space-y-2.5">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-neutral-900">
                <MapPin size={14} className="text-neutral-500" />
                Default Shipping Address
              </div>
              <div className="text-[11px] font-medium text-neutral-500 leading-relaxed pl-5">
                <p className="font-bold text-neutral-800">{user.name}</p>
                <p>725 Fifth Avenue</p>
                <p>New York, NY 10022</p>
                <p>United States</p>
              </div>
            </div>

           
            <div className="border border-neutral-100 bg-neutral-50/50 rounded-xl p-4 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-neutral-900">
                  <CreditCard size={14} className="text-neutral-500" />
                  Preferred Payment
                </div>
                <div className="text-[11px] font-medium text-neutral-500 pl-6">
                  <p className="font-bold text-neutral-800">Visa ending in 4242</p>
                  <p className="text-[10px] text-neutral-400">Expires 12/28</p>
                </div>
              </div>
            </div>

          </div>

         
          <div className="relative overflow-hidden rounded-2xl h-36 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950 p-5 flex flex-col justify-between shadow-md group">
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/5 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500" />
            
            <span className="self-start bg-neutral-100/10 text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-xs">
              Platinum Tier
            </span>
            <div className="space-y-0.5 z-10">
              <h4 className="text-xs font-black tracking-wide text-white uppercase">Exclusive Early Access</h4>
              <p className="text-[10px] font-medium text-neutral-400">Enabled for premium accounts.</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}