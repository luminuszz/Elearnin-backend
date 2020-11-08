import { CustomDecorator, SetMetadata } from '@nestjs/common'
import { AuthType } from '../guards/jwt-auth.guard'

export const Auth = (authType: keyof typeof AuthType): CustomDecorator =>
  SetMetadata('auth', authType)
