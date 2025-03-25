import { Role } from "@/types/middleware";

export type CurrentUser = {
  role: Role;
  id?: string;
  banned?: null | boolean;
  image?: string | null;
  isVisitor?: boolean;
  email: string;
};
