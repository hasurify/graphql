import { GET_USER, mutate, query, UPDATE_USER } from '..';
import { BadRequestError } from '@hasurify/util';
import { Users, UsersSetInput } from '../../shared/generated';

export const getUser = async (userId: Number): Promise<Users> => {
  const { data } = await query<{ users_by_pk: Users }>({
    query: GET_USER,
    variables: { user_id: userId },
  });

  if (!data?.users_by_pk) {
    throw new BadRequestError('User not found', 400, 'user.user_not_found');
  }

  return data.users_by_pk;
};

/**
 * Update user by ID
 * @author Ken Le <ken@kenstack.io>
 *
 * @param {number} id The ID of user which will be updated
 * @param {UsersSetInput} input The fields which will be updated
 * @returns Users | null
 */
export const updateUser = async (
  id: number,
  input: UsersSetInput
): Promise<Users | null> => {
  const { data } = await mutate<{ update_users_by_pk: Users }>({
    mutation: UPDATE_USER,
    variables: { id, input },
  });

  return data?.update_users_by_pk || null;
};
