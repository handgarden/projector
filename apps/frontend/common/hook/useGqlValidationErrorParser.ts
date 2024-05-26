import { ApolloError } from "@apollo/client";
import { GqlValidationError } from "../../types/graphql/GqlValidationError.type";
import { ResponseStatus } from "../../types/api/RestTemplate.type";

export default function useGqlValidationErrorParser() {
  const parse = (error: ApolloError): string | null => {
    const firstError = error.graphQLErrors[0];
    const firstExtensions = firstError.extensions as GqlValidationError;
    if (firstExtensions.code !== ResponseStatus.BAD_PARAMETER) {
      return null;
    }
    const firstValidationError = firstExtensions.data[0];
    const firstConstraint = firstValidationError.constraints[0];
    return `${firstValidationError.property} ${firstValidationError.value} ${firstConstraint.message}`;
  };

  return {
    parse,
  };
}
