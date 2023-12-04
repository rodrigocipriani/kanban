'use client'

import { ApolloLink, HttpLink } from '@apollo/client'
import {
  NextSSRApolloClient,
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr'

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
})

export const apolloClient = new NextSSRApolloClient({
  cache: new NextSSRInMemoryCache(),
  link:
    typeof window === 'undefined'
      ? ApolloLink.from([
          new SSRMultipartLink({
            stripDefer: true,
          }),
          httpLink,
        ])
      : httpLink,
})

function makeApolloClient() {
  return apolloClient
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeApolloClient}>
      {children}
    </ApolloNextAppProvider>
  )
}
