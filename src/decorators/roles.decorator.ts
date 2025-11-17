import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/enums/roles.enum';

export const roles = (...roles: Role[]) => SetMetadata('roles', roles);
