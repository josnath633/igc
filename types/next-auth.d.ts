import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    accessToken?: string
    refreshToken?: string
    provider?: string
    user: {
      id: string
      role: string
      name?: string | null
      email?: string | null
    }
  }

  interface User {
    id: string
    role: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: string
    accessToken?: string
    refreshToken?: string
    expiresAt?: number
    provider?: string
  }
}
