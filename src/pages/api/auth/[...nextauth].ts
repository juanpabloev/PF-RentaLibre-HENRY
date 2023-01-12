import GoogleProvider from "next-auth/providers/google";

import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.JWT_SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: "secreto-provisorio",
    maxAge: 60 * 60 * 24 * 30,
  },
  pages: {
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },

    async session({ session, token }) {
      const userDB = await prisma.user.findUnique({ where: { id: token.sub } });

      if (session) {
        session.userDB = userDB;
        if (session.user != undefined && userDB?.id) {
          session.user["id"] = userDB?.id;
        }
      }
      return session;
    },

    async jwt({ token, account, profile, user, isNewUser }) {

      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
  debug: false,
};
export default NextAuth(authOptions);
