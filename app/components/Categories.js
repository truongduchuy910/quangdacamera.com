import Link from "next/link";
import React from "react";
import { Gql } from "../modules";
export default function Categories() {
  return (
    <Gql
      query={`
      query {
        allCategories {
          name
        }
      }
      `}
    >
      {({ data }) => <pre>{JSON.stringify(data)}</pre>}
    </Gql>
  );
}
