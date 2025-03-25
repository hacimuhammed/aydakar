"server-only";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { getUser } from "@/lib/getUser";
import { pagePermissions } from "@/lib/middleware";
import { Role } from "@/types/middleware";
import { headers } from "next/headers";

class AccountService {
  async getUserRoleFromUserId(userId: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        role: true,
      },
    });
    return user?.role;
  }
  async getDeviceSessions() {
    //Sadece yöneticiler birden fazla cihazda giriş yapabilir
    //Bu yüzden yöneticilerin giriş yapabildiği cihazların listesini döndürüyoruz
    const currentUser = await getUser();
    if (!currentUser) return null;
    try {
      const deviceSessions = await auth.api.listDeviceSessions({
        headers: await headers(),
      });
      const { allowedRoles } = pagePermissions.dashboard;
      const sessions = await Promise.all(
        deviceSessions.map(async (session) => {
          const userRole = await this.getUserRoleFromUserId(session.user.id);
          return {
            session: session.session,
            user: session.user,
            isAllowed: allowedRoles.includes(userRole as Role),
          };
        })
      );
      const sessionList = {
        deviceSessions: sessions,
        isIncludeAllowed: sessions.some((session) => session.isAllowed),
      };
      return sessionList;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export const accountService = new AccountService();
