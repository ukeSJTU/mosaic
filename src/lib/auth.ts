import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { lastLoginMethod, oAuthProxy } from "better-auth/plugins";
import { db } from "@/lib/db";
import { env } from "@/utils/env";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      redirectURI: `${env.PROXY_URL}/api/auth/callback/github`,
    },
  },
  plugins: [
    nextCookies(),
    lastLoginMethod(),
    oAuthProxy({
      productionURL: env.PROXY_URL,
      currentURL: env.BASE_URL,
    }),
  ],
});
