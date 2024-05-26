/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query getProfile {\n    user {\n      id\n      account\n      oauthProfiles {\n        id\n        provider\n      }\n    }\n  }\n": types.GetProfileDocument,
    "\n  mutation createProject($input: CreateProjectInput!) {\n    createProject(project: $input) {\n      id\n      title\n      description\n      thumbnail\n    }\n  }\n": types.CreateProjectDocument,
    "\n  mutation deleteProject($projectId: ID!) {\n    deleteProject(id: $projectId)\n  }\n": types.DeleteProjectDocument,
    "\n    query getProjects($page: Int = 1, $size: Int = 10) {\n      projects: projectsPageable(pageable: { page: $page, size: $size }) {\n        items {\n          id\n          title\n          description\n          thumbnail\n        }\n        hasNext\n      }\n    }\n  ": types.GetProjectsDocument,
    "\n  query getProject($projectId: ID!) {\n    project(id: $projectId) {\n      id\n      creator {\n        id\n      }\n      title\n      description\n      slides {\n        id\n        seq\n        title\n        description\n        images {\n          seq\n          file {\n            key\n            url\n          }\n        }\n      }\n    }\n  }\n": types.GetProjectDocument,
    "\n  mutation updateProject($projectId: ID!, $input: CreateProjectInput!) {\n    updateProject(id: $projectId, project: $input) {\n      id\n      title\n      description\n    }\n  }\n": types.UpdateProjectDocument,
    "\n  mutation createSlide($input: CreateSlideInput!) {\n    createSlide(slide: $input) {\n      id\n      seq\n      title\n      description\n      images {\n        seq\n        file {\n          key\n          url\n        }\n      }\n    }\n  }\n": types.CreateSlideDocument,
    "\n  mutation deleteSlide($slideId: ID!) {\n    deleteSlide(slideId: $slideId)\n  }\n": types.DeleteSlideDocument,
    "\n  query GetSlide($slideId: ID!) {\n    slide(slideId: $slideId) {\n      id\n      seq\n      title\n      description\n      images {\n        seq\n        file {\n          key\n          url\n          originalName\n        }\n      }\n    }\n  }\n": types.GetSlideDocument,
    "\n  mutation updateSlide($input: UpdateSlideInput!) {\n    updateSlide(slide: $input) {\n      id\n      title\n      description\n    }\n  }\n": types.UpdateSlideDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getProfile {\n    user {\n      id\n      account\n      oauthProfiles {\n        id\n        provider\n      }\n    }\n  }\n"): (typeof documents)["\n  query getProfile {\n    user {\n      id\n      account\n      oauthProfiles {\n        id\n        provider\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createProject($input: CreateProjectInput!) {\n    createProject(project: $input) {\n      id\n      title\n      description\n      thumbnail\n    }\n  }\n"): (typeof documents)["\n  mutation createProject($input: CreateProjectInput!) {\n    createProject(project: $input) {\n      id\n      title\n      description\n      thumbnail\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteProject($projectId: ID!) {\n    deleteProject(id: $projectId)\n  }\n"): (typeof documents)["\n  mutation deleteProject($projectId: ID!) {\n    deleteProject(id: $projectId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getProjects($page: Int = 1, $size: Int = 10) {\n      projects: projectsPageable(pageable: { page: $page, size: $size }) {\n        items {\n          id\n          title\n          description\n          thumbnail\n        }\n        hasNext\n      }\n    }\n  "): (typeof documents)["\n    query getProjects($page: Int = 1, $size: Int = 10) {\n      projects: projectsPageable(pageable: { page: $page, size: $size }) {\n        items {\n          id\n          title\n          description\n          thumbnail\n        }\n        hasNext\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getProject($projectId: ID!) {\n    project(id: $projectId) {\n      id\n      creator {\n        id\n      }\n      title\n      description\n      slides {\n        id\n        seq\n        title\n        description\n        images {\n          seq\n          file {\n            key\n            url\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getProject($projectId: ID!) {\n    project(id: $projectId) {\n      id\n      creator {\n        id\n      }\n      title\n      description\n      slides {\n        id\n        seq\n        title\n        description\n        images {\n          seq\n          file {\n            key\n            url\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateProject($projectId: ID!, $input: CreateProjectInput!) {\n    updateProject(id: $projectId, project: $input) {\n      id\n      title\n      description\n    }\n  }\n"): (typeof documents)["\n  mutation updateProject($projectId: ID!, $input: CreateProjectInput!) {\n    updateProject(id: $projectId, project: $input) {\n      id\n      title\n      description\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createSlide($input: CreateSlideInput!) {\n    createSlide(slide: $input) {\n      id\n      seq\n      title\n      description\n      images {\n        seq\n        file {\n          key\n          url\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation createSlide($input: CreateSlideInput!) {\n    createSlide(slide: $input) {\n      id\n      seq\n      title\n      description\n      images {\n        seq\n        file {\n          key\n          url\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteSlide($slideId: ID!) {\n    deleteSlide(slideId: $slideId)\n  }\n"): (typeof documents)["\n  mutation deleteSlide($slideId: ID!) {\n    deleteSlide(slideId: $slideId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetSlide($slideId: ID!) {\n    slide(slideId: $slideId) {\n      id\n      seq\n      title\n      description\n      images {\n        seq\n        file {\n          key\n          url\n          originalName\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetSlide($slideId: ID!) {\n    slide(slideId: $slideId) {\n      id\n      seq\n      title\n      description\n      images {\n        seq\n        file {\n          key\n          url\n          originalName\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateSlide($input: UpdateSlideInput!) {\n    updateSlide(slide: $input) {\n      id\n      title\n      description\n    }\n  }\n"): (typeof documents)["\n  mutation updateSlide($input: UpdateSlideInput!) {\n    updateSlide(slide: $input) {\n      id\n      title\n      description\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;