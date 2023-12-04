import { compare } from 'bcryptjs'
import CredentialsProvider from 'next-auth/providers/credentials'

import UserRepository from '@/backend/features/User/UserRepository'

import type { NextAuthOptions, Session } from 'next-auth'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  // jwt: {},
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      // name: 'Sign in',
      // type: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null
        }

        // TODO: The user repository should be injected or something but not instantiated here on shared from backend
        const userRepository = new UserRepository()
        const user = await userRepository.findByEmail({
          email: credentials.email,
          includePassword: true,
        })

        if (!user || !(await compare(credentials.password, user.password))) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.picture,
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, account, user, profile, session, trigger }) => {
      if (user) {
        token.email = user.email
        token.email = user.email
        token.name = user.name
        token.picture = user.image
      }
      return { ...token, ...user }
    },
    session: ({ session, token, user, newSession, trigger }) => {
      return { ...session, user: token }
    },
  },
}
