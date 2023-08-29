import { gql } from '@apollo/client/core';

export const USER_FRAGMENT = gql`
  fragment user_fragment on users {
    id
    first_name
    last_name
    title
    email
    password
    skype
    mobile
    work_phone
    is_active
    role
  }
`;

export const GET_USER = gql`
  ${USER_FRAGMENT}
  query GetUser($user_id: Int!) {
    users_by_pk(id: $user_id) {
      ...user_fragment
    }
  }
`;

export const UPDATE_USER = gql`
  ${USER_FRAGMENT}
  mutation UpdateUser($id: Int!, $input: users_set_input!) {
    update_users_by_pk(pk_columns: { id: $id }, _set: $input) {
      ...user_fragment
    }
  }
`;

export const GET_USER_BY_EMAIL = gql`
  ${USER_FRAGMENT}
  query GetUserByEmail($email: String!) {
    users(where: { email: { _eq: $email } }) {
      ...user_fragment
    }
  }
`;

export const UPSERT_USER = gql`
  mutation UpsertUser($input: users_insert_input!) {
    insert_users_one(
      object: $input
      on_conflict: {
        constraint: users_pkey
        update_columns: [
          updated_at
          first_name
          last_name
          skype
          mobile
          work_phone
        ]
      }
    ) {
      email
      first_name
      is_active
      last_name
      mobile
      password
      role
      skype
      title
      work_phone
    }
  }
`;
