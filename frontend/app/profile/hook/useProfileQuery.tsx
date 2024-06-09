import { useQuery } from "@apollo/client";
import { graphql } from "../../../gql";

export const GET_PROFILE = graphql(`
  query getProfile {
    oauthProfiles {
      id
      provider
    }
  }
`);

export function useProfileQuery() {
  const { data, loading, error, refetch } = useQuery(GET_PROFILE);
  return {
    profile: data?.oauthProfiles,
    loading,
    error,
    refetch,
  };
}
