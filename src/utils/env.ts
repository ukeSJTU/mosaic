import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z
      .url("DATABASE_URL must be a valid URL")
      .min(1, "DATABASE_URL cannot be empty"),
    BETTER_AUTH_SECRET: z.string().min(1, "BETTER_AUTH_SECRET cannot be empty"),
    BETTER_AUTH_URL: z
      .url("BETTER_AUTH_URL must be a valid URL")
      .min(1, "BETTER_AUTH_URL cannot be empty"),
    GITHUB_CLIENT_ID: z.string().min(1, "GITHUB_CLIENT_ID cannot be empty"),
    GITHUB_CLIENT_SECRET: z
      .string()
      .min(1, "GITHUB_CLIENT_SECRET cannot be empty"),
  },
  client: {},
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  },
});
