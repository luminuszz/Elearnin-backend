import { ClassSerializerInterceptor, Module } from '@nestjs/common'
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JWtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { RoleGuard } from '../auth/guards/role-auth.guard'
import { UserModule } from '../users/users.module'
import { CoursesController } from './controllers/courses.controller'
import { Course } from './entities/course.entity'
import { CoursesService } from './services/courses.service'

@Module({
  imports: [TypeOrmModule.forFeature([Course]), UserModule],
  controllers: [CoursesController],
  providers: [
    CoursesService,
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
    { provide: APP_GUARD, useClass: JWtAuthGuard },
    { provide: APP_GUARD, useClass: RoleGuard },
  ],
})
export class CoursesModule {}
