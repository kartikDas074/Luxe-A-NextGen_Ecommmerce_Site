"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import {
  LayoutDashboard,
  User,
  ShoppingBag,
  MapPin,
  Heart,
  Settings,
  LogOut,
  Store,
  Box,
  ClipboardList,
  BarChart3,
  Users,
  ShieldCheck,
  Briefcase,
  X,
  Menu,
  LucideIcon,
} from "lucide-react";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role?: string;
}

interface SidebarComponentProps {
  user: AuthUser | undefined;
}

interface MenuItem {
  name: string;
  path: string;
  icon: LucideIcon;
}

export default function SidebarComponent({ user }: SidebarComponentProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  const handleLogout = async (): Promise<void> => {
    try {
      await authClient.signOut();
      toast.success("Logged out successfully");
      router.push("/");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  const currentRole = user?.role?.toLowerCase() || "customer";

  const getMenuItems = (): MenuItem[] => {
    switch (currentRole) {
      case "admin":
        return [
          { name: "Dashboard", path: "/dashboard/admin", icon: LayoutDashboard },
          { name: "User Management", path: "/dashboard/admin/users", icon: Users },
          { name: "Seller Approval", path: "/dashboard/admin/seller-approval", icon: ShieldCheck },
          { name: "Product Management", path: "/dashboard/admin/products", icon: Box },
          { name: "Reports", path: "/dashboard/admin/reports", icon: BarChart3 },
          { name: "My Profile", path: "/dashboard/admin/profile", icon: User },
        ];
      case "seller":
        return [
          { name: "Dashboard", path: "/dashboard/seller", icon: LayoutDashboard },
          { name: "My Shop", path: "/dashboard/seller/shop", icon: Store },
          { name: "Manage Products", path: "/dashboard/seller/products", icon: Box },
          { name: "Add Product", path: "/dashboard/seller/addproduct", icon: Store },
          { name: "Inventory", path: "/dashboard/seller/inventory", icon: ClipboardList },
          { name: "Orders", path: "/dashboard/seller/orders", icon: ShoppingBag },
          { name: "Analytics", path: "/dashboard/seller/analytics", icon: BarChart3 },
          { name: "My Profile", path: "/dashboard/seller/profile", icon: User },
        ];
      case "customer":
      default:
        return [
          { name: "Dashboard", path: "/dashboard/customer", icon: LayoutDashboard },
          { name: "Profile", path: "/dashboard/customer/profile", icon: User },
          { name: "Address Book", path: "/dashboard/customer/address-book", icon: MapPin },
          { name: "Wishlist", path: "/dashboard/customer/wishlist", icon: Heart },
          { name: "Checkout", path: "/dashboard/customer/checkout", icon: ShoppingBag },
          { name: "My Orders", path: "/dashboard/customer/orders", icon: ClipboardList },
          { name: "Settings", path: "/dashboard/customer/settings", icon: Settings },
        ];
    }
  };

  const menuItems = getMenuItems();
  const isActive = (path: string): boolean => pathname === path;

  const getPortalSubtitle = (): string => {
    if (currentRole === "admin") return "Super Administrator";
    if (currentRole === "seller") return "Premium Merchant";
    return "Exclusive Club Member";
  };

  const sidebarContentLayout = (
   
    <div className="flex flex-col h-full bg-neutral-950 text-neutral-200 font-sans select-none border-r border-neutral-900">
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-none">
        
        
        <div>
          <h2 className="text-xl font-black text-white tracking-widest leading-none uppercase">
            LUXE
          </h2>
          <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mt-1.5">
            {getPortalSubtitle()}
          </p>
        </div>

        
        <div className="flex items-center gap-3 p-3 bg-neutral-900/50 border border-neutral-800/60 rounded-xl">
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-neutral-800 border border-neutral-700 flex-shrink-0 relative shadow-xs">
            {user?.image ? (
              <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-black text-neutral-400 bg-neutral-800 text-sm">
                {user?.name?.charAt(0).toUpperCase() || "L"}
              </div>
            )}
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-black text-white truncate leading-tight uppercase tracking-wider">
              {currentRole} Hub
            </h4>
            <p className="text-[11px] text-neutral-400 font-bold truncate mt-0.5">
              {user?.name || "Premium Guest"}
            </p>
          </div>
        </div>

       
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMobileSidebarOpen(false)}
              
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  active
                    ? "bg-white text-neutral-950 shadow-md shadow-white/5"
                    : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
                }`}
              >
                <Icon
                  size={15}
                  strokeWidth={active ? 2.5 : 2}
                  className={active ? "text-neutral-950" : "text-neutral-400"}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

       
        {currentRole === "customer" && (
          <div className="pt-4 border-t border-neutral-900">
            <Link
              href="/dashboard/customer/become-seller"
              onClick={() => setMobileSidebarOpen(false)}
              className="flex flex-col gap-2 p-3.5 rounded-xl bg-neutral-900/30 border border-neutral-800/80 hover:border-neutral-700 transition-colors group"
            >
              <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-white">
                <Briefcase size={14} className="text-neutral-400 group-hover:text-white" />
                Company Registry
              </div>
              <p className="text-[10px] text-neutral-400 font-medium leading-normal">
                Register your brand and scale your retail journey on LUXE.
              </p>
            </Link>
          </div>
        )}
      </div>

      
      <div className="p-6 border-t border-neutral-900 bg-neutral-950">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-rose-400 hover:bg-rose-950/30 transition-all active:scale-98"
        >
          <LogOut size={15} strokeWidth={2.5} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
     
      <div className="md:hidden fixed rounded-full bottom-6 right-6 z-50 shadow-2xl">
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        
          className="h-12 w-12 text-white bg-neutral-900 rounded-full flex items-center justify-center border border-neutral-800 active:scale-95 transition-transform"
        >
          {mobileSidebarOpen ? (
            <X size={20} strokeWidth={2.5} />
          ) : (
            <Menu size={20} strokeWidth={2.5} />
          )}
        </button>
      </div>

      
      <div className="hidden md:block w-64 h-full flex-shrink-0">
        {sidebarContentLayout}
      </div>

      
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden flex">
         
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setMobileSidebarOpen(false)}
          />
         
          <div className="relative w-64 h-full flex flex-col shadow-2xl animate-in slide-in-from-left duration-200 z-50">
            {sidebarContentLayout}
          </div>
        </div>
      )}
    </>
  );
}