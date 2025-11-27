import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { lastLoginMethod, username } from "better-auth/plugins";
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
      mapProfileToUser: (profile) => {
        return {
          username: profile.login, // GitHub Unique username
          displayUsername: profile.name, // GitHub Display name, null value is acceptable
        };
      },
    },
  },
  plugins: [nextCookies(), lastLoginMethod(), username()],
});
