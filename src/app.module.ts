import { ClassSerializerInterceptor, Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './modules/users/users.module'
import { Connection } from 'typeorm'
import { AuthModule } from './modules/auth/auth.module'
import { CoursesModule } from './modules/courses/courses.module'
import { LessonsModule } from './modules/lessons/lessons.module'
import { ConfigModule } from '@nestjs/config'
import { ValidationPipe } from './shared/pipes/validationSchema.pipe'
import { GraphQLModule } from '@nestjs/graphql'
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import envVariables from './config/envVariables'
import { join } from 'path'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [envVariables],
    }),
    TypeOrmModule.forRoot(),
    /*    GraphQLModule.forRoot({
      include: [CoursesModule],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }), */

    UserModule,
    AuthModule,
    CoursesModule,
    LessonsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
