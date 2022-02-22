import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthLogin } from './models/auth-login.model';
import { AuthRegister } from './models/auth-register.model';
import { ValidateAuthService } from './validate-auth.service';
import User from 'src/users/models/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly validateAuthService: ValidateAuthService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginUser: AuthLogin) {
    this.validateAuthService.validateLoginUser(loginUser);

    const user: User = await this.getUserByEmail(loginUser.email);
    if (!user)
      throw new HttpException('User does not exists', HttpStatus.NOT_FOUND);

    const jwtData = { userId: user.id, email: user.email, roles: user.roles };

    return {
      access_token: this.jwtService.sign(jwtData),
    };
  }

  async register(registerUser: AuthRegister) {
    this.validateAuthService.validateRegisterUser(registerUser);

    const userExists: User = await this.getUserByEmail(registerUser.email);
    if (userExists)
      throw new HttpException('User already exists', HttpStatus.CONFLICT);

    const user: User = await this.usersService.createUser({
      email: registerUser.email,
      password: registerUser.password,
      roles: ['client'],
      id: Date.now().toString(),
    });

    if (!user)
      throw new HttpException(
        'User is not created',
        HttpStatus.SERVICE_UNAVAILABLE,
      );

    const jwtData = { userId: user.id, email: user.email, roles: user.roles };

    return {
      access_token: this.jwtService.sign(jwtData),
    };
  }

  async getUserByEmail(email: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    return user;
  }
}
