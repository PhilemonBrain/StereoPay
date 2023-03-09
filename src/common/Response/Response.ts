import { HttpStatus } from '@nestjs/common';
import { BadRequest, NotFound, Ok, InternalServerError } from './response-type';
export class StereoResponse {
  static Ok<Type>(
    data: Type,
    message = '',
    statusCode = HttpStatus.OK,
  ): Ok<Type> {
    return {
      status: 'success',
      message,
      data: {
        ...data,
        statusCode,
      },
    } as Ok<Type>;
  }

  static OkFailure<Type>(
    data: Type,
    message = '',
    status?: string | number,
    errorCode?: string | number,
  ): Ok<Type> {
    return {
      status,
      data,
      success: false,
      message,
      errorCode,
    } as Ok<Type>;
  }

  static BadRequest(
    error: unknown,
    message = 'Bad Request',
    errorCode = HttpStatus.BAD_REQUEST,
  ): BadRequest {
    return {
      status: 'error',
      message,
      data: { error, errorCode },
    } as BadRequest;
  }

  static NotFoundRequest(
    error: unknown,
    message = 'Not Found',
    errorCode = HttpStatus.NOT_FOUND,
  ): NotFound {
    return {
      status: 'error',
      message,
      data: { error, errorCode },
    } as NotFound;
  }

  static InternalServerError(
    error: unknown,
    message = 'Internal Server Error',
    errorCode = HttpStatus.INTERNAL_SERVER_ERROR,
  ): InternalServerError {
    return {
      status: 'error',
      message,
      data: { error, errorCode },
    } as InternalServerError;
  }

  static Paginated<T>(
    PaginateQueryResponse: T,
    message = '',
    statusCode = HttpStatus.OK,
  ): Ok<T> {
    const { links, data: items, meta }: any = PaginateQueryResponse;
    return {
      status: 'success',
      message,
      data: { statusCode, items, links, meta },
    } as Ok<T>;
  }
}
