import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function getUserSession(): Promise<Awaited<ReturnType<typeof auth.api.getSession>>> {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  return session;
}