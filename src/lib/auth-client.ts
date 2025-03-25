import { adminClient, multiSessionClient } from "better-auth/client/plugins";

import { createAuthClient } from "better-auth/react";

// Determine if we're in production or development environment
const isProd = process.env.NODE_ENV === "production";
const baseUrl = isProd ? "https://mipple.net" : "http://localhost:3000";

export const authClient = createAuthClient({
  plugins: [adminClient(), multiSessionClient()],
  baseURL: baseUrl, // the base url of your auth server
});
export const { signIn, signUp, useSession, signOut, getSession } =
  createAuthClient();
