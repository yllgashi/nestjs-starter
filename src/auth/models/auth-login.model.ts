import { ApiProperty } from '@nestjs/swagger';

export class AuthLogin {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
