import { injectResolver } from 'src/shared/utils/injectResolver'
import { UploadStoreProvider } from '../dtos/IUploadStoreProvider'
import { DiskStorageProvider } from './diskstorage.provider'

export const UploadProvider = injectResolver(UploadStoreProvider, {
  development: DiskStorageProvider,
  production: DiskStorageProvider,
})
