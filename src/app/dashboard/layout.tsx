import React from "react";
import { redirect } from "next/navigation";
import { getUserSession } from "@/lib/core/session";
import Sidebar from "../sidebar/sidebar";

interface UserType {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role?: string;
  createdAt?: string | Date;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const session = await getUserSession();

  if (!session || !session.user) {
    redirect("/login");
  }


  const user = session.user as UserType;

  return (
    <div className="flex h-screen w-full bg-neutral-50 overflow-hidden">
     
      <Sidebar />

     
      <main className="flex-1 h-full overflow-y-auto p-4 md:p-6 bg-neutral-50/50">
        {children}
      </main>
    </div>
  );
}