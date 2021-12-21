import dotenv from "dotenv";

export interface IConfig {
  port: number;
  mongoUri: string;
  zenviaToken: string;
}

class Config {
  static getConfig(): IConfig {

    dotenv.config();

    return {
      port: process.env.PORT ?? 3000,
      mongoUri: process.env.MONGO_DB_URI ?? 'mongodb://localhost:27017/zenvia',
      zenviaToken: process.env.ZENVIA_TOKEN ?? 'TOKEN_NOT_FOUND'
    } as IConfig;
  }
}


export default Config;