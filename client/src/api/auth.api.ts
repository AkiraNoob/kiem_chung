import httpRequest from '@/service/httpRequest';
import { TAuthLogin, TAuthRegister } from '@/types/auth';

export const postLogin = (body: TAuthLogin) => httpRequest.post<string>('/auth/login', body);
export const postRegister = (body: TAuthRegister) => httpRequest.post<string>('/auth/register', body);
export const postLogout = () => httpRequest.post<string>(`/auth/logout`, null);
export const postRefreshToken = () => httpRequest.post<string>(`/auth/refreshToken`, null);
