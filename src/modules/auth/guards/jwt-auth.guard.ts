import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { Observable } from 'rxjs'

export enum AuthType {
  jwt = 'jwt',
}

@Injectable()
export class JWtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super()
  }

  public canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const authType = this.reflector.get<string>('auth', context.getHandler())

    if (!AuthType[authType]) {
      return true
    }

    return super.canActivate(context)
  }

  public handleRequest<User>(err: Error, user: User, _info: string): User {
    if (err || !user) {
      throw (
        err ||
        new UnauthorizedException({ message: 'token not found', info: _info })
      )
    }
    return user
  }
}
