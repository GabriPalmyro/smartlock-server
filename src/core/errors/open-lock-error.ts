import { HttpException } from '@nestjs/common';

export class LockConnectionError extends HttpException {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
  }
}
