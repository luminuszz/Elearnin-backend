import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { PayloadDTO } from '../dtos/payload.interface'

type UserRequest = { req: { user: PayloadDTO } }

export const GqlCurrentUser = createParamDecorator(
  (__, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context)
    const { user } = ctx.getContext<UserRequest>().req

    return user
  }
)
