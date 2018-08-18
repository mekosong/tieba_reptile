const path = require('path');
const fs = require('fs');

/**
 * 设置
 */

module.exports = {
  /** local 模式 */
  isLocal: process.env.NODE_ENV === 'local',
  /** 是否测试环境 */
  isTest: process.env.NODE_ENV === 'test',
  /** 是否生产环境 */
  isProduction: process.env.NODE_ENV === 'production',


  /** 各种存放文件夹路径 */
  paths: {
    /** 日志 */
    logs: 'storage/logs',
    cache: 'storage/cache',
    adminWeb: 'adminWeb'
  },

  /** MongoDB 连接字符串 */
  db: 'mongodb://localhost:27017/tb_reptile',

  /** redis */
  redis: {
    // url: 'redis://localhost:6379'
    host: 'localhost',
    port: 6379
  },
  // 跨域资源共享配置
  cors: {
    // 允许的域名
    allowOrigins: [
      'http://localhost:3000'
    ]
  },

  qiniu: {
    domain: 'http://img.aworld.cn'
  },
  defaults: {
    avatarKey: 'avatar_new.png'
  },
};
