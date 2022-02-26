import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import ResponseModel from '../models/response.model';

@Catch(Error)
export class GeneralExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status: number = exception.getStatus ? exception.getStatus() : 500;

    // call toString() method in case error is from class-validator
    // in that case message is an array[] so we need to convert to string
    const message = exception.getResponse().message.toString();

    response
      .status(status)
      .json(ResponseModel.error(message ?? 'Internal server error'));
  }
}
