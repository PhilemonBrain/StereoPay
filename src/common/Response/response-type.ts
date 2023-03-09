import { HttpStatus } from '@nestjs/common';

export declare class BaseResponseType {
  status: string;
  success: boolean;
  message: string;
}

export declare class BaseErrorResponseType extends BaseResponseType {
  error?: unknown;
  errorCode?: HttpStatus;
}
export declare class Ok<Type> extends BaseResponseType {
  data?: Type;
}
export declare class BadRequest extends BaseErrorResponseType {}
export declare class NotFound extends BaseErrorResponseType {}
export declare class InternalServerError extends BaseErrorResponseType {}
