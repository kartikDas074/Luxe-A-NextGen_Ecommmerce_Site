import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  const session = await getUserSession();
  
  const sessionUser = (session?.user as unknown as {
    id: string;
    email: string;
    name: string;
    image?: string | null;
    role?: string;
  } | undefined);

  if (!sessionUser || sessionUser.role !== "customer") {
    redirect("/unauthorized");
  }

  return (
    <div>
      {children}
    </div>
  );
};

export default Layout;