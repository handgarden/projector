import { useLazyQuery } from "@apollo/client";
import { graphql } from "../../../gql";

export const GET_PROJECTS_COUNT = graphql(
  `
    query getProjectCount($page: Int = 1, $size: Int = 10) {
      projects(pageable: { page: $page, size: $size }) {
        total
      }
    }
  `
);

export default function useProjectCountQuery() {
  const [fetch, { loading }] = useLazyQuery(GET_PROJECTS_COUNT, {
    fetchPolicy: "network-only",
  });

  return {
    fetch,
    loading,
  };
}
