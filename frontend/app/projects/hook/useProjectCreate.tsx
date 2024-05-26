import { useMutation } from "@apollo/client";
import { graphql } from "../../../gql";

const CREATE_PROJECT = graphql(`
  mutation createProject($input: CreateProjectInput!) {
    createProject(project: $input) {
      id
      title
      description
      thumbnail
    }
  }
`);

export function useProjectCreate() {
  const [mutate] = useMutation(CREATE_PROJECT);

  return {
    mutate,
  };
}
