import NextAuth, { DefaultSession } from "next-auth"
import { firestore } from "./lib/firestore"
import authConfig from "./auth.config"
import { FirestoreAdapter } from "@auth/firebase-adapter"

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      role: string
      healthCondition: string
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"]
  }

  interface User {
    role: string
    healthCondition: string
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: FirestoreAdapter(firestore),
  session: { strategy: "jwt" },
  ...authConfig,
})
