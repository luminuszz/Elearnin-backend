import { UseGuards, Request } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { AuthService } from '../services/auth.service'
import { ValidateUserDTo } from '../dtos/ValidateUserDTO'
import { LoginReturn } from '../dtos/ValidateReturn.dto'

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginReturn)
  public async login(
    @Args('values') data: ValidateUserDTo
  ): Promise<LoginReturn> {
    const response = await this.authService.ValidateUserToken(data)

    return response
  }
}
