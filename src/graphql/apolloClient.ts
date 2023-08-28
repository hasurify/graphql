import {
  ApolloClient,
  ApolloQueryResult,
  createHttpLink,
  FetchResult,
  InMemoryCache,
  MutationOptions,
  NormalizedCacheObject,
  OperationVariables,
  QueryOptions,
} from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import 'cross-fetch/polyfill';

const adminSecret = process.env.ADMIN_SECRET;
const hgeEndpoint = process.env.HGE_ENDPOINT;

type AuthHeader = {
  'x-hasura-organization-id'?: string;
  'x-hasura-user-id'?: string;
  'x-hasura-role'?: string;
};

export const getDefaultAuthorizationHeaders = (
  organizationId?: number,
  userId?: number
) => {
  let headers = {};
  if (userId) {
    headers = {
      ...headers,
      'x-hasura-user-id': userId.toString(),
    };
  }

  if (organizationId) {
    headers = {
      ...headers,
      'x-hasura-organization-id': organizationId.toString(),
    };
  }

  return headers;
};

// Get apollo client object
const getClient = (url?: string): ApolloClient<NormalizedCacheObject> => {
  const uri = `${url || hgeEndpoint}/v1/graphql`;
  const httpLink = createHttpLink({
    uri,
  });
  const authLink = setContext((request, { headers: h }) => ({
    headers: {
      ...h,
      'x-hasura-admin-secret': adminSecret,
      'x-hasura-default-role': 'WORKER',
    },
  }));
  return new ApolloClient({
    uri,
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });
};

// eslint-disable-next-line
export const query = <T = any, TVariables = OperationVariables>(
  options: QueryOptions<OperationVariables, T>,
  headers?: AuthHeader,
  url?: string
): Promise<ApolloQueryResult<T>> => {
  return getClient(url || hgeEndpoint).query({
    ...options,
    context: {
      headers: headers || {},
    },
  });
};

// eslint-disable-next-line
export const mutate = <T = any, TVariables = OperationVariables>(
  options: MutationOptions<T, OperationVariables>,
  headers?: AuthHeader,
  url?: string
): Promise<FetchResult<T>> => {
  return getClient(url || hgeEndpoint).mutate({
    ...options,
    context: {
      headers: headers || {},
    },
  });
};
