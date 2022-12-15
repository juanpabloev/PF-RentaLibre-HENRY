import NextAuth, { type NextAuthOptions } from "next-auth"; //esta es original
//import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";

/* export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
    
  ],
  secret: process.env.JWT_SECRET,

}) */

///esta de aca abajo venia por defecto:

export const authOptions: NextAuthOptions = {
  // Include user.id on session

  //SE AGREGAN PARAMETROS AL OBJETO; EL ID DEBERIA SER DE LA DB o TOKEN SI NO:. ver:
  //https://www.youtube.com/watch?v=TcnRPXPM68Q

   /* callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  }, */

  // Configure one or more authentication providers
  //adapter: PrismaAdapter(prisma),
  providers: [
    /* DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }), */
    // ...add more providers here
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,

      //Alternatively, you can also pass options in the params object of authorization which will force the Refresh Token to always be provided on sign in, however this will ask all users to confirm if they wish to grant your application access every time they sign in:
      /* authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      } */
    }),
  ],
  secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
