import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { NextRequest } from 'next/server'
import { resolvers } from '@/backend/infra/graphql/resolvers'
import { typeDefs } from '@/backend/infra/graphql/typeDefs'

// const typeDefs = gql`
//   type Query {
//     hello: String
//   }
// `

// const resolvers = {
//   Query: {
//     hello: () => 'Hello world!',
//   },
// }

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
})

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
})

export { handler as GET, handler as POST }
