import { Module } from '@nestjs/common'
import { injectResolver } from 'src/shared/utils/injectResolver'
import { UploadService } from './upload.service'
import { UploadStoreProvider } from './dtos/IUploadStoreProvider'
import { DiskStorageProvider } from './implementations/diskstorage.provider'
import { ConfigModule } from '@nestjs/config'
import envVariables from 'src/config/envVariables'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [envVariables],
    }),
  ],
  providers: [
    injectResolver(UploadStoreProvider, {
      development: DiskStorageProvider,
      production: DiskStorageProvider,
    }),
    UploadService,
  ],
  exports: [UploadService],
})
export class UploadModule {}
