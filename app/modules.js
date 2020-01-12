import gql from "graphql-tag";
import React from "react";
import { HttpLink } from "apollo-link-http";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { Query, KeystoneProvider } from "@keystonejs/apollo-helpers";
const client = new ApolloClient({
  link: new HttpLink({ uri: "/admin/api" }),
  cache: new InMemoryCache()
});
const Gql = props => {
  if (props.query)
    return (
      <ApolloProvider client={client}>
        <KeystoneProvider>
          <Query
            query={gql`
              ${props.query}
            `}
          >
            {props.children}
          </Query>
        </KeystoneProvider>
      </ApolloProvider>
    );
};
export { Gql };
