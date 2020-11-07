import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './modules/users/users.module'
import { Connection } from 'typeorm'
import { AuthModule } from './modules/auth/auth.module'
import { CoursesModule } from './modules/courses/courses.module'
import { LessonsModule } from './modules/lessons/lessons.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, AuthModule, CoursesModule, LessonsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
