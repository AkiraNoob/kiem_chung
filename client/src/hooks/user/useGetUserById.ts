import { getUserDetailById } from '@/api/user.api';
import useSWR from 'swr';
import { SWRConfiguration } from 'swr/_internal';

const useGetUserById = (userId: string, config?: SWRConfiguration) => {
  return useSWR(`user/${userId}`, () => getUserDetailById(userId), config);
};

export default useGetUserById;
