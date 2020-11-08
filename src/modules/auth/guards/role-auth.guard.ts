import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { PayloadDTO } from '../dtos/payload.interface'
import { AdminUserService } from 'src/modules/users/services/adminUsers.service'
import { UserRole } from 'src/modules/users/entities/user.entity'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly usersService: AdminUserService,
    private readonly reflector: Reflector
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const role = this.reflector.get<string>('roles', context.getHandler())

    if (!role || UserRole[role] !== 'admin') {
      return true
    }

    const { id } = context
      .switchToHttp()
      .getRequest<{ user: PayloadDTO }>().user

    const verifyUserAdmin = await this.usersService.findAdminUserById(id)

    console.log(verifyUserAdmin)

    if (!verifyUserAdmin) {
      throw new UnauthorizedException('Only admins can access this endpoint')
    }

    return true
  }
}
