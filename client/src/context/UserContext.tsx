'use client';
import useGetMe from '@/hooks/user/useGetMe';
import { TUserContext } from '@/types/context';
import { createContext } from 'react';

const defaultContextValue: TUserContext = {
  isLogin: false,
};

export const userContext = createContext<TUserContext>(defaultContextValue);

const UserContextProvider = ({ children }: { children?: React.ReactNode }) => {
  const { data, error } = useGetMe();

  return (
    <userContext.Provider
      value={{
        isLogin: !!data && !error,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
