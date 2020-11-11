import { HttpException, HttpStatus } from '@nestjs/common'
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'
import { diskStorage } from 'multer'
import { join } from 'path'

export const tmpFolder = join(__dirname, '../', '../', '../', 'temp', 'images')

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export function editFileName(req, file, cb): void {
  const fileName = `${Date.now()}-${file.originalname}`

  return cb(null, fileName)
}

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(
      new HttpException(
        'Only image files are allowed!',
        HttpStatus.BAD_REQUEST
      ),
      false
    )
  }
  callback(null, true)
}

export const fileResolver: MulterOptions = {
  dest: tmpFolder,
  fileFilter: imageFileFilter,
  storage: diskStorage({ destination: tmpFolder, filename: editFileName }),
}
