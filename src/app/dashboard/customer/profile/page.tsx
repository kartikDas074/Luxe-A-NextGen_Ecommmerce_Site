import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import MyProfile from "../../common/myprofile/page";
 

export default async function ProfilePage() {
  const session = await getUserSession();
  
  
  if (!session?.user) {
    redirect("/login");
  }


  const user = session.user as {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    createdAt?: string | Date;
  };
  
  return <MyProfile user={user} />;
}