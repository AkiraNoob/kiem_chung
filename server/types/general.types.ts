import { EHttpStatus } from '../common/statusCode';

export type TServiceResponseType<T = unknown> = { statusCode: EHttpStatus; data: T };
