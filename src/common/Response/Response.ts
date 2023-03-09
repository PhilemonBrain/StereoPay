import { HttpStatus } from '@nestjs/common';
import { BadRequest, NotFound, Ok, InternalServerError } from './response-type';
export class StereoResponse {
  static Ok<Type>(
    data: Type,
    message = '',
    status?: string | number,
  ): Ok<Type> {
    return {
      status,
      data,
      success: true,
      message,
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
    status = 'failed',
  ): BadRequest {
    return {
      status,
      error,
      success: false,
      message,
      errorCode,
    } as BadRequest;
  }

  static NotFoundRequest(
    error: unknown,
    message = 'Not Found',
    errorCode = HttpStatus.NOT_FOUND,
    status = 'failed',
  ): NotFound {
    return {
      status,
      error,
      success: false,
      message,
      errorCode,
    } as NotFound;
  }

  static InternalServerError(
    error: unknown,
    message = 'Internal Server Error',
    errorCode = HttpStatus.INTERNAL_SERVER_ERROR,
    status = 'failed',
  ): InternalServerError {
    return {
      status,
      error,
      success: false,
      message,
      errorCode,
    } as InternalServerError;
  }

  static Paginated<T>(array: T, message = '', status?: string | number): Ok<T> {
    const { links, data, meta }: any = array;
    return {
      status,
      success: true,
      data,
      meta,
      links,
      message,
    } as Ok<T>;
  }
}
