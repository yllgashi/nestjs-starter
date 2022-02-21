import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import ResponseModel from '../models/response.model';

@Catch(Error)
export class GeneralExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status: number = exception.getStatus() || 400;

    response
      .status(status)
      .json(ResponseModel.error(exception.message || 'Internal server error'));
  }
}
