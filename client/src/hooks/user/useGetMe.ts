import { getMe } from '@/api/user.api';
import useSWR, { SWRConfiguration } from 'swr';

const useGetMe = (config?: SWRConfiguration) => {
  return useSWR('user', getMe, config);
};

export default useGetMe;
