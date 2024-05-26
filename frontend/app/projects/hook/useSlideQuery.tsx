import { ApolloError, useQuery } from "@apollo/client";
import { graphql } from "../../../gql";
import { GraphQLErrorCode } from "../../../types/graphql/GqlErrorCode.type";

const GET_SLIDE = graphql(`
  query GetSlide($slideId: ID!) {
    slide(slideId: $slideId) {
      id
      seq
      title
      description
      images {
        seq
        file {
          key
          url
          originalName
        }
      }
    }
  }
`);

export default function useSlideQuery({ slideId }: { slideId: string }) {
  const { data, loading } = useQuery(GET_SLIDE, {
    variables: { slideId },
    onError: (e) => {
      const gqlError = (e as ApolloError).graphQLErrors[0];
      if (gqlError.extensions?.code === GraphQLErrorCode.FORBIDDEN) {
        alert("권한이 없습니다.");
        return;
      }
      if (gqlError.extensions?.code === GraphQLErrorCode.NOT_FOUND) {
        alert("슬라이드를 찾을 수 없습니다.");
        return;
      }
      alert("슬라이드를 불러오는 중에 오류가 발생했습니다.");
    },
    fetchPolicy: "network-only",
  });

  return {
    data,
    loading,
  };
}
