const config = require('../config');

module.exports.url = function (key) {
  return `${config.qiniu.domain}/${key}`;
};
