import { getUser } from "@/lib/getUser";
import { checkAccess } from "@/lib/middleware";
import { redirect } from "next/navigation";
import React from "react";

const DashboardPage = async () => {
  const user = await getUser();
  const canIView = await checkAccess("dashboard");
  if (!canIView) redirect("/");
  return <div>Merhaba {user.email}</div>;
};

export default DashboardPage;
