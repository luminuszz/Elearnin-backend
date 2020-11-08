import { CustomDecorator, SetMetadata } from '@nestjs/common'
import { UserRole } from 'src/modules/users/entities/user.entity'

export const Roles = (role: keyof typeof UserRole): CustomDecorator =>
  SetMetadata('roles', role)
