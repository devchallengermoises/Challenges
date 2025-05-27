import { Config } from '../interfaces/config.interface';

export const config: Config = {
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: process.env.JWT_EXPIRATION || '1h'
  },
  server: {
    port: Number(process.env.PORT) || 3000,
    env: process.env.NODE_ENV || 'development'
  }
}; 