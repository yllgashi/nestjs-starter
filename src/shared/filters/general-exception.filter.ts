import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import ResponseModel from '../models/response.model';

@Catch(Error)
export class GeneralExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status: number = exception.getStatus ? exception.getStatus() : 500;

    // check for HttpException exceptions
    let message = exception.message;

    // check for class-validator exceptions
    message = exception.getResponse().message
      ? exception.getResponse().message.toString()
      : message;

    response.status(status).json(ResponseModel.error(message));
  }
}
