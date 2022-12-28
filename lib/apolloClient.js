import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: 'https://graphql.anilist.co',
      fetch,
    }),
    cache: new InMemoryCache(),
  });

export default client;