import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthLogin } from './models/auth-login.model';
import { AuthRegister } from './models/auth-register.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginUser: AuthLogin) {
    // validate user with joi
    // ...

    const user = await this.validateUser(loginUser);

    const jwtData = {
      email: user.email,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(jwtData),
    };
  }

  async register(registerUser: AuthRegister) {
    // validate user with joi
    // ...

    const user = await this.usersService.createUser({
      email: registerUser.email,
      password: registerUser.password,
      role: 'client',
      id: Date.now().toString(),
    });

    await this.validateUser(user);

    const jwtData = {
      email: user.email,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(jwtData),
    };
  }

  async validateUser(loginUser: AuthLogin): Promise<any> {
    const user = await this.usersService.findByEmail(loginUser.email);

    if (user && user.password === loginUser.password) {
      const { password, ...result } = user;
      return result;
    }
    throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
  }
}
