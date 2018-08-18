const log4js = require('log4js');
const path = require('path');

log4js.configure({
  appenders: {
    reptile: {
      type: 'dateFile',
      absolute: false,
      filename: path.join(__dirname,'../logs', `reptile.log`),
      maxLogSize: 1024 * 1024,
      pattern: `.yyyyMMddhh`,
      alwaysIncludePattern: true
    }},
  categories: {default: {appenders: ['reptile'], level: 'error'}}
});

const reptileLogger = log4js.getLogger('reptile');

module.exports = reptileLogger;