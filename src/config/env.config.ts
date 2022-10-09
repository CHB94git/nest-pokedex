
export const envConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  mongodb: process.env.MONGO_DB,
  port: parseInt(process.env.PORT, 10) || 3001,
  defaultLimit: process.env.DEFAULT_LIMIT || 7,
})