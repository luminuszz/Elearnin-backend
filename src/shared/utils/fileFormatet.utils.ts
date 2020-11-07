import { HttpException, HttpStatus } from '@nestjs/common'

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
