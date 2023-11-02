import { EHttpStatus } from '../constant/statusCode';

export type TServiceResponseType<T = unknown> = { statusCode: EHttpStatus; data: T | unknown | null; message?: string };
