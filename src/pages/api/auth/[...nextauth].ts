//import NextAuth, { type NextAuthOptions } from "next-auth"; //esta es original
//import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
//import EmailProvider from 'next-auth/providers/email';
//import { PrismaClient } from '@prisma/client';
//import GitHubProvider from "next-auth/providers/github";
// import CredentialsProvider from 'next-auth/providers/credentials';

//const prisma = new PrismaClient();

/* const userdDB = async () => {
  const userDB = await prisma.user.findUnique({ where: { id: token.sub } });
  return userDB;
}; */

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers
  adapter: PrismaAdapter(prisma),
  providers: [
    /* EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }), */
    // CredentialsProvider({
    //   credentials: {
    //     email: { label: 'Email', type: 'text ', placeholder: 'jsmith@example.com' },
    //     password: { label: 'Password', type: 'password' },
    //   },
    //   async authorize(credentials, req) {
    //     // You need to provide your own logic here that takes the credentials
    //     // submitted and returns either a object representing a user or value
    //     // that is false/null if the credentials are invalid.
    //     // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
    //     // You can also use the `req` object to obtain additional parameters
    //     // (i.e., the request IP address)
    //     const res = await fetch('http://localhost:3000/api/login', {
    //       method: 'POST',
    //       body: JSON.stringify(credentials),
    //       headers: { 'Content-Type': 'application/json' },
    //     });
    //     const user = await res.json();

    //     // If no error and we have user data, return it
    //     if (res.ok && user) {
    //       return user;
    //     }
    //     // Return null if user data could not be retrieved
    //     return null;
    //   },
    // }),
    /*  GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }), */
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  // The secret should be set to a reasonably long random string.
  // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
  // a separate secret is defined explicitly for encrypting the JWT.

  secret: process.env.JWT_SECRET,

  session: {
    strategy: "jwt",
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    //jwt: true,
    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days
    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  // JSON Web tokens are only used for sessions if the `jwt: true` session
  // option is set - or by default if no database is specified.
  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // A secret to use for key generation (you should set this explicitly)
    secret: "secreto-provisorio",
    maxAge: 60 * 60 * 24 * 30,
    // Set to true to use encryption (default: false)
    // encryption: true,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },

  // You can define custom pages to override the built-in ones. These will be regular Next.js pages
  // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
  // The routes shown here are the default URLs that will be used when a custom
  // pages is not specified for that route.
  // https://next-auth.js.org/configuration/pages
  pages: {
    //signIn: '/signin',  // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    //newUser: '/register' // If set, new users will be directed here on first sign in
  },

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    // async signIn(user, account, profile) { return true },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },

    async session({ session, token }) {
      const userDB = await prisma.user.findUnique({ where: { id: token.sub } });

      if (session) {
        session.userDB = userDB;
        //para que el backend tome bien el id del usuario
        if (session.user != undefined && userDB?.id) {
          session.user["id"] = userDB?.id;
        }
      }
      //console.log(session);
      return session;
    },

    async jwt({ token, account, profile, user, isNewUser }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      const userDB = await prisma.user.findUnique({ where: { id: token.sub } });

      if (account) {
        token.accessToken = account.access_token;
        //token.id = profile.id
      }
      if (user) {
        token.role = userDB?.role;
      }
      //console.log(token)

      return token;
    },

    // async jwt(token, user, account, profile, isNewUser) { return token }
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  /*  events: {
    signIn: ({ user, account, profile, isNewUser }) => {
      console.log(`isNewUser: ${JSON.stringify(isNewUser)}`);
    },
    // updateUser({ user })
  }, */

  // You can set the theme to 'light', 'dark' or use 'auto' to default to the
  // whatever prefers-color-scheme is set to in the browser. Default is 'auto'
  //theme: 'light',

  // Enable debug messages in the console if you are having problems
  debug: false,
};
export default NextAuth(authOptions);
