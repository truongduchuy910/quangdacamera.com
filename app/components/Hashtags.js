import Link from "next/link";
import React from "react";
import { Gql } from "../modules";
export default function Hashtags() {
  return (
    <Gql
      query={`
        query {
          allHashtags {
            name
          }
        }
      `}
    >
      {({ data }) => <pre>{JSON.stringify(data)}</pre>}
    </Gql>
  );
}
