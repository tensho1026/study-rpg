import NextAuth, { DefaultSession } from "next-auth"

// `declare module` で既存の型を拡張
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      isGuest?: boolean
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    isGuest?: boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string
    isGuest?: boolean
  }
}
