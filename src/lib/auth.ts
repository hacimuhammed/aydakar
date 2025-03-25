import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { admin, multiSession } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
const prisma = new PrismaClient();
export const auth = betterAuth({
  plugins: [
    admin(),
    multiSession({
      maximumSessions: 3,
    }),
    nextCookies(),
  ],

  user: {
    additionalFields: {},
  },
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
  baseURL: "http://localhost:3000",
  appName: "Aydakar",
  trustedOrigins: ["http://localhost:3000"],
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    maxPasswordLength: 32,
  },
});
