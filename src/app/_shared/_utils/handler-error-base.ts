import { BaseExceptions } from '../_exceptions/base-exceptions';

export function handlerErrorBase(error: any) {
  console.error(error);

  if (typeof error === 'object' && error?.error?.statusCode && 'message' in error?.error && 'name' in error?.error) {
    return error.error as BaseExceptions;
  }

  return;
}
