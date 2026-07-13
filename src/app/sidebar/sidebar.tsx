import React from 'react';
import { getUserSession } from '@/lib/core/session';
import SidebarComponent from './sidebarComponent';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role?: string;
}

export default async function Sidebar() {
  const session = await getUserSession();
  const user = session?.user as AuthUser | undefined;

  return (
    <div className="h-full bg-neutral-950 border-r border-neutral-900">
      <SidebarComponent user={user} />
    </div>
  );
}