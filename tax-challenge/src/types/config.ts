export type Config = {
  jwt: {
    secret: string;
    expiresIn: string;
  };
  server: {
    port: number;
    env: string;
  };
} 