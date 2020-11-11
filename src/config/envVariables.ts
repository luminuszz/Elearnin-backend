export enum nodeEnv {
  production = 'production',
  development = 'development',
}

interface EnvVar {
  port: number
  nodeEnv: keyof nodeEnv
}

export default (): EnvVar => ({
  nodeEnv: process.env.NODE_ENV as keyof nodeEnv,
  port: Number(process.env.PORT),
})
