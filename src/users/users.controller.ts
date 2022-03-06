import { Body, Controller, Get, Post } from '@nestjs/common';

import { Auth } from 'src/shared/decorators/auth.decorator';
import { UsersService } from './users.service';
import { AuthLogin } from './models/auth-login.model';
import { AuthRegister } from './models/auth-register.model';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  async login(@Body() authLogin: AuthLogin) {
    return this.usersService.login(authLogin);
  }

  @Post('register')
  async register(@Body() authRegister: AuthRegister) {
    return this.usersService.register(authRegister);
  }

  @Auth('admin')
  @Get()
  async getUsers(): Promise<any> {
    return this.usersService.getUsers();
  }
}
