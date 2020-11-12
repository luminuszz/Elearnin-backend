import { EncryptionTransformer } from 'typeorm-encrypted'
import envVariables from '../../config/envVariables'

console.log(envVariables().nodeEnv)

export class TransformEncrypt {
  public static getEncrypt(): EncryptionTransformer {
    const instance = new EncryptionTransformer({
      key: 'e41c966f21f9e1577802463f8924e6a3fe3e9751f201304213b2f845d8841d61',
      algorithm: 'aes-256-cbc',
      ivLength: 16,
      iv: 'ff5ac19190424b1d88f9419ef949ae56',
    })

    return instance
  }
}
export default TransformEncrypt.getEncrypt()
