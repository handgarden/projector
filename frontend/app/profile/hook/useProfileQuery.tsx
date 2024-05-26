import { useQuery } from "@apollo/client";
import { graphql } from "../../../gql";

export const GET_PROFILE = graphql(`
  query getProfile {
    user {
      id
      account
      oauthProfiles {
        id
        provider
      }
    }
  }
`);

export function useProfileQuery() {
  const { data, loading, error, refetch } = useQuery(GET_PROFILE);
  return {
    profile: data?.user,
    loading,
    error,
    refetch,
  };
}
