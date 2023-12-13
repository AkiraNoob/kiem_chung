import httpRequest from '@/service/httpRequest';

export const getUserDetailById = (id: string) => httpRequest.get(`/user/${id}`);
export const getMe = () => httpRequest.get(`/user/me`);
