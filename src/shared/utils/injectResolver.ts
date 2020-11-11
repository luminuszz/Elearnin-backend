import { Provider } from '@nestjs/common'
import envVar, { nodeEnv } from '../../config/envVariables'

type state = {
  development: any
  production: any
}

export function injectResolver(
  // eslint-disable-next-line @typescript-eslint/ban-types
  abstraction: Function,
  { development, production }: state
): Provider {
  const provide = String(abstraction.name)

  switch (envVar().nodeEnv) {
    case nodeEnv.development:
      return { provide, useClass: development }

    case nodeEnv.production:
      return {
        provide,
        useClass: production,
      }

    default:
      return { provide, useClass: development }
  }
}
