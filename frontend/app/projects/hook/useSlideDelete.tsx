import { useMutation } from "@apollo/client";
import { graphql } from "../../../gql";

const DELETE_SLIDE = graphql(`
  mutation deleteSlide($projectId: ID!, $slideId: ID!) {
    deleteSlide(projectId: $projectId, slideId: $slideId)
  }
`);

export default function useSlideDelete() {
  const [mutate] = useMutation(DELETE_SLIDE);

  return {
    mutate,
  };
}
