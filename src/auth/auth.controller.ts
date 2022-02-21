import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthLogin } from './models/auth-login.model';
import { AuthRegister } from './models/auth-register.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() authLogin: AuthLogin) {
    return this.authService.login(authLogin);
  }

  @Post('register')
  async register(@Body() authRegister: AuthRegister) {
    return this.authService.register(authRegister);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async test() {
    return 'Success!';
  }
}
