import Link from "next/link";
import gql from "graphql-tag";
import React from "react";
import { HttpLink } from "apollo-link-http";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { Query, KeystoneProvider } from "@keystonejs/apollo-helpers";

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:3000/admin/api" }),
  cache: new InMemoryCache()
});

export default function Posts() {
  return (
    <ApolloProvider client={client}>
      <KeystoneProvider>
        <Query
          query={gql`
            query {
              allPosts {
                title
              }
            }
          `}
        >
          {({ data }) => <pre>{JSON.stringify(data)}</pre>}
        </Query>
      </KeystoneProvider>
    </ApolloProvider>
  );
}
