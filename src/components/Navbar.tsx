"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Heart, 
  ShoppingCart, 
  Bell, 
  User, 
  Search, 
  ChevronDown, 
  LogOut, 
  Menu, 
  X, 
  PlusCircle, 
  Package, 
  ClipboardList 
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

interface CustomUser {
  id: string;
  email: string;
  name: string;
  image?: string;
  role?: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false); // নতুন ড্রপডাউন স্টেট
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const aboutRef = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  const { data: session } = authClient.useSession();
  const user = session?.user as CustomUser | undefined;
  console.log(user);
  
  const userRole = user?.role || "seller"; 

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
  ];

  const aboutDropdownItems = [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms & Conditions", href: "/terms" },
  ];

 
  const workspaceDropdownItems = [
    { name: "Add Product", type: "add" as const, icon: PlusCircle },
    { name: "Manage Product", type: "manage" as const, icon: Package },
    { name: "Orders", type: "orders" as const, icon: ClipboardList },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (aboutRef.current && !aboutRef.current.contains(event.target as Node)) {
        setIsAboutOpen(false);
      }
      if (workspaceRef.current && !workspaceRef.current.contains(event.target as Node)) {
        setIsWorkspaceOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setIsAccountOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
  };

  const getDynamicRoute = (type: "add" | "manage" | "orders") => {
    if (!user) return "/";
    if (userRole === "seller") {
      switch (type) {
        case "add": return "/dashboard/seller/addproduct";
        case "manage": return "/dashboard/seller/products";
        case "orders": return "/dashboard/seller/orders";
      }
    } else {
      return "/dashboard/customer/become-seller";
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-[40] w-full border-b border-neutral-200 bg-white px-4 sm:px-8 py-4 md:py-5 flex items-center justify-between shadow-xs">
        
        
        <div className="flex items-center gap-6 lg:gap-12">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex md:hidden p-2 -ml-2 text-neutral-700 hover:bg-neutral-50 rounded-full cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link 
            href="/" 
            className="text-2xl md:text-3xl font-black tracking-tighter text-neutral-950 uppercase"
          >
            LUXE
          </Link>

          
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-[13px] font-bold uppercase tracking-wider text-neutral-500">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative py-1 transition-colors hover:text-neutral-950 ${
                    isActive ? "text-neutral-950 font-extrabold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2.5px] after:bg-neutral-950" : ""
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            
            <div ref={aboutRef} className="relative py-1">
              <button 
                onClick={() => { setIsAboutOpen(!isAboutOpen); setIsWorkspaceOpen(false); }}
                className="flex items-center gap-1 font-bold cursor-pointer hover:text-neutral-950 focus:outline-none"
              >
                About 
                <ChevronDown className={`w-4 h-4 transition-transform ${isAboutOpen ? "rotate-180" : ""}`} />
              </button>

              {isAboutOpen && (
                <div className="absolute top-full left-0 z-[60] w-52 pt-2 animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="rounded-xl border border-neutral-100 bg-white p-1.5 shadow-lg">
                    {aboutDropdownItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsAboutOpen(false)}
                        className="block rounded-lg px-4 py-2 text-xs font-semibold normal-case text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

           
            {user && (
              <div ref={workspaceRef} className="relative py-1">
                <button 
                  onClick={() => { setIsWorkspaceOpen(!isWorkspaceOpen); setIsAboutOpen(false); }}
                  className="flex items-center gap-1 font-bold cursor-pointer hover:text-neutral-950 focus:outline-none"
                >
                  Workspace 
                  <ChevronDown className={`w-4 h-4 transition-transform ${isWorkspaceOpen ? "rotate-180" : ""}`} />
                </button>

                {isWorkspaceOpen && (
                  <div className="absolute top-full left-0 z-[60] w-56 pt-2 animate-in fade-in slide-in-from-top-1 duration-200">
                    <div className="rounded-xl border border-neutral-100 bg-white p-1.5 shadow-lg">
                      {workspaceDropdownItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.name}
                            href={getDynamicRoute(item.type)}
                            onClick={() => setIsWorkspaceOpen(false)}
                            className="flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold normal-case text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950"
                          >
                            <Icon className="w-3.5 h-3.5 text-neutral-400" />
                            {item.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>

      
        <div className="flex items-center gap-4 md:gap-6 flex-1 justify-end max-w-2xl ml-4 md:ml-8">
          
          <div className="relative w-full max-w-xs lg:max-w-md hidden sm:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search curated goods..."
              className="w-full rounded-full border border-neutral-200 bg-neutral-50 py-2.5 pr-4 pl-11 text-xs font-medium text-neutral-800 focus:bg-white focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3">
            {user ? (
              <div className="flex items-center gap-1 sm:gap-2">
                <button className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full text-neutral-700 hover:bg-neutral-50">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full text-neutral-700 hover:bg-neutral-50">
                  <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full text-neutral-700 hover:bg-neutral-50">
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                
               
                <div ref={accountRef} className="relative ml-1 py-1">
                  <button 
                    onClick={() => setIsAccountOpen(!isAccountOpen)}
                    className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 overflow-hidden text-neutral-700 cursor-pointer hover:bg-neutral-100"
                  >
                    {user.image ? (
                      <img src={user.image} alt="User Profile" className="h-full w-full object-cover" />
                    ) : (
                      <User className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                    )}
                  </button>

                  {isAccountOpen && (
                    <div className="absolute top-full right-0 z-[60] w-64 pt-2 animate-in fade-in slide-in-from-top-1 duration-200">
                      <div className="rounded-xl border border-neutral-100 bg-white p-2 shadow-xl">
                        <div className="px-4 py-3 border-b border-neutral-100">
                          <p className="text-xs font-bold text-neutral-950 truncate">{user.name}</p>
                          <p className="text-[11px] font-medium text-neutral-400 truncate mt-0.5">{user.email}</p>
                        </div>
                        
                        <div className="mt-1.5 space-y-0.5">
                          <Link
                            href={`/dashboard/${userRole}`}
                            onClick={() => setIsAccountOpen(false)}
                            className="block rounded-lg px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950"
                          >
                            Dashboard
                          </Link>

                          <button
                            onClick={() => {
                              setIsAccountOpen(false);
                              handleLogout();
                            }}
                            className="w-full flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50/50 text-left cursor-pointer"
                          >
                            <LogOut size={14} />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1 sm:gap-2">
                <Link href="/login" className="rounded-full px-3 sm:px-5 py-2 text-xs font-bold text-neutral-600 hover:bg-neutral-50">
                  Sign In
                </Link>
                <Link href="/signup" className="rounded-full bg-neutral-950 px-4 sm:px-6 py-2 text-xs font-bold text-white shadow-md hover:bg-neutral-800">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

  
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 bg-black/40 backdrop-blur-xs" />
          <div className="fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-white p-6 shadow-2xl flex flex-col justify-between animate-in slide-in-from-left duration-300">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xl font-black text-neutral-950 uppercase tracking-tighter">LUXE MENU</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 rounded-full text-neutral-600 cursor-pointer hover:bg-neutral-100">
                  <X className="w-6 h-6" />
                </button>
              </div>

           
              <div className="space-y-4">
                <p className="text-[10px] font-black tracking-widest text-neutral-400 uppercase">Explorer</p>
                <div className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-sm font-bold text-neutral-700 hover:text-neutral-950 py-1"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>

          
              {user && (
                <div className="space-y-3 pt-2">
                  <p className="text-[10px] font-black tracking-widest text-neutral-400 uppercase">Workspace</p>
                  <div className="flex flex-col gap-2">
                    {workspaceDropdownItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.name}
                          href={getDynamicRoute(item.type)}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-2 text-sm font-bold text-neutral-700 py-1 hover:text-neutral-950 transition-colors"
                        >
                          <Icon className="w-4 h-4 text-neutral-400" />
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="space-y-3 pt-2">
                <p className="text-[10px] font-black tracking-widest text-neutral-400 uppercase">Support & Details</p>
                <div className="grid grid-cols-2 gap-3">
                  {aboutDropdownItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-xs font-semibold text-neutral-500 hover:text-neutral-950 transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

           
            <div className="border-t border-neutral-100 pt-6">
              {user ? (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-rose-50 text-xs font-bold text-rose-600 cursor-pointer hover:bg-rose-100"
                >
                  <LogOut size={14} />
                  Sign Out
                </button>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link 
                    href="/login" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full py-3 rounded-full border border-neutral-200 text-xs font-bold text-neutral-700 text-center hover:bg-neutral-50 transition"
                  >
                    Sign In
                  </Link>
                  <Link 
                    href="/signup" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full py-3 rounded-full bg-neutral-950 text-xs font-bold text-white text-center hover:bg-neutral-800 transition"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}