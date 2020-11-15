import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'
import { UserRole } from 'src/modules/users/entities/user.entity'
import { AuthType, JWtAuthGuard } from '../guards/jwt-auth.guard'
import { RoleGuard } from '../guards/role-auth.guard'

export const AuthDeclaration = (
  authType?: keyof typeof AuthType,
  roleType?: keyof typeof UserRole
): any => {
  return applyDecorators(
    SetMetadata('auth', authType),
    UseGuards(JWtAuthGuard),
    SetMetadata('roles', roleType),
    UseGuards(RoleGuard)
  )
}
