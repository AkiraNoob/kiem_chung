import { postLogout } from '@/api/auth.api';
import { parseErrorMessage } from '@/helper/parseErrorMessage';
import { TError } from '@/types/generic';
import { toast } from 'react-toastify';
import { Key } from 'swr';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

const useLogout = (config?: SWRMutationConfiguration<string, TError>) => {
  return useSWRMutation<string, TError, Key, unknown, unknown>('user', postLogout, {
    ...config,
    onError(_err, _key, _config) {
      const msg = parseErrorMessage(_err);
      if (Array.isArray(msg)) {
        return msg.map((item) => toast(item));
      }

      return toast(msg);
    },
  });
};

export default useLogout;
