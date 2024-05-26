import { useLazyQuery } from "@apollo/client";
import { graphql } from "../../../gql";

export const GET_PROJECTS = graphql(
  `
    query getProjects($page: Int = 1, $size: Int = 10) {
      projects: projectsPageable(pageable: { page: $page, size: $size }) {
        items {
          id
          title
          description
          thumbnail
        }
        hasNext
      }
    }
  `
);

export default function useProjectListQuery() {
  const [fetch, { loading }] = useLazyQuery(GET_PROJECTS, {
    fetchPolicy: "network-only",
  });

  return {
    fetch,
    loading,
  };
}
