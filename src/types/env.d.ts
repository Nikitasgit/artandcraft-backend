export interface EnvConfig {
  PORT: number;
  NODE_ENV: "development" | "production" | "test";
  ORIGIN: string;
  MONGO_URI: string;
  JWT_SECRET: string;
}
