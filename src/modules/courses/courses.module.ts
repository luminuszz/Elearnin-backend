import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from '../users/users.module'
import { CoursesController } from './controllers/courses.controller'
import { Course } from './entities/course.entity'
import { CoursesService } from './services/courses.service'

@Module({
  imports: [TypeOrmModule.forFeature([Course]), UserModule],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
