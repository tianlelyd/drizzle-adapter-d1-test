import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { db } from "@/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({ allowDangerousEmailAccountLinking: true }),
    GitHub({ allowDangerousEmailAccountLinking: true }),
  ],
  adapter: DrizzleAdapter(db),
  callbacks: {
    authorized({ request, auth }) {
      return !!auth;
    },
  },
  debug: process.env.NODE_ENV !== "production" ? true : false,
});

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}
