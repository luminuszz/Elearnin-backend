import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { PayloadDTO } from 'src/modules/auth/dtos/payload.interface'
import { SubscriberCourseDTO } from '../dtos/subscriberCourse.dto'

@Injectable()
export class MatchUuid implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const sessionUser = context
      .switchToHttp()
      .getRequest<{ user: PayloadDTO }>().user

    const { userId } = context
      .switchToHttp()
      .getRequest<{ body: SubscriberCourseDTO }>().body

    if (sessionUser.id !== userId) {
      throw new UnauthorizedException('This id not with session User')
    }

    return true
  }
}
