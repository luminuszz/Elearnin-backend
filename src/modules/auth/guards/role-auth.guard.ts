import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Observable } from 'rxjs'
import { User } from 'src/modules/users/entities/user.entity'
import { Repository } from 'typeorm'
import { PayloadDTO } from '../dtos/payload.interface'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const { id } = context
      .switchToHttp()
      .getRequest<{ user: PayloadDTO }>().user

    const user = await this.userRepository.findOne(id)

    return user.role === 'admin'
  }
}
