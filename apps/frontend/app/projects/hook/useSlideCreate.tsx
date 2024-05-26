import { useMutation } from "@apollo/client";
import { graphql } from "../../../gql";
import { GET_PROJECTS } from "./useProjectListQuery";

const CREATE_SLIDE = graphql(`
  mutation createSlide($input: CreateSlideInput!) {
    createSlide(slide: $input) {
      id
      seq
      title
      description
      images {
        seq
        file {
          key
          url
        }
      }
    }
  }
`);

export default function useSlideCreate() {
  const [mutate] = useMutation(CREATE_SLIDE, {
    refetchQueries: [GET_PROJECTS],
  });
  return {
    mutate,
  };
}
