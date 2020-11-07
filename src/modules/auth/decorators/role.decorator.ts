import { CustomDecorator, SetMetadata } from '@nestjs/common'

export const Roles = (role: string): CustomDecorator =>
  SetMetadata('roles', role)
