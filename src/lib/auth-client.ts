import { createAuthClient } from "better-auth/react";
import { adminClient, multiSessionClient } from "better-auth/client/plugins";
export const authClient = createAuthClient({
  plugins: [adminClient(), multiSessionClient()],
  baseURL: "http://localhost:3000", // the base url of your auth server
});

export const { signIn, signUp, useSession, signOut, getSession } =
  createAuthClient();
