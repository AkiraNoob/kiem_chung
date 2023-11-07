import { EHttpStatus } from '../constant/statusCode';

export type TServiceResponseType<T = null> = { statusCode: EHttpStatus; data: T; message?: string };
