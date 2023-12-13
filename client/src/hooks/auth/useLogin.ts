import { postLogin } from '@/api/auth.api';
import { parseErrorMessage } from '@/helper/parseErrorMessage';
import { TAuthLogin } from '@/types/auth';
import { TError } from '@/types/generic';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Key } from 'swr';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

const useLogin = (config?: SWRMutationConfiguration<string, TError>) => {
  const router = useRouter();

  return useSWRMutation<string, TError, Key, TAuthLogin, TAuthLogin>(
    'user',
    async (_: string, { arg }: { arg: TAuthLogin }) => postLogin(arg),
    {
      ...config,
      onSuccess(_data, _key, _config) {
        toast('Đăng nhập thành công');
        router.push('/');
      },
      onError(_err, _key, _config) {
        const msg = parseErrorMessage(_err, {
          mapFieldName: {
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

export default useLogin;
