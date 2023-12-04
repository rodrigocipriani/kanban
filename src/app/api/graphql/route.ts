import GetAuthUserController from '@/backend/features/User/GetAuthUserController'
import { resolvers } from '@/backend/infra/graphql/resolvers'
import { typeDefs } from '@/backend/infra/graphql/typeDefs'
import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { NextRequest, NextResponse } from 'next/server'

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
})

const handler = async (req: NextRequest, res: NextResponse) => {
  const response = await new GetAuthUserController().execute()
  return startServerAndCreateNextHandler<NextRequest>(server, {
    context: async (req) => {
      return { authUser: response.data?.authUser }
    },
  })(req)
}

export { handler as GET, handler as POST }
