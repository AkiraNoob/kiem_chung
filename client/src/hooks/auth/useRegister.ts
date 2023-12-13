import { postRegister } from '@/api/auth.api';
import { parseErrorMessage } from '@/helper/parseErrorMessage';
import { TAuthRegister } from '@/types/auth';
import { TError } from '@/types/generic';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Key } from 'swr';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

const useRegister = (config?: SWRMutationConfiguration<string, TError>) => {
  const router = useRouter();
  return useSWRMutation<string, TError, Key, TAuthRegister, TAuthRegister>(
    'register',
    async (_: string, { arg }: { arg: TAuthRegister }) => postRegister(arg),
    {
      ...config,
      onSuccess(data, key, config) {
        toast('Đăng kí thành công');
        router.push('/login');
      },
      onError(err, key, config) {
        const msg = parseErrorMessage(err, {
          mapFieldName: {
            fullName: 'Họ và tên',
            password: 'Mật khẩu',
            email: 'Email',
          },
        });
        if (Array.isArray(msg)) {
          return msg.map((item) => toast(item));
        }

        return toast(msg);
      },
    }
  );
};

export default useRegister;
