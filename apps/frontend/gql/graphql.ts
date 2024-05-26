/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** LocalDateTime custom scalar type */
  LocalDateTime: { input: any; output: any; }
};

export type CreateProjectInput = {
  description: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateSlideImageInput = {
  key: Scalars['ID']['input'];
  seq: Scalars['Int']['input'];
};

export type CreateSlideInput = {
  description: Scalars['String']['input'];
  images: Array<InputMaybe<CreateSlideImageInput>>;
  projectId: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProject: Project;
  createSlide: Slide;
  deleteProject: Scalars['Boolean']['output'];
  deleteSlide: Scalars['Boolean']['output'];
  updateProject: Project;
  updateSlide: Slide;
};


export type MutationCreateProjectArgs = {
  project: CreateProjectInput;
};


export type MutationCreateSlideArgs = {
  slide: CreateSlideInput;
};


export type MutationDeleteProjectArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteSlideArgs = {
  slideId: Scalars['ID']['input'];
};


export type MutationUpdateProjectArgs = {
  id: Scalars['ID']['input'];
  project: CreateProjectInput;
};


export type MutationUpdateSlideArgs = {
  slide: UpdateSlideInput;
};

export type OAuthProfile = {
  __typename?: 'OAuthProfile';
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  provider: OAuthProvider;
};

/** OAuth provider */
export enum OAuthProvider {
  Github = 'GITHUB'
}

export type PaginatedProjectModel = {
  __typename?: 'PaginatedProjectModel';
  hasNext: Scalars['Boolean']['output'];
  items: Array<Project>;
  total: Scalars['Int']['output'];
};

export type PaginationInput = {
  page?: Scalars['Int']['input'];
  size?: Scalars['Int']['input'];
};

export type Project = {
  __typename?: 'Project';
  createdAt: Scalars['LocalDateTime']['output'];
  creator: User;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  slides: Array<Slide>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['LocalDateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  project: Project;
  projectsPageable: PaginatedProjectModel;
  projectsScrollable: PaginatedProjectModel;
  slide: Slide;
  uploadFile: UploadFile;
  uploadFiles: Array<UploadFile>;
  user: User;
};


export type QueryProjectArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProjectsPageableArgs = {
  pageable?: InputMaybe<PaginationInput>;
};


export type QueryProjectsScrollableArgs = {
  scrollable?: InputMaybe<ScrollableInput>;
};


export type QuerySlideArgs = {
  slideId: Scalars['ID']['input'];
};


export type QueryUploadFileArgs = {
  key: Scalars['String']['input'];
};


export type QueryUploadFilesArgs = {
  keys: Array<Scalars['String']['input']>;
};

export type ScrollableInput = {
  lastKey?: InputMaybe<Scalars['ID']['input']>;
  size: Scalars['Int']['input'];
};

export type Slide = {
  __typename?: 'Slide';
  createdAt: Scalars['LocalDateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  images: Array<SlideImage>;
  seq: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['LocalDateTime']['output'];
};

export type SlideImage = {
  __typename?: 'SlideImage';
  file: UploadFile;
  seq: Scalars['Int']['output'];
};

export type UpdateSlideInput = {
  description: Scalars['String']['input'];
  images: Array<InputMaybe<CreateSlideImageInput>>;
  projectId: Scalars['Int']['input'];
  slideId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};

export type UploadFile = {
  __typename?: 'UploadFile';
  bucket: Scalars['String']['output'];
  createdAt: Scalars['LocalDateTime']['output'];
  key: Scalars['ID']['output'];
  originalName: Scalars['String']['output'];
  updatedAt: Scalars['LocalDateTime']['output'];
  uploader: User;
  url: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  account: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  oauthProfiles: Array<Maybe<OAuthProfile>>;
};

export type GetProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfileQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, account: string, oauthProfiles: Array<{ __typename?: 'OAuthProfile', id: string, provider: OAuthProvider } | null> } };

export type CreateProjectMutationVariables = Exact<{
  input: CreateProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', id: string, title: string, description: string, thumbnail?: string | null } };

export type DeleteProjectMutationVariables = Exact<{
  projectId: Scalars['ID']['input'];
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteProject: boolean };

export type GetProjectsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetProjectsQuery = { __typename?: 'Query', projects: { __typename?: 'PaginatedProjectModel', hasNext: boolean, items: Array<{ __typename?: 'Project', id: string, title: string, description: string, thumbnail?: string | null }> } };

export type GetProjectQueryVariables = Exact<{
  projectId: Scalars['ID']['input'];
}>;


export type GetProjectQuery = { __typename?: 'Query', project: { __typename?: 'Project', id: string, title: string, description: string, creator: { __typename?: 'User', id: string }, slides: Array<{ __typename?: 'Slide', id: string, seq: number, title: string, description: string, images: Array<{ __typename?: 'SlideImage', seq: number, file: { __typename?: 'UploadFile', key: string, url: string } }> }> } };

export type UpdateProjectMutationVariables = Exact<{
  projectId: Scalars['ID']['input'];
  input: CreateProjectInput;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject: { __typename?: 'Project', id: string, title: string, description: string } };

export type CreateSlideMutationVariables = Exact<{
  input: CreateSlideInput;
}>;


export type CreateSlideMutation = { __typename?: 'Mutation', createSlide: { __typename?: 'Slide', id: string, seq: number, title: string, description: string, images: Array<{ __typename?: 'SlideImage', seq: number, file: { __typename?: 'UploadFile', key: string, url: string } }> } };

export type DeleteSlideMutationVariables = Exact<{
  slideId: Scalars['ID']['input'];
}>;


export type DeleteSlideMutation = { __typename?: 'Mutation', deleteSlide: boolean };

export type GetSlideQueryVariables = Exact<{
  slideId: Scalars['ID']['input'];
}>;


export type GetSlideQuery = { __typename?: 'Query', slide: { __typename?: 'Slide', id: string, seq: number, title: string, description: string, images: Array<{ __typename?: 'SlideImage', seq: number, file: { __typename?: 'UploadFile', key: string, url: string, originalName: string } }> } };

export type UpdateSlideMutationVariables = Exact<{
  input: UpdateSlideInput;
}>;


export type UpdateSlideMutation = { __typename?: 'Mutation', updateSlide: { __typename?: 'Slide', id: string, title: string, description: string } };


export const GetProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"account"}},{"kind":"Field","name":{"kind":"Name","value":"oauthProfiles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"provider"}}]}}]}}]}}]} as unknown as DocumentNode<GetProfileQuery, GetProfileQueryVariables>;
export const CreateProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateProjectInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"project"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}}]}}]}}]} as unknown as DocumentNode<CreateProjectMutation, CreateProjectMutationVariables>;
export const DeleteProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}]}]}}]} as unknown as DocumentNode<DeleteProjectMutation, DeleteProjectMutationVariables>;
export const GetProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProjects"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"1"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"size"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"projects"},"name":{"kind":"Name","value":"projectsPageable"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pageable"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"size"},"value":{"kind":"Variable","name":{"kind":"Name","value":"size"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hasNext"}}]}}]}}]} as unknown as DocumentNode<GetProjectsQuery, GetProjectsQueryVariables>;
export const GetProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"project"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"slides"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"seq"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seq"}},{"kind":"Field","name":{"kind":"Name","value":"file"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetProjectQuery, GetProjectQueryVariables>;
export const UpdateProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateProjectInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}},{"kind":"Argument","name":{"kind":"Name","value":"project"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const CreateSlideDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createSlide"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSlideInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSlide"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slide"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"seq"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seq"}},{"kind":"Field","name":{"kind":"Name","value":"file"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateSlideMutation, CreateSlideMutationVariables>;
export const DeleteSlideDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteSlide"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slideId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteSlide"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slideId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slideId"}}}]}]}}]} as unknown as DocumentNode<DeleteSlideMutation, DeleteSlideMutationVariables>;
export const GetSlideDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSlide"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slideId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slide"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slideId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slideId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"seq"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seq"}},{"kind":"Field","name":{"kind":"Name","value":"file"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"originalName"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetSlideQuery, GetSlideQueryVariables>;
export const UpdateSlideDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateSlide"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateSlideInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSlide"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slide"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<UpdateSlideMutation, UpdateSlideMutationVariables>;