import Link from "next/link";
import React from "react";
import { Gql } from "../modules";
export default function Products() {
  return (
    <Gql
      query={`
      query {
        allProducts {
          title
        }
      }
    `}
    >
      {({ data }) => <pre className="text-primary">{JSON.stringify(data)}</pre>}
    </Gql>
  );
}
