import { BaseExceptions } from '../app/_exceptions/base-exceptions';

export function handlerErrorBase(error: any) {
  if (
    typeof error === 'object' &&
    'statusCode' in error?.error &&
    'message' in error?.error &&
    'name' in error?.error
  ) {
    return error.error as BaseExceptions;
  }

  return;
}
