"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, ShoppingCart, Bell, User, Search, ChevronDown, LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const pathname = usePathname();
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Companies", href: "/companies" },
    { name: "Blog", href: "/blog" },
  ];

  const aboutDropdownItems = [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Report", href: "/report" },
  ];

  const handleLogout = async () => {
    await authClient.signOut();
  };

  return (
    <nav className="sticky top-0 z-[50] w-full border-b border-neutral-200 bg-white px-8 py-5 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-16">
        <Link 
          href="/" 
          className="text-3xl font-black tracking-tighter text-neutral-950 uppercase transition-transform active:scale-95 bg-gradient-to-r from-neutral-950 via-neutral-800 to-neutral-950 bg-clip-text text-transparent hover:opacity-90"
        >
          LUXE
        </Link>

        <div className="hidden md:flex items-center gap-8 text-[13px] font-bold uppercase tracking-wider text-neutral-500">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative py-1 transition-colors hover:text-neutral-950 ${
                  isActive ? "text-neutral-950 font-extrabold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2.5px] after:bg-neutral-950 after:rounded-full" : ""
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          <div 
            className="relative"
            onMouseEnter={() => setIsAboutOpen(true)}
            onMouseLeave={() => setIsAboutOpen(false)}
          >
            <button className="flex items-center gap-1 py-1 transition-colors hover:text-neutral-950 focus:outline-none font-bold">
              About 
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isAboutOpen ? "rotate-180 text-neutral-950" : ""}`} />
            </button>

            {isAboutOpen && (
              <div className="absolute top-full left-0 z-[60] w-56 origin-top-left rounded-xl border border-neutral-100 bg-white p-2 shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-1 duration-200">
                {aboutDropdownItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block rounded-lg px-4 py-2.5 text-xs font-semibold normal-case text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-neutral-950"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 flex-1 justify-end max-w-2xl ml-8">
        <div className="relative w-full max-w-md hidden sm:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search curated goods..."
            className="w-full rounded-full border border-neutral-200 bg-neutral-50 py-2.5 pr-4 pl-11 text-xs font-medium text-neutral-800 transition-all placeholder:text-neutral-400 focus:border-neutral-950 focus:bg-white focus:outline-none focus:ring-4 focus:ring-neutral-950/5"
          />
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <button className="relative flex h-10 w-10 items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-neutral-950">
                <Heart className="w-5 h-5" strokeWidth={2.2} />
              </button>
              <button className="relative flex h-10 w-10 items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-neutral-950">
                <ShoppingCart className="w-5 h-5" strokeWidth={2.2} />
              </button>
              <button className="relative flex h-10 w-10 items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-neutral-950">
                <Bell className="w-5 h-5" strokeWidth={2.2} />
              </button>
              
              <div 
                className="relative"
                onMouseEnter={() => setIsAccountOpen(true)}
                onMouseLeave={() => setIsAccountOpen(false)}
              >
                <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 overflow-hidden text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950 focus:outline-none">
                  {user.image ? (
                    <img src={user.image} alt={user.name} className="h-full w-full object-cover" />
                  ) : (
                    <User className="w-5 h-5" strokeWidth={2.2} />
                  )}
                </button>

                {isAccountOpen && (
                  <div className="absolute top-full right-0 z-[60] w-64 origin-top-right rounded-xl border border-neutral-100 bg-white p-2 shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-1 duration-200">
                    <div className="px-4 py-3 border-b border-neutral-50">
                      <p className="text-xs font-bold text-neutral-950 truncate">{user.name}</p>
                      <p className="text-[11px] font-medium text-neutral-400 truncate mt-0.5">{user.email}</p>
                    </div>
                    <div className="mt-1.5 space-y-0.5">
                      <Link
                        href={`/dashboard/${user.role}`}
                        className="block rounded-lg px-4 py-2 text-xs font-semibold text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-neutral-950"
                      >
                       Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold text-rose-600 transition-colors hover:bg-rose-50/50 text-left"
                      >
                        <LogOut size={14} />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link 
                href="/login" 
                className="rounded-full px-5 py-2.5 text-xs font-bold text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-neutral-950"
              >
                Sign In
              </Link>
              <Link 
                href="/signup" 
                className="rounded-full bg-neutral-950 px-6 py-2.5 text-xs font-bold text-white transition-all shadow-md hover:bg-neutral-800 hover:shadow-lg active:scale-95"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}