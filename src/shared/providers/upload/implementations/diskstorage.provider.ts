import { BadRequestException, Injectable } from '@nestjs/common'
import { UploadStoreProvider } from '../dtos/IUploadStoreProvider'

import fs from 'fs'
import { tmpFolder } from 'src/shared/utils/fileFormatet.utils'
import { resolve } from 'path'

@Injectable()
export class DiskStorageProvider implements UploadStoreProvider {
  public async save(fileName: string): Promise<string> {
    return fileName
  }

  public async delete(fileName: string): Promise<void> {
    const pathFile = resolve(tmpFolder, fileName)

    const checkExistsFile = await fs.promises.stat(pathFile)

    if (!checkExistsFile) {
      throw new BadRequestException('File not exists')
    }

    await fs.promises.unlink(pathFile)
  }
}
