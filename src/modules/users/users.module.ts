import { Module } from '@nestjs/common'
import { User } from './entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersService } from './services/users.service'
import { AdminUsersController } from './controllers/admin-users.controller'
import { VerifyEmail } from './pipes/verify-email.pipe'
import { UsersController } from './controllers/users.controller'
import { AdminUserService } from './services/adminUsers.service'
import { APP_GUARD } from '@nestjs/core'
import { RoleGuard } from '../auth/guards/role-auth.guard'
import { JWtAuthGuard } from '../auth/guards/jwt-auth.guard'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    AdminUserService,
    VerifyEmail,
    UsersService,

    { provide: APP_GUARD, useClass: JWtAuthGuard },
    { provide: APP_GUARD, useClass: RoleGuard },
  ],
  controllers: [AdminUsersController, UsersController],
  exports: [UsersService, AdminUserService],
})
export class UserModule {}
