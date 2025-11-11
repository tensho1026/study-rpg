// src/lib/auth.ts
import { type AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
// 👇 これを追加
import CredentialsProvider from "next-auth/providers/credentials";
import { type JWT } from "next-auth/jwt";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),

    // ✅ ゲストログイン追加
    CredentialsProvider({
      id: "guest",
      name: "Guest Login",
      credentials: {},
      async authorize() {
        const guest = await prisma.user.create({
          data: {
            name: `Guest_${Math.floor(Math.random() * 10000)}`,
            email: `${crypto.randomUUID()}@guest.local`, // ← 一意のメールを与える
            isGuest: true,
          },
        });

        return {
          id: guest.id,
          name: guest.name,
          email: guest.email,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        (token as JWT & { id?: string; isGuest?: boolean }).id = user.id;
        (token as JWT & { id?: string; isGuest?: boolean }).isGuest =
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (user as any)?.isGuest ?? false;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const enrichedToken = token as JWT & {
          id?: string;
          isGuest?: boolean;
        };
        session.user.id = enrichedToken?.id ?? "";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session.user as any).isGuest = enrichedToken?.isGuest ?? false;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
};
