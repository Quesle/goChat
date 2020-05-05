import { IConfig } from './config.interface';
import { globalConfig } from './config.global';
import wxConfig from './config.wx';

export const config: IConfig = {
  ...globalConfig,
  ...wxConfig,
  apiUrl: 'http://a-production-url',
};
