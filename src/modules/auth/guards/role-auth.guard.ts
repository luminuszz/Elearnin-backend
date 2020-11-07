import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { PayloadDTO } from '../dtos/payload.interface'
import { AdminUserService } from 'src/modules/users/services/adminUsers.service'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly usersService: AdminUserService,
    private readonly reflector: Reflector
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const { id } = context
      .switchToHttp()
      .getRequest<{ user: PayloadDTO }>().user

    const role = this.reflector.get<string>('roles', context.getHandler())

    if (role !== 'admin' || !role) {
      return true
    }

    const user = await this.usersService.findAdminUserById(id)

    if (user && user.role === 'admin') {
      return true
    } else {
      throw new UnauthorizedException('Only admins can access this endpoint')
    }
  }
}
