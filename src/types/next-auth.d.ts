import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id: string;
    },
    session:{
      user:{
        email: string;
        name: string;
        image: string;
        id: string;
      }
    } & DefaultSession["user"];
    userDB: any;
  }
}
