import type { DefaultSession } from "next-auth";
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      login?: string;
    } & DefaultSession["user"];
    isAdmin?: boolean;
  }
}
