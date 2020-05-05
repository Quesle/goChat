export default {
  appenders: {
    console: { type: 'console', category: 'console' },
    normal: {
      type: 'dateFile',
      filename: 'log/',
      pattern: 'yyyyMMddhh.log',
      absolute: false,
      alwaysIncludePattern: true,
      backups: 4,
      maxLogSize: 1024,
      category: 'normal',
    },
  },
  categories: {
    default: { appenders: ['console', 'normal'], level: 'ALL' },
  },
};
