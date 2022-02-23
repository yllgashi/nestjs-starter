import { SetMetadata } from '@nestjs/common';

import { applyDecorators, UseGuards } from '@nestjs/common';
import { RolesGuard } from './roles.guard';

export function Roles(...roles: string[]) {
  return applyDecorators(SetMetadata('roles', roles), UseGuards(RolesGuard));
}
