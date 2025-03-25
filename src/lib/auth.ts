import { admin, multiSession } from "better-auth/plugins";

import { PrismaClient } from "@prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

const prisma = new PrismaClient();

// Determine if we're in production or development environment
const isProd = process.env.NODE_ENV === "production";
const baseUrl = isProd ? "https://mipple.net" : "http://localhost:3000";

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
  baseURL: baseUrl,
  appName: "Aydakar",
  trustedOrigins: [baseUrl],
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    maxPasswordLength: 32,
  },
});
