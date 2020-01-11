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

export default function Categories() {
  return (
    <ApolloProvider client={client}>
      <style jsx>{`
        p {
          color: blue;
        }
        div {
          background: red;
        }
        @media (max-width: 600px) {
          div {
            background: blue;
          }
        }
      `}</style>

      <KeystoneProvider>
        <Query
          query={gql`
            query {
              allCategories {
                name
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
