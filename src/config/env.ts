import dotenv from "dotenv";
import { EnvConfig } from "../types/env";

dotenv.config();

export const env: EnvConfig = {
  PORT: parseInt(process.env.PORT as string),
  NODE_ENV: process.env.NODE_ENV as "development" | "production" | "test",
  ORIGIN: process.env.ORIGIN as string,
  MONGO_URI: process.env.MONGO_URI as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
};
