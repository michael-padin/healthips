import { compare } from "bcryptjs"
import type { NextAuthConfig } from "next-auth"
import { type Provider } from "next-auth/providers"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { LoginSchema } from "./types/login"
import { getUserByEmail } from "./services/user"
import { NextResponse } from "next/server"

const providers: Provider[] = [
  Credentials({
    async authorize(credentials) {
      const validateFields = LoginSchema.safeParse(credentials)

      if (validateFields.success) {
        const { email, password } = validateFields.data
        const user = await getUserByEmail(email)

        /**
         * if user is not found or if there is user but password is not provided
         * but using credentials provider, return null
         */
        if (!user || !user.password) return null

        // compare the actual password and the hash password
        const passwordMatch = await compare(password, user.password)

        const {
          password: _,
          emailVerified,
          createdAt,
          updatedAt,
          profile,
          ...newUser
        } = user

        if (passwordMatch) return newUser
      }
      return null
    },
  }),
  // Google({
  //   clientId: process.env.AUTH_GOOGLE_ID,
  //   clientSecret: process.env.AUTH_GOOGLE_SECRET,
  //   authorization: {
  //     params: {
  //       prompt: "consent",
  //       access_type: "offline",
  //       response_type: "code",
  //     },
  //   },
  // }),
]

export default {
  providers,
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.healthCondition = user.healthCondition
      }
      return token
    },
    session({ session, token, user }) {
      session.user.role = token.role as string
      session.user.healthCondition = token.healthCondition as string
      return session
    },
    authorized({ auth, request: { nextUrl } }) {
      try {
        const isLoggedIn = !!auth?.user
        const isOnAuthPages = nextUrl.pathname.startsWith("/login")
        if (!isOnAuthPages) {
          if (isLoggedIn) {
            return true
          }
          return false
        } else if (isLoggedIn) {
          return NextResponse.redirect(new URL("/dashboard", nextUrl))
        }
        return true
      } catch (error) {
        // handle error
      }
    },
  },
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig
