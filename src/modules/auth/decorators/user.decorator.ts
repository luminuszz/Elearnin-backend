import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { PayloadDTO } from '../dtos/payload.interface'

export const UserRequest = createParamDecorator(
  (data: keyof PayloadDTO, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest<{ user: PayloadDTO }>()

    return data ? user[data] : user
  }
)
