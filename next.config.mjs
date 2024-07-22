import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

if (process.env.NODE_ENV === "development") {
  await setupDevPlatform({
    persist: {
      path: "./db/data/v3",
    },
  });
}
/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
