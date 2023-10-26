import { EHttpStatus } from '../common/statusCode';

class AppError extends Error {
  statusCode: EHttpStatus;
  isOperation: boolean;
  type: undefined;

  constructor(statusCode: EHttpStatus, message: string, isOperation?: boolean, type = undefined) {
    super();

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }

    this.statusCode = statusCode;
    this.message = message;
    this.isOperation = !!isOperation;
    this.type = type;
  }
}

export default AppError;
