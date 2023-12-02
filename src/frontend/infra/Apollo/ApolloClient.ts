import { ApolloClient, InMemoryCache } from '@apollo/client'

const apolloClient = new ApolloClient({
  uri: 'https://api.mocki.io/v2/c4d7a195/graphql',
  cache: new InMemoryCache(),
})

export default apolloClient
