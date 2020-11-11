import { Injectable } from '@nestjs/common'
import { UploadStoreProvider } from './dtos/IUploadStoreProvider'

@Injectable()
export class UploadService {
  constructor(private readonly uploadProvider: UploadStoreProvider) {}

  public async saveFile(fileName: string): Promise<string> {
    const file = this.uploadProvider.save(fileName)

    return file
  }

  public async deleteFile(fileName: string): Promise<void> {
    await this.uploadProvider.delete(fileName)
  }
}
