import { Module } from '@nestjs/common'
import { User } from './entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersService } from './services/users.service'
import { AdminUsersController } from './controllers/admin-users.controller'
import { VerifyEmail } from './pipes/verify-email.pipe'
import { UsersController } from './controllers/users.controller'
import { AdminUserService } from './services/adminUsers.service'
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, AdminUserService, VerifyEmail],
  controllers: [AdminUsersController, UsersController],
  exports: [UsersService],
})
export class UserModule {}
