import { ClassSerializerInterceptor, Module } from '@nestjs/common'
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JWtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { RoleGuard } from '../auth/guards/role-auth.guard'
import { UserModule } from '../users/users.module'
import { CoursesController } from './controllers/courses.controller'
import { CoursesService } from './services/courses.service'
import { CourseRepository } from './repositories/course.repository'
import { UploadModule } from 'src/shared/providers/upload/upload.module'
import { CourseCategory } from './entities/courseCategory.entity'
import { CourseResolver } from './resolvers/coruse.resolver'

@Module({
  imports: [
    UserModule,
    UploadModule,
    TypeOrmModule.forFeature([CourseRepository, CourseCategory]),
  ],
  controllers: [CoursesController],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
    { provide: APP_GUARD, useClass: JWtAuthGuard },
    { provide: APP_GUARD, useClass: RoleGuard },
    CoursesService,
    CourseResolver,
  ],
})
export class CoursesModule {}
