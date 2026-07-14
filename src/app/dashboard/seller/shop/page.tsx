import React from "react";
import { getUserSession } from "@/lib/core/session";
import { getComapnyById } from "@/lib/api/Company";
import Company from "../../common/Company";

const page = async () => {
  const session = await getUserSession();

  const user = session?.user as {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    createdAt?: string | Date;
  };

  const result = await getComapnyById(user.id);
  return (
    <div>
        <Company shopData={result.data[0]}></Company>
    </div>
  );
};

export default page;
