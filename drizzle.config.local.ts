import { defineConfig } from "drizzle-kit";
// 确保 DATABASE_URL 已定义
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in the environment variables");
}

export default defineConfig({
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  schema: "./db/schema/",
  dialect: "sqlite",
  out: "./db",
});
