import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../entities/user.entity'
import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  UnauthorizedException,
} from '@nestjs/common'
import { CreateUserDto } from '../dtos/createUserDto'
import { Repository } from 'typeorm'

@Injectable()
export class VerifyEmail implements PipeTransform {
  constructor(
    @InjectRepository(User)
    private readonly adminUserRepository: Repository<User>
  ) {}

  public async transform(
    value: CreateUserDto,
    metadata: ArgumentMetadata
  ): Promise<CreateUserDto> {
    const result = await this.adminUserRepository.findOne({
      where: { email: value.email },
    })

    console.log(metadata)

    if (result) {
      throw new UnauthorizedException('this user already exists')
    }

    return value
  }
}
