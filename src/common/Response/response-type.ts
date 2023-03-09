export declare class BaseResponseType {
  status: string;
  message: string;
  data: object;
}

export declare class Ok<Type> extends BaseResponseType {}
export declare class BadRequest extends BaseResponseType {}
export declare class NotFound extends BaseResponseType {}
export declare class InternalServerError extends BaseResponseType {}
