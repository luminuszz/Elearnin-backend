import { ClassSerializerInterceptor } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from './shared/pipes/validationSchema.pipe'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.PORT || 3000)
}
bootstrap()
