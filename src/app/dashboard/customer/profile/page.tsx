import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import MyProfile from "../../common/myprofile/page";
 // পাথ আপনার ফোল্ডার স্ট্রাকচার অনুযায়ী চেঞ্জ করতে পারেন

export default async function ProfilePage() {
  const session = await getUserSession();
  
  // ইউজার না থাকলে লগইন বা অনঅথরাইজড পেজে রিডাইরেক্ট
  if (!session?.user) {
    redirect("/login");
  }

  // কাস্টম সেফ টাইপ কাস্টিং
  const user = session.user as {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    createdAt?: string | Date;
  };
  
  return <MyProfile user={user} />;
}