import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../entities/user.entity'
import {
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

  public async transform(value: CreateUserDto): Promise<CreateUserDto> {
    const result = await this.adminUserRepository.findOne({
      where: { email: value.email },
    })

    if (result) {
      throw new UnauthorizedException('this user already exists')
    }

    return value
  }
}
