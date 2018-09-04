const path = require('path');
const fs = require('fs');

/**
 * 设置
 */

module.exports = {
  /** MongoDB 连接字符串 */
  db: 'mongodb://127.0.0.1:27018,127.0.0.1:27017/tb_reptile',

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
  poro:{
    loginInUrl:'http://poro.ws/auth/login',
    checkInUrl:'http://poro.ws/user/checkin',
    userUrl:"http://poro.ws/user/",
    accounts:[
      {
        email:'账户名',
        passwd:'密码',
      },
      {
        email:'账户名2',
        passwd:'密码2',
      }
    ]
  }
};
