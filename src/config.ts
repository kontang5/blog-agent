import dotenv from "dotenv";
import { Config } from "./types/index.js";

dotenv.config();

export const config: Config = {
  lmStudio: {
    baseUrl: process.env.LM_STUDIO_BASE_URL || "http://localhost:1234/v1",
    model: process.env.LM_STUDIO_MODEL || "local-model",
  },
  springApi: {
    baseUrl: process.env.SPRING_API_BASE_URL || "http://localhost:8080",
  },
};
