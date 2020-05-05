import { IGlobalConfig } from './config.global';

export interface IConfig extends IGlobalConfig {
  apiUrl: string;
  token?: string;
  appid?: string;
  appsecret?: string;
  encodingAESKey?: string;
}
