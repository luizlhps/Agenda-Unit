import { BaseExceptions } from '../app/_exceptions/base-exceptions';

export function handlerErrorBase(error: any) {
  if (typeof error === 'object' && 'statusCode' in error && 'message' in error && 'name' in error) {
    return error as BaseExceptions;
  }

  return;
}
