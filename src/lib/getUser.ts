"server-only";
import { headers } from "next/headers";
import { auth } from "./auth";
import { Role } from "@/types/middleware";
import { CurrentUser } from "@/types/current-user";

export const getUser = async (): Promise<CurrentUser> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return {
      role: "visitor",
      id: undefined,
      banned: undefined,
      isVisitor: true,
      email: "",
    };
  }
  const { user } = session;

  return {
    role: user.role as Role,
    id: user.id,
    banned: user.banned,
    image: user.image,
    email: user.email,
    isVisitor: false,
  };
};
