import { Module } from '@nestjs/common'
import { User } from './entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersService } from './services/users.service'
import { AdminUsersController } from './controllers/admin-users.controller'
import { VerifyEmail } from './pipes/verify-email.pipe'
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, VerifyEmail],
  controllers: [AdminUsersController],
  exports: [UsersService],
})
export class UserModule {}
