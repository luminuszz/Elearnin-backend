import { Module } from '@nestjs/common'
import { UploadService } from './upload.service'
import { ConfigModule } from '@nestjs/config'
import envVariables from 'src/config/envVariables'
import { UploadProvider } from './implementations'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [envVariables],
    }),
  ],
  providers: [UploadService, UploadProvider],
  exports: [UploadService],
})
export class UploadModule {}
