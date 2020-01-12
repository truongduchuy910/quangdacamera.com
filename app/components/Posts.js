import Link from "next/link";
import {Gql} from "../modules";
import React from "react";
export default function Posts() {
  return (
    <Gql
      query={`
        query {
          allPosts {
            title
          }
        }
      `}
    >
      {({ data }) => <pre>{JSON.stringify(data)}</pre>}
    </Gql>
  );
}
