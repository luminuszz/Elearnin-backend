import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  UnauthorizedException,
} from '@nestjs/common'
import { CreateUserDto } from '../dtos/createUserDto'
import { UsersService } from '../services/users.service'

@Injectable()
export class VerifyEmail implements PipeTransform {
  constructor(private readonly userService: UsersService) {}

  public async transform(
    value: CreateUserDto,
    metadata: ArgumentMetadata
  ): Promise<CreateUserDto> {
    const result = await this.userService.FindByEmail(value.email)

    if (result) {
      throw new UnauthorizedException('this user already exists')
    }

    return value
  }
}
