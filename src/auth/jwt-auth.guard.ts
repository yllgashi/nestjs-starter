import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// JwtAuthGuard will call JwtStrategy to check if jwt is valid
// in that case it allows to enter that specific route
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
