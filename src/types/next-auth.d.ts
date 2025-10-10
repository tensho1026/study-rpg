import NextAuth, { DefaultSession } from "next-auth"

// `declare module` で既存の型を拡張
declare module "next-auth" {
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
  }

  interface User {
    id: string
  }
}
