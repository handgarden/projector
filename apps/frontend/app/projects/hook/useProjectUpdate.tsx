import { useMutation } from "@apollo/client";
import { graphql } from "../../../gql";

const UPDATE_PROJECT = graphql(`
  mutation updateProject($projectId: ID!, $input: CreateProjectInput!) {
    updateProject(id: $projectId, project: $input) {
      id
      title
      description
    }
  }
`);

export default function useProjectUpdate() {
  const [mutation] = useMutation(UPDATE_PROJECT);

  return {
    mutation,
  };
}
