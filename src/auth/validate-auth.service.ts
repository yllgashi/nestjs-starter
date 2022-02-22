import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthLogin } from './models/auth-login.model';
import { AuthRegister } from './models/auth-register.model';
import AuthValidators from './validators/auth.validator';

@Injectable()
export class ValidateAuthService {
  constructor(private readonly productValidators: AuthValidators) {}

  validateLoginUser(user: AuthLogin): void {
    const { error } = this.productValidators.loginUserSchema.validate(user);
    if (error)
      throw new HttpException(error.message, HttpStatus.NOT_ACCEPTABLE);
  }

  validateRegisterUser(user: AuthRegister): void {
    const { error } = this.productValidators.loginUserSchema.validate(user);
    if (error)
      throw new HttpException(error.message, HttpStatus.NOT_ACCEPTABLE);
  }
}
